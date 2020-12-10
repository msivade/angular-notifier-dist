import { Inject, Injectable } from '@angular/core';
import { NotifierConfigToken } from '../notifier.tokens';
import * as i0 from "@angular/core";
import * as i1 from "./notifier-queue.service";
import * as i2 from "../models/notifier-config.model";
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
/** @nocollapse */ NotifierService.ɵfac = function NotifierService_Factory(t) { return new (t || NotifierService)(i0.ɵɵinject(i1.NotifierQueueService), i0.ɵɵinject(NotifierConfigToken)); };
/** @nocollapse */ NotifierService.ɵprov = i0.ɵɵdefineInjectable({ token: NotifierService, factory: NotifierService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NotifierService, [{
        type: Injectable
    }], function () { return [{ type: i1.NotifierQueueService }, { type: i2.NotifierConfig, decorators: [{
                type: Inject,
                args: [NotifierConfigToken]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9tc2l2YWRlL0Rldi9wcm9qZWN0cy9hbmd1bGFyLW5vdGlmaWVyL3Byb2plY3RzL2FuZ3VsYXItbm90aWZpZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25vdGlmaWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFLL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFFekQ7Ozs7OztHQU1HO0FBRUgsTUFBTSxPQUFPLGVBQWU7SUFZM0I7Ozs7O09BS0c7SUFDSCxZQUNDLG9CQUEwQyxFQUNiLE1BQXNCO1FBRW5ELElBQUksQ0FBQyxZQUFZLEdBQUcsb0JBQW9CLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTO1FBQ2YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksSUFBSSxDQUFFLG1CQUFnRDtRQUM1RCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBRTtZQUN2QixPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLElBQUksRUFBRSxNQUFNO1NBQ1osQ0FBRSxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxJQUFJLENBQUUsY0FBc0I7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUU7WUFDdkIsT0FBTyxFQUFFLGNBQWM7WUFDdkIsSUFBSSxFQUFFLE1BQU07U0FDWixDQUFFLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxVQUFVO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFFO1lBQ3ZCLElBQUksRUFBRSxhQUFhO1NBQ25CLENBQUUsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVU7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUU7WUFDdkIsSUFBSSxFQUFFLGFBQWE7U0FDbkIsQ0FBRSxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFFO1lBQ3ZCLElBQUksRUFBRSxVQUFVO1NBQ2hCLENBQUUsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUUsSUFBWSxFQUFFLE9BQWUsRUFBRSxjQUF1QjtRQUNwRSxJQUFJLG1CQUFtQixHQUFnQztZQUN0RCxPQUFPO1lBQ1AsSUFBSTtTQUNKLENBQUM7UUFDRixJQUFLLGNBQWMsS0FBSyxTQUFTLEVBQUc7WUFDbkMsbUJBQW1CLENBQUMsRUFBRSxHQUFHLGNBQWMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxJQUFJLENBQUUsbUJBQW1CLENBQUUsQ0FBQztJQUNsQyxDQUFDOztpR0F0R1csZUFBZSxvREFvQmxCLG1CQUFtQjswRUFwQmhCLGVBQWUsV0FBZixlQUFlO2tEQUFmLGVBQWU7Y0FEM0IsVUFBVTs7c0JBcUJSLE1BQU07dUJBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5vdGlmaWVyQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllck5vdGlmaWNhdGlvbk9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItbm90aWZpY2F0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5vdGlmaWVyUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmllci1xdWV1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWVyQ29uZmlnVG9rZW4gfSBmcm9tICcuLi9ub3RpZmllci50b2tlbnMnO1xuXG4vKipcbiAqIE5vdGlmaWVyIHNlcnZpY2VcbiAqXG4gKiBUaGlzIHNlcnZpY2UgcHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBwdWJsaWMgbm90aWZpZXIgQVBJLiBPbmNlIGluamVjdGVkIGludG8gYSBjb21wb25lbnQsIGRpcmVjdGl2ZSwgcGlwZSwgc2VydmljZSwgb3IgYW55IG90aGVyIGJ1aWxkaW5nXG4gKiBibG9jayBvZiBhbiBhcHBsaWNhdGlvbnMsIGl0IGNhbiBiZSB1c2VkIHRvIHNob3cgbmV3IG5vdGlmaWNhdGlvbnMsIGFuZCBoaWRlIGV4aXN0aW5nIG9uZXMuIEludGVybmFsbHksIGl0IHRyYW5zZm9ybXMgQVBJIGNhbGxzIGludG9cbiAqIGFjdGlvbnMsIHdoaWNoIHRoZW4gZ2V0IHRocm93biBpbnRvIHRoZSBhY3Rpb24gcXVldWUgLSBldmVudHVhbGx5IGJlaW5nIHByb2Nlc3NlZCBhdCB0aGUgcmlnaHQgbW9tZW50LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpZXJTZXJ2aWNlIHtcblxuXHQvKipcblx0ICogTm90aWZpZXIgcXVldWUgc2VydmljZVxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBxdWV1ZVNlcnZpY2U6IE5vdGlmaWVyUXVldWVTZXJ2aWNlO1xuXG5cdC8qKlxuXHQgKiBOb3RpZmllciBjb25maWd1cmF0aW9uXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogTm90aWZpZXJDb25maWc7XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSBub3RpZmllclF1ZXVlU2VydmljZSBOb3RpZmllciBxdWV1ZSBzZXJ2aWNlXG5cdCAqIEBwYXJhbSBjb25maWcgICAgICAgICAgICAgICBOb3RpZmllciBjb25maWd1cmF0aW9uLCBvcHRpb25hbGx5IGluamVjdGVkIGFzIGEgZGVwZW5kZW5jeVxuXHQgKi9cblx0cHVibGljIGNvbnN0cnVjdG9yKFxuXHRcdG5vdGlmaWVyUXVldWVTZXJ2aWNlOiBOb3RpZmllclF1ZXVlU2VydmljZSxcblx0XHRASW5qZWN0KE5vdGlmaWVyQ29uZmlnVG9rZW4pIGNvbmZpZzogTm90aWZpZXJDb25maWdcblx0KSB7XG5cdFx0dGhpcy5xdWV1ZVNlcnZpY2UgPSBub3RpZmllclF1ZXVlU2VydmljZTtcblx0XHR0aGlzLmNvbmZpZyA9IGNvbmZpZztcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIG5vdGlmaWVyIGNvbmZpZ3VyYXRpb25cblx0ICpcblx0ICogQHJldHVybnMgTm90aWZpZXIgY29uZmlndXJhdGlvblxuXHQgKi9cblx0cHVibGljIGdldENvbmZpZygpOiBOb3RpZmllckNvbmZpZyB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFQSTogU2hvdyBhIG5ldyBub3RpZmljYXRpb25cblx0ICpcblx0ICogQHBhcmFtIG5vdGlmaWNhdGlvbk9wdGlvbnMgTm90aWZpY2F0aW9uIG9wdGlvbnNcblx0ICovXG5cdHB1YmxpYyBzaG93KCBub3RpZmljYXRpb25PcHRpb25zOiBOb3RpZmllck5vdGlmaWNhdGlvbk9wdGlvbnMgKTogdm9pZCB7XG5cdFx0dGhpcy5xdWV1ZVNlcnZpY2UucHVzaCgge1xuXHRcdFx0cGF5bG9hZDogbm90aWZpY2F0aW9uT3B0aW9ucyxcblx0XHRcdHR5cGU6ICdTSE9XJ1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBUEk6IEhpZGUgYSBzcGVjaWZpYyBub3RpZmljYXRpb24sIGdpdmVuIGl0cyBJRFxuXHQgKlxuXHQgKiBAcGFyYW0gbm90aWZpY2F0aW9uSWQgSUQgb2YgdGhlIG5vdGlmaWNhdGlvbiB0byBoaWRlXG5cdCAqL1xuXHRwdWJsaWMgaGlkZSggbm90aWZpY2F0aW9uSWQ6IHN0cmluZyApOiB2b2lkIHtcblx0XHR0aGlzLnF1ZXVlU2VydmljZS5wdXNoKCB7XG5cdFx0XHRwYXlsb2FkOiBub3RpZmljYXRpb25JZCxcblx0XHRcdHR5cGU6ICdISURFJ1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBUEk6IEhpZGUgdGhlIG5ld2VzdCBub3RpZmljYXRpb25cblx0ICovXG5cdHB1YmxpYyBoaWRlTmV3ZXN0KCk6IHZvaWQge1xuXHRcdHRoaXMucXVldWVTZXJ2aWNlLnB1c2goIHtcblx0XHRcdHR5cGU6ICdISURFX05FV0VTVCdcblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogQVBJOiBIaWRlIHRoZSBvbGRlc3Qgbm90aWZpY2F0aW9uXG5cdCAqL1xuXHRwdWJsaWMgaGlkZU9sZGVzdCgpOiB2b2lkIHtcblx0XHR0aGlzLnF1ZXVlU2VydmljZS5wdXNoKCB7XG5cdFx0XHR0eXBlOiAnSElERV9PTERFU1QnXG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFQSTogSGlkZSBhbGwgbm90aWZpY2F0aW9ucyBhdCBvbmNlXG5cdCAqL1xuXHRwdWJsaWMgaGlkZUFsbCgpOiB2b2lkIHtcblx0XHR0aGlzLnF1ZXVlU2VydmljZS5wdXNoKCB7XG5cdFx0XHR0eXBlOiAnSElERV9BTEwnXG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFQSTogU2hvcnRjdXQgZm9yIHNob3dpbmcgYSBuZXcgbm90aWZpY2F0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSB0eXBlICAgICAgICAgICAgIFR5cGUgb2YgdGhlIG5vdGlmaWNhdGlvblxuXHQgKiBAcGFyYW0gbWVzc2FnZSAgICAgICAgICBNZXNzYWdlIG9mIHRoZSBub3RpZmljYXRpb25cblx0ICogQHBhcmFtIFtub3RpZmljYXRpb25JZF0gVW5pcXVlIElEIGZvciB0aGUgbm90aWZpY2F0aW9uIChvcHRpb25hbClcblx0ICovXG5cdHB1YmxpYyBub3RpZnkoIHR5cGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBub3RpZmljYXRpb25JZD86IHN0cmluZyApOiB2b2lkIHtcblx0XHRsZXQgbm90aWZpY2F0aW9uT3B0aW9uczogTm90aWZpZXJOb3RpZmljYXRpb25PcHRpb25zID0ge1xuXHRcdFx0bWVzc2FnZSxcblx0XHRcdHR5cGVcblx0XHR9O1xuXHRcdGlmICggbm90aWZpY2F0aW9uSWQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdG5vdGlmaWNhdGlvbk9wdGlvbnMuaWQgPSBub3RpZmljYXRpb25JZDtcblx0XHR9XG5cdFx0dGhpcy5zaG93KCBub3RpZmljYXRpb25PcHRpb25zICk7XG5cdH1cblxufVxuIl19