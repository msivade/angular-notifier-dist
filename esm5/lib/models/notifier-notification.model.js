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
var /**
 * Notification
 *
 * This class describes the structure of a notifiction, including all information it needs to live, and everyone else needs to work with it.
 */
NotifierNotification = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param options Notifier options
     */
    function NotifierNotification(options) {
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
            this.id = "ID_" + new Date().getTime();
        }
    }
    return NotifierNotification;
}());
/**
 * Notification
 *
 * This class describes the structure of a notifiction, including all information it needs to live, and everyone else needs to work with it.
 */
export { NotifierNotification };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItbm90aWZpY2F0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ub3RpZmllci8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvbm90aWZpZXItbm90aWZpY2F0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFRQTs7Ozs7O0lBMkJDOzs7O09BSUc7SUFDSCw4QkFBbUIsT0FBb0M7Ozs7O1FBWmhELGFBQVEsR0FBc0IsSUFBSSxDQUFDO1FBYXpDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTdCLGdJQUFnSTtRQUNoSSxtSUFBbUk7UUFDbkksbURBQW1EO1FBQ25ELElBQUksT0FBTyxDQUFDLEVBQUUsS0FBSyxTQUFTLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFNLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFJLENBQUM7U0FDdkM7SUFDRixDQUFDO0lBQ0YsMkJBQUM7QUFBRCxDQUFDLEFBMUNELElBMENDOzs7Ozs7Ozs7Ozs7SUF0Q0Esa0NBQWtCOzs7OztJQUtsQixvQ0FBb0I7Ozs7O0lBS3BCLHVDQUF1Qjs7Ozs7O0lBTXZCLHdDQUEwQzs7Ozs7SUFLMUMseUNBQWdEOzs7Ozs7Ozs7QUF5QmpELGlEQXFCQzs7Ozs7O0lBakJBLHlDQUFZOzs7OztJQUtaLDJDQUFhOzs7OztJQUtiLDhDQUFnQjs7Ozs7O0lBTWhCLCtDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vdGlmaWVyTm90aWZpY2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9ub3RpZmllci1ub3RpZmljYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogTm90aWZpY2F0aW9uXG4gKlxuICogVGhpcyBjbGFzcyBkZXNjcmliZXMgdGhlIHN0cnVjdHVyZSBvZiBhIG5vdGlmaWN0aW9uLCBpbmNsdWRpbmcgYWxsIGluZm9ybWF0aW9uIGl0IG5lZWRzIHRvIGxpdmUsIGFuZCBldmVyeW9uZSBlbHNlIG5lZWRzIHRvIHdvcmsgd2l0aCBpdC5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vdGlmaWVyTm90aWZpY2F0aW9uIHtcblx0LyoqXG5cdCAqIFVuaXF1ZSBub3RpZmljYXRpb24gSUQsIGNhbiBiZSBzZXQgbWFudWFsbHkgdG8gY29udHJvbCB0aGUgbm90aWZpY2F0aW9uIGZyb20gb3V0c2lkZSBsYXRlciBvblxuXHQgKi9cblx0cHVibGljIGlkOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIE5vdGlmaWNhdGlvbiB0eXBlLCB3aWxsIGJlIHVzZWQgZm9yIGNvbnN0cnVjdGluZyBhbiBhcHByb3ByaWF0ZSBjbGFzcyBuYW1lXG5cdCAqL1xuXHRwdWJsaWMgdHlwZTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBOb3RpZmljYXRpb24gbWVzc2FnZVxuXHQgKi9cblx0cHVibGljIG1lc3NhZ2U6IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIHRlbXBsYXRlIHRvIGN1c3RvbWl6ZVxuXHQgKiB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgbm90aWZpY2F0aW9uXG5cdCAqL1xuXHRwdWJsaWMgdGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+ID0gbnVsbDtcblxuXHQvKipcblx0ICogQ29tcG9uZW50IHJlZmVyZW5jZSBvZiB0aGlzIG5vdGlmaWNhdGlvbiwgY3JlYXRlZCBhbmQgc2V0IGR1cmluZyBjcmVhdGlvbiB0aW1lXG5cdCAqL1xuXHRwdWJsaWMgY29tcG9uZW50OiBOb3RpZmllck5vdGlmaWNhdGlvbkNvbXBvbmVudDtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIG9wdGlvbnMgTm90aWZpZXIgb3B0aW9uc1xuXHQgKi9cblx0cHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE5vdGlmaWVyTm90aWZpY2F0aW9uT3B0aW9ucykge1xuXHRcdE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XG5cblx0XHQvLyBJZiBub3Qgc2V0IG1hbnVhbGx5LCB3ZSBoYXZlIHRvIGNyZWF0ZSBhIHVuaXF1ZSBub3RpZmljYXRpb24gSUQgYnkgb3Vyc2VsdmVzLiBUaGUgSUQgZ2VuZXJhdGlvbiByZWxpZXMgb24gdGhlIGN1cnJlbnQgYnJvd3NlclxuXHRcdC8vIGRhdGV0aW1lIGluIG1zLCBpbiBwcmF0aWN1bGFyIHRoZSBtb21lbnQgdGhpcyBub3RpZmljYXRpb24gZ2V0cyBjb25zdHJ1Y3RlZC4gQ29uY3VycmVuY3ksIGFuZCB0aHVzIHR3byBJRHMgYmVpbmcgdGhlIGV4YWN0IHNhbWUsXG5cdFx0Ly8gaXMgbm90IHBvc3NpYmxlIGR1ZSB0byB0aGUgYWN0aW9uIHF1ZXVlIGNvbmNlcHQuXG5cdFx0aWYgKG9wdGlvbnMuaWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5pZCA9IGBJRF8ke25ldyBEYXRlKCkuZ2V0VGltZSgpfWA7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogTm90aWZpY3Rpb24gb3B0aW9uc1xuICpcbiAqIFRoaXMgaW50ZXJmYWNlIGRlc2NyaWJlcyB3aGljaCBpbmZvcm1hdGlvbiBhcmUgbmVlZGVkIHRvIGNyZWF0ZSBhIG5ldyBub3RpZmljYXRpb24sIG9yIGluIG90aGVyIHdvcmRzLCB3aGljaCBpbmZvcm1hdGlvbiB0aGUgZXh0ZXJuYWwgQVBJXG4gKiBjYWxsIG11c3QgcHJvdmlkZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOb3RpZmllck5vdGlmaWNhdGlvbk9wdGlvbnMge1xuXHQvKipcblx0ICogTm90aWZpY2F0aW9uIElELCBvcHRpb25hbFxuXHQgKi9cblx0aWQ/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIE5vdGlmaWNhdGlvbiB0eXBlXG5cdCAqL1xuXHR0eXBlOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIE5vdGlmaWNhdGluIG1lc3NhZ2Vcblx0ICovXG5cdG1lc3NhZ2U6IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIHRlbXBsYXRlIHRvIGN1c3RvbWl6ZVxuXHQgKiB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgbm90aWZpY2F0aW9uXG5cdCAqL1xuXHR0ZW1wbGF0ZT86IFRlbXBsYXRlUmVmPGFueT47XG59XG4iXX0=