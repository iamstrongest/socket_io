/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-25 22:11:15
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 23:16:04
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\service-worker.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const urlSw = "/page/service-worker.js";
const cacheName = "PWA-SW-V1"; //名字
const cacheList = ["/page/manifest.json", "/page/index.html"];
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(urlSw).then((result) => {
      console.log(`register result--->`, result);
    });
  });
}
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheList).catch((error) => {
        console.error("Cache addAll failed:", error);
      });
    })
  );
});
const putInCache = async (request, response) => {
  console.log(request.url.startsWith(window.location.origin));
  console.log(request.url.startsWith("socket"));

  if (
    request.url.startsWith(window.location.origin) &&
    !request.url.startsWith("socket")
  ) {
    // 只缓存相同源的请求
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
  }
};
const cacheFirst = async ({ request, fallbackCacheName }) => {
  // 网络在线有限
  if (navigator.onLine) {
    const responseFromNetwork = await fetch(request);
    // 如果网络请求成功，将响应克隆一份：
    // - 将副本放入缓存，供下一次使用
    // - 将原始响应返回给应用程序
    // 需要克隆响应，因为响应只能使用一次。
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } else {
    //   走缓存
    const fallbackResponse = await caches.match(fallbackCacheName);
    if (fallbackResponse) {
      return fallbackResponse;
    }
  }
};
self.addEventListener("fetch", (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      fallbackCacheName: cacheName,
    })
  );
});
self.addEventListener("activate", (event) => {
  const whiteList = [cacheName];
  event.waitUntil(
    caches.keys(whiteList).then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (!whiteList.includes(name)) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});
