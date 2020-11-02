/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/notifier-queue.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Notifier queue service
 *
 * In general, API calls don't get processed right away. Instead, we have to queue them up in order to prevent simultanious API calls
 * interfering with each other. This, at least in theory, is possible at any time. In particular, animations - which potentially overlap -
 * can cause changes in JS classes as well as affect the DOM. Therefore, the queue service takes all actions, puts them in a queue, and
 * processes them at the right time (which is when the previous action has been processed successfully).
 *
 * Technical sidenote:
 * An action looks pretty similar to the ones within the Flux / Redux pattern.
 */
var NotifierQueueService = /** @class */ (function () {
    /**
     * Constructor
     */
    function NotifierQueueService() {
        this.actionStream = new Subject();
        this.actionQueue = [];
        this.isActionInProgress = false;
    }
    /**
     * Push a new action to the queue, and try to run it
     *
     * @param action Action object
     */
    /**
     * Push a new action to the queue, and try to run it
     *
     * @param {?} action Action object
     * @return {?}
     */
    NotifierQueueService.prototype.push = /**
     * Push a new action to the queue, and try to run it
     *
     * @param {?} action Action object
     * @return {?}
     */
    function (action) {
        this.actionQueue.push(action);
        this.tryToRunNextAction();
    };
    /**
     * Continue with the next action (called when the current action is finished)
     */
    /**
     * Continue with the next action (called when the current action is finished)
     * @return {?}
     */
    NotifierQueueService.prototype.continue = /**
     * Continue with the next action (called when the current action is finished)
     * @return {?}
     */
    function () {
        this.isActionInProgress = false;
        this.tryToRunNextAction();
    };
    /**
     * Try to run the next action in the queue; we skip if there already is some action in progress, or if there is no action left
     */
    /**
     * Try to run the next action in the queue; we skip if there already is some action in progress, or if there is no action left
     * @private
     * @return {?}
     */
    NotifierQueueService.prototype.tryToRunNextAction = /**
     * Try to run the next action in the queue; we skip if there already is some action in progress, or if there is no action left
     * @private
     * @return {?}
     */
    function () {
        if (this.isActionInProgress || this.actionQueue.length === 0) {
            return; // Skip (the queue can now go drink a coffee as it has nothing to do anymore)
        }
        this.isActionInProgress = true;
        this.actionStream.next(this.actionQueue.shift()); // Push next action to the stream, and remove the current action from the queue
    };
    NotifierQueueService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NotifierQueueService.ctorParameters = function () { return []; };
    return NotifierQueueService;
}());
export { NotifierQueueService };
if (false) {
    /**
     * Stream of actions, subscribable from outside
     * @type {?}
     */
    NotifierQueueService.prototype.actionStream;
    /**
     * Queue of actions
     * @type {?}
     * @private
     */
    NotifierQueueService.prototype.actionQueue;
    /**
     * Flag, true if some action is currently in progress
     * @type {?}
     * @private
     */
    NotifierQueueService.prototype.isActionInProgress;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItcXVldWUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbm90aWZpZXItcXVldWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7O0FBZS9CO0lBa0JDOztPQUVHO0lBQ0g7UUFDQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksT0FBTyxFQUFrQixDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSSxtQ0FBSTs7Ozs7O0lBQVgsVUFBYSxNQUFzQjtRQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBRSxNQUFNLENBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0ksdUNBQVE7Ozs7SUFBZjtRQUNDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSyxpREFBa0I7Ozs7O0lBQTFCO1FBQ0MsSUFBSyxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFHO1lBQy9ELE9BQU8sQ0FBQyw2RUFBNkU7U0FDckY7UUFDRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUUsQ0FBQyxDQUFDLCtFQUErRTtJQUNwSSxDQUFDOztnQkF0REQsVUFBVTs7OztJQXdEWCwyQkFBQztDQUFBLEFBeERELElBd0RDO1NBdkRZLG9CQUFvQjs7Ozs7O0lBS2hDLDRDQUFzRDs7Ozs7O0lBS3RELDJDQUEyQzs7Ozs7O0lBSzNDLGtEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBOb3RpZmllckFjdGlvbiB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1hY3Rpb24ubW9kZWwnO1xuXG4vKipcbiAqIE5vdGlmaWVyIHF1ZXVlIHNlcnZpY2VcbiAqXG4gKiBJbiBnZW5lcmFsLCBBUEkgY2FsbHMgZG9uJ3QgZ2V0IHByb2Nlc3NlZCByaWdodCBhd2F5LiBJbnN0ZWFkLCB3ZSBoYXZlIHRvIHF1ZXVlIHRoZW0gdXAgaW4gb3JkZXIgdG8gcHJldmVudCBzaW11bHRhbmlvdXMgQVBJIGNhbGxzXG4gKiBpbnRlcmZlcmluZyB3aXRoIGVhY2ggb3RoZXIuIFRoaXMsIGF0IGxlYXN0IGluIHRoZW9yeSwgaXMgcG9zc2libGUgYXQgYW55IHRpbWUuIEluIHBhcnRpY3VsYXIsIGFuaW1hdGlvbnMgLSB3aGljaCBwb3RlbnRpYWxseSBvdmVybGFwIC1cbiAqIGNhbiBjYXVzZSBjaGFuZ2VzIGluIEpTIGNsYXNzZXMgYXMgd2VsbCBhcyBhZmZlY3QgdGhlIERPTS4gVGhlcmVmb3JlLCB0aGUgcXVldWUgc2VydmljZSB0YWtlcyBhbGwgYWN0aW9ucywgcHV0cyB0aGVtIGluIGEgcXVldWUsIGFuZFxuICogcHJvY2Vzc2VzIHRoZW0gYXQgdGhlIHJpZ2h0IHRpbWUgKHdoaWNoIGlzIHdoZW4gdGhlIHByZXZpb3VzIGFjdGlvbiBoYXMgYmVlbiBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5KS5cbiAqXG4gKiBUZWNobmljYWwgc2lkZW5vdGU6XG4gKiBBbiBhY3Rpb24gbG9va3MgcHJldHR5IHNpbWlsYXIgdG8gdGhlIG9uZXMgd2l0aGluIHRoZSBGbHV4IC8gUmVkdXggcGF0dGVybi5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWVyUXVldWVTZXJ2aWNlIHtcblxuXHQvKipcblx0ICogU3RyZWFtIG9mIGFjdGlvbnMsIHN1YnNjcmliYWJsZSBmcm9tIG91dHNpZGVcblx0ICovXG5cdHB1YmxpYyByZWFkb25seSBhY3Rpb25TdHJlYW06IFN1YmplY3Q8Tm90aWZpZXJBY3Rpb24+O1xuXG5cdC8qKlxuXHQgKiBRdWV1ZSBvZiBhY3Rpb25zXG5cdCAqL1xuXHRwcml2YXRlIGFjdGlvblF1ZXVlOiBBcnJheTxOb3RpZmllckFjdGlvbj47XG5cblx0LyoqXG5cdCAqIEZsYWcsIHRydWUgaWYgc29tZSBhY3Rpb24gaXMgY3VycmVudGx5IGluIHByb2dyZXNzXG5cdCAqL1xuXHRwcml2YXRlIGlzQWN0aW9uSW5Qcm9ncmVzczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICovXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmFjdGlvblN0cmVhbSA9IG5ldyBTdWJqZWN0PE5vdGlmaWVyQWN0aW9uPigpO1xuXHRcdHRoaXMuYWN0aW9uUXVldWUgPSBbXTtcblx0XHR0aGlzLmlzQWN0aW9uSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFB1c2ggYSBuZXcgYWN0aW9uIHRvIHRoZSBxdWV1ZSwgYW5kIHRyeSB0byBydW4gaXRcblx0ICpcblx0ICogQHBhcmFtIGFjdGlvbiBBY3Rpb24gb2JqZWN0XG5cdCAqL1xuXHRwdWJsaWMgcHVzaCggYWN0aW9uOiBOb3RpZmllckFjdGlvbiApOiB2b2lkIHtcblx0XHR0aGlzLmFjdGlvblF1ZXVlLnB1c2goIGFjdGlvbiApO1xuXHRcdHRoaXMudHJ5VG9SdW5OZXh0QWN0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udGludWUgd2l0aCB0aGUgbmV4dCBhY3Rpb24gKGNhbGxlZCB3aGVuIHRoZSBjdXJyZW50IGFjdGlvbiBpcyBmaW5pc2hlZClcblx0ICovXG5cdHB1YmxpYyBjb250aW51ZSgpOiB2b2lkIHtcblx0XHR0aGlzLmlzQWN0aW9uSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHRcdHRoaXMudHJ5VG9SdW5OZXh0QWN0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogVHJ5IHRvIHJ1biB0aGUgbmV4dCBhY3Rpb24gaW4gdGhlIHF1ZXVlOyB3ZSBza2lwIGlmIHRoZXJlIGFscmVhZHkgaXMgc29tZSBhY3Rpb24gaW4gcHJvZ3Jlc3MsIG9yIGlmIHRoZXJlIGlzIG5vIGFjdGlvbiBsZWZ0XG5cdCAqL1xuXHRwcml2YXRlIHRyeVRvUnVuTmV4dEFjdGlvbigpOiB2b2lkIHtcblx0XHRpZiAoIHRoaXMuaXNBY3Rpb25JblByb2dyZXNzIHx8IHRoaXMuYWN0aW9uUXVldWUubGVuZ3RoID09PSAwICkge1xuXHRcdFx0cmV0dXJuOyAvLyBTa2lwICh0aGUgcXVldWUgY2FuIG5vdyBnbyBkcmluayBhIGNvZmZlZSBhcyBpdCBoYXMgbm90aGluZyB0byBkbyBhbnltb3JlKVxuXHRcdH1cblx0XHR0aGlzLmlzQWN0aW9uSW5Qcm9ncmVzcyA9IHRydWU7XG5cdFx0dGhpcy5hY3Rpb25TdHJlYW0ubmV4dCggdGhpcy5hY3Rpb25RdWV1ZS5zaGlmdCgpICk7IC8vIFB1c2ggbmV4dCBhY3Rpb24gdG8gdGhlIHN0cmVhbSwgYW5kIHJlbW92ZSB0aGUgY3VycmVudCBhY3Rpb24gZnJvbSB0aGUgcXVldWVcblx0fVxuXG59XG4iXX0=