/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 10:40:30
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-02 14:21:28
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        needAuth: true,
      },
      redirect: { name: "notify" },
      component: () => import("@/views/LayoutView.vue"),
      children: [
        {
          path: "chat",
          name: "chat",
          meta: {
            needAuth: true,
          },
          component: () => import("@/views/ChatView.vue"),
          children: [
            {
              path: "request",
              name: "request",
              meta: {
                needAuth: true,
              },
              component: () => import("@/views/RequestListView.vue"),
            },
            {
              path: "chatsingleroom/:roomId",
              name: "chat_single_room",
              meta: {
                needAuth: true,
              },
              component: () => import("@/views/ChatSingleRoomView.vue"),
            },
            {
              path: "chatgrooproom/:roomId",
              name: "chat_groop_room",
              meta: {
                needAuth: true,
              },
              component: () => import("@/views/ChatGroopRoomView.vue"),
            },
          ],
        },
        {
          path: "friend",
          name: "friend",
          meta: {
            needAuth: true,
          },
          component: () => import("@/views/FriendView.vue"),
        },
        {
          path: "notify",
          name: "notify",
          meta: {
            needAuth: true,
          },
          component: () => import("@/views/NotifyView.vue"),
        },
        {
          path: "addrequest",
          name: "add_request",
          meta: {
            needAuth: true,
          },
          component: () => import("@/views/AddRequestView.vue"),
        },
        {
          path: "user",
          name: "user",
          meta: {
            needAuth: true,
          },
          component: () => import("@/views/UserView.vue"),
        },
        {
          path: "edit",
          name: "edit",
          meta: {
            needAuth: true,
          },
          component: () => import("@/views/EditUserView.vue"),
        },
        {
          path: "alluser",
          name: "all_user",
          meta: {
            needAuth: true,
          },
          component: () => import("@/views/AllUserView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      meta: {
        needAuth: false,
      },
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/notFound",
      name: "notFound",
      component: () => import("@/views//NoFoundView.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.needAuth) {
    if (token) {
      return next();
    } else {
      return next("/login");
    }
  }
  if (!router.hasRoute(to.name)) {
    return next(`/notFound?path=${to.fullpath || to.path}`);
  }
  return next();
});
export default router;
