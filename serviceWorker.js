//Cache polyfil to support cacheAPI in all browsers
importScripts('./cache-polyfill.js');

var cacheName = 'cache-v4';

//Files to save in cache
var files = [
  "./",
  "https://www.uta.edu/academics/faculty/profile?username=laiken",
  "https://www.google.com/search?q=currency+converter+for+japan",
  "./index.html?utm=homescreen", //SW treats query string as new request
  "./maps.html",
  "./translations.html",
  "./calendar.html",
  "./emergency_contacts.html",
  "./emergency_styles.css",
  "./images/calendar.png",
  "./images/maps.png",
  "./images/photos.png",
  "./images/japan-bg.png",
  "images/translations_bg.png",
  "images/translations_icon.png",
  "./images/contacts.png",
  "./audio/Excuse Me or Sorry すみません (Sumimasen).mp3",
  "./audio/Good Evening こんばんは (konbanwa).mp3",
  "./audio/Good Morning おはよう (Ohayo).mp3",
  "./audio/Hello or Good Afternoon (Kon'nichiwa).mp3",
  "./audio/matane.mp3",
  "./audio/Thank You ありがとうございました (Arigatogozaimasu).mp3",
  "./audio/where-is-the-bathroom.mp3",
  "./audio/Yes はい (Hai).mp3",
  "./audio/You’re Welcome ありがとうございました (doitashimashite).mp3",
  "./assets/Akihabara.pdf",
  "./assets/Ameyoko.pdf",
  "./assets/Before_you_fly.pdf",
  "./assets/Arashiyama.pdf",
  "./assets/Food.pdf",
  "./assets/Fushumi_Inari_Shrine.pdf",
  "./assets/Gion_District.pdf",
  "./assets/Great_Buddha.pdf",
  "./assets/Hachiko_Statue.pdf",
  "./assets/IC_Train.pdf",
  "./assets/Kyoto.pdf",
  "./assets/Locations_and_Info.pdf",
  "./assets/Meiji_Shrine.pdf",
  "./assets/Miraikan.pdf",
  "./assets/Nara.pdf",
  "./assets/Prep_for_your_flight.pdf",
  "./assets/Sengakuji_Temple.pdf",
  "./assets/Shibuya_Crossing.pdf",
  "./assets/Starbucks.pdf",
  "./assets/Summer.pdf",
  "./assets/teamLab.pdf",
  "./assets/Tokyo.pdf",
  "./assets/Yokohama.pdf",
  "./assets/Zushi_Beach.pdf",
  "https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700", //caching 3rd party content
  // 'https://www.google.com/maps/d/u/0/embed?mid=1eVbTmew15w76MJqj2PwyyIxafKV99Qow',
  // 'https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&src=YnJtYXJ0aW5lejkyMUBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Nzk5bm1ybDJxbWNxYjRsMW42YjNnZjFiN29AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%23B39DDB&color=%230B8043',
  "./css/styles.css",
  "./images/icons/android-chrome-192x192.png",
  "./images/push-on.png",
  "./images/push-off.png",
  "./images/icons/favicon-16x16.png",
  "./images/icons/favicon-32x32.png",
  "./js/main.js",
  "./js/app.js",
  "./js/offline.js",
  "./js/push.js",
  "./js/sync.js",
  "./js/toast.js",
  "./js/share.js",
  "./js/menu.js",
  "./manifest.json",
];

//Adding `install` event listener
self.addEventListener('install', (event) => {
  console.info('Event: Install');

  event.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      //[] of files to cache & if any of the file not present `addAll` will fail
      return cache.addAll(files)
      .then(() => {
        console.info('All files are cached');
        return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
      })
      .catch((error) =>  {
        console.error('Failed to cache', error);
      })
    })
  );
});

/*
  FETCH EVENT: triggered for every request made by index page, after install.
*/

//Adding `fetch` event listener
self.addEventListener('fetch', (event) => {
  console.info('Event: Fetch');

  var request = event.request;
  var url = new URL(request.url);
  if (url.origin === location.origin) {
    // Static files cache
    event.respondWith(cacheFirst(request));
  } else {
    // Dynamic API cache
    event.respondWith(networkFirst(request));
  }

  // // Checking for navigation preload response
  // if (event.preloadResponse) {
  //   console.info('Using navigation preload');
  //   return response;
  // }
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

async function networkFirst(request) {
  const dynamicCache = await caches.open(cacheName);
  try {
    const networkResponse = await fetch(request);
    // Cache the dynamic API response
    dynamicCache.put(request, networkResponse.clone()).catch((err) => {
      console.warn(request.url + ': ' + err.message);
    });
    return networkResponse;
  } catch (err) {
    const cachedResponse = await dynamicCache.match(request);
    return cachedResponse;
  }
}

/*
  ACTIVATE EVENT: triggered once after registering, also used to clean up caches.
*/

//Adding `activate` event listener
self.addEventListener('activate', (event) => {
  console.info('Event: Activate');

  //Navigation preload is help us make parallel request while service worker is booting up.
  //Enable - chrome://flags/#enable-service-worker-navigation-preload
  //Support - Chrome 57 beta (behing the flag)
  //More info - https://developers.google.com/web/updates/2017/02/navigation-preload#the-problem

  // Check if navigationPreload is supported or not
  // if (self.registration.navigationPreload) { 
  //   self.registration.navigationPreload.enable();
  // }
  // else if (!self.registration.navigationPreload) { 
  //   console.info('Your browser does not support navigation preload.');
  // }

  //Remove old and unwanted caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache); //Deleting the old cache (cache v1)
          }
        })
      );
    })
    .then(function () {
      console.info("Old caches are cleared!");
      // To tell the service worker to activate current one 
      // instead of waiting for the old one to finish.
      return self.clients.claim(); 
    }) 
  );
});

/*
  PUSH EVENT: triggered everytime, when a push notification is received.
*/

//Adding `push` event listener
self.addEventListener('push', (event) => {
  console.info('Event: Push');

  var title = 'Push notification demo';
  var body = {
    'body': 'click to return to application',
    'tag': 'demo',
    'icon': './images/icons/apple-touch-icon.png',
    'badge': './images/icons/apple-touch-icon.png',
    //Custom actions buttons
    'actions': [
      { 'action': 'yes', 'title': 'I ♥ this app!'},
      { 'action': 'no', 'title': 'I don\'t like this app'}
    ]
  };

  event.waitUntil(self.registration.showNotification(title, body));
});

/*
  BACKGROUND SYNC EVENT: triggers after `bg sync` registration and page has network connection.
  It will try and fetch github username, if its fulfills then sync is complete. If it fails,
  another sync is scheduled to retry (will will also waits for network connection)
*/

self.addEventListener('sync', (event) => {
  console.info('Event: Sync');

  //Check registered sync name or emulated sync from devTools
  if (event.tag === 'github' || event.tag === 'test-tag-from-devtools') {
    event.waitUntil(
      //To check all opened tabs and send postMessage to those tabs
      self.clients.matchAll().then((all) => {
        return all.map((client) => {
          return client.postMessage('online'); //To make fetch request, check app.js - line no: 122
        })
      })
      .catch((error) => {
        console.error(error);
      })
    );
  }
});

/*
  NOTIFICATION EVENT: triggered when user click the notification.
*/

//Adding `notification` click event listener
self.addEventListener('notificationclick', (event) => {
  var url = 'https://demopwa.in/';

  //Listen to custom action buttons in push notification
  if (event.action === 'yes') {
    console.log('I ♥ this app!');
  }
  else if (event.action === 'no') {
    console.warn('I don\'t like this app');
  }

  event.notification.close(); //Close the notification

  //To open the app after clicking notification
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then((clients) => {
      for (var i = 0; i < clients.length; i++) {
        var client = clients[i];
        //If site is opened, focus to the site
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      //If site is cannot be opened, open in new window
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
    .catch((error) => {
      console.error(error);
    })
  );
});
