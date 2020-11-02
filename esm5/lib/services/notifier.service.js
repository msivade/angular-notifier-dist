/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/notifier.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { NotifierConfig } from '../models/notifier-config.model';
import { NotifierQueueService } from './notifier-queue.service';
import { NotifierConfigToken } from '../notifier.tokens';
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
    /**
     * Get the notifier configuration
     *
     * @return {?} Notifier configuration
     */
    NotifierService.prototype.getConfig = /**
     * Get the notifier configuration
     *
     * @return {?} Notifier configuration
     */
    function () {
        return this.config;
    };
    /**
     * API: Show a new notification
     *
     * @param notificationOptions Notification options
     */
    /**
     * API: Show a new notification
     *
     * @param {?} notificationOptions Notification options
     * @return {?}
     */
    NotifierService.prototype.show = /**
     * API: Show a new notification
     *
     * @param {?} notificationOptions Notification options
     * @return {?}
     */
    function (notificationOptions) {
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
    /**
     * API: Hide a specific notification, given its ID
     *
     * @param {?} notificationId ID of the notification to hide
     * @return {?}
     */
    NotifierService.prototype.hide = /**
     * API: Hide a specific notification, given its ID
     *
     * @param {?} notificationId ID of the notification to hide
     * @return {?}
     */
    function (notificationId) {
        this.queueService.push({
            payload: notificationId,
            type: 'HIDE'
        });
    };
    /**
     * API: Hide the newest notification
     */
    /**
     * API: Hide the newest notification
     * @return {?}
     */
    NotifierService.prototype.hideNewest = /**
     * API: Hide the newest notification
     * @return {?}
     */
    function () {
        this.queueService.push({
            type: 'HIDE_NEWEST'
        });
    };
    /**
     * API: Hide the oldest notification
     */
    /**
     * API: Hide the oldest notification
     * @return {?}
     */
    NotifierService.prototype.hideOldest = /**
     * API: Hide the oldest notification
     * @return {?}
     */
    function () {
        this.queueService.push({
            type: 'HIDE_OLDEST'
        });
    };
    /**
     * API: Hide all notifications at once
     */
    /**
     * API: Hide all notifications at once
     * @return {?}
     */
    NotifierService.prototype.hideAll = /**
     * API: Hide all notifications at once
     * @return {?}
     */
    function () {
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
    /**
     * API: Shortcut for showing a new notification
     *
     * @param {?} type             Type of the notification
     * @param {?} message          Message of the notification
     * @param {?=} notificationId
     * @return {?}
     */
    NotifierService.prototype.notify = /**
     * API: Shortcut for showing a new notification
     *
     * @param {?} type             Type of the notification
     * @param {?} message          Message of the notification
     * @param {?=} notificationId
     * @return {?}
     */
    function (type, message, notificationId) {
        /** @type {?} */
        var notificationOptions = {
            message: message,
            type: type
        };
        if (notificationId !== undefined) {
            notificationOptions.id = notificationId;
        }
        this.show(notificationOptions);
    };
    NotifierService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NotifierService.ctorParameters = function () { return [
        { type: NotifierQueueService },
        { type: NotifierConfig, decorators: [{ type: Inject, args: [NotifierConfigToken,] }] }
    ]; };
    return NotifierService;
}());
export { NotifierService };
if (false) {
    /**
     * Notifier queue service
     * @type {?}
     * @private
     */
    NotifierService.prototype.queueService;
    /**
     * Notifier configuration
     * @type {?}
     * @private
     */
    NotifierService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbm90aWZpZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFjLE1BQU0sZUFBZSxDQUFDO0FBRS9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7QUFTekQ7SUFhQzs7Ozs7T0FLRztJQUNILHlCQUNDLG9CQUEwQyxFQUNiLE1BQXNCO1FBRW5ELElBQUksQ0FBQyxZQUFZLEdBQUcsb0JBQW9CLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7O09BSUc7Ozs7OztJQUNJLG1DQUFTOzs7OztJQUFoQjtRQUNDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNJLDhCQUFJOzs7Ozs7SUFBWCxVQUFhLG1CQUFnRDtRQUM1RCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBRTtZQUN2QixPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLElBQUksRUFBRSxNQUFNO1NBQ1osQ0FBRSxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSSw4QkFBSTs7Ozs7O0lBQVgsVUFBYSxjQUFzQjtRQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBRTtZQUN2QixPQUFPLEVBQUUsY0FBYztZQUN2QixJQUFJLEVBQUUsTUFBTTtTQUNaLENBQUUsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSSxvQ0FBVTs7OztJQUFqQjtRQUNDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFFO1lBQ3ZCLElBQUksRUFBRSxhQUFhO1NBQ25CLENBQUUsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSSxvQ0FBVTs7OztJQUFqQjtRQUNDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFFO1lBQ3ZCLElBQUksRUFBRSxhQUFhO1NBQ25CLENBQUUsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSSxpQ0FBTzs7OztJQUFkO1FBQ0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUU7WUFDdkIsSUFBSSxFQUFFLFVBQVU7U0FDaEIsQ0FBRSxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRzs7Ozs7Ozs7O0lBQ0ksZ0NBQU07Ozs7Ozs7O0lBQWIsVUFBZSxJQUFZLEVBQUUsT0FBZSxFQUFFLGNBQXVCOztZQUNoRSxtQkFBbUIsR0FBZ0M7WUFDdEQsT0FBTyxTQUFBO1lBQ1AsSUFBSSxNQUFBO1NBQ0o7UUFDRCxJQUFLLGNBQWMsS0FBSyxTQUFTLEVBQUc7WUFDbkMsbUJBQW1CLENBQUMsRUFBRSxHQUFHLGNBQWMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxJQUFJLENBQUUsbUJBQW1CLENBQUUsQ0FBQztJQUNsQyxDQUFDOztnQkF2R0QsVUFBVTs7OztnQkFWRixvQkFBb0I7Z0JBRnBCLGNBQWMsdUJBaUNwQixNQUFNLFNBQUMsbUJBQW1COztJQW9GN0Isc0JBQUM7Q0FBQSxBQXpHRCxJQXlHQztTQXhHWSxlQUFlOzs7Ozs7O0lBSzNCLHVDQUFvRDs7Ozs7O0lBS3BELGlDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOb3RpZmllckNvbmZpZyB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1jb25maWcubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpZXJOb3RpZmljYXRpb25PcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLW5vdGlmaWNhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllclF1ZXVlU2VydmljZSB9IGZyb20gJy4vbm90aWZpZXItcXVldWUuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmllckNvbmZpZ1Rva2VuIH0gZnJvbSAnLi4vbm90aWZpZXIudG9rZW5zJztcblxuLyoqXG4gKiBOb3RpZmllciBzZXJ2aWNlXG4gKlxuICogVGhpcyBzZXJ2aWNlIHByb3ZpZGVzIGFjY2VzcyB0byB0aGUgcHVibGljIG5vdGlmaWVyIEFQSS4gT25jZSBpbmplY3RlZCBpbnRvIGEgY29tcG9uZW50LCBkaXJlY3RpdmUsIHBpcGUsIHNlcnZpY2UsIG9yIGFueSBvdGhlciBidWlsZGluZ1xuICogYmxvY2sgb2YgYW4gYXBwbGljYXRpb25zLCBpdCBjYW4gYmUgdXNlZCB0byBzaG93IG5ldyBub3RpZmljYXRpb25zLCBhbmQgaGlkZSBleGlzdGluZyBvbmVzLiBJbnRlcm5hbGx5LCBpdCB0cmFuc2Zvcm1zIEFQSSBjYWxscyBpbnRvXG4gKiBhY3Rpb25zLCB3aGljaCB0aGVuIGdldCB0aHJvd24gaW50byB0aGUgYWN0aW9uIHF1ZXVlIC0gZXZlbnR1YWxseSBiZWluZyBwcm9jZXNzZWQgYXQgdGhlIHJpZ2h0IG1vbWVudC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWVyU2VydmljZSB7XG5cblx0LyoqXG5cdCAqIE5vdGlmaWVyIHF1ZXVlIHNlcnZpY2Vcblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgcXVldWVTZXJ2aWNlOiBOb3RpZmllclF1ZXVlU2VydmljZTtcblxuXHQvKipcblx0ICogTm90aWZpZXIgY29uZmlndXJhdGlvblxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBjb25maWc6IE5vdGlmaWVyQ29uZmlnO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAcGFyYW0gbm90aWZpZXJRdWV1ZVNlcnZpY2UgTm90aWZpZXIgcXVldWUgc2VydmljZVxuXHQgKiBAcGFyYW0gY29uZmlnICAgICAgICAgICAgICAgTm90aWZpZXIgY29uZmlndXJhdGlvbiwgb3B0aW9uYWxseSBpbmplY3RlZCBhcyBhIGRlcGVuZGVuY3lcblx0ICovXG5cdHB1YmxpYyBjb25zdHJ1Y3Rvcihcblx0XHRub3RpZmllclF1ZXVlU2VydmljZTogTm90aWZpZXJRdWV1ZVNlcnZpY2UsXG5cdFx0QEluamVjdChOb3RpZmllckNvbmZpZ1Rva2VuKSBjb25maWc6IE5vdGlmaWVyQ29uZmlnXG5cdCkge1xuXHRcdHRoaXMucXVldWVTZXJ2aWNlID0gbm90aWZpZXJRdWV1ZVNlcnZpY2U7XG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBub3RpZmllciBjb25maWd1cmF0aW9uXG5cdCAqXG5cdCAqIEByZXR1cm5zIE5vdGlmaWVyIGNvbmZpZ3VyYXRpb25cblx0ICovXG5cdHB1YmxpYyBnZXRDb25maWcoKTogTm90aWZpZXJDb25maWcge1xuXHRcdHJldHVybiB0aGlzLmNvbmZpZztcblx0fVxuXG5cdC8qKlxuXHQgKiBBUEk6IFNob3cgYSBuZXcgbm90aWZpY2F0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSBub3RpZmljYXRpb25PcHRpb25zIE5vdGlmaWNhdGlvbiBvcHRpb25zXG5cdCAqL1xuXHRwdWJsaWMgc2hvdyggbm90aWZpY2F0aW9uT3B0aW9uczogTm90aWZpZXJOb3RpZmljYXRpb25PcHRpb25zICk6IHZvaWQge1xuXHRcdHRoaXMucXVldWVTZXJ2aWNlLnB1c2goIHtcblx0XHRcdHBheWxvYWQ6IG5vdGlmaWNhdGlvbk9wdGlvbnMsXG5cdFx0XHR0eXBlOiAnU0hPVydcblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogQVBJOiBIaWRlIGEgc3BlY2lmaWMgbm90aWZpY2F0aW9uLCBnaXZlbiBpdHMgSURcblx0ICpcblx0ICogQHBhcmFtIG5vdGlmaWNhdGlvbklkIElEIG9mIHRoZSBub3RpZmljYXRpb24gdG8gaGlkZVxuXHQgKi9cblx0cHVibGljIGhpZGUoIG5vdGlmaWNhdGlvbklkOiBzdHJpbmcgKTogdm9pZCB7XG5cdFx0dGhpcy5xdWV1ZVNlcnZpY2UucHVzaCgge1xuXHRcdFx0cGF5bG9hZDogbm90aWZpY2F0aW9uSWQsXG5cdFx0XHR0eXBlOiAnSElERSdcblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogQVBJOiBIaWRlIHRoZSBuZXdlc3Qgbm90aWZpY2F0aW9uXG5cdCAqL1xuXHRwdWJsaWMgaGlkZU5ld2VzdCgpOiB2b2lkIHtcblx0XHR0aGlzLnF1ZXVlU2VydmljZS5wdXNoKCB7XG5cdFx0XHR0eXBlOiAnSElERV9ORVdFU1QnXG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFQSTogSGlkZSB0aGUgb2xkZXN0IG5vdGlmaWNhdGlvblxuXHQgKi9cblx0cHVibGljIGhpZGVPbGRlc3QoKTogdm9pZCB7XG5cdFx0dGhpcy5xdWV1ZVNlcnZpY2UucHVzaCgge1xuXHRcdFx0dHlwZTogJ0hJREVfT0xERVNUJ1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBUEk6IEhpZGUgYWxsIG5vdGlmaWNhdGlvbnMgYXQgb25jZVxuXHQgKi9cblx0cHVibGljIGhpZGVBbGwoKTogdm9pZCB7XG5cdFx0dGhpcy5xdWV1ZVNlcnZpY2UucHVzaCgge1xuXHRcdFx0dHlwZTogJ0hJREVfQUxMJ1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBUEk6IFNob3J0Y3V0IGZvciBzaG93aW5nIGEgbmV3IG5vdGlmaWNhdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0gdHlwZSAgICAgICAgICAgICBUeXBlIG9mIHRoZSBub3RpZmljYXRpb25cblx0ICogQHBhcmFtIG1lc3NhZ2UgICAgICAgICAgTWVzc2FnZSBvZiB0aGUgbm90aWZpY2F0aW9uXG5cdCAqIEBwYXJhbSBbbm90aWZpY2F0aW9uSWRdIFVuaXF1ZSBJRCBmb3IgdGhlIG5vdGlmaWNhdGlvbiAob3B0aW9uYWwpXG5cdCAqL1xuXHRwdWJsaWMgbm90aWZ5KCB0eXBlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgbm90aWZpY2F0aW9uSWQ/OiBzdHJpbmcgKTogdm9pZCB7XG5cdFx0bGV0IG5vdGlmaWNhdGlvbk9wdGlvbnM6IE5vdGlmaWVyTm90aWZpY2F0aW9uT3B0aW9ucyA9IHtcblx0XHRcdG1lc3NhZ2UsXG5cdFx0XHR0eXBlXG5cdFx0fTtcblx0XHRpZiAoIG5vdGlmaWNhdGlvbklkICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRub3RpZmljYXRpb25PcHRpb25zLmlkID0gbm90aWZpY2F0aW9uSWQ7XG5cdFx0fVxuXHRcdHRoaXMuc2hvdyggbm90aWZpY2F0aW9uT3B0aW9ucyApO1xuXHR9XG5cbn1cbiJdfQ==