const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/styles/variables.scss";`
            }
        }
    },
    configureWebpack: {
        plugins: [
            new VuetifyLoaderPlugin()
        ]
    }
}