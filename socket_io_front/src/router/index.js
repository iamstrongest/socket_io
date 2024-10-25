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
              component: () => import("@/views/FriendRequestListView.vue"),
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
              path: "chatgrooproom",
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
          path: "addfriend",
          name: "add_friend",
          meta: {
            needAuth: true,
          },
          component: () => import("@/views/AddFriendView.vue"),
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
