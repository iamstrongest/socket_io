export const sourceTypeList = [
  // 缓存的资源类型
  ".png",
  ".ico",
  ".jpg",
  ".js",
  ".css",
];
export const expiryType = {
  expires: new Date(Date.now() + 3600 * 1000).toUTCString(), //设置 Expires 响应头，表示资源过期时间为 3600后
  "Cache-Control": "public, max-age=3600", // 设置 Cache-Control 响应头，表示资源在 3600 秒内可缓存
};
