
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api/auth/*',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
        })

    );
    app.use(
        '/api/convert/*',
        createProxyMiddleware({
            target: 'http://localhost:8082',
            changeOrigin: true,
        })

    );
    app.use(
        '/api/history/*',
        createProxyMiddleware({
            target: 'http://localhost:8083',
            changeOrigin: true,
        })

    );
};