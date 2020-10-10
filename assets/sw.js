/* comment section for HUGO varible fingerprinting

{{ $indexJS:= resources.Get "js/index.js" | minify | fingerprint }}
{{ $eventsJS := resources.Get "js/events.js" |minify | fingerprint}}
{{ $educationJS := resources.Get "js/education.js" |minify | fingerprint}}
{{ $style := resources.Get "sass/config.scss" | resources.ExecuteAsTemplate "sass/config.scss" . | toCSS | minify | fingerprint}}0}}
{{$manifest := resources.Get "manifest.json" | resources.ExecuteAsTemplate "manifest.json" . | minify | fingerprint}}
 */
const staticCacheName = 'static-cache-2020-10-20';
const dynamicCacheName = 'dynamic-cache';
const assets = [
  '/',
  '{{$manifest.RelPermalink}}',
  '{{$indexJS.RelPermalink}}',
  '{{$eventsJS.RelPermalink}}',
  '{{$educationJS.RelPermalink}}',
  '{{$style.RelPermalink}}',
  'https://fonts.googleapis.com/css?family=Manjari&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', e => {
  console.log('activating service worker');
  // e.waitUntil(
  // caches.keys().then(keys => {
  //   console.log(keys.filter(key => key !== staticCacheName));
  //   return Promise.all(
  //     keys
  //       .filter(key => key !== staticCacheName)
  //       .map(key => caches.delete(key))
  //   );
  // })
  // );
});

self.addEventListener('fetch', e => {
  const { request } = e;

  // skip the request. if request is not made with http protocol (browser extensions)
  if (!(request.url.indexOf('http') === 0)) return;
  e.respondWith(
    caches
      .match(request)
      .then(
        cacheRes =>
          cacheRes ||
          fetch(request).then(res =>
            caches.open(dynamicCacheName).then(cache => {
              cache.put(request.url, res.clone());
              return res;
            })
          )
      )
      .catch(() => {
        console.warn('HERE');
        caches.match('/').then(res => {
          console.log('/', res);
        });
        caches.match('/offline').then(res => {
          console.log('/offline', res);
        });
        return caches.match('/');
      })
  );
});
