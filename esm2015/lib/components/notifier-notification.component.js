import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NotifierTimerService } from '../services/notifier-timer.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/notifier.service";
import * as i2 from "../services/notifier-timer.service";
import * as i3 from "../services/notifier-animation.service";
import * as i4 from "@angular/common";
const _c0 = function (a0) { return { notification: a0 }; };
function NotifierNotificationComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0, 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r0.notification.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, ctx_r0.notification));
} }
function NotifierNotificationComponent_ng_template_1_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 5);
    i0.ɵɵlistener("click", function NotifierNotificationComponent_ng_template_1_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(2); return ctx_r4.onClickDismiss(); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 6);
    i0.ɵɵelement(2, "path", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function NotifierNotificationComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, NotifierNotificationComponent_ng_template_1_button_2_Template, 3, 0, "button", 4);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.notification.message);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.config.behaviour.showDismissButton);
} }
/**
 * Notifier notification component
 * -------------------------------
 * This component is responsible for actually displaying the notification on screen. In addition, it's able to show and hide this
 * notification, in particular to animate this notification in and out, as well as shift (move) this notification vertically around.
 * Furthermore, the notification component handles all interactions the user has with this notification / component, such as clicks and
 * mouse movements.
 */
export class NotifierNotificationComponent {
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
/** @nocollapse */ NotifierNotificationComponent.ɵfac = function NotifierNotificationComponent_Factory(t) { return new (t || NotifierNotificationComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.NotifierService), i0.ɵɵdirectiveInject(i2.NotifierTimerService), i0.ɵɵdirectiveInject(i3.NotifierAnimationService)); };
/** @nocollapse */ NotifierNotificationComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NotifierNotificationComponent, selectors: [["notifier-notification"]], hostAttrs: [1, "notifier__notification"], hostBindings: function NotifierNotificationComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function NotifierNotificationComponent_click_HostBindingHandler() { return ctx.onNotificationClick(); })("mouseout", function NotifierNotificationComponent_mouseout_HostBindingHandler() { return ctx.onNotificationMouseout(); })("mouseover", function NotifierNotificationComponent_mouseover_HostBindingHandler() { return ctx.onNotificationMouseover(); });
    } }, inputs: { notification: "notification" }, outputs: { ready: "ready", dismiss: "dismiss" }, features: [i0.ɵɵProvidersFeature([
            // We provide the timer to the component's local injector, so that every notification components gets its own
            // instance of the timer service, thus running their timers independently from each other
            NotifierTimerService
        ])], decls: 3, vars: 2, consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf", "ngIfElse"], ["predefinedNotification", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "notifier__notification-message"], ["class", "notifier__notification-button", "type", "button", "title", "dismiss", 3, "click", 4, "ngIf"], ["type", "button", "title", "dismiss", 1, "notifier__notification-button", 3, "click"], ["viewBox", "0 0 24 24", "width", "20", "height", "20", 1, "notifier__notification-button-icon"], ["d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"]], template: function NotifierNotificationComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NotifierNotificationComponent_ng_container_0_Template, 1, 4, "ng-container", 0);
        i0.ɵɵtemplate(1, NotifierNotificationComponent_ng_template_1_Template, 3, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(2);
        i0.ɵɵproperty("ngIf", ctx.notification.template)("ngIfElse", _r1);
    } }, directives: [i4.NgIf, i4.NgTemplateOutlet], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NotifierNotificationComponent, [{
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
    }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NotifierService }, { type: i2.NotifierTimerService }, { type: i3.NotifierAnimationService }]; }, { notification: [{
            type: Input
        }], ready: [{
            type: Output
        }], dismiss: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItbm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9tc2l2YWRlL0Rldi9wcm9qZWN0cy9hbmd1bGFyLW5vdGlmaWVyL3Byb2plY3RzL2FuZ3VsYXItbm90aWZpZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbm90aWZpZXItbm90aWZpY2F0aW9uLmNvbXBvbmVudC50cyIsImxpYi9jb21wb25lbnRzL25vdGlmaWVyLW5vdGlmaWNhdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQU90SSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7Ozs7SUNQMUUsMkJBQ2U7OztJQUQwRCwrREFBMEMsNEVBQUE7Ozs7SUFLbEgsaUNBQ0M7SUFEc0gsdU5BQTBCO0lBQ2hKLG1CQUNDO0lBREQsOEJBQ0M7SUFBQSwwQkFDRDtJQUFBLGlCQUFNO0lBQ1AsaUJBQVM7OztJQUxULDRCQUEwQztJQUFBLFlBQTBCO0lBQUEsaUJBQUk7SUFDeEUsa0dBQ0M7OztJQUZ5QyxlQUEwQjtJQUExQixpREFBMEI7SUFDUSxlQUEwQztJQUExQyxnRUFBMEM7O0FESXZIOzs7Ozs7O0dBT0c7QUFpQkgsTUFBTSxPQUFPLDZCQUE2QjtJQTREekM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFvQixVQUFzQixFQUFFLFFBQW1CLEVBQUUsZUFBZ0MsRUFDaEcsb0JBQTBDLEVBQUUsd0JBQWtEO1FBQzlGLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxZQUFZLEVBQWlDLENBQUM7UUFDL0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksRUFB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Q1YsNkdBQTZHO29CQUM3Ryx5RkFBeUY7b0JBQ3pGLG9CQUFvQjtpQkFDcEI7Z0JBQ0QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsV0FBVyxFQUFFLHdDQUF3QzthQUNyRDs2TEFPTyxZQUFZO2tCQURsQixLQUFLO1lBT0MsS0FBSztrQkFEWCxNQUFNO1lBT0EsT0FBTztrQkFEYixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTm90aWZpZXJBbmltYXRpb25EYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLWFuaW1hdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllckFuaW1hdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9ub3RpZmllci1hbmltYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmllckNvbmZpZyB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1jb25maWcubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpZXJOb3RpZmljYXRpb24gfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItbm90aWZpY2F0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5vdGlmaWVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25vdGlmaWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpZXJUaW1lclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9ub3RpZmllci10aW1lci5zZXJ2aWNlJztcblxuLyoqXG4gKiBOb3RpZmllciBub3RpZmljYXRpb24gY29tcG9uZW50XG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUaGlzIGNvbXBvbmVudCBpcyByZXNwb25zaWJsZSBmb3IgYWN0dWFsbHkgZGlzcGxheWluZyB0aGUgbm90aWZpY2F0aW9uIG9uIHNjcmVlbi4gSW4gYWRkaXRpb24sIGl0J3MgYWJsZSB0byBzaG93IGFuZCBoaWRlIHRoaXNcbiAqIG5vdGlmaWNhdGlvbiwgaW4gcGFydGljdWxhciB0byBhbmltYXRlIHRoaXMgbm90aWZpY2F0aW9uIGluIGFuZCBvdXQsIGFzIHdlbGwgYXMgc2hpZnQgKG1vdmUpIHRoaXMgbm90aWZpY2F0aW9uIHZlcnRpY2FsbHkgYXJvdW5kLlxuICogRnVydGhlcm1vcmUsIHRoZSBub3RpZmljYXRpb24gY29tcG9uZW50IGhhbmRsZXMgYWxsIGludGVyYWN0aW9ucyB0aGUgdXNlciBoYXMgd2l0aCB0aGlzIG5vdGlmaWNhdGlvbiAvIGNvbXBvbmVudCwgc3VjaCBhcyBjbGlja3MgYW5kXG4gKiBtb3VzZSBtb3ZlbWVudHMuXG4gKi9cbkBDb21wb25lbnQoIHtcblx0Y2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsIC8vICgjcGVyZm1hdHRlcnMpXG5cdGhvc3Q6IHtcblx0XHQnKGNsaWNrKSc6ICdvbk5vdGlmaWNhdGlvbkNsaWNrKCknLFxuXHRcdCcobW91c2VvdXQpJzogJ29uTm90aWZpY2F0aW9uTW91c2VvdXQoKScsXG5cdFx0Jyhtb3VzZW92ZXIpJzogJ29uTm90aWZpY2F0aW9uTW91c2VvdmVyKCknLFxuXHRcdGNsYXNzOiAnbm90aWZpZXJfX25vdGlmaWNhdGlvbidcblx0fSxcblx0cHJvdmlkZXJzOiBbXG5cdFx0Ly8gV2UgcHJvdmlkZSB0aGUgdGltZXIgdG8gdGhlIGNvbXBvbmVudCdzIGxvY2FsIGluamVjdG9yLCBzbyB0aGF0IGV2ZXJ5IG5vdGlmaWNhdGlvbiBjb21wb25lbnRzIGdldHMgaXRzIG93blxuXHRcdC8vIGluc3RhbmNlIG9mIHRoZSB0aW1lciBzZXJ2aWNlLCB0aHVzIHJ1bm5pbmcgdGhlaXIgdGltZXJzIGluZGVwZW5kZW50bHkgZnJvbSBlYWNoIG90aGVyXG5cdFx0Tm90aWZpZXJUaW1lclNlcnZpY2Vcblx0XSxcblx0c2VsZWN0b3I6ICdub3RpZmllci1ub3RpZmljYXRpb24nLFxuXHR0ZW1wbGF0ZVVybDogJy4vbm90aWZpZXItbm90aWZpY2F0aW9uLmNvbXBvbmVudC5odG1sJ1xufSApXG5leHBvcnQgY2xhc3MgTm90aWZpZXJOb3RpZmljYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuXHQvKipcblx0ICogSW5wdXQ6IE5vdGlmaWNhdGlvbiBvYmplY3QsIGNvbnRhaW5zIGFsbCBkZXRhaWxzIG5lY2Vzc2FyeSB0byBjb25zdHJ1Y3QgdGhlIG5vdGlmaWNhdGlvblxuXHQgKi9cblx0QElucHV0KClcblx0cHVibGljIG5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb247XG5cblx0LyoqXG5cdCAqIE91dHB1dDogUmVhZHkgZXZlbnQsIGhhbmRsZXMgdGhlIGluaXRpYWxpemF0aW9uIHN1Y2Nlc3MgYnkgZW1pdHRpbmcgYSByZWZlcmVuY2UgdG8gdGhpcyBub3RpZmljYXRpb24gY29tcG9uZW50XG5cdCAqL1xuXHRAT3V0cHV0KClcblx0cHVibGljIHJlYWR5OiBFdmVudEVtaXR0ZXI8Tm90aWZpZXJOb3RpZmljYXRpb25Db21wb25lbnQ+O1xuXG5cdC8qKlxuXHQgKiBPdXRwdXQ6IERpc21pc3MgZXZlbnQsIGhhbmRsZXMgdGhlIGNsaWNrIG9uIHRoZSBkaXNtaXNzIGJ1dHRvbiBieSBlbWl0dGluZyB0aGUgbm90aWZpY2F0aW9uIElEIG9mIHRoaXMgbm90aWZpY2F0aW9uIGNvbXBvbmVudFxuXHQgKi9cblx0QE91dHB1dCgpXG5cdHB1YmxpYyBkaXNtaXNzOiBFdmVudEVtaXR0ZXI8c3RyaW5nPjtcblxuXHQvKipcblx0ICogTm90aWZpZXIgY29uZmlndXJhdGlvblxuXHQgKi9cblx0cHVibGljIHJlYWRvbmx5IGNvbmZpZzogTm90aWZpZXJDb25maWc7XG5cblx0LyoqXG5cdCAqIE5vdGlmaWVyIHRpbWVyIHNlcnZpY2Vcblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgdGltZXJTZXJ2aWNlOiBOb3RpZmllclRpbWVyU2VydmljZTtcblxuXHQvKipcblx0ICogTm90aWZpZXIgYW5pbWF0aW9uIHNlcnZpY2Vcblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgYW5pbWF0aW9uU2VydmljZTogTm90aWZpZXJBbmltYXRpb25TZXJ2aWNlO1xuXG5cdC8qKlxuXHQgKiBBbmd1bGFyIHJlbmRlcmVyLCB1c2VkIHRvIHByZXNlcnZlIHRoZSBvdmVyYWxsIERPTSBhYnN0cmFjdGlvbiAmIGluZGVwZW5kZW5jZVxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXIyO1xuXG5cdC8qKlxuXHQgKiBOYXRpdmUgZWxlbWVudCByZWZlcmVuY2UsIHVzZWQgZm9yIG1hbmlwdWxhdGluZyBET00gcHJvcGVydGllc1xuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuXHQvKipcblx0ICogQ3VycmVudCBub3RpZmljYXRpb24gaGVpZ2h0LCBjYWxjdWxhdGVkIGFuZCBjYWNoZWQgaGVyZSAoI3BlcmZtYXR0ZXJzKVxuXHQgKi9cblx0cHJpdmF0ZSBlbGVtZW50SGVpZ2h0OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIEN1cnJlbnQgbm90aWZpY2F0aW9uIHdpZHRoLCBjYWxjdWxhdGVkIGFuZCBjYWNoZWQgaGVyZSAoI3BlcmZtYXR0ZXJzKVxuXHQgKi9cblx0cHJpdmF0ZSBlbGVtZW50V2lkdGg6IG51bWJlcjtcblxuXHQvKipcblx0ICogQ3VycmVudCBub3RpZmljYXRpb24gc2hpZnQsIGNhbGN1bGF0ZWQgYW5kIGNhY2hlZCBoZXJlICgjcGVyZm1hdHRlcnMpXG5cdCAqL1xuXHRwcml2YXRlIGVsZW1lbnRTaGlmdDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAcGFyYW0gZWxlbWVudFJlZiAgICAgICAgICAgICAgIFJlZmVyZW5jZSB0byB0aGUgY29tcG9uZW50J3MgZWxlbWVudFxuXHQgKiBAcGFyYW0gcmVuZGVyZXIgICAgICAgICAgICAgICAgIEFuZ3VsYXIgcmVuZGVyZXJcblx0ICogQHBhcmFtIG5vdGlmaWVyU2VydmljZSAgICAgICAgICBOb3RpZmllciBzZXJ2aWNlXG5cdCAqIEBwYXJhbSBub3RpZmllclRpbWVyU2VydmljZSAgICAgTm90aWZpZXIgdGltZXIgc2VydmljZVxuXHQgKiBAcGFyYW0gbm90aWZpZXJBbmltYXRpb25TZXJ2aWNlIE5vdGlmaWVyIGFuaW1hdGlvbiBzZXJ2aWNlXG5cdCAqL1xuXHRwdWJsaWMgY29uc3RydWN0b3IoIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIG5vdGlmaWVyU2VydmljZTogTm90aWZpZXJTZXJ2aWNlLFxuXHRcdG5vdGlmaWVyVGltZXJTZXJ2aWNlOiBOb3RpZmllclRpbWVyU2VydmljZSwgbm90aWZpZXJBbmltYXRpb25TZXJ2aWNlOiBOb3RpZmllckFuaW1hdGlvblNlcnZpY2UgKSB7XG5cdFx0dGhpcy5jb25maWcgPSBub3RpZmllclNlcnZpY2UuZ2V0Q29uZmlnKCk7XG5cdFx0dGhpcy5yZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8Tm90aWZpZXJOb3RpZmljYXRpb25Db21wb25lbnQ+KCk7XG5cdFx0dGhpcy5kaXNtaXNzID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cdFx0dGhpcy50aW1lclNlcnZpY2UgPSBub3RpZmllclRpbWVyU2VydmljZTtcblx0XHR0aGlzLmFuaW1hdGlvblNlcnZpY2UgPSBub3RpZmllckFuaW1hdGlvblNlcnZpY2U7XG5cdFx0dGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblx0XHR0aGlzLmVsZW1lbnRTaGlmdCA9IDA7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcG9uZW50IGFmdGVyIHZpZXcgaW5pdCBsaWZlY3ljbGUgaG9vaywgc2V0dHMgdXAgdGhlIGNvbXBvbmVudCBhbmQgdGhlbiBlbWl0cyB0aGUgcmVhZHkgZXZlbnRcblx0ICovXG5cdHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG5cdFx0dGhpcy5zZXR1cCgpO1xuXHRcdHRoaXMuZWxlbWVudEhlaWdodCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG5cdFx0dGhpcy5lbGVtZW50V2lkdGggPSB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cdFx0dGhpcy5yZWFkeS5lbWl0KCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBub3RpZmllciBjb25maWdcblx0ICpcblx0ICogQHJldHVybnMgTm90aWZpZXIgY29uZmlndXJhdGlvblxuXHQgKi9cblx0cHVibGljIGdldENvbmZpZygpOiBOb3RpZmllckNvbmZpZyB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBub3RpZmljYXRpb24gZWxlbWVudCBoZWlnaHQgKGluIHB4KVxuXHQgKlxuXHQgKiBAcmV0dXJucyBOb3RpZmljYXRpb24gZWxlbWVudCBoZWlnaHQgKGluIHB4KVxuXHQgKi9cblx0cHVibGljIGdldEhlaWdodCgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLmVsZW1lbnRIZWlnaHQ7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IG5vdGlmaWNhdGlvbiBlbGVtZW50IHdpZHRoIChpbiBweClcblx0ICpcblx0ICogQHJldHVybnMgTm90aWZpY2F0aW9uIGVsZW1lbnQgaGVpZ2h0IChpbiBweClcblx0ICovXG5cdHB1YmxpYyBnZXRXaWR0aCgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLmVsZW1lbnRXaWR0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgbm90aWZpY2F0aW9uIHNoaWZ0IG9mZnNldCAoaW4gcHgpXG5cdCAqXG5cdCAqIEByZXR1cm5zIE5vdGlmaWNhdGlvbiBlbGVtZW50IHNoaWZ0IG9mZnNldCAoaW4gcHgpXG5cdCAqL1xuXHRwdWJsaWMgZ2V0U2hpZnQoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5lbGVtZW50U2hpZnQ7XG5cdH1cblxuXHQvKipcblx0ICogU2hvdyAoYW5pbWF0ZSBpbikgdGhpcyBub3RpZmljYXRpb25cblx0ICpcblx0ICogQHJldHVybnMgUHJvbWlzZSwgcmVzb2x2ZWQgd2hlbiBkb25lXG5cdCAqL1xuXHRwdWJsaWMgc2hvdygpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblxuXHRcdFx0Ly8gQXJlIGFuaW1hdGlvbnMgZW5hYmxlZD9cblx0XHRcdGlmICggdGhpcy5jb25maWcuYW5pbWF0aW9ucy5lbmFibGVkICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuc2hvdy5zcGVlZCA+IDAgKSB7XG5cblx0XHRcdFx0Ly8gR2V0IGFuaW1hdGlvbiBkYXRhXG5cdFx0XHRcdGNvbnN0IGFuaW1hdGlvbkRhdGE6IE5vdGlmaWVyQW5pbWF0aW9uRGF0YSA9IHRoaXMuYW5pbWF0aW9uU2VydmljZS5nZXRBbmltYXRpb25EYXRhKCAnc2hvdycsIHRoaXMubm90aWZpY2F0aW9uICk7XG5cblx0XHRcdFx0Ly8gU2V0IGluaXRpYWwgc3R5bGVzIChzdHlsZXMgYmVmb3JlIGFuaW1hdGlvbiksIHByZXZlbnRzIHF1aWNrIGZsaWNrZXIgd2hlbiBhbmltYXRpb24gc3RhcnRzXG5cdFx0XHRcdGNvbnN0IGFuaW1hdGVkUHJvcGVydGllczogQXJyYXk8c3RyaW5nPiA9IE9iamVjdC5rZXlzKCBhbmltYXRpb25EYXRhLmtleWZyYW1lc1sgMCBdICk7XG5cdFx0XHRcdGZvciAoIGxldCBpOiBudW1iZXIgPSBhbmltYXRlZFByb3BlcnRpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0gKSB7XG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSggdGhpcy5lbGVtZW50LCBhbmltYXRlZFByb3BlcnRpZXNbIGkgXSxcblx0XHRcdFx0XHRcdGFuaW1hdGlvbkRhdGEua2V5ZnJhbWVzWyAwIF1bIGFuaW1hdGVkUHJvcGVydGllc1sgaSBdIF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFuaW1hdGUgbm90aWZpY2F0aW9uIGluXG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoIHRoaXMuZWxlbWVudCwgJ3Zpc2liaWxpdHknLCAndmlzaWJsZScgKTtcblx0XHRcdFx0Y29uc3QgYW5pbWF0aW9uOiBBbmltYXRpb24gPSB0aGlzLmVsZW1lbnQuYW5pbWF0ZSggYW5pbWF0aW9uRGF0YS5rZXlmcmFtZXMsIGFuaW1hdGlvbkRhdGEub3B0aW9ucyApO1xuXHRcdFx0XHRhbmltYXRpb24ub25maW5pc2ggPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5zdGFydEF1dG9IaWRlVGltZXIoKTtcblx0XHRcdFx0XHRyZXNvbHZlKCk7IC8vIERvbmVcblx0XHRcdFx0fTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBTaG93IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKCB0aGlzLmVsZW1lbnQsICd2aXNpYmlsaXR5JywgJ3Zpc2libGUnICk7XG5cdFx0XHRcdHRoaXMuc3RhcnRBdXRvSGlkZVRpbWVyKCk7XG5cdFx0XHRcdHJlc29sdmUoKTsgLy8gRG9uZVxuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBIaWRlIChhbmltYXRlIG91dCkgdGhpcyBub3RpZmljYXRpb25cblx0ICpcblx0ICogQHJldHVybnMgUHJvbWlzZSwgcmVzb2x2ZWQgd2hlbiBkb25lXG5cdCAqL1xuXHRwdWJsaWMgaGlkZSgpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblxuXHRcdFx0dGhpcy5zdG9wQXV0b0hpZGVUaW1lcigpO1xuXG5cdFx0XHQvLyBBcmUgYW5pbWF0aW9ucyBlbmFibGVkP1xuXHRcdFx0aWYgKCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmVuYWJsZWQgJiYgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5oaWRlLnNwZWVkID4gMCApIHtcblx0XHRcdFx0Y29uc3QgYW5pbWF0aW9uRGF0YTogTm90aWZpZXJBbmltYXRpb25EYXRhID0gdGhpcy5hbmltYXRpb25TZXJ2aWNlLmdldEFuaW1hdGlvbkRhdGEoICdoaWRlJywgdGhpcy5ub3RpZmljYXRpb24gKTtcblx0XHRcdFx0Y29uc3QgYW5pbWF0aW9uOiBBbmltYXRpb24gPSB0aGlzLmVsZW1lbnQuYW5pbWF0ZSggYW5pbWF0aW9uRGF0YS5rZXlmcmFtZXMsIGFuaW1hdGlvbkRhdGEub3B0aW9ucyApO1xuXHRcdFx0XHRhbmltYXRpb24ub25maW5pc2ggPSAoKSA9PiB7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpOyAvLyBEb25lXG5cdFx0XHRcdH07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXNvbHZlKCk7IC8vIERvbmVcblx0XHRcdH1cblxuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaGlmdCAobW92ZSkgdGhpcyBub3RpZmljYXRpb25cblx0ICpcblx0ICogQHBhcmFtICAgZGlzdGFuY2UgICAgICAgICBEaXN0YW5jZSB0byBzaGlmdCAoaW4gcHgpXG5cdCAqIEBwYXJhbSAgIHNoaWZ0VG9NYWtlUGxhY2UgRmxhZywgZGVmaW5pbmcgaW4gd2hpY2ggZGlyZWN0aW9uIHRvIHNoaWZ0XG5cdCAqIEByZXR1cm5zIFByb21pc2UsIHJlc29sdmVkIHdoZW4gZG9uZVxuXHQgKi9cblx0cHVibGljIHNoaWZ0KCBkaXN0YW5jZTogbnVtYmVyLCBzaGlmdFRvTWFrZVBsYWNlOiBib29sZWFuICk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXG5cdFx0XHQvLyBDYWxjdWxhdGUgbmV3IHBvc2l0aW9uIChwb3NpdGlvbiBhZnRlciB0aGUgc2hpZnQpXG5cdFx0XHRsZXQgbmV3RWxlbWVudFNoaWZ0OiBudW1iZXI7XG5cdFx0XHRpZiAoICggdGhpcy5jb25maWcucG9zaXRpb24udmVydGljYWwucG9zaXRpb24gPT09ICd0b3AnICYmIHNoaWZ0VG9NYWtlUGxhY2UgKVxuXHRcdFx0XHR8fCAoIHRoaXMuY29uZmlnLnBvc2l0aW9uLnZlcnRpY2FsLnBvc2l0aW9uID09PSAnYm90dG9tJyAmJiAhc2hpZnRUb01ha2VQbGFjZSApICkge1xuXHRcdFx0XHRuZXdFbGVtZW50U2hpZnQgPSB0aGlzLmVsZW1lbnRTaGlmdCArIGRpc3RhbmNlICsgdGhpcy5jb25maWcucG9zaXRpb24udmVydGljYWwuZ2FwO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV3RWxlbWVudFNoaWZ0ID0gdGhpcy5lbGVtZW50U2hpZnQgLSBkaXN0YW5jZSAtIHRoaXMuY29uZmlnLnBvc2l0aW9uLnZlcnRpY2FsLmdhcDtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGhvcml6b250YWxQb3NpdGlvbjogc3RyaW5nID0gdGhpcy5jb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5wb3NpdGlvbiA9PT0gJ21pZGRsZScgPyAnLTUwJScgOiAnMCc7XG5cblx0XHRcdC8vIEFyZSBhbmltYXRpb25zIGVuYWJsZWQ/XG5cdFx0XHRpZiAoIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuZW5hYmxlZCAmJiB0aGlzLmNvbmZpZy5hbmltYXRpb25zLnNoaWZ0LnNwZWVkID4gMCApIHtcblx0XHRcdFx0Y29uc3QgYW5pbWF0aW9uRGF0YTogTm90aWZpZXJBbmltYXRpb25EYXRhID0geyAvLyBUT0RPOiBFeHRyYWN0IGludG8gYW5pbWF0aW9uIHNlcnZpY2Vcblx0XHRcdFx0XHRrZXlmcmFtZXM6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoICR7IGhvcml6b250YWxQb3NpdGlvbiB9LCAkeyB0aGlzLmVsZW1lbnRTaGlmdCB9cHgsIDAgKWBcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCAkeyBob3Jpem9udGFsUG9zaXRpb24gfSwgJHsgbmV3RWxlbWVudFNoaWZ0IH1weCwgMCApYFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0ZHVyYXRpb246IHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuc2hpZnQuc3BlZWQsXG5cdFx0XHRcdFx0XHRlYXNpbmc6IHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuc2hpZnQuZWFzaW5nLFxuXHRcdFx0XHRcdFx0ZmlsbDogJ2ZvcndhcmRzJ1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0dGhpcy5lbGVtZW50U2hpZnQgPSBuZXdFbGVtZW50U2hpZnQ7XG5cdFx0XHRcdGNvbnN0IGFuaW1hdGlvbjogQW5pbWF0aW9uID0gdGhpcy5lbGVtZW50LmFuaW1hdGUoIGFuaW1hdGlvbkRhdGEua2V5ZnJhbWVzLCBhbmltYXRpb25EYXRhLm9wdGlvbnMgKTtcblx0XHRcdFx0YW5pbWF0aW9uLm9uZmluaXNoID0gKCkgPT4ge1xuXHRcdFx0XHRcdHJlc29sdmUoKTsgLy8gRG9uZVxuXHRcdFx0XHR9O1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKCB0aGlzLmVsZW1lbnQsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlM2QoICR7IGhvcml6b250YWxQb3NpdGlvbiB9LCAkeyBuZXdFbGVtZW50U2hpZnQgfXB4LCAwIClgICk7XG5cdFx0XHRcdHRoaXMuZWxlbWVudFNoaWZ0ID0gbmV3RWxlbWVudFNoaWZ0O1xuXHRcdFx0XHRyZXNvbHZlKCk7IC8vIERvbmVcblx0XHRcdH1cblxuXHRcdH0gKTtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBjbGljayBvbiBkaXNtaXNzIGJ1dHRvblxuXHQgKi9cblx0cHVibGljIG9uQ2xpY2tEaXNtaXNzKCk6IHZvaWQge1xuXHRcdHRoaXMuZGlzbWlzcy5lbWl0KCB0aGlzLm5vdGlmaWNhdGlvbi5pZCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBtb3VzZW92ZXIgb3ZlciBub3RpZmljYXRpb24gYXJlYVxuXHQgKi9cblx0cHVibGljIG9uTm90aWZpY2F0aW9uTW91c2VvdmVyKCk6IHZvaWQge1xuXHRcdGlmICggdGhpcy5jb25maWcuYmVoYXZpb3VyLm9uTW91c2VvdmVyID09PSAncGF1c2VBdXRvSGlkZScgKSB7XG5cdFx0XHR0aGlzLnBhdXNlQXV0b0hpZGVUaW1lcigpO1xuXHRcdH0gZWxzZSBpZiAoIHRoaXMuY29uZmlnLmJlaGF2aW91ci5vbk1vdXNlb3ZlciA9PT0gJ3Jlc2V0QXV0b0hpZGUnICkge1xuXHRcdFx0dGhpcy5zdG9wQXV0b0hpZGVUaW1lcigpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgbW91c2VvdXQgZnJvbSBub3RpZmljYXRpb24gYXJlYVxuXHQgKi9cblx0cHVibGljIG9uTm90aWZpY2F0aW9uTW91c2VvdXQoKTogdm9pZCB7XG5cdFx0aWYgKCB0aGlzLmNvbmZpZy5iZWhhdmlvdXIub25Nb3VzZW92ZXIgPT09ICdwYXVzZUF1dG9IaWRlJyApIHtcblx0XHRcdHRoaXMuY29udGludWVBdXRvSGlkZVRpbWVyKCk7XG5cdFx0fSBlbHNlIGlmICggdGhpcy5jb25maWcuYmVoYXZpb3VyLm9uTW91c2VvdmVyID09PSAncmVzZXRBdXRvSGlkZScgKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXV0b0hpZGVUaW1lcigpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgY2xpY2sgb24gbm90aWZpY2F0aW9uIGFyZWFcblx0ICovXG5cdHB1YmxpYyBvbk5vdGlmaWNhdGlvbkNsaWNrKCk6IHZvaWQge1xuXHRcdGlmICggdGhpcy5jb25maWcuYmVoYXZpb3VyLm9uQ2xpY2sgPT09ICdoaWRlJyApIHtcblx0XHRcdHRoaXMub25DbGlja0Rpc21pc3MoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU3RhcnQgdGhlIGF1dG8gaGlkZSB0aW1lciAoaWYgZW5hYmxlZClcblx0ICovXG5cdHByaXZhdGUgc3RhcnRBdXRvSGlkZVRpbWVyKCk6IHZvaWQge1xuXHRcdGlmICggdGhpcy5jb25maWcuYmVoYXZpb3VyLmF1dG9IaWRlICE9PSBmYWxzZSAmJiB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuYXV0b0hpZGUgPiAwICkge1xuXHRcdFx0dGhpcy50aW1lclNlcnZpY2Uuc3RhcnQoIHRoaXMuY29uZmlnLmJlaGF2aW91ci5hdXRvSGlkZSApLnRoZW4oICgpID0+IHtcblx0XHRcdFx0dGhpcy5vbkNsaWNrRGlzbWlzcygpO1xuXHRcdFx0fSApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBQYXVzZSB0aGUgYXV0byBoaWRlIHRpbWVyIChpZiBlbmFibGVkKVxuXHQgKi9cblx0cHJpdmF0ZSBwYXVzZUF1dG9IaWRlVGltZXIoKTogdm9pZCB7XG5cdFx0aWYgKCB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuYXV0b0hpZGUgIT09IGZhbHNlICYmIHRoaXMuY29uZmlnLmJlaGF2aW91ci5hdXRvSGlkZSA+IDAgKSB7XG5cdFx0XHR0aGlzLnRpbWVyU2VydmljZS5wYXVzZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb250aW51ZSB0aGUgYXV0byBoaWRlIHRpbWVyIChpZiBlbmFibGVkKVxuXHQgKi9cblx0cHJpdmF0ZSBjb250aW51ZUF1dG9IaWRlVGltZXIoKTogdm9pZCB7XG5cdFx0aWYgKCB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuYXV0b0hpZGUgIT09IGZhbHNlICYmIHRoaXMuY29uZmlnLmJlaGF2aW91ci5hdXRvSGlkZSA+IDAgKSB7XG5cdFx0XHR0aGlzLnRpbWVyU2VydmljZS5jb250aW51ZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTdG9wIHRoZSBhdXRvIGhpZGUgdGltZXIgKGlmIGVuYWJsZWQpXG5cdCAqL1xuXHRwcml2YXRlIHN0b3BBdXRvSGlkZVRpbWVyKCk6IHZvaWQge1xuXHRcdGlmICggdGhpcy5jb25maWcuYmVoYXZpb3VyLmF1dG9IaWRlICE9PSBmYWxzZSAmJiB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuYXV0b0hpZGUgPiAwICkge1xuXHRcdFx0dGhpcy50aW1lclNlcnZpY2Uuc3RvcCgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsIG5vdGlmaWNhdGlvbiBzZXR1cFxuXHQgKi9cblx0cHJpdmF0ZSBzZXR1cCgpOiB2b2lkIHtcblxuXHRcdC8vIFNldCBzdGFydCBwb3NpdGlvbiAoaW5pdGlhbGx5IHRoZSBleGFjdCBzYW1lIGZvciBldmVyeSBuZXcgbm90aWZpY2F0aW9uKVxuXHRcdGlmICggdGhpcy5jb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5wb3NpdGlvbiA9PT0gJ2xlZnQnICkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSggdGhpcy5lbGVtZW50LCAnbGVmdCcsIGAkeyB0aGlzLmNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weGAgKTtcblx0XHR9IGVsc2UgaWYgKCB0aGlzLmNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLnBvc2l0aW9uID09PSAncmlnaHQnICkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSggdGhpcy5lbGVtZW50LCAncmlnaHQnLCBgJHsgdGhpcy5jb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5kaXN0YW5jZSB9cHhgICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoIHRoaXMuZWxlbWVudCwgJ2xlZnQnLCAnNTAlJyApO1xuXHRcdFx0Ly8gTGV0J3MgZ2V0IHRoZSBHUFUgaGFuZGxlIHNvbWUgd29yayBhcyB3ZWxsICgjcGVyZm1hdHRlcnMpXG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKCB0aGlzLmVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoIC01MCUsIDAsIDAgKScgKTtcblx0XHR9XG5cdFx0aWYgKCB0aGlzLmNvbmZpZy5wb3NpdGlvbi52ZXJ0aWNhbC5wb3NpdGlvbiA9PT0gJ3RvcCcgKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKCB0aGlzLmVsZW1lbnQsICd0b3AnLCBgJHsgdGhpcy5jb25maWcucG9zaXRpb24udmVydGljYWwuZGlzdGFuY2UgfXB4YCApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKCB0aGlzLmVsZW1lbnQsICdib3R0b20nLCBgJHsgdGhpcy5jb25maWcucG9zaXRpb24udmVydGljYWwuZGlzdGFuY2UgfXB4YCApO1xuXHRcdH1cblxuXHRcdC8vIEFkZCBjbGFzc2VzIChyZXNwb25zaWJsZSBmb3IgdmlzdWFsIGRlc2lnbilcblx0XHR0aGlzLnJlbmRlcmVyLmFkZENsYXNzKCB0aGlzLmVsZW1lbnQsIGBub3RpZmllcl9fbm90aWZpY2F0aW9uLS0keyB0aGlzLm5vdGlmaWNhdGlvbi50eXBlIH1gICk7XG5cdFx0dGhpcy5yZW5kZXJlci5hZGRDbGFzcyggdGhpcy5lbGVtZW50LCBgbm90aWZpZXJfX25vdGlmaWNhdGlvbi0tJHsgdGhpcy5jb25maWcudGhlbWUgfWAgKTtcblxuXHR9XG5cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJub3RpZmljYXRpb24udGVtcGxhdGU7IGVsc2UgcHJlZGVmaW5lZE5vdGlmaWNhdGlvblwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm5vdGlmaWNhdGlvbi50ZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IG5vdGlmaWNhdGlvbjogbm90aWZpY2F0aW9uIH1cIj5cbjwvbmctY29udGFpbmVyPlxuXG48bmctdGVtcGxhdGUgI3ByZWRlZmluZWROb3RpZmljYXRpb24+XG5cdDxwIGNsYXNzPVwibm90aWZpZXJfX25vdGlmaWNhdGlvbi1tZXNzYWdlXCI+e3sgbm90aWZpY2F0aW9uLm1lc3NhZ2UgfX08L3A+XG5cdDxidXR0b24gY2xhc3M9XCJub3RpZmllcl9fbm90aWZpY2F0aW9uLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiB0aXRsZT1cImRpc21pc3NcIiAqbmdJZj1cImNvbmZpZy5iZWhhdmlvdXIuc2hvd0Rpc21pc3NCdXR0b25cIiAoY2xpY2spPVwib25DbGlja0Rpc21pc3MoKVwiPlxuXHRcdDxzdmcgY2xhc3M9XCJub3RpZmllcl9fbm90aWZpY2F0aW9uLWJ1dHRvbi1pY29uXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiPlxuXHRcdFx0PHBhdGggZD1cIk0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6XCIgLz5cblx0XHQ8L3N2Zz5cblx0PC9idXR0b24+XG48L25nLXRlbXBsYXRlPlxuIl19