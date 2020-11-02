/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/notifier-timer.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Notifier timer service
 *
 * This service acts as a timer, needed due to the still rather limited setTimeout JavaScript API. The timer service can start and stop a
 * timer. Furthermore, it can also pause the timer at any time, and resume later on. The timer API workd promise-based.
 */
var NotifierTimerService = /** @class */ (function () {
    /**
     * Constructor
     */
    function NotifierTimerService() {
        this.now = 0;
        this.remaining = 0;
    }
    /**
     * Start (or resume) the timer
     *
     * @param   duration Timer duration, in ms
     * @returns          Promise, resolved once the timer finishes
     */
    /**
     * Start (or resume) the timer
     *
     * @param {?} duration Timer duration, in ms
     * @return {?} Promise, resolved once the timer finishes
     */
    NotifierTimerService.prototype.start = /**
     * Start (or resume) the timer
     *
     * @param {?} duration Timer duration, in ms
     * @return {?} Promise, resolved once the timer finishes
     */
    function (duration) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            // For the first run ...
            _this.remaining = duration;
            // Setup, then start the timer
            _this.finishPromiseResolver = resolve;
            _this.continue();
        }));
    };
    /**
     * Pause the timer
     */
    /**
     * Pause the timer
     * @return {?}
     */
    NotifierTimerService.prototype.pause = /**
     * Pause the timer
     * @return {?}
     */
    function () {
        clearTimeout(this.timerId);
        this.remaining -= new Date().getTime() - this.now;
    };
    /**
     * Continue the timer
     */
    /**
     * Continue the timer
     * @return {?}
     */
    NotifierTimerService.prototype.continue = /**
     * Continue the timer
     * @return {?}
     */
    function () {
        var _this = this;
        this.now = new Date().getTime();
        this.timerId = window.setTimeout((/**
         * @return {?}
         */
        function () {
            _this.finish();
        }), this.remaining);
    };
    /**
     * Stop the timer
     */
    /**
     * Stop the timer
     * @return {?}
     */
    NotifierTimerService.prototype.stop = /**
     * Stop the timer
     * @return {?}
     */
    function () {
        clearTimeout(this.timerId);
        this.remaining = 0;
    };
    /**
     * Finish up the timeout by resolving the timer promise
     */
    /**
     * Finish up the timeout by resolving the timer promise
     * @private
     * @return {?}
     */
    NotifierTimerService.prototype.finish = /**
     * Finish up the timeout by resolving the timer promise
     * @private
     * @return {?}
     */
    function () {
        this.finishPromiseResolver();
    };
    NotifierTimerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NotifierTimerService.ctorParameters = function () { return []; };
    return NotifierTimerService;
}());
export { NotifierTimerService };
if (false) {
    /**
     * Timestamp (in ms), created in the moment the timer starts
     * @type {?}
     * @private
     */
    NotifierTimerService.prototype.now;
    /**
     * Remaining time (in ms)
     * @type {?}
     * @private
     */
    NotifierTimerService.prototype.remaining;
    /**
     * Timeout ID, used for clearing the timeout later on
     * @type {?}
     * @private
     */
    NotifierTimerService.prototype.timerId;
    /**
     * Promise resolve function, eventually getting called once the timer finishes
     * @type {?}
     * @private
     */
    NotifierTimerService.prototype.finishPromiseResolver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItdGltZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbm90aWZpZXItdGltZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFRM0M7SUF1QkM7O09BRUc7SUFDSDtRQUNDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7O0lBQ0ksb0NBQUs7Ozs7OztJQUFaLFVBQWMsUUFBZ0I7UUFBOUIsaUJBV0M7UUFWQSxPQUFPLElBQUksT0FBTzs7Ozs7UUFBYSxVQUFFLE9BQW1CLEVBQUUsTUFBa0I7WUFFdkUsd0JBQXdCO1lBQ3hCLEtBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBRTFCLDhCQUE4QjtZQUM5QixLQUFJLENBQUMscUJBQXFCLEdBQUcsT0FBTyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixDQUFDLEVBQUUsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSSxvQ0FBSzs7OztJQUFaO1FBQ0MsWUFBWSxDQUFFLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0ksdUNBQVE7Ozs7SUFBZjtRQUFBLGlCQUtDO1FBSkEsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVU7OztRQUFFO1lBQ2pDLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLENBQUMsR0FBRSxJQUFJLENBQUMsU0FBUyxDQUFFLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNJLG1DQUFJOzs7O0lBQVg7UUFDQyxZQUFZLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0sscUNBQU07Ozs7O0lBQWQ7UUFDQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUM5QixDQUFDOztnQkFqRkQsVUFBVTs7OztJQW1GWCwyQkFBQztDQUFBLEFBbkZELElBbUZDO1NBbEZZLG9CQUFvQjs7Ozs7OztJQUtoQyxtQ0FBb0I7Ozs7OztJQUtwQix5Q0FBMEI7Ozs7OztJQUsxQix1Q0FBd0I7Ozs7OztJQUt4QixxREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogTm90aWZpZXIgdGltZXIgc2VydmljZVxuICpcbiAqIFRoaXMgc2VydmljZSBhY3RzIGFzIGEgdGltZXIsIG5lZWRlZCBkdWUgdG8gdGhlIHN0aWxsIHJhdGhlciBsaW1pdGVkIHNldFRpbWVvdXQgSmF2YVNjcmlwdCBBUEkuIFRoZSB0aW1lciBzZXJ2aWNlIGNhbiBzdGFydCBhbmQgc3RvcCBhXG4gKiB0aW1lci4gRnVydGhlcm1vcmUsIGl0IGNhbiBhbHNvIHBhdXNlIHRoZSB0aW1lciBhdCBhbnkgdGltZSwgYW5kIHJlc3VtZSBsYXRlciBvbi4gVGhlIHRpbWVyIEFQSSB3b3JrZCBwcm9taXNlLWJhc2VkLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpZXJUaW1lclNlcnZpY2Uge1xuXG5cdC8qKlxuXHQgKiBUaW1lc3RhbXAgKGluIG1zKSwgY3JlYXRlZCBpbiB0aGUgbW9tZW50IHRoZSB0aW1lciBzdGFydHNcblx0ICovXG5cdHByaXZhdGUgbm93OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFJlbWFpbmluZyB0aW1lIChpbiBtcylcblx0ICovXG5cdHByaXZhdGUgcmVtYWluaW5nOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRpbWVvdXQgSUQsIHVzZWQgZm9yIGNsZWFyaW5nIHRoZSB0aW1lb3V0IGxhdGVyIG9uXG5cdCAqL1xuXHRwcml2YXRlIHRpbWVySWQ6IG51bWJlcjtcblxuXHQvKipcblx0ICogUHJvbWlzZSByZXNvbHZlIGZ1bmN0aW9uLCBldmVudHVhbGx5IGdldHRpbmcgY2FsbGVkIG9uY2UgdGhlIHRpbWVyIGZpbmlzaGVzXG5cdCAqL1xuXHRwcml2YXRlIGZpbmlzaFByb21pc2VSZXNvbHZlcjogKCkgPT4gdm9pZDtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICovXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLm5vdyA9IDA7XG5cdFx0dGhpcy5yZW1haW5pbmcgPSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN0YXJ0IChvciByZXN1bWUpIHRoZSB0aW1lclxuXHQgKlxuXHQgKiBAcGFyYW0gICBkdXJhdGlvbiBUaW1lciBkdXJhdGlvbiwgaW4gbXNcblx0ICogQHJldHVybnMgICAgICAgICAgUHJvbWlzZSwgcmVzb2x2ZWQgb25jZSB0aGUgdGltZXIgZmluaXNoZXNcblx0ICovXG5cdHB1YmxpYyBzdGFydCggZHVyYXRpb246IG51bWJlciApOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblxuXHRcdFx0Ly8gRm9yIHRoZSBmaXJzdCBydW4gLi4uXG5cdFx0XHR0aGlzLnJlbWFpbmluZyA9IGR1cmF0aW9uO1xuXG5cdFx0XHQvLyBTZXR1cCwgdGhlbiBzdGFydCB0aGUgdGltZXJcblx0XHRcdHRoaXMuZmluaXNoUHJvbWlzZVJlc29sdmVyID0gcmVzb2x2ZTtcblx0XHRcdHRoaXMuY29udGludWUoKTtcblxuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXVzZSB0aGUgdGltZXJcblx0ICovXG5cdHB1YmxpYyBwYXVzZSgpOiB2b2lkIHtcblx0XHRjbGVhclRpbWVvdXQoIHRoaXMudGltZXJJZCApO1xuXHRcdHRoaXMucmVtYWluaW5nIC09IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5ub3c7XG5cdH1cblxuXHQvKipcblx0ICogQ29udGludWUgdGhlIHRpbWVyXG5cdCAqL1xuXHRwdWJsaWMgY29udGludWUoKTogdm9pZCB7XG5cdFx0dGhpcy5ub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0XHR0aGlzLnRpbWVySWQgPSB3aW5kb3cuc2V0VGltZW91dCggKCkgPT4ge1xuXHRcdFx0dGhpcy5maW5pc2goKTtcblx0XHR9LCB0aGlzLnJlbWFpbmluZyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN0b3AgdGhlIHRpbWVyXG5cdCAqL1xuXHRwdWJsaWMgc3RvcCgpOiB2b2lkIHtcblx0XHRjbGVhclRpbWVvdXQoIHRoaXMudGltZXJJZCApO1xuXHRcdHRoaXMucmVtYWluaW5nID0gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBGaW5pc2ggdXAgdGhlIHRpbWVvdXQgYnkgcmVzb2x2aW5nIHRoZSB0aW1lciBwcm9taXNlXG5cdCAqL1xuXHRwcml2YXRlIGZpbmlzaCgpOiB2b2lkIHtcblx0XHR0aGlzLmZpbmlzaFByb21pc2VSZXNvbHZlcigpO1xuXHR9XG5cbn1cbiJdfQ==