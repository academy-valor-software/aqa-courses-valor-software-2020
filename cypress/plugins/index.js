/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const wp = require('@cypress/webpack-preprocessor');

const webpackOptions = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    }
};

module.exports = on => {
    const options = {
        webpackOptions
    };
    on('file:preprocessor', wp(options));
    on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chromium') {
            launchOptions.args.push('--cast-initial-screen-width=1920');
            launchOptions.args.push('--cast-initial-screen-height=1080');

            return launchOptions;
        }

        if (browser.name === 'electron') {
            launchOptions.preferences.width = 1920;
            launchOptions.preferences.height = 1080;

            return launchOptions.args;
        }
    });
};

