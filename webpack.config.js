const Encore = require("@symfony/webpack-encore");
const path = require("path");

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}



Encore
    // directory where compiled assets will be stored
    .setOutputPath("../website/public/build_dashboard")
    // public path used by the web server to access the output path
    .setPublicPath("/build_dashboard")

    .addEntry("app", "./src/index.js")

    .splitEntryChunks()

    .configureSplitChunks(function (splitChunks) {
        splitChunks.automaticNameDelimiter = ".";
    })

    .enableSingleRuntimeChunk()

    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = "usage";
        config.corejs = 3;
    })


    // enables Sass/SCSS support
    .enableSassLoader(function (options) {}, { resolveUrlLoader: false })

    .enableVueLoader(() => {}, { runtimeCompilerBuild: false })

    .addAliases({
        "@order.store": path.resolve(__dirname, "src/modules/order/store"),
        "@axios": path.resolve(__dirname, "src/helpers/axios"),
    });


const config = Encore.getWebpackConfig();

module.exports = config;
