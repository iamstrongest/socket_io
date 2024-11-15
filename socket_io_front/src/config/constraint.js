/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 17:49:23
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-12 10:11:59
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\config\constraint.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 约束
export const chatType = {
  1: "普通聊天回话",
  2: "表情包",
  3: "图片",
  4: "视频",
  5: "其它文件",
};
export const iconsAsideRoutes = [
  { class: "#icon-tongzhi", route: "/notify", iconId: 1, title: "系统通知" },
  { class: "#icon-liaotian", route: "/chat", iconId: 2, title: "聊天记录" },
  {
    class: "#icon-haoyouliebiao",
    route: "/friend",
    iconId: 3,
    title: "好友列表",
  },
  {
    class: "#icon-gengduox",
    iconId: 4,
    title: "更多",
    children: [
      {
        class: "#icon-tianjiahaoyou",
        route: "/addrequest",
        iconId: 5,
        title: "添加友/群",
      },
      {
        class: "#icon-gerenzhongxin",
        route: "/user",
        iconId: 6,
        title: "个人信息",
      },
      {
        class: "#icon-bianjixinxi",
        route: "/edit",
        iconId: 7,
        title: "编辑信息",
      },
      {
        class: "#icon-suoyouren",
        route: "/alluser",
        iconId: 8,
        title: "注册列表",
      },
      { class: "#icon-tuichu", iconId: 9, route: "/login", title: "退出登录" },
    ],
  },
];
export const iconsUser = [
  { class: "#icon-chazhaoyonghu", iconId: 9, title: "个人信息" },
  { class: "#icon-shanchuyonghu", iconId: 10, title: "删除好友" },
  {
    class: "#icon-a-O1CN017YTIJ61aWqxtK9bAy_6000000003338-55-tps-200",
    iconId: 11,
    title: "创建群聊",
  },
  {
    class: "#icon-xinyaoqinghuiyuan",
    iconId: 12,
    title: "邀请群聊",
  },
];
export const iconGroup = [
  { class: "#icon-shanchuyonghu", iconId: 13, title: "退出群聊" },
];
export const httpCode = {
  200: "获取请求成功",
  401: "身份认证过期，请重新登录",
  402: "未携带token,非法请求",
  403: "不存在该路由，你怕是请求了个寂寞",
  405: "线上环境禁止代理，只能进行原网站访问",
  406: "刷新token失效,请重新登陆",
  418: "账号或密码错误",
  419: "用户不存在",
  420: "用户已经注册，请重新选择用户名",
  421: "你和他已经是好友关系，不能重复添加好友",
  422: "不能添加自己为好友",
  423: "添加的好友不存在，请确认查找的账号是否存在",
  424: "插入好友关系申请失败",
  425: "插入好友申请列表失败",
  426: "申请已提交过了，请处理新的好友页面有无通知",
  427: "当前用户已在别的地方进行了登录，请勿泄露个人信息",
  428: "该用户已经在该群了，请勿重复加入",
  429: "暂无该群信息，请确定该群是否存在",
  430: "该群用户列表不存在",
  431: "已经提交过申请了，待管理人员处理申请",
  432: "暂无权限或非法操作,不能取消/新增管理员",
  433: "暂无权限或非法操作，退出群聊失败",
  441: "缺少必要参数",
};
export const chatListType = {
  "-1": {
    name: "request",
    path: "/chat/request",
  },
  1: {
    name: "chat_single_room",
    path: "/chat/chatsingleroom",
  },
  2: {
    name: "groop",
    path: "/chat/chatgrooproom",
  },
};
