if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>c(e,i),f={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>f[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/1210.7fca0f8b6f7ad0e6.js",revision:"7fca0f8b6f7ad0e6"},{url:"/_next/static/chunks/1281.385c1345a1453356.js",revision:"385c1345a1453356"},{url:"/_next/static/chunks/1354.55558489103cdffc.js",revision:"55558489103cdffc"},{url:"/_next/static/chunks/1373.41f40225fe5f4baf.js",revision:"41f40225fe5f4baf"},{url:"/_next/static/chunks/1459.98ea36ccb7147986.js",revision:"98ea36ccb7147986"},{url:"/_next/static/chunks/1575.76edf6d4b454b822.js",revision:"76edf6d4b454b822"},{url:"/_next/static/chunks/1675.728d390a15b0d0c6.js",revision:"728d390a15b0d0c6"},{url:"/_next/static/chunks/1876.b0ebf86f56b5a2a4.js",revision:"b0ebf86f56b5a2a4"},{url:"/_next/static/chunks/1916.114672ca800bfcb6.js",revision:"114672ca800bfcb6"},{url:"/_next/static/chunks/2024.84123c51c52c7aaa.js",revision:"84123c51c52c7aaa"},{url:"/_next/static/chunks/215.107d70f4dc257ca6.js",revision:"107d70f4dc257ca6"},{url:"/_next/static/chunks/2398.66fd5f5745443ec2.js",revision:"66fd5f5745443ec2"},{url:"/_next/static/chunks/2480.2dc8c88f57ce68e9.js",revision:"2dc8c88f57ce68e9"},{url:"/_next/static/chunks/2532.721648d856a454ed.js",revision:"721648d856a454ed"},{url:"/_next/static/chunks/2569.f08c4cda5139e65e.js",revision:"f08c4cda5139e65e"},{url:"/_next/static/chunks/2642.6706fbca8b144400.js",revision:"6706fbca8b144400"},{url:"/_next/static/chunks/2758.4a14f1ddaf16e1fb.js",revision:"4a14f1ddaf16e1fb"},{url:"/_next/static/chunks/2785.f107fb033eef68c6.js",revision:"f107fb033eef68c6"},{url:"/_next/static/chunks/2855c779-13a0c1759a39538f.js",revision:"13a0c1759a39538f"},{url:"/_next/static/chunks/2959.e3ef82026db1572e.js",revision:"e3ef82026db1572e"},{url:"/_next/static/chunks/3046.cb25c4c3ca766d36.js",revision:"cb25c4c3ca766d36"},{url:"/_next/static/chunks/3183.643c8fb3417aa4a1.js",revision:"643c8fb3417aa4a1"},{url:"/_next/static/chunks/3188.499f08cbbc8fb0ff.js",revision:"499f08cbbc8fb0ff"},{url:"/_next/static/chunks/3233-17e29daa52705ee7.js",revision:"17e29daa52705ee7"},{url:"/_next/static/chunks/33.d451769f86a4cac8.js",revision:"d451769f86a4cac8"},{url:"/_next/static/chunks/379.45b622118cab7b7c.js",revision:"45b622118cab7b7c"},{url:"/_next/static/chunks/3798.91132fb881ede90f.js",revision:"91132fb881ede90f"},{url:"/_next/static/chunks/4013.a51e48751cead349.js",revision:"a51e48751cead349"},{url:"/_next/static/chunks/406.7ce461d79f3d2a36.js",revision:"7ce461d79f3d2a36"},{url:"/_next/static/chunks/4293.b7a4528771234f6a.js",revision:"b7a4528771234f6a"},{url:"/_next/static/chunks/5163.45e8a6ceaa6e2553.js",revision:"45e8a6ceaa6e2553"},{url:"/_next/static/chunks/5351.663c15264b32adee.js",revision:"663c15264b32adee"},{url:"/_next/static/chunks/5458.700f3750438995d9.js",revision:"700f3750438995d9"},{url:"/_next/static/chunks/5811.3273bdefe75b9374.js",revision:"3273bdefe75b9374"},{url:"/_next/static/chunks/5898.c48b57048ff983e3.js",revision:"c48b57048ff983e3"},{url:"/_next/static/chunks/5941-4482f9c35fd2b0f2.js",revision:"4482f9c35fd2b0f2"},{url:"/_next/static/chunks/6044.d13e741ceb5bcac7.js",revision:"d13e741ceb5bcac7"},{url:"/_next/static/chunks/6746.17c56f4daf9a312a.js",revision:"17c56f4daf9a312a"},{url:"/_next/static/chunks/6831.a1eaf45e69f0f68e.js",revision:"a1eaf45e69f0f68e"},{url:"/_next/static/chunks/6835.8542546472c902a9.js",revision:"8542546472c902a9"},{url:"/_next/static/chunks/6942.c08085427c39966c.js",revision:"c08085427c39966c"},{url:"/_next/static/chunks/7485-6ad47b4903255a20.js",revision:"6ad47b4903255a20"},{url:"/_next/static/chunks/7559.1440372da99e1461.js",revision:"1440372da99e1461"},{url:"/_next/static/chunks/7594.d925aa2e5c4922cd.js",revision:"d925aa2e5c4922cd"},{url:"/_next/static/chunks/7652.8c2df55e68488cf7.js",revision:"8c2df55e68488cf7"},{url:"/_next/static/chunks/770e1402.54ffffe9303cff85.js",revision:"54ffffe9303cff85"},{url:"/_next/static/chunks/82ea35ab-f596be1e567b63be.js",revision:"f596be1e567b63be"},{url:"/_next/static/chunks/8504.42960a35d070c714.js",revision:"42960a35d070c714"},{url:"/_next/static/chunks/8581.08543eb5b0fe0a6e.js",revision:"08543eb5b0fe0a6e"},{url:"/_next/static/chunks/8692.21c876b996b56516.js",revision:"21c876b996b56516"},{url:"/_next/static/chunks/8813.cebe22bab49d19d0.js",revision:"cebe22bab49d19d0"},{url:"/_next/static/chunks/8818.9a43b613c4983856.js",revision:"9a43b613c4983856"},{url:"/_next/static/chunks/8845.1798d9cc2ad15084.js",revision:"1798d9cc2ad15084"},{url:"/_next/static/chunks/8872.7d6122d4bfc5aa98.js",revision:"7d6122d4bfc5aa98"},{url:"/_next/static/chunks/9070.17e34314f0cd2c19.js",revision:"17e34314f0cd2c19"},{url:"/_next/static/chunks/9085.ca1a8b5041a924c3.js",revision:"ca1a8b5041a924c3"},{url:"/_next/static/chunks/9173.875aeaf5951f02d2.js",revision:"875aeaf5951f02d2"},{url:"/_next/static/chunks/9205-3965dbb628bbe552.js",revision:"3965dbb628bbe552"},{url:"/_next/static/chunks/9243.64e605afed451da9.js",revision:"64e605afed451da9"},{url:"/_next/static/chunks/9314.3ea99394bfbb5aec.js",revision:"3ea99394bfbb5aec"},{url:"/_next/static/chunks/9343.bf30f06015da0805.js",revision:"bf30f06015da0805"},{url:"/_next/static/chunks/9498.1ae55fa6b23e8830.js",revision:"1ae55fa6b23e8830"},{url:"/_next/static/chunks/981.8eb2e0cb9db8d18a.js",revision:"8eb2e0cb9db8d18a"},{url:"/_next/static/chunks/993-7cfcaf1052237df9.js",revision:"7cfcaf1052237df9"},{url:"/_next/static/chunks/a4084966-6359f0ee99c3d318.js",revision:"6359f0ee99c3d318"},{url:"/_next/static/chunks/fb7d5399.3940acc9ac8268a7.js",revision:"3940acc9ac8268a7"},{url:"/_next/static/chunks/framework-a2363dd3c3dbe572.js",revision:"a2363dd3c3dbe572"},{url:"/_next/static/chunks/main-59e365e42a89a297.js",revision:"59e365e42a89a297"},{url:"/_next/static/chunks/pages/_error-82b79221b9ed784b.js",revision:"82b79221b9ed784b"},{url:"/_next/static/chunks/pages/admin-b83ee4740b28ba36.js",revision:"b83ee4740b28ba36"},{url:"/_next/static/chunks/pages/chat-3861077757c10c85.js",revision:"3861077757c10c85"},{url:"/_next/static/chunks/pages/claim/%5BwalletAddress%5D-5e8c70c699124667.js",revision:"5e8c70c699124667"},{url:"/_next/static/chunks/pages/index-96f12326fb0d1241.js",revision:"96f12326fb0d1241"},{url:"/_next/static/chunks/pages/privacy-policy-1e45cf178e821335.js",revision:"1e45cf178e821335"},{url:"/_next/static/chunks/pages/profile/%5BwalletAddress%5D-26aba16e94c93403.js",revision:"26aba16e94c93403"},{url:"/_next/static/chunks/pages/terms-of-service-b51ec7a5b1b5818a.js",revision:"b51ec7a5b1b5818a"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-fd0cf275df9ab268.js",revision:"fd0cf275df9ab268"},{url:"/_next/static/css/3bc388c7e61281a8.css",revision:"3bc388c7e61281a8"},{url:"/_next/static/css/d05eb01de880046a.css",revision:"d05eb01de880046a"},{url:"/_next/static/vDHlWffSiQf_hmlW-E101/_buildManifest.js",revision:"451e3896d8903396660faca2bec953fb"},{url:"/_next/static/vDHlWffSiQf_hmlW-E101/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"4436a21b8bb4a74559ab8f5e7faa69e8"},{url:"/icon-192x192.png",revision:"ded6829b296630aa154ab436427778eb"},{url:"/icon-256x256.png",revision:"5e5a9ddfdf8d00c09155bad8c453b619"},{url:"/icon-384x384.png",revision:"390b7e2509bb2e7314a0dc06369fa571"},{url:"/icon-512x512.png",revision:"20bcca3ed0b92cfbce16e8a8a21e5138"},{url:"/images/homecover.jpg",revision:"3da62034cb2de9ceb8d89fef983b85ca"},{url:"/manifest.json",revision:"ab4af3f372883a355271be4ac759ce40"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
