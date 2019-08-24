import Vue from "vue";
import Router from "vue-router";
import findLast from "lodash/findLast";
import { notification } from "ant-design-vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { check, isLogin } from "./utils/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register")
        },
        {
          path: "/user/register-result",
          name: "register.result",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/RegisterResult")
        }
      ]
    },
    {
      path: "/",
      authority: ["user", "admin"],
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
      children: [
        // dashboard
        {
          path: "/",
          redirect: "/dashboard/analysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          icon: "dashboard",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis"
                )
            }
          ]
        },
        // form
        {
          path: "/form",
          name: "form",
          icon: "form",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm")
            },
            {
              path: "/form/step-form",
              name: "stepform",
              hideChildrenInMenu: true,
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm"),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info"
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1"
                    )
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2"
                    )
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3"
                    )
                }
              ]
            }
          ]
        },
        // Exception
        {
          path: "/exception",
          name: "exception",
          icon: "warning",
          component: { render: h => h("router-view") },
          redirect: "/exception/403",
          children: [
            {
              path: "/exception/403",
              name: "not-permission",
              component: () =>
                import(
                  /* webpackChunkName: "exception" */ "@/views/Exception/403"
                )
            },
            {
              path: "/exception/404",
              name: "not-find",
              component: () =>
                import(
                  /* webpackChunkName: "exception" */ "@/views/Exception/404"
                )
            },
            {
              path: "/exception/500",
              name: "server-error",
              component: () =>
                import(
                  /* webpackChunkName: "exception" */ "@/views/Exception/500"
                )
            }
          ]
        },
        // Profile
        {
          path: "/profile",
          name: "profile",
          icon: "profile",
          component: { render: h => h("router-view") },
          redirect: "/profile/basic",
          children: [
            {
              path: "/profile/basic",
              name: "basic",
              component: () =>
                import(
                  /* webpackChunkName: "profile" */ "@/views/Profile/BasicProfile"
                )
            },
            {
              path: "/profile/advanced",
              name: "advanced",
              component: () =>
                import(
                  /* webpackChunkName: "profile" */ "@/views/Profile/AdvancedProfile"
                )
            }
          ]
        },
        {
          path: "/result",
          name: "result",
          icon: "check-circle-o",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/result/success",
              name: "success",
              component: () =>
                import(
                  /* webpackChunkName: "result" */ "@/views/Result/Success"
                )
            },
            {
              path: "/result/fail",
              name: "fail",
              component: () =>
                import(/* webpackChunkName: "result" */ "@/views/Result/Error")
            }
          ]
        }
      ]
    },
    {
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "exception" */ "@/views/Exception/403")
    },
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "exception" */ "@/views/Exception/404")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.authority);
  if (record && !check(record.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理员咨询。"
      });
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
