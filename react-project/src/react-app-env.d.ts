/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_API: string;
    REACT_APP_PRODUCT:string;
    REACT_APP_CATEGORIES: string;
    REACT_APP_COLORS: string;
    REACT_APP_BRANDS: string;
  }
}