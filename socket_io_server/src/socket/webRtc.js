/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-11-09 18:00:57
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-26 21:27:44
 * @FilePath: \socket_io\socket_io_server\src\socket\webRtc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-11-09 18:00:57
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-26 16:28:10
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\socket\video.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const VideoCode = {
  "-1": -1, //取消视频通话
  0: 0, //创建房间,并且发送通知给接收方
  1: 1, //同意加入房间，请准备视频通话，并且通知发送者创建offer
  2: 2, // 发起方已经发送sdp，请接受者准备接收，并且响应应答
  3: 3, // 回应者已经接收了offer，并且响应了自己的sdp
  4: 4, // 触发candidate，并且添加candidate
  5: 5, //通知对方结束了视频通话
};
export function webRtc(socket, io) {
  socket.on("createRoom", (data) => {
    const { username, receiveId, userId, videoRoomId } = data;
    const sockets = [...io.sockets.sockets.values()];
    const filterSocket = sockets.find((socket) => {
      return socket.userId == receiveId;
    });
    socket.join(videoRoomId);
    if (filterSocket) {
      filterSocket?.join(videoRoomId);
      io.to(filterSocket.id).emit("create_room_request", {
        userId,
        videoRoomId,
        code: VideoCode[0],
        type: 4, //视频通话
        conment: `${username}-邀请您加入视频通话,房间号-${videoRoomId}-创建成功`,
      });
    }
  });
  socket.on("reject", (data) => {
    // 此时的receiveId是发起者
    const { username, videoRoomId } = data;
    io.to(videoRoomId)
      .except(socket.id)
      .emit("reject_join_room", {
        videoRoomId,
        code: VideoCode[-1],
        type: 5,
        conment: `${username}-拒绝了此次视频通话`,
      });
    setTimeout(() => {
      io.sockets.adapter.rooms.delete(videoRoomId); //拒绝视频通话，则删除房间
    }, 100);
  });
  socket.on("peer_join", (data) => {
    const { userId, videoRoomId, username } = data;
    io.to(videoRoomId)
      .except(socket.id)
      .emit("create_offer", {
        userId,
        videoRoomId,
        code: VideoCode[1],
        msg: `${username}-同意加入视频通话，加入房间号-${videoRoomId}-成功,请接受者准备创建offer`,
      });
  });
  socket.on("send_offer", (data) => {
    // 发送者的userId,以及发送者创建的sdp
    const { userId, videoRoomId, sdp, username } = data;
    io.to(videoRoomId)
      .except(socket.id)
      .emit("recive_offer", {
        userId,
        videoRoomId,
        sdp,
        code: VideoCode[2],
        msg: `${username}-已经发送sdp，请接受者准备接收，并且响应`,
      });
  });

  socket.on("answer", (data) => {
    // 接受者的userId,以及接收者的sdp
    const { userId, videoRoomId, sdp, username } = data;
    io.to(videoRoomId)
      .except(socket.id)
      .emit("remote_dsp", {
        userId,
        videoRoomId,
        code: VideoCode[3],
        sdp,
        msg: `${username}已经接收了offer，并且响应了自己的sdp给发送者`,
      });
  });
  socket.on("need_ice_candidate", (data) => {
    // 回应者的userId,以及回应者的candidate
    const { userId, videoRoomId, candidate, username } = data;
    io.to(videoRoomId)
      .except(socket.id)
      .emit("ice_candidate", {
        userId,
        videoRoomId,
        code: VideoCode[4],
        candidate,
        msg: `${username},触发ice_candidate，并且交换了candidate`,
      });
  });
  socket.on("socket_leave", (data) => {
    const { userId, videoRoomId, username } = data;
    io.to(videoRoomId).emit("recive_socket_leave", {
      userId,
      videoRoomId,
      code: VideoCode[5],
      msg: `${username},已经离开房间`,
    });
    setTimeout(() => {
      io.sockets.adapter.rooms.delete(videoRoomId); // 删除某个房间
    }, 100);
    // socket.leave(roomId); // 将某个房间的特定的连接的websocket对象断开

    // if (io.sockets.adapter.rooms.get(roomId) === undefined) {
    //   //当房间内部的set集合为0时，结果会为undefined
    //   io.sockets.adapter.rooms.delete(roomId); // 删除某个房间
    // }
  });
}
