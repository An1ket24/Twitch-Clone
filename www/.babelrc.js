module.exports = {
    presets: [
        'next/babel',
        [
            '@emotion/babel-preset-css-prop',
            {
                autoLabel: process.env.NODE_ENV !== 'production',
                labelFormat: '[local]',
            },
        ],
    ],
    plugins: ['macros', '@babel/plugin-proposal-export-namespace-from'],
}
