import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, InjectionToken, ɵɵinject, Inject, ɵɵelementContainer, ɵɵnextContext, ɵɵproperty, ɵɵpureFunction1, ɵɵgetCurrentView, ɵɵelementStart, ɵɵlistener, ɵɵrestoreView, ɵɵnamespaceSVG, ɵɵelement, ɵɵelementEnd, ɵɵtext, ɵɵtemplate, ɵɵadvance, ɵɵtextInterpolate, EventEmitter, ɵɵdirectiveInject, ElementRef, Renderer2, ɵɵdefineComponent, ɵɵProvidersFeature, ɵɵtemplateRefExtractor, ɵɵreference, Component, ChangeDetectionStrategy, Input, Output, ChangeDetectorRef, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { NgIf, NgTemplateOutlet, NgForOf, CommonModule } from '@angular/common';

/**
 * Notification
 *
 * This class describes the structure of a notifiction, including all information it needs to live, and everyone else needs to work with it.
 */
class NotifierNotification {
    /**
     * Constructor
     *
     * @param options Notifier options
     */
    constructor(options) {
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
            this.id = `ID_${new Date().getTime()}`;
        }
    }
}

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
class NotifierQueueService {
    /**
     * Constructor
     */
    constructor() {
        this.actionStream = new Subject();
        this.actionQueue = [];
        this.isActionInProgress = false;
    }
    /**
     * Push a new action to the queue, and try to run it
     *
     * @param action Action object
     */
    push(action) {
        this.actionQueue.push(action);
        this.tryToRunNextAction();
    }
    /**
     * Continue with the next action (called when the current action is finished)
     */
    continue() {
        this.isActionInProgress = false;
        this.tryToRunNextAction();
    }
    /**
     * Try to run the next action in the queue; we skip if there already is some action in progress, or if there is no action left
     */
    tryToRunNextAction() {
        if (this.isActionInProgress || this.actionQueue.length === 0) {
            return; // Skip (the queue can now go drink a coffee as it has nothing to do anymore)
        }
        this.isActionInProgress = true;
        this.actionStream.next(this.actionQueue.shift()); // Push next action to the stream, and remove the current action from the queue
    }
}
/** @nocollapse */ NotifierQueueService.ɵfac = function NotifierQueueService_Factory(t) { return new (t || NotifierQueueService)(); };
/** @nocollapse */ NotifierQueueService.ɵprov = ɵɵdefineInjectable({ token: NotifierQueueService, factory: NotifierQueueService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NotifierQueueService, [{
        type: Injectable
    }], function () { return []; }, null); })();

// tslint:disable variable-name
/**
 * Injection Token for notifier options
 */
const NotifierOptionsToken = new InjectionToken('[angular-notifier] Notifier Options');
/**
 * Injection Token for notifier configuration
 */
const NotifierConfigToken = new InjectionToken('[anuglar-notifier] Notifier Config');
// tslint:enable variable-name

/**
 * Notifier configuration
 *
 * The notifier configuration defines what notifications look like, how they behave, and how they get animated. It is a global
 * configuration, which means that it only can be set once (at the beginning), and cannot be changed afterwards. Aligning to the world of
 * Angular, this configuration can be provided in the root app module - alternatively, a meaningful default configuration will be used.
 */
class NotifierConfig {
    /**
     * Constructor
     *
     * @param [customOptions={}] Custom notifier options, optional
     */
    constructor(customOptions = {}) {
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
}

/**
 * Notifier service
 *
 * This service provides access to the public notifier API. Once injected into a component, directive, pipe, service, or any other building
 * block of an applications, it can be used to show new notifications, and hide existing ones. Internally, it transforms API calls into
 * actions, which then get thrown into the action queue - eventually being processed at the right moment.
 */
class NotifierService {
    /**
     * Constructor
     *
     * @param notifierQueueService Notifier queue service
     * @param config               Notifier configuration, optionally injected as a dependency
     */
    constructor(notifierQueueService, config) {
        this.queueService = notifierQueueService;
        this.config = config;
    }
    /**
     * Get the notifier configuration
     *
     * @returns Notifier configuration
     */
    getConfig() {
        return this.config;
    }
    /**
     * API: Show a new notification
     *
     * @param notificationOptions Notification options
     */
    show(notificationOptions) {
        this.queueService.push({
            payload: notificationOptions,
            type: 'SHOW'
        });
    }
    /**
     * API: Hide a specific notification, given its ID
     *
     * @param notificationId ID of the notification to hide
     */
    hide(notificationId) {
        this.queueService.push({
            payload: notificationId,
            type: 'HIDE'
        });
    }
    /**
     * API: Hide the newest notification
     */
    hideNewest() {
        this.queueService.push({
            type: 'HIDE_NEWEST'
        });
    }
    /**
     * API: Hide the oldest notification
     */
    hideOldest() {
        this.queueService.push({
            type: 'HIDE_OLDEST'
        });
    }
    /**
     * API: Hide all notifications at once
     */
    hideAll() {
        this.queueService.push({
            type: 'HIDE_ALL'
        });
    }
    /**
     * API: Shortcut for showing a new notification
     *
     * @param type             Type of the notification
     * @param message          Message of the notification
     * @param [notificationId] Unique ID for the notification (optional)
     */
    notify(type, message, notificationId) {
        let notificationOptions = {
            message,
            type
        };
        if (notificationId !== undefined) {
            notificationOptions.id = notificationId;
        }
        this.show(notificationOptions);
    }
}
/** @nocollapse */ NotifierService.ɵfac = function NotifierService_Factory(t) { return new (t || NotifierService)(ɵɵinject(NotifierQueueService), ɵɵinject(NotifierConfigToken)); };
/** @nocollapse */ NotifierService.ɵprov = ɵɵdefineInjectable({ token: NotifierService, factory: NotifierService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NotifierService, [{
        type: Injectable
    }], function () { return [{ type: NotifierQueueService }, { type: NotifierConfig, decorators: [{
                type: Inject,
                args: [NotifierConfigToken]
            }] }]; }, null); })();

/**
 * Notifier timer service
 *
 * This service acts as a timer, needed due to the still rather limited setTimeout JavaScript API. The timer service can start and stop a
 * timer. Furthermore, it can also pause the timer at any time, and resume later on. The timer API workd promise-based.
 */
class NotifierTimerService {
    /**
     * Constructor
     */
    constructor() {
        this.now = 0;
        this.remaining = 0;
    }
    /**
     * Start (or resume) the timer
     *
     * @param   duration Timer duration, in ms
     * @returns          Promise, resolved once the timer finishes
     */
    start(duration) {
        return new Promise((resolve, reject) => {
            // For the first run ...
            this.remaining = duration;
            // Setup, then start the timer
            this.finishPromiseResolver = resolve;
            this.continue();
        });
    }
    /**
     * Pause the timer
     */
    pause() {
        clearTimeout(this.timerId);
        this.remaining -= new Date().getTime() - this.now;
    }
    /**
     * Continue the timer
     */
    continue() {
        this.now = new Date().getTime();
        this.timerId = window.setTimeout(() => {
            this.finish();
        }, this.remaining);
    }
    /**
     * Stop the timer
     */
    stop() {
        clearTimeout(this.timerId);
        this.remaining = 0;
    }
    /**
     * Finish up the timeout by resolving the timer promise
     */
    finish() {
        this.finishPromiseResolver();
    }
}
/** @nocollapse */ NotifierTimerService.ɵfac = function NotifierTimerService_Factory(t) { return new (t || NotifierTimerService)(); };
/** @nocollapse */ NotifierTimerService.ɵprov = ɵɵdefineInjectable({ token: NotifierTimerService, factory: NotifierTimerService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NotifierTimerService, [{
        type: Injectable
    }], function () { return []; }, null); })();

/**
 * Fade animation preset
 */
const fade = {
    hide: () => {
        return {
            from: {
                opacity: '1'
            },
            to: {
                opacity: '0'
            }
        };
    },
    show: () => {
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
const slide = {
    hide: (notification) => {
        // Prepare variables
        const config = notification.component.getConfig();
        const shift = notification.component.getShift();
        let from;
        let to;
        // Configure variables, depending on configuration and component
        if (config.position.horizontal.position === 'left') {
            from = {
                transform: `translate3d( 0, ${shift}px, 0 )`
            };
            to = {
                transform: `translate3d( calc( -100% - ${config.position.horizontal.distance}px - 10px ), ${shift}px, 0 )`
            };
        }
        else if (config.position.horizontal.position === 'right') {
            from = {
                transform: `translate3d( 0, ${shift}px, 0 )`
            };
            to = {
                transform: `translate3d( calc( 100% + ${config.position.horizontal.distance}px + 10px ), ${shift}px, 0 )`
            };
        }
        else {
            let horizontalPosition;
            if (config.position.vertical.position === 'top') {
                horizontalPosition = `calc( -100% - ${config.position.horizontal.distance}px - 10px )`;
            }
            else {
                horizontalPosition = `calc( 100% + ${config.position.horizontal.distance}px + 10px )`;
            }
            from = {
                transform: `translate3d( -50%, ${shift}px, 0 )`
            };
            to = {
                transform: `translate3d( -50%, ${horizontalPosition}, 0 )`
            };
        }
        // Done
        return {
            from,
            to
        };
    },
    show: (notification) => {
        // Prepare variables
        const config = notification.component.getConfig();
        let from;
        let to;
        // Configure variables, depending on configuration and component
        if (config.position.horizontal.position === 'left') {
            from = {
                transform: `translate3d( calc( -100% - ${config.position.horizontal.distance}px - 10px ), 0, 0 )`
            };
            to = {
                transform: 'translate3d( 0, 0, 0 )'
            };
        }
        else if (config.position.horizontal.position === 'right') {
            from = {
                transform: `translate3d( calc( 100% + ${config.position.horizontal.distance}px + 10px ), 0, 0 )`
            };
            to = {
                transform: 'translate3d( 0, 0, 0 )'
            };
        }
        else {
            let horizontalPosition;
            if (config.position.vertical.position === 'top') {
                horizontalPosition = `calc( -100% - ${config.position.horizontal.distance}px - 10px )`;
            }
            else {
                horizontalPosition = `calc( 100% + ${config.position.horizontal.distance}px + 10px )`;
            }
            from = {
                transform: `translate3d( -50%, ${horizontalPosition}, 0 )`
            };
            to = {
                transform: 'translate3d( -50%, 0, 0 )'
            };
        }
        // Done
        return {
            from,
            to
        };
    }
};

/**
 * Notifier animation service
 */
class NotifierAnimationService {
    /**
     * Constructor
     */
    constructor() {
        this.animationPresets = {
            fade,
            slide
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
    getAnimationData(direction, notification) {
        // Get all necessary animation data
        let keyframes;
        let duration;
        let easing;
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
                duration,
                easing,
                fill: 'forwards' // Keep the newly painted state after the animation finished
            }
        };
    }
}
/** @nocollapse */ NotifierAnimationService.ɵfac = function NotifierAnimationService_Factory(t) { return new (t || NotifierAnimationService)(); };
/** @nocollapse */ NotifierAnimationService.ɵprov = ɵɵdefineInjectable({ token: NotifierAnimationService, factory: NotifierAnimationService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NotifierAnimationService, [{
        type: Injectable
    }], function () { return []; }, null); })();

const _c0 = function (a0) { return { notification: a0 }; };
function NotifierNotificationComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0, 2);
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.notification.template)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, ctx_r0.notification));
} }
function NotifierNotificationComponent_ng_template_1_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 5);
    ɵɵlistener("click", function NotifierNotificationComponent_ng_template_1_button_2_Template_button_click_0_listener() { ɵɵrestoreView(_r5); const ctx_r4 = ɵɵnextContext(2); return ctx_r4.onClickDismiss(); });
    ɵɵnamespaceSVG();
    ɵɵelementStart(1, "svg", 6);
    ɵɵelement(2, "path", 7);
    ɵɵelementEnd();
    ɵɵelementEnd();
} }
function NotifierNotificationComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "p", 3);
    ɵɵtext(1);
    ɵɵelementEnd();
    ɵɵtemplate(2, NotifierNotificationComponent_ng_template_1_button_2_Template, 3, 0, "button", 4);
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r2.notification.message);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r2.config.behaviour.showDismissButton);
} }
/**
 * Notifier notification component
 * -------------------------------
 * This component is responsible for actually displaying the notification on screen. In addition, it's able to show and hide this
 * notification, in particular to animate this notification in and out, as well as shift (move) this notification vertically around.
 * Furthermore, the notification component handles all interactions the user has with this notification / component, such as clicks and
 * mouse movements.
 */
class NotifierNotificationComponent {
    /**
     * Constructor
     *
     * @param elementRef               Reference to the component's element
     * @param renderer                 Angular renderer
     * @param notifierService          Notifier service
     * @param notifierTimerService     Notifier timer service
     * @param notifierAnimationService Notifier animation service
     */
    constructor(elementRef, renderer, notifierService, notifierTimerService, notifierAnimationService) {
        this.config = notifierService.getConfig();
        this.ready = new EventEmitter();
        this.dismiss = new EventEmitter();
        this.timerService = notifierTimerService;
        this.animationService = notifierAnimationService;
        this.renderer = renderer;
        this.element = elementRef.nativeElement;
        this.elementShift = 0;
    }
    /**
     * Component after view init lifecycle hook, setts up the component and then emits the ready event
     */
    ngAfterViewInit() {
        this.setup();
        this.elementHeight = this.element.offsetHeight;
        this.elementWidth = this.element.offsetWidth;
        this.ready.emit(this);
    }
    /**
     * Get the notifier config
     *
     * @returns Notifier configuration
     */
    getConfig() {
        return this.config;
    }
    /**
     * Get notification element height (in px)
     *
     * @returns Notification element height (in px)
     */
    getHeight() {
        return this.elementHeight;
    }
    /**
     * Get notification element width (in px)
     *
     * @returns Notification element height (in px)
     */
    getWidth() {
        return this.elementWidth;
    }
    /**
     * Get notification shift offset (in px)
     *
     * @returns Notification element shift offset (in px)
     */
    getShift() {
        return this.elementShift;
    }
    /**
     * Show (animate in) this notification
     *
     * @returns Promise, resolved when done
     */
    show() {
        return new Promise((resolve, reject) => {
            // Are animations enabled?
            if (this.config.animations.enabled && this.config.animations.show.speed > 0) {
                // Get animation data
                const animationData = this.animationService.getAnimationData('show', this.notification);
                // Set initial styles (styles before animation), prevents quick flicker when animation starts
                const animatedProperties = Object.keys(animationData.keyframes[0]);
                for (let i = animatedProperties.length - 1; i >= 0; i--) {
                    this.renderer.setStyle(this.element, animatedProperties[i], animationData.keyframes[0][animatedProperties[i]]);
                }
                // Animate notification in
                this.renderer.setStyle(this.element, 'visibility', 'visible');
                const animation = this.element.animate(animationData.keyframes, animationData.options);
                animation.onfinish = () => {
                    this.startAutoHideTimer();
                    resolve(); // Done
                };
            }
            else {
                // Show notification
                this.renderer.setStyle(this.element, 'visibility', 'visible');
                this.startAutoHideTimer();
                resolve(); // Done
            }
        });
    }
    /**
     * Hide (animate out) this notification
     *
     * @returns Promise, resolved when done
     */
    hide() {
        return new Promise((resolve, reject) => {
            this.stopAutoHideTimer();
            // Are animations enabled?
            if (this.config.animations.enabled && this.config.animations.hide.speed > 0) {
                const animationData = this.animationService.getAnimationData('hide', this.notification);
                const animation = this.element.animate(animationData.keyframes, animationData.options);
                animation.onfinish = () => {
                    resolve(); // Done
                };
            }
            else {
                resolve(); // Done
            }
        });
    }
    /**
     * Shift (move) this notification
     *
     * @param   distance         Distance to shift (in px)
     * @param   shiftToMakePlace Flag, defining in which direction to shift
     * @returns Promise, resolved when done
     */
    shift(distance, shiftToMakePlace) {
        return new Promise((resolve, reject) => {
            // Calculate new position (position after the shift)
            let newElementShift;
            if ((this.config.position.vertical.position === 'top' && shiftToMakePlace)
                || (this.config.position.vertical.position === 'bottom' && !shiftToMakePlace)) {
                newElementShift = this.elementShift + distance + this.config.position.vertical.gap;
            }
            else {
                newElementShift = this.elementShift - distance - this.config.position.vertical.gap;
            }
            const horizontalPosition = this.config.position.horizontal.position === 'middle' ? '-50%' : '0';
            // Are animations enabled?
            if (this.config.animations.enabled && this.config.animations.shift.speed > 0) {
                const animationData = {
                    keyframes: [
                        {
                            transform: `translate3d( ${horizontalPosition}, ${this.elementShift}px, 0 )`
                        },
                        {
                            transform: `translate3d( ${horizontalPosition}, ${newElementShift}px, 0 )`
                        }
                    ],
                    options: {
                        duration: this.config.animations.shift.speed,
                        easing: this.config.animations.shift.easing,
                        fill: 'forwards'
                    }
                };
                this.elementShift = newElementShift;
                const animation = this.element.animate(animationData.keyframes, animationData.options);
                animation.onfinish = () => {
                    resolve(); // Done
                };
            }
            else {
                this.renderer.setStyle(this.element, 'transform', `translate3d( ${horizontalPosition}, ${newElementShift}px, 0 )`);
                this.elementShift = newElementShift;
                resolve(); // Done
            }
        });
    }
    /**
     * Handle click on dismiss button
     */
    onClickDismiss() {
        this.dismiss.emit(this.notification.id);
    }
    /**
     * Handle mouseover over notification area
     */
    onNotificationMouseover() {
        if (this.config.behaviour.onMouseover === 'pauseAutoHide') {
            this.pauseAutoHideTimer();
        }
        else if (this.config.behaviour.onMouseover === 'resetAutoHide') {
            this.stopAutoHideTimer();
        }
    }
    /**
     * Handle mouseout from notification area
     */
    onNotificationMouseout() {
        if (this.config.behaviour.onMouseover === 'pauseAutoHide') {
            this.continueAutoHideTimer();
        }
        else if (this.config.behaviour.onMouseover === 'resetAutoHide') {
            this.startAutoHideTimer();
        }
    }
    /**
     * Handle click on notification area
     */
    onNotificationClick() {
        if (this.config.behaviour.onClick === 'hide') {
            this.onClickDismiss();
        }
    }
    /**
     * Start the auto hide timer (if enabled)
     */
    startAutoHideTimer() {
        if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
            this.timerService.start(this.config.behaviour.autoHide).then(() => {
                this.onClickDismiss();
            });
        }
    }
    /**
     * Pause the auto hide timer (if enabled)
     */
    pauseAutoHideTimer() {
        if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
            this.timerService.pause();
        }
    }
    /**
     * Continue the auto hide timer (if enabled)
     */
    continueAutoHideTimer() {
        if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
            this.timerService.continue();
        }
    }
    /**
     * Stop the auto hide timer (if enabled)
     */
    stopAutoHideTimer() {
        if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
            this.timerService.stop();
        }
    }
    /**
     * Initial notification setup
     */
    setup() {
        // Set start position (initially the exact same for every new notification)
        if (this.config.position.horizontal.position === 'left') {
            this.renderer.setStyle(this.element, 'left', `${this.config.position.horizontal.distance}px`);
        }
        else if (this.config.position.horizontal.position === 'right') {
            this.renderer.setStyle(this.element, 'right', `${this.config.position.horizontal.distance}px`);
        }
        else {
            this.renderer.setStyle(this.element, 'left', '50%');
            // Let's get the GPU handle some work as well (#perfmatters)
            this.renderer.setStyle(this.element, 'transform', 'translate3d( -50%, 0, 0 )');
        }
        if (this.config.position.vertical.position === 'top') {
            this.renderer.setStyle(this.element, 'top', `${this.config.position.vertical.distance}px`);
        }
        else {
            this.renderer.setStyle(this.element, 'bottom', `${this.config.position.vertical.distance}px`);
        }
        // Add classes (responsible for visual design)
        this.renderer.addClass(this.element, `notifier__notification--${this.notification.type}`);
        this.renderer.addClass(this.element, `notifier__notification--${this.config.theme}`);
    }
}
/** @nocollapse */ NotifierNotificationComponent.ɵfac = function NotifierNotificationComponent_Factory(t) { return new (t || NotifierNotificationComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NotifierService), ɵɵdirectiveInject(NotifierTimerService), ɵɵdirectiveInject(NotifierAnimationService)); };
/** @nocollapse */ NotifierNotificationComponent.ɵcmp = ɵɵdefineComponent({ type: NotifierNotificationComponent, selectors: [["notifier-notification"]], hostAttrs: [1, "notifier__notification"], hostBindings: function NotifierNotificationComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function NotifierNotificationComponent_click_HostBindingHandler() { return ctx.onNotificationClick(); })("mouseout", function NotifierNotificationComponent_mouseout_HostBindingHandler() { return ctx.onNotificationMouseout(); })("mouseover", function NotifierNotificationComponent_mouseover_HostBindingHandler() { return ctx.onNotificationMouseover(); });
    } }, inputs: { notification: "notification" }, outputs: { ready: "ready", dismiss: "dismiss" }, features: [ɵɵProvidersFeature([
            // We provide the timer to the component's local injector, so that every notification components gets its own
            // instance of the timer service, thus running their timers independently from each other
            NotifierTimerService
        ])], decls: 3, vars: 2, consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf", "ngIfElse"], ["predefinedNotification", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "notifier__notification-message"], ["class", "notifier__notification-button", "type", "button", "title", "dismiss", 3, "click", 4, "ngIf"], ["type", "button", "title", "dismiss", 1, "notifier__notification-button", 3, "click"], ["viewBox", "0 0 24 24", "width", "20", "height", "20", 1, "notifier__notification-button-icon"], ["d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"]], template: function NotifierNotificationComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, NotifierNotificationComponent_ng_container_0_Template, 1, 4, "ng-container", 0);
        ɵɵtemplate(1, NotifierNotificationComponent_ng_template_1_Template, 3, 2, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r1 = ɵɵreference(2);
        ɵɵproperty("ngIf", ctx.notification.template)("ngIfElse", _r1);
    } }, directives: [NgIf, NgTemplateOutlet], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NotifierNotificationComponent, [{
        type: Component,
        args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
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
    }], function () { return [{ type: ElementRef }, { type: Renderer2 }, { type: NotifierService }, { type: NotifierTimerService }, { type: NotifierAnimationService }]; }, { notification: [{
            type: Input
        }], ready: [{
            type: Output
        }], dismiss: [{
            type: Output
        }] }); })();

function NotifierContainerComponent_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 1);
    ɵɵelementStart(1, "notifier-notification", 2);
    ɵɵlistener("ready", function NotifierContainerComponent_li_1_Template_notifier_notification_ready_1_listener($event) { ɵɵrestoreView(_r3); const ctx_r2 = ɵɵnextContext(); return ctx_r2.onNotificationReady($event); })("dismiss", function NotifierContainerComponent_li_1_Template_notifier_notification_dismiss_1_listener($event) { ɵɵrestoreView(_r3); const ctx_r4 = ɵɵnextContext(); return ctx_r4.onNotificationDismiss($event); });
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const notification_r1 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("notification", notification_r1);
} }
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
class NotifierContainerComponent {
    /**
     * Constructor
     *
     * @param changeDetector       Change detector, used for manually triggering change detection runs
     * @param notifierQueueService Notifier queue service
     * @param notifierService      Notifier service
     */
    constructor(changeDetector, notifierQueueService, notifierService) {
        this.changeDetector = changeDetector;
        this.queueService = notifierQueueService;
        this.config = notifierService.getConfig();
        this.notifications = [];
        // Connects this component up to the action queue, then handle incoming actions
        this.queueServiceSubscription = this.queueService.actionStream.subscribe((action) => {
            this.handleAction(action).then(() => {
                this.queueService.continue();
            });
        });
    }
    /**
     * Component destroyment lifecycle hook, cleans up the observable subsciption
     */
    ngOnDestroy() {
        if (this.queueServiceSubscription) {
            this.queueServiceSubscription.unsubscribe();
        }
    }
    /**
     * Notification identifier, used as the ngFor trackby function
     *
     * @param   index        Index
     * @param   notification Notifier notification
     * @returns Notification ID as the unique identnfier
     */
    identifyNotification(index, notification) {
        return notification.id;
    }
    /**
     * Event handler, handles clicks on notification dismiss buttons
     *
     * @param notificationId ID of the notification to dismiss
     */
    onNotificationDismiss(notificationId) {
        this.queueService.push({
            payload: notificationId,
            type: 'HIDE'
        });
    }
    /**
     * Event handler, handles notification ready events
     *
     * @param notificationComponent Notification component reference
     */
    onNotificationReady(notificationComponent) {
        let currentNotification = this.notifications[this.notifications.length - 1]; // Get the latest notification
        currentNotification.component = notificationComponent; // Save the new omponent reference
        this.continueHandleShowAction(currentNotification); // Continue with handling the show action
    }
    /**
     * Handle incoming actions by mapping action types to methods, and then running them
     *
     * @param   action Action object
     * @returns Promise, resolved when done
     */
    handleAction(action) {
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
                return new Promise((resolve, reject) => {
                    resolve(); // Ignore unknown action types
                });
        }
    }
    /**
     * Show a new notification
     *
     * We simply add the notification to the list, and then wait until its properly initialized / created / rendered.
     *
     * @param   action Action object
     * @returns Promise, resolved when done
     */
    handleShowAction(action) {
        return new Promise((resolve, reject) => {
            this.tempPromiseResolver = resolve; // Save the promise resolve function so that it can be called later on by another method
            this.addNotificationToList(new NotifierNotification(action.payload));
        });
    }
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
    continueHandleShowAction(notification) {
        // First (which means only one) notification in the list?
        const numberOfNotifications = this.notifications.length;
        if (numberOfNotifications === 1) {
            notification.component.show().then(this.tempPromiseResolver); // Done
        }
        else {
            const implicitStackingLimit = 2;
            // Stacking enabled? (stacking value below 2 means stacking is disabled)
            if (this.config.behaviour.stacking === false || this.config.behaviour.stacking < implicitStackingLimit) {
                this.notifications[0].component.hide().then(() => {
                    this.removeNotificationFromList(this.notifications[0]);
                    notification.component.show().then(this.tempPromiseResolver); // Done
                });
            }
            else {
                const stepPromises = [];
                // Are there now too many notifications?
                if (numberOfNotifications > this.config.behaviour.stacking) {
                    const oldNotifications = this.notifications.slice(1, numberOfNotifications - 1);
                    // Are animations enabled?
                    if (this.config.animations.enabled) {
                        // Is animation overlap enabled?
                        if (this.config.animations.overlap !== false && this.config.animations.overlap > 0) {
                            stepPromises.push(this.notifications[0].component.hide());
                            setTimeout(() => {
                                stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), true));
                            }, this.config.animations.hide.speed - this.config.animations.overlap);
                            setTimeout(() => {
                                stepPromises.push(notification.component.show());
                            }, this.config.animations.hide.speed + this.config.animations.shift.speed - this.config.animations.overlap);
                        }
                        else {
                            stepPromises.push(new Promise((resolve, reject) => {
                                this.notifications[0].component.hide().then(() => {
                                    this.shiftNotifications(oldNotifications, notification.component.getHeight(), true).then(() => {
                                        notification.component.show().then(resolve);
                                    });
                                });
                            }));
                        }
                    }
                    else {
                        stepPromises.push(this.notifications[0].component.hide());
                        stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), true));
                        stepPromises.push(notification.component.show());
                    }
                }
                else {
                    const oldNotifications = this.notifications.slice(0, numberOfNotifications - 1);
                    // Are animations enabled?
                    if (this.config.animations.enabled) {
                        // Is animation overlap enabled?
                        if (this.config.animations.overlap !== false && this.config.animations.overlap > 0) {
                            stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), true));
                            setTimeout(() => {
                                stepPromises.push(notification.component.show());
                            }, this.config.animations.shift.speed - this.config.animations.overlap);
                        }
                        else {
                            stepPromises.push(new Promise((resolve, reject) => {
                                this.shiftNotifications(oldNotifications, notification.component.getHeight(), true).then(() => {
                                    notification.component.show().then(resolve);
                                });
                            }));
                        }
                    }
                    else {
                        stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), true));
                        stepPromises.push(notification.component.show());
                    }
                }
                Promise.all(stepPromises).then(() => {
                    if (numberOfNotifications > this.config.behaviour.stacking) {
                        this.removeNotificationFromList(this.notifications[0]);
                    }
                    this.tempPromiseResolver();
                }); // Done
            }
        }
    }
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
    handleHideAction(action) {
        return new Promise((resolve, reject) => {
            const stepPromises = [];
            // Does the notification exist / are there even any notifications? (let's prevent accidential errors)
            const notification = this.findNotificationById(action.payload);
            if (notification === undefined) {
                resolve();
                return;
            }
            // Get older notifications
            const notificationIndex = this.findNotificationIndexById(action.payload);
            if (notificationIndex === undefined) {
                resolve();
                return;
            }
            const oldNotifications = this.notifications.slice(0, notificationIndex);
            // Do older notifications exist, and thus do we need to shift other notifications as a consequence?
            if (oldNotifications.length > 0) {
                // Are animations enabled?
                if (this.config.animations.enabled && this.config.animations.hide.speed > 0) {
                    // Is animation overlap enabled?
                    if (this.config.animations.overlap !== false && this.config.animations.overlap > 0) {
                        stepPromises.push(notification.component.hide());
                        setTimeout(() => {
                            stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), false));
                        }, this.config.animations.hide.speed - this.config.animations.overlap);
                    }
                    else {
                        notification.component.hide().then(() => {
                            stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), false));
                        });
                    }
                }
                else {
                    stepPromises.push(notification.component.hide());
                    stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), false));
                }
            }
            else {
                stepPromises.push(notification.component.hide());
            }
            // Wait until both hiding and shifting is done, then remove the notification from the list
            Promise.all(stepPromises).then(() => {
                this.removeNotificationFromList(notification);
                resolve(); // Done
            });
        });
    }
    /**
     * Hide the oldest notification (bridge to handleHideAction)
     *
     * @param   action Action object
     * @returns Promise, resolved when done
     */
    handleHideOldestAction(action) {
        // Are there any notifications? (prevent accidential errors)
        if (this.notifications.length === 0) {
            return new Promise((resolve, reject) => {
                resolve();
            }); // Done
        }
        else {
            action.payload = this.notifications[0].id;
            return this.handleHideAction(action);
        }
    }
    /**
     * Hide the newest notification (bridge to handleHideAction)
     *
     * @param   action Action object
     * @returns Promise, resolved when done
     */
    handleHideNewestAction(action) {
        // Are there any notifications? (prevent accidential errors)
        if (this.notifications.length === 0) {
            return new Promise((resolve, reject) => {
                resolve();
            }); // Done
        }
        else {
            action.payload = this.notifications[this.notifications.length - 1].id;
            return this.handleHideAction(action);
        }
    }
    /**
     * Hide all notifications at once
     *
     * @param   action Action object
     * @returns Promise, resolved when done
     */
    handleHideAllAction(action) {
        return new Promise((resolve, reject) => {
            // Are there any notifications? (prevent accidential errors)
            const numberOfNotifications = this.notifications.length;
            if (numberOfNotifications === 0) {
                resolve(); // Done
                return;
            }
            // Are animations enabled?
            if (this.config.animations.enabled && this.config.animations.hide.speed > 0 && this.config.animations.hide.offset !== false &&
                this.config.animations.hide.offset > 0) {
                for (let i = numberOfNotifications - 1; i >= 0; i--) {
                    const animationOffset = this.config.position.vertical.position === 'top' ? numberOfNotifications - 1 : i;
                    setTimeout(() => {
                        this.notifications[i].component.hide().then(() => {
                            // Are we done here, was this the last notification to be hidden?
                            if ((this.config.position.vertical.position === 'top' && i === 0) ||
                                (this.config.position.vertical.position === 'bottom' && i === numberOfNotifications - 1)) {
                                this.removeAllNotificationsFromList();
                                resolve(); // Done
                            }
                        });
                    }, this.config.animations.hide.offset * animationOffset);
                }
            }
            else {
                let stepPromises = [];
                for (let i = numberOfNotifications - 1; i >= 0; i--) {
                    stepPromises.push(this.notifications[i].component.hide());
                }
                Promise.all(stepPromises).then(() => {
                    this.removeAllNotificationsFromList();
                    resolve(); // Done
                });
            }
        });
    }
    /**
     * Shift multiple notifications at once
     *
     * @param   notifications List containing the notifications to be shifted
     * @param   distance      Distance to shift (in px)
     * @param   toMakePlace   Flag, defining in which direciton to shift
     * @returns Promise, resolved when done
     */
    shiftNotifications(notifications, distance, toMakePlace) {
        return new Promise((resolve, reject) => {
            // Are there any notifications to shift?
            if (notifications.length === 0) {
                resolve();
                return;
            }
            let notificationPromises = [];
            for (let i = notifications.length - 1; i >= 0; i--) {
                notificationPromises.push(notifications[i].component.shift(distance, toMakePlace));
            }
            Promise.all(notificationPromises).then(resolve); // Done
        });
    }
    /**
     * Add a new notification to the list of notifications (triggers change detection)
     *
     * @param notification Notification to add to the list of notifications
     */
    addNotificationToList(notification) {
        this.notifications.push(notification);
        this.changeDetector.markForCheck(); // Run change detection because the notification list changed
    }
    /**
     * Remove an existing notification from the list of notifications (triggers change detection)
     *
     * @param notification Notification to be removed from the list of notifications
     */
    removeNotificationFromList(notification) {
        this.notifications =
            this.notifications.filter((item) => item.component !== notification.component);
        this.changeDetector.markForCheck(); // Run change detection because the notification list changed
    }
    /**
     * Remove all notifications from the list (triggers change detection)
     */
    removeAllNotificationsFromList() {
        this.notifications = [];
        this.changeDetector.markForCheck(); // Run change detection because the notification list changed
    }
    /**
     * Helper: Find a notification in the notification list by a given notification ID
     *
     * @param   notificationId Notification ID, used for finding notification
     * @returns Notification, undefined if not found
     */
    findNotificationById(notificationId) {
        return this.notifications.find((currentNotification) => currentNotification.id === notificationId);
    }
    /**
     * Helper: Find a notification's index by a given notification ID
     *
     * @param   notificationId Notification ID, used for finding a notification's index
     * @returns Notification index, undefined if not found
     */
    findNotificationIndexById(notificationId) {
        const notificationIndex = this.notifications.findIndex((currentNotification) => currentNotification.id === notificationId);
        return (notificationIndex !== -1 ? notificationIndex : undefined);
    }
}
/** @nocollapse */ NotifierContainerComponent.ɵfac = function NotifierContainerComponent_Factory(t) { return new (t || NotifierContainerComponent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(NotifierQueueService), ɵɵdirectiveInject(NotifierService)); };
/** @nocollapse */ NotifierContainerComponent.ɵcmp = ɵɵdefineComponent({ type: NotifierContainerComponent, selectors: [["notifier-container"]], hostAttrs: [1, "notifier__container"], decls: 2, vars: 2, consts: [["class", "notifier__container-list", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "notifier__container-list"], [3, "notification", "ready", "dismiss"]], template: function NotifierContainerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "ul");
        ɵɵtemplate(1, NotifierContainerComponent_li_1_Template, 2, 1, "li", 0);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.notifications)("ngForTrackBy", ctx.identifyNotification);
    } }, directives: [NgForOf, NotifierNotificationComponent], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NotifierContainerComponent, [{
        type: Component,
        args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'notifier__container'
                },
                selector: 'notifier-container',
                templateUrl: './notifier-container.component.html'
            }]
    }], function () { return [{ type: ChangeDetectorRef }, { type: NotifierQueueService }, { type: NotifierService }]; }, null); })();

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
class NotifierModule {
    /**
     * Setup the notifier module with custom providers, in this case with a custom configuration based on the givne options
     *
     * @param   [options={}] - Custom notifier options
     * @returns - Notifier module with custom providers
     */
    static withConfig(options = {}) {
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
    }
}
/** @nocollapse */ NotifierModule.ɵmod = ɵɵdefineNgModule({ type: NotifierModule });
/** @nocollapse */ NotifierModule.ɵinj = ɵɵdefineInjector({ factory: function NotifierModule_Factory(t) { return new (t || NotifierModule)(); }, providers: [
        NotifierAnimationService,
        NotifierService,
        NotifierQueueService,
        // Provide the default notifier configuration if just the module is imported
        {
            provide: NotifierConfigToken,
            useFactory: notifierDefaultConfigFactory
        }
    ], imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NotifierModule, { declarations: [NotifierContainerComponent,
        NotifierNotificationComponent], imports: [CommonModule], exports: [NotifierContainerComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NotifierModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    NotifierContainerComponent,
                    NotifierNotificationComponent
                ],
                exports: [
                    NotifierContainerComponent
                ],
                imports: [
                    CommonModule
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
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { NotifierConfig, NotifierConfigToken, NotifierContainerComponent, NotifierModule, NotifierNotificationComponent, NotifierOptionsToken, NotifierService, notifierCustomConfigFactory, notifierDefaultConfigFactory };
//# sourceMappingURL=angular-notifier.js.map
