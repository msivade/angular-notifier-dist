import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotifierNotification } from '../models/notifier-notification.model';
import * as i0 from "@angular/core";
import * as i1 from "../services/notifier-queue.service";
import * as i2 from "../services/notifier.service";
import * as i3 from "@angular/common";
import * as i4 from "./notifier-notification.component";
function NotifierContainerComponent_li_1_Template(rf, ctx) { if (rf & 1) {
    var _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 1);
    i0.ɵɵelementStart(1, "notifier-notification", 2);
    i0.ɵɵlistener("ready", function NotifierContainerComponent_li_1_Template_notifier_notification_ready_1_listener($event) { i0.ɵɵrestoreView(_r3); var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.onNotificationReady($event); })("dismiss", function NotifierContainerComponent_li_1_Template_notifier_notification_dismiss_1_listener($event) { i0.ɵɵrestoreView(_r3); var ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.onNotificationDismiss($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var notification_r1 = ctx.$implicit;
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
    /** @nocollapse */ NotifierContainerComponent.ɵfac = function NotifierContainerComponent_Factory(t) { return new (t || NotifierContainerComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.NotifierQueueService), i0.ɵɵdirectiveInject(i2.NotifierService)); };
    /** @nocollapse */ NotifierContainerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NotifierContainerComponent, selectors: [["notifier-container"]], hostAttrs: [1, "notifier__container"], decls: 2, vars: 2, consts: [["class", "notifier__container-list", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "notifier__container-list"], [3, "notification", "ready", "dismiss"]], template: function NotifierContainerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ul");
            i0.ɵɵtemplate(1, NotifierContainerComponent_li_1_Template, 2, 1, "li", 0);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.notifications)("ngForTrackBy", ctx.identifyNotification);
        } }, directives: [i3.NgForOf, i4.NotifierNotificationComponent], encapsulation: 2, changeDetection: 0 });
    return NotifierContainerComponent;
}());
export { NotifierContainerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ub3RpZmllci1jb250YWluZXIuY29tcG9uZW50LnRzIiwibGliL2NvbXBvbmVudHMvbm90aWZpZXItY29udGFpbmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBcUIsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBTWpHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7Ozs7OztJQ0w1RSw2QkFDQztJQUFBLGdEQUl3QjtJQUZ2QiwrTkFBdUMsd05BQUE7SUFFeEMsaUJBQXdCO0lBQ3pCLGlCQUFLOzs7SUFKSCxlQUE2QjtJQUE3Qiw4Q0FBNkI7O0FEUWhDOzs7Ozs7Ozs7Ozs7R0FZRztBQUNIO0lBd0NDOzs7Ozs7T0FNRztJQUNILG9DQUFvQixjQUFpQyxFQUFFLG9CQUEwQyxFQUFFLGVBQWdDO1FBQW5JLGlCQWFDO1FBWkEsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxvQkFBb0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUV4QiwrRUFBK0U7UUFDL0UsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBRSxVQUFFLE1BQXNCO1lBQ2pHLEtBQUksQ0FBQyxZQUFZLENBQUUsTUFBTSxDQUFFLENBQUMsSUFBSSxDQUFFO2dCQUNqQyxLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzlCLENBQUMsQ0FBRSxDQUFDO1FBQ0wsQ0FBQyxD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aUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBRSxDQUFDO0lBQ3JFLENBQUM7MkhBNWRXLDBCQUEwQjtzRkFBMUIsMEJBQTBCO1lDaEN2QywwQkFDQztZQUFBLHlFQUNDO1lBTUYsaUJBQUs7O1lBUGlDLGVBQTBFO1lBQTFFLDJDQUEwRSwwQ0FBQTs7cUNERGhIO0NBOGZDLEFBdGVELElBc2VDO1NBOWRZLDBCQUEwQjtrREFBMUIsMEJBQTBCO2NBUnRDLFNBQVM7ZUFBRTtnQkFDWCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsSUFBSSxFQUFFO29CQUNMLEtBQUssRUFBRSxxQkFBcUI7aUJBQzVCO2dCQUNELFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFdBQVcsRUFBRSxxQ0FBcUM7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBOb3RpZmllckFjdGlvbiB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1hY3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpZXJDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItY29uZmlnLm1vZGVsJztcbmltcG9ydCB7IE5vdGlmaWVyTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLW5vdGlmaWNhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllclF1ZXVlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25vdGlmaWVyLXF1ZXVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbm90aWZpZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmllck5vdGlmaWNhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vbm90aWZpZXItbm90aWZpY2F0aW9uLmNvbXBvbmVudCc7XG5cbi8qKlxuICogTm90aWZpZXIgY29udGFpbmVyIGNvbXBvbmVudFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVGhpcyBjb21wb25lbnQgYWN0cyBhcyBhIHdyYXBwZXIgZm9yIGFsbCBub3RpZmljYXRpb24gY29tcG9uZW50czsgY29uc2VxdWVudGx5LCBpdCBpcyByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgYSBuZXcgbm90aWZpY2F0aW9uXG4gKiBjb21wb25lbnQgYW5kIHJlbW92aW5nIGFuIGV4aXN0aW5nIG5vdGlmaWNhdGlvbiBjb21wb25lbnQuIEJlaW5nIG1vcmUgcHJlY2ljZWx5LCBpdCBhbHNvIGhhbmRsZXMgc2lkZSBlZmZlY3RzIG9mIHRob3NlIGFjdGlvbnMsIHN1Y2ggYXNcbiAqIHNoaWZ0aW5nIG9yIGV2ZW4gY29tcGxldGVseSByZW1vdmluZyBvdGhlciBub3RpZmljYXRpb25zIGFzIHdlbGwuIE92ZXJhbGwsIHRoaXMgY29tcG9uZW50cyBoYW5kbGVzIGFjdGlvbnMgY29taW5nIGZyb20gdGhlIHF1ZXVlIHNlcnZpY2VcbiAqIGJ5IHN1YnNjcmliaW5nIHRvIGl0cyBhY3Rpb24gc3RyZWFtLlxuICpcbiAqIFRlY2huaWNhbCBzaWRlbm90ZTpcbiAqIFRoaXMgY29tcG9uZW50IGhhcyB0byBiZSB1c2VkIHNvbWV3aGVyZSBpbiBhbiBhcHBsaWNhdGlvbiB0byB3b3JrOyBpdCB3aWxsIG5vdCBpbmplY3QgYW5kIGNyZWF0ZSBpdHNlbGYgYXV0b21hdGljYWxseSwgcHJpbWFyaWx5IGluIG9yZGVyXG4gKiB0byBub3QgYnJlYWsgdGhlIEFuZ3VsYXIgQW9UIGNvbXBpbGF0aW9uLiBNb3Jlb3ZlciwgdGhpcyBjb21wb25lbnQgKGFuZCBhbHNvIHRoZSBub3RpZmljYXRpb24gY29tcG9uZW50cykgc2V0IHRoZWlyIGNoYW5nZSBkZXRlY3Rpb25cbiAqIHN0cmF0ZWd5IG9uUHVzaCwgd2hpY2ggbWVhbnMgdGhhdCB3ZSBoYW5kbGUgY2hhbmdlIGRldGVjdGlvbiBtYW51YWxseSBpbiBvcmRlciB0byBnZXQgdGhlIGJlc3QgcGVyZm9ybWFuY2UuICgjcGVyZm1hdHRlcnMpXG4gKi9cbkBDb21wb25lbnQoIHtcblx0Y2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsIC8vICgjcGVyZm1hdHRlcnMpXG5cdGhvc3Q6IHtcblx0XHRjbGFzczogJ25vdGlmaWVyX19jb250YWluZXInXG5cdH0sXG5cdHNlbGVjdG9yOiAnbm90aWZpZXItY29udGFpbmVyJyxcblx0dGVtcGxhdGVVcmw6ICcuL25vdGlmaWVyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCdcbn0gKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWVyQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuXHQvKipcblx0ICogTGlzdCBvZiBjdXJyZW50bHkgc29tZXdoYXQgYWN0aXZlIG5vdGlmaWNhdGlvbnNcblx0ICovXG5cdHB1YmxpYyBub3RpZmljYXRpb25zOiBBcnJheTxOb3RpZmllck5vdGlmaWNhdGlvbj47XG5cblx0LyoqXG5cdCAqIENoYW5nZSBkZXRlY3RvclxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWY7XG5cblx0LyoqXG5cdCAqIE5vdGlmaWVyIHF1ZXVlIHNlcnZpY2Vcblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgcXVldWVTZXJ2aWNlOiBOb3RpZmllclF1ZXVlU2VydmljZTtcblxuXHQvKipcblx0ICogTm90aWZpZXIgY29uZmlndXJhdGlvblxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBjb25maWc6IE5vdGlmaWVyQ29uZmlnO1xuXG5cdC8qKlxuXHQgKiBRdWV1ZSBzZXJ2aWNlIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uIChzYXZlZCBmb3IgY2xlYW51cClcblx0ICovXG5cdHByaXZhdGUgcXVldWVTZXJ2aWNlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cblx0LyoqXG5cdCAqIFByb21pc2UgcmVzb2x2ZSBmdW5jdGlvbiByZWZlcmVuY2UsIHRlbXBvcmFyaWx5IHVzZWQgd2hpbGUgdGhlIG5vdGlmaWNhdGlvbiBjaGlsZCBjb21wb25lbnQgZ2V0cyBjcmVhdGVkXG5cdCAqL1xuXHRwcml2YXRlIHRlbXBQcm9taXNlUmVzb2x2ZXI6ICgpID0+IHZvaWQ7XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSBjaGFuZ2VEZXRlY3RvciAgICAgICBDaGFuZ2UgZGV0ZWN0b3IsIHVzZWQgZm9yIG1hbnVhbGx5IHRyaWdnZXJpbmcgY2hhbmdlIGRldGVjdGlvbiBydW5zXG5cdCAqIEBwYXJhbSBub3RpZmllclF1ZXVlU2VydmljZSBOb3RpZmllciBxdWV1ZSBzZXJ2aWNlXG5cdCAqIEBwYXJhbSBub3RpZmllclNlcnZpY2UgICAgICBOb3RpZmllciBzZXJ2aWNlXG5cdCAqL1xuXHRwdWJsaWMgY29uc3RydWN0b3IoIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZiwgbm90aWZpZXJRdWV1ZVNlcnZpY2U6IE5vdGlmaWVyUXVldWVTZXJ2aWNlLCBub3RpZmllclNlcnZpY2U6IE5vdGlmaWVyU2VydmljZSApIHtcblx0XHR0aGlzLmNoYW5nZURldGVjdG9yID0gY2hhbmdlRGV0ZWN0b3I7XG5cdFx0dGhpcy5xdWV1ZVNlcnZpY2UgPSBub3RpZmllclF1ZXVlU2VydmljZTtcblx0XHR0aGlzLmNvbmZpZyA9IG5vdGlmaWVyU2VydmljZS5nZXRDb25maWcoKTtcblx0XHR0aGlzLm5vdGlmaWNhdGlvbnMgPSBbXTtcblxuXHRcdC8vIENvbm5lY3RzIHRoaXMgY29tcG9uZW50IHVwIHRvIHRoZSBhY3Rpb24gcXVldWUsIHRoZW4gaGFuZGxlIGluY29taW5nIGFjdGlvbnNcblx0XHR0aGlzLnF1ZXVlU2VydmljZVN1YnNjcmlwdGlvbiA9IHRoaXMucXVldWVTZXJ2aWNlLmFjdGlvblN0cmVhbS5zdWJzY3JpYmUoICggYWN0aW9uOiBOb3RpZmllckFjdGlvbiApID0+IHtcblx0XHRcdHRoaXMuaGFuZGxlQWN0aW9uKCBhY3Rpb24gKS50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucXVldWVTZXJ2aWNlLmNvbnRpbnVlKCk7XG5cdFx0XHR9ICk7XG5cdFx0fSApO1xuXG5cdH1cblxuXHQvKipcblx0ICogQ29tcG9uZW50IGRlc3Ryb3ltZW50IGxpZmVjeWNsZSBob29rLCBjbGVhbnMgdXAgdGhlIG9ic2VydmFibGUgc3Vic2NpcHRpb25cblx0ICovXG5cdHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcblx0XHRpZiAoIHRoaXMucXVldWVTZXJ2aWNlU3Vic2NyaXB0aW9uICkge1xuXHRcdFx0dGhpcy5xdWV1ZVNlcnZpY2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTm90aWZpY2F0aW9uIGlkZW50aWZpZXIsIHVzZWQgYXMgdGhlIG5nRm9yIHRyYWNrYnkgZnVuY3Rpb25cblx0ICpcblx0ICogQHBhcmFtICAgaW5kZXggICAgICAgIEluZGV4XG5cdCAqIEBwYXJhbSAgIG5vdGlmaWNhdGlvbiBOb3RpZmllciBub3RpZmljYXRpb25cblx0ICogQHJldHVybnMgTm90aWZpY2F0aW9uIElEIGFzIHRoZSB1bmlxdWUgaWRlbnRuZmllclxuXHQgKi9cblx0cHVibGljIGlkZW50aWZ5Tm90aWZpY2F0aW9uKCBpbmRleDogbnVtYmVyLCBub3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uICk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIG5vdGlmaWNhdGlvbi5pZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBFdmVudCBoYW5kbGVyLCBoYW5kbGVzIGNsaWNrcyBvbiBub3RpZmljYXRpb24gZGlzbWlzcyBidXR0b25zXG5cdCAqXG5cdCAqIEBwYXJhbSBub3RpZmljYXRpb25JZCBJRCBvZiB0aGUgbm90aWZpY2F0aW9uIHRvIGRpc21pc3Ncblx0ICovXG5cdHB1YmxpYyBvbk5vdGlmaWNhdGlvbkRpc21pc3MoIG5vdGlmaWNhdGlvbklkOiBzdHJpbmcgKTogdm9pZCB7XG5cdFx0dGhpcy5xdWV1ZVNlcnZpY2UucHVzaCgge1xuXHRcdFx0cGF5bG9hZDogbm90aWZpY2F0aW9uSWQsXG5cdFx0XHR0eXBlOiAnSElERSdcblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogRXZlbnQgaGFuZGxlciwgaGFuZGxlcyBub3RpZmljYXRpb24gcmVhZHkgZXZlbnRzXG5cdCAqXG5cdCAqIEBwYXJhbSBub3RpZmljYXRpb25Db21wb25lbnQgTm90aWZpY2F0aW9uIGNvbXBvbmVudCByZWZlcmVuY2Vcblx0ICovXG5cdHB1YmxpYyBvbk5vdGlmaWNhdGlvblJlYWR5KCBub3RpZmljYXRpb25Db21wb25lbnQ6IE5vdGlmaWVyTm90aWZpY2F0aW9uQ29tcG9uZW50ICk6IHZvaWQge1xuXHRcdGxldCBjdXJyZW50Tm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiA9IHRoaXMubm90aWZpY2F0aW9uc1sgdGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aCAtIDEgXTsgLy8gR2V0IHRoZSBsYXRlc3Qgbm90aWZpY2F0aW9uXG5cdFx0Y3VycmVudE5vdGlmaWNhdGlvbi5jb21wb25lbnQgPSBub3RpZmljYXRpb25Db21wb25lbnQ7IC8vIFNhdmUgdGhlIG5ldyBvbXBvbmVudCByZWZlcmVuY2Vcblx0XHR0aGlzLmNvbnRpbnVlSGFuZGxlU2hvd0FjdGlvbiggY3VycmVudE5vdGlmaWNhdGlvbiApOyAvLyBDb250aW51ZSB3aXRoIGhhbmRsaW5nIHRoZSBzaG93IGFjdGlvblxuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBpbmNvbWluZyBhY3Rpb25zIGJ5IG1hcHBpbmcgYWN0aW9uIHR5cGVzIHRvIG1ldGhvZHMsIGFuZCB0aGVuIHJ1bm5pbmcgdGhlbVxuXHQgKlxuXHQgKiBAcGFyYW0gICBhY3Rpb24gQWN0aW9uIG9iamVjdFxuXHQgKiBAcmV0dXJucyBQcm9taXNlLCByZXNvbHZlZCB3aGVuIGRvbmVcblx0ICovXG5cdHByaXZhdGUgaGFuZGxlQWN0aW9uKCBhY3Rpb246IE5vdGlmaWVyQWN0aW9uICk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG5cdFx0c3dpdGNoICggYWN0aW9uLnR5cGUgKSB7IC8vIFRPRE86IE1heWJlIGEgbWFwIChhY3Rpb25UeXBlIC0+IGNsYXNzIG1ldGhvZCkgaXMgYSBjbGVhbmVyIHNvbHV0aW9uIGhlcmU/XG5cdFx0XHRjYXNlICdTSE9XJzpcblx0XHRcdFx0cmV0dXJuIHRoaXMuaGFuZGxlU2hvd0FjdGlvbiggYWN0aW9uICk7XG5cdFx0XHRjYXNlICdISURFJzpcblx0XHRcdFx0cmV0dXJuIHRoaXMuaGFuZGxlSGlkZUFjdGlvbiggYWN0aW9uICk7XG5cdFx0XHRjYXNlICdISURFX09MREVTVCc6XG5cdFx0XHRcdHJldHVybiB0aGlzLmhhbmRsZUhpZGVPbGRlc3RBY3Rpb24oIGFjdGlvbiApO1xuXHRcdFx0Y2FzZSAnSElERV9ORVdFU1QnOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5oYW5kbGVIaWRlTmV3ZXN0QWN0aW9uKCBhY3Rpb24gKTtcblx0XHRcdGNhc2UgJ0hJREVfQUxMJzpcblx0XHRcdFx0cmV0dXJuIHRoaXMuaGFuZGxlSGlkZUFsbEFjdGlvbiggYWN0aW9uICk7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2U8dW5kZWZpbmVkPiggKCByZXNvbHZlOiAoKSA9PiB2b2lkLCByZWplY3Q6ICgpID0+IHZvaWQgKSA9PiB7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpOyAvLyBJZ25vcmUgdW5rbm93biBhY3Rpb24gdHlwZXNcblx0XHRcdFx0fSApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTaG93IGEgbmV3IG5vdGlmaWNhdGlvblxuXHQgKlxuXHQgKiBXZSBzaW1wbHkgYWRkIHRoZSBub3RpZmljYXRpb24gdG8gdGhlIGxpc3QsIGFuZCB0aGVuIHdhaXQgdW50aWwgaXRzIHByb3Blcmx5IGluaXRpYWxpemVkIC8gY3JlYXRlZCAvIHJlbmRlcmVkLlxuXHQgKlxuXHQgKiBAcGFyYW0gICBhY3Rpb24gQWN0aW9uIG9iamVjdFxuXHQgKiBAcmV0dXJucyBQcm9taXNlLCByZXNvbHZlZCB3aGVuIGRvbmVcblx0ICovXG5cdHByaXZhdGUgaGFuZGxlU2hvd0FjdGlvbiggYWN0aW9uOiBOb3RpZmllckFjdGlvbiApOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblx0XHRcdHRoaXMudGVtcFByb21pc2VSZXNvbHZlciA9IHJlc29sdmU7IC8vIFNhdmUgdGhlIHByb21pc2UgcmVzb2x2ZSBmdW5jdGlvbiBzbyB0aGF0IGl0IGNhbiBiZSBjYWxsZWQgbGF0ZXIgb24gYnkgYW5vdGhlciBtZXRob2Rcblx0XHRcdHRoaXMuYWRkTm90aWZpY2F0aW9uVG9MaXN0KCBuZXcgTm90aWZpZXJOb3RpZmljYXRpb24oIGFjdGlvbi5wYXlsb2FkICkgKTtcblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udGludWUgdG8gc2hvdyBhIG5ldyBub3RpZmljYXRpb24gKGFmdGVyIHRoZSBub3RpZmljYXRpb24gY29tcG9uZW50cyBpcyBpbml0aWFsaXplZCAvIGNyZWF0ZWQgLyByZW5kZXJlZCkuXG5cdCAqXG5cdCAqIElmIHRoaXMgaXMgdGhlIGZpcnN0IChhbmQgdGh1cyBvbmx5KSBub3RpZmljYXRpb24sIHdlIGNhbiBzaW1wbHkgc2hvdyBpdC4gT3RoZXJ3aGlzZSwgaWYgc3RhY2tpbmcgaXMgZGlzYWJsZWQgKG9yIGEgbG93IHZhbHVlKSwgd2Vcblx0ICogc3dpdGNoIG91dCBub3RpZmljYXRpb25zLCBpbiBwYXJ0aWN1bGFyIHdlIGhpZGUgdGhlIGV4aXN0aW5nIG9uZSwgYW5kIHRoZW4gc2hvdyBvdXIgbmV3IG9uZS4gWWV0LCBpZiBzdGFja2luZyBpcyBlbmFibGVkLCB3ZSBmaXJzdFxuXHQgKiBzaGlmdCBhbGwgb2xkZXIgbm90aWZpY2F0aW9ucywgYW5kIHRoZW4gc2hvdyBvdXIgbmV3IG5vdGlmaWNhdGlvbi4gSW4gYWRkaXRpb24sIGlmIHRoZXJlIGFyZSB0b28gbWFueSBub3RpZmljYXRpb24gb24gdGhlIHNjcmVlbixcblx0ICogd2UgaGlkZSB0aGUgb2xkZXN0IG9uZSBmaXJzdC4gRnVydGhlcm1vcmUsIGlmIGNvbmZpZ3VyZWQsIGFuaW1hdGlvbiBvdmVybGFwcGluZyBpcyBhcHBsaWVkLlxuXHQgKlxuXHQgKiBAcGFyYW0gbm90aWZpY2F0aW9uIE5ldyBub3RpZmljYXRpb24gdG8gc2hvd1xuXHQgKi9cblx0cHJpdmF0ZSBjb250aW51ZUhhbmRsZVNob3dBY3Rpb24oIG5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gKTogdm9pZCB7XG5cblx0XHQvLyBGaXJzdCAod2hpY2ggbWVhbnMgb25seSBvbmUpIG5vdGlmaWNhdGlvbiBpbiB0aGUgbGlzdD9cblx0XHRjb25zdCBudW1iZXJPZk5vdGlmaWNhdGlvbnM6IG51bWJlciA9IHRoaXMubm90aWZpY2F0aW9ucy5sZW5ndGg7XG5cdFx0aWYgKCBudW1iZXJPZk5vdGlmaWNhdGlvbnMgPT09IDEgKSB7XG5cdFx0XHRub3RpZmljYXRpb24uY29tcG9uZW50LnNob3coKS50aGVuKCB0aGlzLnRlbXBQcm9taXNlUmVzb2x2ZXIgKTsgLy8gRG9uZVxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnN0IGltcGxpY2l0U3RhY2tpbmdMaW1pdDogbnVtYmVyID0gMjtcblxuXHRcdFx0Ly8gU3RhY2tpbmcgZW5hYmxlZD8gKHN0YWNraW5nIHZhbHVlIGJlbG93IDIgbWVhbnMgc3RhY2tpbmcgaXMgZGlzYWJsZWQpXG5cdFx0XHRpZiAoIHRoaXMuY29uZmlnLmJlaGF2aW91ci5zdGFja2luZyA9PT0gZmFsc2UgfHwgdGhpcy5jb25maWcuYmVoYXZpb3VyLnN0YWNraW5nIDwgaW1wbGljaXRTdGFja2luZ0xpbWl0ICkge1xuXHRcdFx0XHR0aGlzLm5vdGlmaWNhdGlvbnNbIDAgXS5jb21wb25lbnQuaGlkZSgpLnRoZW4oICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnJlbW92ZU5vdGlmaWNhdGlvbkZyb21MaXN0KCB0aGlzLm5vdGlmaWNhdGlvbnNbIDAgXSApO1xuXHRcdFx0XHRcdG5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2hvdygpLnRoZW4oIHRoaXMudGVtcFByb21pc2VSZXNvbHZlciApOyAvLyBEb25lXG5cdFx0XHRcdH0gKTtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Y29uc3Qgc3RlcFByb21pc2VzOiBBcnJheTxQcm9taXNlPHVuZGVmaW5lZD4+ID0gW107XG5cblx0XHRcdFx0Ly8gQXJlIHRoZXJlIG5vdyB0b28gbWFueSBub3RpZmljYXRpb25zP1xuXHRcdFx0XHRpZiAoIG51bWJlck9mTm90aWZpY2F0aW9ucyA+IHRoaXMuY29uZmlnLmJlaGF2aW91ci5zdGFja2luZyApIHtcblxuXHRcdFx0XHRcdGNvbnN0IG9sZE5vdGlmaWNhdGlvbnM6IEFycmF5PE5vdGlmaWVyTm90aWZpY2F0aW9uPiA9IHRoaXMubm90aWZpY2F0aW9ucy5zbGljZSggMSwgbnVtYmVyT2ZOb3RpZmljYXRpb25zIC0gMSApO1xuXG5cdFx0XHRcdFx0Ly8gQXJlIGFuaW1hdGlvbnMgZW5hYmxlZD9cblx0XHRcdFx0XHRpZiAoIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuZW5hYmxlZCApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSXMgYW5pbWF0aW9uIG92ZXJsYXAgZW5hYmxlZD9cblx0XHRcdFx0XHRcdGlmICggdGhpcy5jb25maWcuYW5pbWF0aW9ucy5vdmVybGFwICE9PSBmYWxzZSAmJiB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgPiAwICkge1xuXHRcdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggdGhpcy5ub3RpZmljYXRpb25zWyAwIF0uY29tcG9uZW50LmhpZGUoKSApO1xuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIHRoaXMuc2hpZnROb3RpZmljYXRpb25zKCBvbGROb3RpZmljYXRpb25zLCBub3RpZmljYXRpb24uY29tcG9uZW50LmdldEhlaWdodCgpLCB0cnVlICkgKTtcblx0XHRcdFx0XHRcdFx0fSwgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5oaWRlLnNwZWVkIC0gdGhpcy5jb25maWcuYW5pbWF0aW9ucy5vdmVybGFwICk7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbm90aWZpY2F0aW9uLmNvbXBvbmVudC5zaG93KCkgKTtcblx0XHRcdFx0XHRcdFx0fSwgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5oaWRlLnNwZWVkICsgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5zaGlmdC5zcGVlZCAtIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMub3ZlcmxhcCApO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMubm90aWZpY2F0aW9uc1sgMCBdLmNvbXBvbmVudC5oaWRlKCkudGhlbiggKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5zaGlmdE5vdGlmaWNhdGlvbnMoIG9sZE5vdGlmaWNhdGlvbnMsIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0SGVpZ2h0KCksIHRydWUgKS50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2hvdygpLnRoZW4oIHJlc29sdmUgKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0XHRcdH0gKSApO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLm5vdGlmaWNhdGlvbnNbIDAgXS5jb21wb25lbnQuaGlkZSgpICk7XG5cdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggdGhpcy5zaGlmdE5vdGlmaWNhdGlvbnMoIG9sZE5vdGlmaWNhdGlvbnMsIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0SGVpZ2h0KCksIHRydWUgKSApO1xuXHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2hvdygpICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRjb25zdCBvbGROb3RpZmljYXRpb25zOiBBcnJheTxOb3RpZmllck5vdGlmaWNhdGlvbj4gPSB0aGlzLm5vdGlmaWNhdGlvbnMuc2xpY2UoIDAsIG51bWJlck9mTm90aWZpY2F0aW9ucyAtIDEgKTtcblxuXHRcdFx0XHRcdC8vIEFyZSBhbmltYXRpb25zIGVuYWJsZWQ/XG5cdFx0XHRcdFx0aWYgKCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmVuYWJsZWQgKSB7XG5cblx0XHRcdFx0XHRcdC8vIElzIGFuaW1hdGlvbiBvdmVybGFwIGVuYWJsZWQ/XG5cdFx0XHRcdFx0XHRpZiAoIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMub3ZlcmxhcCAhPT0gZmFsc2UgJiYgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5vdmVybGFwID4gMCApIHtcblx0XHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIHRoaXMuc2hpZnROb3RpZmljYXRpb25zKCBvbGROb3RpZmljYXRpb25zLCBub3RpZmljYXRpb24uY29tcG9uZW50LmdldEhlaWdodCgpLCB0cnVlICkgKTtcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCBub3RpZmljYXRpb24uY29tcG9uZW50LnNob3coKSApO1xuXHRcdFx0XHRcdFx0XHR9LCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLnNoaWZ0LnNwZWVkIC0gdGhpcy5jb25maWcuYW5pbWF0aW9ucy5vdmVybGFwICk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggbmV3IFByb21pc2U8dW5kZWZpbmVkPiggKCByZXNvbHZlOiAoKSA9PiB2b2lkLCByZWplY3Q6ICgpID0+IHZvaWQgKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zaGlmdE5vdGlmaWNhdGlvbnMoIG9sZE5vdGlmaWNhdGlvbnMsIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0SGVpZ2h0KCksIHRydWUgKS50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRub3RpZmljYXRpb24uY29tcG9uZW50LnNob3coKS50aGVuKCByZXNvbHZlICk7XG5cdFx0XHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0XHR9ICkgKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggdGhpcy5zaGlmdE5vdGlmaWNhdGlvbnMoIG9sZE5vdGlmaWNhdGlvbnMsIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0SGVpZ2h0KCksIHRydWUgKSApO1xuXHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2hvdygpICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRQcm9taXNlLmFsbCggc3RlcFByb21pc2VzICkudGhlbiggKCkgPT4ge1xuXHRcdFx0XHRcdGlmICggbnVtYmVyT2ZOb3RpZmljYXRpb25zID4gdGhpcy5jb25maWcuYmVoYXZpb3VyLnN0YWNraW5nICkge1xuXHRcdFx0XHRcdFx0dGhpcy5yZW1vdmVOb3RpZmljYXRpb25Gcm9tTGlzdCggdGhpcy5ub3RpZmljYXRpb25zWyAwIF0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy50ZW1wUHJvbWlzZVJlc29sdmVyKCk7XG5cdFx0XHRcdH0gKTsgLy8gRG9uZVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBIaWRlIGFuIGV4aXN0aW5nIG5vdGlmaWNhdGlvblxuXHQgKlxuXHQgKiBGaXN0LCB3ZSBza2lwIGV2ZXJ5dGhpbmcgaWYgdGhlcmUgYXJlIG5vIG5vdGlmaWNhdGlvbnMgYXQgYWxsLCBvciB0aGUgZ2l2ZW4gbm90aWZpY2F0aW9uIGRvZXMgbm90IGV4aXN0LiBUaGVuLCB3ZSBoaWRlIHRoZSBnaXZlblxuXHQgKiBub3RpZmljYXRpb24uIElmIHRoZXJlIGV4aXN0IG9sZGVyIG5vdGlmaWNhdGlvbnMsIHdlIHRoZW4gc2hpZnQgdGhlbSBhcm91bmQgdG8gZmlsbCB0aGUgZ2FwLiBPbmNlIGJvdGggaGlkaW5nIHRoZSBnaXZlbiBub3RpZmljYXRpb25cblx0ICogYW5kIHNoaWZ0aW5nIHRoZSBvbGRlciBub3RpZmljYWl0b25zIGlzIGRvbmUsIHRoZSBnaXZlbiBub3RpZmljYXRpb24gZ2V0cyBmaW5hbGx5IHJlbW92ZWQgKGZyb20gdGhlIERPTSkuXG5cdCAqXG5cdCAqIEBwYXJhbSAgIGFjdGlvbiBBY3Rpb24gb2JqZWN0LCBwYXlsb2FkIGNvbnRhaW5zIHRoZSBub3RpZmljYXRpb24gSURcblx0ICogQHJldHVybnMgUHJvbWlzZSwgcmVzb2x2ZWQgd2hlbiBkb25lXG5cdCAqL1xuXHRwcml2YXRlIGhhbmRsZUhpZGVBY3Rpb24oIGFjdGlvbjogTm90aWZpZXJBY3Rpb24gKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8dW5kZWZpbmVkPiggKCByZXNvbHZlOiAoKSA9PiB2b2lkLCByZWplY3Q6ICgpID0+IHZvaWQgKSA9PiB7XG5cblx0XHRcdGNvbnN0IHN0ZXBQcm9taXNlczogQXJyYXk8UHJvbWlzZTx1bmRlZmluZWQ+PiA9IFtdO1xuXG5cdFx0XHQvLyBEb2VzIHRoZSBub3RpZmljYXRpb24gZXhpc3QgLyBhcmUgdGhlcmUgZXZlbiBhbnkgbm90aWZpY2F0aW9ucz8gKGxldCdzIHByZXZlbnQgYWNjaWRlbnRpYWwgZXJyb3JzKVxuXHRcdFx0Y29uc3Qgbm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiB8IHVuZGVmaW5lZCA9IHRoaXMuZmluZE5vdGlmaWNhdGlvbkJ5SWQoIGFjdGlvbi5wYXlsb2FkICk7XG5cdFx0XHRpZiAoIG5vdGlmaWNhdGlvbiA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gR2V0IG9sZGVyIG5vdGlmaWNhdGlvbnNcblx0XHRcdGNvbnN0IG5vdGlmaWNhdGlvbkluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQgPSB0aGlzLmZpbmROb3RpZmljYXRpb25JbmRleEJ5SWQoIGFjdGlvbi5wYXlsb2FkICk7XG5cdFx0XHRpZiAoIG5vdGlmaWNhdGlvbkluZGV4ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3Qgb2xkTm90aWZpY2F0aW9uczogQXJyYXk8Tm90aWZpZXJOb3RpZmljYXRpb24+ID0gdGhpcy5ub3RpZmljYXRpb25zLnNsaWNlKCAwLCBub3RpZmljYXRpb25JbmRleCApO1xuXG5cdFx0XHQvLyBEbyBvbGRlciBub3RpZmljYXRpb25zIGV4aXN0LCBhbmQgdGh1cyBkbyB3ZSBuZWVkIHRvIHNoaWZ0IG90aGVyIG5vdGlmaWNhdGlvbnMgYXMgYSBjb25zZXF1ZW5jZT9cblx0XHRcdGlmICggb2xkTm90aWZpY2F0aW9ucy5sZW5ndGggPiAwICkge1xuXG5cdFx0XHRcdC8vIEFyZSBhbmltYXRpb25zIGVuYWJsZWQ/XG5cdFx0XHRcdGlmICggdGhpcy5jb25maWcuYW5pbWF0aW9ucy5lbmFibGVkICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbnMuaGlkZS5zcGVlZCA+IDAgKSB7XG5cblx0XHRcdFx0XHQvLyBJcyBhbmltYXRpb24gb3ZlcmxhcCBlbmFibGVkP1xuXHRcdFx0XHRcdGlmICggdGhpcy5jb25maWcuYW5pbWF0aW9ucy5vdmVybGFwICE9PSBmYWxzZSAmJiB0aGlzLmNvbmZpZy5hbmltYXRpb25zLm92ZXJsYXAgPiAwICkge1xuXHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuaGlkZSgpICk7XG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLnNoaWZ0Tm90aWZpY2F0aW9ucyggb2xkTm90aWZpY2F0aW9ucywgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRIZWlnaHQoKSwgZmFsc2UgKSApO1xuXHRcdFx0XHRcdFx0fSwgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5oaWRlLnNwZWVkIC0gdGhpcy5jb25maWcuYW5pbWF0aW9ucy5vdmVybGFwICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG5vdGlmaWNhdGlvbi5jb21wb25lbnQuaGlkZSgpLnRoZW4oICgpID0+IHtcblx0XHRcdFx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIHRoaXMuc2hpZnROb3RpZmljYXRpb25zKCBvbGROb3RpZmljYXRpb25zLCBub3RpZmljYXRpb24uY29tcG9uZW50LmdldEhlaWdodCgpLCBmYWxzZSApICk7XG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCBub3RpZmljYXRpb24uY29tcG9uZW50LmhpZGUoKSApO1xuXHRcdFx0XHRcdHN0ZXBQcm9taXNlcy5wdXNoKCB0aGlzLnNoaWZ0Tm90aWZpY2F0aW9ucyggb2xkTm90aWZpY2F0aW9ucywgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRIZWlnaHQoKSwgZmFsc2UgKSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0c3RlcFByb21pc2VzLnB1c2goIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuaGlkZSgpICk7XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gV2FpdCB1bnRpbCBib3RoIGhpZGluZyBhbmQgc2hpZnRpbmcgaXMgZG9uZSwgdGhlbiByZW1vdmUgdGhlIG5vdGlmaWNhdGlvbiBmcm9tIHRoZSBsaXN0XG5cdFx0XHRQcm9taXNlLmFsbCggc3RlcFByb21pc2VzICkudGhlbiggKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnJlbW92ZU5vdGlmaWNhdGlvbkZyb21MaXN0KCBub3RpZmljYXRpb24gKTtcblx0XHRcdFx0cmVzb2x2ZSgpOyAvLyBEb25lXG5cdFx0XHR9ICk7XG5cblx0XHR9ICk7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBIaWRlIHRoZSBvbGRlc3Qgbm90aWZpY2F0aW9uIChicmlkZ2UgdG8gaGFuZGxlSGlkZUFjdGlvbilcblx0ICpcblx0ICogQHBhcmFtICAgYWN0aW9uIEFjdGlvbiBvYmplY3Rcblx0ICogQHJldHVybnMgUHJvbWlzZSwgcmVzb2x2ZWQgd2hlbiBkb25lXG5cdCAqL1xuXHRwcml2YXRlIGhhbmRsZUhpZGVPbGRlc3RBY3Rpb24oIGFjdGlvbjogTm90aWZpZXJBY3Rpb24gKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcblxuXHRcdC8vIEFyZSB0aGVyZSBhbnkgbm90aWZpY2F0aW9ucz8gKHByZXZlbnQgYWNjaWRlbnRpYWwgZXJyb3JzKVxuXHRcdGlmICggdGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aCA9PT0gMCApIHtcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0fSApOyAvLyBEb25lXG5cdFx0fSBlbHNlIHtcblx0XHRcdGFjdGlvbi5wYXlsb2FkID0gdGhpcy5ub3RpZmljYXRpb25zWyAwIF0uaWQ7XG5cdFx0XHRyZXR1cm4gdGhpcy5oYW5kbGVIaWRlQWN0aW9uKCBhY3Rpb24gKTtcblx0XHR9XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBIaWRlIHRoZSBuZXdlc3Qgbm90aWZpY2F0aW9uIChicmlkZ2UgdG8gaGFuZGxlSGlkZUFjdGlvbilcblx0ICpcblx0ICogQHBhcmFtICAgYWN0aW9uIEFjdGlvbiBvYmplY3Rcblx0ICogQHJldHVybnMgUHJvbWlzZSwgcmVzb2x2ZWQgd2hlbiBkb25lXG5cdCAqL1xuXHRwcml2YXRlIGhhbmRsZUhpZGVOZXdlc3RBY3Rpb24oIGFjdGlvbjogTm90aWZpZXJBY3Rpb24gKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcblxuXHRcdC8vIEFyZSB0aGVyZSBhbnkgbm90aWZpY2F0aW9ucz8gKHByZXZlbnQgYWNjaWRlbnRpYWwgZXJyb3JzKVxuXHRcdGlmICggdGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aCA9PT0gMCApIHtcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0fSApOyAvLyBEb25lXG5cdFx0fSBlbHNlIHtcblx0XHRcdGFjdGlvbi5wYXlsb2FkID0gdGhpcy5ub3RpZmljYXRpb25zWyB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoIC0gMSBdLmlkO1xuXHRcdFx0cmV0dXJuIHRoaXMuaGFuZGxlSGlkZUFjdGlvbiggYWN0aW9uICk7XG5cdFx0fVxuXG5cdH1cblxuXHQvKipcblx0ICogSGlkZSBhbGwgbm90aWZpY2F0aW9ucyBhdCBvbmNlXG5cdCAqXG5cdCAqIEBwYXJhbSAgIGFjdGlvbiBBY3Rpb24gb2JqZWN0XG5cdCAqIEByZXR1cm5zIFByb21pc2UsIHJlc29sdmVkIHdoZW4gZG9uZVxuXHQgKi9cblx0cHJpdmF0ZSBoYW5kbGVIaWRlQWxsQWN0aW9uKCBhY3Rpb246IE5vdGlmaWVyQWN0aW9uICk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXG5cdFx0XHQvLyBBcmUgdGhlcmUgYW55IG5vdGlmaWNhdGlvbnM/IChwcmV2ZW50IGFjY2lkZW50aWFsIGVycm9ycylcblx0XHRcdGNvbnN0IG51bWJlck9mTm90aWZpY2F0aW9uczogbnVtYmVyID0gdGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aDtcblx0XHRcdGlmICggbnVtYmVyT2ZOb3RpZmljYXRpb25zID09PSAwICkge1xuXHRcdFx0XHRyZXNvbHZlKCk7IC8vIERvbmVcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBcmUgYW5pbWF0aW9ucyBlbmFibGVkP1xuXHRcdFx0aWYgKCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmVuYWJsZWQgJiYgdGhpcy5jb25maWcuYW5pbWF0aW9ucy5oaWRlLnNwZWVkID4gMCAmJiB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmhpZGUub2Zmc2V0ICE9PSBmYWxzZSAmJlxuXHRcdFx0XHR0aGlzLmNvbmZpZy5hbmltYXRpb25zLmhpZGUub2Zmc2V0ID4gMCApIHtcblxuXHRcdFx0XHRmb3IgKCBsZXQgaTogbnVtYmVyID0gbnVtYmVyT2ZOb3RpZmljYXRpb25zIC0gMTsgaSA+PSAwOyBpLS0gKSB7XG5cdFx0XHRcdFx0Y29uc3QgYW5pbWF0aW9uT2Zmc2V0OiBudW1iZXIgPSB0aGlzLmNvbmZpZy5wb3NpdGlvbi52ZXJ0aWNhbC5wb3NpdGlvbiA9PT0gJ3RvcCcgPyBudW1iZXJPZk5vdGlmaWNhdGlvbnMgLSAxIDogaTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLm5vdGlmaWNhdGlvbnNbIGkgXS5jb21wb25lbnQuaGlkZSgpLnRoZW4oICgpID0+IHtcblxuXHRcdFx0XHRcdFx0XHQvLyBBcmUgd2UgZG9uZSBoZXJlLCB3YXMgdGhpcyB0aGUgbGFzdCBub3RpZmljYXRpb24gdG8gYmUgaGlkZGVuP1xuXHRcdFx0XHRcdFx0XHRpZiAoICggdGhpcy5jb25maWcucG9zaXRpb24udmVydGljYWwucG9zaXRpb24gPT09ICd0b3AnICYmIGkgPT09IDAgKSB8fFxuXHRcdFx0XHRcdFx0XHRcdCggdGhpcy5jb25maWcucG9zaXRpb24udmVydGljYWwucG9zaXRpb24gPT09ICdib3R0b20nICYmIGkgPT09IG51bWJlck9mTm90aWZpY2F0aW9ucyAtIDEgKSApIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnJlbW92ZUFsbE5vdGlmaWNhdGlvbnNGcm9tTGlzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoKTsgLy8gRG9uZVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9LCB0aGlzLmNvbmZpZy5hbmltYXRpb25zLmhpZGUub2Zmc2V0ICogYW5pbWF0aW9uT2Zmc2V0ICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRsZXQgc3RlcFByb21pc2VzOiBBcnJheTxQcm9taXNlPHVuZGVmaW5lZD4+ID0gW107XG5cdFx0XHRcdGZvciAoIGxldCBpOiBudW1iZXIgPSBudW1iZXJPZk5vdGlmaWNhdGlvbnMgLSAxOyBpID49IDA7IGktLSApIHtcblx0XHRcdFx0XHRzdGVwUHJvbWlzZXMucHVzaCggdGhpcy5ub3RpZmljYXRpb25zWyBpIF0uY29tcG9uZW50LmhpZGUoKSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFByb21pc2UuYWxsKCBzdGVwUHJvbWlzZXMgKS50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5yZW1vdmVBbGxOb3RpZmljYXRpb25zRnJvbUxpc3QoKTtcblx0XHRcdFx0XHRyZXNvbHZlKCk7IC8vIERvbmVcblx0XHRcdFx0fSApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogU2hpZnQgbXVsdGlwbGUgbm90aWZpY2F0aW9ucyBhdCBvbmNlXG5cdCAqXG5cdCAqIEBwYXJhbSAgIG5vdGlmaWNhdGlvbnMgTGlzdCBjb250YWluaW5nIHRoZSBub3RpZmljYXRpb25zIHRvIGJlIHNoaWZ0ZWRcblx0ICogQHBhcmFtICAgZGlzdGFuY2UgICAgICBEaXN0YW5jZSB0byBzaGlmdCAoaW4gcHgpXG5cdCAqIEBwYXJhbSAgIHRvTWFrZVBsYWNlICAgRmxhZywgZGVmaW5pbmcgaW4gd2hpY2ggZGlyZWNpdG9uIHRvIHNoaWZ0XG5cdCAqIEByZXR1cm5zIFByb21pc2UsIHJlc29sdmVkIHdoZW4gZG9uZVxuXHQgKi9cblx0cHJpdmF0ZSBzaGlmdE5vdGlmaWNhdGlvbnMoIG5vdGlmaWNhdGlvbnM6IEFycmF5PE5vdGlmaWVyTm90aWZpY2F0aW9uPiwgZGlzdGFuY2U6IG51bWJlciwgdG9NYWtlUGxhY2U6IGJvb2xlYW4gKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8dW5kZWZpbmVkPiggKCByZXNvbHZlOiAoKSA9PiB2b2lkLCByZWplY3Q6ICgpID0+IHZvaWQgKSA9PiB7XG5cblx0XHRcdC8vIEFyZSB0aGVyZSBhbnkgbm90aWZpY2F0aW9ucyB0byBzaGlmdD9cblx0XHRcdGlmICggbm90aWZpY2F0aW9ucy5sZW5ndGggPT09IDAgKSB7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgbm90aWZpY2F0aW9uUHJvbWlzZXM6IEFycmF5PFByb21pc2U8dW5kZWZpbmVkPj4gPSBbXTtcblx0XHRcdGZvciAoIGxldCBpOiBudW1iZXIgPSBub3RpZmljYXRpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tICkge1xuXHRcdFx0XHRub3RpZmljYXRpb25Qcm9taXNlcy5wdXNoKCBub3RpZmljYXRpb25zWyBpIF0uY29tcG9uZW50LnNoaWZ0KCBkaXN0YW5jZSwgdG9NYWtlUGxhY2UgKSApO1xuXHRcdFx0fVxuXHRcdFx0UHJvbWlzZS5hbGwoIG5vdGlmaWNhdGlvblByb21pc2VzICkudGhlbiggcmVzb2x2ZSApOyAvLyBEb25lXG5cblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkIGEgbmV3IG5vdGlmaWNhdGlvbiB0byB0aGUgbGlzdCBvZiBub3RpZmljYXRpb25zICh0cmlnZ2VycyBjaGFuZ2UgZGV0ZWN0aW9uKVxuXHQgKlxuXHQgKiBAcGFyYW0gbm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbiB0byBhZGQgdG8gdGhlIGxpc3Qgb2Ygbm90aWZpY2F0aW9uc1xuXHQgKi9cblx0cHJpdmF0ZSBhZGROb3RpZmljYXRpb25Ub0xpc3QoIG5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gKTogdm9pZCB7XG5cdFx0dGhpcy5ub3RpZmljYXRpb25zLnB1c2goIG5vdGlmaWNhdGlvbiApO1xuXHRcdHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7IC8vIFJ1biBjaGFuZ2UgZGV0ZWN0aW9uIGJlY2F1c2UgdGhlIG5vdGlmaWNhdGlvbiBsaXN0IGNoYW5nZWRcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYW4gZXhpc3Rpbmcgbm90aWZpY2F0aW9uIGZyb20gdGhlIGxpc3Qgb2Ygbm90aWZpY2F0aW9ucyAodHJpZ2dlcnMgY2hhbmdlIGRldGVjdGlvbilcblx0ICpcblx0ICogQHBhcmFtIG5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb24gdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBsaXN0IG9mIG5vdGlmaWNhdGlvbnNcblx0ICovXG5cdHByaXZhdGUgcmVtb3ZlTm90aWZpY2F0aW9uRnJvbUxpc3QoIG5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gKTogdm9pZCB7XG5cdFx0dGhpcy5ub3RpZmljYXRpb25zID1cblx0XHRcdHRoaXMubm90aWZpY2F0aW9ucy5maWx0ZXIoICggaXRlbTogTm90aWZpZXJOb3RpZmljYXRpb24gKSA9PiBpdGVtLmNvbXBvbmVudCAhPT0gbm90aWZpY2F0aW9uLmNvbXBvbmVudCApO1xuXHRcdHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7IC8vIFJ1biBjaGFuZ2UgZGV0ZWN0aW9uIGJlY2F1c2UgdGhlIG5vdGlmaWNhdGlvbiBsaXN0IGNoYW5nZWRcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYWxsIG5vdGlmaWNhdGlvbnMgZnJvbSB0aGUgbGlzdCAodHJpZ2dlcnMgY2hhbmdlIGRldGVjdGlvbilcblx0ICovXG5cdHByaXZhdGUgcmVtb3ZlQWxsTm90aWZpY2F0aW9uc0Zyb21MaXN0KCk6IHZvaWQge1xuXHRcdHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xuXHRcdHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7IC8vIFJ1biBjaGFuZ2UgZGV0ZWN0aW9uIGJlY2F1c2UgdGhlIG5vdGlmaWNhdGlvbiBsaXN0IGNoYW5nZWRcblx0fVxuXG5cdC8qKlxuXHQgKiBIZWxwZXI6IEZpbmQgYSBub3RpZmljYXRpb24gaW4gdGhlIG5vdGlmaWNhdGlvbiBsaXN0IGJ5IGEgZ2l2ZW4gbm90aWZpY2F0aW9uIElEXG5cdCAqXG5cdCAqIEBwYXJhbSAgIG5vdGlmaWNhdGlvbklkIE5vdGlmaWNhdGlvbiBJRCwgdXNlZCBmb3IgZmluZGluZyBub3RpZmljYXRpb25cblx0ICogQHJldHVybnMgTm90aWZpY2F0aW9uLCB1bmRlZmluZWQgaWYgbm90IGZvdW5kXG5cdCAqL1xuXHRwcml2YXRlIGZpbmROb3RpZmljYXRpb25CeUlkKCBub3RpZmljYXRpb25JZDogc3RyaW5nICk6IE5vdGlmaWVyTm90aWZpY2F0aW9uIHwgdW5kZWZpbmVkIHtcblx0XHRyZXR1cm4gdGhpcy5ub3RpZmljYXRpb25zLmZpbmQoICggY3VycmVudE5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gKSA9PiBjdXJyZW50Tm90aWZpY2F0aW9uLmlkID09PSBub3RpZmljYXRpb25JZCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlcjogRmluZCBhIG5vdGlmaWNhdGlvbidzIGluZGV4IGJ5IGEgZ2l2ZW4gbm90aWZpY2F0aW9uIElEXG5cdCAqXG5cdCAqIEBwYXJhbSAgIG5vdGlmaWNhdGlvbklkIE5vdGlmaWNhdGlvbiBJRCwgdXNlZCBmb3IgZmluZGluZyBhIG5vdGlmaWNhdGlvbidzIGluZGV4XG5cdCAqIEByZXR1cm5zIE5vdGlmaWNhdGlvbiBpbmRleCwgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZFxuXHQgKi9cblx0cHJpdmF0ZSBmaW5kTm90aWZpY2F0aW9uSW5kZXhCeUlkKCBub3RpZmljYXRpb25JZDogc3RyaW5nICk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG5cdFx0Y29uc3Qgbm90aWZpY2F0aW9uSW5kZXg6IG51bWJlciA9XG5cdFx0XHR0aGlzLm5vdGlmaWNhdGlvbnMuZmluZEluZGV4KCAoIGN1cnJlbnROb3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uICkgPT4gY3VycmVudE5vdGlmaWNhdGlvbi5pZCA9PT0gbm90aWZpY2F0aW9uSWQgKTtcblx0XHRyZXR1cm4gKCBub3RpZmljYXRpb25JbmRleCAhPT0gLTEgPyBub3RpZmljYXRpb25JbmRleCA6IHVuZGVmaW5lZCApO1xuXHR9XG5cbn1cbiIsIjx1bD5cblx0PGxpIGNsYXNzPVwibm90aWZpZXJfX2NvbnRhaW5lci1saXN0XCIgKm5nRm9yPVwibGV0IG5vdGlmaWNhdGlvbiBvZiBub3RpZmljYXRpb25zOyB0cmFja0J5OiBpZGVudGlmeU5vdGlmaWNhdGlvbjtcIj5cblx0XHQ8bm90aWZpZXItbm90aWZpY2F0aW9uXG5cdFx0XHRbbm90aWZpY2F0aW9uXT1cIm5vdGlmaWNhdGlvblwiXG5cdFx0XHQocmVhZHkpPVwib25Ob3RpZmljYXRpb25SZWFkeSggJGV2ZW50IClcIlxuXHRcdFx0KGRpc21pc3MpPVwib25Ob3RpZmljYXRpb25EaXNtaXNzKCAkZXZlbnQgKVwiPlxuXHRcdDwvbm90aWZpZXItbm90aWZpY2F0aW9uPlxuXHQ8L2xpPlxuPC91bD5cbiJdfQ==