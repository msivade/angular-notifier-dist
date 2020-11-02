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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ub3RpZmllci1jb250YWluZXIuY29tcG9uZW50LnRzIiwibGliL2NvbXBvbmVudHMvbm90aWZpZXItY29udGFpbmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBcUIsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBTWpHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7Ozs7OztJQ0w1RSw2QkFDQztJQUFBLGdEQUl3QjtJQUZ2QixpT0FBdUMsME5BQUE7SUFFeEMsaUJBQXdCO0lBQ3pCLGlCQUFLOzs7SUFKSCxlQUE2QjtJQUE3Qiw4Q0FBNkI7O0FEUWhDOzs7Ozs7Ozs7Ozs7R0FZRztBQVNILE1BQU0sT0FBTywwQkFBMEI7SUFnQ3RDOzs7Ozs7T0FNRztJQUNILFlBQW9CLGNBQWlDLEVBQUUsb0JBQTBDLEVBQUUsZUFBZ0M7UUFDbEksSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxvQkFBb0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUV4QiwrRUFBK0U7UUFDL0UsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBRSxDQUFFLE1BQXNCLEVBQUcsRUFBRTtZQUN0RyxJQUFJLENBQUMsWUFBWSxDQUFFLE1BQU0sQ0FBRSxDQUFDLElBQUksQ0FBRSxHQUFHLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFFLENBQUM7UUFDTCxDQUFDLENBQUUsQ0FBQztJQUVMLENBQUM7SUFFRDs7T0FFRztJQUNJLFdBQVc7UUFDakIsSUFBSyxJQUFJLENBQUMsd0JBQXdCLEVBQUc7WUFDcEMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzVDO0lBQ0YsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLG9CQUFvQixDQUFFLEtBQWEsRUFBRSxZQUFrQztRQUM3RSxPQUFPLFlBQVksQ0FBQyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxxQkFBcUIsQ0FBRSxjQUFzQjtRQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBRTtZQUN2QixPQUFPLEVBQUUsY0FBYztZQUN2QixJQUFJLEVBQUUsTUFBTTtTQUNaLENBQUUsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksbUJBQW1CLENBQUUscUJBQW9EO1FBQy9FLElBQUksbUJBQW1CLEdBQXlCLElBQUksQ0FBQyxhQUFhLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBQyw4QkFBOEI7UUFDbkksbUJBQW1CLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLENBQUMsa0NBQWtDO1FBQ3pGLElBQUksQ0FBQyx3QkFBd0IsQ0FBRSxtQkFBbUIsQ0FBRSxDQUFDLENBQUMseUNBQXlDO0lBQ2hHLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLFlBQVksQ0FBRSxNQUFzQjtRQUMzQyxRQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUcsRUFBRSw2RUFBNkU7WUFDckcsS0FBSyxNQUFNO2dCQUNWLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFFLE1BQU0sQ0FBRSxDQUFDO1lBQ3hDLEtBQUssTUFBTTtnQkFDVixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRSxNQUFNLENBQUUsQ0FBQztZQUN4QyxLQUFLLGFBQWE7Z0JBQ2pCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFFLE1BQU0sQ0FBRSxDQUFDO1lBQzlDLEtBQUssYUFBYTtnQkFDakIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUUsTUFBTSxDQUFFLENBQUM7WUFDOUMsS0FBSyxVQUFVO2dCQUNkLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFFLE1BQU0sQ0FBRSxDQUFDO1lBQzNDO2dCQUNDLE9BQU8sSUFBSSxPQUFPLENBQWEsQ0FBRSxPQUFtQixFQUFFLE1BQWtCLEVBQUcsRUFBRTtvQkFDNUUsT0FBTyxFQUFFLENBQUMsQ0FBQyw4QkFBOEI7Z0JBQzFDLENBQUMsQ0FBRSxDQUFDO1NBQ0w7SUFDRixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNLLGdCQUFnQixDQUFFLE1BQXNCO1FBQy9DLE9BQU8sSUFBSSxPQUFPLENBQWEsQ0FBRSxPQUFtQixFQUFFLE1BQWtCLEVBQUcsRUFBRTtZQUM1RSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLENBQUMsd0ZBQXdGO1lBQzVILElBQUksQ0FBQyxxQkFBcUIsQ0FBRSxJQUFJLG9CQUFvQixDQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUUsQ0FBRSxDQUFDO1FBQzFFLENBQUMsQ0FBRSxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNLLHdCQUF3QixDQUFFLFlBQWtDO1FBRW5FLHlEQUF5RDtRQUN6RCxNQUFNLHFCQUFxQixHQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ2hFLElBQUsscUJBQXFCLEtBQUssQ0FBQyxFQUFHO1lBQ2xDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBRSxDQUFDLENBQUMsT0FBTztTQUN2RTthQUFNO1lBRU4sTUFBTSxxQkFBcUIsR0FBVyxDQUFDLENBQUM7WUFFeEMsd0VBQXdFO1lBQ3hFLElBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcscUJBQXFCLEVBQUc7Z0JBQ3pHLElBQUksQ0FBQyxhQUFhLENBQUUsQ0FBQyxDQUFFLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBRSxHQUFHLEVBQUU7b0JBQ25ELElBQUksQ0FBQywwQkFBMEIsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFFLENBQUMsQ0FBRSxDQUFFLENBQUM7b0JBQzNELFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBRSxDQUFDLENBQUMsT0FBTztnQkFDeEUsQ0FBQyxDQUFFLENBQUM7YUFDSjtpQkFBTTtnQkFFTixNQUFNLFlBQVksR0FBOEIsRUFBRSxDQUFDO2dCQUVuRCx3Q0FBd0M7Z0JBQ3hDLElBQUsscUJBQXFCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFHO29CQUU3RCxNQUFNLGdCQUFnQixHQUFnQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBRSxDQUFDLEVBQUUscUJBQXFCLEdBQUcsQ0FBQyxDQUFFLENBQUM7b0JBRS9HLDBCQUEwQjtvQkFDMUIsSUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUc7d0JBRXJDLGdDQUFnQzt3QkFDaEMsSUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUc7NEJBQ3JGLFlBQVksQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBRSxDQUFDLENBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQzs0QkFDOUQsVUFBVSxDQUFFLEdBQUcsRUFBRTtnQ0FDaEIsWUFBWSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUUsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUUsQ0FBRSxDQUFDOzRCQUM1RyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUUsQ0FBQzs0QkFDeEUsVUFBVSxDQUFFLEdBQUcsRUFBRTtnQ0FDaEIsWUFBWSxDQUFDLElBQUksQ0FBRSxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFFLENBQUM7NEJBQ3BELENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFFLENBQUM7eUJBQzdHOzZCQUFNOzRCQUNOLFlBQVksQ0FBQyxJQUFJLENBQUUsSUFBSSxPQUFPLENBQWEsQ0FBRSxPQUFtQixFQUFFLE1BQWtCLEVBQUcsRUFBRTtnQ0FDeEYsSUFBSSxDQUFDLGFBQWEsQ0FBRSxDQUFDLENBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFFLEdBQUcsRUFBRTtvQ0FDbkQsSUFBSSxDQUFDLGtCQUFrQixDQUFFLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFFLENBQUMsSUFBSSxDQUFFLEdBQUcsRUFBRTt3Q0FDaEcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUUsT0FBTyxDQUFFLENBQUM7b0NBQy9DLENBQUMsQ0FBRSxDQUFDO2dDQUNMLENBQUMsQ0FBRSxDQUFDOzRCQUNMLENBQUMsQ0FBRSxDQUFFLENBQUM7eUJBQ047cUJBRUQ7eUJBQU07d0JBQ04sWUFBWSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFFLENBQUMsQ0FBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFDO3dCQUM5RCxZQUFZLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxnQkFBZ0IsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksQ0FBRSxDQUFFLENBQUM7d0JBQzNHLFlBQVksQ0FBQyxJQUFJLENBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFDO3FCQUNuRDtpQkFFRDtxQkFBTTtvQkFFTixNQUFNLGdCQUFnQixHQUFnQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBRSxDQUFDLEVBQUUscUJBQXFCLEdBQUcsQ0FBQyxDQUFFLENBQUM7b0JBRS9HLDBCQUEwQjtvQkFDMUIsSUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUc7d0JBRXJDLGdDQUFnQzt3QkFDaEMsSUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUc7NEJBQ3JGLFlBQVksQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFFLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFFLENBQUUsQ0FBQzs0QkFDM0csVUFBVSxDQUFFLEdBQUcsRUFBRTtnQ0FDaEIsWUFBWSxDQUFDLElBQUksQ0FBRSxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFFLENBQUM7NEJBQ3BELENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBRSxDQUFDO3lCQUN6RTs2QkFBTTs0QkFDTixZQUFZLENBQUMsSUFBSSxDQUFFLElBQUksT0FBTyxDQUFhLENBQUUsT0FBbUIsRUFBRSxNQUFrQixFQUFHLEVBQUU7Z0NBQ3hGLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxnQkFBZ0IsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksQ0FBRSxDQUFDLElBQUksQ0FBRSxHQUFHLEVBQUU7b0NBQ2hHLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFFLE9BQU8sQ0FBRSxDQUFDO2dDQUMvQyxDQUFDLENBQUUsQ0FBQzs0QkFDTCxDQUFDLENBQUUsQ0FBRSxDQUFDO3lCQUNOO3FCQUVEO3lCQUFNO3dCQUNOLFlBQVksQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFFLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFFLENBQUUsQ0FBQzt3QkFDM0csWUFBWSxDQUFDLElBQUksQ0FBRSxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFFLENBQUM7cUJBQ25EO2lCQUVEO2dCQUVELE9BQU8sQ0FBQyxHQUFHLENBQUUsWUFBWSxDQUFFLENBQUMsSUFBSSxDQUFFLEdBQUcsRUFBRTtvQkFDdEMsSUFBSyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUc7d0JBQzdELElBQUksQ0FBQywwQkFBMEIsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFFLENBQUMsQ0FBRSxDQUFFLENBQUM7cUJBQzNEO29CQUNELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUM1QixDQUFDLENBQUUsQ0FBQyxDQUFDLE9BQU87YUFFWjtTQUVEO0lBRUYsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNLLGdCQUFnQixDQUFFLE1BQXNCO1FBQy9DLE9BQU8sSUFBSSxPQUFPLENBQWEsQ0FBRSxPQUFtQixFQUFFLE1BQWtCLEVBQUcsRUFBRTtZQUU1RSxNQUFNLFlBQVksR0FBOEIsRUFBRSxDQUFDO1lBRW5ELHFHQUFxRztZQUNyRyxNQUFNLFlBQVksR0FBcUMsSUFBSSxDQUFDLG9CQUFvQixDQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUUsQ0FBQztZQUNuRyxJQUFLLFlBQVksS0FBSyxTQUFTLEVBQUc7Z0JBQ2pDLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE9BQU87YUFDUDtZQUVELDBCQUEwQjtZQUMxQixNQUFNLGlCQUFpQixHQUF1QixJQUFJLENBQUMseUJBQXlCLENBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBRSxDQUFDO1lBQy9GLElBQUssaUJBQWlCLEtBQUssU0FBUyxFQUFHO2dCQUN0QyxPQUFPLEVBQUUsQ0FBQztnQkFDVixPQUFPO2FBQ1A7WUFDRCxNQUFNLGdCQUFnQixHQUFnQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBRSxDQUFDLEVBQUUsaUJBQWlCLENBQUUsQ0FBQztZQUV2RyxtR0FBbUc7WUFDbkcsSUFBSyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFHO2dCQUVsQywwQkFBMEI7Z0JBQzFCLElBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFHO29CQUU5RSxnQ0FBZ0M7b0JBQ2hDLElBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFHO3dCQUNyRixZQUFZLENBQUMsSUFBSSxDQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQzt3QkFDbkQsVUFBVSxDQUFFLEdBQUcsRUFBRTs0QkFDaEIsWUFBWSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUUsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxLQUFLLENBQUUsQ0FBRSxDQUFDO3dCQUM3RyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUUsQ0FBQztxQkFDeEU7eUJBQU07d0JBQ04sWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUUsR0FBRyxFQUFFOzRCQUN4QyxZQUFZLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxnQkFBZ0IsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssQ0FBRSxDQUFFLENBQUM7d0JBQzdHLENBQUMsQ0FBRSxDQUFDO3FCQUNKO2lCQUNEO3FCQUFNO29CQUNOLFlBQVksQ0FBQyxJQUFJLENBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFDO29CQUNuRCxZQUFZLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxnQkFBZ0IsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssQ0FBRSxDQUFFLENBQUM7aUJBQzVHO2FBRUQ7aUJBQU07Z0JBRU4sWUFBWSxDQUFDLElBQUksQ0FBRSxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFFLENBQUM7YUFFbkQ7WUFFRCwwRkFBMEY7WUFDMUYsT0FBTyxDQUFDLEdBQUcsQ0FBRSxZQUFZLENBQUUsQ0FBQyxJQUFJLENBQUUsR0FBRyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsMEJBQTBCLENBQUUsWUFBWSxDQUFFLENBQUM7Z0JBQ2hELE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTztZQUNuQixDQUFDLENBQUUsQ0FBQztRQUVMLENBQUMsQ0FBRSxDQUFDO0lBRUwsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssc0JBQXNCLENBQUUsTUFBc0I7UUFFckQsNERBQTREO1FBQzVELElBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFHO1lBQ3RDLE9BQU8sSUFBSSxPQUFPLENBQWEsQ0FBRSxPQUFtQixFQUFFLE1BQWtCLEVBQUcsRUFBRTtnQkFDNUUsT0FBTyxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUUsQ0FBQyxDQUFDLE9BQU87U0FDWjthQUFNO1lBQ04sTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFFLENBQUMsQ0FBRSxDQUFDLEVBQUUsQ0FBQztZQUM1QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRSxNQUFNLENBQUUsQ0FBQztTQUN2QztJQUVGLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLHNCQUFzQixDQUFFLE1BQXNCO1FBRXJELDREQUE0RDtRQUM1RCxJQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRztZQUN0QyxPQUFPLElBQUksT0FBTyxDQUFhLENBQUUsT0FBbUIsRUFBRSxNQUFrQixFQUFHLEVBQUU7Z0JBQzVFLE9BQU8sRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFFLENBQUMsQ0FBQyxPQUFPO1NBQ1o7YUFBTTtZQUNOLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUUsQ0FBQyxFQUFFLENBQUM7WUFDeEUsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsTUFBTSxDQUFFLENBQUM7U0FDdkM7SUFFRixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxtQkFBbUIsQ0FBRSxNQUFzQjtRQUNsRCxPQUFPLElBQUksT0FBTyxDQUFhLENBQUUsT0FBbUIsRUFBRSxNQUFrQixFQUFHLEVBQUU7WUFFNUUsNERBQTREO1lBQzVELE1BQU0scUJBQXFCLEdBQVcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDaEUsSUFBSyxxQkFBcUIsS0FBSyxDQUFDLEVBQUc7Z0JBQ2xDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTztnQkFDbEIsT0FBTzthQUNQO1lBRUQsMEJBQTBCO1lBQzFCLElBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSztnQkFDM0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUc7Z0JBRXpDLEtBQU0sSUFBSSxDQUFDLEdBQVcscUJBQXFCLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUc7b0JBQzlELE1BQU0sZUFBZSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakgsVUFBVSxDQUFFLEdBQUcsRUFBRTt3QkFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBRSxDQUFDLENBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFFLEdBQUcsRUFBRTs0QkFFbkQsaUVBQWlFOzRCQUNqRSxJQUFLLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBRTtnQ0FDbkUsQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUsscUJBQXFCLEdBQUcsQ0FBQyxDQUFFLEVBQUc7Z0NBQzdGLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO2dDQUN0QyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87NkJBQ2xCO3dCQUVGLENBQUMsQ0FBRSxDQUFDO29CQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBRSxDQUFDO2lCQUMxRDthQUVEO2lCQUFNO2dCQUVOLElBQUksWUFBWSxHQUE4QixFQUFFLENBQUM7Z0JBQ2pELEtBQU0sSUFBSSxDQUFDLEdBQVcscUJBQXFCLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUc7b0JBQzlELFlBQVksQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBRSxDQUFDLENBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQztpQkFDOUQ7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBRSxZQUFZLENBQUUsQ0FBQyxJQUFJLENBQUUsR0FBRyxFQUFFO29CQUN0QyxJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztvQkFDdEMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO2dCQUNuQixDQUFDLENBQUUsQ0FBQzthQUVKO1FBRUYsQ0FBQyxDQUFFLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNLLGtCQUFrQixDQUFFLGFBQTBDLEVBQUUsUUFBZ0IsRUFBRSxXQUFvQjtRQUM3RyxPQUFPLElBQUksT0FBTyxDQUFhLENBQUUsT0FBbUIsRUFBRSxNQUFrQixFQUFHLEVBQUU7WUFFNUUsd0NBQXdDO1lBQ3hDLElBQUssYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUc7Z0JBQ2pDLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE9BQU87YUFDUDtZQUVELElBQUksb0JBQW9CLEdBQThCLEVBQUUsQ0FBQztZQUN6RCxLQUFNLElBQUksQ0FBQyxHQUFXLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUc7Z0JBQzdELG9CQUFvQixDQUFDLElBQUksQ0FBRSxhQUFhLENBQUUsQ0FBQyxDQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBRSxRQUFRLEVBQUUsV0FBVyxDQUFFLENBQUUsQ0FBQzthQUN6RjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUUsb0JBQW9CLENBQUUsQ0FBQyxJQUFJLENBQUUsT0FBTyxDQUFFLENBQUMsQ0FBQyxPQUFPO1FBRTdELENBQUMsQ0FBRSxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxxQkFBcUIsQ0FBRSxZQUFrQztRQUNoRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxZQUFZLENBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsNkRBQTZEO0lBQ2xHLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssMEJBQTBCLENBQUUsWUFBa0M7UUFDckUsSUFBSSxDQUFDLGFBQWE7WUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUUsQ0FBRSxJQUEwQixFQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxTQUFTLENBQUUsQ0FBQztRQUMxRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsNkRBQTZEO0lBQ2xHLENBQUM7SUFFRDs7T0FFRztJQUNLLDhCQUE4QjtRQUNyQyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsNkRBQTZEO0lBQ2xHLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLG9CQUFvQixDQUFFLGNBQXNCO1FBQ25ELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUUsQ0FBRSxtQkFBeUMsRUFBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRSxLQUFLLGNBQWMsQ0FBRSxDQUFDO0lBQzlILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLHlCQUF5QixDQUFFLGNBQXNCO1FBQ3hELE1BQU0saUJBQWlCLEdBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFFLENBQUUsbUJBQXlDLEVBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsS0FBSyxjQUFjLENBQUUsQ0FBQztRQUM1SCxPQUFPLENBQUUsaUJBQWlCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUUsQ0FBQztJQUNyRSxDQUFDOzt1SEE1ZFcsMEJBQTBCO2tGQUExQiwwQkFBMEI7UUNoQ3ZDLDBCQUNDO1FBQUEseUVBQ0M7UUFNRixpQkFBSzs7UUFQaUMsZUFBMEU7UUFBMUUsMkNBQTBFLDBDQUFBOztrREQrQm5HLDBCQUEwQjtjQVJ0QyxTQUFTO2VBQUU7Z0JBQ1gsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDTCxLQUFLLEVBQUUscUJBQXFCO2lCQUM1QjtnQkFDRCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixXQUFXLEVBQUUscUNBQXFDO2FBQ2xEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTm90aWZpZXJBY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItYWN0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5vdGlmaWVyQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllck5vdGlmaWNhdGlvbiB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1ub3RpZmljYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpZXJRdWV1ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9ub3RpZmllci1xdWV1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25vdGlmaWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpZXJOb3RpZmljYXRpb25Db21wb25lbnQgfSBmcm9tICcuL25vdGlmaWVyLW5vdGlmaWNhdGlvbi5jb21wb25lbnQnO1xuXG4vKipcbiAqIE5vdGlmaWVyIGNvbnRhaW5lciBjb21wb25lbnRcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRoaXMgY29tcG9uZW50IGFjdHMgYXMgYSB3cmFwcGVyIGZvciBhbGwgbm90aWZpY2F0aW9uIGNvbXBvbmVudHM7IGNvbnNlcXVlbnRseSwgaXQgaXMgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGEgbmV3IG5vdGlmaWNhdGlvblxuICogY29tcG9uZW50IGFuZCByZW1vdmluZyBhbiBleGlzdGluZyBub3RpZmljYXRpb24gY29tcG9uZW50LiBCZWluZyBtb3JlIHByZWNpY2VseSwgaXQgYWxzbyBoYW5kbGVzIHNpZGUgZWZmZWN0cyBvZiB0aG9zZSBhY3Rpb25zLCBzdWNoIGFzXG4gKiBzaGlmdGluZyBvciBldmVuIGNvbXBsZXRlbHkgcmVtb3Zpbmcgb3RoZXIgbm90aWZpY2F0aW9ucyBhcyB3ZWxsLiBPdmVyYWxsLCB0aGlzIGNvbXBvbmVudHMgaGFuZGxlcyBhY3Rpb25zIGNvbWluZyBmcm9tIHRoZSBxdWV1ZSBzZXJ2aWNlXG4gKiBieSBzdWJzY3JpYmluZyB0byBpdHMgYWN0aW9uIHN0cmVhbS5cbiAqXG4gKiBUZWNobmljYWwgc2lkZW5vdGU6XG4gKiBUaGlzIGNvbXBvbmVudCBoYXMgdG8gYmUgdXNlZCBzb21ld2hlcmUgaW4gYW4gYXBwbGljYXRpb24gdG8gd29yazsgaXQgd2lsbCBub3QgaW5qZWN0IGFuZCBjcmVhdGUgaXRzZWxmIGF1dG9tYXRpY2FsbHksIHByaW1hcmlseSBpbiBvcmRlclxuICogdG8gbm90IGJyZWFrIHRoZSBBbmd1bGFyIEFvVCBjb21waWxhdGlvbi4gTW9yZW92ZXIsIHRoaXMgY29tcG9uZW50IChhbmQgYWxzbyB0aGUgbm90aWZpY2F0aW9uIGNvbXBvbmVudHMpIHNldCB0aGVpciBjaGFuZ2UgZGV0ZWN0aW9uXG4gKiBzdHJhdGVneSBvblB1c2gsIHdoaWNoIG1lYW5zIHRoYXQgd2UgaGFuZGxlIGNoYW5nZSBkZXRlY3Rpb24gbWFudWFsbHkgaW4gb3JkZXIgdG8gZ2V0IHRoZSBiZXN0IHBlcmZvcm1hbmNlLiAoI3BlcmZtYXR0ZXJzKVxuICovXG5AQ29tcG9uZW50KCB7XG5cdGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLCAvLyAoI3BlcmZtYXR0ZXJzKVxuXHRob3N0OiB7XG5cdFx0Y2xhc3M6ICdub3RpZmllcl9fY29udGFpbmVyJ1xuXHR9LFxuXHRzZWxlY3RvcjogJ25vdGlmaWVyLWNvbnRhaW5lcicsXG5cdHRlbXBsYXRlVXJsOiAnLi9ub3RpZmllci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnXG59IClcbmV4cG9ydCBjbGFzcyBOb3RpZmllckNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cblx0LyoqXG5cdCAqIExpc3Qgb2YgY3VycmVudGx5IHNvbWV3aGF0IGFjdGl2ZSBub3RpZmljYXRpb25zXG5cdCAqL1xuXHRwdWJsaWMgbm90aWZpY2F0aW9uczogQXJyYXk8Tm90aWZpZXJOb3RpZmljYXRpb24+O1xuXG5cdC8qKlxuXHQgKiBDaGFuZ2UgZGV0ZWN0b3Jcblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmO1xuXG5cdC8qKlxuXHQgKiBOb3RpZmllciBxdWV1ZSBzZXJ2aWNlXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IHF1ZXVlU2VydmljZTogTm90aWZpZXJRdWV1ZVNlcnZpY2U7XG5cblx0LyoqXG5cdCAqIE5vdGlmaWVyIGNvbmZpZ3VyYXRpb25cblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgY29uZmlnOiBOb3RpZmllckNvbmZpZztcblxuXHQvKipcblx0ICogUXVldWUgc2VydmljZSBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiAoc2F2ZWQgZm9yIGNsZWFudXApXG5cdCAqL1xuXHRwcml2YXRlIHF1ZXVlU2VydmljZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG5cdC8qKlxuXHQgKiBQcm9taXNlIHJlc29sdmUgZnVuY3Rpb24gcmVmZXJlbmNlLCB0ZW1wb3JhcmlseSB1c2VkIHdoaWxlIHRoZSBub3RpZmljYXRpb24gY2hpbGQgY29tcG9uZW50IGdldHMgY3JlYXRlZFxuXHQgKi9cblx0cHJpdmF0ZSB0ZW1wUHJvbWlzZVJlc29sdmVyOiAoKSA9PiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAcGFyYW0gY2hhbmdlRGV0ZWN0b3IgICAgICAgQ2hhbmdlIGRldGVjdG9yLCB1c2VkIGZvciBtYW51YWxseSB0cmlnZ2VyaW5nIGNoYW5nZSBkZXRlY3Rpb24gcnVuc1xuXHQgKiBAcGFyYW0gbm90aWZpZXJRdWV1ZVNlcnZpY2UgTm90aWZpZXIgcXVldWUgc2VydmljZVxuXHQgKiBAcGFyYW0gbm90aWZpZXJTZXJ2aWNlICAgICAgTm90aWZpZXIgc2VydmljZVxuXHQgKi9cblx0cHVibGljIGNvbnN0cnVjdG9yKCBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIG5vdGlmaWVyUXVldWVTZXJ2aWNlOiBOb3RpZmllclF1ZXVlU2VydmljZSwgbm90aWZpZXJTZXJ2aWNlOiBOb3RpZmllclNlcnZpY2UgKSB7XG5cdFx0dGhpcy5jaGFuZ2VEZXRlY3RvciA9IGNoYW5nZURldGVjdG9yO1xuXHRcdHRoaXMucXVldWVTZXJ2aWNlID0gbm90aWZpZXJRdWV1ZVNlcnZpY2U7XG5cdFx0dGhpcy5jb25maWcgPSBub3RpZmllclNlcnZpY2UuZ2V0Q29uZmlnKCk7XG5cdFx0dGhpcy5ub3RpZmljYXRpb25zID0gW107XG5cblx0XHQvLyBDb25uZWN0cyB0aGlzIGNvbXBvbmVudCB1cCB0byB0aGUgYWN0aW9uIHF1ZXVlLCB0aGVuIGhhbmRsZSBpbmNvbWluZyBhY3Rpb25zXG5cdFx0dGhpcy5xdWV1ZVNlcnZpY2VTdWJzY3JpcHRpb24gPSB0aGlzLnF1ZXVlU2VydmljZS5hY3Rpb25TdHJlYW0uc3Vic2NyaWJlKCAoIGFjdGlvbjogTm90aWZpZXJBY3Rpb24gKSA9PiB7XG5cdFx0XHR0aGlzLmhhbmRsZUFjdGlvbiggYWN0aW9uICkudGhlbiggKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnF1ZXVlU2VydmljZS5jb250aW51ZSgpO1xuXHRcdFx0fSApO1xuXHRcdH0gKTtcblxuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBvbmVudCBkZXN0cm95bWVudCBsaWZlY3ljbGUgaG9vaywgY2xlYW5zIHVwIHRoZSBvYnNlcnZhYmxlIHN1YnNjaXB0aW9uXG5cdCAqL1xuXHRwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG5cdFx0aWYgKCB0aGlzLnF1ZXVlU2VydmljZVN1YnNjcmlwdGlvbiApIHtcblx0XHRcdHRoaXMucXVldWVTZXJ2aWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE5vdGlmaWNhdGlvbiBpZGVudGlmaWVyLCB1c2VkIGFzIHRoZSBuZ0ZvciB0cmFja2J5IGZ1bmN0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSAgIGluZGV4ICAgICAgICBJbmRleFxuXHQgKiBAcGFyYW0gICBub3RpZmljYXRpb24gTm90aWZpZXIgbm90aWZpY2F0aW9uXG5cdCAqIEByZXR1cm5zIE5vdGlmaWNhdGlvbiBJRCBhcyB0aGUgdW5pcXVlIGlkZW50bmZpZXJcblx0ICovXG5cdHB1YmxpYyBpZGVudGlmeU5vdGlmaWNhdGlvbiggaW5kZXg6IG51bWJlciwgbm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiApOiBzdHJpbmcge1xuXHRcdHJldHVybiBub3RpZmljYXRpb24uaWQ7XG5cdH1cblxuXHQvKipcblx0ICogRXZlbnQgaGFuZGxlciwgaGFuZGxlcyBjbGlja3Mgb24gbm90aWZpY2F0aW9uIGRpc21pc3MgYnV0dG9uc1xuXHQgKlxuXHQgKiBAcGFyYW0gbm90aWZpY2F0aW9uSWQgSUQgb2YgdGhlIG5vdGlmaWNhdGlvbiB0byBkaXNtaXNzXG5cdCAqL1xuXHRwdWJsaWMgb25Ob3RpZmljYXRpb25EaXNtaXNzKCBub3RpZmljYXRpb25JZDogc3RyaW5nICk6IHZvaWQge1xuXHRcdHRoaXMucXVldWVTZXJ2aWNlLnB1c2goIHtcblx0XHRcdHBheWxvYWQ6IG5vdGlmaWNhdGlvbklkLFxuXHRcdFx0dHlwZTogJ0hJREUnXG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV2ZW50IGhhbmRsZXIsIGhhbmRsZXMgbm90aWZpY2F0aW9uIHJlYWR5IGV2ZW50c1xuXHQgKlxuXHQgKiBAcGFyYW0gbm90aWZpY2F0aW9uQ29tcG9uZW50IE5vdGlmaWNhdGlvbiBjb21wb25lbnQgcmVmZXJlbmNlXG5cdCAqL1xuXHRwdWJsaWMgb25Ob3RpZmljYXRpb25SZWFkeSggbm90aWZpY2F0aW9uQ29tcG9uZW50OiBOb3RpZmllck5vdGlmaWNhdGlvbkNvbXBvbmVudCApOiB2b2lkIHtcblx0XHRsZXQgY3VycmVudE5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gPSB0aGlzLm5vdGlmaWNhdGlvbnNbIHRoaXMubm90aWZpY2F0aW9ucy5sZW5ndGggLSAxIF07IC8vIEdldCB0aGUgbGF0ZXN0IG5vdGlmaWNhdGlvblxuXHRcdGN1cnJlbnROb3RpZmljYXRpb24uY29tcG9uZW50ID0gbm90aWZpY2F0aW9uQ29tcG9uZW50OyAvLyBTYXZlIHRoZSBuZXcgb21wb25lbnQgcmVmZXJlbmNlXG5cdFx0dGhpcy5jb250aW51ZUhhbmRsZVNob3dBY3Rpb24oIGN1cnJlbnROb3RpZmljYXRpb24gKTsgLy8gQ29udGludWUgd2l0aCBoYW5kbGluZyB0aGUgc2hvdyBhY3Rpb25cblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgaW5jb21pbmcgYWN0aW9ucyBieSBtYXBwaW5nIGFjdGlvbiB0eXBlcyB0byBtZXRob2RzLCBhbmQgdGhlbiBydW5uaW5nIHRoZW1cblx0ICpcblx0ICogQHBhcmFtICAgYWN0aW9uIEFjdGlvbiBvYmplY3Rcblx0ICogQHJldHVybnMgUHJvbWlzZSwgcmVzb2x2ZWQgd2hlbiBkb25lXG5cdCAqL1xuXHRwcml2YXRlIGhhbmRsZUFjdGlvbiggYWN0aW9uOiBOb3RpZmllckFjdGlvbiApOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXHRcdHN3aXRjaCAoIGFjdGlvbi50eXBlICkgeyAvLyBUT0RPOiBNYXliZSBhIG1hcCAoYWN0aW9uVHlwZSAtPiBjbGFzcyBtZXRob2QpIGlzIGEgY2xlYW5lciBzb2x1dGlvbiBoZXJlP1xuXHRcdFx0Y2FzZSAnU0hPVyc6XG5cdFx0XHRcdHJldHVybiB0aGlzLmhhbmRsZVNob3dBY3Rpb24oIGFjdGlvbiApO1xuXHRcdFx0Y2FzZSAnSElERSc6XG5cdFx0XHRcdHJldHVybiB0aGlzLmhhbmRsZUhpZGVBY3Rpb24oIGFjdGlvbiApO1xuXHRcdFx0Y2FzZSAnSElERV9PTERFU1QnOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5oYW5kbGVIaWRlT2xkZXN0QWN0aW9uKCBhY3Rpb24gKTtcblx0XHRcdGNhc2UgJ0hJREVfTkVXRVNUJzpcblx0XHRcdFx0cmV0dXJuIHRoaXMuaGFuZGxlSGlkZU5ld2VzdEFjdGlvbiggYWN0aW9uICk7XG5cdFx0XHRjYXNlICdISURFX0FMTCc6XG5cdFx0XHRcdHJldHVybiB0aGlzLmhhbmRsZUhpZGVBbGxBY3Rpb24oIGFjdGlvbiApO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXHRcdFx0XHRcdHJlc29sdmUoKTsgLy8gSWdub3JlIHVua25vd24gYWN0aW9uIHR5cGVzXG5cdFx0XHRcdH0gKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2hvdyBhIG5ldyBub3RpZmljYXRpb25cblx0ICpcblx0ICogV2Ugc2ltcGx5IGFkZCB0aGUgbm90aWZpY2F0aW9uIHRvIHRoZSBsaXN0LCBhbmQgdGhlbiB3YWl0IHVudGlsIGl0cyBwcm9wZXJseSBpbml0aWFsaXplZCAvIGNyZWF0ZWQgLyByZW5kZXJlZC5cblx0ICpcblx0ICogQHBhcmFtICAgYWN0aW9uIEFjdGlvbiBvYmplY3Rcblx0ICogQHJldHVybnMgUHJvbWlzZSwgcmVzb2x2ZWQgd2hlbiBkb25lXG5cdCAqL1xuXHRwcml2YXRlIGhhbmRsZVNob3dBY3Rpb24oIGFjdGlvbjogTm90aWZpZXJBY3Rpb24gKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8dW5kZWZpbmVkPiggKCByZXNvbHZlOiAoKSA9PiB2b2lkLCByZWplY3Q6ICgpID0+IHZvaWQgKSA9PiB7XG5cdFx0XHR0aGlzLnRlbXBQcm9taXNlUmVzb2x2ZXIgPSByZXNvbHZlOyAvLyBTYXZlIHRoZSBwcm9taXNlIHJlc29sdmUgZnVuY3Rpb24gc28gdGhhdCBpdCBjYW4gYmUgY2FsbGVkIGxhdGVyIG9uIGJ5IGFub3RoZXIgbWV0aG9kXG5cdFx0XHR0aGlzLmFkZE5vdGlmaWNhdGlvblRvTGlzdCggbmV3IE5vdGlmaWVyTm90aWZpY2F0aW9uKCBhY3Rpb24ucGF5bG9hZCApICk7XG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnRpbnVlIHRvIHNob3cgYSBuZXcgbm90aWZpY2F0aW9uIChhZnRlciB0aGUgbm90aWZpY2F0aW9uIGNvbXBvbmVudHMgaXMgaW5pdGlhbGl6ZWQgLyBjcmVhdGVkIC8gcmVuZGVyZWQpLlxuXHQgKlxuXHQgKiBJZiB0aGlzIGlzIHRoZSBmaXJzdCAoYW5kIHRodXMgb25seSkgbm90aWZpY2F0aW9uLCB3ZSBjYW4gc2ltcGx5IHNob3cgaXQuIE90aGVyd2hpc2UsIGlmIHN0YWNraW5nIGlzIGRpc2FibGVkIChvciBhIGxvdyB2YWx1ZSksIHdlXG5cdCAqIHN3aXRjaCBvdXQgbm90aWZpY2F0aW9ucywgaW4gcGFydGljdWxhciB3ZSBoaWRlIHRoZSBleGlzdGluZyBvbmUsIGFuZCB0aGVuIHNob3cgb3VyIG5ldyBvbmUuIFlldCwgaWYgc3RhY2tpbmcgaXMgZW5hYmxlZCwgd2UgZmlyc3Rcblx0ICogc2hpZnQgYWxsIG9sZGVyIG5vdGlmaWNhdGlvbnMsIGFuZCB0aGVuIHNob3cgb3VyIG5ldyBub3RpZmljYXRpb24uIEluIGFkZGl0aW9uLCBpZiB0aGVyZSBhcmUgdG9vIG1hbnkgbm90aWZpY2F0aW9uIG9uIHRoZSBzY3JlZW4sXG5cdCAqIHdlIGhpZGUgdGhlIG9sZGVzdCBvbmUgZmlyc3QuIEZ1cnRoZXJtb3JlLCBpZiBjb25maWd1cmVkLCBhbmltYXRpb24gb3ZlcmxhcHBpbmcgaXMgYXBwbGllZC5cblx0ICpcblx0ICogQHBhcmFtIG5vdGlmaWNhdGlvbiBOZXcgbm90aWZpY2F0aW9uIHRvIHNob3dcblx0ICovXG5cdHByaXZhdGUgY29udGludWVIYW5kbGVTaG93QWN0aW9uKCBub3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uICk6IHZvaWQge1xuXG5cdFx0Ly8gRmlyc3QgKHdoaWNoIG1lYW5zIG9ubHkgb25lKSBub3RpZmljYXRpb24gaW4gdGhlIGxpc3Q/XG5cdFx0Y29uc3QgbnVtYmVyT2ZOb3RpZmljYXRpb25zOiBudW1iZXIgPSB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoO1xuXHRcdGlmICggbnVtYmVyT2ZOb3RpZmljYXRpb25zID09PSAxICkge1xuXHRcdFx0bm90aWZpY2F0aW9uLmNvbXBvbmVudC5zaG93KCkudGhlbiggdGhpcy50ZW1wUHJvbWlzZVJlc29sdmVyICk7IC8vIERvbmVcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zdCBpbXBsaWNpdFN0YWNraW5nTGltaXQ6IG51bWJlciA9IDI7XG5cblx0XHRcdC8vIFN0YWNraW5nIGVuYWJsZWQ/IChzdGFja2luZyB2YWx1ZSBiZWxvdyAyIG1lYW5zIHN0YWNraW5nIGlzIGRpc2FibGVkKVxuXHRcdFx0aWYgKCB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuc3RhY2tpbmcgPT09IGZhbHNlIHx8IHRoaXMuY29uZmlnLmJlaGF2aW91ci5zdGFja2luZyA8IGltcGxpY2l0U3RhY2tpbmdMaW1pdCApIHtcblx0XHRcdFx0dGhpcy5ub3RpZmljYXRpb25zWyAwIF0uY29tcG9uZW50LmhpZGUoKS50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5yZW1vdmVOb3RpZmljYXRpb25Gcm9tTGlzdCggdGhpcy5ub3RpZmljYXRpb25zWyAwIF0gKTtcblx0XHRcdFx0XHRub3RpZmljYXRpb24uY29tcG9uZW50LnNob3coKS50aGVuKCB0aGlzLnRlbXBQcm9taXNlUmVzb2x2ZXIgKTsgLy8gRG9uZVxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGNvbnN0IHN0ZXBQcm9taXNlczogQXJyYXk8UHJvbWlzZTx1bmRlZmluZWQ+PiA9IFtdO1xuXG5cdFx0XHRcdC8vIEFyZSB0aGVyZSBub3cgdG9vIG1hbnkgbm90aWZpY2F0aW9ucz9cblx0XHRcdFx0aWYgKCBudW1iZXJPZk5vdGlmaWNhdGlvbnMgPiB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuc3RhY2tpbmcgKSB7XG5cblx0XHRcdFx0XHRjb25zdCBvbGROb3RpZmljYXRpb25zOiBBcnJheTxOb3RpZmllck5vdGlmaWNhdGlvbj4gPSB0aGlzLm5vdGlmaWNhdGlvbnMuc2xpY2UoIDEsIG51bWJlck9mTm90aWZpY2F0aW9ucyAtIDEgKTtcblxuXHRcdFx0XHRcdC8vIEFyZSBhbmltYXRpb25zIGVuYWJsZWQ/XG5cdFx0XHRcdFx0aWYgKCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmVuYWJsZWQgKSB7XG5cblx0XHRcdFx0XHRcdC8vIElzIGFuaW1hdGlvbiBvdmVybGFwIGVuYWJsZWQ/XG5cdFx0XHRcdFx0XHRpZiAoIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMub3ZlcmxhcCAhPT0gZmFsc2UgJiYgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5vdmVybGFwID4gMCApIHtcblx0XHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIHRoaXMubm90aWZpY2F0aW9uc1sgMCBdLmNvbXBvbmVudC5oaWRlKCkgKTtcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLnNoaWZ0Tm90aWZpY2F0aW9ucyggb2xkTm90aWZpY2F0aW9ucywgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRIZWlnaHQoKSwgdHJ1ZSApICk7XG5cdFx0XHRcdFx0XHRcdH0sIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuaGlkZS5zcGVlZCAtIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMub3ZlcmxhcCApO1xuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2hvdygpICk7XG5cdFx0XHRcdFx0XHRcdH0sIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuaGlkZS5zcGVlZCArIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuc2hpZnQuc3BlZWQgLSB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm5vdGlmaWNhdGlvbnNbIDAgXS5jb21wb25lbnQuaGlkZSgpLnRoZW4oICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc2hpZnROb3RpZmljYXRpb25zKCBvbGROb3RpZmljYXRpb25zLCBub3RpZmljYXRpb24uY29tcG9uZW50LmdldEhlaWdodCgpLCB0cnVlICkudGhlbiggKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRub3RpZmljYXRpb24uY29tcG9uZW50LnNob3coKS50aGVuKCByZXNvbHZlICk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0XHR9ICkgKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggdGhpcy5ub3RpZmljYXRpb25zWyAwIF0uY29tcG9uZW50LmhpZGUoKSApO1xuXHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIHRoaXMuc2hpZnROb3RpZmljYXRpb25zKCBvbGROb3RpZmljYXRpb25zLCBub3RpZmljYXRpb24uY29tcG9uZW50LmdldEhlaWdodCgpLCB0cnVlICkgKTtcblx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCBub3RpZmljYXRpb24uY29tcG9uZW50LnNob3coKSApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0Y29uc3Qgb2xkTm90aWZpY2F0aW9uczogQXJyYXk8Tm90aWZpZXJOb3RpZmljYXRpb24+ID0gdGhpcy5ub3RpZmljYXRpb25zLnNsaWNlKCAwLCBudW1iZXJPZk5vdGlmaWNhdGlvbnMgLSAxICk7XG5cblx0XHRcdFx0XHQvLyBBcmUgYW5pbWF0aW9ucyBlbmFibGVkP1xuXHRcdFx0XHRcdGlmICggdGhpcy5jb25maWcuYW5pbWF0aW9ucy5lbmFibGVkICkge1xuXG5cdFx0XHRcdFx0XHQvLyBJcyBhbmltYXRpb24gb3ZlcmxhcCBlbmFibGVkP1xuXHRcdFx0XHRcdFx0aWYgKCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgIT09IGZhbHNlICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMub3ZlcmxhcCA+IDAgKSB7XG5cdFx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLnNoaWZ0Tm90aWZpY2F0aW9ucyggb2xkTm90aWZpY2F0aW9ucywgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRIZWlnaHQoKSwgdHJ1ZSApICk7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbm90aWZpY2F0aW9uLmNvbXBvbmVudC5zaG93KCkgKTtcblx0XHRcdFx0XHRcdFx0fSwgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5zaGlmdC5zcGVlZCAtIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMub3ZlcmxhcCApO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2hpZnROb3RpZmljYXRpb25zKCBvbGROb3RpZmljYXRpb25zLCBub3RpZmljYXRpb24uY29tcG9uZW50LmdldEhlaWdodCgpLCB0cnVlICkudGhlbiggKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0bm90aWZpY2F0aW9uLmNvbXBvbmVudC5zaG93KCkudGhlbiggcmVzb2x2ZSApO1xuXHRcdFx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdFx0fSApICk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIHRoaXMuc2hpZnROb3RpZmljYXRpb25zKCBvbGROb3RpZmljYXRpb25zLCBub3RpZmljYXRpb24uY29tcG9uZW50LmdldEhlaWdodCgpLCB0cnVlICkgKTtcblx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCBub3RpZmljYXRpb24uY29tcG9uZW50LnNob3coKSApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0UHJvbWlzZS5hbGwoIHN0ZXBQcm9taXNlcyApLnRoZW4oICgpID0+IHtcblx0XHRcdFx0XHRpZiAoIG51bWJlck9mTm90aWZpY2F0aW9ucyA+IHRoaXMuY29uZmlnLmJlaGF2aW91ci5zdGFja2luZyApIHtcblx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlTm90aWZpY2F0aW9uRnJvbUxpc3QoIHRoaXMubm90aWZpY2F0aW9uc1sgMCBdICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMudGVtcFByb21pc2VSZXNvbHZlcigpO1xuXHRcdFx0XHR9ICk7IC8vIERvbmVcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxuXHQvKipcblx0ICogSGlkZSBhbiBleGlzdGluZyBub3RpZmljYXRpb25cblx0ICpcblx0ICogRmlzdCwgd2Ugc2tpcCBldmVyeXRoaW5nIGlmIHRoZXJlIGFyZSBubyBub3RpZmljYXRpb25zIGF0IGFsbCwgb3IgdGhlIGdpdmVuIG5vdGlmaWNhdGlvbiBkb2VzIG5vdCBleGlzdC4gVGhlbiwgd2UgaGlkZSB0aGUgZ2l2ZW5cblx0ICogbm90aWZpY2F0aW9uLiBJZiB0aGVyZSBleGlzdCBvbGRlciBub3RpZmljYXRpb25zLCB3ZSB0aGVuIHNoaWZ0IHRoZW0gYXJvdW5kIHRvIGZpbGwgdGhlIGdhcC4gT25jZSBib3RoIGhpZGluZyB0aGUgZ2l2ZW4gbm90aWZpY2F0aW9uXG5cdCAqIGFuZCBzaGlmdGluZyB0aGUgb2xkZXIgbm90aWZpY2FpdG9ucyBpcyBkb25lLCB0aGUgZ2l2ZW4gbm90aWZpY2F0aW9uIGdldHMgZmluYWxseSByZW1vdmVkIChmcm9tIHRoZSBET00pLlxuXHQgKlxuXHQgKiBAcGFyYW0gICBhY3Rpb24gQWN0aW9uIG9iamVjdCwgcGF5bG9hZCBjb250YWlucyB0aGUgbm90aWZpY2F0aW9uIElEXG5cdCAqIEByZXR1cm5zIFByb21pc2UsIHJlc29sdmVkIHdoZW4gZG9uZVxuXHQgKi9cblx0cHJpdmF0ZSBoYW5kbGVIaWRlQWN0aW9uKCBhY3Rpb246IE5vdGlmaWVyQWN0aW9uICk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXG5cdFx0XHRjb25zdCBzdGVwUHJvbWlzZXM6IEFycmF5PFByb21pc2U8dW5kZWZpbmVkPj4gPSBbXTtcblxuXHRcdFx0Ly8gRG9lcyB0aGUgbm90aWZpY2F0aW9uIGV4aXN0IC8gYXJlIHRoZXJlIGV2ZW4gYW55IG5vdGlmaWNhdGlvbnM/IChsZXQncyBwcmV2ZW50IGFjY2lkZW50aWFsIGVycm9ycylcblx0XHRcdGNvbnN0IG5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gfCB1bmRlZmluZWQgPSB0aGlzLmZpbmROb3RpZmljYXRpb25CeUlkKCBhY3Rpb24ucGF5bG9hZCApO1xuXHRcdFx0aWYgKCBub3RpZmljYXRpb24gPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdldCBvbGRlciBub3RpZmljYXRpb25zXG5cdFx0XHRjb25zdCBub3RpZmljYXRpb25JbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdGhpcy5maW5kTm90aWZpY2F0aW9uSW5kZXhCeUlkKCBhY3Rpb24ucGF5bG9hZCApO1xuXHRcdFx0aWYgKCBub3RpZmljYXRpb25JbmRleCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNvbnN0IG9sZE5vdGlmaWNhdGlvbnM6IEFycmF5PE5vdGlmaWVyTm90aWZpY2F0aW9uPiA9IHRoaXMubm90aWZpY2F0aW9ucy5zbGljZSggMCwgbm90aWZpY2F0aW9uSW5kZXggKTtcblxuXHRcdFx0Ly8gRG8gb2xkZXIgbm90aWZpY2F0aW9ucyBleGlzdCwgYW5kIHRodXMgZG8gd2UgbmVlZCB0byBzaGlmdCBvdGhlciBub3RpZmljYXRpb25zIGFzIGEgY29uc2VxdWVuY2U/XG5cdFx0XHRpZiAoIG9sZE5vdGlmaWNhdGlvbnMubGVuZ3RoID4gMCApIHtcblxuXHRcdFx0XHQvLyBBcmUgYW5pbWF0aW9ucyBlbmFibGVkP1xuXHRcdFx0XHRpZiAoIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuZW5hYmxlZCAmJiB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmhpZGUuc3BlZWQgPiAwICkge1xuXG5cdFx0XHRcdFx0Ly8gSXMgYW5pbWF0aW9uIG92ZXJsYXAgZW5hYmxlZD9cblx0XHRcdFx0XHRpZiAoIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMub3ZlcmxhcCAhPT0gZmFsc2UgJiYgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5vdmVybGFwID4gMCApIHtcblx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCBub3RpZmljYXRpb24uY29tcG9uZW50LmhpZGUoKSApO1xuXHRcdFx0XHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggdGhpcy5zaGlmdE5vdGlmaWNhdGlvbnMoIG9sZE5vdGlmaWNhdGlvbnMsIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0SGVpZ2h0KCksIGZhbHNlICkgKTtcblx0XHRcdFx0XHRcdH0sIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuaGlkZS5zcGVlZCAtIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMub3ZlcmxhcCApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRub3RpZmljYXRpb24uY29tcG9uZW50LmhpZGUoKS50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLnNoaWZ0Tm90aWZpY2F0aW9ucyggb2xkTm90aWZpY2F0aW9ucywgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRIZWlnaHQoKSwgZmFsc2UgKSApO1xuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbm90aWZpY2F0aW9uLmNvbXBvbmVudC5oaWRlKCkgKTtcblx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggdGhpcy5zaGlmdE5vdGlmaWNhdGlvbnMoIG9sZE5vdGlmaWNhdGlvbnMsIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0SGVpZ2h0KCksIGZhbHNlICkgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCBub3RpZmljYXRpb24uY29tcG9uZW50LmhpZGUoKSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIFdhaXQgdW50aWwgYm90aCBoaWRpbmcgYW5kIHNoaWZ0aW5nIGlzIGRvbmUsIHRoZW4gcmVtb3ZlIHRoZSBub3RpZmljYXRpb24gZnJvbSB0aGUgbGlzdFxuXHRcdFx0UHJvbWlzZS5hbGwoIHN0ZXBQcm9taXNlcyApLnRoZW4oICgpID0+IHtcblx0XHRcdFx0dGhpcy5yZW1vdmVOb3RpZmljYXRpb25Gcm9tTGlzdCggbm90aWZpY2F0aW9uICk7XG5cdFx0XHRcdHJlc29sdmUoKTsgLy8gRG9uZVxuXHRcdFx0fSApO1xuXG5cdFx0fSApO1xuXG5cdH1cblxuXHQvKipcblx0ICogSGlkZSB0aGUgb2xkZXN0IG5vdGlmaWNhdGlvbiAoYnJpZGdlIHRvIGhhbmRsZUhpZGVBY3Rpb24pXG5cdCAqXG5cdCAqIEBwYXJhbSAgIGFjdGlvbiBBY3Rpb24gb2JqZWN0XG5cdCAqIEByZXR1cm5zIFByb21pc2UsIHJlc29sdmVkIHdoZW4gZG9uZVxuXHQgKi9cblx0cHJpdmF0ZSBoYW5kbGVIaWRlT2xkZXN0QWN0aW9uKCBhY3Rpb246IE5vdGlmaWVyQWN0aW9uICk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG5cblx0XHQvLyBBcmUgdGhlcmUgYW55IG5vdGlmaWNhdGlvbnM/IChwcmV2ZW50IGFjY2lkZW50aWFsIGVycm9ycylcblx0XHRpZiAoIHRoaXMubm90aWZpY2F0aW9ucy5sZW5ndGggPT09IDAgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2U8dW5kZWZpbmVkPiggKCByZXNvbHZlOiAoKSA9PiB2b2lkLCByZWplY3Q6ICgpID0+IHZvaWQgKSA9PiB7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH0gKTsgLy8gRG9uZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRhY3Rpb24ucGF5bG9hZCA9IHRoaXMubm90aWZpY2F0aW9uc1sgMCBdLmlkO1xuXHRcdFx0cmV0dXJuIHRoaXMuaGFuZGxlSGlkZUFjdGlvbiggYWN0aW9uICk7XG5cdFx0fVxuXG5cdH1cblxuXHQvKipcblx0ICogSGlkZSB0aGUgbmV3ZXN0IG5vdGlmaWNhdGlvbiAoYnJpZGdlIHRvIGhhbmRsZUhpZGVBY3Rpb24pXG5cdCAqXG5cdCAqIEBwYXJhbSAgIGFjdGlvbiBBY3Rpb24gb2JqZWN0XG5cdCAqIEByZXR1cm5zIFByb21pc2UsIHJlc29sdmVkIHdoZW4gZG9uZVxuXHQgKi9cblx0cHJpdmF0ZSBoYW5kbGVIaWRlTmV3ZXN0QWN0aW9uKCBhY3Rpb246IE5vdGlmaWVyQWN0aW9uICk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG5cblx0XHQvLyBBcmUgdGhlcmUgYW55IG5vdGlmaWNhdGlvbnM/IChwcmV2ZW50IGFjY2lkZW50aWFsIGVycm9ycylcblx0XHRpZiAoIHRoaXMubm90aWZpY2F0aW9ucy5sZW5ndGggPT09IDAgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2U8dW5kZWZpbmVkPiggKCByZXNvbHZlOiAoKSA9PiB2b2lkLCByZWplY3Q6ICgpID0+IHZvaWQgKSA9PiB7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH0gKTsgLy8gRG9uZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRhY3Rpb24ucGF5bG9hZCA9IHRoaXMubm90aWZpY2F0aW9uc1sgdGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aCAtIDEgXS5pZDtcblx0XHRcdHJldHVybiB0aGlzLmhhbmRsZUhpZGVBY3Rpb24oIGFjdGlvbiApO1xuXHRcdH1cblxuXHR9XG5cblx0LyoqXG5cdCAqIEhpZGUgYWxsIG5vdGlmaWNhdGlvbnMgYXQgb25jZVxuXHQgKlxuXHQgKiBAcGFyYW0gICBhY3Rpb24gQWN0aW9uIG9iamVjdFxuXHQgKiBAcmV0dXJucyBQcm9taXNlLCByZXNvbHZlZCB3aGVuIGRvbmVcblx0ICovXG5cdHByaXZhdGUgaGFuZGxlSGlkZUFsbEFjdGlvbiggYWN0aW9uOiBOb3RpZmllckFjdGlvbiApOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblxuXHRcdFx0Ly8gQXJlIHRoZXJlIGFueSBub3RpZmljYXRpb25zPyAocHJldmVudCBhY2NpZGVudGlhbCBlcnJvcnMpXG5cdFx0XHRjb25zdCBudW1iZXJPZk5vdGlmaWNhdGlvbnM6IG51bWJlciA9IHRoaXMubm90aWZpY2F0aW9ucy5sZW5ndGg7XG5cdFx0XHRpZiAoIG51bWJlck9mTm90aWZpY2F0aW9ucyA9PT0gMCApIHtcblx0XHRcdFx0cmVzb2x2ZSgpOyAvLyBEb25lXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQXJlIGFuaW1hdGlvbnMgZW5hYmxlZD9cblx0XHRcdGlmICggdGhpcy5jb25maWcuYW5pbWF0aW9ucy5lbmFibGVkICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuaGlkZS5zcGVlZCA+IDAgJiYgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5oaWRlLm9mZnNldCAhPT0gZmFsc2UgJiZcblx0XHRcdFx0dGhpcy5jb25maWcuYW5pbWF0aW9ucy5oaWRlLm9mZnNldCA+IDAgKSB7XG5cblx0XHRcdFx0Zm9yICggbGV0IGk6IG51bWJlciA9IG51bWJlck9mTm90aWZpY2F0aW9ucyAtIDE7IGkgPj0gMDsgaS0tICkge1xuXHRcdFx0XHRcdGNvbnN0IGFuaW1hdGlvbk9mZnNldDogbnVtYmVyID0gdGhpcy5jb25maWcucG9zaXRpb24udmVydGljYWwucG9zaXRpb24gPT09ICd0b3AnID8gbnVtYmVyT2ZOb3RpZmljYXRpb25zIC0gMSA6IGk7XG5cdFx0XHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5ub3RpZmljYXRpb25zWyBpIF0uY29tcG9uZW50LmhpZGUoKS50aGVuKCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQXJlIHdlIGRvbmUgaGVyZSwgd2FzIHRoaXMgdGhlIGxhc3Qgbm90aWZpY2F0aW9uIHRvIGJlIGhpZGRlbj9cblx0XHRcdFx0XHRcdFx0aWYgKCAoIHRoaXMuY29uZmlnLnBvc2l0aW9uLnZlcnRpY2FsLnBvc2l0aW9uID09PSAndG9wJyAmJiBpID09PSAwICkgfHxcblx0XHRcdFx0XHRcdFx0XHQoIHRoaXMuY29uZmlnLnBvc2l0aW9uLnZlcnRpY2FsLnBvc2l0aW9uID09PSAnYm90dG9tJyAmJiBpID09PSBudW1iZXJPZk5vdGlmaWNhdGlvbnMgLSAxICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5yZW1vdmVBbGxOb3RpZmljYXRpb25zRnJvbUxpc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCk7IC8vIERvbmVcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0fSwgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5oaWRlLm9mZnNldCAqIGFuaW1hdGlvbk9mZnNldCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0bGV0IHN0ZXBQcm9taXNlczogQXJyYXk8UHJvbWlzZTx1bmRlZmluZWQ+PiA9IFtdO1xuXHRcdFx0XHRmb3IgKCBsZXQgaTogbnVtYmVyID0gbnVtYmVyT2ZOb3RpZmljYXRpb25zIC0gMTsgaSA+PSAwOyBpLS0gKSB7XG5cdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIHRoaXMubm90aWZpY2F0aW9uc1sgaSBdLmNvbXBvbmVudC5oaWRlKCkgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRQcm9taXNlLmFsbCggc3RlcFByb21pc2VzICkudGhlbiggKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucmVtb3ZlQWxsTm90aWZpY2F0aW9uc0Zyb21MaXN0KCk7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpOyAvLyBEb25lXG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNoaWZ0IG11bHRpcGxlIG5vdGlmaWNhdGlvbnMgYXQgb25jZVxuXHQgKlxuXHQgKiBAcGFyYW0gICBub3RpZmljYXRpb25zIExpc3QgY29udGFpbmluZyB0aGUgbm90aWZpY2F0aW9ucyB0byBiZSBzaGlmdGVkXG5cdCAqIEBwYXJhbSAgIGRpc3RhbmNlICAgICAgRGlzdGFuY2UgdG8gc2hpZnQgKGluIHB4KVxuXHQgKiBAcGFyYW0gICB0b01ha2VQbGFjZSAgIEZsYWcsIGRlZmluaW5nIGluIHdoaWNoIGRpcmVjaXRvbiB0byBzaGlmdFxuXHQgKiBAcmV0dXJucyBQcm9taXNlLCByZXNvbHZlZCB3aGVuIGRvbmVcblx0ICovXG5cdHByaXZhdGUgc2hpZnROb3RpZmljYXRpb25zKCBub3RpZmljYXRpb25zOiBBcnJheTxOb3RpZmllck5vdGlmaWNhdGlvbj4sIGRpc3RhbmNlOiBudW1iZXIsIHRvTWFrZVBsYWNlOiBib29sZWFuICk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXG5cdFx0XHQvLyBBcmUgdGhlcmUgYW55IG5vdGlmaWNhdGlvbnMgdG8gc2hpZnQ/XG5cdFx0XHRpZiAoIG5vdGlmaWNhdGlvbnMubGVuZ3RoID09PSAwICkge1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0bGV0IG5vdGlmaWNhdGlvblByb21pc2VzOiBBcnJheTxQcm9taXNlPHVuZGVmaW5lZD4+ID0gW107XG5cdFx0XHRmb3IgKCBsZXQgaTogbnVtYmVyID0gbm90aWZpY2F0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSApIHtcblx0XHRcdFx0bm90aWZpY2F0aW9uUHJvbWlzZXMucHVzaCggbm90aWZpY2F0aW9uc1sgaSBdLmNvbXBvbmVudC5zaGlmdCggZGlzdGFuY2UsIHRvTWFrZVBsYWNlICkgKTtcblx0XHRcdH1cblx0XHRcdFByb21pc2UuYWxsKCBub3RpZmljYXRpb25Qcm9taXNlcyApLnRoZW4oIHJlc29sdmUgKTsgLy8gRG9uZVxuXG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBhIG5ldyBub3RpZmljYXRpb24gdG8gdGhlIGxpc3Qgb2Ygbm90aWZpY2F0aW9ucyAodHJpZ2dlcnMgY2hhbmdlIGRldGVjdGlvbilcblx0ICpcblx0ICogQHBhcmFtIG5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb24gdG8gYWRkIHRvIHRoZSBsaXN0IG9mIG5vdGlmaWNhdGlvbnNcblx0ICovXG5cdHByaXZhdGUgYWRkTm90aWZpY2F0aW9uVG9MaXN0KCBub3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uICk6IHZvaWQge1xuXHRcdHRoaXMubm90aWZpY2F0aW9ucy5wdXNoKCBub3RpZmljYXRpb24gKTtcblx0XHR0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpOyAvLyBSdW4gY2hhbmdlIGRldGVjdGlvbiBiZWNhdXNlIHRoZSBub3RpZmljYXRpb24gbGlzdCBjaGFuZ2VkXG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIGFuIGV4aXN0aW5nIG5vdGlmaWNhdGlvbiBmcm9tIHRoZSBsaXN0IG9mIG5vdGlmaWNhdGlvbnMgKHRyaWdnZXJzIGNoYW5nZSBkZXRlY3Rpb24pXG5cdCAqXG5cdCAqIEBwYXJhbSBub3RpZmljYXRpb24gTm90aWZpY2F0aW9uIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGlzdCBvZiBub3RpZmljYXRpb25zXG5cdCAqL1xuXHRwcml2YXRlIHJlbW92ZU5vdGlmaWNhdGlvbkZyb21MaXN0KCBub3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uICk6IHZvaWQge1xuXHRcdHRoaXMubm90aWZpY2F0aW9ucyA9XG5cdFx0XHR0aGlzLm5vdGlmaWNhdGlvbnMuZmlsdGVyKCAoIGl0ZW06IE5vdGlmaWVyTm90aWZpY2F0aW9uICkgPT4gaXRlbS5jb21wb25lbnQgIT09IG5vdGlmaWNhdGlvbi5jb21wb25lbnQgKTtcblx0XHR0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpOyAvLyBSdW4gY2hhbmdlIGRldGVjdGlvbiBiZWNhdXNlIHRoZSBub3RpZmljYXRpb24gbGlzdCBjaGFuZ2VkXG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIGFsbCBub3RpZmljYXRpb25zIGZyb20gdGhlIGxpc3QgKHRyaWdnZXJzIGNoYW5nZSBkZXRlY3Rpb24pXG5cdCAqL1xuXHRwcml2YXRlIHJlbW92ZUFsbE5vdGlmaWNhdGlvbnNGcm9tTGlzdCgpOiB2b2lkIHtcblx0XHR0aGlzLm5vdGlmaWNhdGlvbnMgPSBbXTtcblx0XHR0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpOyAvLyBSdW4gY2hhbmdlIGRldGVjdGlvbiBiZWNhdXNlIHRoZSBub3RpZmljYXRpb24gbGlzdCBjaGFuZ2VkXG5cdH1cblxuXHQvKipcblx0ICogSGVscGVyOiBGaW5kIGEgbm90aWZpY2F0aW9uIGluIHRoZSBub3RpZmljYXRpb24gbGlzdCBieSBhIGdpdmVuIG5vdGlmaWNhdGlvbiBJRFxuXHQgKlxuXHQgKiBAcGFyYW0gICBub3RpZmljYXRpb25JZCBOb3RpZmljYXRpb24gSUQsIHVzZWQgZm9yIGZpbmRpbmcgbm90aWZpY2F0aW9uXG5cdCAqIEByZXR1cm5zIE5vdGlmaWNhdGlvbiwgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZFxuXHQgKi9cblx0cHJpdmF0ZSBmaW5kTm90aWZpY2F0aW9uQnlJZCggbm90aWZpY2F0aW9uSWQ6IHN0cmluZyApOiBOb3RpZmllck5vdGlmaWNhdGlvbiB8IHVuZGVmaW5lZCB7XG5cdFx0cmV0dXJuIHRoaXMubm90aWZpY2F0aW9ucy5maW5kKCAoIGN1cnJlbnROb3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uICkgPT4gY3VycmVudE5vdGlmaWNhdGlvbi5pZCA9PT0gbm90aWZpY2F0aW9uSWQgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIZWxwZXI6IEZpbmQgYSBub3RpZmljYXRpb24ncyBpbmRleCBieSBhIGdpdmVuIG5vdGlmaWNhdGlvbiBJRFxuXHQgKlxuXHQgKiBAcGFyYW0gICBub3RpZmljYXRpb25JZCBOb3RpZmljYXRpb24gSUQsIHVzZWQgZm9yIGZpbmRpbmcgYSBub3RpZmljYXRpb24ncyBpbmRleFxuXHQgKiBAcmV0dXJucyBOb3RpZmljYXRpb24gaW5kZXgsIHVuZGVmaW5lZCBpZiBub3QgZm91bmRcblx0ICovXG5cdHByaXZhdGUgZmluZE5vdGlmaWNhdGlvbkluZGV4QnlJZCggbm90aWZpY2F0aW9uSWQ6IHN0cmluZyApOiBudW1iZXIgfCB1bmRlZmluZWQge1xuXHRcdGNvbnN0IG5vdGlmaWNhdGlvbkluZGV4OiBudW1iZXIgPVxuXHRcdFx0dGhpcy5ub3RpZmljYXRpb25zLmZpbmRJbmRleCggKCBjdXJyZW50Tm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiApID0+IGN1cnJlbnROb3RpZmljYXRpb24uaWQgPT09IG5vdGlmaWNhdGlvbklkICk7XG5cdFx0cmV0dXJuICggbm90aWZpY2F0aW9uSW5kZXggIT09IC0xID8gbm90aWZpY2F0aW9uSW5kZXggOiB1bmRlZmluZWQgKTtcblx0fVxuXG59XG4iLCI8dWw+XG5cdDxsaSBjbGFzcz1cIm5vdGlmaWVyX19jb250YWluZXItbGlzdFwiICpuZ0Zvcj1cImxldCBub3RpZmljYXRpb24gb2Ygbm90aWZpY2F0aW9uczsgdHJhY2tCeTogaWRlbnRpZnlOb3RpZmljYXRpb247XCI+XG5cdFx0PG5vdGlmaWVyLW5vdGlmaWNhdGlvblxuXHRcdFx0W25vdGlmaWNhdGlvbl09XCJub3RpZmljYXRpb25cIlxuXHRcdFx0KHJlYWR5KT1cIm9uTm90aWZpY2F0aW9uUmVhZHkoICRldmVudCApXCJcblx0XHRcdChkaXNtaXNzKT1cIm9uTm90aWZpY2F0aW9uRGlzbWlzcyggJGV2ZW50IClcIj5cblx0XHQ8L25vdGlmaWVyLW5vdGlmaWNhdGlvbj5cblx0PC9saT5cbjwvdWw+XG4iXX0=