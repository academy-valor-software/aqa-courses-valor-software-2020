'use strict';
const path = require('path');
const JR = require('protractor-jasmine2-html-reporter');

const testResultsDir = 'results';

exports.config = {
    baseUrl: 'https://www.freelancer.com/',
    directConnect: true,
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: 'false',
        maxInstances: 1,
        'chromeOptions': {
            args: ["--incognito", '--headless', '--disable-gpu', '--no-sandbox']
        }
    },
    specs: ['./e2e/tests/*.e2e-spec.ts'],
    exclude: [],
    getPageTimeout: 10000,
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
            .window();

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
