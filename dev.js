const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
//в случае проблем с hot reload юзаем это
const config = require("./webpack.config.js");
const options = {
  contentBase: "./dist",
  hot: true,
  host: "localhost",
  inline: true,
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(3000, "localhost", () => {
  console.log("dev server listening on port 5000");
});
