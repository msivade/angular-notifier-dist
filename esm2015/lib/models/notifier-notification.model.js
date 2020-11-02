/**
 * @fileoverview added by tsickle
 * Generated from: lib/models/notifier-notification.model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Notification
 *
 * This class describes the structure of a notifiction, including all information it needs to live, and everyone else needs to work with it.
 */
export class NotifierNotification {
    /**
     * Constructor
     *
     * @param {?} options Notifier options
     */
    constructor(options) {
        /**
         * The template to customize
         * the appearance of the notification
         */
        this.template = null;
        Object.assign(this, options);
        // If not set manually, we have to create a unique notification ID by ourselves. The ID generation relies on the current browser
        // datetime in ms, in praticular the moment this notification gets constructed. Concurrency, and thus two IDs being the exact same,
        // is not possible due to the action queue concept.
        if (options.id === undefined) {
            this.id = `ID_${new Date().getTime()}`;
        }
    }
}
if (false) {
    /**
     * Unique notification ID, can be set manually to control the notification from outside later on
     * @type {?}
     */
    NotifierNotification.prototype.id;
    /**
     * Notification type, will be used for constructing an appropriate class name
     * @type {?}
     */
    NotifierNotification.prototype.type;
    /**
     * Notification message
     * @type {?}
     */
    NotifierNotification.prototype.message;
    /**
     * The template to customize
     * the appearance of the notification
     * @type {?}
     */
    NotifierNotification.prototype.template;
    /**
     * Component reference of this notification, created and set during creation time
     * @type {?}
     */
    NotifierNotification.prototype.component;
}
/**
 * Notifiction options
 *
 * This interface describes which information are needed to create a new notification, or in other words, which information the external API
 * call must provide.
 * @record
 */
export function NotifierNotificationOptions() { }
if (false) {
    /**
     * Notification ID, optional
     * @type {?|undefined}
     */
    NotifierNotificationOptions.prototype.id;
    /**
     * Notification type
     * @type {?}
     */
    NotifierNotificationOptions.prototype.type;
    /**
     * Notificatin message
     * @type {?}
     */
    NotifierNotificationOptions.prototype.message;
    /**
     * The template to customize
     * the appearance of the notification
     * @type {?|undefined}
     */
    NotifierNotificationOptions.prototype.template;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItbm90aWZpY2F0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ub3RpZmllci8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvbm90aWZpZXItbm90aWZpY2F0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFRQSxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7SUFnQ2hDLFlBQW1CLE9BQW9DOzs7OztRQVpoRCxhQUFRLEdBQXNCLElBQUksQ0FBQztRQWF6QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU3QixnSUFBZ0k7UUFDaEksbUlBQW1JO1FBQ25JLG1EQUFtRDtRQUNuRCxJQUFJLE9BQU8sQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQzdCLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7U0FDdkM7SUFDRixDQUFDO0NBQ0Q7Ozs7OztJQXRDQSxrQ0FBa0I7Ozs7O0lBS2xCLG9DQUFvQjs7Ozs7SUFLcEIsdUNBQXVCOzs7Ozs7SUFNdkIsd0NBQTBDOzs7OztJQUsxQyx5Q0FBZ0Q7Ozs7Ozs7OztBQXlCakQsaURBcUJDOzs7Ozs7SUFqQkEseUNBQVk7Ozs7O0lBS1osMkNBQWE7Ozs7O0lBS2IsOENBQWdCOzs7Ozs7SUFNaEIsK0NBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTm90aWZpZXJOb3RpZmljYXRpb25Db21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL25vdGlmaWVyLW5vdGlmaWNhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBOb3RpZmljYXRpb25cbiAqXG4gKiBUaGlzIGNsYXNzIGRlc2NyaWJlcyB0aGUgc3RydWN0dXJlIG9mIGEgbm90aWZpY3Rpb24sIGluY2x1ZGluZyBhbGwgaW5mb3JtYXRpb24gaXQgbmVlZHMgdG8gbGl2ZSwgYW5kIGV2ZXJ5b25lIGVsc2UgbmVlZHMgdG8gd29yayB3aXRoIGl0LlxuICovXG5leHBvcnQgY2xhc3MgTm90aWZpZXJOb3RpZmljYXRpb24ge1xuXHQvKipcblx0ICogVW5pcXVlIG5vdGlmaWNhdGlvbiBJRCwgY2FuIGJlIHNldCBtYW51YWxseSB0byBjb250cm9sIHRoZSBub3RpZmljYXRpb24gZnJvbSBvdXRzaWRlIGxhdGVyIG9uXG5cdCAqL1xuXHRwdWJsaWMgaWQ6IHN0cmluZztcblxuXHQvKipcblx0ICogTm90aWZpY2F0aW9uIHR5cGUsIHdpbGwgYmUgdXNlZCBmb3IgY29uc3RydWN0aW5nIGFuIGFwcHJvcHJpYXRlIGNsYXNzIG5hbWVcblx0ICovXG5cdHB1YmxpYyB0eXBlOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIE5vdGlmaWNhdGlvbiBtZXNzYWdlXG5cdCAqL1xuXHRwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgdGVtcGxhdGUgdG8gY3VzdG9taXplXG5cdCAqIHRoZSBhcHBlYXJhbmNlIG9mIHRoZSBub3RpZmljYXRpb25cblx0ICovXG5cdHB1YmxpYyB0ZW1wbGF0ZT86IFRlbXBsYXRlUmVmPGFueT4gPSBudWxsO1xuXG5cdC8qKlxuXHQgKiBDb21wb25lbnQgcmVmZXJlbmNlIG9mIHRoaXMgbm90aWZpY2F0aW9uLCBjcmVhdGVkIGFuZCBzZXQgZHVyaW5nIGNyZWF0aW9uIHRpbWVcblx0ICovXG5cdHB1YmxpYyBjb21wb25lbnQ6IE5vdGlmaWVyTm90aWZpY2F0aW9uQ29tcG9uZW50O1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAcGFyYW0gb3B0aW9ucyBOb3RpZmllciBvcHRpb25zXG5cdCAqL1xuXHRwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogTm90aWZpZXJOb3RpZmljYXRpb25PcHRpb25zKSB7XG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcblxuXHRcdC8vIElmIG5vdCBzZXQgbWFudWFsbHksIHdlIGhhdmUgdG8gY3JlYXRlIGEgdW5pcXVlIG5vdGlmaWNhdGlvbiBJRCBieSBvdXJzZWx2ZXMuIFRoZSBJRCBnZW5lcmF0aW9uIHJlbGllcyBvbiB0aGUgY3VycmVudCBicm93c2VyXG5cdFx0Ly8gZGF0ZXRpbWUgaW4gbXMsIGluIHByYXRpY3VsYXIgdGhlIG1vbWVudCB0aGlzIG5vdGlmaWNhdGlvbiBnZXRzIGNvbnN0cnVjdGVkLiBDb25jdXJyZW5jeSwgYW5kIHRodXMgdHdvIElEcyBiZWluZyB0aGUgZXhhY3Qgc2FtZSxcblx0XHQvLyBpcyBub3QgcG9zc2libGUgZHVlIHRvIHRoZSBhY3Rpb24gcXVldWUgY29uY2VwdC5cblx0XHRpZiAob3B0aW9ucy5pZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLmlkID0gYElEXyR7bmV3IERhdGUoKS5nZXRUaW1lKCl9YDtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBOb3RpZmljdGlvbiBvcHRpb25zXG4gKlxuICogVGhpcyBpbnRlcmZhY2UgZGVzY3JpYmVzIHdoaWNoIGluZm9ybWF0aW9uIGFyZSBuZWVkZWQgdG8gY3JlYXRlIGEgbmV3IG5vdGlmaWNhdGlvbiwgb3IgaW4gb3RoZXIgd29yZHMsIHdoaWNoIGluZm9ybWF0aW9uIHRoZSBleHRlcm5hbCBBUElcbiAqIGNhbGwgbXVzdCBwcm92aWRlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWVyTm90aWZpY2F0aW9uT3B0aW9ucyB7XG5cdC8qKlxuXHQgKiBOb3RpZmljYXRpb24gSUQsIG9wdGlvbmFsXG5cdCAqL1xuXHRpZD86IHN0cmluZztcblxuXHQvKipcblx0ICogTm90aWZpY2F0aW9uIHR5cGVcblx0ICovXG5cdHR5cGU6IHN0cmluZztcblxuXHQvKipcblx0ICogTm90aWZpY2F0aW4gbWVzc2FnZVxuXHQgKi9cblx0bWVzc2FnZTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgdGVtcGxhdGUgdG8gY3VzdG9taXplXG5cdCAqIHRoZSBhcHBlYXJhbmNlIG9mIHRoZSBub3RpZmljYXRpb25cblx0ICovXG5cdHRlbXBsYXRlPzogVGVtcGxhdGVSZWY8YW55Pjtcbn1cbiJdfQ==