const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/historie/articles', {
      target: 'http://localhost:8080', // API endpoint 1
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/kasse/articles', {
      target: 'http://localhost:8081', // API endpoint 2
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/vorschlaege/articles', {
      target: 'http://localhost:8082', // API endpoint 2
      changeOrigin: true,
    })
  );
}
