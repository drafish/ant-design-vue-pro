import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

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
          redirect: "/user/login",
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login"),
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register"),
        },
        {
          path: "/user/register-result",
          name: "register.result",
          component: () =>
            import(
              /* webpackChunkName: "user" */ "./views/User/RegisterResult"
            ),
        },
      ],
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
      children: [
        // dashboard
        {
          path: "/",
          authority: ["user", "admin"],
          redirect: "/dashboard/analysis",
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
                ),
            },
          ],
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
                import(
                  /* webpackChunkName: "form" */ "./views/Forms/BasicForm"
                ),
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
                  redirect: "/form/step-form/info",
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1"
                    ),
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2"
                    ),
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3"
                    ),
                },
              ],
            },
          ],
        },
        {
          path: "/list",
          icon: "table",
          name: "list",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/list/table-list",
              name: "searchtable",
              component: () =>
                import(/* webpackChunkName: "list" */ "@/views/List/TableList"),
            },
          ],
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
                ),
            },
            {
              path: "/exception/404",
              name: "not-find",
              component: () =>
                import(
                  /* webpackChunkName: "exception" */ "@/views/Exception/404"
                ),
            },
            {
              path: "/exception/500",
              name: "server-error",
              component: () =>
                import(
                  /* webpackChunkName: "exception" */ "@/views/Exception/500"
                ),
            },
            {
              path: "/exception/trigger",
              name: "trigger",
              hideInMenu: true,
              component: () =>
                import(
                  /* webpackChunkName: "exception" */ "@/views/Exception/TriggerException"
                ),
            },
          ],
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
                ),
            },
            {
              path: "/profile/basic/:id",
              hideInMenu: true,
              component: () =>
                import(
                  /* webpackChunkName: "profile" */ "@/views/Profile/BasicProfile"
                ),
            },
            {
              path: "/profile/advanced",
              name: "advanced",
              authority: ["admin"],
              component: () =>
                import(
                  /* webpackChunkName: "profile" */ "@/views/Profile/AdvancedProfile"
                ),
            },
          ],
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
                ),
            },
            {
              path: "/result/fail",
              name: "fail",
              component: () =>
                import(/* webpackChunkName: "result" */ "@/views/Result/Error"),
            },
          ],
        },
      ],
    },
    {
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "exception" */ "@/views/Exception/403"),
    },
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "exception" */ "@/views/Exception/404"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
