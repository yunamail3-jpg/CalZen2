const CACHE_NAME = 'calzen-cache-v2';
const FILES_TO_CACHE = ['.','index.html','style.css','app.js','manifest.json','icon-192.png','icon-512.png'];

self.addEventListener('install', (evt)=>{
  evt.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});
self.addEventListener('activate', (evt)=>{ evt.waitUntil(clients.claim()); });
self.addEventListener('fetch', (evt)=>{ evt.respondWith(caches.match(evt.request).then(resp=>resp||fetch(evt.request))); });
