import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Notifier timer service
 *
 * This service acts as a timer, needed due to the still rather limited setTimeout JavaScript API. The timer service can start and stop a
 * timer. Furthermore, it can also pause the timer at any time, and resume later on. The timer API workd promise-based.
 */
export class NotifierTimerService {
    /**
     * Constructor
     */
    constructor() {
        this.now = 0;
        this.remaining = 0;
    }
    /**
     * Start (or resume) the timer
     *
     * @param   duration Timer duration, in ms
     * @returns          Promise, resolved once the timer finishes
     */
    start(duration) {
        return new Promise((resolve, reject) => {
            // For the first run ...
            this.remaining = duration;
            // Setup, then start the timer
            this.finishPromiseResolver = resolve;
            this.continue();
        });
    }
    /**
     * Pause the timer
     */
    pause() {
        clearTimeout(this.timerId);
        this.remaining -= new Date().getTime() - this.now;
    }
    /**
     * Continue the timer
     */
    continue() {
        this.now = new Date().getTime();
        this.timerId = window.setTimeout(() => {
            this.finish();
        }, this.remaining);
    }
    /**
     * Stop the timer
     */
    stop() {
        clearTimeout(this.timerId);
        this.remaining = 0;
    }
    /**
     * Finish up the timeout by resolving the timer promise
     */
    finish() {
        this.finishPromiseResolver();
    }
}
/** @nocollapse */ NotifierTimerService.ɵfac = function NotifierTimerService_Factory(t) { return new (t || NotifierTimerService)(); };
/** @nocollapse */ NotifierTimerService.ɵprov = i0.ɵɵdefineInjectable({ token: NotifierTimerService, factory: NotifierTimerService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NotifierTimerService, [{
        type: Injectable
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItdGltZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbm90aWZpZXItdGltZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQzs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTyxvQkFBb0I7SUFzQmhDOztPQUVHO0lBQ0g7UUFDQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBRSxRQUFnQjtRQUM3QixPQUFPLElBQUksT0FBTyxDQUFhLENBQUUsT0FBbUIsRUFBRSxNQUFrQixFQUFHLEVBQUU7WUFFNUUsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBRTFCLDhCQUE4QjtZQUM5QixJQUFJLENBQUMscUJBQXFCLEdBQUcsT0FBTyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixDQUFDLENBQUUsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDWCxZQUFZLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7T0FFRztJQUNJLFFBQVE7UUFDZCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFFLEdBQUcsRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNJLElBQUk7UUFDVixZQUFZLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7T0FFRztJQUNLLE1BQU07UUFDYixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUM5QixDQUFDOzsyR0FoRlcsb0JBQW9COytFQUFwQixvQkFBb0IsV0FBcEIsb0JBQW9CO2tEQUFwQixvQkFBb0I7Y0FEaEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBOb3RpZmllciB0aW1lciBzZXJ2aWNlXG4gKlxuICogVGhpcyBzZXJ2aWNlIGFjdHMgYXMgYSB0aW1lciwgbmVlZGVkIGR1ZSB0byB0aGUgc3RpbGwgcmF0aGVyIGxpbWl0ZWQgc2V0VGltZW91dCBKYXZhU2NyaXB0IEFQSS4gVGhlIHRpbWVyIHNlcnZpY2UgY2FuIHN0YXJ0IGFuZCBzdG9wIGFcbiAqIHRpbWVyLiBGdXJ0aGVybW9yZSwgaXQgY2FuIGFsc28gcGF1c2UgdGhlIHRpbWVyIGF0IGFueSB0aW1lLCBhbmQgcmVzdW1lIGxhdGVyIG9uLiBUaGUgdGltZXIgQVBJIHdvcmtkIHByb21pc2UtYmFzZWQuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmllclRpbWVyU2VydmljZSB7XG5cblx0LyoqXG5cdCAqIFRpbWVzdGFtcCAoaW4gbXMpLCBjcmVhdGVkIGluIHRoZSBtb21lbnQgdGhlIHRpbWVyIHN0YXJ0c1xuXHQgKi9cblx0cHJpdmF0ZSBub3c6IG51bWJlcjtcblxuXHQvKipcblx0ICogUmVtYWluaW5nIHRpbWUgKGluIG1zKVxuXHQgKi9cblx0cHJpdmF0ZSByZW1haW5pbmc6IG51bWJlcjtcblxuXHQvKipcblx0ICogVGltZW91dCBJRCwgdXNlZCBmb3IgY2xlYXJpbmcgdGhlIHRpbWVvdXQgbGF0ZXIgb25cblx0ICovXG5cdHByaXZhdGUgdGltZXJJZDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBQcm9taXNlIHJlc29sdmUgZnVuY3Rpb24sIGV2ZW50dWFsbHkgZ2V0dGluZyBjYWxsZWQgb25jZSB0aGUgdGltZXIgZmluaXNoZXNcblx0ICovXG5cdHByaXZhdGUgZmluaXNoUHJvbWlzZVJlc29sdmVyOiAoKSA9PiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKi9cblx0cHVibGljIGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMubm93ID0gMDtcblx0XHR0aGlzLnJlbWFpbmluZyA9IDA7XG5cdH1cblxuXHQvKipcblx0ICogU3RhcnQgKG9yIHJlc3VtZSkgdGhlIHRpbWVyXG5cdCAqXG5cdCAqIEBwYXJhbSAgIGR1cmF0aW9uIFRpbWVyIGR1cmF0aW9uLCBpbiBtc1xuXHQgKiBAcmV0dXJucyAgICAgICAgICBQcm9taXNlLCByZXNvbHZlZCBvbmNlIHRoZSB0aW1lciBmaW5pc2hlc1xuXHQgKi9cblx0cHVibGljIHN0YXJ0KCBkdXJhdGlvbjogbnVtYmVyICk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oICggcmVzb2x2ZTogKCkgPT4gdm9pZCwgcmVqZWN0OiAoKSA9PiB2b2lkICkgPT4ge1xuXG5cdFx0XHQvLyBGb3IgdGhlIGZpcnN0IHJ1biAuLi5cblx0XHRcdHRoaXMucmVtYWluaW5nID0gZHVyYXRpb247XG5cblx0XHRcdC8vIFNldHVwLCB0aGVuIHN0YXJ0IHRoZSB0aW1lclxuXHRcdFx0dGhpcy5maW5pc2hQcm9taXNlUmVzb2x2ZXIgPSByZXNvbHZlO1xuXHRcdFx0dGhpcy5jb250aW51ZSgpO1xuXG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhdXNlIHRoZSB0aW1lclxuXHQgKi9cblx0cHVibGljIHBhdXNlKCk6IHZvaWQge1xuXHRcdGNsZWFyVGltZW91dCggdGhpcy50aW1lcklkICk7XG5cdFx0dGhpcy5yZW1haW5pbmcgLT0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLm5vdztcblx0fVxuXG5cdC8qKlxuXHQgKiBDb250aW51ZSB0aGUgdGltZXJcblx0ICovXG5cdHB1YmxpYyBjb250aW51ZSgpOiB2b2lkIHtcblx0XHR0aGlzLm5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdHRoaXMudGltZXJJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHR0aGlzLmZpbmlzaCgpO1xuXHRcdH0sIHRoaXMucmVtYWluaW5nICk7XG5cdH1cblxuXHQvKipcblx0ICogU3RvcCB0aGUgdGltZXJcblx0ICovXG5cdHB1YmxpYyBzdG9wKCk6IHZvaWQge1xuXHRcdGNsZWFyVGltZW91dCggdGhpcy50aW1lcklkICk7XG5cdFx0dGhpcy5yZW1haW5pbmcgPSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZpbmlzaCB1cCB0aGUgdGltZW91dCBieSByZXNvbHZpbmcgdGhlIHRpbWVyIHByb21pc2Vcblx0ICovXG5cdHByaXZhdGUgZmluaXNoKCk6IHZvaWQge1xuXHRcdHRoaXMuZmluaXNoUHJvbWlzZVJlc29sdmVyKCk7XG5cdH1cblxufVxuIl19