import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
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
export class NotifierQueueService {
    /**
     * Constructor
     */
    constructor() {
        this.actionStream = new Subject();
        this.actionQueue = [];
        this.isActionInProgress = false;
    }
    /**
     * Push a new action to the queue, and try to run it
     *
     * @param action Action object
     */
    push(action) {
        this.actionQueue.push(action);
        this.tryToRunNextAction();
    }
    /**
     * Continue with the next action (called when the current action is finished)
     */
    continue() {
        this.isActionInProgress = false;
        this.tryToRunNextAction();
    }
    /**
     * Try to run the next action in the queue; we skip if there already is some action in progress, or if there is no action left
     */
    tryToRunNextAction() {
        if (this.isActionInProgress || this.actionQueue.length === 0) {
            return; // Skip (the queue can now go drink a coffee as it has nothing to do anymore)
        }
        this.isActionInProgress = true;
        this.actionStream.next(this.actionQueue.shift()); // Push next action to the stream, and remove the current action from the queue
    }
}
/** @nocollapse */ NotifierQueueService.ɵfac = function NotifierQueueService_Factory(t) { return new (t || NotifierQueueService)(); };
/** @nocollapse */ NotifierQueueService.ɵprov = i0.ɵɵdefineInjectable({ token: NotifierQueueService, factory: NotifierQueueService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NotifierQueueService, [{
        type: Injectable
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItcXVldWUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbm90aWZpZXItcXVldWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBSS9COzs7Ozs7Ozs7O0dBVUc7QUFFSCxNQUFNLE9BQU8sb0JBQW9CO0lBaUJoQzs7T0FFRztJQUNIO1FBQ0MsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLE9BQU8sRUFBa0IsQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksSUFBSSxDQUFFLE1BQXNCO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFFLE1BQU0sQ0FBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNJLFFBQVE7UUFDZCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNLLGtCQUFrQjtRQUN6QixJQUFLLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUc7WUFDL0QsT0FBTyxDQUFDLDZFQUE2RTtTQUNyRjtRQUNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBRSxDQUFDLENBQUMsK0VBQStFO0lBQ3BJLENBQUM7OzJHQXJEVyxvQkFBb0I7K0VBQXBCLG9CQUFvQixXQUFwQixvQkFBb0I7a0RBQXBCLG9CQUFvQjtjQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE5vdGlmaWVyQWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLWFjdGlvbi5tb2RlbCc7XG5cbi8qKlxuICogTm90aWZpZXIgcXVldWUgc2VydmljZVxuICpcbiAqIEluIGdlbmVyYWwsIEFQSSBjYWxscyBkb24ndCBnZXQgcHJvY2Vzc2VkIHJpZ2h0IGF3YXkuIEluc3RlYWQsIHdlIGhhdmUgdG8gcXVldWUgdGhlbSB1cCBpbiBvcmRlciB0byBwcmV2ZW50IHNpbXVsdGFuaW91cyBBUEkgY2FsbHNcbiAqIGludGVyZmVyaW5nIHdpdGggZWFjaCBvdGhlci4gVGhpcywgYXQgbGVhc3QgaW4gdGhlb3J5LCBpcyBwb3NzaWJsZSBhdCBhbnkgdGltZS4gSW4gcGFydGljdWxhciwgYW5pbWF0aW9ucyAtIHdoaWNoIHBvdGVudGlhbGx5IG92ZXJsYXAgLVxuICogY2FuIGNhdXNlIGNoYW5nZXMgaW4gSlMgY2xhc3NlcyBhcyB3ZWxsIGFzIGFmZmVjdCB0aGUgRE9NLiBUaGVyZWZvcmUsIHRoZSBxdWV1ZSBzZXJ2aWNlIHRha2VzIGFsbCBhY3Rpb25zLCBwdXRzIHRoZW0gaW4gYSBxdWV1ZSwgYW5kXG4gKiBwcm9jZXNzZXMgdGhlbSBhdCB0aGUgcmlnaHQgdGltZSAod2hpY2ggaXMgd2hlbiB0aGUgcHJldmlvdXMgYWN0aW9uIGhhcyBiZWVuIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkpLlxuICpcbiAqIFRlY2huaWNhbCBzaWRlbm90ZTpcbiAqIEFuIGFjdGlvbiBsb29rcyBwcmV0dHkgc2ltaWxhciB0byB0aGUgb25lcyB3aXRoaW4gdGhlIEZsdXggLyBSZWR1eCBwYXR0ZXJuLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpZXJRdWV1ZVNlcnZpY2Uge1xuXG5cdC8qKlxuXHQgKiBTdHJlYW0gb2YgYWN0aW9ucywgc3Vic2NyaWJhYmxlIGZyb20gb3V0c2lkZVxuXHQgKi9cblx0cHVibGljIHJlYWRvbmx5IGFjdGlvblN0cmVhbTogU3ViamVjdDxOb3RpZmllckFjdGlvbj47XG5cblx0LyoqXG5cdCAqIFF1ZXVlIG9mIGFjdGlvbnNcblx0ICovXG5cdHByaXZhdGUgYWN0aW9uUXVldWU6IEFycmF5PE5vdGlmaWVyQWN0aW9uPjtcblxuXHQvKipcblx0ICogRmxhZywgdHJ1ZSBpZiBzb21lIGFjdGlvbiBpcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3Ncblx0ICovXG5cdHByaXZhdGUgaXNBY3Rpb25JblByb2dyZXNzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKi9cblx0cHVibGljIGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuYWN0aW9uU3RyZWFtID0gbmV3IFN1YmplY3Q8Tm90aWZpZXJBY3Rpb24+KCk7XG5cdFx0dGhpcy5hY3Rpb25RdWV1ZSA9IFtdO1xuXHRcdHRoaXMuaXNBY3Rpb25JblByb2dyZXNzID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogUHVzaCBhIG5ldyBhY3Rpb24gdG8gdGhlIHF1ZXVlLCBhbmQgdHJ5IHRvIHJ1biBpdFxuXHQgKlxuXHQgKiBAcGFyYW0gYWN0aW9uIEFjdGlvbiBvYmplY3Rcblx0ICovXG5cdHB1YmxpYyBwdXNoKCBhY3Rpb246IE5vdGlmaWVyQWN0aW9uICk6IHZvaWQge1xuXHRcdHRoaXMuYWN0aW9uUXVldWUucHVzaCggYWN0aW9uICk7XG5cdFx0dGhpcy50cnlUb1J1bk5leHRBY3Rpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb250aW51ZSB3aXRoIHRoZSBuZXh0IGFjdGlvbiAoY2FsbGVkIHdoZW4gdGhlIGN1cnJlbnQgYWN0aW9uIGlzIGZpbmlzaGVkKVxuXHQgKi9cblx0cHVibGljIGNvbnRpbnVlKCk6IHZvaWQge1xuXHRcdHRoaXMuaXNBY3Rpb25JblByb2dyZXNzID0gZmFsc2U7XG5cdFx0dGhpcy50cnlUb1J1bk5leHRBY3Rpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUcnkgdG8gcnVuIHRoZSBuZXh0IGFjdGlvbiBpbiB0aGUgcXVldWU7IHdlIHNraXAgaWYgdGhlcmUgYWxyZWFkeSBpcyBzb21lIGFjdGlvbiBpbiBwcm9ncmVzcywgb3IgaWYgdGhlcmUgaXMgbm8gYWN0aW9uIGxlZnRcblx0ICovXG5cdHByaXZhdGUgdHJ5VG9SdW5OZXh0QWN0aW9uKCk6IHZvaWQge1xuXHRcdGlmICggdGhpcy5pc0FjdGlvbkluUHJvZ3Jlc3MgfHwgdGhpcy5hY3Rpb25RdWV1ZS5sZW5ndGggPT09IDAgKSB7XG5cdFx0XHRyZXR1cm47IC8vIFNraXAgKHRoZSBxdWV1ZSBjYW4gbm93IGdvIGRyaW5rIGEgY29mZmVlIGFzIGl0IGhhcyBub3RoaW5nIHRvIGRvIGFueW1vcmUpXG5cdFx0fVxuXHRcdHRoaXMuaXNBY3Rpb25JblByb2dyZXNzID0gdHJ1ZTtcblx0XHR0aGlzLmFjdGlvblN0cmVhbS5uZXh0KCB0aGlzLmFjdGlvblF1ZXVlLnNoaWZ0KCkgKTsgLy8gUHVzaCBuZXh0IGFjdGlvbiB0byB0aGUgc3RyZWFtLCBhbmQgcmVtb3ZlIHRoZSBjdXJyZW50IGFjdGlvbiBmcm9tIHRoZSBxdWV1ZVxuXHR9XG5cbn1cbiJdfQ==