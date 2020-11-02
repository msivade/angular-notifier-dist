/**
 * @fileoverview added by tsickle
 * Generated from: lib/components/notifier-container.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NotifierNotification } from '../models/notifier-notification.model';
import { NotifierQueueService } from '../services/notifier-queue.service';
import { NotifierService } from '../services/notifier.service';
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
     * @param {?} changeDetector       Change detector, used for manually triggering change detection runs
     * @param {?} notifierQueueService Notifier queue service
     * @param {?} notifierService      Notifier service
     */
    constructor(changeDetector, notifierQueueService, notifierService) {
        this.changeDetector = changeDetector;
        this.queueService = notifierQueueService;
        this.config = notifierService.getConfig();
        this.notifications = [];
        // Connects this component up to the action queue, then handle incoming actions
        this.queueServiceSubscription = this.queueService.actionStream.subscribe((/**
         * @param {?} action
         * @return {?}
         */
        (action) => {
            this.handleAction(action).then((/**
             * @return {?}
             */
            () => {
                this.queueService.continue();
            }));
        }));
    }
    /**
     * Component destroyment lifecycle hook, cleans up the observable subsciption
     * @return {?}
     */
    ngOnDestroy() {
        if (this.queueServiceSubscription) {
            this.queueServiceSubscription.unsubscribe();
        }
    }
    /**
     * Notification identifier, used as the ngFor trackby function
     *
     * @param {?} index        Index
     * @param {?} notification Notifier notification
     * @return {?} Notification ID as the unique identnfier
     */
    identifyNotification(index, notification) {
        return notification.id;
    }
    /**
     * Event handler, handles clicks on notification dismiss buttons
     *
     * @param {?} notificationId ID of the notification to dismiss
     * @return {?}
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
     * @param {?} notificationComponent Notification component reference
     * @return {?}
     */
    onNotificationReady(notificationComponent) {
        /** @type {?} */
        let currentNotification = this.notifications[this.notifications.length - 1];
        currentNotification.component = notificationComponent; // Save the new omponent reference
        this.continueHandleShowAction(currentNotification); // Continue with handling the show action
    }
    /**
     * Handle incoming actions by mapping action types to methods, and then running them
     *
     * @private
     * @param {?} action Action object
     * @return {?} Promise, resolved when done
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
                return new Promise((/**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */
                (resolve, reject) => {
                    resolve(); // Ignore unknown action types
                }));
        }
    }
    /**
     * Show a new notification
     *
     * We simply add the notification to the list, and then wait until its properly initialized / created / rendered.
     *
     * @private
     * @param {?} action Action object
     * @return {?} Promise, resolved when done
     */
    handleShowAction(action) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.tempPromiseResolver = resolve; // Save the promise resolve function so that it can be called later on by another method
            this.addNotificationToList(new NotifierNotification(action.payload));
        }));
    }
    /**
     * Continue to show a new notification (after the notification components is initialized / created / rendered).
     *
     * If this is the first (and thus only) notification, we can simply show it. Otherwhise, if stacking is disabled (or a low value), we
     * switch out notifications, in particular we hide the existing one, and then show our new one. Yet, if stacking is enabled, we first
     * shift all older notifications, and then show our new notification. In addition, if there are too many notification on the screen,
     * we hide the oldest one first. Furthermore, if configured, animation overlapping is applied.
     *
     * @private
     * @param {?} notification New notification to show
     * @return {?}
     */
    continueHandleShowAction(notification) {
        // First (which means only one) notification in the list?
        /** @type {?} */
        const numberOfNotifications = this.notifications.length;
        if (numberOfNotifications === 1) {
            notification.component.show().then(this.tempPromiseResolver); // Done
        }
        else {
            /** @type {?} */
            const implicitStackingLimit = 2;
            // Stacking enabled? (stacking value below 2 means stacking is disabled)
            if (this.config.behaviour.stacking === false || this.config.behaviour.stacking < implicitStackingLimit) {
                this.notifications[0].component.hide().then((/**
                 * @return {?}
                 */
                () => {
                    this.removeNotificationFromList(this.notifications[0]);
                    notification.component.show().then(this.tempPromiseResolver); // Done
                }));
            }
            else {
                /** @type {?} */
                const stepPromises = [];
                // Are there now too many notifications?
                if (numberOfNotifications > this.config.behaviour.stacking) {
                    /** @type {?} */
                    const oldNotifications = this.notifications.slice(1, numberOfNotifications - 1);
                    // Are animations enabled?
                    if (this.config.animations.enabled) {
                        // Is animation overlap enabled?
                        if (this.config.animations.overlap !== false && this.config.animations.overlap > 0) {
                            stepPromises.push(this.notifications[0].component.hide());
                            setTimeout((/**
                             * @return {?}
                             */
                            () => {
                                stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), true));
                            }), this.config.animations.hide.speed - this.config.animations.overlap);
                            setTimeout((/**
                             * @return {?}
                             */
                            () => {
                                stepPromises.push(notification.component.show());
                            }), this.config.animations.hide.speed + this.config.animations.shift.speed - this.config.animations.overlap);
                        }
                        else {
                            stepPromises.push(new Promise((/**
                             * @param {?} resolve
                             * @param {?} reject
                             * @return {?}
                             */
                            (resolve, reject) => {
                                this.notifications[0].component.hide().then((/**
                                 * @return {?}
                                 */
                                () => {
                                    this.shiftNotifications(oldNotifications, notification.component.getHeight(), true).then((/**
                                     * @return {?}
                                     */
                                    () => {
                                        notification.component.show().then(resolve);
                                    }));
                                }));
                            })));
                        }
                    }
                    else {
                        stepPromises.push(this.notifications[0].component.hide());
                        stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), true));
                        stepPromises.push(notification.component.show());
                    }
                }
                else {
                    /** @type {?} */
                    const oldNotifications = this.notifications.slice(0, numberOfNotifications - 1);
                    // Are animations enabled?
                    if (this.config.animations.enabled) {
                        // Is animation overlap enabled?
                        if (this.config.animations.overlap !== false && this.config.animations.overlap > 0) {
                            stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), true));
                            setTimeout((/**
                             * @return {?}
                             */
                            () => {
                                stepPromises.push(notification.component.show());
                            }), this.config.animations.shift.speed - this.config.animations.overlap);
                        }
                        else {
                            stepPromises.push(new Promise((/**
                             * @param {?} resolve
                             * @param {?} reject
                             * @return {?}
                             */
                            (resolve, reject) => {
                                this.shiftNotifications(oldNotifications, notification.component.getHeight(), true).then((/**
                                 * @return {?}
                                 */
                                () => {
                                    notification.component.show().then(resolve);
                                }));
                            })));
                        }
                    }
                    else {
                        stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), true));
                        stepPromises.push(notification.component.show());
                    }
                }
                Promise.all(stepPromises).then((/**
                 * @return {?}
                 */
                () => {
                    if (numberOfNotifications > this.config.behaviour.stacking) {
                        this.removeNotificationFromList(this.notifications[0]);
                    }
                    this.tempPromiseResolver();
                })); // Done
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
     * @private
     * @param {?} action Action object, payload contains the notification ID
     * @return {?} Promise, resolved when done
     */
    handleHideAction(action) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const stepPromises = [];
            // Does the notification exist / are there even any notifications? (let's prevent accidential errors)
            /** @type {?} */
            const notification = this.findNotificationById(action.payload);
            if (notification === undefined) {
                resolve();
                return;
            }
            // Get older notifications
            /** @type {?} */
            const notificationIndex = this.findNotificationIndexById(action.payload);
            if (notificationIndex === undefined) {
                resolve();
                return;
            }
            /** @type {?} */
            const oldNotifications = this.notifications.slice(0, notificationIndex);
            // Do older notifications exist, and thus do we need to shift other notifications as a consequence?
            if (oldNotifications.length > 0) {
                // Are animations enabled?
                if (this.config.animations.enabled && this.config.animations.hide.speed > 0) {
                    // Is animation overlap enabled?
                    if (this.config.animations.overlap !== false && this.config.animations.overlap > 0) {
                        stepPromises.push(notification.component.hide());
                        setTimeout((/**
                         * @return {?}
                         */
                        () => {
                            stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), false));
                        }), this.config.animations.hide.speed - this.config.animations.overlap);
                    }
                    else {
                        notification.component.hide().then((/**
                         * @return {?}
                         */
                        () => {
                            stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), false));
                        }));
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
            Promise.all(stepPromises).then((/**
             * @return {?}
             */
            () => {
                this.removeNotificationFromList(notification);
                resolve(); // Done
            }));
        }));
    }
    /**
     * Hide the oldest notification (bridge to handleHideAction)
     *
     * @private
     * @param {?} action Action object
     * @return {?} Promise, resolved when done
     */
    handleHideOldestAction(action) {
        // Are there any notifications? (prevent accidential errors)
        if (this.notifications.length === 0) {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                resolve();
            })); // Done
        }
        else {
            action.payload = this.notifications[0].id;
            return this.handleHideAction(action);
        }
    }
    /**
     * Hide the newest notification (bridge to handleHideAction)
     *
     * @private
     * @param {?} action Action object
     * @return {?} Promise, resolved when done
     */
    handleHideNewestAction(action) {
        // Are there any notifications? (prevent accidential errors)
        if (this.notifications.length === 0) {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                resolve();
            })); // Done
        }
        else {
            action.payload = this.notifications[this.notifications.length - 1].id;
            return this.handleHideAction(action);
        }
    }
    /**
     * Hide all notifications at once
     *
     * @private
     * @param {?} action Action object
     * @return {?} Promise, resolved when done
     */
    handleHideAllAction(action) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            // Are there any notifications? (prevent accidential errors)
            /** @type {?} */
            const numberOfNotifications = this.notifications.length;
            if (numberOfNotifications === 0) {
                resolve(); // Done
                return;
            }
            // Are animations enabled?
            if (this.config.animations.enabled && this.config.animations.hide.speed > 0 && this.config.animations.hide.offset !== false &&
                this.config.animations.hide.offset > 0) {
                for (let i = numberOfNotifications - 1; i >= 0; i--) {
                    /** @type {?} */
                    const animationOffset = this.config.position.vertical.position === 'top' ? numberOfNotifications - 1 : i;
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.notifications[i].component.hide().then((/**
                         * @return {?}
                         */
                        () => {
                            // Are we done here, was this the last notification to be hidden?
                            if ((this.config.position.vertical.position === 'top' && i === 0) ||
                                (this.config.position.vertical.position === 'bottom' && i === numberOfNotifications - 1)) {
                                this.removeAllNotificationsFromList();
                                resolve(); // Done
                            }
                        }));
                    }), this.config.animations.hide.offset * animationOffset);
                }
            }
            else {
                /** @type {?} */
                let stepPromises = [];
                for (let i = numberOfNotifications - 1; i >= 0; i--) {
                    stepPromises.push(this.notifications[i].component.hide());
                }
                Promise.all(stepPromises).then((/**
                 * @return {?}
                 */
                () => {
                    this.removeAllNotificationsFromList();
                    resolve(); // Done
                }));
            }
        }));
    }
    /**
     * Shift multiple notifications at once
     *
     * @private
     * @param {?} notifications List containing the notifications to be shifted
     * @param {?} distance      Distance to shift (in px)
     * @param {?} toMakePlace   Flag, defining in which direciton to shift
     * @return {?} Promise, resolved when done
     */
    shiftNotifications(notifications, distance, toMakePlace) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            // Are there any notifications to shift?
            if (notifications.length === 0) {
                resolve();
                return;
            }
            /** @type {?} */
            let notificationPromises = [];
            for (let i = notifications.length - 1; i >= 0; i--) {
                notificationPromises.push(notifications[i].component.shift(distance, toMakePlace));
            }
            Promise.all(notificationPromises).then(resolve); // Done
        }));
    }
    /**
     * Add a new notification to the list of notifications (triggers change detection)
     *
     * @private
     * @param {?} notification Notification to add to the list of notifications
     * @return {?}
     */
    addNotificationToList(notification) {
        this.notifications.push(notification);
        this.changeDetector.markForCheck(); // Run change detection because the notification list changed
    }
    /**
     * Remove an existing notification from the list of notifications (triggers change detection)
     *
     * @private
     * @param {?} notification Notification to be removed from the list of notifications
     * @return {?}
     */
    removeNotificationFromList(notification) {
        this.notifications =
            this.notifications.filter((/**
             * @param {?} item
             * @return {?}
             */
            (item) => item.component !== notification.component));
        this.changeDetector.markForCheck(); // Run change detection because the notification list changed
    }
    /**
     * Remove all notifications from the list (triggers change detection)
     * @private
     * @return {?}
     */
    removeAllNotificationsFromList() {
        this.notifications = [];
        this.changeDetector.markForCheck(); // Run change detection because the notification list changed
    }
    /**
     * Helper: Find a notification in the notification list by a given notification ID
     *
     * @private
     * @param {?} notificationId Notification ID, used for finding notification
     * @return {?} Notification, undefined if not found
     */
    findNotificationById(notificationId) {
        return this.notifications.find((/**
         * @param {?} currentNotification
         * @return {?}
         */
        (currentNotification) => currentNotification.id === notificationId));
    }
    /**
     * Helper: Find a notification's index by a given notification ID
     *
     * @private
     * @param {?} notificationId Notification ID, used for finding a notification's index
     * @return {?} Notification index, undefined if not found
     */
    findNotificationIndexById(notificationId) {
        /** @type {?} */
        const notificationIndex = this.notifications.findIndex((/**
         * @param {?} currentNotification
         * @return {?}
         */
        (currentNotification) => currentNotification.id === notificationId));
        return (notificationIndex !== -1 ? notificationIndex : undefined);
    }
}
NotifierContainerComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                // (#perfmatters)
                host: {
                    class: 'notifier__container'
                },
                selector: 'notifier-container',
                template: "<ul>\n\t<li class=\"notifier__container-list\" *ngFor=\"let notification of notifications; trackBy: identifyNotification;\">\n\t\t<notifier-notification\n\t\t\t[notification]=\"notification\"\n\t\t\t(ready)=\"onNotificationReady( $event )\"\n\t\t\t(dismiss)=\"onNotificationDismiss( $event )\">\n\t\t</notifier-notification>\n\t</li>\n</ul>\n"
            }] }
];
/** @nocollapse */
NotifierContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NotifierQueueService },
    { type: NotifierService }
];
if (false) {
    /**
     * List of currently somewhat active notifications
     * @type {?}
     */
    NotifierContainerComponent.prototype.notifications;
    /**
     * Change detector
     * @type {?}
     * @private
     */
    NotifierContainerComponent.prototype.changeDetector;
    /**
     * Notifier queue service
     * @type {?}
     * @private
     */
    NotifierContainerComponent.prototype.queueService;
    /**
     * Notifier configuration
     * @type {?}
     * @private
     */
    NotifierContainerComponent.prototype.config;
    /**
     * Queue service observable subscription (saved for cleanup)
     * @type {?}
     * @private
     */
    NotifierContainerComponent.prototype.queueServiceSubscription;
    /**
     * Promise resolve function reference, temporarily used while the notification child component gets created
     * @type {?}
     * @private
     */
    NotifierContainerComponent.prototype.tempPromiseResolver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ub3RpZmllci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQU1qRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBd0IvRCxNQUFNLE9BQU8sMEJBQTBCOzs7Ozs7OztJQXVDdEMsWUFBb0IsY0FBaUMsRUFBRSxvQkFBMEMsRUFBRSxlQUFnQztRQUNsSSxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLG9CQUFvQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBRXhCLCtFQUErRTtRQUMvRSxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFFLENBQUUsTUFBc0IsRUFBRyxFQUFFO1lBQ3RHLElBQUksQ0FBQyxZQUFZLENBQUUsTUFBTSxDQUFFLENBQUMsSUFBSTs7O1lBQUUsR0FBRyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzlCLENBQUMsRUFBRSxDQUFDO1FBQ0wsQ0FBQyxFQUFFLENBQUM7SUFFTCxDQUFDOzs7OztJQUtNLFdBQVc7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Q2xEOzs7O1lBL0JpQyxpQkFBaUI7WUFPMUMsb0JBQW9CO1lBQ3BCLGVBQWU7Ozs7Ozs7SUE2QnZCLG1EQUFrRDs7Ozs7O0lBS2xELG9EQUFtRDs7Ozs7O0lBS25ELGtEQUFvRDs7Ozs7O0lBS3BELDRDQUF3Qzs7Ozs7O0lBS3hDLDhEQUErQzs7Ozs7O0lBSy9DLHlEQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE5vdGlmaWVyQWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLWFjdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllckNvbmZpZyB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1jb25maWcubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpZXJOb3RpZmljYXRpb24gfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItbm90aWZpY2F0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5vdGlmaWVyUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbm90aWZpZXItcXVldWUuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmllclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9ub3RpZmllci5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWVyTm90aWZpY2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9ub3RpZmllci1ub3RpZmljYXRpb24uY29tcG9uZW50JztcblxuLyoqXG4gKiBOb3RpZmllciBjb250YWluZXIgY29tcG9uZW50XG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUaGlzIGNvbXBvbmVudCBhY3RzIGFzIGEgd3JhcHBlciBmb3IgYWxsIG5vdGlmaWNhdGlvbiBjb21wb25lbnRzOyBjb25zZXF1ZW50bHksIGl0IGlzIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhIG5ldyBub3RpZmljYXRpb25cbiAqIGNvbXBvbmVudCBhbmQgcmVtb3ZpbmcgYW4gZXhpc3Rpbmcgbm90aWZpY2F0aW9uIGNvbXBvbmVudC4gQmVpbmcgbW9yZSBwcmVjaWNlbHksIGl0IGFsc28gaGFuZGxlcyBzaWRlIGVmZmVjdHMgb2YgdGhvc2UgYWN0aW9ucywgc3VjaCBhc1xuICogc2hpZnRpbmcgb3IgZXZlbiBjb21wbGV0ZWx5IHJlbW92aW5nIG90aGVyIG5vdGlmaWNhdGlvbnMgYXMgd2VsbC4gT3ZlcmFsbCwgdGhpcyBjb21wb25lbnRzIGhhbmRsZXMgYWN0aW9ucyBjb21pbmcgZnJvbSB0aGUgcXVldWUgc2VydmljZVxuICogYnkgc3Vic2NyaWJpbmcgdG8gaXRzIGFjdGlvbiBzdHJlYW0uXG4gKlxuICogVGVjaG5pY2FsIHNpZGVub3RlOlxuICogVGhpcyBjb21wb25lbnQgaGFzIHRvIGJlIHVzZWQgc29tZXdoZXJlIGluIGFuIGFwcGxpY2F0aW9uIHRvIHdvcms7IGl0IHdpbGwgbm90IGluamVjdCBhbmQgY3JlYXRlIGl0c2VsZiBhdXRvbWF0aWNhbGx5LCBwcmltYXJpbHkgaW4gb3JkZXJcbiAqIHRvIG5vdCBicmVhayB0aGUgQW5ndWxhciBBb1QgY29tcGlsYXRpb24uIE1vcmVvdmVyLCB0aGlzIGNvbXBvbmVudCAoYW5kIGFsc28gdGhlIG5vdGlmaWNhdGlvbiBjb21wb25lbnRzKSBzZXQgdGhlaXIgY2hhbmdlIGRldGVjdGlvblxuICogc3RyYXRlZ3kgb25QdXNoLCB3aGljaCBtZWFucyB0aGF0IHdlIGhhbmRsZSBjaGFuZ2UgZGV0ZWN0aW9uIG1hbnVhbGx5IGluIG9yZGVyIHRvIGdldCB0aGUgYmVzdCBwZXJmb3JtYW5jZS4gKCNwZXJmbWF0dGVycylcbiAqL1xuQENvbXBvbmVudCgge1xuXHRjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCwgLy8gKCNwZXJmbWF0dGVycylcblx0aG9zdDoge1xuXHRcdGNsYXNzOiAnbm90aWZpZXJfX2NvbnRhaW5lcidcblx0fSxcblx0c2VsZWN0b3I6ICdub3RpZmllci1jb250YWluZXInLFxuXHR0ZW1wbGF0ZVVybDogJy4vbm90aWZpZXItY29udGFpbmVyLmNvbXBvbmVudC5odG1sJ1xufSApXG5leHBvcnQgY2xhc3MgTm90aWZpZXJDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG5cdC8qKlxuXHQgKiBMaXN0IG9mIGN1cnJlbnRseSBzb21ld2hhdCBhY3RpdmUgbm90aWZpY2F0aW9uc1xuXHQgKi9cblx0cHVibGljIG5vdGlmaWNhdGlvbnM6IEFycmF5PE5vdGlmaWVyTm90aWZpY2F0aW9uPjtcblxuXHQvKipcblx0ICogQ2hhbmdlIGRldGVjdG9yXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZjtcblxuXHQvKipcblx0ICogTm90aWZpZXIgcXVldWUgc2VydmljZVxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBxdWV1ZVNlcnZpY2U6IE5vdGlmaWVyUXVldWVTZXJ2aWNlO1xuXG5cdC8qKlxuXHQgKiBOb3RpZmllciBjb25maWd1cmF0aW9uXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogTm90aWZpZXJDb25maWc7XG5cblx0LyoqXG5cdCAqIFF1ZXVlIHNlcnZpY2Ugb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gKHNhdmVkIGZvciBjbGVhbnVwKVxuXHQgKi9cblx0cHJpdmF0ZSBxdWV1ZVNlcnZpY2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuXHQvKipcblx0ICogUHJvbWlzZSByZXNvbHZlIGZ1bmN0aW9uIHJlZmVyZW5jZSwgdGVtcG9yYXJpbHkgdXNlZCB3aGlsZSB0aGUgbm90aWZpY2F0aW9uIGNoaWxkIGNvbXBvbmVudCBnZXRzIGNyZWF0ZWRcblx0ICovXG5cdHByaXZhdGUgdGVtcFByb21pc2VSZXNvbHZlcjogKCkgPT4gdm9pZDtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIGNoYW5nZURldGVjdG9yICAgICAgIENoYW5nZSBkZXRlY3RvciwgdXNlZCBmb3IgbWFudWFsbHkgdHJpZ2dlcmluZyBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnNcblx0ICogQHBhcmFtIG5vdGlmaWVyUXVldWVTZXJ2aWNlIE5vdGlmaWVyIHF1ZXVlIHNlcnZpY2Vcblx0ICogQHBhcmFtIG5vdGlmaWVyU2VydmljZSAgICAgIE5vdGlmaWVyIHNlcnZpY2Vcblx0ICovXG5cdHB1YmxpYyBjb25zdHJ1Y3RvciggY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLCBub3RpZmllclF1ZXVlU2VydmljZTogTm90aWZpZXJRdWV1ZVNlcnZpY2UsIG5vdGlmaWVyU2VydmljZTogTm90aWZpZXJTZXJ2aWNlICkge1xuXHRcdHRoaXMuY2hhbmdlRGV0ZWN0b3IgPSBjaGFuZ2VEZXRlY3Rvcjtcblx0XHR0aGlzLnF1ZXVlU2VydmljZSA9IG5vdGlmaWVyUXVldWVTZXJ2aWNlO1xuXHRcdHRoaXMuY29uZmlnID0gbm90aWZpZXJTZXJ2aWNlLmdldENvbmZpZygpO1xuXHRcdHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xuXG5cdFx0Ly8gQ29ubmVjdHMgdGhpcyBjb21wb25lbnQgdXAgdG8gdGhlIGFjdGlvbiBxdWV1ZSwgdGhlbiBoYW5kbGUgaW5jb21pbmcgYWN0aW9uc1xuXHRcdHRoaXMucXVldWVTZXJ2aWNlU3Vic2NyaXB0aW9uID0gdGhpcy5xdWV1ZVNlcnZpY2UuYWN0aW9uU3RyZWFtLnN1YnNjcmliZSggKCBhY3Rpb246IE5vdGlmaWVyQWN0aW9uICkgPT4ge1xuXHRcdFx0dGhpcy5oYW5kbGVBY3Rpb24oIGFjdGlvbiApLnRoZW4oICgpID0+IHtcblx0XHRcdFx0dGhpcy5xdWV1ZVNlcnZpY2UuY29udGludWUoKTtcblx0XHRcdH0gKTtcblx0XHR9ICk7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wb25lbnQgZGVzdHJveW1lbnQgbGlmZWN5Y2xlIGhvb2ssIGNsZWFucyB1cCB0aGUgb2JzZXJ2YWJsZSBzdWJzY2lwdGlvblxuXHQgKi9cblx0cHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuXHRcdGlmICggdGhpcy5xdWV1ZVNlcnZpY2VTdWJzY3JpcHRpb24gKSB7XG5cdFx0XHR0aGlzLnF1ZXVlU2VydmljZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBOb3RpZmljYXRpb24gaWRlbnRpZmllciwgdXNlZCBhcyB0aGUgbmdGb3IgdHJhY2tieSBmdW5jdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0gICBpbmRleCAgICAgICAgSW5kZXhcblx0ICogQHBhcmFtICAgbm90aWZpY2F0aW9uIE5vdGlmaWVyIG5vdGlmaWNhdGlvblxuXHQgKiBAcmV0dXJucyBOb3RpZmljYXRpb24gSUQgYXMgdGhlIHVuaXF1ZSBpZGVudG5maWVyXG5cdCAqL1xuXHRwdWJsaWMgaWRlbnRpZnlOb3RpZmljYXRpb24oIGluZGV4OiBudW1iZXIsIG5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gbm90aWZpY2F0aW9uLmlkO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV2ZW50IGhhbmRsZXIsIGhhbmRsZXMgY2xpY2tzIG9uIG5vdGlmaWNhdGlvbiBkaXNtaXNzIGJ1dHRvbnNcblx0ICpcblx0ICogQHBhcmFtIG5vdGlmaWNhdGlvbklkIElEIG9mIHRoZSBub3RpZmljYXRpb24gdG8gZGlzbWlzc1xuXHQgKi9cblx0cHVibGljIG9uTm90aWZpY2F0aW9uRGlzbWlzcyggbm90aWZpY2F0aW9uSWQ6IHN0cmluZyApOiB2b2lkIHtcblx0XHR0aGlzLnF1ZXVlU2VydmljZS5wdXNoKCB7XG5cdFx0XHRwYXlsb2FkOiBub3RpZmljYXRpb25JZCxcblx0XHRcdHR5cGU6ICdISURFJ1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFdmVudCBoYW5kbGVyLCBoYW5kbGVzIG5vdGlmaWNhdGlvbiByZWFkeSBldmVudHNcblx0ICpcblx0ICogQHBhcmFtIG5vdGlmaWNhdGlvbkNvbXBvbmVudCBOb3RpZmljYXRpb24gY29tcG9uZW50IHJlZmVyZW5jZVxuXHQgKi9cblx0cHVibGljIG9uTm90aWZpY2F0aW9uUmVhZHkoIG5vdGlmaWNhdGlvbkNvbXBvbmVudDogTm90aWZpZXJOb3RpZmljYXRpb25Db21wb25lbnQgKTogdm9pZCB7XG5cdFx0bGV0IGN1cnJlbnROb3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uID0gdGhpcy5ub3RpZmljYXRpb25zWyB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoIC0gMSBdOyAvLyBHZXQgdGhlIGxhdGVzdCBub3RpZmljYXRpb25cblx0XHRjdXJyZW50Tm90aWZpY2F0aW9uLmNvbXBvbmVudCA9IG5vdGlmaWNhdGlvbkNvbXBvbmVudDsgLy8gU2F2ZSB0aGUgbmV3IG9tcG9uZW50IHJlZmVyZW5jZVxuXHRcdHRoaXMuY29udGludWVIYW5kbGVTaG93QWN0aW9uKCBjdXJyZW50Tm90aWZpY2F0aW9uICk7IC8vIENvbnRpbnVlIHdpdGggaGFuZGxpbmcgdGhlIHNob3cgYWN0aW9uXG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGluY29taW5nIGFjdGlvbnMgYnkgbWFwcGluZyBhY3Rpb24gdHlwZXMgdG8gbWV0aG9kcywgYW5kIHRoZW4gcnVubmluZyB0aGVtXG5cdCAqXG5cdCAqIEBwYXJhbSAgIGFjdGlvbiBBY3Rpb24gb2JqZWN0XG5cdCAqIEByZXR1cm5zIFByb21pc2UsIHJlc29sdmVkIHdoZW4gZG9uZVxuXHQgKi9cblx0cHJpdmF0ZSBoYW5kbGVBY3Rpb24oIGFjdGlvbjogTm90aWZpZXJBY3Rpb24gKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcblx0XHRzd2l0Y2ggKCBhY3Rpb24udHlwZSApIHsgLy8gVE9ETzogTWF5YmUgYSBtYXAgKGFjdGlvblR5cGUgLT4gY2xhc3MgbWV0aG9kKSBpcyBhIGNsZWFuZXIgc29sdXRpb24gaGVyZT9cblx0XHRcdGNhc2UgJ1NIT1cnOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5oYW5kbGVTaG93QWN0aW9uKCBhY3Rpb24gKTtcblx0XHRcdGNhc2UgJ0hJREUnOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5oYW5kbGVIaWRlQWN0aW9uKCBhY3Rpb24gKTtcblx0XHRcdGNhc2UgJ0hJREVfT0xERVNUJzpcblx0XHRcdFx0cmV0dXJuIHRoaXMuaGFuZGxlSGlkZU9sZGVzdEFjdGlvbiggYWN0aW9uICk7XG5cdFx0XHRjYXNlICdISURFX05FV0VTVCc6XG5cdFx0XHRcdHJldHVybiB0aGlzLmhhbmRsZUhpZGVOZXdlc3RBY3Rpb24oIGFjdGlvbiApO1xuXHRcdFx0Y2FzZSAnSElERV9BTEwnOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5oYW5kbGVIaWRlQWxsQWN0aW9uKCBhY3Rpb24gKTtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblx0XHRcdFx0XHRyZXNvbHZlKCk7IC8vIElnbm9yZSB1bmtub3duIGFjdGlvbiB0eXBlc1xuXHRcdFx0XHR9ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNob3cgYSBuZXcgbm90aWZpY2F0aW9uXG5cdCAqXG5cdCAqIFdlIHNpbXBseSBhZGQgdGhlIG5vdGlmaWNhdGlvbiB0byB0aGUgbGlzdCwgYW5kIHRoZW4gd2FpdCB1bnRpbCBpdHMgcHJvcGVybHkgaW5pdGlhbGl6ZWQgLyBjcmVhdGVkIC8gcmVuZGVyZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSAgIGFjdGlvbiBBY3Rpb24gb2JqZWN0XG5cdCAqIEByZXR1cm5zIFByb21pc2UsIHJlc29sdmVkIHdoZW4gZG9uZVxuXHQgKi9cblx0cHJpdmF0ZSBoYW5kbGVTaG93QWN0aW9uKCBhY3Rpb246IE5vdGlmaWVyQWN0aW9uICk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXHRcdFx0dGhpcy50ZW1wUHJvbWlzZVJlc29sdmVyID0gcmVzb2x2ZTsgLy8gU2F2ZSB0aGUgcHJvbWlzZSByZXNvbHZlIGZ1bmN0aW9uIHNvIHRoYXQgaXQgY2FuIGJlIGNhbGxlZCBsYXRlciBvbiBieSBhbm90aGVyIG1ldGhvZFxuXHRcdFx0dGhpcy5hZGROb3RpZmljYXRpb25Ub0xpc3QoIG5ldyBOb3RpZmllck5vdGlmaWNhdGlvbiggYWN0aW9uLnBheWxvYWQgKSApO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb250aW51ZSB0byBzaG93IGEgbmV3IG5vdGlmaWNhdGlvbiAoYWZ0ZXIgdGhlIG5vdGlmaWNhdGlvbiBjb21wb25lbnRzIGlzIGluaXRpYWxpemVkIC8gY3JlYXRlZCAvIHJlbmRlcmVkKS5cblx0ICpcblx0ICogSWYgdGhpcyBpcyB0aGUgZmlyc3QgKGFuZCB0aHVzIG9ubHkpIG5vdGlmaWNhdGlvbiwgd2UgY2FuIHNpbXBseSBzaG93IGl0LiBPdGhlcndoaXNlLCBpZiBzdGFja2luZyBpcyBkaXNhYmxlZCAob3IgYSBsb3cgdmFsdWUpLCB3ZVxuXHQgKiBzd2l0Y2ggb3V0IG5vdGlmaWNhdGlvbnMsIGluIHBhcnRpY3VsYXIgd2UgaGlkZSB0aGUgZXhpc3Rpbmcgb25lLCBhbmQgdGhlbiBzaG93IG91ciBuZXcgb25lLiBZZXQsIGlmIHN0YWNraW5nIGlzIGVuYWJsZWQsIHdlIGZpcnN0XG5cdCAqIHNoaWZ0IGFsbCBvbGRlciBub3RpZmljYXRpb25zLCBhbmQgdGhlbiBzaG93IG91ciBuZXcgbm90aWZpY2F0aW9uLiBJbiBhZGRpdGlvbiwgaWYgdGhlcmUgYXJlIHRvbyBtYW55IG5vdGlmaWNhdGlvbiBvbiB0aGUgc2NyZWVuLFxuXHQgKiB3ZSBoaWRlIHRoZSBvbGRlc3Qgb25lIGZpcnN0LiBGdXJ0aGVybW9yZSwgaWYgY29uZmlndXJlZCwgYW5pbWF0aW9uIG92ZXJsYXBwaW5nIGlzIGFwcGxpZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSBub3RpZmljYXRpb24gTmV3IG5vdGlmaWNhdGlvbiB0byBzaG93XG5cdCAqL1xuXHRwcml2YXRlIGNvbnRpbnVlSGFuZGxlU2hvd0FjdGlvbiggbm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiApOiB2b2lkIHtcblxuXHRcdC8vIEZpcnN0ICh3aGljaCBtZWFucyBvbmx5IG9uZSkgbm90aWZpY2F0aW9uIGluIHRoZSBsaXN0P1xuXHRcdGNvbnN0IG51bWJlck9mTm90aWZpY2F0aW9uczogbnVtYmVyID0gdGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aDtcblx0XHRpZiAoIG51bWJlck9mTm90aWZpY2F0aW9ucyA9PT0gMSApIHtcblx0XHRcdG5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2hvdygpLnRoZW4oIHRoaXMudGVtcFByb21pc2VSZXNvbHZlciApOyAvLyBEb25lXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc3QgaW1wbGljaXRTdGFja2luZ0xpbWl0OiBudW1iZXIgPSAyO1xuXG5cdFx0XHQvLyBTdGFja2luZyBlbmFibGVkPyAoc3RhY2tpbmcgdmFsdWUgYmVsb3cgMiBtZWFucyBzdGFja2luZyBpcyBkaXNhYmxlZClcblx0XHRcdGlmICggdGhpcy5jb25maWcuYmVoYXZpb3VyLnN0YWNraW5nID09PSBmYWxzZSB8fCB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuc3RhY2tpbmcgPCBpbXBsaWNpdFN0YWNraW5nTGltaXQgKSB7XG5cdFx0XHRcdHRoaXMubm90aWZpY2F0aW9uc1sgMCBdLmNvbXBvbmVudC5oaWRlKCkudGhlbiggKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucmVtb3ZlTm90aWZpY2F0aW9uRnJvbUxpc3QoIHRoaXMubm90aWZpY2F0aW9uc1sgMCBdICk7XG5cdFx0XHRcdFx0bm90aWZpY2F0aW9uLmNvbXBvbmVudC5zaG93KCkudGhlbiggdGhpcy50ZW1wUHJvbWlzZVJlc29sdmVyICk7IC8vIERvbmVcblx0XHRcdFx0fSApO1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRjb25zdCBzdGVwUHJvbWlzZXM6IEFycmF5PFByb21pc2U8dW5kZWZpbmVkPj4gPSBbXTtcblxuXHRcdFx0XHQvLyBBcmUgdGhlcmUgbm93IHRvbyBtYW55IG5vdGlmaWNhdGlvbnM/XG5cdFx0XHRcdGlmICggbnVtYmVyT2ZOb3RpZmljYXRpb25zID4gdGhpcy5jb25maWcuYmVoYXZpb3VyLnN0YWNraW5nICkge1xuXG5cdFx0XHRcdFx0Y29uc3Qgb2xkTm90aWZpY2F0aW9uczogQXJyYXk8Tm90aWZpZXJOb3RpZmljYXRpb24+ID0gdGhpcy5ub3RpZmljYXRpb25zLnNsaWNlKCAxLCBudW1iZXJPZk5vdGlmaWNhdGlvbnMgLSAxICk7XG5cblx0XHRcdFx0XHQvLyBBcmUgYW5pbWF0aW9ucyBlbmFibGVkP1xuXHRcdFx0XHRcdGlmICggdGhpcy5jb25maWcuYW5pbWF0aW9ucy5lbmFibGVkICkge1xuXG5cdFx0XHRcdFx0XHQvLyBJcyBhbmltYXRpb24gb3ZlcmxhcCBlbmFibGVkP1xuXHRcdFx0XHRcdFx0aWYgKCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgIT09IGZhbHNlICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMub3ZlcmxhcCA+IDAgKSB7XG5cdFx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLm5vdGlmaWNhdGlvbnNbIDAgXS5jb21wb25lbnQuaGlkZSgpICk7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggdGhpcy5zaGlmdE5vdGlmaWNhdGlvbnMoIG9sZE5vdGlmaWNhdGlvbnMsIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0SGVpZ2h0KCksIHRydWUgKSApO1xuXHRcdFx0XHRcdFx0XHR9LCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmhpZGUuc3BlZWQgLSB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgKTtcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCBub3RpZmljYXRpb24uY29tcG9uZW50LnNob3coKSApO1xuXHRcdFx0XHRcdFx0XHR9LCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmhpZGUuc3BlZWQgKyB0aGlzLmNvbmZpZy5hbmltYXRpb25zLnNoaWZ0LnNwZWVkIC0gdGhpcy5jb25maWcuYW5pbWF0aW9ucy5vdmVybGFwICk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbmV3IFByb21pc2U8dW5kZWZpbmVkPiggKCByZXNvbHZlOiAoKSA9PiB2b2lkLCByZWplY3Q6ICgpID0+IHZvaWQgKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5ub3RpZmljYXRpb25zWyAwIF0uY29tcG9uZW50LmhpZGUoKS50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnNoaWZ0Tm90aWZpY2F0aW9ucyggb2xkTm90aWZpY2F0aW9ucywgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRIZWlnaHQoKSwgdHJ1ZSApLnRoZW4oICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bm90aWZpY2F0aW9uLmNvbXBvbmVudC5zaG93KCkudGhlbiggcmVzb2x2ZSApO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdFx0fSApICk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIHRoaXMubm90aWZpY2F0aW9uc1sgMCBdLmNvbXBvbmVudC5oaWRlKCkgKTtcblx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLnNoaWZ0Tm90aWZpY2F0aW9ucyggb2xkTm90aWZpY2F0aW9ucywgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRIZWlnaHQoKSwgdHJ1ZSApICk7XG5cdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbm90aWZpY2F0aW9uLmNvbXBvbmVudC5zaG93KCkgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdGNvbnN0IG9sZE5vdGlmaWNhdGlvbnM6IEFycmF5PE5vdGlmaWVyTm90aWZpY2F0aW9uPiA9IHRoaXMubm90aWZpY2F0aW9ucy5zbGljZSggMCwgbnVtYmVyT2ZOb3RpZmljYXRpb25zIC0gMSApO1xuXG5cdFx0XHRcdFx0Ly8gQXJlIGFuaW1hdGlvbnMgZW5hYmxlZD9cblx0XHRcdFx0XHRpZiAoIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuZW5hYmxlZCApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSXMgYW5pbWF0aW9uIG92ZXJsYXAgZW5hYmxlZD9cblx0XHRcdFx0XHRcdGlmICggdGhpcy5jb25maWcuYW5pbWF0aW9ucy5vdmVybGFwICE9PSBmYWxzZSAmJiB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgPiAwICkge1xuXHRcdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggdGhpcy5zaGlmdE5vdGlmaWNhdGlvbnMoIG9sZE5vdGlmaWNhdGlvbnMsIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0SGVpZ2h0KCksIHRydWUgKSApO1xuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2hvdygpICk7XG5cdFx0XHRcdFx0XHRcdH0sIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuc2hpZnQuc3BlZWQgLSB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNoaWZ0Tm90aWZpY2F0aW9ucyggb2xkTm90aWZpY2F0aW9ucywgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRIZWlnaHQoKSwgdHJ1ZSApLnRoZW4oICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdG5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2hvdygpLnRoZW4oIHJlc29sdmUgKTtcblx0XHRcdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0XHRcdH0gKSApO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLnNoaWZ0Tm90aWZpY2F0aW9ucyggb2xkTm90aWZpY2F0aW9ucywgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRIZWlnaHQoKSwgdHJ1ZSApICk7XG5cdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbm90aWZpY2F0aW9uLmNvbXBvbmVudC5zaG93KCkgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdFByb21pc2UuYWxsKCBzdGVwUHJvbWlzZXMgKS50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCBudW1iZXJPZk5vdGlmaWNhdGlvbnMgPiB0aGlzLmNvbmZpZy5iZWhhdmlvdXIuc3RhY2tpbmcgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJlbW92ZU5vdGlmaWNhdGlvbkZyb21MaXN0KCB0aGlzLm5vdGlmaWNhdGlvbnNbIDAgXSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLnRlbXBQcm9taXNlUmVzb2x2ZXIoKTtcblx0XHRcdFx0fSApOyAvLyBEb25lXG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0LyoqXG5cdCAqIEhpZGUgYW4gZXhpc3Rpbmcgbm90aWZpY2F0aW9uXG5cdCAqXG5cdCAqIEZpc3QsIHdlIHNraXAgZXZlcnl0aGluZyBpZiB0aGVyZSBhcmUgbm8gbm90aWZpY2F0aW9ucyBhdCBhbGwsIG9yIHRoZSBnaXZlbiBub3RpZmljYXRpb24gZG9lcyBub3QgZXhpc3QuIFRoZW4sIHdlIGhpZGUgdGhlIGdpdmVuXG5cdCAqIG5vdGlmaWNhdGlvbi4gSWYgdGhlcmUgZXhpc3Qgb2xkZXIgbm90aWZpY2F0aW9ucywgd2UgdGhlbiBzaGlmdCB0aGVtIGFyb3VuZCB0byBmaWxsIHRoZSBnYXAuIE9uY2UgYm90aCBoaWRpbmcgdGhlIGdpdmVuIG5vdGlmaWNhdGlvblxuXHQgKiBhbmQgc2hpZnRpbmcgdGhlIG9sZGVyIG5vdGlmaWNhaXRvbnMgaXMgZG9uZSwgdGhlIGdpdmVuIG5vdGlmaWNhdGlvbiBnZXRzIGZpbmFsbHkgcmVtb3ZlZCAoZnJvbSB0aGUgRE9NKS5cblx0ICpcblx0ICogQHBhcmFtICAgYWN0aW9uIEFjdGlvbiBvYmplY3QsIHBheWxvYWQgY29udGFpbnMgdGhlIG5vdGlmaWNhdGlvbiBJRFxuXHQgKiBAcmV0dXJucyBQcm9taXNlLCByZXNvbHZlZCB3aGVuIGRvbmVcblx0ICovXG5cdHByaXZhdGUgaGFuZGxlSGlkZUFjdGlvbiggYWN0aW9uOiBOb3RpZmllckFjdGlvbiApOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblxuXHRcdFx0Y29uc3Qgc3RlcFByb21pc2VzOiBBcnJheTxQcm9taXNlPHVuZGVmaW5lZD4+ID0gW107XG5cblx0XHRcdC8vIERvZXMgdGhlIG5vdGlmaWNhdGlvbiBleGlzdCAvIGFyZSB0aGVyZSBldmVuIGFueSBub3RpZmljYXRpb25zPyAobGV0J3MgcHJldmVudCBhY2NpZGVudGlhbCBlcnJvcnMpXG5cdFx0XHRjb25zdCBub3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uIHwgdW5kZWZpbmVkID0gdGhpcy5maW5kTm90aWZpY2F0aW9uQnlJZCggYWN0aW9uLnBheWxvYWQgKTtcblx0XHRcdGlmICggbm90aWZpY2F0aW9uID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZXQgb2xkZXIgbm90aWZpY2F0aW9uc1xuXHRcdFx0Y29uc3Qgbm90aWZpY2F0aW9uSW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCA9IHRoaXMuZmluZE5vdGlmaWNhdGlvbkluZGV4QnlJZCggYWN0aW9uLnBheWxvYWQgKTtcblx0XHRcdGlmICggbm90aWZpY2F0aW9uSW5kZXggPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBvbGROb3RpZmljYXRpb25zOiBBcnJheTxOb3RpZmllck5vdGlmaWNhdGlvbj4gPSB0aGlzLm5vdGlmaWNhdGlvbnMuc2xpY2UoIDAsIG5vdGlmaWNhdGlvbkluZGV4ICk7XG5cblx0XHRcdC8vIERvIG9sZGVyIG5vdGlmaWNhdGlvbnMgZXhpc3QsIGFuZCB0aHVzIGRvIHdlIG5lZWQgdG8gc2hpZnQgb3RoZXIgbm90aWZpY2F0aW9ucyBhcyBhIGNvbnNlcXVlbmNlP1xuXHRcdFx0aWYgKCBvbGROb3RpZmljYXRpb25zLmxlbmd0aCA+IDAgKSB7XG5cblx0XHRcdFx0Ly8gQXJlIGFuaW1hdGlvbnMgZW5hYmxlZD9cblx0XHRcdFx0aWYgKCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmVuYWJsZWQgJiYgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5oaWRlLnNwZWVkID4gMCApIHtcblxuXHRcdFx0XHRcdC8vIElzIGFuaW1hdGlvbiBvdmVybGFwIGVuYWJsZWQ/XG5cdFx0XHRcdFx0aWYgKCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgIT09IGZhbHNlICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMub3ZlcmxhcCA+IDAgKSB7XG5cdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbm90aWZpY2F0aW9uLmNvbXBvbmVudC5oaWRlKCkgKTtcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIHRoaXMuc2hpZnROb3RpZmljYXRpb25zKCBvbGROb3RpZmljYXRpb25zLCBub3RpZmljYXRpb24uY29tcG9uZW50LmdldEhlaWdodCgpLCBmYWxzZSApICk7XG5cdFx0XHRcdFx0XHR9LCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmhpZGUuc3BlZWQgLSB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bm90aWZpY2F0aW9uLmNvbXBvbmVudC5oaWRlKCkudGhlbiggKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggdGhpcy5zaGlmdE5vdGlmaWNhdGlvbnMoIG9sZE5vdGlmaWNhdGlvbnMsIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0SGVpZ2h0KCksIGZhbHNlICkgKTtcblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuaGlkZSgpICk7XG5cdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIHRoaXMuc2hpZnROb3RpZmljYXRpb25zKCBvbGROb3RpZmljYXRpb25zLCBub3RpZmljYXRpb24uY29tcG9uZW50LmdldEhlaWdodCgpLCBmYWxzZSApICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbm90aWZpY2F0aW9uLmNvbXBvbmVudC5oaWRlKCkgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBXYWl0IHVudGlsIGJvdGggaGlkaW5nIGFuZCBzaGlmdGluZyBpcyBkb25lLCB0aGVuIHJlbW92ZSB0aGUgbm90aWZpY2F0aW9uIGZyb20gdGhlIGxpc3Rcblx0XHRcdFByb21pc2UuYWxsKCBzdGVwUHJvbWlzZXMgKS50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucmVtb3ZlTm90aWZpY2F0aW9uRnJvbUxpc3QoIG5vdGlmaWNhdGlvbiApO1xuXHRcdFx0XHRyZXNvbHZlKCk7IC8vIERvbmVcblx0XHRcdH0gKTtcblxuXHRcdH0gKTtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEhpZGUgdGhlIG9sZGVzdCBub3RpZmljYXRpb24gKGJyaWRnZSB0byBoYW5kbGVIaWRlQWN0aW9uKVxuXHQgKlxuXHQgKiBAcGFyYW0gICBhY3Rpb24gQWN0aW9uIG9iamVjdFxuXHQgKiBAcmV0dXJucyBQcm9taXNlLCByZXNvbHZlZCB3aGVuIGRvbmVcblx0ICovXG5cdHByaXZhdGUgaGFuZGxlSGlkZU9sZGVzdEFjdGlvbiggYWN0aW9uOiBOb3RpZmllckFjdGlvbiApOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXG5cdFx0Ly8gQXJlIHRoZXJlIGFueSBub3RpZmljYXRpb25zPyAocHJldmVudCBhY2NpZGVudGlhbCBlcnJvcnMpXG5cdFx0aWYgKCB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoID09PSAwICkge1xuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9ICk7IC8vIERvbmVcblx0XHR9IGVsc2Uge1xuXHRcdFx0YWN0aW9uLnBheWxvYWQgPSB0aGlzLm5vdGlmaWNhdGlvbnNbIDAgXS5pZDtcblx0XHRcdHJldHVybiB0aGlzLmhhbmRsZUhpZGVBY3Rpb24oIGFjdGlvbiApO1xuXHRcdH1cblxuXHR9XG5cblx0LyoqXG5cdCAqIEhpZGUgdGhlIG5ld2VzdCBub3RpZmljYXRpb24gKGJyaWRnZSB0byBoYW5kbGVIaWRlQWN0aW9uKVxuXHQgKlxuXHQgKiBAcGFyYW0gICBhY3Rpb24gQWN0aW9uIG9iamVjdFxuXHQgKiBAcmV0dXJucyBQcm9taXNlLCByZXNvbHZlZCB3aGVuIGRvbmVcblx0ICovXG5cdHByaXZhdGUgaGFuZGxlSGlkZU5ld2VzdEFjdGlvbiggYWN0aW9uOiBOb3RpZmllckFjdGlvbiApOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXG5cdFx0Ly8gQXJlIHRoZXJlIGFueSBub3RpZmljYXRpb25zPyAocHJldmVudCBhY2NpZGVudGlhbCBlcnJvcnMpXG5cdFx0aWYgKCB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoID09PSAwICkge1xuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9ICk7IC8vIERvbmVcblx0XHR9IGVsc2Uge1xuXHRcdFx0YWN0aW9uLnBheWxvYWQgPSB0aGlzLm5vdGlmaWNhdGlvbnNbIHRoaXMubm90aWZpY2F0aW9ucy5sZW5ndGggLSAxIF0uaWQ7XG5cdFx0XHRyZXR1cm4gdGhpcy5oYW5kbGVIaWRlQWN0aW9uKCBhY3Rpb24gKTtcblx0XHR9XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBIaWRlIGFsbCBub3RpZmljYXRpb25zIGF0IG9uY2Vcblx0ICpcblx0ICogQHBhcmFtICAgYWN0aW9uIEFjdGlvbiBvYmplY3Rcblx0ICogQHJldHVybnMgUHJvbWlzZSwgcmVzb2x2ZWQgd2hlbiBkb25lXG5cdCAqL1xuXHRwcml2YXRlIGhhbmRsZUhpZGVBbGxBY3Rpb24oIGFjdGlvbjogTm90aWZpZXJBY3Rpb24gKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8dW5kZWZpbmVkPiggKCByZXNvbHZlOiAoKSA9PiB2b2lkLCByZWplY3Q6ICgpID0+IHZvaWQgKSA9PiB7XG5cblx0XHRcdC8vIEFyZSB0aGVyZSBhbnkgbm90aWZpY2F0aW9ucz8gKHByZXZlbnQgYWNjaWRlbnRpYWwgZXJyb3JzKVxuXHRcdFx0Y29uc3QgbnVtYmVyT2ZOb3RpZmljYXRpb25zOiBudW1iZXIgPSB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoO1xuXHRcdFx0aWYgKCBudW1iZXJPZk5vdGlmaWNhdGlvbnMgPT09IDAgKSB7XG5cdFx0XHRcdHJlc29sdmUoKTsgLy8gRG9uZVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFyZSBhbmltYXRpb25zIGVuYWJsZWQ/XG5cdFx0XHRpZiAoIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuZW5hYmxlZCAmJiB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmhpZGUuc3BlZWQgPiAwICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuaGlkZS5vZmZzZXQgIT09IGZhbHNlICYmXG5cdFx0XHRcdHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuaGlkZS5vZmZzZXQgPiAwICkge1xuXG5cdFx0XHRcdGZvciAoIGxldCBpOiBudW1iZXIgPSBudW1iZXJPZk5vdGlmaWNhdGlvbnMgLSAxOyBpID49IDA7IGktLSApIHtcblx0XHRcdFx0XHRjb25zdCBhbmltYXRpb25PZmZzZXQ6IG51bWJlciA9IHRoaXMuY29uZmlnLnBvc2l0aW9uLnZlcnRpY2FsLnBvc2l0aW9uID09PSAndG9wJyA/IG51bWJlck9mTm90aWZpY2F0aW9ucyAtIDEgOiBpO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMubm90aWZpY2F0aW9uc1sgaSBdLmNvbXBvbmVudC5oaWRlKCkudGhlbiggKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEFyZSB3ZSBkb25lIGhlcmUsIHdhcyB0aGlzIHRoZSBsYXN0IG5vdGlmaWNhdGlvbiB0byBiZSBoaWRkZW4/XG5cdFx0XHRcdFx0XHRcdGlmICggKCB0aGlzLmNvbmZpZy5wb3NpdGlvbi52ZXJ0aWNhbC5wb3NpdGlvbiA9PT0gJ3RvcCcgJiYgaSA9PT0gMCApIHx8XG5cdFx0XHRcdFx0XHRcdFx0KCB0aGlzLmNvbmZpZy5wb3NpdGlvbi52ZXJ0aWNhbC5wb3NpdGlvbiA9PT0gJ2JvdHRvbScgJiYgaSA9PT0gbnVtYmVyT2ZOb3RpZmljYXRpb25zIC0gMSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlQWxsTm90aWZpY2F0aW9uc0Zyb21MaXN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgpOyAvLyBEb25lXG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdH0sIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuaGlkZS5vZmZzZXQgKiBhbmltYXRpb25PZmZzZXQgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGxldCBzdGVwUHJvbWlzZXM6IEFycmF5PFByb21pc2U8dW5kZWZpbmVkPj4gPSBbXTtcblx0XHRcdFx0Zm9yICggbGV0IGk6IG51bWJlciA9IG51bWJlck9mTm90aWZpY2F0aW9ucyAtIDE7IGkgPj0gMDsgaS0tICkge1xuXHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLm5vdGlmaWNhdGlvbnNbIGkgXS5jb21wb25lbnQuaGlkZSgpICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0UHJvbWlzZS5hbGwoIHN0ZXBQcm9taXNlcyApLnRoZW4oICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnJlbW92ZUFsbE5vdGlmaWNhdGlvbnNGcm9tTGlzdCgpO1xuXHRcdFx0XHRcdHJlc29sdmUoKTsgLy8gRG9uZVxuXHRcdFx0XHR9ICk7XG5cblx0XHRcdH1cblxuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaGlmdCBtdWx0aXBsZSBub3RpZmljYXRpb25zIGF0IG9uY2Vcblx0ICpcblx0ICogQHBhcmFtICAgbm90aWZpY2F0aW9ucyBMaXN0IGNvbnRhaW5pbmcgdGhlIG5vdGlmaWNhdGlvbnMgdG8gYmUgc2hpZnRlZFxuXHQgKiBAcGFyYW0gICBkaXN0YW5jZSAgICAgIERpc3RhbmNlIHRvIHNoaWZ0IChpbiBweClcblx0ICogQHBhcmFtICAgdG9NYWtlUGxhY2UgICBGbGFnLCBkZWZpbmluZyBpbiB3aGljaCBkaXJlY2l0b24gdG8gc2hpZnRcblx0ICogQHJldHVybnMgUHJvbWlzZSwgcmVzb2x2ZWQgd2hlbiBkb25lXG5cdCAqL1xuXHRwcml2YXRlIHNoaWZ0Tm90aWZpY2F0aW9ucyggbm90aWZpY2F0aW9uczogQXJyYXk8Tm90aWZpZXJOb3RpZmljYXRpb24+LCBkaXN0YW5jZTogbnVtYmVyLCB0b01ha2VQbGFjZTogYm9vbGVhbiApOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblxuXHRcdFx0Ly8gQXJlIHRoZXJlIGFueSBub3RpZmljYXRpb25zIHRvIHNoaWZ0P1xuXHRcdFx0aWYgKCBub3RpZmljYXRpb25zLmxlbmd0aCA9PT0gMCApIHtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGxldCBub3RpZmljYXRpb25Qcm9taXNlczogQXJyYXk8UHJvbWlzZTx1bmRlZmluZWQ+PiA9IFtdO1xuXHRcdFx0Zm9yICggbGV0IGk6IG51bWJlciA9IG5vdGlmaWNhdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0gKSB7XG5cdFx0XHRcdG5vdGlmaWNhdGlvblByb21pc2VzLnB1c2goIG5vdGlmaWNhdGlvbnNbIGkgXS5jb21wb25lbnQuc2hpZnQoIGRpc3RhbmNlLCB0b01ha2VQbGFjZSApICk7XG5cdFx0XHR9XG5cdFx0XHRQcm9taXNlLmFsbCggbm90aWZpY2F0aW9uUHJvbWlzZXMgKS50aGVuKCByZXNvbHZlICk7IC8vIERvbmVcblxuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBuZXcgbm90aWZpY2F0aW9uIHRvIHRoZSBsaXN0IG9mIG5vdGlmaWNhdGlvbnMgKHRyaWdnZXJzIGNoYW5nZSBkZXRlY3Rpb24pXG5cdCAqXG5cdCAqIEBwYXJhbSBub3RpZmljYXRpb24gTm90aWZpY2F0aW9uIHRvIGFkZCB0byB0aGUgbGlzdCBvZiBub3RpZmljYXRpb25zXG5cdCAqL1xuXHRwcml2YXRlIGFkZE5vdGlmaWNhdGlvblRvTGlzdCggbm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiApOiB2b2lkIHtcblx0XHR0aGlzLm5vdGlmaWNhdGlvbnMucHVzaCggbm90aWZpY2F0aW9uICk7XG5cdFx0dGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTsgLy8gUnVuIGNoYW5nZSBkZXRlY3Rpb24gYmVjYXVzZSB0aGUgbm90aWZpY2F0aW9uIGxpc3QgY2hhbmdlZFxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbiBleGlzdGluZyBub3RpZmljYXRpb24gZnJvbSB0aGUgbGlzdCBvZiBub3RpZmljYXRpb25zICh0cmlnZ2VycyBjaGFuZ2UgZGV0ZWN0aW9uKVxuXHQgKlxuXHQgKiBAcGFyYW0gbm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbiB0byBiZSByZW1vdmVkIGZyb20gdGhlIGxpc3Qgb2Ygbm90aWZpY2F0aW9uc1xuXHQgKi9cblx0cHJpdmF0ZSByZW1vdmVOb3RpZmljYXRpb25Gcm9tTGlzdCggbm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiApOiB2b2lkIHtcblx0XHR0aGlzLm5vdGlmaWNhdGlvbnMgPVxuXHRcdFx0dGhpcy5ub3RpZmljYXRpb25zLmZpbHRlciggKCBpdGVtOiBOb3RpZmllck5vdGlmaWNhdGlvbiApID0+IGl0ZW0uY29tcG9uZW50ICE9PSBub3RpZmljYXRpb24uY29tcG9uZW50ICk7XG5cdFx0dGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTsgLy8gUnVuIGNoYW5nZSBkZXRlY3Rpb24gYmVjYXVzZSB0aGUgbm90aWZpY2F0aW9uIGxpc3QgY2hhbmdlZFxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbGwgbm90aWZpY2F0aW9ucyBmcm9tIHRoZSBsaXN0ICh0cmlnZ2VycyBjaGFuZ2UgZGV0ZWN0aW9uKVxuXHQgKi9cblx0cHJpdmF0ZSByZW1vdmVBbGxOb3RpZmljYXRpb25zRnJvbUxpc3QoKTogdm9pZCB7XG5cdFx0dGhpcy5ub3RpZmljYXRpb25zID0gW107XG5cdFx0dGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTsgLy8gUnVuIGNoYW5nZSBkZXRlY3Rpb24gYmVjYXVzZSB0aGUgbm90aWZpY2F0aW9uIGxpc3QgY2hhbmdlZFxuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlcjogRmluZCBhIG5vdGlmaWNhdGlvbiBpbiB0aGUgbm90aWZpY2F0aW9uIGxpc3QgYnkgYSBnaXZlbiBub3RpZmljYXRpb24gSURcblx0ICpcblx0ICogQHBhcmFtICAgbm90aWZpY2F0aW9uSWQgTm90aWZpY2F0aW9uIElELCB1c2VkIGZvciBmaW5kaW5nIG5vdGlmaWNhdGlvblxuXHQgKiBAcmV0dXJucyBOb3RpZmljYXRpb24sIHVuZGVmaW5lZCBpZiBub3QgZm91bmRcblx0ICovXG5cdHByaXZhdGUgZmluZE5vdGlmaWNhdGlvbkJ5SWQoIG5vdGlmaWNhdGlvbklkOiBzdHJpbmcgKTogTm90aWZpZXJOb3RpZmljYXRpb24gfCB1bmRlZmluZWQge1xuXHRcdHJldHVybiB0aGlzLm5vdGlmaWNhdGlvbnMuZmluZCggKCBjdXJyZW50Tm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiApID0+IGN1cnJlbnROb3RpZmljYXRpb24uaWQgPT09IG5vdGlmaWNhdGlvbklkICk7XG5cdH1cblxuXHQvKipcblx0ICogSGVscGVyOiBGaW5kIGEgbm90aWZpY2F0aW9uJ3MgaW5kZXggYnkgYSBnaXZlbiBub3RpZmljYXRpb24gSURcblx0ICpcblx0ICogQHBhcmFtICAgbm90aWZpY2F0aW9uSWQgTm90aWZpY2F0aW9uIElELCB1c2VkIGZvciBmaW5kaW5nIGEgbm90aWZpY2F0aW9uJ3MgaW5kZXhcblx0ICogQHJldHVybnMgTm90aWZpY2F0aW9uIGluZGV4LCB1bmRlZmluZWQgaWYgbm90IGZvdW5kXG5cdCAqL1xuXHRwcml2YXRlIGZpbmROb3RpZmljYXRpb25JbmRleEJ5SWQoIG5vdGlmaWNhdGlvbklkOiBzdHJpbmcgKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcblx0XHRjb25zdCBub3RpZmljYXRpb25JbmRleDogbnVtYmVyID1cblx0XHRcdHRoaXMubm90aWZpY2F0aW9ucy5maW5kSW5kZXgoICggY3VycmVudE5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gKSA9PiBjdXJyZW50Tm90aWZpY2F0aW9uLmlkID09PSBub3RpZmljYXRpb25JZCApO1xuXHRcdHJldHVybiAoIG5vdGlmaWNhdGlvbkluZGV4ICE9PSAtMSA/IG5vdGlmaWNhdGlvbkluZGV4IDogdW5kZWZpbmVkICk7XG5cdH1cblxufVxuIl19