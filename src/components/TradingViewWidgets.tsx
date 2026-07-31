import { useEffect, useRef, memo } from 'react';

export const TickerTapeWidget = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!containerRef.current || isLoaded.current) return;
    isLoaded.current = true;
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        { "proName": "IG:NASDAQ", "title": "NASDAQ" },
        { "proName": "CAPITALCOM:SPX500", "title": "S&P 500" },
        { "proName": "TVC:GOLD", "title": "Gold" },
        { "proName": "TVC:SILVER", "title": "Silver" },
        { "proName": "TVC:USOIL", "title": "WTI Crude Oil" },
        { "proName": "TVC:UKOIL", "title": "Brent Crude Oil" },
        { "proName": "FOREXCOM:EURUSD", "title": "EUR/USD" },
        { "proName": "FOREXCOM:GBPUSD", "title": "GBP/USD" },
        { "proName": "FOREXCOM:NZDUSD", "title": "NZD/USD" },
        { "proName": "FOREXCOM:USDJPY", "title": "USD/JPY" },
        { "proName": "FOREXCOM:USDCHF", "title": "USD/CHF" },
        { "proName": "FOREXCOM:USDCAD", "title": "USD/CAD" }
      ],
      "showSymbolLogo": true,
      "colorTheme": "dark",
      "isTransparent": true,
      "displayMode": "compact",
      "locale": "id"
    });
    
    containerRef.current.innerHTML = '';
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    
    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
    </div>
  );
});

export const MarketOverviewWidget = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!containerRef.current || isLoaded.current) return;
    isLoaded.current = true;
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "colorTheme": "dark",
      "dateRange": "12M",
      "showChart": true,
      "locale": "id",
      "width": "100%",
      "height": "100%",
      "largeChartUrl": "",
      "isTransparent": false,
      "showSymbolLogo": true,
      "showFloatingTooltip": false,
      "tabs": [
        {
          "title": "Commodity",
          "symbols": [
            { "s": "TVC:GOLD" },
            { "s": "FOREXCOM:XAGUSD" },
            { "s": "FOREXCOM:COPPER" },
            { "s": "OANDA:XPTUSD" },
            { "s": "FOREXCOM:USOIL" },
            { "s": "FOREXCOM:UKOIL" }
          ],
          "originalTitle": "Commodity"
        },
        {
          "title": "Currency",
          "symbols": [
            { "s": "FOREXCOM:EURUSD" },
            { "s": "FOREXCOM:GBPUSD" },
            { "s": "FOREXCOM:AUDUSD" },
            { "s": "FOREXCOM:NZDUSD" },
            { "s": "FOREXCOM:USDJPY" },
            { "s": "FOREXCOM:USDCHF" },
            { "s": "FOREXCOM:AUDUSD" }
          ],
          "originalTitle": "Currency"
        },
        {
          "title": "Index",
          "symbols": [
            { "s": "CAPITALCOM:NAS100" },
            { "s": "SPCFD:SPX" },
            { "s": "IDX:COMPOSITE" },
            { "s": "TVC:DXY" },
            { "s": "TVC:EXY" },
            { "s": "TVC:BXY" },
            { "s": "TVC:JXY" }
          ],
          "originalTitle": "Index"
        }
      ]
    });
    
    containerRef.current.innerHTML = '';
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = 'calc(100% - 32px)';
    widgetDiv.style.width = '100%';
    
    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container h-full w-full" ref={containerRef}>
    </div>
  );
});

export const TechnicalAnalysisWidget = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!containerRef.current || isLoaded.current) return;
    isLoaded.current = true;
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "interval": "1m",
      "width": "100%",
      "isTransparent": true,
      "height": "100%",
      "symbol": "FOREXCOM:XAUUSD",
      "showIntervalTabs": true,
      "locale": "id",
      "colorTheme": "dark"
    });
    
    containerRef.current.innerHTML = '';
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = 'calc(100% - 32px)';
    widgetDiv.style.width = '100%';
    
    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container h-full w-full" ref={containerRef}>
    </div>
  );
});

export const AdvancedChart = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!containerRef.current || isLoaded.current) return;
    isLoaded.current = true;
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "allow_symbol_change": true,
      "calendar": false,
      "details": false,
      "hide_side_toolbar": true,
      "hide_top_toolbar": false,
      "hide_legend": false,
      "hide_volume": false,
      "hotlist": false,
      "interval": "15",
      "locale": "id",
      "save_image": true,
      "style": "1",
      "symbol": "FOREXCOM:XAUUSD",
      "theme": "dark",
      "timezone": "Asia/Jakarta",
      "backgroundColor": "rgba(0, 0, 0, 1)",
      "gridColor": "rgba(99, 99, 99, 0.06)",
      "watchlist": [],
      "withdateranges": false,
      "compareSymbols": [],
      "studies": [],
      "autosize": true
    });
    
    containerRef.current.innerHTML = '';
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = 'calc(100% - 32px)';
    widgetDiv.style.width = '100%';
    
    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container h-full w-full" ref={containerRef}>
    </div>
  );
});

export const NewsTimeline = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!containerRef.current || isLoaded.current) return;
    isLoaded.current = true;
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "displayMode": "adaptive",
      "feedMode": "market",
      "colorTheme": "dark",
      "isTransparent": true,
      "locale": "id",
      "market": "forex",
      "width": "100%",
      "height": "100%"
    });
    
    containerRef.current.innerHTML = '';
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = '100%';
    widgetDiv.style.width = '100%';
    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container h-full w-full" ref={containerRef}>
    </div>
  );
});

export const EconomicCalendar = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!containerRef.current || isLoaded.current) return;
    isLoaded.current = true;
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "colorTheme": "dark",
      "isTransparent": true,
      "locale": "en",
      "countryFilter": "us,de,gb,jp,id",
      "importanceFilter": "0,1",
      "width": "100%",
      "height": "100%"
    });
    
    containerRef.current.innerHTML = '';
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = '100%';
    widgetDiv.style.width = '100%';
    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container h-full w-full" ref={containerRef}>
    </div>
  );
});

export const ForexCrossRates = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!containerRef.current || isLoaded.current) return;
    isLoaded.current = true;
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "100%",
      "currencies": [
        "EUR",
        "USD",
        "JPY",
        "GBP",
        "CHF",
        "AUD",
        "CAD",
        "IDR"
      ],
      "isTransparent": true,
      "colorTheme": "dark",
      "locale": "id"
    });
    
    containerRef.current.innerHTML = '';
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = '100%';
    widgetDiv.style.width = '100%';
    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container h-full w-full" ref={containerRef}>
    </div>
  );
});

export const ForexHeatMap = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!containerRef.current || isLoaded.current) return;
    isLoaded.current = true;
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "100%",
      "currencies": [
        "EUR",
        "USD",
        "JPY",
        "GBP",
        "CHF",
        "AUD",
        "CAD",
        "IDR"
      ],
      "isTransparent": true,
      "colorTheme": "dark",
      "locale": "id"
    });
    
    containerRef.current.innerHTML = '';
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = '100%';
    widgetDiv.style.width = '100%';
    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container h-full w-full" ref={containerRef}>
    </div>
  );
});

