const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public/js-obf'),
    },
    mode: 'production',
    optimization: {
        minimize: true,
        splitChunks: false,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log', 'console.info', 'console.debug'],
                    },
                    mangle: true,
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
    plugins: [
        new WebpackObfuscator(
            {
                // Obfuscation des chaînes en RC4
                rotateStringArray: true,
                stringArray: true,
                stringArrayEncoding: ['rc4'],
                stringArrayThreshold: 1, // Toutes les chaînes sont obfusquées

                // Contrôle de flux très agressif (technique VM-based)
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,

                // Protection contre le débogage
                debugProtection: true,
                debugProtectionInterval: 600, // Valeur en ms (>= 0)

                // Désactivation de la console dans le code obfusqué
                disableConsoleOutput: true,
                selfDefending: true,

                // Renommage global et transformation des clés d'objet
                renameGlobals: true,
                transformObjectKeys: true,

                deadCodeInjection: false,
            },
            [] // Aucun fichier à exclure
        ),
    ],
};
