export const apiNormalParmas = [
  {
    path: "/api/chat",
    method: "get",
    params: ["id", "page"],
  },
  {
    path: "/api/room",
    method: "get",
    params: ["id", "page"],
  },
  {
    path: "/api/groupchat",
    method: "get",
    params: ["roomId", "page"],
  },
  {
    path: "/api/groupchat",
    method: "post",
    params: ["roomId", "sendId", "conment"],
  },
  {
    path: "/api/grouproom",
    method: "get",
    params: ["joinId"],
  },
  {
    path: "/api/grouproomchat",
    method: "get",
    params: ["id"],
  },
  {
    path: "/api/groupidentity",
    method: "get",
    params: ["roomId", "joinId"],
  },
  {
    path: "/api/groupidentity",
    method: "put",
    params: ["roomId", "joinId", "identity"],
  },
  {
    path: "/api/groupinfo",
    method: "get",
    params: ["roomId"],
  },
  {
    path: "/api/groupuser",
    method: "get",
    params: ["roomId"],
  },
  {
    path: "/api/grouproomuser",
    method: "post",
    params: ["roomId", "joinId", "identity"],
  },
  {
    path: "/api/grouproomuser",
    method: "delete",
    params: ["roomId", "joinId", "handleId"],
  },
  {
    path: "/api/grouprequest",
    method: "post",
    params: ["roomId", "joinId", "status", "conment"],
  },
  {
    path: "/api/grouprequest",
    method: "put",
    params: ["roomId", "joinId", "status", "conment", "handleId"],
  },
  {
    path: "/api/grouprequest",
    method: "get",
    params: ["joinId"],
  },
  {
    path: "/api/notify",
    method: "get",
    params: ["receiveId"],
  },
  {
    path: "/api/notify",
    method: "put",
    params: ["id", "status"],
  },
  {
    path: "/api/request",
    method: "get",
    params: ["id"],
  },
  {
    path: "/api/request",
    method: "post",
    params: ["id", "status", "receiveId", "sendId", "conment"],
  },
  {
    path: "/api/login",
    method: "post",
    params: ["email", "password"],
  },
  {
    path: "/api/refresh",
    method: "get",
    params: [],
  },
  {
    path: "/api/userinfo",
    method: "get",
    params: [],
  },
  {
    path: "/api/userinfo",
    method: "put",
    params: ["id", "username", "description", "theme"],
  },

  {
    path: "/api/friend",
    method: "get",
    params: ["id"],
  },
  {
    path: "/api/friend",
    method: "post",
    params: ["sendId", "conment", "receiveId"],
  },
  //   {
  //     path: "/api/logout",
  //     method: "post",
  //     params: ["id", "status", "receiveId", "sendId", "conment"],
  //   },
  //   {
  //     path: "/api/friend",
  //     method: "delete",
  //     params: ["sendId", "conment", "receiveId"],
  //   },
  {
    path: "/api/detail",
    method: "get",
    params: ["id"],
  },
  {
    path: "/api/alluser",
    method: "get",
    params: [],
  },
  {
    path: "/api/attendance",
    method: "get",
    params: ["userId", "attendance_year_month"],
  },
  {
    path: "/api/attendance",
    method: "post",
    params: ["userId", "userLatitude", "userLongitude"],
  },
  {
    path: "/api/userattendance",
    method: "get",
    params: ["userId", "attendance_year_month"],
  },
  {
    path: "/api/absence",
    method: "post",
    params: ["userId", "description", "time"],
  },
];
export const apiSpeciallParmas = [
  {
    path: "/api/grouproom",
    method: "post",
    params: ["file", "fileName", "timestamp", "roomName"],
  },
  {
    path: "/api/avatar",
    method: "put",
    params: ["file", "fileName", "timestamp"],
  },
  {
    path: "/api/register",
    method: "post",
    params: ["file", "password", "email", "username", "fileName", "timestamp"],
  },
];
