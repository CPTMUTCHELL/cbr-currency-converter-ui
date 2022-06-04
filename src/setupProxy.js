
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/backend/auth/*',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
        })

    );
    app.use(
        '/backend/convert/*',
        createProxyMiddleware({
            target: 'http://localhost:8082',
            changeOrigin: true,
        })

    );
    app.use(
        '/backend/history/*',
        createProxyMiddleware({
            target: 'http://localhost:8083',
            changeOrigin: true,
        })

    );
};