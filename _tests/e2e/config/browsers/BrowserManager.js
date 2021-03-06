"use strict";
const path = require('path');

class BrowserManager {

    createBrowser(browser) {
        if (browser === 'chrome') {
            return this.chromeBrowser('desktop');
        } else if (browser === 'headless_chrome') {
            return this.chromeBrowser('headless_chrome');
        } else if (browser === 'firefox') {
            return this.firefoxBrowser();
        } else {// browser was not listed, must be mobile device
            return this.chromeBrowser(browser)
        }
    }

    firefoxBrowser() {
        return {
            browserName: 'firefox',
            "acceptInsecureCerts": true,
        };
    }

    chromeBrowser(browser) {
        let caps;

        if (browser === 'headless_chrome') {
            console.log('e2e tests running using headless Chrome browser');
            caps = {
                browserName: 'chrome',
                "acceptInsecureCerts": true,
                chromeOptions: {
                    args: ["headless", "disable-gpu"],
                    prefs: {'download.default_directory': path.resolve('tmp/chromeDownloads')}
                },
            }
        } else if (browser === 'desktop') {
            console.log(`e2e tests running using Chrome ${browser} browser`);
            caps = {
                browserName: 'chrome',
                acceptInsecureCerts: true,
                chromeOptions: {
                    prefs: {'download.default_directory': path.resolve('tmp/chromeDownloads')},
                    args: ["start-fullscreen"],
                }
            }
        } else {
            console.log(`e2e tests running using a Chrome ${browser} emulated browser`);
            caps = {
                browserName: 'chrome',
                "acceptInsecureCerts": true,
                chromeOptions: {mobileEmulation: {deviceName: browser}}
            }
        }
        return caps;
    }
}


module.exports = new BrowserManager;
