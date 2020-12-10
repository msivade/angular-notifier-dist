(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-notifier', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['angular-notifier'] = {}, global.ng.core, global.rxjs, global.ng.common));
}(this, (function (exports, i0, rxjs, i4) { 'use strict';

    /**
     * Notification
     *
     * This class describes the structure of a notifiction, including all information it needs to live, and everyone else needs to work with it.
     */
    var NotifierNotification = /** @class */ (function () {
        /**
         * Constructor
         *
         * @param options Notifier options
         */
        function NotifierNotification(options) {
            /**
             * The template to customize
             * the appearance of the notification
             */
            this.template = null;
            Object.assign(this, options);
            // If not set manually, we have to create a unique notification ID by ourselves. The ID generation relies on the current browser
            // datetime in ms, in praticular the moment this notification gets constructed. Concurrency, and thus two IDs being the exact same,
            // is not possible due to the action queue concept.
            if (options.id === undefined) {
                this.id = "ID_" + new Date().getTime();
            }
        }
        return NotifierNotification;
    }());

    /**
     * Notifier queue service
     *
     * In general, API calls don't get processed right away. Instead, we have to queue them up in order to prevent simultanious API calls
     * interfering with each other. This, at least in theory, is possible at any time. In particular, animations - which potentially overlap -
     * can cause changes in JS classes as well as affect the DOM. Therefore, the queue service takes all actions, puts them in a queue, and
     * processes them at the right time (which is when the previous action has been processed successfully).
     *
     * Technical sidenote:
     * An action looks pretty similar to the ones within the Flux / Redux pattern.
     */
    var NotifierQueueService = /** @class */ (function () {
        /**
         * Constructor
         */
        function NotifierQueueService() {
            this.actionStream = new rxjs.Subject();
            this.actionQueue = [];
            this.isActionInProgress = false;
        }
        /**
         * Push a new action to the queue, and try to run it
         *
         * @param action Action object
         */
        NotifierQueueService.prototype.push = function (action) {
            this.actionQueue.push(action);
            this.tryToRunNextAction();
        };
        /**
         * Continue with the next action (called when the current action is finished)
         */
        NotifierQueueService.prototype.continue = function () {
            this.isActionInProgress = false;
            this.tryToRunNextAction();
        };
        /**
         * Try to run the next action in the queue; we skip if there already is some action in progress, or if there is no action left
         */
        NotifierQueueService.prototype.tryToRunNextAction = function () {
            if (this.isActionInProgress || this.actionQueue.length === 0) {
                return; // Skip (the queue can now go drink a coffee as it has nothing to do anymore)
            }
            this.isActionInProgress = true;
            this.actionStream.next(this.actionQueue.shift()); // Push next action to the stream, and remove the current action from the queue
        };
        return NotifierQueueService;
    }());
    /** @nocollapse */ NotifierQueueService.ɵfac = function NotifierQueueService_Factory(t) { return new (t || NotifierQueueService)(); };
    /** @nocollapse */ NotifierQueueService.ɵprov = i0.ɵɵdefineInjectable({ token: NotifierQueueService, factory: NotifierQueueService.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NotifierQueueService, [{
                type: i0.Injectable
            }], function () { return []; }, null);
    })();

    // tslint:disable variable-name
    /**
     * Injection Token for notifier options
     */
    var NotifierOptionsToken = new i0.InjectionToken('[angular-notifier] Notifier Options');
    /**
     * Injection Token for notifier configuration
     */
    var NotifierConfigToken = new i0.InjectionToken('[anuglar-notifier] Notifier Config');
    // tslint:enable variable-name

    /**
     * Notifier configuration
     *
     * The notifier configuration defines what notifications look like, how they behave, and how they get animated. It is a global
     * configuration, which means that it only can be set once (at the beginning), and cannot be changed afterwards. Aligning to the world of
     * Angular, this configuration can be provided in the root app module - alternatively, a meaningful default configuration will be used.
     */
    var NotifierConfig = /** @class */ (function () {
        /**
         * Constructor
         *
         * @param [customOptions={}] Custom notifier options, optional
         */
        function NotifierConfig(customOptions) {
            if (customOptions === void 0) { customOptions = {}; }
            // Set default values
            this.animations = {
                enabled: true,
                hide: {
                    easing: 'ease',
                    offset: 50,
                    preset: 'fade',
                    speed: 300
                },
                overlap: 150,
                shift: {
                    easing: 'ease',
                    speed: 300
                },
                show: {
                    easing: 'ease',
                    preset: 'slide',
                    speed: 300
                }
            };
            this.behaviour = {
                autoHide: 7000,
                onClick: false,
                onMouseover: 'pauseAutoHide',
                showDismissButton: true,
                stacking: 4
            };
            this.position = {
                horizontal: {
                    distance: 12,
                    position: 'left'
                },
                vertical: {
                    distance: 12,
                    gap: 10,
                    position: 'bottom'
                }
            };
            this.theme = 'material';
            // The following merges the custom options into the notifier config, respecting the already set default values
            // This linear, more explicit and code-sizy workflow is preferred here over a recursive one (because we know the object structure)
            // Technical sidenote: Objects are merged, other types of values simply overwritten / copied
            if (customOptions.theme !== undefined) {
                this.theme = customOptions.theme;
            }
            if (customOptions.animations !== undefined) {
                if (customOptions.animations.enabled !== undefined) {
                    this.animations.enabled = customOptions.animations.enabled;
                }
                if (customOptions.animations.overlap !== undefined) {
                    this.animations.overlap = customOptions.animations.overlap;
                }
                if (customOptions.animations.hide !== undefined) {
                    Object.assign(this.animations.hide, customOptions.animations.hide);
                }
                if (customOptions.animations.shift !== undefined) {
                    Object.assign(this.animations.shift, customOptions.animations.shift);
                }
                if (customOptions.animations.show !== undefined) {
                    Object.assign(this.animations.show, customOptions.animations.show);
                }
            }
            if (customOptions.behaviour !== undefined) {
                Object.assign(this.behaviour, customOptions.behaviour);
            }
            if (customOptions.position !== undefined) {
                if (customOptions.position.horizontal !== undefined) {
                    Object.assign(this.position.horizontal, customOptions.position.horizontal);
                }
                if (customOptions.position.vertical !== undefined) {
                    Object.assign(this.position.vertical, customOptions.position.vertical);
                }
            }
        }
        return NotifierConfig;
    }());

    /**
     * Notifier service
     *
     * This service provides access to the public notifier API. Once injected into a component, directive, pipe, service, or any other building
     * block of an applications, it can be used to show new notifications, and hide existing ones. Internally, it transforms API calls into
     * actions, which then get thrown into the action queue - eventually being processed at the right moment.
     */
    var NotifierService = /** @class */ (function () {
        /**
         * Constructor
         *
         * @param notifierQueueService Notifier queue service
         * @param config               Notifier configuration, optionally injected as a dependency
         */
        function NotifierService(notifierQueueService, config) {
            this.queueService = notifierQueueService;
            this.config = config;
        }
        /**
         * Get the notifier configuration
         *
         * @returns Notifier configuration
         */
        NotifierService.prototype.getConfig = function () {
            return this.config;
        };
        /**
         * API: Show a new notification
         *
         * @param notificationOptions Notification options
         */
        NotifierService.prototype.show = function (notificationOptions) {
            this.queueService.push({
                payload: notificationOptions,
                type: 'SHOW'
            });
        };
        /**
         * API: Hide a specific notification, given its ID
         *
         * @param notificationId ID of the notification to hide
         */
        NotifierService.prototype.hide = function (notificationId) {
            this.queueService.push({
                payload: notificationId,
                type: 'HIDE'
            });
        };
        /**
         * API: Hide the newest notification
         */
        NotifierService.prototype.hideNewest = function () {
            this.queueService.push({
                type: 'HIDE_NEWEST'
            });
        };
        /**
         * API: Hide the oldest notification
         */
        NotifierService.prototype.hideOldest = function () {
            this.queueService.push({
                type: 'HIDE_OLDEST'
            });
        };
        /**
         * API: Hide all notifications at once
         */
        NotifierService.prototype.hideAll = function () {
            this.queueService.push({
                type: 'HIDE_ALL'
            });
        };
        /**
         * API: Shortcut for showing a new notification
         *
         * @param type             Type of the notification
         * @param message          Message of the notification
         * @param [notificationId] Unique ID for the notification (optional)
         */
        NotifierService.prototype.notify = function (type, message, notificationId) {
            var notificationOptions = {
                message: message,
                type: type
            };
            if (notificationId !== undefined) {
                notificationOptions.id = notificationId;
            }
            this.show(notificationOptions);
        };
        return NotifierService;
    }());
    /** @nocollapse */ NotifierService.ɵfac = function NotifierService_Factory(t) { return new (t || NotifierService)(i0.ɵɵinject(NotifierQueueService), i0.ɵɵinject(NotifierConfigToken)); };
    /** @nocollapse */ NotifierService.ɵprov = i0.ɵɵdefineInjectable({ token: NotifierService, factory: NotifierService.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NotifierService, [{
                type: i0.Injectable
            }], function () {
            return [{ type: NotifierQueueService }, { type: NotifierConfig, decorators: [{
                            type: i0.Inject,
                            args: [NotifierConfigToken]
                        }] }];
        }, null);
    })();

    /**
     * Notifier timer service
     *
     * This service acts as a timer, needed due to the still rather limited setTimeout JavaScript API. The timer service can start and stop a
     * timer. Furthermore, it can also pause the timer at any time, and resume later on. The timer API workd promise-based.
     */
    var NotifierTimerService = /** @class */ (function () {
        /**
         * Constructor
         */
        function NotifierTimerService() {
            this.now = 0;
            this.remaining = 0;
        }
        /**
         * Start (or resume) the timer
         *
         * @param   duration Timer duration, in ms
         * @returns          Promise, resolved once the timer finishes
         */
        NotifierTimerService.prototype.start = function (duration) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // For the first run ...
                _this.remaining = duration;
                // Setup, then start the timer
                _this.finishPromiseResolver = resolve;
                _this.continue();
            });
        };
        /**
         * Pause the timer
         */
        NotifierTimerService.prototype.pause = function () {
            clearTimeout(this.timerId);
            this.remaining -= new Date().getTime() - this.now;
        };
        /**
         * Continue the timer
         */
        NotifierTimerService.prototype.continue = function () {
            var _this = this;
            this.now = new Date().getTime();
            this.timerId = window.setTimeout(function () {
                _this.finish();
            }, this.remaining);
        };
        /**
         * Stop the timer
         */
        NotifierTimerService.prototype.stop = function () {
            clearTimeout(this.timerId);
            this.remaining = 0;
        };
        /**
         * Finish up the timeout by resolving the timer promise
         */
        NotifierTimerService.prototype.finish = function () {
            this.finishPromiseResolver();
        };
        return NotifierTimerService;
    }());
    /** @nocollapse */ NotifierTimerService.ɵfac = function NotifierTimerService_Factory(t) { return new (t || NotifierTimerService)(); };
    /** @nocollapse */ NotifierTimerService.ɵprov = i0.ɵɵdefineInjectable({ token: NotifierTimerService, factory: NotifierTimerService.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NotifierTimerService, [{
                type: i0.Injectable
            }], function () { return []; }, null);
    })();

    /**
     * Fade animation preset
     */
    var fade = {
        hide: function () {
            return {
                from: {
                    opacity: '1'
                },
                to: {
                    opacity: '0'
                }
            };
        },
        show: function () {
            return {
                from: {
                    opacity: '0'
                },
                to: {
                    opacity: '1'
                }
            };
        }
    };

    /**
     * Slide animation preset
     */
    var slide = {
        hide: function (notification) {
            // Prepare variables
            var config = notification.component.getConfig();
            var shift = notification.component.getShift();
            var from;
            var to;
            // Configure variables, depending on configuration and component
            if (config.position.horizontal.position === 'left') {
                from = {
                    transform: "translate3d( 0, " + shift + "px, 0 )"
                };
                to = {
                    transform: "translate3d( calc( -100% - " + config.position.horizontal.distance + "px - 10px ), " + shift + "px, 0 )"
                };
            }
            else if (config.position.horizontal.position === 'right') {
                from = {
                    transform: "translate3d( 0, " + shift + "px, 0 )"
                };
                to = {
                    transform: "translate3d( calc( 100% + " + config.position.horizontal.distance + "px + 10px ), " + shift + "px, 0 )"
                };
            }
            else {
                var horizontalPosition = void 0;
                if (config.position.vertical.position === 'top') {
                    horizontalPosition = "calc( -100% - " + config.position.horizontal.distance + "px - 10px )";
                }
                else {
                    horizontalPosition = "calc( 100% + " + config.position.horizontal.distance + "px + 10px )";
                }
                from = {
                    transform: "translate3d( -50%, " + shift + "px, 0 )"
                };
                to = {
                    transform: "translate3d( -50%, " + horizontalPosition + ", 0 )"
                };
            }
            // Done
            return {
                from: from,
                to: to
            };
        },
        show: function (notification) {
            // Prepare variables
            var config = notification.component.getConfig();
            var from;
            var to;
            // Configure variables, depending on configuration and component
            if (config.position.horizontal.position === 'left') {
                from = {
                    transform: "translate3d( calc( -100% - " + config.position.horizontal.distance + "px - 10px ), 0, 0 )"
                };
                to = {
                    transform: 'translate3d( 0, 0, 0 )'
                };
            }
            else if (config.position.horizontal.position === 'right') {
                from = {
                    transform: "translate3d( calc( 100% + " + config.position.horizontal.distance + "px + 10px ), 0, 0 )"
                };
                to = {
                    transform: 'translate3d( 0, 0, 0 )'
                };
            }
            else {
                var horizontalPosition = void 0;
                if (config.position.vertical.position === 'top') {
                    horizontalPosition = "calc( -100% - " + config.position.horizontal.distance + "px - 10px )";
                }
                else {
                    horizontalPosition = "calc( 100% + " + config.position.horizontal.distance + "px + 10px )";
                }
                from = {
                    transform: "translate3d( -50%, " + horizontalPosition + ", 0 )"
                };
                to = {
                    transform: 'translate3d( -50%, 0, 0 )'
                };
            }
            // Done
            return {
                from: from,
                to: to
            };
        }
    };

    /**
     * Notifier animation service
     */
    var NotifierAnimationService = /** @class */ (function () {
        /**
         * Constructor
         */
        function NotifierAnimationService() {
            this.animationPresets = {
                fade: fade,
                slide: slide
            };
        }
        /**
         * Get animation data
         *
         * This method generates all data the Web Animations API needs to animate our notification. The result depends on both the animation
         * direction (either in or out) as well as the notifications (and its attributes) itself.
         *
         * @param   direction    Animation direction, either in or out
         * @param   notification Notification the animation data should be generated for
         * @returns Animation information
         */
        NotifierAnimationService.prototype.getAnimationData = function (direction, notification) {
            // Get all necessary animation data
            var keyframes;
            var duration;
            var easing;
            if (direction === 'show') {
                keyframes = this.animationPresets[notification.component.getConfig().animations.show.preset].show(notification);
                duration = notification.component.getConfig().animations.show.speed;
                easing = notification.component.getConfig().animations.show.easing;
            }
            else {
                keyframes = this.animationPresets[notification.component.getConfig().animations.hide.preset].hide(notification);
                duration = notification.component.getConfig().animations.hide.speed;
                easing = notification.component.getConfig().animations.hide.easing;
            }
            // Build and return animation data
            return {
                keyframes: [
                    keyframes.from,
                    keyframes.to
                ],
                options: {
                    duration: duration,
                    easing: easing,
                    fill: 'forwards' // Keep the newly painted state after the animation finished
                }
            };
        };
        return NotifierAnimationService;
    }());
    /** @nocollapse */ NotifierAnimationService.ɵfac = function NotifierAnimationService_Factory(t) { return new (t || NotifierAnimationService)(); };
    /** @nocollapse */ NotifierAnimationService.ɵprov = i0.ɵɵdefineInjectable({ token: NotifierAnimationService, factory: NotifierAnimationService.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NotifierAnimationService, [{
                type: i0.Injectable
            }], function () { return []; }, null);
    })();

    var _c0 = function (a0) { return { notification: a0 }; };
    function NotifierNotificationComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0, 2);
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r0.notification.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, ctx_r0.notification));
        }
    }
    function NotifierNotificationComponent_ng_template_1_button_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r5_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "button", 5);
            i0.ɵɵlistener("click", function NotifierNotificationComponent_ng_template_1_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5_1); var ctx_r4 = i0.ɵɵnextContext(2); return ctx_r4.onClickDismiss(); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(1, "svg", 6);
            i0.ɵɵelement(2, "path", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
    }
    function NotifierNotificationComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "p", 3);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(2, NotifierNotificationComponent_ng_template_1_button_2_Template, 3, 0, "button", 4);
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r2.notification.message);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r2.config.behaviour.showDismissButton);
        }
    }
    /**
     * Notifier notification component
     * -------------------------------
     * This component is responsible for actually displaying the notification on screen. In addition, it's able to show and hide this
     * notification, in particular to animate this notification in and out, as well as shift (move) this notification vertically around.
     * Furthermore, the notification component handles all interactions the user has with this notification / component, such as clicks and
     * mouse movements.
     */
    var NotifierNotificationComponent = /** @class */ (function () {
        /**
         * Constructor
         *
         * @param elementRef               Reference to the component's element
         * @param renderer                 Angular renderer
         * @param notifierService          Notifier service
         * @param notifierTimerService     Notifier timer service
         * @param notifierAnimationService Notifier animation service
         */
        function NotifierNotificationComponent(elementRef, renderer, notifierService, notifierTimerService, notifierAnimationService) {
            this.config = notifierService.getConfig();
            this.ready = new i0.EventEmitter();
            this.dismiss = new i0.EventEmitter();
            this.timerService = notifierTimerService;
            this.animationService = notifierAnimationService;
            this.renderer = renderer;
            this.element = elementRef.nativeElement;
            this.elementShift = 0;
        }
        /**
         * Component after view init lifecycle hook, setts up the component and then emits the ready event
         */
        NotifierNotificationComponent.prototype.ngAfterViewInit = function () {
            this.setup();
            this.elementHeight = this.element.offsetHeight;
            this.elementWidth = this.element.offsetWidth;
            this.ready.emit(this);
        };
        /**
         * Get the notifier config
         *
         * @returns Notifier configuration
         */
        NotifierNotificationComponent.prototype.getConfig = function () {
            return this.config;
        };
        /**
         * Get notification element height (in px)
         *
         * @returns Notification element height (in px)
         */
        NotifierNotificationComponent.prototype.getHeight = function () {
            return this.elementHeight;
        };
        /**
         * Get notification element width (in px)
         *
         * @returns Notification element height (in px)
         */
        NotifierNotificationComponent.prototype.getWidth = function () {
            return this.elementWidth;
        };
        /**
         * Get notification shift offset (in px)
         *
         * @returns Notification element shift offset (in px)
         */
        NotifierNotificationComponent.prototype.getShift = function () {
            return this.elementShift;
        };
        /**
         * Show (animate in) this notification
         *
         * @returns Promise, resolved when done
         */
        NotifierNotificationComponent.prototype.show = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // Are animations enabled?
                if (_this.config.animations.enabled && _this.config.animations.show.speed > 0) {
                    // Get animation data
                    var animationData = _this.animationService.getAnimationData('show', _this.notification);
                    // Set initial styles (styles before animation), prevents quick flicker when animation starts
                    var animatedProperties = Object.keys(animationData.keyframes[0]);
                    for (var i = animatedProperties.length - 1; i >= 0; i--) {
                        _this.renderer.setStyle(_this.element, animatedProperties[i], animationData.keyframes[0][animatedProperties[i]]);
                    }
                    // Animate notification in
                    _this.renderer.setStyle(_this.element, 'visibility', 'visible');
                    var animation = _this.element.animate(animationData.keyframes, animationData.options);
                    animation.onfinish = function () {
                        _this.startAutoHideTimer();
                        resolve(); // Done
                    };
                }
                else {
                    // Show notification
                    _this.renderer.setStyle(_this.element, 'visibility', 'visible');
                    _this.startAutoHideTimer();
                    resolve(); // Done
                }
            });
        };
        /**
         * Hide (animate out) this notification
         *
         * @returns Promise, resolved when done
         */
        NotifierNotificationComponent.prototype.hide = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.stopAutoHideTimer();
                // Are animations enabled?
                if (_this.config.animations.enabled && _this.config.animations.hide.speed > 0) {
                    var animationData = _this.animationService.getAnimationData('hide', _this.notification);
                    var animation = _this.element.animate(animationData.keyframes, animationData.options);
                    animation.onfinish = function () {
                        resolve(); // Done
                    };
                }
                else {
                    resolve(); // Done
                }
            });
        };
        /**
         * Shift (move) this notification
         *
         * @param   distance         Distance to shift (in px)
         * @param   shiftToMakePlace Flag, defining in which direction to shift
         * @returns Promise, resolved when done
         */
        NotifierNotificationComponent.prototype.shift = function (distance, shiftToMakePlace) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // Calculate new position (position after the shift)
                var newElementShift;
                if ((_this.config.position.vertical.position === 'top' && shiftToMakePlace)
                    || (_this.config.position.vertical.position === 'bottom' && !shiftToMakePlace)) {
                    newElementShift = _this.elementShift + distance + _this.config.position.vertical.gap;
                }
                else {
                    newElementShift = _this.elementShift - distance - _this.config.position.vertical.gap;
                }
                var horizontalPosition = _this.config.position.horizontal.position === 'middle' ? '-50%' : '0';
                // Are animations enabled?
                if (_this.config.animations.enabled && _this.config.animations.shift.speed > 0) {
                    var animationData = {
                        keyframes: [
                            {
                                transform: "translate3d( " + horizontalPosition + ", " + _this.elementShift + "px, 0 )"
                            },
                            {
                                transform: "translate3d( " + horizontalPosition + ", " + newElementShift + "px, 0 )"
                            }
                        ],
                        options: {
                            duration: _this.config.animations.shift.speed,
                            easing: _this.config.animations.shift.easing,
                            fill: 'forwards'
                        }
                    };
                    _this.elementShift = newElementShift;
                    var animation = _this.element.animate(animationData.keyframes, animationData.options);
                    animation.onfinish = function () {
                        resolve(); // Done
                    };
                }
                else {
                    _this.renderer.setStyle(_this.element, 'transform', "translate3d( " + horizontalPosition + ", " + newElementShift + "px, 0 )");
                    _this.elementShift = newElementShift;
                    resolve(); // Done
                }
            });
        };
        /**
         * Handle click on dismiss button
         */
        NotifierNotificationComponent.prototype.onClickDismiss = function () {
            this.dismiss.emit(this.notification.id);
        };
        /**
         * Handle mouseover over notification area
         */
        NotifierNotificationComponent.prototype.onNotificationMouseover = function () {
            if (this.config.behaviour.onMouseover === 'pauseAutoHide') {
                this.pauseAutoHideTimer();
            }
            else if (this.config.behaviour.onMouseover === 'resetAutoHide') {
                this.stopAutoHideTimer();
            }
        };
        /**
         * Handle mouseout from notification area
         */
        NotifierNotificationComponent.prototype.onNotificationMouseout = function () {
            if (this.config.behaviour.onMouseover === 'pauseAutoHide') {
                this.continueAutoHideTimer();
            }
            else if (this.config.behaviour.onMouseover === 'resetAutoHide') {
                this.startAutoHideTimer();
            }
        };
        /**
         * Handle click on notification area
         */
        NotifierNotificationComponent.prototype.onNotificationClick = function () {
            if (this.config.behaviour.onClick === 'hide') {
                this.onClickDismiss();
            }
        };
        /**
         * Start the auto hide timer (if enabled)
         */
        NotifierNotificationComponent.prototype.startAutoHideTimer = function () {
            var _this = this;
            if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
                this.timerService.start(this.config.behaviour.autoHide).then(function () {
                    _this.onClickDismiss();
                });
            }
        };
        /**
         * Pause the auto hide timer (if enabled)
         */
        NotifierNotificationComponent.prototype.pauseAutoHideTimer = function () {
            if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
                this.timerService.pause();
            }
        };
        /**
         * Continue the auto hide timer (if enabled)
         */
        NotifierNotificationComponent.prototype.continueAutoHideTimer = function () {
            if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
                this.timerService.continue();
            }
        };
        /**
         * Stop the auto hide timer (if enabled)
         */
        NotifierNotificationComponent.prototype.stopAutoHideTimer = function () {
            if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
                this.timerService.stop();
            }
        };
        /**
         * Initial notification setup
         */
        NotifierNotificationComponent.prototype.setup = function () {
            // Set start position (initially the exact same for every new notification)
            if (this.config.position.horizontal.position === 'left') {
                this.renderer.setStyle(this.element, 'left', this.config.position.horizontal.distance + "px");
            }
            else if (this.config.position.horizontal.position === 'right') {
                this.renderer.setStyle(this.element, 'right', this.config.position.horizontal.distance + "px");
            }
            else {
                this.renderer.setStyle(this.element, 'left', '50%');
                // Let's get the GPU handle some work as well (#perfmatters)
                this.renderer.setStyle(this.element, 'transform', 'translate3d( -50%, 0, 0 )');
            }
            if (this.config.position.vertical.position === 'top') {
                this.renderer.setStyle(this.element, 'top', this.config.position.vertical.distance + "px");
            }
            else {
                this.renderer.setStyle(this.element, 'bottom', this.config.position.vertical.distance + "px");
            }
            // Add classes (responsible for visual design)
            this.renderer.addClass(this.element, "notifier__notification--" + this.notification.type);
            this.renderer.addClass(this.element, "notifier__notification--" + this.config.theme);
        };
        return NotifierNotificationComponent;
    }());
    /** @nocollapse */ NotifierNotificationComponent.ɵfac = function NotifierNotificationComponent_Factory(t) { return new (t || NotifierNotificationComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(NotifierService), i0.ɵɵdirectiveInject(NotifierTimerService), i0.ɵɵdirectiveInject(NotifierAnimationService)); };
    /** @nocollapse */ NotifierNotificationComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NotifierNotificationComponent, selectors: [["notifier-notification"]], hostAttrs: [1, "notifier__notification"], hostBindings: function NotifierNotificationComponent_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function NotifierNotificationComponent_click_HostBindingHandler() { return ctx.onNotificationClick(); })("mouseout", function NotifierNotificationComponent_mouseout_HostBindingHandler() { return ctx.onNotificationMouseout(); })("mouseover", function NotifierNotificationComponent_mouseover_HostBindingHandler() { return ctx.onNotificationMouseover(); });
            }
        }, inputs: { notification: "notification" }, outputs: { ready: "ready", dismiss: "dismiss" }, features: [i0.ɵɵProvidersFeature([
                // We provide the timer to the component's local injector, so that every notification components gets its own
                // instance of the timer service, thus running their timers independently from each other
                NotifierTimerService
            ])], decls: 3, vars: 2, consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf", "ngIfElse"], ["predefinedNotification", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "notifier__notification-message"], ["class", "notifier__notification-button", "type", "button", "title", "dismiss", 3, "click", 4, "ngIf"], ["type", "button", "title", "dismiss", 1, "notifier__notification-button", 3, "click"], ["viewBox", "0 0 24 24", "width", "20", "height", "20", 1, "notifier__notification-button-icon"], ["d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"]], template: function NotifierNotificationComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, NotifierNotificationComponent_ng_container_0_Template, 1, 4, "ng-container", 0);
                i0.ɵɵtemplate(1, NotifierNotificationComponent_ng_template_1_Template, 3, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            }
            if (rf & 2) {
                var _r1 = i0.ɵɵreference(2);
                i0.ɵɵproperty("ngIf", ctx.notification.template)("ngIfElse", _r1);
            }
        }, directives: [i4.NgIf, i4.NgTemplateOutlet], encapsulation: 2, changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NotifierNotificationComponent, [{
                type: i0.Component,
                args: [{
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        host: {
                            '(click)': 'onNotificationClick()',
                            '(mouseout)': 'onNotificationMouseout()',
                            '(mouseover)': 'onNotificationMouseover()',
                            class: 'notifier__notification'
                        },
                        providers: [
                            // We provide the timer to the component's local injector, so that every notification components gets its own
                            // instance of the timer service, thus running their timers independently from each other
                            NotifierTimerService
                        ],
                        selector: 'notifier-notification',
                        templateUrl: './notifier-notification.component.html'
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: NotifierService }, { type: NotifierTimerService }, { type: NotifierAnimationService }]; }, { notification: [{
                    type: i0.Input
                }], ready: [{
                    type: i0.Output
                }], dismiss: [{
                    type: i0.Output
                }] });
    })();

    function NotifierContainerComponent_li_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "li", 1);
            i0.ɵɵelementStart(1, "notifier-notification", 2);
            i0.ɵɵlistener("ready", function NotifierContainerComponent_li_1_Template_notifier_notification_ready_1_listener($event) { i0.ɵɵrestoreView(_r3_1); var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.onNotificationReady($event); })("dismiss", function NotifierContainerComponent_li_1_Template_notifier_notification_dismiss_1_listener($event) { i0.ɵɵrestoreView(_r3_1); var ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.onNotificationDismiss($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var notification_r1 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("notification", notification_r1);
        }
    }
    /**
     * Notifier container component
     * ----------------------------
     * This component acts as a wrapper for all notification components; consequently, it is responsible for creating a new notification
     * component and removing an existing notification component. Being more precicely, it also handles side effects of those actions, such as
     * shifting or even completely removing other notifications as well. Overall, this components handles actions coming from the queue service
     * by subscribing to its action stream.
     *
     * Technical sidenote:
     * This component has to be used somewhere in an application to work; it will not inject and create itself automatically, primarily in order
     * to not break the Angular AoT compilation. Moreover, this component (and also the notification components) set their change detection
     * strategy onPush, which means that we handle change detection manually in order to get the best performance. (#perfmatters)
     */
    var NotifierContainerComponent = /** @class */ (function () {
        /**
         * Constructor
         *
         * @param changeDetector       Change detector, used for manually triggering change detection runs
         * @param notifierQueueService Notifier queue service
         * @param notifierService      Notifier service
         */
        function NotifierContainerComponent(changeDetector, notifierQueueService, notifierService) {
            var _this = this;
            this.changeDetector = changeDetector;
            this.queueService = notifierQueueService;
            this.config = notifierService.getConfig();
            this.notifications = [];
            // Connects this component up to the action queue, then handle incoming actions
            this.queueServiceSubscription = this.queueService.actionStream.subscribe(function (action) {
                _this.handleAction(action).then(function () {
                    _this.queueService.continue();
                });
            });
        }
        /**
         * Component destroyment lifecycle hook, cleans up the observable subsciption
         */
        NotifierContainerComponent.prototype.ngOnDestroy = function () {
            if (this.queueServiceSubscription) {
                this.queueServiceSubscription.unsubscribe();
            }
        };
        /**
         * Notification identifier, used as the ngFor trackby function
         *
         * @param   index        Index
         * @param   notification Notifier notification
         * @returns Notification ID as the unique identnfier
         */
        NotifierContainerComponent.prototype.identifyNotification = function (index, notification) {
            return notification.id;
        };
        /**
         * Event handler, handles clicks on notification dismiss buttons
         *
         * @param notificationId ID of the notification to dismiss
         */
        NotifierContainerComponent.prototype.onNotificationDismiss = function (notificationId) {
            this.queueService.push({
                payload: notificationId,
                type: 'HIDE'
            });
        };
        /**
         * Event handler, handles notification ready events
         *
         * @param notificationComponent Notification component reference
         */
        NotifierContainerComponent.prototype.onNotificationReady = function (notificationComponent) {
            var currentNotification = this.notifications[this.notifications.length - 1]; // Get the latest notification
            currentNotification.component = notificationComponent; // Save the new omponent reference
            this.continueHandleShowAction(currentNotification); // Continue with handling the show action
        };
        /**
         * Handle incoming actions by mapping action types to methods, and then running them
         *
         * @param   action Action object
         * @returns Promise, resolved when done
         */
        NotifierContainerComponent.prototype.handleAction = function (action) {
            switch (action.type) { // TODO: Maybe a map (actionType -> class method) is a cleaner solution here?
                case 'SHOW':
                    return this.handleShowAction(action);
                case 'HIDE':
                    return this.handleHideAction(action);
                case 'HIDE_OLDEST':
                    return this.handleHideOldestAction(action);
                case 'HIDE_NEWEST':
                    return this.handleHideNewestAction(action);
                case 'HIDE_ALL':
                    return this.handleHideAllAction(action);
                default:
                    return new Promise(function (resolve, reject) {
                        resolve(); // Ignore unknown action types
                    });
            }
        };
        /**
         * Show a new notification
         *
         * We simply add the notification to the list, and then wait until its properly initialized / created / rendered.
         *
         * @param   action Action object
         * @returns Promise, resolved when done
         */
        NotifierContainerComponent.prototype.handleShowAction = function (action) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.tempPromiseResolver = resolve; // Save the promise resolve function so that it can be called later on by another method
                _this.addNotificationToList(new NotifierNotification(action.payload));
            });
        };
        /**
         * Continue to show a new notification (after the notification components is initialized / created / rendered).
         *
         * If this is the first (and thus only) notification, we can simply show it. Otherwhise, if stacking is disabled (or a low value), we
         * switch out notifications, in particular we hide the existing one, and then show our new one. Yet, if stacking is enabled, we first
         * shift all older notifications, and then show our new notification. In addition, if there are too many notification on the screen,
         * we hide the oldest one first. Furthermore, if configured, animation overlapping is applied.
         *
         * @param notification New notification to show
         */
        NotifierContainerComponent.prototype.continueHandleShowAction = function (notification) {
            var _this = this;
            // First (which means only one) notification in the list?
            var numberOfNotifications = this.notifications.length;
            if (numberOfNotifications === 1) {
                notification.component.show().then(this.tempPromiseResolver); // Done
            }
            else {
                var implicitStackingLimit = 2;
                // Stacking enabled? (stacking value below 2 means stacking is disabled)
                if (this.config.behaviour.stacking === false || this.config.behaviour.stacking < implicitStackingLimit) {
                    this.notifications[0].component.hide().then(function () {
                        _this.removeNotificationFromList(_this.notifications[0]);
                        notification.component.show().then(_this.tempPromiseResolver); // Done
                    });
                }
                else {
                    var stepPromises_1 = [];
                    // Are there now too many notifications?
                    if (numberOfNotifications > this.config.behaviour.stacking) {
                        var oldNotifications_1 = this.notifications.slice(1, numberOfNotifications - 1);
                        // Are animations enabled?
                        if (this.config.animations.enabled) {
                            // Is animation overlap enabled?
                            if (this.config.animations.overlap !== false && this.config.animations.overlap > 0) {
                                stepPromises_1.push(this.notifications[0].component.hide());
                                setTimeout(function () {
                                    stepPromises_1.push(_this.shiftNotifications(oldNotifications_1, notification.component.getHeight(), true));
                                }, this.config.animations.hide.speed - this.config.animations.overlap);
                                setTimeout(function () {
                                    stepPromises_1.push(notification.component.show());
                                }, this.config.animations.hide.speed + this.config.animations.shift.speed - this.config.animations.overlap);
                            }
                            else {
                                stepPromises_1.push(new Promise(function (resolve, reject) {
                                    _this.notifications[0].component.hide().then(function () {
                                        _this.shiftNotifications(oldNotifications_1, notification.component.getHeight(), true).then(function () {
                                            notification.component.show().then(resolve);
                                        });
                                    });
                                }));
                            }
                        }
                        else {
                            stepPromises_1.push(this.notifications[0].component.hide());
                            stepPromises_1.push(this.shiftNotifications(oldNotifications_1, notification.component.getHeight(), true));
                            stepPromises_1.push(notification.component.show());
                        }
                    }
                    else {
                        var oldNotifications_2 = this.notifications.slice(0, numberOfNotifications - 1);
                        // Are animations enabled?
                        if (this.config.animations.enabled) {
                            // Is animation overlap enabled?
                            if (this.config.animations.overlap !== false && this.config.animations.overlap > 0) {
                                stepPromises_1.push(this.shiftNotifications(oldNotifications_2, notification.component.getHeight(), true));
                                setTimeout(function () {
                                    stepPromises_1.push(notification.component.show());
                                }, this.config.animations.shift.speed - this.config.animations.overlap);
                            }
                            else {
                                stepPromises_1.push(new Promise(function (resolve, reject) {
                                    _this.shiftNotifications(oldNotifications_2, notification.component.getHeight(), true).then(function () {
                                        notification.component.show().then(resolve);
                                    });
                                }));
                            }
                        }
                        else {
                            stepPromises_1.push(this.shiftNotifications(oldNotifications_2, notification.component.getHeight(), true));
                            stepPromises_1.push(notification.component.show());
                        }
                    }
                    Promise.all(stepPromises_1).then(function () {
                        if (numberOfNotifications > _this.config.behaviour.stacking) {
                            _this.removeNotificationFromList(_this.notifications[0]);
                        }
                        _this.tempPromiseResolver();
                    }); // Done
                }
            }
        };
        /**
         * Hide an existing notification
         *
         * Fist, we skip everything if there are no notifications at all, or the given notification does not exist. Then, we hide the given
         * notification. If there exist older notifications, we then shift them around to fill the gap. Once both hiding the given notification
         * and shifting the older notificaitons is done, the given notification gets finally removed (from the DOM).
         *
         * @param   action Action object, payload contains the notification ID
         * @returns Promise, resolved when done
         */
        NotifierContainerComponent.prototype.handleHideAction = function (action) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var stepPromises = [];
                // Does the notification exist / are there even any notifications? (let's prevent accidential errors)
                var notification = _this.findNotificationById(action.payload);
                if (notification === undefined) {
                    resolve();
                    return;
                }
                // Get older notifications
                var notificationIndex = _this.findNotificationIndexById(action.payload);
                if (notificationIndex === undefined) {
                    resolve();
                    return;
                }
                var oldNotifications = _this.notifications.slice(0, notificationIndex);
                // Do older notifications exist, and thus do we need to shift other notifications as a consequence?
                if (oldNotifications.length > 0) {
                    // Are animations enabled?
                    if (_this.config.animations.enabled && _this.config.animations.hide.speed > 0) {
                        // Is animation overlap enabled?
                        if (_this.config.animations.overlap !== false && _this.config.animations.overlap > 0) {
                            stepPromises.push(notification.component.hide());
                            setTimeout(function () {
                                stepPromises.push(_this.shiftNotifications(oldNotifications, notification.component.getHeight(), false));
                            }, _this.config.animations.hide.speed - _this.config.animations.overlap);
                        }
                        else {
                            notification.component.hide().then(function () {
                                stepPromises.push(_this.shiftNotifications(oldNotifications, notification.component.getHeight(), false));
                            });
                        }
                    }
                    else {
                        stepPromises.push(notification.component.hide());
                        stepPromises.push(_this.shiftNotifications(oldNotifications, notification.component.getHeight(), false));
                    }
                }
                else {
                    stepPromises.push(notification.component.hide());
                }
                // Wait until both hiding and shifting is done, then remove the notification from the list
                Promise.all(stepPromises).then(function () {
                    _this.removeNotificationFromList(notification);
                    resolve(); // Done
                });
            });
        };
        /**
         * Hide the oldest notification (bridge to handleHideAction)
         *
         * @param   action Action object
         * @returns Promise, resolved when done
         */
        NotifierContainerComponent.prototype.handleHideOldestAction = function (action) {
            // Are there any notifications? (prevent accidential errors)
            if (this.notifications.length === 0) {
                return new Promise(function (resolve, reject) {
                    resolve();
                }); // Done
            }
            else {
                action.payload = this.notifications[0].id;
                return this.handleHideAction(action);
            }
        };
        /**
         * Hide the newest notification (bridge to handleHideAction)
         *
         * @param   action Action object
         * @returns Promise, resolved when done
         */
        NotifierContainerComponent.prototype.handleHideNewestAction = function (action) {
            // Are there any notifications? (prevent accidential errors)
            if (this.notifications.length === 0) {
                return new Promise(function (resolve, reject) {
                    resolve();
                }); // Done
            }
            else {
                action.payload = this.notifications[this.notifications.length - 1].id;
                return this.handleHideAction(action);
            }
        };
        /**
         * Hide all notifications at once
         *
         * @param   action Action object
         * @returns Promise, resolved when done
         */
        NotifierContainerComponent.prototype.handleHideAllAction = function (action) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // Are there any notifications? (prevent accidential errors)
                var numberOfNotifications = _this.notifications.length;
                if (numberOfNotifications === 0) {
                    resolve(); // Done
                    return;
                }
                // Are animations enabled?
                if (_this.config.animations.enabled && _this.config.animations.hide.speed > 0 && _this.config.animations.hide.offset !== false &&
                    _this.config.animations.hide.offset > 0) {
                    var _loop_1 = function (i) {
                        var animationOffset = _this.config.position.vertical.position === 'top' ? numberOfNotifications - 1 : i;
                        setTimeout(function () {
                            _this.notifications[i].component.hide().then(function () {
                                // Are we done here, was this the last notification to be hidden?
                                if ((_this.config.position.vertical.position === 'top' && i === 0) ||
                                    (_this.config.position.vertical.position === 'bottom' && i === numberOfNotifications - 1)) {
                                    _this.removeAllNotificationsFromList();
                                    resolve(); // Done
                                }
                            });
                        }, _this.config.animations.hide.offset * animationOffset);
                    };
                    for (var i = numberOfNotifications - 1; i >= 0; i--) {
                        _loop_1(i);
                    }
                }
                else {
                    var stepPromises = [];
                    for (var i = numberOfNotifications - 1; i >= 0; i--) {
                        stepPromises.push(_this.notifications[i].component.hide());
                    }
                    Promise.all(stepPromises).then(function () {
                        _this.removeAllNotificationsFromList();
                        resolve(); // Done
                    });
                }
            });
        };
        /**
         * Shift multiple notifications at once
         *
         * @param   notifications List containing the notifications to be shifted
         * @param   distance      Distance to shift (in px)
         * @param   toMakePlace   Flag, defining in which direciton to shift
         * @returns Promise, resolved when done
         */
        NotifierContainerComponent.prototype.shiftNotifications = function (notifications, distance, toMakePlace) {
            return new Promise(function (resolve, reject) {
                // Are there any notifications to shift?
                if (notifications.length === 0) {
                    resolve();
                    return;
                }
                var notificationPromises = [];
                for (var i = notifications.length - 1; i >= 0; i--) {
                    notificationPromises.push(notifications[i].component.shift(distance, toMakePlace));
                }
                Promise.all(notificationPromises).then(resolve); // Done
            });
        };
        /**
         * Add a new notification to the list of notifications (triggers change detection)
         *
         * @param notification Notification to add to the list of notifications
         */
        NotifierContainerComponent.prototype.addNotificationToList = function (notification) {
            this.notifications.push(notification);
            this.changeDetector.markForCheck(); // Run change detection because the notification list changed
        };
        /**
         * Remove an existing notification from the list of notifications (triggers change detection)
         *
         * @param notification Notification to be removed from the list of notifications
         */
        NotifierContainerComponent.prototype.removeNotificationFromList = function (notification) {
            this.notifications =
                this.notifications.filter(function (item) { return item.component !== notification.component; });
            this.changeDetector.markForCheck(); // Run change detection because the notification list changed
        };
        /**
         * Remove all notifications from the list (triggers change detection)
         */
        NotifierContainerComponent.prototype.removeAllNotificationsFromList = function () {
            this.notifications = [];
            this.changeDetector.markForCheck(); // Run change detection because the notification list changed
        };
        /**
         * Helper: Find a notification in the notification list by a given notification ID
         *
         * @param   notificationId Notification ID, used for finding notification
         * @returns Notification, undefined if not found
         */
        NotifierContainerComponent.prototype.findNotificationById = function (notificationId) {
            return this.notifications.find(function (currentNotification) { return currentNotification.id === notificationId; });
        };
        /**
         * Helper: Find a notification's index by a given notification ID
         *
         * @param   notificationId Notification ID, used for finding a notification's index
         * @returns Notification index, undefined if not found
         */
        NotifierContainerComponent.prototype.findNotificationIndexById = function (notificationId) {
            var notificationIndex = this.notifications.findIndex(function (currentNotification) { return currentNotification.id === notificationId; });
            return (notificationIndex !== -1 ? notificationIndex : undefined);
        };
        return NotifierContainerComponent;
    }());
    /** @nocollapse */ NotifierContainerComponent.ɵfac = function NotifierContainerComponent_Factory(t) { return new (t || NotifierContainerComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(NotifierQueueService), i0.ɵɵdirectiveInject(NotifierService)); };
    /** @nocollapse */ NotifierContainerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NotifierContainerComponent, selectors: [["notifier-container"]], hostAttrs: [1, "notifier__container"], decls: 2, vars: 2, consts: [["class", "notifier__container-list", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "notifier__container-list"], [3, "notification", "ready", "dismiss"]], template: function NotifierContainerComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "ul");
                i0.ɵɵtemplate(1, NotifierContainerComponent_li_1_Template, 2, 1, "li", 0);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.notifications)("ngForTrackBy", ctx.identifyNotification);
            }
        }, directives: [i4.NgForOf, NotifierNotificationComponent], encapsulation: 2, changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NotifierContainerComponent, [{
                type: i0.Component,
                args: [{
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        host: {
                            class: 'notifier__container'
                        },
                        selector: 'notifier-container',
                        templateUrl: './notifier-container.component.html'
                    }]
            }], function () { return [{ type: i0.ChangeDetectorRef }, { type: NotifierQueueService }, { type: NotifierService }]; }, null);
    })();

    /**
     * Factory for a notifier configuration with custom options
     *
     * Sidenote:
     * Required as Angular AoT compilation cannot handle dynamic functions; see <https://github.com/angular/angular/issues/11262>.
     *
     * @param   options - Custom notifier options
     * @returns - Notifier configuration as result
     */
    function notifierCustomConfigFactory(options) {
        return new NotifierConfig(options);
    }
    /**
     * Factory for a notifier configuration with default options
     *
     * Sidenote:
     * Required as Angular AoT compilation cannot handle dynamic functions; see <https://github.com/angular/angular/issues/11262>.
     *
     * @returns - Notifier configuration as result
     */
    function notifierDefaultConfigFactory() {
        return new NotifierConfig({});
    }
    /**
     * Notifier module
     */
    var NotifierModule = /** @class */ (function () {
        function NotifierModule() {
        }
        /**
         * Setup the notifier module with custom providers, in this case with a custom configuration based on the givne options
         *
         * @param   [options={}] - Custom notifier options
         * @returns - Notifier module with custom providers
         */
        NotifierModule.withConfig = function (options) {
            if (options === void 0) { options = {}; }
            return {
                ngModule: NotifierModule,
                providers: [
                    // Provide the options itself upfront (as we need to inject them as dependencies -- see below)
                    {
                        provide: NotifierOptionsToken,
                        useValue: options
                    },
                    // Provide a custom notifier configuration, based on the given notifier options
                    {
                        deps: [
                            NotifierOptionsToken
                        ],
                        provide: NotifierConfigToken,
                        useFactory: notifierCustomConfigFactory
                    }
                ]
            };
        };
        return NotifierModule;
    }());
    /** @nocollapse */ NotifierModule.ɵmod = i0.ɵɵdefineNgModule({ type: NotifierModule });
    /** @nocollapse */ NotifierModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NotifierModule_Factory(t) { return new (t || NotifierModule)(); }, providers: [
            NotifierAnimationService,
            NotifierService,
            NotifierQueueService,
            // Provide the default notifier configuration if just the module is imported
            {
                provide: NotifierConfigToken,
                useFactory: notifierDefaultConfigFactory
            }
        ], imports: [[
                i4.CommonModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NotifierModule, { declarations: [NotifierContainerComponent,
                NotifierNotificationComponent], imports: [i4.CommonModule], exports: [NotifierContainerComponent] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NotifierModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            NotifierContainerComponent,
                            NotifierNotificationComponent
                        ],
                        exports: [
                            NotifierContainerComponent
                        ],
                        imports: [
                            i4.CommonModule
                        ],
                        providers: [
                            NotifierAnimationService,
                            NotifierService,
                            NotifierQueueService,
                            // Provide the default notifier configuration if just the module is imported
                            {
                                provide: NotifierConfigToken,
                                useFactory: notifierDefaultConfigFactory
                            }
                        ]
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NotifierConfig = NotifierConfig;
    exports.NotifierConfigToken = NotifierConfigToken;
    exports.NotifierContainerComponent = NotifierContainerComponent;
    exports.NotifierModule = NotifierModule;
    exports.NotifierNotificationComponent = NotifierNotificationComponent;
    exports.NotifierOptionsToken = NotifierOptionsToken;
    exports.NotifierService = NotifierService;
    exports.notifierCustomConfigFactory = notifierCustomConfigFactory;
    exports.notifierDefaultConfigFactory = notifierDefaultConfigFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-notifier.umd.js.map
