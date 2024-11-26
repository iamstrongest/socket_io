<script setup>
import { useTemplateRef, inject, onMounted, onUnmounted } from "vue";
import { useVideoStore } from '@/stores/video';
import { useUserStore } from "@/stores/user.js"
import { getSocket } from "@/socket";
const socket = getSocket();
const videoStore = useVideoStore();
const userStore = useUserStore();
const local_video = useTemplateRef("localVideo");
const remote_video = useTemplateRef("remoteVideo");
const PeerConnection =
    window.RTCPeerConnection ||
    window.PeerConnection ||
    window.webkitPeerConnection ||
    window.webkitRTCPeerConnection ||
    window.mozRTCPeerConnection;
const nativeRTCIceCandidate =
    window.mozRTCIceCandidate || window.RTCIceCandidate;
const nativeRTCSessionDescription =
    window.mozRTCSessionDescription || window.RTCSessionDescription;
// WebRTC连接对象
let peerConnection;
const video = inject("showVideo");
//初始化PC源
function initPC() {
    let pc = new PeerConnection();
    pc.onicecandidate = (evt) => {
        if (evt.candidate) {
            socket.emit("need_ice_candidate", {
                videoRoomId: videoStore.videoRoomId,
                userId: userStore.user.info?.id,
                username: userStore.user.info?.username,
                candidate: evt.candidate,
            });
        }
    };
    pc.onaddstream = (evt) => {
        let stream = evt.stream;
        remote_video.value.srcObject = stream;
        remote_video.value.play();
    };
    return pc;
}
socket.on("create_offer", async (res) => {
    console.log(res.msg);
    peerConnection = initPC();
    let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });
    peerConnection.addStream(stream);
    local_video.value.srcObject = stream;
    local_video.value.play();
    peerConnection.createOffer().then(function (session_desc) {
        peerConnection.setLocalDescription(session_desc);
        socket.emit("send_offer", {
            videoRoomId: videoStore.videoRoomId,
            sdp: session_desc,
            userId: userStore.user.info?.id,
            username: userStore.user.info?.username,
        });
    });
});
socket.on("recive_offer", async (res) => {
    //当收到发送者请求后,对于接受者，设置音频源 
    let pc = new PeerConnection();
    pc.onicecandidate = (evt) => {
        if (evt.candidate) {
            socket.emit("need_ice_candidate", {
                videoRoomId: videoStore.videoRoomId,
                userId: userStore.user.info.id,
                username: userStore.user.info?.username,
                candidate: evt.candidate,
            });
        }
    };
    pc.onaddstream = (evt) => {
        let stream = evt.stream;
        remote_video.value.srcObject = stream;
        remote_video.value.play();
    };
    peerConnection = pc;
    peerConnection.setRemoteDescription(
        new nativeRTCSessionDescription(res.sdp)
    );
    let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });
    local_video.value.srcObject = stream;
    local_video.value.play();
    peerConnection.addStream(stream);
    // 并发送answer给对方
    peerConnection.createAnswer().then((session_desc) => {
        peerConnection.setLocalDescription(session_desc);
        socket.emit("answer", {
            videoRoomId: videoStore.videoRoomId,
            sdp: session_desc,
            username: userStore.user.info?.username,
            userId: userStore.user.info?.id,
        });
    });
});
socket.on("remote_dsp", (res) => {
    peerConnection.setRemoteDescription(
        new nativeRTCSessionDescription(res.sdp)
    );
});
socket.on("ice_candidate", (res) => {
    var candidate = new nativeRTCIceCandidate(res.candidate);
    peerConnection.addIceCandidate(candidate);
});
socket.on("recive_socket_leave", (res) => {
    // 获取所有可用的媒体设备（包括摄像头和麦克风）
    // 先将本地以及远程的摄像头关闭
    local_video.value.srcObject?.getTracks().forEach((track) => {
        track.stop(); // 停止摄像头轨道
    });
    remote_video.value.srcObject?.getTracks().forEach((track) => {
        track.stop(); // 停止摄像头轨道
    });
    local_video.value.srcObject = null;
    remote_video.value.srcObject = null;
    setTimeout(() => {
        video.changeVideoStatus(false);
    }, 100)
});
function endClick(event) {
    event.stopPropagation();
    // video.changeVideoStatus(false);
    // // 先将本地以及远程的摄像头关闭
    // local_video.value.srcObject.getTracks().forEach((track) => {
    //     track.stop(); // 停止摄像头轨道
    // });
    // local_video.value.srcObject = null;
    socket.emit("socket_leave", {
        videoRoomId: videoStore.videoRoomId,
        userId: userStore.user.info?.id,
        username: userStore.user.info?.username,
        receiveId: videoStore.sendId
    });
}
onMounted(async () => {
})
onUnmounted(() => {
    socket.off("create_offer");
    socket.off("recive_offer");
    socket.off("remote_dsp");
    socket.off("ice_candidate");
    socket.off("recive_socket_leave");
})

</script>
<template>
    <div class="container">
        <h3>本地vedio</h3>
        <video id="localVideo" ref="localVideo"></video>
        <h3>远程vedio</h3>
        <video id="remoteVideo" ref="remoteVideo"></video>
        <div class="svg" @click="endClick">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-guaduan"></use>
            </svg>
        </div>
    </div>
</template>
<style scoped>
.container {
    color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    /* display: flex;
    flex-direction: column;
    align-items: center; */
}

h3 {
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
}

video {
    width: 400px;
    height: 300px;
}

.svg {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    cursor: pointer;
}
</style>
