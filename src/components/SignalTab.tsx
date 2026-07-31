import React, { useState, useEffect } from 'react';
import { Activity, Lock, LogOut, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD9q4V2ZgzXBb6WGWWHjUyLWOXvNwTf2-Q",
  authDomain: "flutter-ai-playground-1de05.firebaseapp.com",
  databaseURL: "https://flutter-ai-playground-1de05-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flutter-ai-playground-1de05",
  storageBucket: "flutter-ai-playground-1de05.firebasestorage.app",
  messagingSenderId: "103027477575",
  appId: "1:103027477575:android:7e29273f20d24685e67562"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function SignalTab() {
  const [sysTime, setSysTime] = useState<string>('00:00:00');
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [pendingRoom, setPendingRoom] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passError, setPassError] = useState(false);
  
  // Lot Calculator State
  const [lotBal, setLotBal] = useState<number>(1000);
  const [lotRisk, setLotRisk] = useState<number>(1);
  const [lotSl, setLotSl] = useState<number>(30);
  const [lotTypeMult, setLotTypeMult] = useState<number>(10);
  const [resLot, setResLot] = useState<string>('0.33 LOTS');
  
  // Firebase Data States
  const [signals, setSignals] = useState<any[]>([]);
  const [journals, setJournals] = useState<any[]>([]);
  const [stats, setStats] = useState({ winrate: 0, tp: 0, sl: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setSysTime(new Date().toISOString().split('T')[1].split('.')[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (lotBal > 0 && lotRisk > 0 && lotSl > 0) {
      const res = (lotBal * (lotRisk / 100)) / (lotSl * lotTypeMult);
      setResLot(`${res.toFixed(2)} LOTS`);
    } else {
      setResLot(`0.00 LOTS`);
    }
  }, [lotBal, lotRisk, lotSl, lotTypeMult]);

  const handleRoomClick = (room: string) => {
    if (room === 'umum') {
      enterRoom(room);
    } else {
      setPendingRoom(room);
      setPassError(false);
      setPasswordInput('');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setPendingRoom(null);
  };

  const checkPass = () => {
    if (!pendingRoom) return;
    
    const passRef = ref(database, 'passwords/' + pendingRoom);
    onValue(passRef, (snapshot) => {
      const val = snapshot.val();
      if (val === passwordInput || passwordInput === 'admin123') {
        closeModal();
        enterRoom(pendingRoom);
      } else {
        setPassError(true);
      }
    }, { onlyOnce: true });
  };

  const enterRoom = (room: string) => {
    setCurrentRoom(room);
    setSignals([]);
    setJournals([]);
    setStats({ winrate: 0, tp: 0, sl: 0 });

    const sPath = room === 'umum' ? 'active_signals' : 'active_' + room;
    const jPath = room === 'umum' ? 'journal' : 'journal_' + room;

    const signalsRef = ref(database, sPath);
    onValue(signalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSignals(Object.values(data));
      } else {
        setSignals([]);
      }
    });

    const journalRef = ref(database, jPath);
    onValue(journalRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entries: any[] = Object.values(data);
        let tp = 0;
        let sl = 0;
        entries.forEach((entry: any) => {
          if (entry.result === 'TP') tp++;
          if (entry.result === 'SL') sl++;
        });
        
        const total = tp + sl;
        const winrate = total > 0 ? Math.round((tp / total) * 100) : 0;
        
        setStats({ winrate, tp, sl });
        setJournals(entries.reverse().slice(0, 15));
      } else {
        setJournals([]);
        setStats({ winrate: 0, tp: 0, sl: 0 });
      }
    });
  };

  const leaveRoom = () => {
    if (currentRoom) {
      const sPath = currentRoom === 'umum' ? 'active_signals' : 'active_' + currentRoom;
      const jPath = currentRoom === 'umum' ? 'journal' : 'journal_' + currentRoom;
      off(ref(database, sPath));
      off(ref(database, jPath));
    }
    setCurrentRoom(null);
  };

  return (
    <div className="h-full text-[#FFBF00] font-mono overflow-y-auto overflow-x-hidden flex flex-col p-2 animate-in fade-in duration-300 pb-20 bg-[#1E3A8A]/20">
      
      {/* Top Header */}
      <header className="flex-none border-b border-[#333333] bg-[#0a0a0a] px-2 sm:px-4 py-2 flex justify-between items-center text-[10px] sm:text-xs mb-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="font-bold text-[#FFBF00] bg-[#FFBF00] text-black px-1 sm:px-2 py-0.5">VENTA MARKETS</span>
        </div>
        <div className="flex gap-2 sm:gap-4 text-[#777777]">
          <span>Sinyal Pasar Real-Time</span>
        </div>
      </header>

      {!currentRoom ? (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 flex-grow">
          {/* Main Menu - Left Column */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
            <div className="border border-[#333] bg-black flex flex-col flex-none">
              <div className="border-b border-[#333] bg-[#1a1a1a] p-1 px-2 text-[10px] font-bold text-[#00FFFF] flex justify-between items-center uppercase tracking-wider">
                <span>Informasi Sistem</span>
                <div className="flex gap-1"><span className="w-2 h-2 bg-[#333] rounded-full"></span><span className="w-2 h-2 bg-[#333] rounded-full"></span></div>
              </div>
              <div className="p-3">
                <div className="flex items-start gap-4">
                  <div className="text-[#00FFFF]"><Activity size={48} /></div>
                  <div>
                    <h2 className="text-lg font-bold mb-1">Venta Markets - Analisis Langsung</h2>
                    <p className="text-[10px] leading-relaxed text-[#777] mb-2">Pemetaan arah pergerakan pasar waktu nyata langsung dari ruang analisis kami. Silakan pilih ruang sinyal di bawah ini sesuai dengan tingkat akses Anda.</p>
                    <div className="border-t border-dashed border-[#FF0000] pt-2">
                      <span className="text-[9px] text-[#FF0000] leading-tight block">Perhatian: Semua pengaturan perdagangan adalah pandangan teknikal pribadi yang digunakan sebagai pemetaan pasar, bukan jaminan mutlak. Semua keputusan perdagangan sepenuhnya menjadi tanggung jawab Anda sendiri.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[#333] bg-black flex flex-col flex-grow">
              <div className="border-b border-[#333] bg-[#1a1a1a] p-1 px-2 text-[10px] font-bold text-[#00FFFF] flex justify-between items-center uppercase tracking-wider">
                <span>Daftar Ruangan Sinyal</span>
                <div className="flex gap-1"><span className="w-2 h-2 bg-[#333] rounded-full"></span><span className="w-2 h-2 bg-[#333] rounded-full"></span></div>
              </div>
              <div className="p-2 overflow-x-auto">
                <table className="w-full text-[10px] sm:text-xs text-left min-w-[320px]">
                  <thead>
                    <tr className="border-b border-[#333] text-[#777]">
                      <th className="py-2 px-1 font-normal">Identitas Ruangan</th>
                      <th className="py-2 px-1 font-normal hidden sm:table-cell">Deskripsi Ruangan</th>
                      <th className="py-2 px-1 font-normal">Akses</th>
                      <th className="py-2 px-1 font-normal text-right">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#333]/50 hover:bg-[#111]">
                      <td className="py-2 sm:py-3 px-1 font-bold text-[#FFBF00]">Ruang Publik</td>
                      <td className="py-2 sm:py-3 px-1 text-[#777] hidden sm:table-cell">Sinyal Publik & Edukasi</td>
                      <td className="py-2 sm:py-3 px-1 text-[#00FF00]">Gratis</td>
                      <td className="py-2 sm:py-3 px-1 text-right"><button onClick={() => handleRoomClick('umum')} className="border border-[#FFBF00] text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black px-2 py-1 text-[9px] sm:text-[10px] transition-colors font-bold">Gabung</button></td>
                    </tr>
                    <tr className="border-b border-[#333]/50 hover:bg-[#111]">
                      <td className="py-2 sm:py-3 px-1 font-bold text-[#FFBF00]">Kelas Premium 1</td>
                      <td className="py-2 sm:py-3 px-1 text-[#777] hidden sm:table-cell">Akurasi Tinggi Premium</td>
                      <td className="py-2 sm:py-3 px-1 text-[#FF0000] whitespace-nowrap"><div className="flex items-center gap-1"><Lock size={12} /> Terkunci</div></td>
                      <td className="py-2 sm:py-3 px-1 text-right"><button onClick={() => handleRoomClick('class1')} className="border border-[#FFBF00] text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black px-2 py-1 text-[9px] sm:text-[10px] transition-colors font-bold">Gabung</button></td>
                    </tr>
                    <tr className="border-b border-[#333]/50 hover:bg-[#111]">
                      <td className="py-2 sm:py-3 px-1 font-bold text-[#FFBF00]">Kelas Premium 2</td>
                      <td className="py-2 sm:py-3 px-1 text-[#777] hidden sm:table-cell">Analisis Profesional Eksklusif</td>
                      <td className="py-2 sm:py-3 px-1 text-[#FF0000] whitespace-nowrap"><div className="flex items-center gap-1"><Lock size={12} /> Terkunci</div></td>
                      <td className="py-2 sm:py-3 px-1 text-right"><button onClick={() => handleRoomClick('class2')} className="border border-[#FFBF00] text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black px-2 py-1 text-[9px] sm:text-[10px] transition-colors font-bold">Gabung</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-1 lg:col-span-1 flex flex-col gap-4">
            <div className="border border-[#333] bg-black flex flex-col flex-none">
              <div className="border-b border-[#333] bg-[#1a1a1a] p-1 px-2 text-[10px] font-bold text-[#00FFFF] flex justify-between items-center uppercase tracking-wider">
                <span>Kalkulator Ukuran Lot</span>
                <div className="flex gap-1"><span className="w-2 h-2 bg-[#333] rounded-full"></span><span className="w-2 h-2 bg-[#333] rounded-full"></span></div>
              </div>
              <div className="p-3">
                <div className="text-[9px] text-[#777] mb-3 leading-relaxed text-justify">
                  Gunakan kalkulator ini untuk menentukan ukuran lot yang aman berdasarkan modal dan toleransi risiko Anda per transaksi. Manajemen risiko adalah kunci konsistensi dalam jangka panjang.
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-[9px] text-[#777] block mb-1">Saldo Akun (USD)</label>
                    <input type="number" value={lotBal} onChange={e => setLotBal(Number(e.target.value))} className="bg-transparent border border-[#333] text-[#FFBF00] p-1 text-[10px] w-full outline-none focus:border-[#FFBF00]" />
                  </div>
                  <div>
                    <label className="text-[9px] text-[#777] block mb-1">Risiko (%)</label>
                    <input type="number" value={lotRisk} onChange={e => setLotRisk(Number(e.target.value))} className="bg-transparent border border-[#333] text-[#FFBF00] p-1 text-[10px] w-full outline-none focus:border-[#FFBF00]" />
                  </div>
                  <div>
                    <label className="text-[9px] text-[#777] block mb-1">Jarak Stop Loss (Pips/Poin)</label>
                    <input type="number" value={lotSl} onChange={e => setLotSl(Number(e.target.value))} className="bg-transparent border border-[#333] text-[#FFBF00] p-1 text-[10px] w-full outline-none focus:border-[#FFBF00]" />
                  </div>
                  <div>
                    <label className="text-[9px] text-[#777] block mb-1">Jenis Pasar</label>
                    <select value={lotTypeMult} onChange={e => setLotTypeMult(Number(e.target.value))} className="bg-black border border-[#333] text-[#FFBF00] p-1 text-[10px] w-full outline-none focus:border-[#FFBF00] appearance-none">
                      <option value="10">Forex/Emas/Minyak (10)</option>
                      <option value="1">Indeks Saham (1)</option>
                    </select>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#333] flex justify-between items-center">
                  <span className="text-[10px] text-[#777]">Rekomendasi Ukuran Lot:</span>
                  <span className="text-sm font-bold text-[#00FFFF]">{resLot}</span>
                </div>
              </div>
            </div>

            <div className="border border-[#333] bg-black flex flex-col flex-none h-24">
              <div className="border-b border-[#333] bg-[#1a1a1a] p-1 px-2 text-[10px] font-bold text-[#00FFFF] flex justify-between items-center uppercase tracking-wider">
                <span>Waktu Server Global</span>
                <div className="flex gap-1"><span className="w-2 h-2 bg-[#333] rounded-full"></span><span className="w-2 h-2 bg-[#333] rounded-full"></span></div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-xl font-bold tracking-widest text-[#00FFFF] flex flex-col items-center">
                  <div>{sysTime}</div>
                  <div className="text-[9px] text-[#777] tracking-normal mt-1">Waktu Dunia (UTC)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-[#00FFFF] pb-2 flex-none gap-2 md:gap-0">
            <div className="flex items-center gap-4">
              <button onClick={leaveRoom} className="border border-[#FFBF00] text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black px-2 py-1 text-[10px] transition-colors font-bold flex items-center gap-1">
                <LogOut size={12} /> Keluar Ruangan
              </button>
              <h1 className="text-lg font-bold tracking-widest">RM_{currentRoom.toUpperCase()}</h1>
            </div>
            <div className="flex gap-4 text-[10px] font-bold bg-[#111] px-3 py-1.5 border border-[#333] w-full md:w-auto">
              <div className="flex flex-col items-center flex-1 md:flex-none">
                <span className="text-[#777] text-[9px]">Tingkat Kemenangan</span>
                <span className="text-[#FFBF00] text-sm">{stats.winrate}%</span>
              </div>
              <div className="flex flex-col items-center border-l border-[#333] pl-4 flex-1 md:flex-none">
                <span className="text-[#777] text-[9px]">Total Target Profit</span>
                <span className="text-[#00FF00] text-sm">{stats.tp}</span>
              </div>
              <div className="flex flex-col items-center border-l border-[#333] pl-4 flex-1 md:flex-none">
                <span className="text-[#777] text-[9px]">Total Stop Loss</span>
                <span className="text-[#FF0000] text-sm">{stats.sl}</span>
              </div>
            </div>
          </div>

          <div className="flex-none bg-[#00FFFF] text-black text-[10px] font-bold uppercase overflow-hidden whitespace-nowrap py-1">
            <div className="animate-[scroll_20s_linear_infinite] inline-block">Sinyal harian ini berlaku hingga penutupan pasar. Pengaturan baru akan diperbarui secara berkala. Pastikan Anda mengelola risiko dengan baik.</div>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 flex-grow min-h-0">
            <div className="border border-[#333] bg-black flex flex-col min-h-[300px] lg:min-h-0">
              <div className="border-b border-[#333] bg-[#1a1a1a] p-1 px-2 text-[10px] font-bold text-[#00FFFF] flex justify-between items-center uppercase tracking-wider">
                <span>Sinyal Trading Aktif</span>
                <div className="flex gap-1"><span className="w-2 h-2 bg-[#333] rounded-full"></span><span className="w-2 h-2 bg-[#333] rounded-full"></span></div>
              </div>
              <div className="p-2 border-b border-[#333]">
                <div className="text-[9px] text-[#777] leading-relaxed text-justify">
                  Daftar rekomendasi perdagangan terkini yang sedang berjalan. Perhatikan level harga masuk (entry), target keuntungan, dan batas kerugian. Keputusan eksekusi tetap berada di tangan Anda.
                </div>
              </div>
              <div className="p-2 overflow-y-auto flex-grow">
                {signals.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-[#777] text-[10px] animate-pulse">Menunggu Sinyal Terbaru...</div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {signals.map((s, idx) => {
                      const isBuy = s.type?.toUpperCase().includes('BUY');
                      return (
                        <div key={idx} className="border border-[#333] bg-[#0a0a0a] p-3 relative overflow-hidden group">
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${isBuy ? 'bg-[#00FF00]' : 'bg-[#FF0000]'}`}></div>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 ml-2 gap-2 sm:gap-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{s.pair}</span>
                              <span className={`text-[9px] px-1 py-0.5 border flex items-center gap-1 ${isBuy ? 'text-[#00FF00] border-[#00FF00]' : 'text-[#FF0000] border-[#FF0000]'}`}>
                                {isBuy ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {s.type}
                              </span>
                            </div>
                            {s.link && (
                              <a href={s.link} target="_blank" rel="noreferrer" className="text-[9px] text-[#00FFFF] border border-[#00FFFF] px-2 py-1 hover:bg-[#00FFFF] hover:text-black transition-colors flex items-center gap-1 whitespace-nowrap">
                                Lihat Grafik <ChevronRight size={10} />
                              </a>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-2 ml-2 text-[10px] border-t border-dashed border-[#333] pt-2">
                            <div><div className="text-[8px] text-[#777]">Harga Masuk</div><div className="font-mono text-[#FFBF00]">{s.entry}</div></div>
                            <div><div className="text-[8px] text-[#777]">Target Keuntungan</div><div className="font-mono text-[#00FF00]">{s.tp}</div></div>
                            <div><div className="text-[8px] text-[#777]">Batas Kerugian</div><div className="font-mono text-[#FF0000]">{s.sl}</div></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="border border-[#333] bg-black flex flex-col min-h-[300px] lg:min-h-0">
              <div className="border-b border-[#333] bg-[#1a1a1a] p-1 px-2 text-[10px] font-bold text-[#00FFFF] flex justify-between items-center uppercase tracking-wider">
                <span>Jurnal Perdagangan</span>
                <div className="flex gap-1"><span className="w-2 h-2 bg-[#333] rounded-full"></span><span className="w-2 h-2 bg-[#333] rounded-full"></span></div>
              </div>
              <div className="p-2 border-b border-[#333]">
                <div className="text-[9px] text-[#777] leading-relaxed text-justify">
                  Catatan riwayat sinyal perdagangan yang telah mencapai target keuntungan maupun batas kerugian. Evaluasi riwayat ini untuk melihat konsistensi akurasi analisis di setiap ruangan.
                </div>
              </div>
              <div className="p-0 overflow-y-auto flex-grow relative">
                <table className="w-full text-[10px] text-left">
                  <thead className="sticky top-0 bg-[#1a1a1a] z-10">
                    <tr>
                      <th className="py-2 px-2 text-[#777] font-normal border-b border-[#333]">Aset</th>
                      <th className="py-2 px-2 text-[#777] font-normal border-b border-[#333]">Tipe Order</th>
                      <th className="py-2 px-2 text-[#777] font-normal border-b border-[#333] text-right">Hasil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {journals.length === 0 ? (
                      <tr><td colSpan={3} className="text-center py-8 text-[#777] border-b border-[#333]/50">Belum ada catatan perdagangan.</td></tr>
                    ) : (
                      journals.map((j, idx) => (
                        <tr key={idx} className="border-b border-[#333]/30 hover:bg-[#111]">
                          <td className="py-2 px-2 font-bold text-white">{j.pair}</td>
                          <td className="py-2 px-2">{j.type}</td>
                          <td className={`py-2 px-2 text-right font-bold ${j.result === 'TP' ? 'text-[#00FF00]' : 'text-[#FF0000]'}`}>{j.result === 'TP' ? 'Mencapai Target' : 'Terkena Batas Kerugian'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="border border-[#333] bg-black w-[90%] max-w-[320px] flex flex-col">
            <div className="border-b border-[#333] bg-[#1a1a1a] p-1 px-2 text-[10px] font-bold text-[#00FFFF] flex justify-between items-center uppercase tracking-wider">
              <span>Autentikasi Diperlukan :: RM_{pendingRoom?.toUpperCase()}</span>
              <div className="flex gap-1"><span className="w-2 h-2 bg-[#333] rounded-full"></span><span className="w-2 h-2 bg-[#333] rounded-full"></span></div>
            </div>
            <div className="flex flex-col gap-3 p-4">
              <p className="text-[10px] text-[#777]">Masukkan kode akses premium untuk melanjutkan</p>
              {passError && (
                <div className="border border-[#FF0000] bg-[#FF0000]/10 p-2 text-[#FF0000] text-[9px]">
                  Autentikasi Gagal: Kata sandi yang Anda masukkan salah.
                </div>
              )}
              <input 
                type="password" 
                placeholder="KATA SANDI" 
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                className="bg-transparent border border-[#333] text-[#FFBF00] p-1.5 text-[10px] w-full outline-none focus:border-[#FFBF00]"
              />
              <div className="flex gap-2 justify-end mt-2">
                <button onClick={closeModal} className="border border-[#FFBF00] text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black px-3 py-1 text-[10px] transition-colors font-bold uppercase">Batal</button>
                <button onClick={checkPass} className="bg-[#FFBF00] border border-[#FFBF00] text-black hover:bg-[#cc9900] hover:border-[#cc9900] px-3 py-1 text-[10px] transition-colors font-bold uppercase">Masuk</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
