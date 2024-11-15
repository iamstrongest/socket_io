/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-11-09 18:00:57
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-09 18:04:22
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\socket\video.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function webRtc(socket, io) {
  socket.on("createRoom", (data) => {
    const { userId, roomId } = data;
    socket.join(roomId);
    io.to(roomId).emit("createRoomSuccess", {
      userId,
      roomId,
      code: 0,
      msg: `${userId}-创建房间-${roomId}-成功`,
    });
  });
  socket.on("peer-join", (data) => {
    const { userId, roomId } = data;
    socket.join(roomId);
    io.to(roomId)
      .except(socket.id)
      .emit("create-offer", {
        userId,
        roomId,
        code: 1,
        msg: `${userId}-加入房间-${roomId}-成功,请准备视频通话,创建offer`,
      });
  });
  socket.on("send-offer", (data) => {
    // 发送方的userId,以及发送方的sdp
    const { userId, roomId, sdp } = data;
    io.to(roomId).except(socket.id).emit("recive-offer", {
      userId,
      roomId,
      sdp,
      code: 2,
      msg: `发起方已经发起视频会话，请点击接收视频通话按钮接`,
    });
  });

  socket.on("answer", (data) => {
    // 回应者的userId,以及回应者的sdp
    const { userId, roomId, sdp } = data;
    io.to(roomId).except(socket.id).emit("remote-dsp", {
      userId,
      roomId,
      code: 3,
      sdp,
      msg: `回应者已经接收了offer，并且响应了自己的sdp`,
    });
  });
  socket.on("need-ice_candidate", (data) => {
    // 回应者的userId,以及回应者的candidate
    const { userId, roomId, candidate } = data;

    // console.log(io.sockets.adapter.rooms);// 获取所有房间
    // console.log(io.sockets.adapter.rooms.get(roomId));// 获取某个特定的房间

    io.to(roomId)
      .except(socket.id)
      .emit("ice-candidate", {
        userId,
        roomId,
        code: 4,
        candidate,
        msg: `userId-${userId},触发ice-candidate，并且交换了candidate`,
      });
  });
  socket.on("socket-leave", (data) => {
    const { userId, roomId } = data;

    io.to(roomId).emit("recive-socket-leave", {
      userId,
      roomId,
      code: 5,
      msg: `userId-${userId},已经离开房间`,
    });

    socket.leave(roomId); // 将某个房间的特定的连接的websocket对象断开

    if (io.sockets.adapter.rooms.get(roomId) === undefined) {
      //当房间内部的set集合为0时，结果会为undefined
      io.sockets.adapter.rooms.delete(roomId); // 删除某个房间
    }
  });
}
