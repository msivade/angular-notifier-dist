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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbm90aWZpZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUsvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUV6RDs7Ozs7O0dBTUc7QUFFSCxNQUFNLE9BQU8sZUFBZTtJQVkzQjs7Ozs7T0FLRztJQUNILFlBQ0Msb0JBQTBDLEVBQ2IsTUFBc0I7UUFFbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxvQkFBb0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFNBQVM7UUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxJQUFJLENBQUUsbUJBQWdEO1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFFO1lBQ3ZCLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsSUFBSSxFQUFFLE1BQU07U0FDWixDQUFFLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLElBQUksQ0FBRSxjQUFzQjtRQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBRTtZQUN2QixPQUFPLEVBQUUsY0FBYztZQUN2QixJQUFJLEVBQUUsTUFBTTtTQUNaLENBQUUsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVU7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUU7WUFDdkIsSUFBSSxFQUFFLGFBQWE7U0FDbkIsQ0FBRSxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksVUFBVTtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBRTtZQUN2QixJQUFJLEVBQUUsYUFBYTtTQUNuQixDQUFFLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUU7WUFDdkIsSUFBSSxFQUFFLFVBQVU7U0FDaEIsQ0FBRSxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBRSxJQUFZLEVBQUUsT0FBZSxFQUFFLGNBQXVCO1FBQ3BFLElBQUksbUJBQW1CLEdBQWdDO1lBQ3RELE9BQU87WUFDUCxJQUFJO1NBQ0osQ0FBQztRQUNGLElBQUssY0FBYyxLQUFLLFNBQVMsRUFBRztZQUNuQyxtQkFBbUIsQ0FBQyxFQUFFLEdBQUcsY0FBYyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBRSxtQkFBbUIsQ0FBRSxDQUFDO0lBQ2xDLENBQUM7O2lHQXRHVyxlQUFlLG9EQW9CbEIsbUJBQW1COzBFQXBCaEIsZUFBZSxXQUFmLGVBQWU7a0RBQWYsZUFBZTtjQUQzQixVQUFVOztzQkFxQlIsTUFBTTt1QkFBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTm90aWZpZXJDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItY29uZmlnLm1vZGVsJztcbmltcG9ydCB7IE5vdGlmaWVyTm90aWZpY2F0aW9uT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1ub3RpZmljYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpZXJRdWV1ZVNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWVyLXF1ZXVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpZXJDb25maWdUb2tlbiB9IGZyb20gJy4uL25vdGlmaWVyLnRva2Vucyc7XG5cbi8qKlxuICogTm90aWZpZXIgc2VydmljZVxuICpcbiAqIFRoaXMgc2VydmljZSBwcm92aWRlcyBhY2Nlc3MgdG8gdGhlIHB1YmxpYyBub3RpZmllciBBUEkuIE9uY2UgaW5qZWN0ZWQgaW50byBhIGNvbXBvbmVudCwgZGlyZWN0aXZlLCBwaXBlLCBzZXJ2aWNlLCBvciBhbnkgb3RoZXIgYnVpbGRpbmdcbiAqIGJsb2NrIG9mIGFuIGFwcGxpY2F0aW9ucywgaXQgY2FuIGJlIHVzZWQgdG8gc2hvdyBuZXcgbm90aWZpY2F0aW9ucywgYW5kIGhpZGUgZXhpc3Rpbmcgb25lcy4gSW50ZXJuYWxseSwgaXQgdHJhbnNmb3JtcyBBUEkgY2FsbHMgaW50b1xuICogYWN0aW9ucywgd2hpY2ggdGhlbiBnZXQgdGhyb3duIGludG8gdGhlIGFjdGlvbiBxdWV1ZSAtIGV2ZW50dWFsbHkgYmVpbmcgcHJvY2Vzc2VkIGF0IHRoZSByaWdodCBtb21lbnQuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmllclNlcnZpY2Uge1xuXG5cdC8qKlxuXHQgKiBOb3RpZmllciBxdWV1ZSBzZXJ2aWNlXG5cdCAqL1xuXHRwcml2YXRlIHJlYWRvbmx5IHF1ZXVlU2VydmljZTogTm90aWZpZXJRdWV1ZVNlcnZpY2U7XG5cblx0LyoqXG5cdCAqIE5vdGlmaWVyIGNvbmZpZ3VyYXRpb25cblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgY29uZmlnOiBOb3RpZmllckNvbmZpZztcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIG5vdGlmaWVyUXVldWVTZXJ2aWNlIE5vdGlmaWVyIHF1ZXVlIHNlcnZpY2Vcblx0ICogQHBhcmFtIGNvbmZpZyAgICAgICAgICAgICAgIE5vdGlmaWVyIGNvbmZpZ3VyYXRpb24sIG9wdGlvbmFsbHkgaW5qZWN0ZWQgYXMgYSBkZXBlbmRlbmN5XG5cdCAqL1xuXHRwdWJsaWMgY29uc3RydWN0b3IoXG5cdFx0bm90aWZpZXJRdWV1ZVNlcnZpY2U6IE5vdGlmaWVyUXVldWVTZXJ2aWNlLFxuXHRcdEBJbmplY3QoTm90aWZpZXJDb25maWdUb2tlbikgY29uZmlnOiBOb3RpZmllckNvbmZpZ1xuXHQpIHtcblx0XHR0aGlzLnF1ZXVlU2VydmljZSA9IG5vdGlmaWVyUXVldWVTZXJ2aWNlO1xuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbm90aWZpZXIgY29uZmlndXJhdGlvblxuXHQgKlxuXHQgKiBAcmV0dXJucyBOb3RpZmllciBjb25maWd1cmF0aW9uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0Q29uZmlnKCk6IE5vdGlmaWVyQ29uZmlnIHtcblx0XHRyZXR1cm4gdGhpcy5jb25maWc7XG5cdH1cblxuXHQvKipcblx0ICogQVBJOiBTaG93IGEgbmV3IG5vdGlmaWNhdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0gbm90aWZpY2F0aW9uT3B0aW9ucyBOb3RpZmljYXRpb24gb3B0aW9uc1xuXHQgKi9cblx0cHVibGljIHNob3coIG5vdGlmaWNhdGlvbk9wdGlvbnM6IE5vdGlmaWVyTm90aWZpY2F0aW9uT3B0aW9ucyApOiB2b2lkIHtcblx0XHR0aGlzLnF1ZXVlU2VydmljZS5wdXNoKCB7XG5cdFx0XHRwYXlsb2FkOiBub3RpZmljYXRpb25PcHRpb25zLFxuXHRcdFx0dHlwZTogJ1NIT1cnXG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFQSTogSGlkZSBhIHNwZWNpZmljIG5vdGlmaWNhdGlvbiwgZ2l2ZW4gaXRzIElEXG5cdCAqXG5cdCAqIEBwYXJhbSBub3RpZmljYXRpb25JZCBJRCBvZiB0aGUgbm90aWZpY2F0aW9uIHRvIGhpZGVcblx0ICovXG5cdHB1YmxpYyBoaWRlKCBub3RpZmljYXRpb25JZDogc3RyaW5nICk6IHZvaWQge1xuXHRcdHRoaXMucXVldWVTZXJ2aWNlLnB1c2goIHtcblx0XHRcdHBheWxvYWQ6IG5vdGlmaWNhdGlvbklkLFxuXHRcdFx0dHlwZTogJ0hJREUnXG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFQSTogSGlkZSB0aGUgbmV3ZXN0IG5vdGlmaWNhdGlvblxuXHQgKi9cblx0cHVibGljIGhpZGVOZXdlc3QoKTogdm9pZCB7XG5cdFx0dGhpcy5xdWV1ZVNlcnZpY2UucHVzaCgge1xuXHRcdFx0dHlwZTogJ0hJREVfTkVXRVNUJ1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBUEk6IEhpZGUgdGhlIG9sZGVzdCBub3RpZmljYXRpb25cblx0ICovXG5cdHB1YmxpYyBoaWRlT2xkZXN0KCk6IHZvaWQge1xuXHRcdHRoaXMucXVldWVTZXJ2aWNlLnB1c2goIHtcblx0XHRcdHR5cGU6ICdISURFX09MREVTVCdcblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogQVBJOiBIaWRlIGFsbCBub3RpZmljYXRpb25zIGF0IG9uY2Vcblx0ICovXG5cdHB1YmxpYyBoaWRlQWxsKCk6IHZvaWQge1xuXHRcdHRoaXMucXVldWVTZXJ2aWNlLnB1c2goIHtcblx0XHRcdHR5cGU6ICdISURFX0FMTCdcblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogQVBJOiBTaG9ydGN1dCBmb3Igc2hvd2luZyBhIG5ldyBub3RpZmljYXRpb25cblx0ICpcblx0ICogQHBhcmFtIHR5cGUgICAgICAgICAgICAgVHlwZSBvZiB0aGUgbm90aWZpY2F0aW9uXG5cdCAqIEBwYXJhbSBtZXNzYWdlICAgICAgICAgIE1lc3NhZ2Ugb2YgdGhlIG5vdGlmaWNhdGlvblxuXHQgKiBAcGFyYW0gW25vdGlmaWNhdGlvbklkXSBVbmlxdWUgSUQgZm9yIHRoZSBub3RpZmljYXRpb24gKG9wdGlvbmFsKVxuXHQgKi9cblx0cHVibGljIG5vdGlmeSggdHlwZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIG5vdGlmaWNhdGlvbklkPzogc3RyaW5nICk6IHZvaWQge1xuXHRcdGxldCBub3RpZmljYXRpb25PcHRpb25zOiBOb3RpZmllck5vdGlmaWNhdGlvbk9wdGlvbnMgPSB7XG5cdFx0XHRtZXNzYWdlLFxuXHRcdFx0dHlwZVxuXHRcdH07XG5cdFx0aWYgKCBub3RpZmljYXRpb25JZCAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0bm90aWZpY2F0aW9uT3B0aW9ucy5pZCA9IG5vdGlmaWNhdGlvbklkO1xuXHRcdH1cblx0XHR0aGlzLnNob3coIG5vdGlmaWNhdGlvbk9wdGlvbnMgKTtcblx0fVxuXG59XG4iXX0=