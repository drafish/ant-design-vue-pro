const webpack = require("webpack");
const slash = require("slash2");
const webpackPlugin = require("./config/plugin.config");
const { createMockMiddleware } = require("umi-mock-middleware");

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

module.exports = {
  css: {
    modules: true,
    loaderOptions: {
      css: {
        getLocalIdent: (context, localIdentName, localName) => {
          if (
            context.resourcePath.includes("node_modules") ||
            context.resourcePath.includes("ant.design.pro.less") ||
            context.resourcePath.includes("global.less")
          ) {
            return localName;
          }
          const match = context.resourcePath.match(/src(.*)/);
          if (match && match[1]) {
            const antdProPath = match[1].replace(".less", "");
            const arr = slash(antdProPath)
              .split("/")
              .map(a => a.replace(/([A-Z])/g, "-$1"))
              .map(a => a.toLowerCase());
            return `antd-pro${arr.join("-")}-${localName}`.replace(/--/g, "-");
          }
          return localName;
        }
      },
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: webpackPlugin,
  configureWebpack: {
    plugins: [
      // themePlugin,
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: JSON.stringify(
          ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || "" // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
        )
      })
    ],
    resolve: {
      alias: {
        // "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
      }
    }
  },
  // chainWebpack: config => {
  //   const svgRule = config.module.rule("svg");

  //   // 清除已有的所有 loader。
  //   // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
  //   svgRule.uses.clear();

  //   // 添加要替换的 loader
  //   svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  // },
  devServer: {
    // open: true,
    before: function(app) {
      if (process.env.MOCK !== "none") {
        app.use(createMockMiddleware());
      }
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  }
};
