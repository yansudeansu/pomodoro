if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const d=e=>s(e,o),f={module:{uri:o},exports:t,require:d};i[o]=Promise.all(n.map((e=>f[e]||d(e)))).then((e=>(r(...e),t)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-DKs9sGU6.css",revision:null},{url:"assets/index-DsvD4eqH.js",revision:null},{url:"index.html",revision:"680077e240396cae9f736280d306b8b7"},{url:"registerSW.js",revision:"b4b19e86226a500fae8098cf31b0dfa8"},{url:"apple-touch-icon.png",revision:"3d33f2edd54e21aafb1c645bd8baa5b5"},{url:"favicon.ico",revision:"839379d272e24de926f5794b87b31b73"},{url:"pwa-192x192.png",revision:"c30a8424e74fd29adbc47bd4ac776772"},{url:"pwa-512x512.png",revision:"1daf7b76570a7b9ada2955d0640f345d"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"manifest.webmanifest",revision:"a8eff0ff2e35ad4f43b4d681d52dfb17"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
