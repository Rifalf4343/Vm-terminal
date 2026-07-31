/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Home, LineChart, Newspaper, Calendar, BookOpen, Terminal, Activity, Zap, Briefcase } from 'lucide-react';
import { AdvancedChart, NewsTimeline, EconomicCalendar, ForexCrossRates, ForexHeatMap, TechnicalAnalysisWidget, TickerTapeWidget, MarketOverviewWidget } from './components/TradingViewWidgets';
import { SignalTab } from './components/SignalTab';

function LinkItem({ title, description, url, referral }: { title: string, description?: string, url: string, referral?: string }) {
  return (
    <div className="bg-[#0B1221] border border-[#1E3A8A]/50 p-3 mb-3 rounded-lg shadow-sm flex flex-col gap-2 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/10 to-transparent pointer-events-none"></div>
      <div className="font-bold text-blue-100 text-[13px] tracking-wide relative z-10">{title}</div>
      {description && <div className="text-[11px] text-blue-200/70 leading-relaxed relative z-10">{description}</div>}
      {referral && (
        <div className="text-[11px] bg-[#00ff00]/10 border border-[#00ff00]/30 px-2 py-1.5 text-[#00ff00] inline-block font-mono rounded mt-1 relative z-10 w-fit">
          REF CODE: <span className="font-bold">{referral}</span>
        </div>
      )}
      <a href={url} target="_blank" rel="noopener noreferrer" className="mt-2 block text-center bg-[#1E3A8A] text-blue-50 text-[12px] px-4 py-3 rounded-md hover:bg-[#1e40af] transition-all font-bold shadow-[0_0_8px_rgba(30,58,138,0.4)] relative z-10 hover:shadow-[0_0_12px_rgba(30,58,138,0.6)]">
        BUKA {title.toUpperCase()}
      </a>
    </div>
  );
}

function PortalTab() {
  const [view, setView] = useState<'main' | 'terminal' | 'broker' | 'propfirm'>('main');

  return (
    <div className="flex flex-col gap-3 h-full p-2 animate-in fade-in duration-300 pb-20">
      {view !== 'main' && (
        <div className="flex gap-2 overflow-x-auto pb-2 flex-none hide-scrollbar mt-2">
          <button 
            onClick={() => setView('main')}
            className="px-3 py-4 rounded-md font-bold text-[13px] whitespace-nowrap transition-all shadow-sm bg-[#0B1221] text-blue-400 border border-[#1E3A8A]/50 hover:bg-[#1E3A8A]/30"
          >
            {'< KEMBALI'}
          </button>
          <button 
            onClick={() => setView('terminal')}
            className={`px-4 py-4 rounded-md font-bold text-[13px] whitespace-nowrap transition-all flex-1 shadow-sm ${view === 'terminal' ? 'bg-[#1E3A8A] text-blue-50 shadow-[0_0_8px_rgba(30,58,138,0.5)] border border-[#1E3A8A]' : 'bg-[#0B1221] text-blue-400 border border-[#1E3A8A]/50 hover:bg-[#1E3A8A]/30'}`}
          >
            TERMINAL EKSEKUSI
          </button>
          <button 
            onClick={() => setView('broker')}
            className={`px-4 py-4 rounded-md font-bold text-[13px] whitespace-nowrap transition-all flex-1 shadow-sm ${view === 'broker' ? 'bg-[#1E3A8A] text-blue-50 shadow-[0_0_8px_rgba(30,58,138,0.5)] border border-[#1E3A8A]' : 'bg-[#0B1221] text-blue-400 border border-[#1E3A8A]/50 hover:bg-[#1E3A8A]/30'}`}
          >
            BROKER
          </button>
          <button 
            onClick={() => setView('propfirm')}
            className={`px-4 py-4 rounded-md font-bold text-[13px] whitespace-nowrap transition-all flex-1 shadow-sm ${view === 'propfirm' ? 'bg-[#1E3A8A] text-blue-50 shadow-[0_0_8px_rgba(30,58,138,0.5)] border border-[#1E3A8A]' : 'bg-[#0B1221] text-blue-400 border border-[#1E3A8A]/50 hover:bg-[#1E3A8A]/30'}`}
          >
            PROP FIRM
          </button>
        </div>
      )}

      <TerminalBlock title={view === 'main' ? 'PORTAL KONEKSI & EKSEKUSI' : view === 'terminal' ? 'TERMINAL EKSEKUSI' : view === 'broker' ? 'BROKER & PIALANG' : 'FUNDED TRADER (PROP FIRM)'} className="flex-1 mt-2">
        <div className="overflow-y-auto h-full pr-1 pb-4">
          
          {view === 'main' && (
            <div className="flex flex-col gap-4">
              <div className="text-[11px] text-[#ffb347]/80 mb-2 text-justify leading-relaxed bg-[#ffb347]/5 border border-[#ffb347]/20 p-3 rounded">
                Menu Portal menyediakan akses cepat dan informasi mengenai alat, pialang, dan perusahaan pendanaan yang dapat Anda gunakan dalam perjalanan trading Anda.
              </div>
              
              <div className="bg-[#0B1221] border border-[#1E3A8A]/50 p-4 rounded-lg flex flex-col gap-2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/10 to-transparent pointer-events-none"></div>
                <div className="font-bold text-blue-100 text-[14px] tracking-wide relative z-10">TERMINAL EKSEKUSI</div>
                <div className="text-[11px] text-blue-200/70 leading-relaxed relative z-10 mb-2 text-justify">
                  Terminal eksekusi adalah perangkat lunak atau platform antarmuka tempat trader melakukan analisis dan eksekusi instruksi beli/jual di pasar finansial secara real-time. Memilih platform yang stabil, cepat, dan memiliki fitur analitik yang mumpuni merupakan faktor krusial untuk menunjang kesuksesan strategi trading Anda.
                </div>
                <button onClick={() => setView('terminal')} className="mt-auto block text-center bg-[#1E3A8A] text-blue-50 text-[12px] px-4 py-3 rounded-md hover:bg-[#1e40af] transition-all font-bold shadow-[0_0_8px_rgba(30,58,138,0.4)] relative z-10 hover:shadow-[0_0_12px_rgba(30,58,138,0.6)] w-full">
                  BUKA MENU TERMINAL
                </button>
              </div>

              <div className="bg-[#0B1221] border border-[#1E3A8A]/50 p-4 rounded-lg flex flex-col gap-2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/10 to-transparent pointer-events-none"></div>
                <div className="font-bold text-blue-100 text-[14px] tracking-wide relative z-10">BROKER (PIALANG BERJANGKA)</div>
                <div className="text-[11px] text-blue-200/70 leading-relaxed relative z-10 mb-2 text-justify">
                  Broker bertindak sebagai jembatan yang menghubungkan trader ritel dengan pasar finansial global. Pialang berjangka lokal menawarkan keamanan hukum dan proteksi dana melalui segregated account di bawah regulasi ketat Bappebti, memastikan dana Anda terjamin. Sedangkan broker internasional umumnya menyediakan fleksibilitas leverage yang lebih tinggi serta pilihan instrumen yang sangat luas.
                </div>
                <button onClick={() => setView('broker')} className="mt-auto block text-center bg-[#1E3A8A] text-blue-50 text-[12px] px-4 py-3 rounded-md hover:bg-[#1e40af] transition-all font-bold shadow-[0_0_8px_rgba(30,58,138,0.4)] relative z-10 hover:shadow-[0_0_12px_rgba(30,58,138,0.6)] w-full">
                  BUKA MENU BROKER
                </button>
              </div>

              <div className="bg-[#0B1221] border border-[#1E3A8A]/50 p-4 rounded-lg flex flex-col gap-2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/10 to-transparent pointer-events-none"></div>
                <div className="font-bold text-blue-100 text-[14px] tracking-wide relative z-10">FUNDED TRADER (PROP FIRM)</div>
                <div className="text-[11px] text-blue-200/70 leading-relaxed relative z-10 mb-2 text-justify">
                  Proprietary Firm (Prop Firm) adalah perusahaan pendanaan yang memberikan modal besar kepada trader bertalenta yang berhasil melewati fase evaluasi. Dengan sistem prop firm, trader tidak perlu merisikokan dana pribadinya sendiri dalam jumlah besar, melainkan mengelola dana perusahaan dan mendapatkan pembagian keuntungan (profit split) dari profit yang dihasilkan.
                </div>
                <button onClick={() => setView('propfirm')} className="mt-auto block text-center bg-[#1E3A8A] text-blue-50 text-[12px] px-4 py-3 rounded-md hover:bg-[#1e40af] transition-all font-bold shadow-[0_0_8px_rgba(30,58,138,0.4)] relative z-10 hover:shadow-[0_0_12px_rgba(30,58,138,0.6)] w-full">
                  BUKA MENU PROP FIRM
                </button>
              </div>
            </div>
          )}

          {view === 'terminal' && (
            <>
              <div className="text-[11px] text-[#ffb347]/80 mb-3 text-justify leading-relaxed bg-[#ffb347]/5 border border-[#ffb347]/20 p-3 rounded">
                Daftar perangkat lunak antarmuka standar industri yang biasa digunakan untuk melakukan analisis, membuat strategi, dan mengeksekusi instruksi jual-beli di pasar finansial secara real-time.
              </div>
              <LinkItem title="MetaTrader 5" url="https://www.metatrader5.com/en/download" />
              <LinkItem title="cTrader" url="https://ctrader.com/" />
              <LinkItem title="TradingView" url="https://id.tradingview.com/" />
              <LinkItem title="TradeLocker" url="https://tradelocker.com/" />
            </>
          )}
          
          {view === 'broker' && (
            <>
              <div className="text-[11px] text-[#ffb347]/80 mb-3 text-justify leading-relaxed bg-[#ffb347]/5 border border-[#ffb347]/20 p-3 rounded">
                Rekomendasi perusahaan pialang berjangka baik lokal (Bappebti) maupun internasional yang telah kami verifikasi keamanannya. Broker bertindak sebagai jembatan yang menghubungkan Anda dengan likuiditas pasar global.
              </div>
              <LinkItem title="Dupoin Futures (Lokal)" description="Pialang berjangka lokal resmi yang diregulasi oleh Bappebti. Menjamin keamanan dana nasabah melalui rekening terpisah (segregated account), serta memberikan likuiditas mendalam untuk transaksi komoditi dan valuta asing yang aman dan terpercaya di Indonesia." url="https://i.dupoin.vip/_d3I3M8lp" />
              <LinkItem title="Exness (Luar)" description="Broker global terkemuka dengan kondisi trading eksekusi super instan, spread sangat ketat, serta kemudahan penarikan dana instan tanpa batas (unlimited)." url="https://one.exnessonelink.com/a/zhrd5j5znx" />
              <LinkItem title="PU Prime (Luar)" description="Pialang multi-aset bertaraf internasional dengan akses ke ribuan pasar global dan ketentuan trading yang fleksibel." url="https://puvip.co/la-partners/id/dNSc8EIZ" />
            </>
          )}

          {view === 'propfirm' && (
            <>
              <div className="text-[11px] text-[#ffb347]/80 mb-3 text-justify leading-relaxed bg-[#ffb347]/5 border border-[#ffb347]/20 p-3 rounded">
                Daftar perusahaan Proprietary Firm (Prop Firm) terkemuka. Perusahaan-perusahaan ini menyediakan modal bagi Anda setelah lulus tahap evaluasi (atau metode instant funding), dengan skema pembagian keuntungan tanpa risiko kehilangan modal pribadi.
              </div>
              <LinkItem title="FundedNext" description="Sistem evaluasi the best funded dengan statistik drawdown yang sangat bersahabat tanpa aturan konsistensi (consistency rules) yang mengikat, serta sistem trailing drawdown untuk tipe akun instant." url="https://app.fundednext.com/login" referral="REFUHI204" />
              <LinkItem title="WeMasterTrade" description="Pilihan akun instant funding terbaik (Best instant funding account) untuk langsung memulai trading dan menghasilkan profit tanpa proses evaluasi yang panjang." url="https://my.wemastertrade.com/register?ref=131780" referral="131780" />
              <LinkItem title="Funding Pips" description="Prop firm dengan aturan transparan, proses evaluasi yang objektif, dan kesempatan scaling bagi trader dari berbagai tingkat pengalaman." url="https://app.fundingpips.com/register?referral_code=BECCF7EE" referral="BECCF7EE" />
            </>
          )}
        </div>
      </TerminalBlock>
    </div>
  );
}

function TerminalBlock({ title, children, className = '' }: { title: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={`border border-[#ffb347]/30 bg-[#050505] p-2 flex flex-col ${className}`}>
      <div className="text-[10px] uppercase text-[#ffb347] border-b border-[#ffb347]/30 pb-1 mb-2 tracking-widest flex justify-between items-center">
        <span className="font-bold flex items-center gap-2">
          <Zap size={10} className="text-[#00ff00]" />
          {title}
        </span>
        <span className="text-[#00ff00] font-bold">[OK]</span>
      </div>
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function WidgetScaler({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[125%] h-[125%] origin-top-left scale-[0.8]">
        {children}
      </div>
    </div>
  );
}

function OrderBookTab() {
  const [view, setView] = useState<'rates' | 'heatmap'>('rates');

  return (
    <div className="flex flex-col gap-2 h-full p-2 animate-in fade-in duration-300 pb-20 bg-[#00ffcc]/10">
      <TerminalBlock title={view === 'rates' ? 'Nilai Tukar Mata Uang Silang (Cross Rates)' : 'Peta Panas Mata Uang (Heatmap)'} className="flex-1 min-h-[500px]">
        <div className="text-[10px] text-[#ffb347]/80 mb-3 border-b border-[#ffb347]/30 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 flex-none">
          <div className="max-w-full sm:max-w-[60%] text-justify leading-relaxed">
            {view === 'rates' ? (
              'Pantau nilai tukar secara langsung dari berbagai pasangan mata uang utama dan minor. Fitur ini membantu Anda menemukan peluang selisih harga (arbitrase) dan korelasi antar aset.'
            ) : (
              'Peta panas ini menunjukkan kekuatan dan kelemahan relatif setiap mata uang utama dalam 24 jam terakhir. Gunakan matriks ini untuk memfilter pasangan mata uang dengan tren pergerakan paling jelas.'
            )}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={() => setView('rates')}
              className={`flex-1 sm:flex-none px-3 py-2 border rounded font-bold shadow-sm transition-all ${view === 'rates' ? 'border-[#ffb347] bg-[#ffb347]/20 text-[#ffb347] shadow-[0_0_8px_rgba(255,179,71,0.4)]' : 'border-[#ffb347]/30 text-[#ffb347]/50 hover:bg-[#ffb347]/10'}`}
            >
              NILAI TUKAR
            </button>
            <button 
              onClick={() => setView('heatmap')}
              className={`flex-1 sm:flex-none px-3 py-2 border rounded font-bold shadow-sm transition-all ${view === 'heatmap' ? 'border-[#ffb347] bg-[#ffb347]/20 text-[#ffb347] shadow-[0_0_8px_rgba(255,179,71,0.4)]' : 'border-[#ffb347]/30 text-[#ffb347]/50 hover:bg-[#ffb347]/10'}`}
            >
              PETA PANAS
            </button>
          </div>
        </div>
        <div className="flex-1 w-full h-[500px]">
          <WidgetScaler>
            {view === 'rates' ? <ForexCrossRates /> : <ForexHeatMap />}
          </WidgetScaler>
        </div>
      </TerminalBlock>
    </div>
  );
}

function AnalogClock({ timeZone, label }: { timeZone: string, label: string }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = time.toLocaleString('en-US', { timeZone });
  const tzDate = new Date(dateStr);
  
  const hours = tzDate.getHours();
  const minutes = tzDate.getMinutes();
  const seconds = tzDate.getSeconds();

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-10 h-10 rounded-full border border-[#ffb347] bg-[#050505] shadow-[0_0_5px_rgba(255,179,71,0.2)]">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[3px] bg-[#ffb347]/50"
            style={{
              top: 1,
              left: 'calc(50% - 0.5px)',
              transformOrigin: '50% 19px',
              transform: `rotate(${i * 30}deg)`
            }}
          />
        ))}
        <div className="absolute w-[2px] h-[10px] bg-[#ffb347] rounded-full" 
          style={{ bottom: '50%', left: 'calc(50% - 1px)', transformOrigin: 'bottom center', transform: `rotate(${hourAngle}deg)` }} />
        <div className="absolute w-[1.5px] h-[14px] bg-[#ffb347] rounded-full" 
          style={{ bottom: '50%', left: 'calc(50% - 0.75px)', transformOrigin: 'bottom center', transform: `rotate(${minuteAngle}deg)` }} />
        <div className="absolute w-[1px] h-[16px] bg-red-500" 
          style={{ bottom: '50%', left: 'calc(50% - 0.5px)', transformOrigin: 'bottom center', transform: `rotate(${secondAngle}deg)` }} />
        <div className="absolute w-[3px] h-[3px] bg-[#ffb347] rounded-full top-[calc(50%-1.5px)] left-[calc(50%-1.5px)]" />
      </div>
      <div className="text-[8px] font-bold tracking-wider text-[#ffb347]">{label}</div>
    </div>
  );
}

function ForexSessions() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const utcHour = time.getUTCHours();
  
  const sessions = [
    { name: 'SYDNEY', start: 22, end: 7, wib: '05:00 - 14:00' },
    { name: 'TOKYO', start: 23, end: 8, wib: '06:00 - 15:00' },
    { name: 'LONDON', start: 7, end: 16, wib: '14:00 - 23:00' },
    { name: 'NEW YORK', start: 12, end: 21, wib: '19:00 - 04:00' },
  ];

  const isOpen = (start: number, end: number, current: number) => {
    if (start > end) {
      return current >= start || current < end;
    }
    return current >= start && current < end;
  };

  return (
    <div className="text-[9px] w-full mt-2 bg-[#1E3A8A]/20 p-2 rounded border border-[#1E3A8A]/50">
      <div className="border-b border-[#ffb347]/30 pb-1 mb-1 text-[#ffb347]/70 font-bold">
        SESI PASAR GLOBAL
      </div>
      <div className="text-[#ffb347]/60 text-[8px] mb-2 leading-tight text-justify">
        Pasar forex beroperasi 24 jam sehari yang dibagi menjadi empat sesi utama. Mengetahui sesi aktif membantu mengidentifikasi waktu dengan likuiditas dan volatilitas tertinggi.
      </div>
      <div className="flex justify-between border-b border-[#ffb347]/30 pb-1 mb-1 text-[#ffb347]/70 font-bold">
        <span className="w-1/3">SESI PASAR</span>
        <span className="w-1/3 text-center">WAKTU (WIB)</span>
        <span className="w-1/3 text-right">STATUS</span>
      </div>
      {sessions.map(s => {
        const active = isOpen(s.start, s.end, utcHour);
        return (
          <div key={s.name} className={`flex justify-between py-0.5 ${active ? 'text-[#00ff00]' : 'text-[#ffb347]/50'}`}>
            <span className="w-1/3 font-bold">{s.name}</span>
            <span className="w-1/3 text-center">{s.wib}</span>
            <span className="w-1/3 text-right">{active ? 'BUKA' : 'TUTUP'}</span>
          </div>
        );
      })}
      
      <div className="mt-3">
        <div className="border-b border-[#ffb347]/30 pb-1 mb-1 text-[#ffb347]/70 font-bold">
          ZONA PENUH AKSI (KILL ZONES)
        </div>
        <div className="text-[#ffb347]/60 text-[8px] mb-1.5 leading-tight text-justify">
          Kill zone adalah periode waktu dengan volume dan volatilitas perdagangan tertinggi, seringkali menjadi peluang terbaik bagi trader untuk mencari area entri yang paling akurat.
        </div>
        <div className="flex justify-between py-0.5 text-[#ffb347]">
          <span className="w-1/2 font-bold">Sesi Asia (Asian Killzone)</span>
          <span className="w-1/2 text-right">07:00 - 11:00 WIB</span>
        </div>
        <div className="flex justify-between py-0.5 text-[#ffb347]">
          <span className="w-1/2 font-bold">Pembukaan London</span>
          <span className="w-1/2 text-right">14:00 - 17:00 WIB</span>
        </div>
        <div className="flex justify-between py-0.5 text-[#ffb347]">
          <span className="w-1/2 font-bold">Pembukaan New York</span>
          <span className="w-1/2 text-right">18:00 - 21:00 WIB</span>
        </div>
        <div className="flex justify-between py-0.5 text-[#ffb347]">
          <span className="w-1/2 font-bold">Penutupan London</span>
          <span className="w-1/2 text-right">22:00 - 00:00 WIB</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentTab, setCurrentTab] = useState('beranda');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('en-US', { hour12: false });
  const dateString = time.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });

  const renderContent = () => {
    switch (currentTab) {
      case 'beranda':
        return (
          <div className="flex flex-col gap-2 h-full p-2 animate-in fade-in duration-300">
            <TerminalBlock title="Selamat Datang di Venta Markets">
              <div className="text-[10px] text-[#ffb347] font-mono leading-tight mb-2">
                Pusat data informasi keuangan, memberikan penawaran harga secara langsung, berita analisis makro ekonomi, dan pemetaan pasar secara menyeluruh untuk memantau pergerakan dengan tingkat akurasi tinggi.
              </div>
              
              <div className="w-full min-h-[44px] bg-black border-y border-[#ffb347]/30 mb-2 overflow-hidden flex items-center relative">
                <TickerTapeWidget />
              </div>

              <div className="flex justify-between items-center px-2 py-2 mb-2">
                <AnalogClock timeZone="Asia/Jakarta" label="JAKARTA" />
                <AnalogClock timeZone="Australia/Sydney" label="SYDNEY" />
                <AnalogClock timeZone="Europe/London" label="LONDON" />
                <AnalogClock timeZone="America/New_York" label="NEW YORK" />
              </div>
              
              <ForexSessions />
            </TerminalBlock>
            <TerminalBlock title="Ringkasan Pasar Global (Real-Time)" className="flex-1 min-h-[500px]">
              <WidgetScaler>
                <MarketOverviewWidget />
              </WidgetScaler>
            </TerminalBlock>
          </div>
        );
      case 'analisis':
        return (
          <div className="flex flex-col gap-2 h-full p-2 overflow-y-auto animate-in fade-in duration-300 pb-20 bg-[#0B1221]/80">
            <TerminalBlock title="Analisis Grafik Emas (XAUUSD)">
              <div className="text-[10px] text-[#ffb347]/80 mb-2 border-b border-[#ffb347]/30 pb-2 leading-tight text-justify">
                Modul ini menampilkan pergerakan harga emas secara real-time yang langsung terhubung dengan data global. Gunakan alat pemetaan canggih ini untuk menentukan level dukungan (support) dan resistensi (resistance) kunci yang krusial dalam perencanaan perdagangan harian Anda.
              </div>
              <div className="h-[350px]">
                <WidgetScaler>
                  <AdvancedChart />
                </WidgetScaler>
              </div>
            </TerminalBlock>
            <TerminalBlock title="Analisis Teknikal Lanjutan (XAUUSD)" className="mt-2 min-h-[450px]">
              <div className="text-[10px] text-[#ffb347]/80 mb-2 border-b border-[#ffb347]/30 pb-2 leading-tight text-justify">
                Panel indikator teknikal otomatis. Dilengkapi dengan berbagai metrik pengukuran sentimen seperti RSI (Relative Strength Index), MACD, serta persilangan Moving Averages yang ditujukan untuk membantu Anda memvalidasi sinyal entri, momentum, dan mengukur kekuatan arah tren pasar secara komprehensif.
              </div>
              <div className="h-[450px]">
                <WidgetScaler>
                  <TechnicalAnalysisWidget />
                </WidgetScaler>
              </div>
            </TerminalBlock>
          </div>
        );
      case 'news':
        return (
          <div className="flex flex-col gap-2 h-full p-2 animate-in fade-in duration-300 bg-[#00008B]/30">
            <TerminalBlock title="Berita Makro Ekonomi Global">
              <div className="text-[10px] text-[#ffb347]/80 mb-2 border-b border-[#ffb347]/30 pb-2 leading-tight text-justify">
                Pusat informasi berita ekonomi terkini yang memengaruhi pergerakan aset investasi di seluruh dunia. Dapatkan laporan teraktual tentang kebijakan bank sentral, ketegangan geopolitik, dan data fundamental lainnya. Sentimen berita berdampak tinggi seringkali menyebabkan lonjakan volatilitas seketika di pasar, perhatikan setiap pembaruan dengan seksama.
              </div>
              <div className="h-[400px]">
                <WidgetScaler>
                  <NewsTimeline />
                </WidgetScaler>
              </div>
            </TerminalBlock>
          </div>
        );
      case 'kalender':
        return (
          <div className="flex flex-col gap-2 h-full p-2 animate-in fade-in duration-300 bg-[#00ffff]/10">
            <TerminalBlock title="Kalender Ekonomi">
              <div className="text-[10px] text-[#ffb347]/80 mb-2 border-b border-[#ffb347]/30 pb-2 leading-tight text-justify">
                Jadwal rilis data ekonomi krusial harian dari negara-negara dengan kekuatan ekonomi global. Bandingkan secara langsung angka rilis sebelumnya (previous), perkiraan analis (forecast), dan data teraktual (actual) untuk mengukur tingkat kejutan yang dapat menggerakkan pasar. Zona waktu pada kalender ini telah disinkronkan secara otomatis mengikuti perangkat Anda.
              </div>
              <div className="h-[400px]">
                <WidgetScaler>
                  <EconomicCalendar />
                </WidgetScaler>
              </div>
            </TerminalBlock>
          </div>
        );
      case 'orderbook':
        return <OrderBookTab />;
      case 'portal':
        return <PortalTab />;
      case 'signal':
        return <SignalTab />;
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'beranda', icon: Home, label: 'BERANDA' },
    { id: 'portal', icon: Briefcase, label: 'PORTAL' },
    { id: 'analisis', icon: LineChart, label: 'ANALISIS' },
    { id: 'signal', icon: Zap, label: 'SINYAL' },
    { id: 'news', icon: Newspaper, label: 'BERITA' },
    { id: 'kalender', icon: Calendar, label: 'KALENDER' },
    { id: 'orderbook', icon: BookOpen, label: 'ORDER BOOK' },
  ];

  return (
    <div className="h-screen w-screen flex flex-col bg-black text-[#ffb347] font-mono overflow-hidden">
      {/* Top Header - Fixed */}
      <div className="flex-none z-50 bg-[#111] border-b border-[#ffb347]/30">
        <div className="px-3 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="text-[#ffb347]" size={18} />
            <span className="font-bold tracking-widest text-[#ffb347] text-base">Venta Markets</span>
          </div>
          <div className="flex flex-col items-end gap-1.5 text-[9px] font-mono leading-none">
            <div className="flex items-center gap-1">
              <Activity size={10} className="text-[#00ff00] animate-pulse" />
              <span className="text-[#00ff00]">Data Real-Time</span>
            </div>
            <div className="flex gap-1.5 bg-[#1E3A8A]/30 border border-[#1E3A8A] px-2 py-1.5 rounded text-[#ffb347] font-bold text-[10px] shadow-sm">
              <span>{dateString}</span>
              <span>{timeString}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto bg-[#0a0a0a]">
        {renderContent()}
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="flex-none bg-[#111] border-t border-[#ffb347]/30 flex justify-around" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0px)' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center justify-center w-full py-3 transition-colors ${
                isActive ? 'text-[#ffb347] bg-[#ffb347]/10 border-t-2 border-[#ffb347]' : 'text-[#ffb347]/40 border-t-2 border-transparent'
              }`}
            >
              <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
              <span className="text-[9px] mt-1.5 font-bold tracking-wider">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  );
}
