import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotifierNotification } from '../models/notifier-notification.model';
import * as i0 from "@angular/core";
import * as i1 from "../services/notifier-queue.service";
import * as i2 from "../services/notifier.service";
import * as i3 from "@angular/common";
import * as i4 from "./notifier-notification.component";
function NotifierContainerComponent_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 1);
    i0.ɵɵelementStart(1, "notifier-notification", 2);
    i0.ɵɵlistener("ready", function NotifierContainerComponent_li_1_Template_notifier_notification_ready_1_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.onNotificationReady($event); })("dismiss", function NotifierContainerComponent_li_1_Template_notifier_notification_dismiss_1_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.onNotificationDismiss($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const notification_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("notification", notification_r1);
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
export class NotifierContainerComponent {
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
/** @nocollapse */ NotifierContainerComponent.ɵfac = function NotifierContainerComponent_Factory(t) { return new (t || NotifierContainerComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.NotifierQueueService), i0.ɵɵdirectiveInject(i2.NotifierService)); };
/** @nocollapse */ NotifierContainerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NotifierContainerComponent, selectors: [["notifier-container"]], hostAttrs: [1, "notifier__container"], decls: 2, vars: 2, consts: [["class", "notifier__container-list", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "notifier__container-list"], [3, "notification", "ready", "dismiss"]], template: function NotifierContainerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ul");
        i0.ɵɵtemplate(1, NotifierContainerComponent_li_1_Template, 2, 1, "li", 0);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.notifications)("ngForTrackBy", ctx.identifyNotification);
    } }, directives: [i3.NgForOf, i4.NotifierNotificationComponent], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NotifierContainerComponent, [{
        type: Component,
        args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'notifier__container'
                },
                selector: 'notifier-container',
                templateUrl: './notifier-container.component.html'
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NotifierQueueService }, { type: i2.NotifierService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9tc2l2YWRlL0Rldi9wcm9qZWN0cy9hbmd1bGFyLW5vdGlmaWVyL3Byb2plY3RzL2FuZ3VsYXItbm90aWZpZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbm90aWZpZXItY29udGFpbmVyLmNvbXBvbmVudC50cyIsImxpYi9jb21wb25lbnRzL25vdGlmaWVyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQXFCLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQU1qRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7Ozs7Ozs7SUNMNUUsNkJBQ0M7SUFBQSxnREFJd0I7SUFGdkIsaU9BQXVDLDBOQUFBO0lBRXhDLGlCQUF3QjtJQUN6QixpQkFBSzs7O0lBSkgsZUFBNkI7SUFBN0IsOENBQTZCOztBRFFoQzs7Ozs7Ozs7Ozs7O0dBWUc7QUFTSCxNQUFNLE9BQU8sMEJBQTBCO0lBZ0N0Qzs7Ozs7O09BTUc7SUFDSCxZQUFvQixjQUFpQyxFQUFFLG9CQUEwQyxFQUFFLGVBQWdDO1FBQ2xJLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsb0JBQW9CLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFFeEIsK0VBQStFO1FBQy9FLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUUsQ0FBRSxNQUFzQixFQUFHLEVBQUU7WUFDdEcsSUFBSSxDQUFDLFlBQVksQ0FBRSxNQUFNLENBQUUsQ0FBQyxJQUFJLENBQUUsR0FBRyxF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QUMsYUFBYSxDQUFDLFNBQVMsQ0FBRSxDQUFFLG1CQUF5QyxFQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEtBQUssY0FBYyxDQUFFLENBQUM7UUFDNUgsT0FBTyxDQUFFLGlCQUFpQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFFLENBQUM7SUFDckUsQ0FBQzs7dUhBNWRXLDBCQUEwQjtrRkFBMUIsMEJBQTBCO1FDaEN2QywwQkFDQztRQUFBLHlFQUNDO1FBTUYsaUJBQUs7O1FBUGlDLGVBQTBFO1FBQTFFLDJDQUEwRSwwQ0FBQTs7a0REK0JuRywwQkFBMEI7Y0FSdEMsU0FBUztlQUFFO2dCQUNYLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxJQUFJLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLHFCQUFxQjtpQkFDNUI7Z0JBQ0QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsV0FBVyxFQUFFLHFDQUFxQzthQUNsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE5vdGlmaWVyQWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLWFjdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllckNvbmZpZyB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1jb25maWcubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpZXJOb3RpZmljYXRpb24gfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItbm90aWZpY2F0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5vdGlmaWVyUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbm90aWZpZXItcXVldWUuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmllclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9ub3RpZmllci5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWVyTm90aWZpY2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9ub3RpZmllci1ub3RpZmljYXRpb24uY29tcG9uZW50JztcblxuLyoqXG4gKiBOb3RpZmllciBjb250YWluZXIgY29tcG9uZW50XG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUaGlzIGNvbXBvbmVudCBhY3RzIGFzIGEgd3JhcHBlciBmb3IgYWxsIG5vdGlmaWNhdGlvbiBjb21wb25lbnRzOyBjb25zZXF1ZW50bHksIGl0IGlzIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhIG5ldyBub3RpZmljYXRpb25cbiAqIGNvbXBvbmVudCBhbmQgcmVtb3ZpbmcgYW4gZXhpc3Rpbmcgbm90aWZpY2F0aW9uIGNvbXBvbmVudC4gQmVpbmcgbW9yZSBwcmVjaWNlbHksIGl0IGFsc28gaGFuZGxlcyBzaWRlIGVmZmVjdHMgb2YgdGhvc2UgYWN0aW9ucywgc3VjaCBhc1xuICogc2hpZnRpbmcgb3IgZXZlbiBjb21wbGV0ZWx5IHJlbW92aW5nIG90aGVyIG5vdGlmaWNhdGlvbnMgYXMgd2VsbC4gT3ZlcmFsbCwgdGhpcyBjb21wb25lbnRzIGhhbmRsZXMgYWN0aW9ucyBjb21pbmcgZnJvbSB0aGUgcXVldWUgc2VydmljZVxuICogYnkgc3Vic2NyaWJpbmcgdG8gaXRzIGFjdGlvbiBzdHJlYW0uXG4gKlxuICogVGVjaG5pY2FsIHNpZGVub3RlOlxuICogVGhpcyBjb21wb25lbnQgaGFzIHRvIGJlIHVzZWQgc29tZXdoZXJlIGluIGFuIGFwcGxpY2F0aW9uIHRvIHdvcms7IGl0IHdpbGwgbm90IGluamVjdCBhbmQgY3JlYXRlIGl0c2VsZiBhdXRvbWF0aWNhbGx5LCBwcmltYXJpbHkgaW4gb3JkZXJcbiAqIHRvIG5vdCBicmVhayB0aGUgQW5ndWxhciBBb1QgY29tcGlsYXRpb24uIE1vcmVvdmVyLCB0aGlzIGNvbXBvbmVudCAoYW5kIGFsc28gdGhlIG5vdGlmaWNhdGlvbiBjb21wb25lbnRzKSBzZXQgdGhlaXIgY2hhbmdlIGRldGVjdGlvblxuICogc3RyYXRlZ3kgb25QdXNoLCB3aGljaCBtZWFucyB0aGF0IHdlIGhhbmRsZSBjaGFuZ2UgZGV0ZWN0aW9uIG1hbnVhbGx5IGluIG9yZGVyIHRvIGdldCB0aGUgYmVzdCBwZXJmb3JtYW5jZS4gKCNwZXJmbWF0dGVycylcbiAqL1xuQENvbXBvbmVudCgge1xuXHRjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCwgLy8gKCNwZXJmbWF0dGVycylcblx0aG9zdDoge1xuXHRcdGNsYXNzOiAnbm90aWZpZXJfX2NvbnRhaW5lcidcblx0fSxcblx0c2VsZWN0b3I6ICdub3RpZmllci1jb250YWluZXInLFxuXHR0ZW1wbGF0ZVVybDogJy4vbm90aWZpZXItY29udGFpbmVyLmNvbXBvbmVudC5odG1sJ1xufSApXG5leHBvcnQgY2xhc3MgTm90aWZpZXJDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG5cdC8qKlxuXHQgKiBMaXN0IG9mIGN1cnJlbnRseSBzb21ld2hhdCBhY3RpdmUgbm90aWZpY2F0aW9uc1xuXHQgKi9cblx0cHVibGljIG5vdGlmaWNhdGlvbnM6IEFycmF5PE5vdGlmaWVyTm90aWZpY2F0aW9uPjtcblxuXHQvKipcblx0ICogQ2hhbmdlIGRldGVjdG9yXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZjtcblxuXHQvKipcblx0ICogTm90aWZpZXIgcXVldWUgc2VydmljZVxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBxdWV1ZVNlcnZpY2U6IE5vdGlmaWVyUXVldWVTZXJ2aWNlO1xuXG5cdC8qKlxuXHQgKiBOb3RpZmllciBjb25maWd1cmF0aW9uXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogTm90aWZpZXJDb25maWc7XG5cblx0LyoqXG5cdCAqIFF1ZXVlIHNlcnZpY2Ugb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gKHNhdmVkIGZvciBjbGVhbnVwKVxuXHQgKi9cblx0cHJpdmF0ZSBxdWV1ZVNlcnZpY2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuXHQvKipcblx0ICogUHJvbWlzZSByZXNvbHZlIGZ1bmN0aW9uIHJlZmVyZW5jZSwgdGVtcG9yYXJpbHkgdXNlZCB3aGlsZSB0aGUgbm90aWZpY2F0aW9uIGNoaWxkIGNvbXBvbmVudCBnZXRzIGNyZWF0ZWRcblx0ICovXG5cdHByaXZhdGUgdGVtcFByb21pc2VSZXNvbHZlcjogKCkgPT4gdm9pZDtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIGNoYW5nZURldGVjdG9yICAgICAgIENoYW5nZSBkZXRlY3RvciwgdXNlZCBmb3IgbWFudWFsbHkgdHJpZ2dlcmluZyBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnNcblx0ICogQHBhcmFtIG5vdGlmaWVyUXVldWVTZXJ2aWNlIE5vdGlmaWVyIHF1ZXVlIHNlcnZpY2Vcblx0ICogQHBhcmFtIG5vdGlmaWVyU2VydmljZSAgICAgIE5vdGlmaWVyIHNlcnZpY2Vcblx0ICovXG5cdHB1YmxpYyBjb25zdHJ1Y3RvciggY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLCBub3RpZmllclF1ZXVlU2VydmljZTogTm90aWZpZXJRdWV1ZVNlcnZpY2UsIG5vdGlmaWVyU2VydmljZTogTm90aWZpZXJTZXJ2aWNlICkge1xuXHRcdHRoaXMuY2hhbmdlRGV0ZWN0b3IgPSBjaGFuZ2VEZXRlY3Rvcjtcblx0XHR0aGlzLnF1ZXVlU2VydmljZSA9IG5vdGlmaWVyUXVldWVTZXJ2aWNlO1xuXHRcdHRoaXMuY29uZmlnID0gbm90aWZpZXJTZXJ2aWNlLmdldENvbmZpZygpO1xuXHRcdHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xuXG5cdFx0Ly8gQ29ubmVjdHMgdGhpcyBjb21wb25lbnQgdXAgdG8gdGhlIGFjdGlvbiBxdWV1ZSwgdGhlbiBoYW5kbGUgaW5jb21pbmcgYWN0aW9uc1xuXHRcdHRoaXMucXVldWVTZXJ2aWNlU3Vic2NyaXB0aW9uID0gdGhpcy5xdWV1ZVNlcnZpY2UuYWN0aW9uU3RyZWFtLnN1YnNjcmliZSggKCBhY3Rpb246IE5vdGlmaWVyQWN0aW9uICkgPT4ge1xuXHRcdFx0dGhpcy5oYW5kbGVBY3Rpb24oIGFjdGlvbiApLnRoZW4oICgpID0+IHtcblx0XHRcdFx0dGhpcy5xdWV1ZVNlcnZpY2UuY29udGludWUoKTtcblx0XHRcdH0gKTtcblx0XHR9ICk7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wb25lbnQgZGVzdHJveW1lbnQgbGlmZWN5Y2xlIGhvb2ssIGNsZWFucyB1cCB0aGUgb2JzZXJ2YWJsZSBzdWJzY2lwdGlvblxuXHQgKi9cblx0cHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuXHRcdGlmICggdGhpcy5xdWV1ZVNlcnZpY2VTdWJzY3JpcHRpb24gKSB7XG5cdFx0XHR0aGlzLnF1ZXVlU2VydmljZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBOb3RpZmljYXRpb24gaWRlbnRpZmllciwgdXNlZCBhcyB0aGUgbmdGb3IgdHJhY2tieSBmdW5jdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0gICBpbmRleCAgICAgICAgSW5kZXhcblx0ICogQHBhcmFtICAgbm90aWZpY2F0aW9uIE5vdGlmaWVyIG5vdGlmaWNhdGlvblxuXHQgKiBAcmV0dXJucyBOb3RpZmljYXRpb24gSUQgYXMgdGhlIHVuaXF1ZSBpZGVudG5maWVyXG5cdCAqL1xuXHRwdWJsaWMgaWRlbnRpZnlOb3RpZmljYXRpb24oIGluZGV4OiBudW1iZXIsIG5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gbm90aWZpY2F0aW9uLmlkO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV2ZW50IGhhbmRsZXIsIGhhbmRsZXMgY2xpY2tzIG9uIG5vdGlmaWNhdGlvbiBkaXNtaXNzIGJ1dHRvbnNcblx0ICpcblx0ICogQHBhcmFtIG5vdGlmaWNhdGlvbklkIElEIG9mIHRoZSBub3RpZmljYXRpb24gdG8gZGlzbWlzc1xuXHQgKi9cblx0cHVibGljIG9uTm90aWZpY2F0aW9uRGlzbWlzcyggbm90aWZpY2F0aW9uSWQ6IHN0cmluZyApOiB2b2lkIHtcblx0XHR0aGlzLnF1ZXVlU2VydmljZS5wdXNoKCB7XG5cdFx0XHRwYXlsb2FkOiBub3RpZmljYXRpb25JZCxcblx0XHRcdHR5cGU6ICdISURFJ1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFdmVudCBoYW5kbGVyLCBoYW5kbGVzIG5vdGlmaWNhdGlvbiByZWFkeSBldmVudHNcblx0ICpcblx0ICogQHBhcmFtIG5vdGlmaWNhdGlvbkNvbXBvbmVudCBOb3RpZmljYXRpb24gY29tcG9uZW50IHJlZmVyZW5jZVxuXHQgKi9cblx0cHVibGljIG9uTm90aWZpY2F0aW9uUmVhZHkoIG5vdGlmaWNhdGlvbkNvbXBvbmVudDogTm90aWZpZXJOb3RpZmljYXRpb25Db21wb25lbnQgKTogdm9pZCB7XG5cdFx0bGV0IGN1cnJlbnROb3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uID0gdGhpcy5ub3RpZmljYXRpb25zWyB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoIC0gMSBdOyAvLyBHZXQgdGhlIGxhdGVzdCBub3RpZmljYXRpb25cblx0XHRjdXJyZW50Tm90aWZpY2F0aW9uLmNvbXBvbmVudCA9IG5vdGlmaWNhdGlvbkNvbXBvbmVudDsgLy8gU2F2ZSB0aGUgbmV3IG9tcG9uZW50IHJlZmVyZW5jZVxuXHRcdHRoaXMuY29udGludWVIYW5kbGVTaG93QWN0aW9uKCBjdXJyZW50Tm90aWZpY2F0aW9uICk7IC8vIENvbnRpbnVlIHdpdGggaGFuZGxpbmcgdGhlIHNob3cgYWN0aW9uXG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGluY29taW5nIGFjdGlvbnMgYnkgbWFwcGluZyBhY3Rpb24gdHlwZXMgdG8gbWV0aG9kcywgYW5kIHRoZW4gcnVubmluZyB0aGVtXG5cdCAqXG5cdCAqIEBwYXJhbSAgIGFjdGlvbiBBY3Rpb24gb2JqZWN0XG5cdCAqIEByZXR1cm5zIFByb21pc2UsIHJlc29sdmVkIHdoZW4gZG9uZVxuXHQgKi9cblx0cHJpdmF0ZSBoYW5kbGVBY3Rpb24oIGFjdGlvbjogTm90aWZpZXJBY3Rpb24gKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcblx0XHRzd2l0Y2ggKCBhY3Rpb24udHlwZSApIHsgLy8gVE9ETzogTWF5YmUgYSBtYXAgKGFjdGlvblR5cGUgLT4gY2xhc3MgbWV0aG9kKSBpcyBhIGNsZWFuZXIgc29sdXRpb24gaGVyZT9cblx0XHRcdGNhc2UgJ1NIT1cnOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5oYW5kbGVTaG93QWN0aW9uKCBhY3Rpb24gKTtcblx0XHRcdGNhc2UgJ0hJREUnOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5oYW5kbGVIaWRlQWN0aW9uKCBhY3Rpb24gKTtcblx0XHRcdGNhc2UgJ0hJREVfT0xERVNUJzpcblx0XHRcdFx0cmV0dXJuIHRoaXMuaGFuZGxlSGlkZU9sZGVzdEFjdGlvbiggYWN0aW9uICk7XG5cdFx0XHRjYXNlICdISURFX05FV0VTVCc6XG5cdFx0XHRcdHJldHVybiB0aGlzLmhhbmRsZUhpZGVOZXdlc3RBY3Rpb24oIGFjdGlvbiApO1xuXHRcdFx0Y2FzZSAnSElERV9BTEwnOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5oYW5kbGVIaWRlQWxsQWN0aW9uKCBhY3Rpb24gKTtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblx0XHRcdFx0XHRyZXNvbHZlKCk7IC8vIElnbm9yZSB1bmtub3duIGFjdGlvbiB0eXBlc1xuXHRcdFx0XHR9ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNob3cgYSBuZXcgbm90aWZpY2F0aW9uXG5cdCAqXG5cdCAqIFdlIHNpbXBseSBhZGQgdGhlIG5vdGlmaWNhdGlvbiB0byB0aGUgbGlzdCwgYW5kIHRoZW4gd2FpdCB1bnRpbCBpdHMgcHJvcGVybHkgaW5pdGlhbGl6ZWQgLyBjcmVhdGVkIC8gcmVuZGVyZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSAgIGFjdGlvbiBBY3Rpb24gb2JqZWN0XG5cdCAqIEByZXR1cm5zIFByb21pc2UsIHJlc29sdmVkIHdoZW4gZG9uZVxuXHQgKi9cblx0cHJpdmF0ZSBoYW5kbGVTaG93QWN0aW9uKCBhY3Rpb246IE5vdGlmaWVyQWN0aW9uICk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXHRcdFx0dGhpcy50ZW1wUHJvbWlzZVJlc29sdmVyID0gcmVzb2x2ZTsgLy8gU2F2ZSB0aGUgcHJvbWlzZSByZXNvbHZlIGZ1bmN0aW9uIHNvIHRoYXQgaXQgY2FuIGJlIGNhbGxlZCBsYXRlciBvbiBieSBhbm90aGVyIG1ldGhvZFxuXHRcdFx0dGhpcy5hZGROb3RpZmljYXRpb25Ub0xpc3QoIG5ldyBOb3RpZmllck5vdGlmaWNhdGlvbiggYWN0aW9uLnBheWxvYWQgKSApO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb250aW51ZSB0byBzaG93IGEgbmV3IG5vdGlmaWNhdGlvbiAoYWZ0ZXIgdGhlIG5vdGlmaWNhdGlvbiBjb21wb25lbnRzIGlzIGluaXRpYWxpemVkIC8gY3JlYXRlZCAvIHJlbmRlcmVkKS5cblx0ICpcblx0ICogSWYgdGhpcyBpcyB0aGUgZmlyc3QgKGFuZCB0aHVzIG9ubHkpIG5vdGlmaWNhdGlvbiwgd2UgY2FuIHNpbXBseSBzaG93IGl0LiBPdGhlcndoaXNlLCBpZiBzdGFja2luZyBpcyBkaXNhYmxlZCAob3IgYSBsb3cgdmFsdWUpLCB3ZVxuXHQgKiBzd2l0Y2ggb3V0IG5vdGlmaWNhdGlvbnMsIGluIHBhcnRpY3VsYXIgd2UgaGlkZSB0aGUgZXhpc3Rpbmcgb25lLCBhbmQgdGhlbiBzaG93IG91ciBuZXcgb25lLiBZZXQsIGlmIHN0YWNraW5nIGlzIGVuYWJsZWQsIHdlIGZpcnN0XG5cdCAqIHNoaWZ0IGFsbCBvbGRlciBub3RpZmljYXRpb25zLCBhbmQgdGhlbiBzaG93IG91ciBuZXcgbm90aWZpY2F0aW9uLiBJbiBhZGRpdGlvbiwgaWYgdGhlcmUgYXJlIHRvbyBtYW55IG5vdGlmaWNhdGlvbiBvbiB0aGUgc2NyZWVuLFxuXHQgKiB3ZSBoaWRlIHRoZSBvbGRlc3Qgb25lIGZpcnN0LiBGdXJ0aGVybW9yZSwgaWYgY29uZmlndXJlZCwgYW5pbWF0aW9uIG92ZXJsYXBwaW5nIGlzIGFwcGxpZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSBub3RpZmljYXRpb24gTmV3IG5vdGlmaWNhdGlvbiB0byBzaG93XG5cdCAqL1xuXHRwcml2YXRlIGNvbnRpbnVlSGFuZGxlU2hvd0FjdGlvbiggbm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiApOiB2b2lkIHtcblxuXHRcdC8vIEZpcnN0ICh3aGljaCBtZWFucyBvbmx5IG9uZSkgbm90aWZpY2F0aW9uIGluIHRoZSBsaXN0P1xuXHRcdGNvbnN0IG51bWJlck9mTm90aWZpY2F0aW9uczogbnVtYmVyID0gdGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aDtcblx0XHRpZiAoIG51bWJlck9mTm90aWZpY2F0aW9ucyA9PT0gMSApIHtcblx0XHRcdG5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2hvdygpLnRoZW4oIHRoaXMudGVtcFByb21pc2VSZXNvbHZlciApOyAvLyBEb25lXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc3QgaW1wbGljaXRTdGFja2luZ0xpbWl0OiBudW1iZXIgPSAyO1xuXG5cdFx0XHQvLyBTdGFja2luZyBlbmFibGVkPyAoc3RhY2tpbmcgdmFsdWUgYmVsb3cgMiBtZWFucyBzdGFja2luZyBpcyBkaXNhYmxlZClcblx0XHRcdGlmICggdGhpcy5jb25maWcuYmVoYXZpb3VyLnN0YWNraW5nID09PSBmYWxzZSB8fCB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuc3RhY2tpbmcgPCBpbXBsaWNpdFN0YWNraW5nTGltaXQgKSB7XG5cdFx0XHRcdHRoaXMubm90aWZpY2F0aW9uc1sgMCBdLmNvbXBvbmVudC5oaWRlKCkudGhlbiggKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucmVtb3ZlTm90aWZpY2F0aW9uRnJvbUxpc3QoIHRoaXMubm90aWZpY2F0aW9uc1sgMCBdICk7XG5cdFx0XHRcdFx0bm90aWZpY2F0aW9uLmNvbXBvbmVudC5zaG93KCkudGhlbiggdGhpcy50ZW1wUHJvbWlzZVJlc29sdmVyICk7IC8vIERvbmVcblx0XHRcdFx0fSApO1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRjb25zdCBzdGVwUHJvbWlzZXM6IEFycmF5PFByb21pc2U8dW5kZWZpbmVkPj4gPSBbXTtcblxuXHRcdFx0XHQvLyBBcmUgdGhlcmUgbm93IHRvbyBtYW55IG5vdGlmaWNhdGlvbnM/XG5cdFx0XHRcdGlmICggbnVtYmVyT2ZOb3RpZmljYXRpb25zID4gdGhpcy5jb25maWcuYmVoYXZpb3VyLnN0YWNraW5nICkge1xuXG5cdFx0XHRcdFx0Y29uc3Qgb2xkTm90aWZpY2F0aW9uczogQXJyYXk8Tm90aWZpZXJOb3RpZmljYXRpb24+ID0gdGhpcy5ub3RpZmljYXRpb25zLnNsaWNlKCAxLCBudW1iZXJPZk5vdGlmaWNhdGlvbnMgLSAxICk7XG5cblx0XHRcdFx0XHQvLyBBcmUgYW5pbWF0aW9ucyBlbmFibGVkP1xuXHRcdFx0XHRcdGlmICggdGhpcy5jb25maWcuYW5pbWF0aW9ucy5lbmFibGVkICkge1xuXG5cdFx0XHRcdFx0XHQvLyBJcyBhbmltYXRpb24gb3ZlcmxhcCBlbmFibGVkP1xuXHRcdFx0XHRcdFx0aWYgKCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgIT09IGZhbHNlICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMub3ZlcmxhcCA+IDAgKSB7XG5cdFx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLm5vdGlmaWNhdGlvbnNbIDAgXS5jb21wb25lbnQuaGlkZSgpICk7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggdGhpcy5zaGlmdE5vdGlmaWNhdGlvbnMoIG9sZE5vdGlmaWNhdGlvbnMsIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0SGVpZ2h0KCksIHRydWUgKSApO1xuXHRcdFx0XHRcdFx0XHR9LCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmhpZGUuc3BlZWQgLSB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgKTtcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCBub3RpZmljYXRpb24uY29tcG9uZW50LnNob3coKSApO1xuXHRcdFx0XHRcdFx0XHR9LCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmhpZGUuc3BlZWQgKyB0aGlzLmNvbmZpZy5hbmltYXRpb25zLnNoaWZ0LnNwZWVkIC0gdGhpcy5jb25maWcuYW5pbWF0aW9ucy5vdmVybGFwICk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbmV3IFByb21pc2U8dW5kZWZpbmVkPiggKCByZXNvbHZlOiAoKSA9PiB2b2lkLCByZWplY3Q6ICgpID0+IHZvaWQgKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5ub3RpZmljYXRpb25zWyAwIF0uY29tcG9uZW50LmhpZGUoKS50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnNoaWZ0Tm90aWZpY2F0aW9ucyggb2xkTm90aWZpY2F0aW9ucywgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRIZWlnaHQoKSwgdHJ1ZSApLnRoZW4oICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bm90aWZpY2F0aW9uLmNvbXBvbmVudC5zaG93KCkudGhlbiggcmVzb2x2ZSApO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdFx0fSApICk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIHRoaXMubm90aWZpY2F0aW9uc1sgMCBdLmNvbXBvbmVudC5oaWRlKCkgKTtcblx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLnNoaWZ0Tm90aWZpY2F0aW9ucyggb2xkTm90aWZpY2F0aW9ucywgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRIZWlnaHQoKSwgdHJ1ZSApICk7XG5cdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbm90aWZpY2F0aW9uLmNvbXBvbmVudC5zaG93KCkgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdGNvbnN0IG9sZE5vdGlmaWNhdGlvbnM6IEFycmF5PE5vdGlmaWVyTm90aWZpY2F0aW9uPiA9IHRoaXMubm90aWZpY2F0aW9ucy5zbGljZSggMCwgbnVtYmVyT2ZOb3RpZmljYXRpb25zIC0gMSApO1xuXG5cdFx0XHRcdFx0Ly8gQXJlIGFuaW1hdGlvbnMgZW5hYmxlZD9cblx0XHRcdFx0XHRpZiAoIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuZW5hYmxlZCApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSXMgYW5pbWF0aW9uIG92ZXJsYXAgZW5hYmxlZD9cblx0XHRcdFx0XHRcdGlmICggdGhpcy5jb25maWcuYW5pbWF0aW9ucy5vdmVybGFwICE9PSBmYWxzZSAmJiB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgPiAwICkge1xuXHRcdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggdGhpcy5zaGlmdE5vdGlmaWNhdGlvbnMoIG9sZE5vdGlmaWNhdGlvbnMsIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0SGVpZ2h0KCksIHRydWUgKSApO1xuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2hvdygpICk7XG5cdFx0XHRcdFx0XHRcdH0sIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuc2hpZnQuc3BlZWQgLSB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNoaWZ0Tm90aWZpY2F0aW9ucyggb2xkTm90aWZpY2F0aW9ucywgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRIZWlnaHQoKSwgdHJ1ZSApLnRoZW4oICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdG5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2hvdygpLnRoZW4oIHJlc29sdmUgKTtcblx0XHRcdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0XHRcdH0gKSApO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLnNoaWZ0Tm90aWZpY2F0aW9ucyggb2xkTm90aWZpY2F0aW9ucywgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRIZWlnaHQoKSwgdHJ1ZSApICk7XG5cdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbm90aWZpY2F0aW9uLmNvbXBvbmVudC5zaG93KCkgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdFByb21pc2UuYWxsKCBzdGVwUHJvbWlzZXMgKS50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCBudW1iZXJPZk5vdGlmaWNhdGlvbnMgPiB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuc3RhY2tpbmcgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJlbW92ZU5vdGlmaWNhdGlvbkZyb21MaXN0KCB0aGlzLm5vdGlmaWNhdGlvbnNbIDAgXSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLnRlbXBQcm9taXNlUmVzb2x2ZXIoKTtcblx0XHRcdFx0fSApOyAvLyBEb25lXG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0LyoqXG5cdCAqIEhpZGUgYW4gZXhpc3Rpbmcgbm90aWZpY2F0aW9uXG5cdCAqXG5cdCAqIEZpc3QsIHdlIHNraXAgZXZlcnl0aGluZyBpZiB0aGVyZSBhcmUgbm8gbm90aWZpY2F0aW9ucyBhdCBhbGwsIG9yIHRoZSBnaXZlbiBub3RpZmljYXRpb24gZG9lcyBub3QgZXhpc3QuIFRoZW4sIHdlIGhpZGUgdGhlIGdpdmVuXG5cdCAqIG5vdGlmaWNhdGlvbi4gSWYgdGhlcmUgZXhpc3Qgb2xkZXIgbm90aWZpY2F0aW9ucywgd2UgdGhlbiBzaGlmdCB0aGVtIGFyb3VuZCB0byBmaWxsIHRoZSBnYXAuIE9uY2UgYm90aCBoaWRpbmcgdGhlIGdpdmVuIG5vdGlmaWNhdGlvblxuXHQgKiBhbmQgc2hpZnRpbmcgdGhlIG9sZGVyIG5vdGlmaWNhaXRvbnMgaXMgZG9uZSwgdGhlIGdpdmVuIG5vdGlmaWNhdGlvbiBnZXRzIGZpbmFsbHkgcmVtb3ZlZCAoZnJvbSB0aGUgRE9NKS5cblx0ICpcblx0ICogQHBhcmFtICAgYWN0aW9uIEFjdGlvbiBvYmplY3QsIHBheWxvYWQgY29udGFpbnMgdGhlIG5vdGlmaWNhdGlvbiBJRFxuXHQgKiBAcmV0dXJucyBQcm9taXNlLCByZXNvbHZlZCB3aGVuIGRvbmVcblx0ICovXG5cdHByaXZhdGUgaGFuZGxlSGlkZUFjdGlvbiggYWN0aW9uOiBOb3RpZmllckFjdGlvbiApOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblxuXHRcdFx0Y29uc3Qgc3RlcFByb21pc2VzOiBBcnJheTxQcm9taXNlPHVuZGVmaW5lZD4+ID0gW107XG5cblx0XHRcdC8vIERvZXMgdGhlIG5vdGlmaWNhdGlvbiBleGlzdCAvIGFyZSB0aGVyZSBldmVuIGFueSBub3RpZmljYXRpb25zPyAobGV0J3MgcHJldmVudCBhY2NpZGVudGlhbCBlcnJvcnMpXG5cdFx0XHRjb25zdCBub3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uIHwgdW5kZWZpbmVkID0gdGhpcy5maW5kTm90aWZpY2F0aW9uQnlJZCggYWN0aW9uLnBheWxvYWQgKTtcblx0XHRcdGlmICggbm90aWZpY2F0aW9uID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZXQgb2xkZXIgbm90aWZpY2F0aW9uc1xuXHRcdFx0Y29uc3Qgbm90aWZpY2F0aW9uSW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCA9IHRoaXMuZmluZE5vdGlmaWNhdGlvbkluZGV4QnlJZCggYWN0aW9uLnBheWxvYWQgKTtcblx0XHRcdGlmICggbm90aWZpY2F0aW9uSW5kZXggPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBvbGROb3RpZmljYXRpb25zOiBBcnJheTxOb3RpZmllck5vdGlmaWNhdGlvbj4gPSB0aGlzLm5vdGlmaWNhdGlvbnMuc2xpY2UoIDAsIG5vdGlmaWNhdGlvbkluZGV4ICk7XG5cblx0XHRcdC8vIERvIG9sZGVyIG5vdGlmaWNhdGlvbnMgZXhpc3QsIGFuZCB0aHVzIGRvIHdlIG5lZWQgdG8gc2hpZnQgb3RoZXIgbm90aWZpY2F0aW9ucyBhcyBhIGNvbnNlcXVlbmNlP1xuXHRcdFx0aWYgKCBvbGROb3RpZmljYXRpb25zLmxlbmd0aCA+IDAgKSB7XG5cblx0XHRcdFx0Ly8gQXJlIGFuaW1hdGlvbnMgZW5hYmxlZD9cblx0XHRcdFx0aWYgKCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmVuYWJsZWQgJiYgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5oaWRlLnNwZWVkID4gMCApIHtcblxuXHRcdFx0XHRcdC8vIElzIGFuaW1hdGlvbiBvdmVybGFwIGVuYWJsZWQ/XG5cdFx0XHRcdFx0aWYgKCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgIT09IGZhbHNlICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMub3ZlcmxhcCA+IDAgKSB7XG5cdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbm90aWZpY2F0aW9uLmNvbXBvbmVudC5oaWRlKCkgKTtcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIHRoaXMuc2hpZnROb3RpZmljYXRpb25zKCBvbGROb3RpZmljYXRpb25zLCBub3RpZmljYXRpb24uY29tcG9uZW50LmdldEhlaWdodCgpLCBmYWxzZSApICk7XG5cdFx0XHRcdFx0XHR9LCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmhpZGUuc3BlZWQgLSB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bm90aWZpY2F0aW9uLmNvbXBvbmVudC5oaWRlKCkudGhlbiggKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggdGhpcy5zaGlmdE5vdGlmaWNhdGlvbnMoIG9sZE5vdGlmaWNhdGlvbnMsIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0SGVpZ2h0KCksIGZhbHNlICkgKTtcblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuaGlkZSgpICk7XG5cdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIHRoaXMuc2hpZnROb3RpZmljYXRpb25zKCBvbGROb3RpZmljYXRpb25zLCBub3RpZmljYXRpb24uY29tcG9uZW50LmdldEhlaWdodCgpLCBmYWxzZSApICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbm90aWZpY2F0aW9uLmNvbXBvbmVudC5oaWRlKCkgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBXYWl0IHVudGlsIGJvdGggaGlkaW5nIGFuZCBzaGlmdGluZyBpcyBkb25lLCB0aGVuIHJlbW92ZSB0aGUgbm90aWZpY2F0aW9uIGZyb20gdGhlIGxpc3Rcblx0XHRcdFByb21pc2UuYWxsKCBzdGVwUHJvbWlzZXMgKS50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucmVtb3ZlTm90aWZpY2F0aW9uRnJvbUxpc3QoIG5vdGlmaWNhdGlvbiApO1xuXHRcdFx0XHRyZXNvbHZlKCk7IC8vIERvbmVcblx0XHRcdH0gKTtcblxuXHRcdH0gKTtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEhpZGUgdGhlIG9sZGVzdCBub3RpZmljYXRpb24gKGJyaWRnZSB0byBoYW5kbGVIaWRlQWN0aW9uKVxuXHQgKlxuXHQgKiBAcGFyYW0gICBhY3Rpb24gQWN0aW9uIG9iamVjdFxuXHQgKiBAcmV0dXJucyBQcm9taXNlLCByZXNvbHZlZCB3aGVuIGRvbmVcblx0ICovXG5cdHByaXZhdGUgaGFuZGxlSGlkZU9sZGVzdEFjdGlvbiggYWN0aW9uOiBOb3RpZmllckFjdGlvbiApOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXG5cdFx0Ly8gQXJlIHRoZXJlIGFueSBub3RpZmljYXRpb25zPyAocHJldmVudCBhY2NpZGVudGlhbCBlcnJvcnMpXG5cdFx0aWYgKCB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoID09PSAwICkge1xuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9ICk7IC8vIERvbmVcblx0XHR9IGVsc2Uge1xuXHRcdFx0YWN0aW9uLnBheWxvYWQgPSB0aGlzLm5vdGlmaWNhdGlvbnNbIDAgXS5pZDtcblx0XHRcdHJldHVybiB0aGlzLmhhbmRsZUhpZGVBY3Rpb24oIGFjdGlvbiApO1xuXHRcdH1cblxuXHR9XG5cblx0LyoqXG5cdCAqIEhpZGUgdGhlIG5ld2VzdCBub3RpZmljYXRpb24gKGJyaWRnZSB0byBoYW5kbGVIaWRlQWN0aW9uKVxuXHQgKlxuXHQgKiBAcGFyYW0gICBhY3Rpb24gQWN0aW9uIG9iamVjdFxuXHQgKiBAcmV0dXJucyBQcm9taXNlLCByZXNvbHZlZCB3aGVuIGRvbmVcblx0ICovXG5cdHByaXZhdGUgaGFuZGxlSGlkZU5ld2VzdEFjdGlvbiggYWN0aW9uOiBOb3RpZmllckFjdGlvbiApOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXG5cdFx0Ly8gQXJlIHRoZXJlIGFueSBub3RpZmljYXRpb25zPyAocHJldmVudCBhY2NpZGVudGlhbCBlcnJvcnMpXG5cdFx0aWYgKCB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoID09PSAwICkge1xuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9ICk7IC8vIERvbmVcblx0XHR9IGVsc2Uge1xuXHRcdFx0YWN0aW9uLnBheWxvYWQgPSB0aGlzLm5vdGlmaWNhdGlvbnNbIHRoaXMubm90aWZpY2F0aW9ucy5sZW5ndGggLSAxIF0uaWQ7XG5cdFx0XHRyZXR1cm4gdGhpcy5oYW5kbGVIaWRlQWN0aW9uKCBhY3Rpb24gKTtcblx0XHR9XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBIaWRlIGFsbCBub3RpZmljYXRpb25zIGF0IG9uY2Vcblx0ICpcblx0ICogQHBhcmFtICAgYWN0aW9uIEFjdGlvbiBvYmplY3Rcblx0ICogQHJldHVybnMgUHJvbWlzZSwgcmVzb2x2ZWQgd2hlbiBkb25lXG5cdCAqL1xuXHRwcml2YXRlIGhhbmRsZUhpZGVBbGxBY3Rpb24oIGFjdGlvbjogTm90aWZpZXJBY3Rpb24gKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8dW5kZWZpbmVkPiggKCByZXNvbHZlOiAoKSA9PiB2b2lkLCByZWplY3Q6ICgpID0+IHZvaWQgKSA9PiB7XG5cblx0XHRcdC8vIEFyZSB0aGVyZSBhbnkgbm90aWZpY2F0aW9ucz8gKHByZXZlbnQgYWNjaWRlbnRpYWwgZXJyb3JzKVxuXHRcdFx0Y29uc3QgbnVtYmVyT2ZOb3RpZmljYXRpb25zOiBudW1iZXIgPSB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoO1xuXHRcdFx0aWYgKCBudW1iZXJPZk5vdGlmaWNhdGlvbnMgPT09IDAgKSB7XG5cdFx0XHRcdHJlc29sdmUoKTsgLy8gRG9uZVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFyZSBhbmltYXRpb25zIGVuYWJsZWQ/XG5cdFx0XHRpZiAoIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuZW5hYmxlZCAmJiB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmhpZGUuc3BlZWQgPiAwICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuaGlkZS5vZmZzZXQgIT09IGZhbHNlICYmXG5cdFx0XHRcdHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuaGlkZS5vZmZzZXQgPiAwICkge1xuXG5cdFx0XHRcdGZvciAoIGxldCBpOiBudW1iZXIgPSBudW1iZXJPZk5vdGlmaWNhdGlvbnMgLSAxOyBpID49IDA7IGktLSApIHtcblx0XHRcdFx0XHRjb25zdCBhbmltYXRpb25PZmZzZXQ6IG51bWJlciA9IHRoaXMuY29uZmlnLnBvc2l0aW9uLnZlcnRpY2FsLnBvc2l0aW9uID09PSAndG9wJyA/IG51bWJlck9mTm90aWZpY2F0aW9ucyAtIDEgOiBpO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMubm90aWZpY2F0aW9uc1sgaSBdLmNvbXBvbmVudC5oaWRlKCkudGhlbiggKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEFyZSB3ZSBkb25lIGhlcmUsIHdhcyB0aGlzIHRoZSBsYXN0IG5vdGlmaWNhdGlvbiB0byBiZSBoaWRkZW4/XG5cdFx0XHRcdFx0XHRcdGlmICggKCB0aGlzLmNvbmZpZy5wb3NpdGlvbi52ZXJ0aWNhbC5wb3NpdGlvbiA9PT0gJ3RvcCcgJiYgaSA9PT0gMCApIHx8XG5cdFx0XHRcdFx0XHRcdFx0KCB0aGlzLmNvbmZpZy5wb3NpdGlvbi52ZXJ0aWNhbC5wb3NpdGlvbiA9PT0gJ2JvdHRvbScgJiYgaSA9PT0gbnVtYmVyT2ZOb3RpZmljYXRpb25zIC0gMSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlQWxsTm90aWZpY2F0aW9uc0Zyb21MaXN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgpOyAvLyBEb25lXG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdH0sIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuaGlkZS5vZmZzZXQgKiBhbmltYXRpb25PZmZzZXQgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGxldCBzdGVwUHJvbWlzZXM6IEFycmF5PFByb21pc2U8dW5kZWZpbmVkPj4gPSBbXTtcblx0XHRcdFx0Zm9yICggbGV0IGk6IG51bWJlciA9IG51bWJlck9mTm90aWZpY2F0aW9ucyAtIDE7IGkgPj0gMDsgaS0tICkge1xuXHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLm5vdGlmaWNhdGlvbnNbIGkgXS5jb21wb25lbnQuaGlkZSgpICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0UHJvbWlzZS5hbGwoIHN0ZXBQcm9taXNlcyApLnRoZW4oICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnJlbW92ZUFsbE5vdGlmaWNhdGlvbnNGcm9tTGlzdCgpO1xuXHRcdFx0XHRcdHJlc29sdmUoKTsgLy8gRG9uZVxuXHRcdFx0XHR9ICk7XG5cblx0XHRcdH1cblxuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaGlmdCBtdWx0aXBsZSBub3RpZmljYXRpb25zIGF0IG9uY2Vcblx0ICpcblx0ICogQHBhcmFtICAgbm90aWZpY2F0aW9ucyBMaXN0IGNvbnRhaW5pbmcgdGhlIG5vdGlmaWNhdGlvbnMgdG8gYmUgc2hpZnRlZFxuXHQgKiBAcGFyYW0gICBkaXN0YW5jZSAgICAgIERpc3RhbmNlIHRvIHNoaWZ0IChpbiBweClcblx0ICogQHBhcmFtICAgdG9NYWtlUGxhY2UgICBGbGFnLCBkZWZpbmluZyBpbiB3aGljaCBkaXJlY2l0b24gdG8gc2hpZnRcblx0ICogQHJldHVybnMgUHJvbWlzZSwgcmVzb2x2ZWQgd2hlbiBkb25lXG5cdCAqL1xuXHRwcml2YXRlIHNoaWZ0Tm90aWZpY2F0aW9ucyggbm90aWZpY2F0aW9uczogQXJyYXk8Tm90aWZpZXJOb3RpZmljYXRpb24+LCBkaXN0YW5jZTogbnVtYmVyLCB0b01ha2VQbGFjZTogYm9vbGVhbiApOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblxuXHRcdFx0Ly8gQXJlIHRoZXJlIGFueSBub3RpZmljYXRpb25zIHRvIHNoaWZ0P1xuXHRcdFx0aWYgKCBub3RpZmljYXRpb25zLmxlbmd0aCA9PT0gMCApIHtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGxldCBub3RpZmljYXRpb25Qcm9taXNlczogQXJyYXk8UHJvbWlzZTx1bmRlZmluZWQ+PiA9IFtdO1xuXHRcdFx0Zm9yICggbGV0IGk6IG51bWJlciA9IG5vdGlmaWNhdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0gKSB7XG5cdFx0XHRcdG5vdGlmaWNhdGlvblByb21pc2VzLnB1c2goIG5vdGlmaWNhdGlvbnNbIGkgXS5jb21wb25lbnQuc2hpZnQoIGRpc3RhbmNlLCB0b01ha2VQbGFjZSApICk7XG5cdFx0XHR9XG5cdFx0XHRQcm9taXNlLmFsbCggbm90aWZpY2F0aW9uUHJvbWlzZXMgKS50aGVuKCByZXNvbHZlICk7IC8vIERvbmVcblxuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBuZXcgbm90aWZpY2F0aW9uIHRvIHRoZSBsaXN0IG9mIG5vdGlmaWNhdGlvbnMgKHRyaWdnZXJzIGNoYW5nZSBkZXRlY3Rpb24pXG5cdCAqXG5cdCAqIEBwYXJhbSBub3RpZmljYXRpb24gTm90aWZpY2F0aW9uIHRvIGFkZCB0byB0aGUgbGlzdCBvZiBub3RpZmljYXRpb25zXG5cdCAqL1xuXHRwcml2YXRlIGFkZE5vdGlmaWNhdGlvblRvTGlzdCggbm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiApOiB2b2lkIHtcblx0XHR0aGlzLm5vdGlmaWNhdGlvbnMucHVzaCggbm90aWZpY2F0aW9uICk7XG5cdFx0dGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTsgLy8gUnVuIGNoYW5nZSBkZXRlY3Rpb24gYmVjYXVzZSB0aGUgbm90aWZpY2F0aW9uIGxpc3QgY2hhbmdlZFxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbiBleGlzdGluZyBub3RpZmljYXRpb24gZnJvbSB0aGUgbGlzdCBvZiBub3RpZmljYXRpb25zICh0cmlnZ2VycyBjaGFuZ2UgZGV0ZWN0aW9uKVxuXHQgKlxuXHQgKiBAcGFyYW0gbm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbiB0byBiZSByZW1vdmVkIGZyb20gdGhlIGxpc3Qgb2Ygbm90aWZpY2F0aW9uc1xuXHQgKi9cblx0cHJpdmF0ZSByZW1vdmVOb3RpZmljYXRpb25Gcm9tTGlzdCggbm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiApOiB2b2lkIHtcblx0XHR0aGlzLm5vdGlmaWNhdGlvbnMgPVxuXHRcdFx0dGhpcy5ub3RpZmljYXRpb25zLmZpbHRlciggKCBpdGVtOiBOb3RpZmllck5vdGlmaWNhdGlvbiApID0+IGl0ZW0uY29tcG9uZW50ICE9PSBub3RpZmljYXRpb24uY29tcG9uZW50ICk7XG5cdFx0dGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTsgLy8gUnVuIGNoYW5nZSBkZXRlY3Rpb24gYmVjYXVzZSB0aGUgbm90aWZpY2F0aW9uIGxpc3QgY2hhbmdlZFxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbGwgbm90aWZpY2F0aW9ucyBmcm9tIHRoZSBsaXN0ICh0cmlnZ2VycyBjaGFuZ2UgZGV0ZWN0aW9uKVxuXHQgKi9cblx0cHJpdmF0ZSByZW1vdmVBbGxOb3RpZmljYXRpb25zRnJvbUxpc3QoKTogdm9pZCB7XG5cdFx0dGhpcy5ub3RpZmljYXRpb25zID0gW107XG5cdFx0dGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTsgLy8gUnVuIGNoYW5nZSBkZXRlY3Rpb24gYmVjYXVzZSB0aGUgbm90aWZpY2F0aW9uIGxpc3QgY2hhbmdlZFxuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlcjogRmluZCBhIG5vdGlmaWNhdGlvbiBpbiB0aGUgbm90aWZpY2F0aW9uIGxpc3QgYnkgYSBnaXZlbiBub3RpZmljYXRpb24gSURcblx0ICpcblx0ICogQHBhcmFtICAgbm90aWZpY2F0aW9uSWQgTm90aWZpY2F0aW9uIElELCB1c2VkIGZvciBmaW5kaW5nIG5vdGlmaWNhdGlvblxuXHQgKiBAcmV0dXJucyBOb3RpZmljYXRpb24sIHVuZGVmaW5lZCBpZiBub3QgZm91bmRcblx0ICovXG5cdHByaXZhdGUgZmluZE5vdGlmaWNhdGlvbkJ5SWQoIG5vdGlmaWNhdGlvbklkOiBzdHJpbmcgKTogTm90aWZpZXJOb3RpZmljYXRpb24gfCB1bmRlZmluZWQge1xuXHRcdHJldHVybiB0aGlzLm5vdGlmaWNhdGlvbnMuZmluZCggKCBjdXJyZW50Tm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiApID0+IGN1cnJlbnROb3RpZmljYXRpb24uaWQgPT09IG5vdGlmaWNhdGlvbklkICk7XG5cdH1cblxuXHQvKipcblx0ICogSGVscGVyOiBGaW5kIGEgbm90aWZpY2F0aW9uJ3MgaW5kZXggYnkgYSBnaXZlbiBub3RpZmljYXRpb24gSURcblx0ICpcblx0ICogQHBhcmFtICAgbm90aWZpY2F0aW9uSWQgTm90aWZpY2F0aW9uIElELCB1c2VkIGZvciBmaW5kaW5nIGEgbm90aWZpY2F0aW9uJ3MgaW5kZXhcblx0ICogQHJldHVybnMgTm90aWZpY2F0aW9uIGluZGV4LCB1bmRlZmluZWQgaWYgbm90IGZvdW5kXG5cdCAqL1xuXHRwcml2YXRlIGZpbmROb3RpZmljYXRpb25JbmRleEJ5SWQoIG5vdGlmaWNhdGlvbklkOiBzdHJpbmcgKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcblx0XHRjb25zdCBub3RpZmljYXRpb25JbmRleDogbnVtYmVyID1cblx0XHRcdHRoaXMubm90aWZpY2F0aW9ucy5maW5kSW5kZXgoICggY3VycmVudE5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gKSA9PiBjdXJyZW50Tm90aWZpY2F0aW9uLmlkID09PSBub3RpZmljYXRpb25JZCApO1xuXHRcdHJldHVybiAoIG5vdGlmaWNhdGlvbkluZGV4ICE9PSAtMSA/IG5vdGlmaWNhdGlvbkluZGV4IDogdW5kZWZpbmVkICk7XG5cdH1cblxufVxuIiwiPHVsPlxuXHQ8bGkgY2xhc3M9XCJub3RpZmllcl9fY29udGFpbmVyLWxpc3RcIiAqbmdGb3I9XCJsZXQgbm90aWZpY2F0aW9uIG9mIG5vdGlmaWNhdGlvbnM7IHRyYWNrQnk6IGlkZW50aWZ5Tm90aWZpY2F0aW9uO1wiPlxuXHRcdDxub3RpZmllci1ub3RpZmljYXRpb25cblx0XHRcdFtub3RpZmljYXRpb25dPVwibm90aWZpY2F0aW9uXCJcblx0XHRcdChyZWFkeSk9XCJvbk5vdGlmaWNhdGlvblJlYWR5KCAkZXZlbnQgKVwiXG5cdFx0XHQoZGlzbWlzcyk9XCJvbk5vdGlmaWNhdGlvbkRpc21pc3MoICRldmVudCApXCI+XG5cdFx0PC9ub3RpZmllci1ub3RpZmljYXRpb24+XG5cdDwvbGk+XG48L3VsPlxuIl19