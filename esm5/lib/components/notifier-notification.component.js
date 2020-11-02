/**
 * @fileoverview added by tsickle
 * Generated from: lib/components/notifier-notification.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { NotifierAnimationService } from '../services/notifier-animation.service';
import { NotifierNotification } from '../models/notifier-notification.model';
import { NotifierService } from '../services/notifier.service';
import { NotifierTimerService } from '../services/notifier-timer.service';
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
    /**
     * Component after view init lifecycle hook, setts up the component and then emits the ready event
     * @return {?}
     */
    NotifierNotificationComponent.prototype.ngAfterViewInit = /**
     * Component after view init lifecycle hook, setts up the component and then emits the ready event
     * @return {?}
     */
    function () {
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
    /**
     * Get the notifier config
     *
     * @return {?} Notifier configuration
     */
    NotifierNotificationComponent.prototype.getConfig = /**
     * Get the notifier config
     *
     * @return {?} Notifier configuration
     */
    function () {
        return this.config;
    };
    /**
     * Get notification element height (in px)
     *
     * @returns Notification element height (in px)
     */
    /**
     * Get notification element height (in px)
     *
     * @return {?} Notification element height (in px)
     */
    NotifierNotificationComponent.prototype.getHeight = /**
     * Get notification element height (in px)
     *
     * @return {?} Notification element height (in px)
     */
    function () {
        return this.elementHeight;
    };
    /**
     * Get notification element width (in px)
     *
     * @returns Notification element height (in px)
     */
    /**
     * Get notification element width (in px)
     *
     * @return {?} Notification element height (in px)
     */
    NotifierNotificationComponent.prototype.getWidth = /**
     * Get notification element width (in px)
     *
     * @return {?} Notification element height (in px)
     */
    function () {
        return this.elementWidth;
    };
    /**
     * Get notification shift offset (in px)
     *
     * @returns Notification element shift offset (in px)
     */
    /**
     * Get notification shift offset (in px)
     *
     * @return {?} Notification element shift offset (in px)
     */
    NotifierNotificationComponent.prototype.getShift = /**
     * Get notification shift offset (in px)
     *
     * @return {?} Notification element shift offset (in px)
     */
    function () {
        return this.elementShift;
    };
    /**
     * Show (animate in) this notification
     *
     * @returns Promise, resolved when done
     */
    /**
     * Show (animate in) this notification
     *
     * @return {?} Promise, resolved when done
     */
    NotifierNotificationComponent.prototype.show = /**
     * Show (animate in) this notification
     *
     * @return {?} Promise, resolved when done
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            // Are animations enabled?
            if (_this.config.animations.enabled && _this.config.animations.show.speed > 0) {
                // Get animation data
                /** @type {?} */
                var animationData = _this.animationService.getAnimationData('show', _this.notification);
                // Set initial styles (styles before animation), prevents quick flicker when animation starts
                /** @type {?} */
                var animatedProperties = Object.keys(animationData.keyframes[0]);
                for (var i = animatedProperties.length - 1; i >= 0; i--) {
                    _this.renderer.setStyle(_this.element, animatedProperties[i], animationData.keyframes[0][animatedProperties[i]]);
                }
                // Animate notification in
                _this.renderer.setStyle(_this.element, 'visibility', 'visible');
                /** @type {?} */
                var animation = _this.element.animate(animationData.keyframes, animationData.options);
                animation.onfinish = (/**
                 * @return {?}
                 */
                function () {
                    _this.startAutoHideTimer();
                    resolve(); // Done
                });
            }
            else {
                // Show notification
                _this.renderer.setStyle(_this.element, 'visibility', 'visible');
                _this.startAutoHideTimer();
                resolve(); // Done
            }
        }));
    };
    /**
     * Hide (animate out) this notification
     *
     * @returns Promise, resolved when done
     */
    /**
     * Hide (animate out) this notification
     *
     * @return {?} Promise, resolved when done
     */
    NotifierNotificationComponent.prototype.hide = /**
     * Hide (animate out) this notification
     *
     * @return {?} Promise, resolved when done
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.stopAutoHideTimer();
            // Are animations enabled?
            if (_this.config.animations.enabled && _this.config.animations.hide.speed > 0) {
                /** @type {?} */
                var animationData = _this.animationService.getAnimationData('hide', _this.notification);
                /** @type {?} */
                var animation = _this.element.animate(animationData.keyframes, animationData.options);
                animation.onfinish = (/**
                 * @return {?}
                 */
                function () {
                    resolve(); // Done
                });
            }
            else {
                resolve(); // Done
            }
        }));
    };
    /**
     * Shift (move) this notification
     *
     * @param   distance         Distance to shift (in px)
     * @param   shiftToMakePlace Flag, defining in which direction to shift
     * @returns Promise, resolved when done
     */
    /**
     * Shift (move) this notification
     *
     * @param {?} distance         Distance to shift (in px)
     * @param {?} shiftToMakePlace Flag, defining in which direction to shift
     * @return {?} Promise, resolved when done
     */
    NotifierNotificationComponent.prototype.shift = /**
     * Shift (move) this notification
     *
     * @param {?} distance         Distance to shift (in px)
     * @param {?} shiftToMakePlace Flag, defining in which direction to shift
     * @return {?} Promise, resolved when done
     */
    function (distance, shiftToMakePlace) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            // Calculate new position (position after the shift)
            /** @type {?} */
            var newElementShift;
            if ((_this.config.position.vertical.position === 'top' && shiftToMakePlace)
                || (_this.config.position.vertical.position === 'bottom' && !shiftToMakePlace)) {
                newElementShift = _this.elementShift + distance + _this.config.position.vertical.gap;
            }
            else {
                newElementShift = _this.elementShift - distance - _this.config.position.vertical.gap;
            }
            /** @type {?} */
            var horizontalPosition = _this.config.position.horizontal.position === 'middle' ? '-50%' : '0';
            // Are animations enabled?
            if (_this.config.animations.enabled && _this.config.animations.shift.speed > 0) {
                /** @type {?} */
                var animationData = {
                    // TODO: Extract into animation service
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
                /** @type {?} */
                var animation = _this.element.animate(animationData.keyframes, animationData.options);
                animation.onfinish = (/**
                 * @return {?}
                 */
                function () {
                    resolve(); // Done
                });
            }
            else {
                _this.renderer.setStyle(_this.element, 'transform', "translate3d( " + horizontalPosition + ", " + newElementShift + "px, 0 )");
                _this.elementShift = newElementShift;
                resolve(); // Done
            }
        }));
    };
    /**
     * Handle click on dismiss button
     */
    /**
     * Handle click on dismiss button
     * @return {?}
     */
    NotifierNotificationComponent.prototype.onClickDismiss = /**
     * Handle click on dismiss button
     * @return {?}
     */
    function () {
        this.dismiss.emit(this.notification.id);
    };
    /**
     * Handle mouseover over notification area
     */
    /**
     * Handle mouseover over notification area
     * @return {?}
     */
    NotifierNotificationComponent.prototype.onNotificationMouseover = /**
     * Handle mouseover over notification area
     * @return {?}
     */
    function () {
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
    /**
     * Handle mouseout from notification area
     * @return {?}
     */
    NotifierNotificationComponent.prototype.onNotificationMouseout = /**
     * Handle mouseout from notification area
     * @return {?}
     */
    function () {
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
    /**
     * Handle click on notification area
     * @return {?}
     */
    NotifierNotificationComponent.prototype.onNotificationClick = /**
     * Handle click on notification area
     * @return {?}
     */
    function () {
        if (this.config.behaviour.onClick === 'hide') {
            this.onClickDismiss();
        }
    };
    /**
     * Start the auto hide timer (if enabled)
     */
    /**
     * Start the auto hide timer (if enabled)
     * @private
     * @return {?}
     */
    NotifierNotificationComponent.prototype.startAutoHideTimer = /**
     * Start the auto hide timer (if enabled)
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
            this.timerService.start(this.config.behaviour.autoHide).then((/**
             * @return {?}
             */
            function () {
                _this.onClickDismiss();
            }));
        }
    };
    /**
     * Pause the auto hide timer (if enabled)
     */
    /**
     * Pause the auto hide timer (if enabled)
     * @private
     * @return {?}
     */
    NotifierNotificationComponent.prototype.pauseAutoHideTimer = /**
     * Pause the auto hide timer (if enabled)
     * @private
     * @return {?}
     */
    function () {
        if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
            this.timerService.pause();
        }
    };
    /**
     * Continue the auto hide timer (if enabled)
     */
    /**
     * Continue the auto hide timer (if enabled)
     * @private
     * @return {?}
     */
    NotifierNotificationComponent.prototype.continueAutoHideTimer = /**
     * Continue the auto hide timer (if enabled)
     * @private
     * @return {?}
     */
    function () {
        if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
            this.timerService.continue();
        }
    };
    /**
     * Stop the auto hide timer (if enabled)
     */
    /**
     * Stop the auto hide timer (if enabled)
     * @private
     * @return {?}
     */
    NotifierNotificationComponent.prototype.stopAutoHideTimer = /**
     * Stop the auto hide timer (if enabled)
     * @private
     * @return {?}
     */
    function () {
        if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
            this.timerService.stop();
        }
    };
    /**
     * Initial notification setup
     */
    /**
     * Initial notification setup
     * @private
     * @return {?}
     */
    NotifierNotificationComponent.prototype.setup = /**
     * Initial notification setup
     * @private
     * @return {?}
     */
    function () {
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
    NotifierNotificationComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // (#perfmatters)
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
                    template: "<ng-container *ngIf=\"notification.template; else predefinedNotification\" [ngTemplateOutlet]=\"notification.template\" [ngTemplateOutletContext]=\"{ notification: notification }\">\n</ng-container>\n\n<ng-template #predefinedNotification>\n\t<p class=\"notifier__notification-message\">{{ notification.message }}</p>\n\t<button class=\"notifier__notification-button\" type=\"button\" title=\"dismiss\" *ngIf=\"config.behaviour.showDismissButton\" (click)=\"onClickDismiss()\">\n\t\t<svg class=\"notifier__notification-button-icon\" viewBox=\"0 0 24 24\" width=\"20\" height=\"20\">\n\t\t\t<path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n\t\t</svg>\n\t</button>\n</ng-template>\n"
                }] }
    ];
    /** @nocollapse */
    NotifierNotificationComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NotifierService },
        { type: NotifierTimerService },
        { type: NotifierAnimationService }
    ]; };
    NotifierNotificationComponent.propDecorators = {
        notification: [{ type: Input }],
        ready: [{ type: Output }],
        dismiss: [{ type: Output }]
    };
    return NotifierNotificationComponent;
}());
export { NotifierNotificationComponent };
if (false) {
    /**
     * Input: Notification object, contains all details necessary to construct the notification
     * @type {?}
     */
    NotifierNotificationComponent.prototype.notification;
    /**
     * Output: Ready event, handles the initialization success by emitting a reference to this notification component
     * @type {?}
     */
    NotifierNotificationComponent.prototype.ready;
    /**
     * Output: Dismiss event, handles the click on the dismiss button by emitting the notification ID of this notification component
     * @type {?}
     */
    NotifierNotificationComponent.prototype.dismiss;
    /**
     * Notifier configuration
     * @type {?}
     */
    NotifierNotificationComponent.prototype.config;
    /**
     * Notifier timer service
     * @type {?}
     * @private
     */
    NotifierNotificationComponent.prototype.timerService;
    /**
     * Notifier animation service
     * @type {?}
     * @private
     */
    NotifierNotificationComponent.prototype.animationService;
    /**
     * Angular renderer, used to preserve the overall DOM abstraction & independence
     * @type {?}
     * @private
     */
    NotifierNotificationComponent.prototype.renderer;
    /**
     * Native element reference, used for manipulating DOM properties
     * @type {?}
     * @private
     */
    NotifierNotificationComponent.prototype.element;
    /**
     * Current notification height, calculated and cached here (#perfmatters)
     * @type {?}
     * @private
     */
    NotifierNotificationComponent.prototype.elementHeight;
    /**
     * Current notification width, calculated and cached here (#perfmatters)
     * @type {?}
     * @private
     */
    NotifierNotificationComponent.prototype.elementWidth;
    /**
     * Current notification shift, calculated and cached here (#perfmatters)
     * @type {?}
     * @private
     */
    NotifierNotificationComponent.prototype.elementShift;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItbm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ub3RpZmllci1ub3RpZmljYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd0SSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7Ozs7Ozs7OztBQVUxRTtJQTRFQzs7Ozs7Ozs7T0FRRztJQUNILHVDQUFvQixVQUFzQixFQUFFLFFBQW1CLEVBQUUsZUFBZ0MsRUFDaEcsb0JBQTBDLEVBQUUsd0JBQWtEO1FBQzlGLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxZQUFZLEVBQWlDLENBQUM7UUFDL0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsb0JBQW9CLENBQUM7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLHdCQUF3QixDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMs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Qyw4Q0FDMEQ7Ozs7O0lBSzFELGdEQUNxQzs7Ozs7SUFLckMsK0NBQXVDOzs7Ozs7SUFLdkMscURBQW9EOzs7Ozs7SUFLcEQseURBQTREOzs7Ozs7SUFLNUQsaURBQXFDOzs7Ozs7SUFLckMsZ0RBQXNDOzs7Ozs7SUFLdEMsc0RBQThCOzs7Ozs7SUFLOUIscURBQTZCOzs7Ozs7SUFLN0IscURBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTm90aWZpZXJBbmltYXRpb25EYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLWFuaW1hdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllckFuaW1hdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9ub3RpZmllci1hbmltYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmllckNvbmZpZyB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1jb25maWcubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpZXJOb3RpZmljYXRpb24gfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItbm90aWZpY2F0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5vdGlmaWVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25vdGlmaWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpZXJUaW1lclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9ub3RpZmllci10aW1lci5zZXJ2aWNlJztcblxuLyoqXG4gKiBOb3RpZmllciBub3RpZmljYXRpb24gY29tcG9uZW50XG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUaGlzIGNvbXBvbmVudCBpcyByZXNwb25zaWJsZSBmb3IgYWN0dWFsbHkgZGlzcGxheWluZyB0aGUgbm90aWZpY2F0aW9uIG9uIHNjcmVlbi4gSW4gYWRkaXRpb24sIGl0J3MgYWJsZSB0byBzaG93IGFuZCBoaWRlIHRoaXNcbiAqIG5vdGlmaWNhdGlvbiwgaW4gcGFydGljdWxhciB0byBhbmltYXRlIHRoaXMgbm90aWZpY2F0aW9uIGluIGFuZCBvdXQsIGFzIHdlbGwgYXMgc2hpZnQgKG1vdmUpIHRoaXMgbm90aWZpY2F0aW9uIHZlcnRpY2FsbHkgYXJvdW5kLlxuICogRnVydGhlcm1vcmUsIHRoZSBub3RpZmljYXRpb24gY29tcG9uZW50IGhhbmRsZXMgYWxsIGludGVyYWN0aW9ucyB0aGUgdXNlciBoYXMgd2l0aCB0aGlzIG5vdGlmaWNhdGlvbiAvIGNvbXBvbmVudCwgc3VjaCBhcyBjbGlja3MgYW5kXG4gKiBtb3VzZSBtb3ZlbWVudHMuXG4gKi9cbkBDb21wb25lbnQoIHtcblx0Y2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsIC8vICgjcGVyZm1hdHRlcnMpXG5cdGhvc3Q6IHtcblx0XHQnKGNsaWNrKSc6ICdvbk5vdGlmaWNhdGlvbkNsaWNrKCknLFxuXHRcdCcobW91c2VvdXQpJzogJ29uTm90aWZpY2F0aW9uTW91c2VvdXQoKScsXG5cdFx0Jyhtb3VzZW92ZXIpJzogJ29uTm90aWZpY2F0aW9uTW91c2VvdmVyKCknLFxuXHRcdGNsYXNzOiAnbm90aWZpZXJfX25vdGlmaWNhdGlvbidcblx0fSxcblx0cHJvdmlkZXJzOiBbXG5cdFx0Ly8gV2UgcHJvdmlkZSB0aGUgdGltZXIgdG8gdGhlIGNvbXBvbmVudCdzIGxvY2FsIGluamVjdG9yLCBzbyB0aGF0IGV2ZXJ5IG5vdGlmaWNhdGlvbiBjb21wb25lbnRzIGdldHMgaXRzIG93blxuXHRcdC8vIGluc3RhbmNlIG9mIHRoZSB0aW1lciBzZXJ2aWNlLCB0aHVzIHJ1bm5pbmcgdGhlaXIgdGltZXJzIGluZGVwZW5kZW50bHkgZnJvbSBlYWNoIG90aGVyXG5cdFx0Tm90aWZpZXJUaW1lclNlcnZpY2Vcblx0XSxcblx0c2VsZWN0b3I6ICdub3RpZmllci1ub3RpZmljYXRpb24nLFxuXHR0ZW1wbGF0ZVVybDogJy4vbm90aWZpZXItbm90aWZpY2F0aW9uLmNvbXBvbmVudC5odG1sJ1xufSApXG5leHBvcnQgY2xhc3MgTm90aWZpZXJOb3RpZmljYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuXHQvKipcblx0ICogSW5wdXQ6IE5vdGlmaWNhdGlvbiBvYmplY3QsIGNvbnRhaW5zIGFsbCBkZXRhaWxzIG5lY2Vzc2FyeSB0byBjb25zdHJ1Y3QgdGhlIG5vdGlmaWNhdGlvblxuXHQgKi9cblx0QElucHV0KClcblx0cHVibGljIG5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb247XG5cblx0LyoqXG5cdCAqIE91dHB1dDogUmVhZHkgZXZlbnQsIGhhbmRsZXMgdGhlIGluaXRpYWxpemF0aW9uIHN1Y2Nlc3MgYnkgZW1pdHRpbmcgYSByZWZlcmVuY2UgdG8gdGhpcyBub3RpZmljYXRpb24gY29tcG9uZW50XG5cdCAqL1xuXHRAT3V0cHV0KClcblx0cHVibGljIHJlYWR5OiBFdmVudEVtaXR0ZXI8Tm90aWZpZXJOb3RpZmljYXRpb25Db21wb25lbnQ+O1xuXG5cdC8qKlxuXHQgKiBPdXRwdXQ6IERpc21pc3MgZXZlbnQsIGhhbmRsZXMgdGhlIGNsaWNrIG9uIHRoZSBkaXNtaXNzIGJ1dHRvbiBieSBlbWl0dGluZyB0aGUgbm90aWZpY2F0aW9uIElEIG9mIHRoaXMgbm90aWZpY2F0aW9uIGNvbXBvbmVudFxuXHQgKi9cblx0QE91dHB1dCgpXG5cdHB1YmxpYyBkaXNtaXNzOiBFdmVudEVtaXR0ZXI8c3RyaW5nPjtcblxuXHQvKipcblx0ICogTm90aWZpZXIgY29uZmlndXJhdGlvblxuXHQgKi9cblx0cHVibGljIHJlYWRvbmx5IGNvbmZpZzogTm90aWZpZXJDb25maWc7XG5cblx0LyoqXG5cdCAqIE5vdGlmaWVyIHRpbWVyIHNlcnZpY2Vcblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgdGltZXJTZXJ2aWNlOiBOb3RpZmllclRpbWVyU2VydmljZTtcblxuXHQvKipcblx0ICogTm90aWZpZXIgYW5pbWF0aW9uIHNlcnZpY2Vcblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgYW5pbWF0aW9uU2VydmljZTogTm90aWZpZXJBbmltYXRpb25TZXJ2aWNlO1xuXG5cdC8qKlxuXHQgKiBBbmd1bGFyIHJlbmRlcmVyLCB1c2VkIHRvIHByZXNlcnZlIHRoZSBvdmVyYWxsIERPTSBhYnN0cmFjdGlvbiAmIGluZGVwZW5kZW5jZVxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXIyO1xuXG5cdC8qKlxuXHQgKiBOYXRpdmUgZWxlbWVudCByZWZlcmVuY2UsIHVzZWQgZm9yIG1hbmlwdWxhdGluZyBET00gcHJvcGVydGllc1xuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuXHQvKipcblx0ICogQ3VycmVudCBub3RpZmljYXRpb24gaGVpZ2h0LCBjYWxjdWxhdGVkIGFuZCBjYWNoZWQgaGVyZSAoI3BlcmZtYXR0ZXJzKVxuXHQgKi9cblx0cHJpdmF0ZSBlbGVtZW50SGVpZ2h0OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIEN1cnJlbnQgbm90aWZpY2F0aW9uIHdpZHRoLCBjYWxjdWxhdGVkIGFuZCBjYWNoZWQgaGVyZSAoI3BlcmZtYXR0ZXJzKVxuXHQgKi9cblx0cHJpdmF0ZSBlbGVtZW50V2lkdGg6IG51bWJlcjtcblxuXHQvKipcblx0ICogQ3VycmVudCBub3RpZmljYXRpb24gc2hpZnQsIGNhbGN1bGF0ZWQgYW5kIGNhY2hlZCBoZXJlICgjcGVyZm1hdHRlcnMpXG5cdCAqL1xuXHRwcml2YXRlIGVsZW1lbnRTaGlmdDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAcGFyYW0gZWxlbWVudFJlZiAgICAgICAgICAgICAgIFJlZmVyZW5jZSB0byB0aGUgY29tcG9uZW50J3MgZWxlbWVudFxuXHQgKiBAcGFyYW0gcmVuZGVyZXIgICAgICAgICAgICAgICAgIEFuZ3VsYXIgcmVuZGVyZXJcblx0ICogQHBhcmFtIG5vdGlmaWVyU2VydmljZSAgICAgICAgICBOb3RpZmllciBzZXJ2aWNlXG5cdCAqIEBwYXJhbSBub3RpZmllclRpbWVyU2VydmljZSAgICAgTm90aWZpZXIgdGltZXIgc2VydmljZVxuXHQgKiBAcGFyYW0gbm90aWZpZXJBbmltYXRpb25TZXJ2aWNlIE5vdGlmaWVyIGFuaW1hdGlvbiBzZXJ2aWNlXG5cdCAqL1xuXHRwdWJsaWMgY29uc3RydWN0b3IoIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIG5vdGlmaWVyU2VydmljZTogTm90aWZpZXJTZXJ2aWNlLFxuXHRcdG5vdGlmaWVyVGltZXJTZXJ2aWNlOiBOb3RpZmllclRpbWVyU2VydmljZSwgbm90aWZpZXJBbmltYXRpb25TZXJ2aWNlOiBOb3RpZmllckFuaW1hdGlvblNlcnZpY2UgKSB7XG5cdFx0dGhpcy5jb25maWcgPSBub3RpZmllclNlcnZpY2UuZ2V0Q29uZmlnKCk7XG5cdFx0dGhpcy5yZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8Tm90aWZpZXJOb3RpZmljYXRpb25Db21wb25lbnQ+KCk7XG5cdFx0dGhpcy5kaXNtaXNzID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cdFx0dGhpcy50aW1lclNlcnZpY2UgPSBub3RpZmllclRpbWVyU2VydmljZTtcblx0XHR0aGlzLmFuaW1hdGlvblNlcnZpY2UgPSBub3RpZmllckFuaW1hdGlvblNlcnZpY2U7XG5cdFx0dGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblx0XHR0aGlzLmVsZW1lbnRTaGlmdCA9IDA7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcG9uZW50IGFmdGVyIHZpZXcgaW5pdCBsaWZlY3ljbGUgaG9vaywgc2V0dHMgdXAgdGhlIGNvbXBvbmVudCBhbmQgdGhlbiBlbWl0cyB0aGUgcmVhZHkgZXZlbnRcblx0ICovXG5cdHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG5cdFx0dGhpcy5zZXR1cCgpO1xuXHRcdHRoaXMuZWxlbWVudEhlaWdodCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG5cdFx0dGhpcy5lbGVtZW50V2lkdGggPSB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cdFx0dGhpcy5yZWFkeS5lbWl0KCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBub3RpZmllciBjb25maWdcblx0ICpcblx0ICogQHJldHVybnMgTm90aWZpZXIgY29uZmlndXJhdGlvblxuXHQgKi9cblx0cHVibGljIGdldENvbmZpZygpOiBOb3RpZmllckNvbmZpZyB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBub3RpZmljYXRpb24gZWxlbWVudCBoZWlnaHQgKGluIHB4KVxuXHQgKlxuXHQgKiBAcmV0dXJucyBOb3RpZmljYXRpb24gZWxlbWVudCBoZWlnaHQgKGluIHB4KVxuXHQgKi9cblx0cHVibGljIGdldEhlaWdodCgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLmVsZW1lbnRIZWlnaHQ7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IG5vdGlmaWNhdGlvbiBlbGVtZW50IHdpZHRoIChpbiBweClcblx0ICpcblx0ICogQHJldHVybnMgTm90aWZpY2F0aW9uIGVsZW1lbnQgaGVpZ2h0IChpbiBweClcblx0ICovXG5cdHB1YmxpYyBnZXRXaWR0aCgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLmVsZW1lbnRXaWR0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgbm90aWZpY2F0aW9uIHNoaWZ0IG9mZnNldCAoaW4gcHgpXG5cdCAqXG5cdCAqIEByZXR1cm5zIE5vdGlmaWNhdGlvbiBlbGVtZW50IHNoaWZ0IG9mZnNldCAoaW4gcHgpXG5cdCAqL1xuXHRwdWJsaWMgZ2V0U2hpZnQoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5lbGVtZW50U2hpZnQ7XG5cdH1cblxuXHQvKipcblx0ICogU2hvdyAoYW5pbWF0ZSBpbikgdGhpcyBub3RpZmljYXRpb25cblx0ICpcblx0ICogQHJldHVybnMgUHJvbWlzZSwgcmVzb2x2ZWQgd2hlbiBkb25lXG5cdCAqL1xuXHRwdWJsaWMgc2hvdygpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblxuXHRcdFx0Ly8gQXJlIGFuaW1hdGlvbnMgZW5hYmxlZD9cblx0XHRcdGlmICggdGhpcy5jb25maWcuYW5pbWF0aW9ucy5lbmFibGVkICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuc2hvdy5zcGVlZCA+IDAgKSB7XG5cblx0XHRcdFx0Ly8gR2V0IGFuaW1hdGlvbiBkYXRhXG5cdFx0XHRcdGNvbnN0IGFuaW1hdGlvbkRhdGE6IE5vdGlmaWVyQW5pbWF0aW9uRGF0YSA9IHRoaXMuYW5pbWF0aW9uU2VydmljZS5nZXRBbmltYXRpb25EYXRhKCAnc2hvdycsIHRoaXMubm90aWZpY2F0aW9uICk7XG5cblx0XHRcdFx0Ly8gU2V0IGluaXRpYWwgc3R5bGVzIChzdHlsZXMgYmVmb3JlIGFuaW1hdGlvbiksIHByZXZlbnRzIHF1aWNrIGZsaWNrZXIgd2hlbiBhbmltYXRpb24gc3RhcnRzXG5cdFx0XHRcdGNvbnN0IGFuaW1hdGVkUHJvcGVydGllczogQXJyYXk8c3RyaW5nPiA9IE9iamVjdC5rZXlzKCBhbmltYXRpb25EYXRhLmtleWZyYW1lc1sgMCBdICk7XG5cdFx0XHRcdGZvciAoIGxldCBpOiBudW1iZXIgPSBhbmltYXRlZFByb3BlcnRpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0gKSB7XG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSggdGhpcy5lbGVtZW50LCBhbmltYXRlZFByb3BlcnRpZXNbIGkgXSxcblx0XHRcdFx0XHRcdGFuaW1hdGlvbkRhdGEua2V5ZnJhbWVzWyAwIF1bIGFuaW1hdGVkUHJvcGVydGllc1sgaSBdIF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFuaW1hdGUgbm90aWZpY2F0aW9uIGluXG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoIHRoaXMuZWxlbWVudCwgJ3Zpc2liaWxpdHknLCAndmlzaWJsZScgKTtcblx0XHRcdFx0Y29uc3QgYW5pbWF0aW9uOiBBbmltYXRpb24gPSB0aGlzLmVsZW1lbnQuYW5pbWF0ZSggYW5pbWF0aW9uRGF0YS5rZXlmcmFtZXMsIGFuaW1hdGlvbkRhdGEub3B0aW9ucyApO1xuXHRcdFx0XHRhbmltYXRpb24ub25maW5pc2ggPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5zdGFydEF1dG9IaWRlVGltZXIoKTtcblx0XHRcdFx0XHRyZXNvbHZlKCk7IC8vIERvbmVcblx0XHRcdFx0fTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBTaG93IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKCB0aGlzLmVsZW1lbnQsICd2aXNpYmlsaXR5JywgJ3Zpc2libGUnICk7XG5cdFx0XHRcdHRoaXMuc3RhcnRBdXRvSGlkZVRpbWVyKCk7XG5cdFx0XHRcdHJlc29sdmUoKTsgLy8gRG9uZVxuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBIaWRlIChhbmltYXRlIG91dCkgdGhpcyBub3RpZmljYXRpb25cblx0ICpcblx0ICogQHJldHVybnMgUHJvbWlzZSwgcmVzb2x2ZWQgd2hlbiBkb25lXG5cdCAqL1xuXHRwdWJsaWMgaGlkZSgpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblxuXHRcdFx0dGhpcy5zdG9wQXV0b0hpZGVUaW1lcigpO1xuXG5cdFx0XHQvLyBBcmUgYW5pbWF0aW9ucyBlbmFibGVkP1xuXHRcdFx0aWYgKCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmVuYWJsZWQgJiYgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5oaWRlLnNwZWVkID4gMCApIHtcblx0XHRcdFx0Y29uc3QgYW5pbWF0aW9uRGF0YTogTm90aWZpZXJBbmltYXRpb25EYXRhID0gdGhpcy5hbmltYXRpb25TZXJ2aWNlLmdldEFuaW1hdGlvbkRhdGEoICdoaWRlJywgdGhpcy5ub3RpZmljYXRpb24gKTtcblx0XHRcdFx0Y29uc3QgYW5pbWF0aW9uOiBBbmltYXRpb24gPSB0aGlzLmVsZW1lbnQuYW5pbWF0ZSggYW5pbWF0aW9uRGF0YS5rZXlmcmFtZXMsIGFuaW1hdGlvbkRhdGEub3B0aW9ucyApO1xuXHRcdFx0XHRhbmltYXRpb24ub25maW5pc2ggPSAoKSA9PiB7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpOyAvLyBEb25lXG5cdFx0XHRcdH07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXNvbHZlKCk7IC8vIERvbmVcblx0XHRcdH1cblxuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaGlmdCAobW92ZSkgdGhpcyBub3RpZmljYXRpb25cblx0ICpcblx0ICogQHBhcmFtICAgZGlzdGFuY2UgICAgICAgICBEaXN0YW5jZSB0byBzaGlmdCAoaW4gcHgpXG5cdCAqIEBwYXJhbSAgIHNoaWZ0VG9NYWtlUGxhY2UgRmxhZywgZGVmaW5pbmcgaW4gd2hpY2ggZGlyZWN0aW9uIHRvIHNoaWZ0XG5cdCAqIEByZXR1cm5zIFByb21pc2UsIHJlc29sdmVkIHdoZW4gZG9uZVxuXHQgKi9cblx0cHVibGljIHNoaWZ0KCBkaXN0YW5jZTogbnVtYmVyLCBzaGlmdFRvTWFrZVBsYWNlOiBib29sZWFuICk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXG5cdFx0XHQvLyBDYWxjdWxhdGUgbmV3IHBvc2l0aW9uIChwb3NpdGlvbiBhZnRlciB0aGUgc2hpZnQpXG5cdFx0XHRsZXQgbmV3RWxlbWVudFNoaWZ0OiBudW1iZXI7XG5cdFx0XHRpZiAoICggdGhpcy5jb25maWcucG9zaXRpb24udmVydGljYWwucG9zaXRpb24gPT09ICd0b3AnICYmIHNoaWZ0VG9NYWtlUGxhY2UgKVxuXHRcdFx0XHR8fCAoIHRoaXMuY29uZmlnLnBvc2l0aW9uLnZlcnRpY2FsLnBvc2l0aW9uID09PSAnYm90dG9tJyAmJiAhc2hpZnRUb01ha2VQbGFjZSApICkge1xuXHRcdFx0XHRuZXdFbGVtZW50U2hpZnQgPSB0aGlzLmVsZW1lbnRTaGlmdCArIGRpc3RhbmNlICsgdGhpcy5jb25maWcucG9zaXRpb24udmVydGljYWwuZ2FwO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV3RWxlbWVudFNoaWZ0ID0gdGhpcy5lbGVtZW50U2hpZnQgLSBkaXN0YW5jZSAtIHRoaXMuY29uZmlnLnBvc2l0aW9uLnZlcnRpY2FsLmdhcDtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGhvcml6b250YWxQb3NpdGlvbjogc3RyaW5nID0gdGhpcy5jb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5wb3NpdGlvbiA9PT0gJ21pZGRsZScgPyAnLTUwJScgOiAnMCc7XG5cblx0XHRcdC8vIEFyZSBhbmltYXRpb25zIGVuYWJsZWQ/XG5cdFx0XHRpZiAoIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuZW5hYmxlZCAmJiB0aGlzLmNvbmZpZy5hbmltYXRpb25zLnNoaWZ0LnNwZWVkID4gMCApIHtcblx0XHRcdFx0Y29uc3QgYW5pbWF0aW9uRGF0YTogTm90aWZpZXJBbmltYXRpb25EYXRhID0geyAvLyBUT0RPOiBFeHRyYWN0IGludG8gYW5pbWF0aW9uIHNlcnZpY2Vcblx0XHRcdFx0XHRrZXlmcmFtZXM6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoICR7IGhvcml6b250YWxQb3NpdGlvbiB9LCAkeyB0aGlzLmVsZW1lbnRTaGlmdCB9cHgsIDAgKWBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCAkeyBob3Jpem9udGFsUG9zaXRpb24gfSwgJHsgbmV3RWxlbWVudFNoaWZ0IH1weCwgMCApYFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0ZHVyYXRpb246IHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuc2hpZnQuc3BlZWQsXG5cdFx0XHRcdFx0XHRlYXNpbmc6IHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuc2hpZnQuZWFzaW5nLFxuXHRcdFx0XHRcdFx0ZmlsbDogJ2ZvcndhcmRzJ1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0dGhpcy5lbGVtZW50U2hpZnQgPSBuZXdFbGVtZW50U2hpZnQ7XG5cdFx0XHRcdGNvbnN0IGFuaW1hdGlvbjogQW5pbWF0aW9uID0gdGhpcy5lbGVtZW50LmFuaW1hdGUoIGFuaW1hdGlvbkRhdGEua2V5ZnJhbWVzLCBhbmltYXRpb25EYXRhLm9wdGlvbnMgKTtcblx0XHRcdFx0YW5pbWF0aW9uLm9uZmluaXNoID0gKCkgPT4ge1xuXHRcdFx0XHRcdHJlc29sdmUoKTsgLy8gRG9uZVxuXHRcdFx0XHR9O1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKCB0aGlzLmVsZW1lbnQsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlM2QoICR7IGhvcml6b250YWxQb3NpdGlvbiB9LCAkeyBuZXdFbGVtZW50U2hpZnQgfXB4LCAwIClgICk7XG5cdFx0XHRcdHRoaXMuZWxlbWVudFNoaWZ0ID0gbmV3RWxlbWVudFNoaWZ0O1xuXHRcdFx0XHRyZXNvbHZlKCk7IC8vIERvbmVcblx0XHRcdH1cblxuXHRcdH0gKTtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBjbGljayBvbiBkaXNtaXNzIGJ1dHRvblxuXHQgKi9cblx0cHVibGljIG9uQ2xpY2tEaXNtaXNzKCk6IHZvaWQge1xuXHRcdHRoaXMuZGlzbWlzcy5lbWl0KCB0aGlzLm5vdGlmaWNhdGlvbi5pZCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBtb3VzZW92ZXIgb3ZlciBub3RpZmljYXRpb24gYXJlYVxuXHQgKi9cblx0cHVibGljIG9uTm90aWZpY2F0aW9uTW91c2VvdmVyKCk6IHZvaWQge1xuXHRcdGlmICggdGhpcy5jb25maWcuYmVoYXZpb3VyLm9uTW91c2VvdmVyID09PSAncGF1c2VBdXRvSGlkZScgKSB7XG5cdFx0XHR0aGlzLnBhdXNlQXV0b0hpZGVUaW1lcigpO1xuXHRcdH0gZWxzZSBpZiAoIHRoaXMuY29uZmlnLmJlaGF2aW91ci5vbk1vdXNlb3ZlciA9PT0gJ3Jlc2V0QXV0b0hpZGUnICkge1xuXHRcdFx0dGhpcy5zdG9wQXV0b0hpZGVUaW1lcigpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgbW91c2VvdXQgZnJvbSBub3RpZmljYXRpb24gYXJlYVxuXHQgKi9cblx0cHVibGljIG9uTm90aWZpY2F0aW9uTW91c2VvdXQoKTogdm9pZCB7XG5cdFx0aWYgKCB0aGlzLmNvbmZpZy5iZWhhdmlvdXIub25Nb3VzZW92ZXIgPT09ICdwYXVzZUF1dG9IaWRlJyApIHtcblx0XHRcdHRoaXMuY29udGludWVBdXRvSGlkZVRpbWVyKCk7XG5cdFx0fSBlbHNlIGlmICggdGhpcy5jb25maWcuYmVoYXZpb3VyLm9uTW91c2VvdmVyID09PSAncmVzZXRBdXRvSGlkZScgKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXV0b0hpZGVUaW1lcigpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgY2xpY2sgb24gbm90aWZpY2F0aW9uIGFyZWFcblx0ICovXG5cdHB1YmxpYyBvbk5vdGlmaWNhdGlvbkNsaWNrKCk6IHZvaWQge1xuXHRcdGlmICggdGhpcy5jb25maWcuYmVoYXZpb3VyLm9uQ2xpY2sgPT09ICdoaWRlJyApIHtcblx0XHRcdHRoaXMub25DbGlja0Rpc21pc3MoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU3RhcnQgdGhlIGF1dG8gaGlkZSB0aW1lciAoaWYgZW5hYmxlZClcblx0ICovXG5cdHByaXZhdGUgc3RhcnRBdXRvSGlkZVRpbWVyKCk6IHZvaWQge1xuXHRcdGlmICggdGhpcy5jb25maWcuYmVoYXZpb3VyLmF1dG9IaWRlICE9PSBmYWxzZSAmJiB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuYXV0b0hpZGUgPiAwICkge1xuXHRcdFx0dGhpcy50aW1lclNlcnZpY2Uuc3RhcnQoIHRoaXMuY29uZmlnLmJlaGF2aW91ci5hdXRvSGlkZSApLnRoZW4oICgpID0+IHtcblx0XHRcdFx0dGhpcy5vbkNsaWNrRGlzbWlzcygpO1xuXHRcdFx0fSApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBQYXVzZSB0aGUgYXV0byBoaWRlIHRpbWVyIChpZiBlbmFibGVkKVxuXHQgKi9cblx0cHJpdmF0ZSBwYXVzZUF1dG9IaWRlVGltZXIoKTogdm9pZCB7XG5cdFx0aWYgKCB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuYXV0b0hpZGUgIT09IGZhbHNlICYmIHRoaXMuY29uZmlnLmJlaGF2aW91ci5hdXRvSGlkZSA+IDAgKSB7XG5cdFx0XHR0aGlzLnRpbWVyU2VydmljZS5wYXVzZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb250aW51ZSB0aGUgYXV0byBoaWRlIHRpbWVyIChpZiBlbmFibGVkKVxuXHQgKi9cblx0cHJpdmF0ZSBjb250aW51ZUF1dG9IaWRlVGltZXIoKTogdm9pZCB7XG5cdFx0aWYgKCB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuYXV0b0hpZGUgIT09IGZhbHNlICYmIHRoaXMuY29uZmlnLmJlaGF2aW91ci5hdXRvSGlkZSA+IDAgKSB7XG5cdFx0XHR0aGlzLnRpbWVyU2VydmljZS5jb250aW51ZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTdG9wIHRoZSBhdXRvIGhpZGUgdGltZXIgKGlmIGVuYWJsZWQpXG5cdCAqL1xuXHRwcml2YXRlIHN0b3BBdXRvSGlkZVRpbWVyKCk6IHZvaWQge1xuXHRcdGlmICggdGhpcy5jb25maWcuYmVoYXZpb3VyLmF1dG9IaWRlICE9PSBmYWxzZSAmJiB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuYXV0b0hpZGUgPiAwICkge1xuXHRcdFx0dGhpcy50aW1lclNlcnZpY2Uuc3RvcCgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsIG5vdGlmaWNhdGlvbiBzZXR1cFxuXHQgKi9cblx0cHJpdmF0ZSBzZXR1cCgpOiB2b2lkIHtcblxuXHRcdC8vIFNldCBzdGFydCBwb3NpdGlvbiAoaW5pdGlhbGx5IHRoZSBleGFjdCBzYW1lIGZvciBldmVyeSBuZXcgbm90aWZpY2F0aW9uKVxuXHRcdGlmICggdGhpcy5jb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5wb3NpdGlvbiA9PT0gJ2xlZnQnICkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSggdGhpcy5lbGVtZW50LCAnbGVmdCcsIGAkeyB0aGlzLmNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weGAgKTtcblx0XHR9IGVsc2UgaWYgKCB0aGlzLmNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLnBvc2l0aW9uID09PSAncmlnaHQnICkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSggdGhpcy5lbGVtZW50LCAncmlnaHQnLCBgJHsgdGhpcy5jb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5kaXN0YW5jZSB9cHhgICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoIHRoaXMuZWxlbWVudCwgJ2xlZnQnLCAnNTAlJyApO1xuXHRcdFx0Ly8gTGV0J3MgZ2V0IHRoZSBHUFUgaGFuZGxlIHNvbWUgd29yayBhcyB3ZWxsICgjcGVyZm1hdHRlcnMpXG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKCB0aGlzLmVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoIC01MCUsIDAsIDAgKScgKTtcblx0XHR9XG5cdFx0aWYgKCB0aGlzLmNvbmZpZy5wb3NpdGlvbi52ZXJ0aWNhbC5wb3NpdGlvbiA9PT0gJ3RvcCcgKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKCB0aGlzLmVsZW1lbnQsICd0b3AnLCBgJHsgdGhpcy5jb25maWcucG9zaXRpb24udmVydGljYWwuZGlzdGFuY2UgfXB4YCApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKCB0aGlzLmVsZW1lbnQsICdib3R0b20nLCBgJHsgdGhpcy5jb25maWcucG9zaXRpb24udmVydGljYWwuZGlzdGFuY2UgfXB4YCApO1xuXHRcdH1cblxuXHRcdC8vIEFkZCBjbGFzc2VzIChyZXNwb25zaWJsZSBmb3IgdmlzdWFsIGRlc2lnbilcblx0XHR0aGlzLnJlbmRlcmVyLmFkZENsYXNzKCB0aGlzLmVsZW1lbnQsIGBub3RpZmllcl9fbm90aWZpY2F0aW9uLS0keyB0aGlzLm5vdGlmaWNhdGlvbi50eXBlIH1gICk7XG5cdFx0dGhpcy5yZW5kZXJlci5hZGRDbGFzcyggdGhpcy5lbGVtZW50LCBgbm90aWZpZXJfX25vdGlmaWNhdGlvbi0tJHsgdGhpcy5jb25maWcudGhlbWUgfWAgKTtcblxuXHR9XG5cbn1cbiJdfQ==