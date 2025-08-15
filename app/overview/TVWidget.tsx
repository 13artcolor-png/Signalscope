
'use client';
import { useEffect, useRef } from 'react';

export default function TVWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const s = document.createElement('script');
    s.src = 'https://s3.tradingview.com/tv.js';
    s.onload = () => {
      // @ts-ignore
      new TradingView.widget({
        symbol: 'FX:EURUSD',
        interval: '60',
        theme: 'light',
        autosize: true,
        container_id: ref.current!,
      });
    };
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);

  return <div ref={ref} style={{ height: 520 }} />;
}
