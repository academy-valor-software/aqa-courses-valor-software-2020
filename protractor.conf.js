'use strict';
const path = require('path');
const JR = require('protractor-jasmine2-html-reporter');

const testResultsDir = 'results';

exports.config = {
    baseUrl: 'http://google.com',
    directConnect: true,

    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 1,
        chromeOptions: {
            args: [ '--window-size=1920x1080'], // 'headless',
            prefs: {
                'profile.managed_default_content_settings.notifications': 1
            }
        }
    },

    specs: ['./e2e/*.e2e-spec.ts'],
    exclude: [],

    framework: 'jasmine',
    allScriptsTimeout: 60000,

    jasmineNodeOpts: {
        showColors: true,
        isVerbose: false,
        includeStackTrace: false,
        defaultTimeoutInterval: 60000,
        print: function() {}
    },

    onPrepare: function() {
        require('ts-node').register({ project: path.join(__dirname, './e2e/tsconfig.json') });

        jasmine.getEnv().addReporter(
            new JR({
                takeScreenshotsOnlyOnFailures: true,
                savePath: testResultsDir,
            })
        );

        browser.driver
            .manage()
            .window()
            .maximize();

        let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

        jasmine.getEnv().addReporter(
            new SpecReporter({
                spec: {
                    displayStacktrace: true,
                    displayFailuresSummary: true,
                    displaySpecDuration: true
                }
            })
        );

    }
};
