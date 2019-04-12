module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: '@import "@/styles/variables.scss";'
            }
        }
    },

    baseUrl: '',
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined
}