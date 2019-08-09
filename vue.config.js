const path = require("path");
const webpack = require("webpack");
const slash = require("slash2");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const { createMockMiddleware } = require("umi-mock-middleware");

const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"),
  stylesDir: path.join(__dirname, "./src"),
  varFile: path.join(
    __dirname,
    "./node_modules/ant-design-vue/lib/style/themes/default.less"
  ),
  mainLessFile: "",
  themeVariables: ["@primary-color"],
  generateOnce: false
};

const themePlugin = new AntDesignThemePlugin(options);
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
        modifyVars: {
          "primary-color": "#1DA57A"
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    plugins: [themePlugin, new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
    resolve: {
      alias: {
        // "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  devServer: {
    open: true,
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
