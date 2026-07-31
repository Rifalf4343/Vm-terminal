import React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'tv-ticker-tape': any;
      'tv-market-overview': any;
      'tv-forex-table': any;
      'tv-technical-analysis': any;
    }
  }
}

export {};

