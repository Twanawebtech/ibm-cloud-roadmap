(function() {
    window._analytics = window._analytics || {};
    var analytics_config = {
        'wipi': true,
        'tealeaf': false,
        'hotjar': false,
        'coremetrics': true,
        'optimizely': true,
        'segment': true,
        'piwik': false,
        'googleAddServices': true,
        'addRoll': true,
        'videodesk': false,
        'enabled': true,
        'force_segment': false,
        'facebook': true,
        'intercom': true,
        'optimizely_key': '7964536850',
        'segment_key': '2Bn4E1z8ARPAGGAH6bW9XSVy7pDpjgWp',
        'version': 'Wed - June 7 - 9:59PM',
        'analyticsServiceUrl': 'https://console.stage1.ng.bluemix.net',
        'enableNPS': true,
        'forceNPS': true,
        'uServicesDomain': 'stage1.ng.bluemix.net',
    }
    for (var attrname in analytics_config) {
        if ( !window._analytics.hasOwnProperty(attrname)) {
            window._analytics[attrname] = analytics_config[attrname];
        }
    }
})();

/******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
        /******/
        /******/ 		// Check if module is in cache
        /******/ 		if(installedModules[moduleId])
        /******/ 			return installedModules[moduleId].exports;
        /******/
        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = installedModules[moduleId] = {
            /******/ 			exports: {},
            /******/ 			id: moduleId,
            /******/ 			loaded: false
            /******/ 		};
        /******/
        /******/ 		// Execute the module function
        /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Flag the module as loaded
        /******/ 		module.loaded = true;
        /******/
        /******/ 		// Return the exports of the module
        /******/ 		return module.exports;
        /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(0);
    /******/ })
/************************************************************************/
/******/ ([
    /* 0 */
    /***/ function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */(function(global) {'use strict';

            var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

            var _no_jquery = __webpack_require__(1);

            var _no_jquery2 = _interopRequireDefault(_no_jquery);

            var _ibmNps = __webpack_require__(3);

            var _modules = __webpack_require__(6);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            global._$ = _no_jquery2.default;
            // common utilities exported for use by analytics-atlas.js, analytics-classic.js, and analytics-marketing.js

            // This is the old way of loading the analytics library. We map it to the new one and issue a deprication warning
            global.bm_analytics_common = global.bm_analytics_common || {}; // eslint-disable-line no-use-before-define
            global.bm_analytics_common.utils = function () {
                console.warn('[DEPRECATED] window.bm_analytics_common.utils() has been deprecated please use window.bluemixAnalytics instead.'); // eslint-disable-line no-console, max-len
                return global.bluemixAnalytics;
            };

            global.bluemixAnalytics = _extends({
                checkNpsSurvey: _ibmNps.checkNpsSurvey
            }, _modules.campaigns, _modules.identification, _modules.pageEvents, _modules.trackEvents);

            (function initializeAnalytics() {
                var MAXIMUM_SEGMENT_LOAD_DELAY_MS = 5000;
                /**
                 Return the Coremetrics page id.
                 Known values are:  BLUEMIX PRICING
                 IBMBLUEMIX (home)
                 BLUEMIX <SOLUTIONS PAGE NAME> (solutions pages)
                 Bluemix Signup
                 BLUEMIX DASHBOARD
                 **/
                function getPageID() {
                    var pageId = void 0;
                    try {
                        if (global.digitalData.page.pageID === 'ICE - cloudoe Trial Sign Up (Bluemix)') {
                            pageId = 'Bluemix Signup';
                            // Sanity check, check the URL as well.
                        } else if (global.location.pathname.indexOf('registration') > -1) {
                            pageId = 'Bluemix Signup';
                        } else {
                            pageId = global.digitalData.page.pageInfo.pageID;
                        }
                    } catch (err) {
                        console.log('Error retrieving page id:' + pageId); // eslint-disable-line no-console
                    }
                    return pageId;
                }

                /**
                 * Retrieve information stored in the meta tags
                 *
                 */
                function getMetaContentByName(name, content) {
                    var meta = document.querySelector('meta[name=\'' + name + '\']');
                    if (meta) {
                        return meta.getAttribute(content || 'content');
                    }
                    return '';
                }

                /*
                 Is this Atlas (defined by the the V4 header being present)
                 */
                function getSite() {
                    var header = document.getElementById('global-header');
                    // Bluemix Classic (V3 Header)
                    if (document.querySelector('header.bluemix-global-header')) {
                        return 'BLUEMIX_CLASSIC';
                    } else if (global.analytics_config.commonLibrary) {
                        return 'COMMON_LIBRARY';
                    } else if (document.querySelector('body.cloudOE')) {
                        return 'BLUEMIX_CLASSIC';
                    } else if (document.querySelector('.accountmanagement_onboard')) {
                        return 'BLUEMIX_ATLAS';
                    } else if (document.querySelector('body.link')) {
                        return 'BLUEMIX_ATLAS';
                    } else if (document.querySelector('body.registration')) {
                        // remain for any existing registration pages
                        return 'BLUEMIX_ATLAS';
                    } else if (document.querySelector('body .registration')) {
                        // for the new registration page
                        return 'BLUEMIX_ATLAS';
                    } else if (!document.querySelector('header')) {
                        return 'EXTERNAL_SITE';
                    } else if (document.querySelector('header').getAttribute('data-version') === 'V4' || document.querySelector('header').id === 'global-header') {
                        return 'BLUEMIX_ATLAS';
                    } else if (header !== null) {
                        // the mere existence of the new v5 header will load the atlas library
                        return 'BLUEMIX_ATLAS';
                    }

                    if (getMetaContentByName('BM.analytics') === 'atlas') {
                        return 'BLUEMIX_ATLAS';
                    }

                    return 'EXTERNAL_SITE';
                }

                /*
                 Are we running on Bluemix?
                 */
                function isBluemix() {
                    var site = getSite();
                    var bluemix = site === 'BLUEMIX_ATLAS' || 'BLUEMIX_CLASSIC';
                    return bluemix;
                }

                /*
                 Check the header to see if this is the authenticated header or not.
                 */
                function isAuthenticatedPage() {
                    var v5AuthenticatedHeader = document.querySelector('.authenticated');
                    if (v5AuthenticatedHeader) {
                        return true;
                    }

                    var v4LoginNode = document.querySelector('.global-login');
                    var v3LoginNode = document.querySelector('.bluemix-login');
                    var signedUpLink = document.querySelector('.already-signed-up');
                    var authenticated = !(v4LoginNode || v3LoginNode || signedUpLink);

                    return authenticated;
                }

                /*
                 Wait for Coremetrics to finish loading.
                 */
                function pollForCoremetricsReady() {
                    return new Promise(function (resolve) {
                        if (global.cmCreateElementTag && global.cm_ClientID) {
                            resolve(global.cmCreateElementTag);
                            return;
                        }

                        var interval = setInterval(function () {
                            if (global.cmCreateElementTag && global.cm_ClientID) {
                                clearInterval(interval);
                                resolve(global.cmCreateElementTag);
                            }
                        }, 500);
                    });
                }

                /*
                 Check session storage and query parameters for any configuration constiables.
                 Check the header first, then session storage wo
                 */
                function getAnalyticsConfig() {
                    var configuration = {};

                    // Update default settings from global._analytics
                    var _analytics = global._analytics || {}; // eslint-disable-line no-underscore-dangle
                    Object.keys(_analytics).forEach(function (key) {
                        // eslint-disable-line no-underscore-dangle
                        configuration[key] = configuration[key] || _analytics[key];
                    });

                    // Add updates from local storage
                    Object.keys(configuration).forEach(function (key) {
                        if (localStorage.getItem(key) !== null) {
                            configuration[key] = localStorage.getItem(key);
                        }
                    });

                    // Add updates from the url
                    var hashes = global.location.href.slice(global.location.href.indexOf('?') + 1).split('&');
                    for (var i = 0; i < hashes.length; i += 1) {
                        var hash = hashes[i].split('=');
                        var key = hash[0];
                        var value = hash[1];
                        if (key in configuration) {
                            configuration[key] = value === 'true' || value === true;
                            // Cache update in session storage to persist it across pages
                            localStorage.setItem(key, value);
                        }
                    }
                    return configuration;
                }

                /*
                 Vendor provided script to load hotjar
                 */
                function addHotjar(h, o, t, j, a, r) {
                    h.hj = h.hj || function () {
                            // eslint-disable-line
                            (h.hj.q = h.hj.q || []).push(arguments); // eslint-disable-line
                        };

                    h._hjSettings = { // eslint-disable-line no-underscore-dangle, no-param-reassign
                        hjid: 61980,
                        hjsv: 5
                    };

                    a = o.getElementsByTagName('head')[0]; // eslint-disable-line no-param-reassign
                    r = o.createElement('script'); // eslint-disable-line no-param-reassign
                    r.async = 1; // eslint-disable-line no-param-reassign
                    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv; // eslint-disable-line no-underscore-dangle, no-param-reassign
                    a.appendChild(r);
                }

                /*
                 Vendor provided script to load Segment
                 */
                function addSegment(writeKey) {
                    global.analytics = global.analytics || {};
                    // If the real analytics.js is already on the page return.
                    if (global.analytics.initialize) {
                        return Promise.resolve(true);
                    }

                    // If the snippet was invoked already show an error.
                    if (global.analytics.invoked) {
                        if (global.console) {
                            console.error('Segment snippet included twice.'); // eslint-disable-line no-console
                        }
                        return Promise.resolve();
                    }
                    // Create a queue, but don't obliterate an existing one!
                    var queue = [];
                    // Invoked flag, to make sure the snippet
                    // is never invoked twice.
                    global.analytics.invoked = true;

                    // A list of the methods in Analytics.js to stub.
                    global.analytics.methods = ['trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview', 'identify', 'group', 'track', 'ready', 'alias', 'page', 'once', 'off', 'on'];
                    analytics.track('Signed Up', {
                        plan: '333'
                    });

                    // Define a factory to create stubs. These are placeholders
                    // for methods in Analytics.js so that you never have to wait
                    // for it to load to actually record data. The `method` is
                    // stored as the first argument, so we can replay the data.
                    global.analytics.factory = function (method) {
                        return function () {
                            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                args[_key] = arguments[_key];
                            }

                            var newArgs = Array.prototype.slice.call(args);
                            args.unshift(method);
                            queue.push(newArgs);
                            return queue;
                        };
                    };

                    // For each of our methods, generate a queueing stub.
                    global.analytics.methods.forEach(function (method) {
                        global.analytics[method] = global.analytics.factory(method);
                    });

                    // Define a method to load Analytics.js from our CDN,
                    // and that will be sure to only ever load it once.
                    global.analytics.load = function (key) {
                        var protocol = document.location.protocol || 'http:';
                        var url = protocol + '//cdn.segment.com/analytics.js/v1/' + key + '/analytics.min.js';
                        var promiseDelayLoadingSegment = isNaN(global.delayLoadingSegment) ? Promise.resolve() : Promise.race([new Promise(function (resolve) {
                                setTimeout(resolve, Math.min(global.delayLoadingSegment, MAXIMUM_SEGMENT_LOAD_DELAY_MS));
                            }), new Promise(function (resolve) {
                                document.defaultView.addEventListener('ready-loading-late-code', resolve);
                            })]);
                        return promiseDelayLoadingSegment.then(function () {
                            return new Promise(function (resolve) {
                                _no_jquery2.default.async_script(url, resolve);
                            });
                        });
                    };

                    // Add a version to keep track of what's in the wild.
                    global.analytics.SNIPPET_VERSION = '3.0.1';

                    // Load Analytics.js with your key, which will automatically
                    // load the tools you've enabled for your account. Boosh!
                    return global.analytics.load(writeKey);

                    // Make the first page call to load the integrations. If
                    // you'd like to manually name or tag the page, edit or
                    // move this call however you'd like.
                    // analytics.page(); // Moved after page loads...
                }

                /*
                 Load coremetrics
                 */
                function addCoremetrics() {
                    var corementricsUrl = '//www.ibm.com/common/stats/ida_production.js';

                    var promise = new Promise(function (resolve) {
                        /*
                         Bluemix can load Coremetrics asynchronously
                         */
                        global.bluemixAnalytics.getAnonymousId().then(function () {
                            _no_jquery2.default.async_script(corementricsUrl, function () {
                                resolve('async');
                            });
                        });
                    });
                    return promise;
                }

                function addGoogleAddServices() {
                    var clientType = _no_jquery2.default.clientType();
                    if (clientType === 'PhantomJS') {
                        return;
                    }

                    global.google_conversion_id = 975533992;
                    global.google_custom_params = global.google_tag_params;
                    global.google_remarketing_only = true;

                    _no_jquery2.default.async_script('//www.googleadservices.com/pagead/conversion_async.js');
                }

                function addAddRoll() {
                    var clientType = _no_jquery2.default.clientType();
                    if (clientType === 'PhantomJS') {
                        return;
                    }

                    global.adroll_adv_id = '2XK4FFQETRGHTNEHWN6VRC';
                    global.adroll_pix_id = 'VBGSOVJ2QFHXROI6AFOFKH';
                    global.__adroll_loaded = true; // eslint-disable-line no-underscore-dangle

                    var host = document.location.protocol === 'https:' ? 'https://s.adroll.com' : 'http://a.adroll.com';
                    var url = host + '/j/roundtrip.js';
                    _no_jquery2.default.async_script(url);
                }

                /*
                 Pull optimizely information from local storage and push it into
                 global.optimizely to configure any running a/b tests.
                 This function must run at the top of the page, before optimizely is loaded.
                 */
                function registerOptimizelyBucketInfo() {
                    global.optimizely = global.optimizely || [];

                    // Pull optimizely data from local storage, if possible
                    if (localStorage.getItem('intercomm_configuration') !== null) {
                        var localData = JSON.parse(localStorage.getItem('intercomm_configuration'));
                        global.optimizely.push(['setUserId', localData.userID]);
                        global.optimizely.push(['bucketVisitor', localData.experimentID, localData.constiation]);
                    }
                }

                /* eslint-disable */
                // cmCreateConversionEventTag
                function registerSignupCoremetricsEvents() {

                    _no_jquery2.default.subscribe('ConversionEvent', function (e) {
                        try {
                            // TODO: THIS FUNCTION IS NOT DEFINED
                            cmCreateConversionEventTag(e.eventID, e.actionType, e.eventCategoryId);
                        } catch (err) {}
                    });
                }
                /* eslint-enable */

                /**
                 Add page specific event handlers for Coremetrics
                 **/
                function registerCoremetricsEvents() {
                    var pageId = getPageID();

                    if (pageId === 'Bluemix Signup') {
                        registerSignupCoremetricsEvents();
                    }

                    global.bluemixAnalytics.pollForHeaderAuthReady().then(function (userID) {
                        global.cmCreateRegistrationTag(userID);
                    });
                }

                /*
                 Make intercom button visible for paygo, standard, and subscription users
                 */
                function showIntercom(accountData) {
                    if (accountData) {
                        if (accountData.type === 'PAYG' || accountData.type === 'STANDARD' || accountData.type === 'SUBSCRIPTION') {
                            global.analytics.ready(function () {
                                if (global.Intercom) {
                                    global.Intercom('update', { hide_default_launcher: false }); // eslint-disable-line new-cap
                                    console.log('Show Intercom'); // eslint-disable-line no-console
                                }
                            });
                        }
                    }
                }

                /*
                 Loading user's account type using mechanisms provided by the v5 header
                 */
                function loadAccount(cb) {
                    var callCallbackWithAccount = function callCallbackWithAccount(callback) {
                        if (global.header.whenOrgReady) {
                            global.header.whenOrgReady(function (orgSpaceData) {
                                if (orgSpaceData && orgSpaceData.org && orgSpaceData.org.account && orgSpaceData.accounts) {
                                    global.analyticsAccount = orgSpaceData.accounts.filter(function (acct) {
                                        // eslint-disable-line
                                        return acct.accountGuid === orgSpaceData.org.account;
                                    })[0];
                                    callback(global.analyticsAccount);
                                } else {
                                    callback({ type: null });
                                }
                            });
                        }
                    };

                    if (global.analyticsAccount) {
                        cb(global.analyticsAccount);
                    } else if (global.header) {
                        // If the user changes orgs or they complete the onboarding wizard then there is new information to identify the account so we need to reset the account information
                        if (global.header.addOrgChangedListener) {
                            global.header.addOrgChangedListener(function () {
                                callCallbackWithAccount(function (account) {
                                    showIntercom(account);
                                });
                            });
                        }
                        callCallbackWithAccount(cb);
                    } else {
                        cb({ type: null });
                    }
                }

                /*
                 Entry point for the analytics framework.
                 Walk the page, adding all necessary scripts and event handlers.
                 */
                function initAnalytics(config) {
                    _modules.campaigns.storeCampaign();

                    var scriptHost = global._analytics.analyticsServiceUrl || 'https://console.ng.bluemix.net'; // eslint-disable-line no-underscore-dangle
                    // Load Optimizely
                    if (config.optimizely) {
                        registerOptimizelyBucketInfo();
                        _no_jquery2.default.sync_script('//cdn.optimizely.com/js/' + global._analytics.optimizely_key + '.js'); // eslint-disable-line no-underscore-dangle
                    }

                    // Tealeaf
                    if (config.tealeaf) {
                        _no_jquery2.default.async_script(scriptHost + '/analytics/tealeaf/tealeaf_jq.js');
                        _no_jquery2.default.async_script(scriptHost + '/analytics/tealeaf/bluemix_config.js');
                    }

                    // HotJar
                    if (config.hotjar) {
                        addHotjar(global, document, '//static.hotjar.com/c/hotjar-', '.js?sv=');
                    }

                    var segmentPromise = void 0;
                    if (config.segment) {
                        segmentPromise = addSegment(global._analytics.segment_key); // eslint-disable-line no-underscore-dangle
                    }

                    _no_jquery2.default.ready(function () {
                        // Store page data for later use.
                        // This will allow us to dynamically load the segment hooks.
                        global.analytics_config.page_info = {
                            site: getSite(),
                            isBluemix: isBluemix(),
                            clientType: _no_jquery2.default.clientType(),
                            pageId: getPageID(),
                            isAuthenticatedPage: isAuthenticatedPage()
                        };

                        // after successful load of the segment library, and successful
                        // retrieval of the anonymousId, the next thing to be done
                        // is to set the anonymous Id for all subsequent analytics calls
                        segmentPromise.then(function () {
                            global.bluemixAnalytics.getAnonymousId().then(function (bmAnonymousId) {
                                if (bmAnonymousId) {
                                    if (global.amplitude) {
                                        global.amplitude.setDeviceId(bmAnonymousId);
                                        console.log('Amplitude updated with anonymous Id ' + bmAnonymousId); // eslint-disable-line no-console
                                    } else {
                                        console.error('Unable to set Amplitude deviceId!'); // eslint-disable-line no-console
                                    }

                                    global.analytics.user().anonymousId(bmAnonymousId);
                                } else {
                                    console.error('Error retrieving anonymous Id'); // eslint-disable-line no-console
                                }
                            });
                            // register a callback with the common header to perform an identify
                            // if a user logs in.
                            loadAccount(function (accountData) {
                                if (accountData && accountData.userGuid) {
                                    global.bluemixAnalytics.identify(accountData.userGuid);
                                }
                            });
                        });
                        segmentPromise.then(loadAccount.bind(null, showIntercom));

                        if (isBluemix() && !isAuthenticatedPage()) {
                            // Google add services reserved for non-authenticated pages
                            if (config.googleAddServices) {
                                addGoogleAddServices();
                            }

                            // Addroll can only be added when we are not authenticated.
                            if (config.addRoll) {
                                addAddRoll();
                            }
                        }

                        // Enable events for specific sites
                        var analyticsFile = localStorage.getItem('analytics_file');

                        // Allow the analytics file to be overloaded for 3rd party clients
                        var siteId = getSite();
                        if (analyticsFile !== null) {
                            _no_jquery2.default.async_script(analyticsFile);
                        } else if (config.segment && siteId === 'BLUEMIX_ATLAS') {
                            segmentPromise.then(_no_jquery2.default.async_script.bind(_no_jquery2.default, scriptHost + '/analytics/sources/analytics-atlas.js'));
                        } else if (config.segment && siteId === 'BLUEMIX_CLASSIC') {
                            segmentPromise.then(_no_jquery2.default.async_script.bind(_no_jquery2.default, scriptHost + '/analytics/sources/analytics-classic.js'));
                            // registerSegmentEventsForClassicBluemix( config );
                        } else if (config.segment && siteId === 'COMMON_LIBRARY') {
                            // noop.  All stuff is included in the bluemix-analytics.js
                        } else if (config.segment) {
                            segmentPromise.then(_no_jquery2.default.async_script.bind(_no_jquery2.default, scriptHost + '/analytics/sources/analytics-marketing.js'));
                        }

                        // Coremetrics not allowed on authenticated pages, except the docs
                        if (isAuthenticatedPage() && getPageID() !== 'BLUEMIX DOCS') {
                            config.coremetrics = false; // eslint-disable-line no-param-reassign
                        }

                        if (config.coremetrics) {
                            var coremetricsPromise = addCoremetrics();
                            coremetricsPromise.then(function () {
                                return pollForCoremetricsReady();
                            }).then(function () {
                                // Add campaign and tactic logic. Documented here: http://webdev.bluehost.ibm.com/working/tactic.php
                                _no_jquery2.default.async_script('//www.ibm.com/software/info/js/tactic.js');
                                _no_jquery2.default.async_script('//www.ibm.com/software/info/js/tacticbindlinks.js');

                                registerCoremetricsEvents();
                            });
                        }
                    });
                }

                function init() {
                    // Allow a user to disable analytics for performance tuning.
                    var config = global.analytics_config = getAnalyticsConfig();
                    if (config.enabled === false) {
                        return;
                    }

                    // Allow a user to override the local storage logic for segment if they're testing
                    config.segment = config.segment || config.force_segment;

                    // Load Promise polyfill. the polyfill will add Promise to the global
                    // scope only if it's not already defined.
                    if (typeof Promise !== 'function') {
                        var scriptHost = global._analytics.analyticsServiceUrl || 'https://console.ng.bluemix.net'; // eslint-disable-line no-underscore-dangle
                        _no_jquery2.default.async_script(scriptHost + '/analytics/sources/lie.polyfill.min.js', function () {
                            initAnalytics(config);
                        });
                    } else {
                        initAnalytics(config);
                    }
                }

                init();
            })();
            /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

        /***/ },
    /* 1 */
    /***/ function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */(function(global) {'use strict';

            var _ready = __webpack_require__(2);

            var _ready2 = _interopRequireDefault(_ready);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            /*
             Check to see if a given element matches a selector.
             */
            function selectorMatches(el, selector) {
                var _this = this;

                var p = Element.prototype;
                var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
                        return [].indexOf.call(document.querySelectorAll(s), _this) !== -1;
                    };
                return f.call(el, selector);
            }

            function clientType() {
                var clientTypeName = void 0;

                var ua = navigator.userAgent;

                if (ua.indexOf('Chrome') !== -1) {
                    clientTypeName = 'Chrome';
                } else if (ua.indexOf('Firefox') !== -1) {
                    clientTypeName = 'Firefox';
                } else if (ua.indexOf('MSIE') !== -1 || ua.indexOf('Trident') !== -1) {
                    // IF IE > 10
                    clientTypeName = 'IE';
                } else if (ua.indexOf('PhantomJS') !== -1) {
                    clientTypeName = 'PhantomJS';
                } else {
                    clientTypeName = 'unknown';
                }

                return clientTypeName;
            }

            function syncScript(url) {
                var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var callback = arguments[2];

                if (typeof attrs === 'function') {
                    callback = attrs; // eslint-disable-line no-param-reassign
                    attrs = {}; // eslint-disable-line no-param-reassign
                }
                console.log('Adding synchronous script: ' + url); // eslint-disable-line no-console

                var scr = document.createElement('script');
                scr.type = 'text/javascript';
                scr.async = false;
                Object.keys(attrs).forEach(function (key) {
                    scr.setAttribute(key, attrs[key]);
                });
                var x = document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(scr, x);

                scr.onreadystatechange = scr.onload = function () {
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                };

                scr.src = url;
            }

            var listeners = {};

            module.exports = {
                ready: _ready2.default,
                // split an href into its constituent parts
                parseHref: function parseHref(href) {
                    var match = href.match(/^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
                    return match && {
                            protocol: match[1],
                            host: match[2], // with port
                            hostname: match[3], // without port
                            port: match[4],
                            pathname: match[5],
                            search: match[6],
                            hash: match[7]
                        };
                },


                /*
                 Fire a function when the document is ready
                 */
                contentLoadedHandler: function contentLoadedHandler(fn) {
                    var authedHeaderNode = document.querySelector('.bluemix-nav-authorized');
                    // check logged user or not
                    if (authedHeaderNode) {
                        // wait until account status ready
                        var interval = setInterval(function () {
                            if (global.header && global.header.accountStatus && global.header.accountStatus.userGuid) {
                                clearInterval(interval);
                                fn();
                            }
                        }, 500);
                    } else {
                        fn();
                    }
                },


                // Adds a custom event listener onto each node in the query selector
                on: function on(queryString, eventName, eventListener) {
                    var nodes = document.querySelectorAll(queryString);
                    for (var i = 0; i < nodes.length; i += 1) {
                        var node = nodes.item(i);
                        node.addEventListener(eventName, eventListener);
                    }
                },


                /*
                 A modified version of the _$.on function for dynamic content.
                 The function adds a listener to the body and checks each event to
                 see if it belong to the original query string. This allows events on dynamic
                 content to be captured.
                 */
                // TODO: Check if this can be removed. I don't think it is being used anywhere
                at: function at(queryString, eventName, eventListener) {
                    this.on('body', eventName, function (evt) {
                        var element = evt.target;
                        while (element) {
                            if (selectorMatches(element, queryString)) {
                                eventListener(element);
                            } else {
                                element = element.parentElement;
                            }
                        }
                    });
                },


                /*
                 Wait for an element and then attach a selector to it.
                 */
                // TODO: Check if this can be removed. I don't think it is being used anywhere
                _on_poll: function _on_poll(queryString, eventName, eventListener) {
                    var _this2 = this;

                    // eslint-disable-line no-underscore-dangle
                    var nodes = document.querySelectorAll(queryString);
                    if (nodes.length > 0) {
                        return this.on(queryString, eventName, eventListener);
                    }

                    var interval = setInterval(function () {
                        var nodeList = document.querySelectorAll(queryString);
                        if (nodeList.length > 0) {
                            _this2.on(queryString, eventName, eventListener);
                            clearInterval(interval);
                        }
                    }, 250);
                    return interval;
                },

                /*
                 Checks which client we're using...
                 */
                clientType: clientType,

                text: function text(queryString) {
                    var text = void 0;
                    var node = document.querySelector(queryString);
                    if (node && node.type === 'text') {
                        text = node.value;
                    } else if (node && node.textContent) {
                        text = node.textContent;
                    }

                    if (text && typeof text === 'string') {
                        text = text.trim();
                    }

                    return text;
                },
                hasClass: function hasClass(element, cls) {
                    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
                },


                sync_script: syncScript,

                async_script: function async_script(url) {
                    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                    var callback = arguments[2];

                    if (typeof attrs === 'function') {
                        callback = attrs; // eslint-disable-line no-param-reassign
                        attrs = {}; // eslint-disable-line no-param-reassign
                    }
                    if (clientType() === 'PhantomJS') {
                        syncScript(url, callback);
                        return;
                    }
                    console.log('Adding asynch script: ' + url); // eslint-disable-line no-console

                    var scr = document.createElement('script');
                    scr.type = 'text/javascript';
                    scr.async = true;
                    Object.keys(attrs).forEach(function (key) {
                        scr.setAttribute(key, attrs[key]);
                    });

                    var x = document.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(scr, x);

                    scr.onreadystatechange = scr.onload = function () {
                        if (callback && typeof callback === 'function') {
                            callback();
                        }
                    };
                    scr.src = url;
                },


                /*
                 Create a new cookie.
                 */
                setCookie: function setCookie(cname, cvalue, exdays) {
                    var d = new Date();
                    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
                    document.cookie = cname + '=' + cvalue + ';expires=' + d.toUTCString();
                },


                /*
                 Return a cookie with a given name, or null.
                 */
                getCookie: function getCookie(cname) {
                    var name = cname + '=';
                    var ca = document.cookie.split(';');
                    for (var i = 0; i < ca.length; i += 1) {
                        var c = ca[i];
                        while (c.charAt(0) === ' ') {
                            c = c.substring(1);
                        }
                        if (c.indexOf(name) === 0) {
                            return c.substring(name.length, c.length);
                        }
                    }
                    return null;
                },


                /*
                 Deletes the specified cookie on Path=/
                 */
                deleteCookie: function deleteCookie(cname) {
                    document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
                },


                /*
                 Pub / Sub framework for analytics events
                 */

                publish: function publish(topic, data) {
                    if (!listeners[topic]) {
                        return this;
                    }

                    var subscribers = listeners[topic];
                    for (var i = 0; i < subscribers.length; i += 1) {
                        var callback = subscribers[i];
                        callback(data);
                    }
                    return this;
                },
                subscribe: function subscribe(topic, callback) {
                    if (!listeners[topic]) {
                        listeners[topic] = [];
                    }
                    listeners[topic].push(callback);
                },


                /*
                 AJAX GET call.
                 */
                get: function get(url) {
                    var promise = new Promise(function (resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', url, true);
                        xhr.withCredentials = true;

                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                var response = void 0;
                                try {
                                    response = JSON.parse(xhr.responseText);
                                } catch (e) {
                                    response = xhr.responseText;
                                }
                                resolve(response);
                            } else if (xhr.readyState === 4) {
                                reject(xhr.statusText);
                            }
                        };

                        xhr.send();
                    });

                    return promise;
                },
                post: function post(url, jsondata) {
                    var promise = new Promise(function (resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        xhr.open('POST', url);
                        xhr.setRequestHeader('Content-Type', 'application/json');

                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 201)) {
                                var response = void 0;
                                try {
                                    response = JSON.parse(xhr.responseText);
                                } catch (e) {
                                    response = xhr.responseText;
                                }
                                resolve(response);
                            } else if (xhr.readyState === 4) {
                                reject(xhr.statusText);
                            }
                        };

                        xhr.send(JSON.stringify(jsondata));
                    });
                    return promise;
                },
                delete: function _delete(url) {
                    var promise = new Promise(function (resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        xhr.open('DELETE', url);

                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 204)) {
                                resolve();
                            } else if (xhr.readyState === 4) {
                                reject();
                            }
                        };
                        xhr.send();
                    });

                    return promise;
                },
                htmltext: function htmltext(url) {
                    var promise = new Promise(function (resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', url, true);
                        xhr.withCredentials = true;

                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                resolve(xhr.responseText);
                            } else if (xhr.readyState === 4) {
                                reject(xhr.statusText);
                            }
                        };
                        xhr.send();
                    });

                    return promise;
                },
                jsonp: function jsonp(url, callback) {
                    global._jsonpCallback = function (data) {
                        // eslint-disable-line no-underscore-dangle
                        if (callback) {
                            callback(data); /* race condition... */
                        }
                    };

                    var head = document.getElementsByTagName('head')[0];
                    var script = document.createElement('script');
                    if (url.indexOf('?') > -1) {
                        script.src = url + '&jsoncallback=_jsonpCallback';
                    } else {
                        script.src = url + '?jsoncallback=_jsonpCallback';
                    }
                    script.type = 'text/javascript';
                    head.appendChild(script);
                }
            };
            /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

        /***/ },
    /* 2 */
    /***/ function(module, exports) {

        "use strict";

        // The public function name defaults to window.docReady
        // but you can pass in your own object and own function name and those will be used
        // if you want to put them in a different namespace
        var readyList = [];
        var readyFired = false;
        var readyEventHandlersInstalled = false;

        // call this when the document is ready
        // this function protects itself against being called more than once
        function ready() {
            if (!readyFired) {
                // this must be set to true before we start calling callbacks
                readyFired = true;
                for (var i = 0; i < readyList.length; i++) {
                    // if a callback here happens to add new ready handlers,
                    // the docReady() function will see that it already fired
                    // and will schedule the callback to run right after
                    // this event loop finishes so all handlers will still execute
                    // in order and no new ones will be added to the readyList
                    // while we are processing the list
                    readyList[i].fn.call(window, readyList[i].ctx);
                }
                // allow any closures held by these functions to free
                readyList = [];
            }
        }

        function readyStateChange() {
            if (document.readyState === "complete") {
                ready();
            }
        }

        // This is the one public interface
        // docReady(fn, context);
        // the context argument is optional - if present, it will be passed
        // as an argument to the callback
        module.exports = function (callback, context) {
            // if ready has already fired, then just schedule the callback
            // to fire asynchronously, but right away
            if (readyFired) {
                setTimeout(function () {
                    callback(context);
                }, 1);
                return;
            } else {
                // add the function and context to the list
                readyList.push({ fn: callback, ctx: context });
            }
            // if document already ready to go, schedule the ready function to run
            if (document.readyState === "complete" || !document.attachEvent && document.readyState === "interactive") {
                setTimeout(ready, 1);
            } else if (!readyEventHandlersInstalled) {
                // otherwise if we don't have event handlers installed, install them
                if (document.addEventListener) {
                    // first choice is DOMContentLoaded event
                    document.addEventListener("DOMContentLoaded", ready, false);
                    // backup is window load event
                    window.addEventListener("load", ready, false);
                } else {
                    // must be IE
                    document.attachEvent("onreadystatechange", readyStateChange);
                    window.attachEvent("onload", ready);
                }
                readyEventHandlersInstalled = true;
            }
        };

        /***/ },
    /* 3 */
    /***/ function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */(function(global) {'use strict';

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

            var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // eslint-disable-line camelcase


            var _no_jquery = __webpack_require__(1);

            var _trackEvents = __webpack_require__(4);

            var _identification = __webpack_require__(5);

            var category = 'IBM Design NPS';
            // This is a best effort attempt to determine if the user is an IBMer or not.
            // It is a simpler form of check that exists in the Accounts uService.
            // This should work for any page running under the Bluemix header.
            // We recognize that this is brittle.
            // TODO. Improve this in the future.
            function isIBMer() {
                var elementList = document.getElementsByClassName('user-email');
                if (elementList.length !== 1) {
                    console.error('Analytics could not find a "user-email". Query length: ' + elementList.length); // eslint-disable-line no-console
                    return false;
                }
                var emailAddr = elementList[0].textContent;
                if (emailAddr && emailAddr.indexOf('@') !== -1) {
                    return emailAddr.toLowerCase().trim().endsWith('ibm.com');
                }
                console.error('Analytics could not find a "user-email". Text found: ' + emailAddr); // eslint-disable-line no-console
                return false;
            }

            function isTestNPS() {
                var matches = window.location.host.match(/stage1.(ng|eu-gb|au-syd)?.bluemix.net|localhost:3000/);
                return global.localStorage && global.localStorage.testNPS && (global.localStorage.testNPS === 'true' || global.localStorage.testNPS === true) || matches && matches.length > 0;
            }

            function npsHost() {
                if (isTestNPS()) {
                    return 'https://nps-test.mybluemix.net';
                }
                return 'https://nps.mybluemix.net';
            }

            function onClickSurveyScale(ev) {
                if (ev.target.className === 'radio__input') {
                    // can't bind data to this because we need this to be the underlying target that was clicked
                    var offeringNameNode = document.querySelector('.ibmNps-question__offering');
                    if (offeringNameNode && ev.target.value) {
                        var data = parseInt(ev.target.value, 10);
                        (0, _trackEvents.trackUserFormAction)({
                            category: category,
                            name: offeringNameNode.innerText,
                            field: 'score',
                            action: 'select',
                            data: data,
                            success_flag: true,
                            result_value: 'success'
                        });
                    } else {
                        console.warn('[analytics] couldn\'t find offering name or the slected value in nps survey.'); // eslint-disable-line no-console
                    }
                }
            }

            function onBlurCommentTextArea(data) {
                var comment = this.value;
                (0, _trackEvents.trackUserFormAction)({
                    category: category,
                    name: data.name,
                    field: 'comment',
                    action: 'blur',
                    data: comment,
                    success_flag: true,
                    result_value: 'success'
                });
            }

            var commentTextAreaOnBlurHandler = null;
            function addCommentTextAreaBlurEventListenerWithData(data) {
                var surveyCommentTextAreaNode = document.querySelector('.ibmNps-textarea');
                if (surveyCommentTextAreaNode) {
                    commentTextAreaOnBlurHandler = onBlurCommentTextArea.bind(surveyCommentTextAreaNode, data);
                    surveyCommentTextAreaNode.addEventListener('blur', commentTextAreaOnBlurHandler);
                } else {
                    console.log('[analytics] unable to find .ibmNps-textarea'); // eslint-disable-line no-console
                }
            }

            function removeCommentTextAreaBlurEventListener() {
                var surveyCommentTextAreaNode = document.querySelector('.ibmNps-textarea');
                if (surveyCommentTextAreaNode) {
                    surveyCommentTextAreaNode.removeEventListener('beforeunload', commentTextAreaOnBlurHandler);
                    commentTextAreaOnBlurHandler = null;
                } else {
                    console.log('[analytics] unable to find .ibmNps-textarea'); // eslint-disable-line no-console
                }
            }

            function addSurveyScaleEventListener() {
                var surveyScale = document.querySelector('.ibmNps-container > .ibmNps-scale');
                if (surveyScale) {
                    surveyScale.addEventListener('click', onClickSurveyScale);
                } else {
                    console.log('[analytics] unable to find .ibmNps-container > .ibmNps-scale'); // eslint-disable-line no-console
                }
            }

            function removeSurveyScaleEventListener() {
                var surveyScale = document.querySelector('.ibmNps-container > .ibmNps-scale');
                if (surveyScale) {
                    surveyScale.removeEventListener('click', onClickSurveyScale);
                } else {
                    console.log('[analytics] unable to find .ibmNps-container > .ibmNps-scale'); // eslint-disable-line no-console
                }
            }

            function closeSurvey(data, field) {
                global.analytics.track('Completed NPS Survey', {
                    surveySource: category,
                    NPS_comment: data.comment,
                    NPS_date: new Date().toISOString(),
                    NPS_method: 'bluemix',
                    NPS_rating: data.score,
                    NPS_score: data.score * 10,
                    service: data.name,
                    offeringId: data.offeringId,
                    url: global.location.href,
                    path: global.location.pathname
                });
                // The survey has been opened but the user navigates away from the
                // page either by closing the browser window/tab or by pressing the
                // back/forward button
                (0, _trackEvents.trackUserFormAction)({
                    category: category,
                    name: data.name,
                    field: field,
                    action: 'close',
                    success_flag: false,
                    result_value: null
                });
                removeWindowUnloadEventListener(); // eslint-disable-line no-use-before-define
                removeSurveyScaleEventListener();
                removeCommentTextAreaBlurEventListener();
            }

            function onSurveyClosed(data) {
                closeSurvey(data, 'dismiss');
            }

            var windowUnloadHandler = null;
            function addWindowUnloadEventListenerWithData(data) {
                windowUnloadHandler = closeSurvey.bind(global, data, 'unload');
                global.addEventListener('beforeunload', windowUnloadHandler);
            }

            function removeWindowUnloadEventListener() {
                global.removeEventListener('beforeunload', windowUnloadHandler);
                windowUnloadHandler = null;
            }

            function onBeforeDisplaySurvey(data) {
                // console.log(`onBeforeDisplaySurvey ${JSON.stringify(data, null, 4)}`);
                // Survey opened
                global.analytics.page('Viewed NPS Survey', _extends({}, data, { survey_source: 'IBM Design NPS' }));
                // the survey isn't on the page yet but it will soon be so we just need a short timeout
                global.setTimeout(function () {
                    addWindowUnloadEventListenerWithData(data);
                    addSurveyScaleEventListener();
                    addCommentTextAreaBlurEventListenerWithData(data);
                }, 500);
            }

            function onBeforeSubmitSurvey(data) {
                // console.log(`onBeforeSubmitSurvey ${JSON.stringify(data, null, 4)}`);
                global.analytics.track('Completed NPS Survey', {
                    surveySource: category,
                    NPS_comment: data.comment,
                    NPS_date: new Date().toISOString(),
                    NPS_method: 'bluemix',
                    NPS_rating: data.score,
                    NPS_score: data.score * 10,
                    service: data.name,
                    offeringId: data.offeringId,
                    url: global.location.href,
                    path: global.location.pathname
                });
            }

            function onAfterSubmitSurvey(data, statusCode) {
                // console.log(`onAfterSubmitSurvey[${statusCode}] ${JSON.stringify(data, null, 4)}`);
                // currently only the statusCode is returned but eventually it will be an error object
                if (statusCode >= 400) {
                    // move this into a top level track event once we know the spec
                    global.analytics.track('Request Error', {
                        category: category,
                        name: data.name,
                        method: 'POST',
                        requestUrl: npsHost() + '/api/v1/responses',
                        url: document.location.href,
                        path: document.location.pathname,
                        statusCode: statusCode,
                        message: ''
                    });
                }
                removeWindowUnloadEventListener(); // eslint-disable-line no-use-before-define
                removeSurveyScaleEventListener();
                removeCommentTextAreaBlurEventListener();
            }

            function onAfterCheckSurvey(data, statusCode) {
                // console.log(`onAfterCheckSurvey[${statusCode}] ${JSON.stringify(data, null, 4)}`);
                if (statusCode >= 400) {
                    // move this into a top level track event once we know the spec
                    global.analytics.track('Request Error', {
                        category: category,
                        name: data.name,
                        method: 'POST',
                        requestUrl: npsHost() + '/survey/checkSurvey',
                        url: document.location.href,
                        path: document.location.pathname,
                        statusCode: statusCode,
                        message: ''
                    });
                }
            }

            function ibmNpsConfig(userId) {
                var customOfferingIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                var additionalAttributes = arguments[2];

                return _extends({
                    test: isTestNPS(), // eslint-disable-line no-underscore-dangle
                    forceSurvey: global.analytics_config.forceNPS
                }, additionalAttributes, {
                    customOfferingIds: customOfferingIds,
                    userId: userId,
                    collectionId: '09954124-98cb-3630-b2da-d76229171e84', // Bluemix
                    disableHashing: true,
                    onAfterCheckSurvey: onAfterCheckSurvey,
                    onBeforeSubmitSurvey: onBeforeSubmitSurvey,
                    onAfterSubmitSurvey: onAfterSubmitSurvey,
                    onSurveyClosed: onSurveyClosed,
                    onBeforeDisplaySurvey: onBeforeDisplaySurvey
                });
            }
            var npsLoaded = false;

            function loadAndOrCallCheckNpsSurvey(userGuid, offeringGuid, additionalAttributes) {
                global.ibmNps = ibmNpsConfig(userGuid, offeringGuid, additionalAttributes);
                if (npsLoaded) {
                    global.checkNpsSurvey();
                } else {
                    (0, _no_jquery.async_script)(npsHost() + '/survey/nps-survey.js', { id: 'ibmNpsSurveyScript' }, function () {
                        // eslint-disable-line no-underscore-dangle
                        npsLoaded = true;
                    });
                }
            }

            module.exports = {
                checkNpsSurvey: function checkNpsSurvey() {
                    var offeringIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                    if (offeringIds && global.analytics_config.enableNPS) {
                        var sendCheckStatus = function sendCheckStatus(userGuid) {
                            var customAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                            if (userGuid && (typeof offeringIds === 'undefined' ? 'undefined' : _typeof(offeringIds)) === 'object' && offeringIds.length && offeringIds.length > 0) {
                                loadAndOrCallCheckNpsSurvey(userGuid, offeringIds, { customAttributes: customAttributes });
                            } else if (userGuid && typeof offeringIds === 'string' && offeringIds.length > 0) {
                                loadAndOrCallCheckNpsSurvey(userGuid, [offeringIds], { customAttributes: customAttributes });
                            } else {
                                console.log('[analytics] Invalid parameter offeringIds in checkNPSSurvey'); // eslint-disable-line no-console
                            }
                        };
                        (0, _identification.getIUI)().then(function (userGuid) {
                            var customAttributes = {
                                Is_IBMer: isIBMer()
                            };
                            if (global.header && global.header.whenOrgReady) {
                                // bluemix.net only
                                global.header.whenOrgReady(function (orgData) {
                                    var _ref = orgData.account || global.header.accountStatus,
                                        _ref$type = _ref.type,
                                        type = _ref$type === undefined ? 'UNKNOWN' : _ref$type,
                                        _ref$status = _ref.status,
                                        status = _ref$status === undefined ? 'ACTIVE' : _ref$status,
                                        _ref$isAccountOwner = _ref.isAccountOwner,
                                        isAccountOwner = _ref$isAccountOwner === undefined ? true : _ref$isAccountOwner;

                                    sendCheckStatus(userGuid, _extends({}, customAttributes, {
                                        Is_Paid: type === 'PAYG',
                                        Account_Type: type,
                                        Registration_Status: status,
                                        Is_Account_Owner: isAccountOwner
                                    }));
                                });
                            } else {
                                // outside of bluemix.net
                                sendCheckStatus(userGuid, customAttributes);
                            }
                        });
                    }
                }
            };
            /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

        /***/ },
    /* 4 */
    /***/ function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */(function(global) {'use strict';

            var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

            var _identification = __webpack_require__(5);

            module.exports = {
                /**
                 *
                 * trackUserAction
                 *
                 * Used to track a user's action on a page.  Takes in three strings: a page identifier,
                 * a field identifier, and an action identifier.   Generates a segment TRACK event with
                 * these strings embedded as properties.   This event can then be used to feed a funnel
                 * in Amplitude.
                 *
                 * Optionally, a fourth parameter with free form extra data (e.g. an error message) can be passed.
                 *
                 * e.g. trackUserAction('registration', 'email', 'character_typed');
                 *
                 */
                trackUserAction: function trackUserAction(page, field, action, data, callback) {
                    this.trackUserFormAction({
                        category: page,
                        field: field,
                        action: action,
                        data: data
                    }, callback);
                },


                /**
                 *
                 * trackUserFormAction
                 *
                 * Used to track a user's action on a page.  Takes in three strings: a page identifier,
                 * a field identifier, and an action identifier.   Generates a segment TRACK event with
                 * these strings embedded as properties.   This event can then be used to feed a funnel
                 * in Amplitude.
                 *
                 * Optionally, a fourth parameter with free form extra data (e.g. an error message) can be passed.
                 *
                 * e.g. trackUserFormAction({
	     *     category: category, // required
	     *     name: subCategory,
	     *     title: title,
	     *     field: field,       // required
	     *     action: action,     // required
	     *     data: data
	     * });
                 *
                 */

                trackUserFormAction: function trackUserFormAction(fields, callback) {
                    if (!fields.category) {
                        console.error('analytics::trackUserAction - required parameter category undefined.'); // eslint-disable-line no-console
                        return;
                    }

                    if (!fields.field) {
                        console.error('analytics::trackUserAction - required parameter field undefined.'); // eslint-disable-line no-console
                        return;
                    }

                    if (!fields.action) {
                        console.error('analytics::trackUserAction - required parameter action undefined.'); // eslint-disable-line no-console
                        return;
                    }
                    // Call the segment track event
                    global.analytics.track('User Form', _extends({}, fields, {
                        url: window.location.href,
                        path: window.location.pathname
                    }), null, callback);
                },
                trackEvent: function trackEvent(event) {
                    var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                    (0, _identification.getAnonymousId)().then(function (wipi) {
                        var analyticProperties = _extends({}, properties, { wipi: wipi });
                        var userID = (0, _identification.getUserID)();
                        var analyticOptions = _extends({}, options);
                        if (userID) {
                            analyticOptions.userId = userID;
                        }
                        global.analytics.track(event, analyticProperties, analyticOptions, function () {
                                return console.log('Track Event: ' + event);
                            } // eslint-disable-line no-console
                        );
                    });
                }
            };
            /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

        /***/ },
    /* 5 */
    /***/ function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */(function(global) {'use strict';

            var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

            var _no_jquery = __webpack_require__(1);

            var _no_jquery2 = _interopRequireDefault(_no_jquery);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            // TODO: This will eventually be removed when there is a way to solve
            // some of the client configurations through webpack
            function getScriptHost() {
                return global._analytics.analyticsServiceUrl || 'https://console.ng.bluemix.net'; // eslint-disable-line no-underscore-dangle
            }

            function getBluemixUserID() {
                var user = void 0;

                if (global.header && global.header.accountStatus && global.header.accountStatus.userGuid) {
                    user = global.header.accountStatus.userGuid;
                }
                return user;
            }

            var cachedIUI = null;
            var anonymousIdPromise = null;
            module.exports = {
                getUserID: function getUserID() {
                    if (global.analytics_config && global.analytics_config.userID) {
                        return global.analytics_config.userID;
                    } else if (global.digitalData && global.digitalData.util && global.digitalData.util.cp && global.digitalData.util.cp.IBMISP) {
                        return global.digitalData.util.cp.IBMISP;
                    }
                    return null;
                },
                getWipi: function getWipi() {
                    console.warn('[DEPRICATED] getWipi() has been deprecated. Please use getAnonymousId() instead.'); // eslint-disable-line no-console
                    return this.getAnonymousId();
                },

                /**
                 * Gets the anonymousId for the browser. If one was already generated
                 * then it will exist in a cookie, otherwise a new one will be generated
                 * by the analytics microservice.
                 * @returns a promise that will resolve with an anonymousId or null if
                 * a new id was required, but failed to generate.
                 */
                getAnonymousId: function getAnonymousId() {
                    var url = getScriptHost() + '/analytics/bmaid';
                    var anonymousId = _no_jquery2.default.getCookie('BMAID');

                    // an anonymousId already exists in the cookie, return that
                    if (anonymousId) {
                        return Promise.resolve(anonymousId);
                    }

                    if (anonymousIdPromise) {
                        return anonymousIdPromise;
                    }
                    // otherwise, get a new anonymousId
                    anonymousIdPromise = new Promise(function (resolve) {
                        _no_jquery2.default.get(url).then(function (result) {
                            try {
                                var BMAID = result.BMAID;
                                // set the cookie (10 year expiry) on the current domain
                                _no_jquery2.default.setCookie('BMAID', BMAID, 365 * 10);
                                anonymousIdPromise = null;
                                resolve(BMAID);
                            } catch (e) {
                                console.log('Failed to retrieve anonymous Id ' + e); // eslint-disable-line no-console
                                resolve(null);
                            }
                        });
                    });
                    return anonymousIdPromise;
                },

                /**
                 * will check that account data is present in the global.header
                 *
                 * @returns {Promise}
                 */
                pollForHeaderAuthReady: function pollForHeaderAuthReady() {
                    return new Promise(function (resolve) {
                        var interval = setInterval(function () {
                            if (getBluemixUserID()) {
                                clearInterval(interval);
                                resolve(getBluemixUserID());
                            }
                        }, 500);
                    });
                },
                identify: function identify(userID) {
                    var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                    if (!userID) {
                        userID = this.getUserID(); // eslint-disable-line no-param-reassign
                    } else {
                        global.analytics_config.userID = userID;
                    }

                    this.getAnonymousId().then(function (wipi) {
                        global.analytics.identify(userID, _extends({}, properties, { wipi: wipi }));
                    });
                },

                /**
                 * get the IUI for the currently logged in user.
                 * @returns a promise that will resolve with an IUI or null if
                 * none was found.
                 */
                getIUI: function getIUI() {
                    if (cachedIUI) {
                        return Promise.resolve(cachedIUI);
                    }

                    var url = getScriptHost() + '/analytics/iui';
                    // there's no caching of the IUI in cookies or local storage

                    return new Promise(function (resolve, reject) {
                        _no_jquery2.default.get(url).then(function (result) {
                            try {
                                cachedIUI = result.iui;
                                resolve(cachedIUI);
                            } catch (e) {
                                cachedIUI = null;
                                console.log('Failed to retrieve an iui ' + e); // eslint-disable-line no-console
                                reject(e);
                            }
                        });
                    });
                },

                /**
                 * identifyWithIUI(properties={})
                 * performs a segment identify call using the IBM unique identifier(IUI) instead of the Cloud foundry id (cfid)
                 *
                 */
                identifyWithIUI: function identifyWithIUI() {
                    var _this = this;

                    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    this.getIUI().then(function (iui) {
                        if (iui) {
                            _this.getAnonymousId().then(function (anonymousId) {
                                global.analytics.identify(iui, _extends({}, properties, { anonymousId: anonymousId }));
                            });
                        } else {
                            console.log('Failed to perform identify. No IUI found'); // eslint-disable-line no-console
                        }
                    }).catch(function (e) {
                        console.log('Error when retrieving IUI: ' + e); // eslint-disable-line no-console
                    });
                }
            };
            /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

        /***/ },
    /* 6 */
    /***/ function(module, exports, __webpack_require__) {

        'use strict';

        var _campaignCodes = __webpack_require__(7);

        var _campaignCodes2 = _interopRequireDefault(_campaignCodes);

        var _identification = __webpack_require__(5);

        var _identification2 = _interopRequireDefault(_identification);

        var _pageEvents = __webpack_require__(8);

        var _pageEvents2 = _interopRequireDefault(_pageEvents);

        var _trackEvents = __webpack_require__(4);

        var _trackEvents2 = _interopRequireDefault(_trackEvents);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        module.exports = {
            campaigns: _campaignCodes2.default,
            identification: _identification2.default,
            pageEvents: _pageEvents2.default,
            trackEvents: _trackEvents2.default
        };

        /***/ },
    /* 7 */
    /***/ function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */(function(global) {'use strict';

            var _no_jquery = __webpack_require__(1);

            var _no_jquery2 = _interopRequireDefault(_no_jquery);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            // Campaign Storage - now in a cookie
            var campaignCookieName = 'bmCampaigns';

            // TODO: This will eventually be removed when there is a way to solve
            // some of the client configurations through webpack
            function getScriptHost() {
                return global._analytics.analyticsServiceUrl || 'https://console.ng.bluemix.net'; // eslint-disable-line no-underscore-dangle
            }

            function getQueryParameters() {
                var result = {};
                var location = global.location.href;
                var noAnchors = location.replace('#', '&');

                var hashes = noAnchors.slice(noAnchors.indexOf('?') + 1).split('&');
                for (var i = 0; i < hashes.length; i += 1) {
                    var hash = hashes[i].split('=');
                    var key = hash[0];
                    var value = hash[1];
                    result[key] = value;
                }
                return result;
            }

            /**
             * Parse JSON cookie string.
             *
             * @param {String} str
             * @return {Object} Parsed object or undefined if not json cookie
             * @public
             */
            function JSONCookie(str) {
                var formattedString = str;
                // trim off the j: in the string if it exists. It's added by express cookie-parser middleware
                if (str.substr(0, 2) === 'j:') {
                    formattedString = str.slice(2);
                }

                try {
                    return JSON.parse(formattedString);
                } catch (err) {
                    return null;
                }
            }

            /**
             * querystring encoding of a json object
             * see http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
             * @param obj
             * @returns {string}
             */
            function serialize(obj) {
                return Object.keys(obj).map(function (k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
                }).join('&');
            }

            module.exports = {

                /**
                 * Exposed for Marketing pages that send analytics with any campaigns detected
                 * on the url.
                 *
                 * @returns {{}}
                 */
                getCampaignFromUrl: function getCampaignFromUrl() {
                    var queryParams = getQueryParameters();
                    var campaign = {};
                    if (this.hasCampaign()) {
                        campaign.cm_mmc = queryParams.cm_mmc || null;
                        campaign.S_TACT = queryParams.cm_mmca1 || queryParams.S_TACT || null;
                        campaign.S_OFF_CD = queryParams.cm_mmca2 || queryParams.S_OFF_CD || null;
                        campaign.S_MAIL_CD = queryParams.cm_mmca3 || queryParams.S_MAIL_CD || null;
                        campaign.S_PKG = queryParams.S_PKG || null;
                        campaign.URL = global.location.href;
                    }
                    return campaign;
                },
                storeCampaign: function storeCampaign() {
                    var campaign = void 0;
                    if (this.hasCampaign()) {
                        campaign = this.getCampaignFromUrl();
                        // send the campaign to the micro service. Although the api is a GET request,
                        // the campaign data is sent as url parameters.
                        var scriptHost = getScriptHost();
                        _no_jquery2.default.get(scriptHost + '/analytics/campaigns?' + serialize(campaign));
                    }
                },

                /**
                 * Looks for the following campaign codes specified in the url: cm_mmc, S_TACT, S_OFF_CD, S_PKG, and S_MAIL_CD
                 * cm_mmca1, cm_mmca2, and cm_mmca3 are new parameters related to Unica 9.1 that also
                 * need to be checked for (see growth-analytics#62), but are actually replacements
                 * for S_TACT, S_OFF_CD, and S_MAIL_CD. The interface to BSS remains the same
                 * and will accept the new parameters via the existing interface.
                 *
                 * @returns true if campaign codes have been found in the url. false otherwise
                 */
                hasCampaign: function hasCampaign() {
                    var queryParams = getQueryParameters();
                    return !!(queryParams.cm_mmc || queryParams.cm_mmca1 || queryParams.cm_mmca2 || queryParams.cm_mmca3 || queryParams.S_PKG || queryParams.S_TACT || queryParams.S_OFF_CD || queryParams.S_MAIL_CD);
                },

                /**
                 * Returns an array of campaign codes that may already exist in cookies or null if there's none.
                 * Exposed for pages (like Registration) that wish to know all campaigns that have been encountered
                 * and stored.
                 *
                 * @returns an array of campaign codes, or null if none found
                 */
                getCampaign: function getCampaign() {
                    var data = _no_jquery2.default.getCookie(campaignCookieName);
                    var decodedData = decodeURIComponent(data);
                    return JSONCookie(decodedData); // eslint-disable-line new-cap
                },
                deleteCampaign: function deleteCampaign() {
                    _no_jquery2.default.deleteCookie(campaignCookieName);
                }
            };
            /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

        /***/ },
    /* 8 */
    /***/ function(module, exports, __webpack_require__) {

        /* WEBPACK VAR INJECTION */(function(global) {'use strict';

            var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

            var _campaignCodes = __webpack_require__(7);

            var _campaignCodes2 = _interopRequireDefault(_campaignCodes);

            var _identification = __webpack_require__(5);

            var _identification2 = _interopRequireDefault(_identification);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            // This will be expanded and generalized much more then it currently is
            module.exports = {
                /**
                 * pageEvent
                 *
                 * Send a page viewed event to segment. Details provided with the event include the wipi and
                 * any campaign codes. Amplitude is also updated with the wipi so an association can be made
                 * between segment and amplitude for any user.
                 *
                 * @param category
                 * @param name
                 * @param properties
                 * @param options
                 */
                pageEvent: function pageEvent(category) {
                    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : global.document.title;
                    var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

                    var campaignProperties = {};
                    if (_campaignCodes2.default.hasCampaign()) {
                        var campaign = _campaignCodes2.default.getCampaignFromUrl();
                        campaignProperties.cm_mmc = campaign.cm_mmc;
                        campaignProperties.S_TACT = campaign.S_TACT;
                        campaignProperties.S_OFF_CD = campaign.S_OFF_CD;
                        campaignProperties.S_MAIL_CD = campaign.S_MAIL_CD;
                        campaignProperties.S_PKG = campaign.S_PKG;
                    }

                    _identification2.default.getAnonymousId().then(function (wipi) {
                        var userID = _identification2.default.getUserID();
                        var analyticProperties = _extends({}, properties, campaignProperties, { wipi: wipi });
                        var analyticOptions = _extends({}, options);
                        if (userID) {
                            analyticOptions.userId = userID;
                        }

                        global.analytics.page(category, name, analyticProperties, analyticOptions, function () {
                            console.log('Page Event: ' + category + ', ' + name); // eslint-disable-line no-console
                        });
                    });
                }
            };
            /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

        /***/ }
    /******/ ]);
//# sourceMappingURL=blue_analytics.js.map
