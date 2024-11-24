import { geolocation } from "../config/constraint.js";
// 哈弗辛公式计算两点之间的距离（单位：米）
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // 地球半径，单位：米
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // 距离（单位：米）
    return distance;
  }
  // 获取用户当前位置并判断是否在范围内
 export function canSignIN(params) {
    const { userLatitude, userLongitude } = params;
    const ansDistances = [];
    geolocation.positions.forEach((item) => {
      // 计算距离
      const distance = calculateDistance(
        userLatitude, //纬度
        userLongitude, //经度
        item.targetLatitude, //打卡点维度
        item.targetLongitude //打卡点经度
      );
      ansDistances.push(distance);
    });
    // 只要当前打卡点坐标在任意一个打卡点范围之内，就打卡成功
    if (ansDistances.some((distance) => distance <= geolocation.allowedRadius)) {
      return true;
    }
    return false;
  }