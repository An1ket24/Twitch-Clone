const withPWA = require('next-pwa')

module.exports = withPWA({
    // experimental: {
    //     jsconfigPaths: true, // enables it for both jsconfig.json and tsconfig.json
    // },
    devIndicators: {
        autoPrerender: false,
    },
    // generateBuildId: async () => {
    //     return 'constant-build-id'
    // },
    pwa: {
        dest: 'public',
    },
})
