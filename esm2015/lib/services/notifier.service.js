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
export class NotifierService {
    /**
     * Constructor
     *
     * @param {?} notifierQueueService Notifier queue service
     * @param {?} config               Notifier configuration, optionally injected as a dependency
     */
    constructor(notifierQueueService, config) {
        this.queueService = notifierQueueService;
        this.config = config;
    }
    /**
     * Get the notifier configuration
     *
     * @return {?} Notifier configuration
     */
    getConfig() {
        return this.config;
    }
    /**
     * API: Show a new notification
     *
     * @param {?} notificationOptions Notification options
     * @return {?}
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
     * @param {?} notificationId ID of the notification to hide
     * @return {?}
     */
    hide(notificationId) {
        this.queueService.push({
            payload: notificationId,
            type: 'HIDE'
        });
    }
    /**
     * API: Hide the newest notification
     * @return {?}
     */
    hideNewest() {
        this.queueService.push({
            type: 'HIDE_NEWEST'
        });
    }
    /**
     * API: Hide the oldest notification
     * @return {?}
     */
    hideOldest() {
        this.queueService.push({
            type: 'HIDE_OLDEST'
        });
    }
    /**
     * API: Hide all notifications at once
     * @return {?}
     */
    hideAll() {
        this.queueService.push({
            type: 'HIDE_ALL'
        });
    }
    /**
     * API: Shortcut for showing a new notification
     *
     * @param {?} type             Type of the notification
     * @param {?} message          Message of the notification
     * @param {?=} notificationId
     * @return {?}
     */
    notify(type, message, notificationId) {
        /** @type {?} */
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
NotifierService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NotifierService.ctorParameters = () => [
    { type: NotifierQueueService },
    { type: NotifierConfig, decorators: [{ type: Inject, args: [NotifierConfigToken,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbm90aWZpZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFjLE1BQU0sZUFBZSxDQUFDO0FBRS9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7QUFVekQsTUFBTSxPQUFPLGVBQWU7Ozs7Ozs7SUFrQjNCLFlBQ0Msb0JBQTBDLEVBQ2IsTUFBc0I7UUFFbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxvQkFBb0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN0QixDQUFDOzs7Ozs7SUFPTSxTQUFTO1FBQ2YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3BCLENBQUM7Ozs7Ozs7SUFPTSxJQUFJLENBQUUsbUJBQWdEO1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFFO1lBQ3ZCLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsSUFBSSxFQUFFLE1BQU07U0FDWixDQUFFLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBT00sSUFBSSxDQUFFLGNBQXNCO1FBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFFO1lBQ3ZCLE9BQU8sRUFBRSxjQUFjO1lBQ3ZCLElBQUksRUFBRSxNQUFNO1NBQ1osQ0FBRSxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFLTSxVQUFVO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFFO1lBQ3ZCLElBQUksRUFBRSxhQUFhO1NBQ25CLENBQUUsQ0FBQztJQUNMLENBQUM7Ozs7O0lBS00sVUFBVTtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBRTtZQUN2QixJQUFJLEVBQUUsYUFBYTtTQUNuQixDQUFFLENBQUM7SUFDTCxDQUFDOzs7OztJQUtNLE9BQU87UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBRTtZQUN2QixJQUFJLEVBQUUsVUFBVTtTQUNoQixDQUFFLENBQUM7SUFDTCxDQUFDOzs7Ozs7Ozs7SUFTTSxNQUFNLENBQUUsSUFBWSxFQUFFLE9BQWUsRUFBRSxjQUF1Qjs7WUFDaEUsbUJBQW1CLEdBQWdDO1lBQ3RELE9BQU87WUFDUCxJQUFJO1NBQ0o7UUFDRCxJQUFLLGNBQWMsS0FBSyxTQUFTLEVBQUc7WUFDbkMsbUJBQW1CLENBQUMsRUFBRSxHQUFHLGNBQWMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxJQUFJLENBQUUsbUJBQW1CLENBQUUsQ0FBQztJQUNsQyxDQUFDOzs7WUF2R0QsVUFBVTs7OztZQVZGLG9CQUFvQjtZQUZwQixjQUFjLHVCQWlDcEIsTUFBTSxTQUFDLG1CQUFtQjs7Ozs7Ozs7SUFmNUIsdUNBQW9EOzs7Ozs7SUFLcEQsaUNBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5vdGlmaWVyQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllck5vdGlmaWNhdGlvbk9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItbm90aWZpY2F0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5vdGlmaWVyUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmllci1xdWV1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWVyQ29uZmlnVG9rZW4gfSBmcm9tICcuLi9ub3RpZmllci50b2tlbnMnO1xuXG4vKipcbiAqIE5vdGlmaWVyIHNlcnZpY2VcbiAqXG4gKiBUaGlzIHNlcnZpY2UgcHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBwdWJsaWMgbm90aWZpZXIgQVBJLiBPbmNlIGluamVjdGVkIGludG8gYSBjb21wb25lbnQsIGRpcmVjdGl2ZSwgcGlwZSwgc2VydmljZSwgb3IgYW55IG90aGVyIGJ1aWxkaW5nXG4gKiBibG9jayBvZiBhbiBhcHBsaWNhdGlvbnMsIGl0IGNhbiBiZSB1c2VkIHRvIHNob3cgbmV3IG5vdGlmaWNhdGlvbnMsIGFuZCBoaWRlIGV4aXN0aW5nIG9uZXMuIEludGVybmFsbHksIGl0IHRyYW5zZm9ybXMgQVBJIGNhbGxzIGludG9cbiAqIGFjdGlvbnMsIHdoaWNoIHRoZW4gZ2V0IHRocm93biBpbnRvIHRoZSBhY3Rpb24gcXVldWUgLSBldmVudHVhbGx5IGJlaW5nIHByb2Nlc3NlZCBhdCB0aGUgcmlnaHQgbW9tZW50LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpZXJTZXJ2aWNlIHtcblxuXHQvKipcblx0ICogTm90aWZpZXIgcXVldWUgc2VydmljZVxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBxdWV1ZVNlcnZpY2U6IE5vdGlmaWVyUXVldWVTZXJ2aWNlO1xuXG5cdC8qKlxuXHQgKiBOb3RpZmllciBjb25maWd1cmF0aW9uXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogTm90aWZpZXJDb25maWc7XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSBub3RpZmllclF1ZXVlU2VydmljZSBOb3RpZmllciBxdWV1ZSBzZXJ2aWNlXG5cdCAqIEBwYXJhbSBjb25maWcgICAgICAgICAgICAgICBOb3RpZmllciBjb25maWd1cmF0aW9uLCBvcHRpb25hbGx5IGluamVjdGVkIGFzIGEgZGVwZW5kZW5jeVxuXHQgKi9cblx0cHVibGljIGNvbnN0cnVjdG9yKFxuXHRcdG5vdGlmaWVyUXVldWVTZXJ2aWNlOiBOb3RpZmllclF1ZXVlU2VydmljZSxcblx0XHRASW5qZWN0KE5vdGlmaWVyQ29uZmlnVG9rZW4pIGNvbmZpZzogTm90aWZpZXJDb25maWdcblx0KSB7XG5cdFx0dGhpcy5xdWV1ZVNlcnZpY2UgPSBub3RpZmllclF1ZXVlU2VydmljZTtcblx0XHR0aGlzLmNvbmZpZyA9IGNvbmZpZztcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIG5vdGlmaWVyIGNvbmZpZ3VyYXRpb25cblx0ICpcblx0ICogQHJldHVybnMgTm90aWZpZXIgY29uZmlndXJhdGlvblxuXHQgKi9cblx0cHVibGljIGdldENvbmZpZygpOiBOb3RpZmllckNvbmZpZyB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFQSTogU2hvdyBhIG5ldyBub3RpZmljYXRpb25cblx0ICpcblx0ICogQHBhcmFtIG5vdGlmaWNhdGlvbk9wdGlvbnMgTm90aWZpY2F0aW9uIG9wdGlvbnNcblx0ICovXG5cdHB1YmxpYyBzaG93KCBub3RpZmljYXRpb25PcHRpb25zOiBOb3RpZmllck5vdGlmaWNhdGlvbk9wdGlvbnMgKTogdm9pZCB7XG5cdFx0dGhpcy5xdWV1ZVNlcnZpY2UucHVzaCgge1xuXHRcdFx0cGF5bG9hZDogbm90aWZpY2F0aW9uT3B0aW9ucyxcblx0XHRcdHR5cGU6ICdTSE9XJ1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBUEk6IEhpZGUgYSBzcGVjaWZpYyBub3RpZmljYXRpb24sIGdpdmVuIGl0cyBJRFxuXHQgKlxuXHQgKiBAcGFyYW0gbm90aWZpY2F0aW9uSWQgSUQgb2YgdGhlIG5vdGlmaWNhdGlvbiB0byBoaWRlXG5cdCAqL1xuXHRwdWJsaWMgaGlkZSggbm90aWZpY2F0aW9uSWQ6IHN0cmluZyApOiB2b2lkIHtcblx0XHR0aGlzLnF1ZXVlU2VydmljZS5wdXNoKCB7XG5cdFx0XHRwYXlsb2FkOiBub3RpZmljYXRpb25JZCxcblx0XHRcdHR5cGU6ICdISURFJ1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBUEk6IEhpZGUgdGhlIG5ld2VzdCBub3RpZmljYXRpb25cblx0ICovXG5cdHB1YmxpYyBoaWRlTmV3ZXN0KCk6IHZvaWQge1xuXHRcdHRoaXMucXVldWVTZXJ2aWNlLnB1c2goIHtcblx0XHRcdHR5cGU6ICdISURFX05FV0VTVCdcblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogQVBJOiBIaWRlIHRoZSBvbGRlc3Qgbm90aWZpY2F0aW9uXG5cdCAqL1xuXHRwdWJsaWMgaGlkZU9sZGVzdCgpOiB2b2lkIHtcblx0XHR0aGlzLnF1ZXVlU2VydmljZS5wdXNoKCB7XG5cdFx0XHR0eXBlOiAnSElERV9PTERFU1QnXG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFQSTogSGlkZSBhbGwgbm90aWZpY2F0aW9ucyBhdCBvbmNlXG5cdCAqL1xuXHRwdWJsaWMgaGlkZUFsbCgpOiB2b2lkIHtcblx0XHR0aGlzLnF1ZXVlU2VydmljZS5wdXNoKCB7XG5cdFx0XHR0eXBlOiAnSElERV9BTEwnXG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFQSTogU2hvcnRjdXQgZm9yIHNob3dpbmcgYSBuZXcgbm90aWZpY2F0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSB0eXBlICAgICAgICAgICAgIFR5cGUgb2YgdGhlIG5vdGlmaWNhdGlvblxuXHQgKiBAcGFyYW0gbWVzc2FnZSAgICAgICAgICBNZXNzYWdlIG9mIHRoZSBub3RpZmljYXRpb25cblx0ICogQHBhcmFtIFtub3RpZmljYXRpb25JZF0gVW5pcXVlIElEIGZvciB0aGUgbm90aWZpY2F0aW9uIChvcHRpb25hbClcblx0ICovXG5cdHB1YmxpYyBub3RpZnkoIHR5cGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBub3RpZmljYXRpb25JZD86IHN0cmluZyApOiB2b2lkIHtcblx0XHRsZXQgbm90aWZpY2F0aW9uT3B0aW9uczogTm90aWZpZXJOb3RpZmljYXRpb25PcHRpb25zID0ge1xuXHRcdFx0bWVzc2FnZSxcblx0XHRcdHR5cGVcblx0XHR9O1xuXHRcdGlmICggbm90aWZpY2F0aW9uSWQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdG5vdGlmaWNhdGlvbk9wdGlvbnMuaWQgPSBub3RpZmljYXRpb25JZDtcblx0XHR9XG5cdFx0dGhpcy5zaG93KCBub3RpZmljYXRpb25PcHRpb25zICk7XG5cdH1cblxufVxuIl19