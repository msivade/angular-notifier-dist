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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItdGltZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9tc2l2YWRlL0Rldi9wcm9qZWN0cy9hbmd1bGFyLW5vdGlmaWVyL3Byb2plY3RzL2FuZ3VsYXItbm90aWZpZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25vdGlmaWVyLXRpbWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFM0M7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQU8sb0JBQW9CO0lBc0JoQzs7T0FFRztJQUNIO1FBQ0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUUsUUFBZ0I7UUFDN0IsT0FBTyxJQUFJLE9BQU8sQ0FBYSxDQUFFLE9BQW1CLEVBQUUsTUFBa0IsRUFBRyxFQUFFO1lBRTVFLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUUxQiw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLE9BQU8sQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsQ0FBQyxDQUFFLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1gsWUFBWSxDQUFFLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2QsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBRSxHQUFHLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxJQUFJO1FBQ1YsWUFBWSxDQUFFLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQ7O09BRUc7SUFDSyxNQUFNO1FBQ2IsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDOUIsQ0FBQzs7MkdBaEZXLG9CQUFvQjsrRUFBcEIsb0JBQW9CLFdBQXBCLG9CQUFvQjtrREFBcEIsb0JBQW9CO2NBRGhDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogTm90aWZpZXIgdGltZXIgc2VydmljZVxuICpcbiAqIFRoaXMgc2VydmljZSBhY3RzIGFzIGEgdGltZXIsIG5lZWRlZCBkdWUgdG8gdGhlIHN0aWxsIHJhdGhlciBsaW1pdGVkIHNldFRpbWVvdXQgSmF2YVNjcmlwdCBBUEkuIFRoZSB0aW1lciBzZXJ2aWNlIGNhbiBzdGFydCBhbmQgc3RvcCBhXG4gKiB0aW1lci4gRnVydGhlcm1vcmUsIGl0IGNhbiBhbHNvIHBhdXNlIHRoZSB0aW1lciBhdCBhbnkgdGltZSwgYW5kIHJlc3VtZSBsYXRlciBvbi4gVGhlIHRpbWVyIEFQSSB3b3JrZCBwcm9taXNlLWJhc2VkLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpZXJUaW1lclNlcnZpY2Uge1xuXG5cdC8qKlxuXHQgKiBUaW1lc3RhbXAgKGluIG1zKSwgY3JlYXRlZCBpbiB0aGUgbW9tZW50IHRoZSB0aW1lciBzdGFydHNcblx0ICovXG5cdHByaXZhdGUgbm93OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFJlbWFpbmluZyB0aW1lIChpbiBtcylcblx0ICovXG5cdHByaXZhdGUgcmVtYWluaW5nOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRpbWVvdXQgSUQsIHVzZWQgZm9yIGNsZWFyaW5nIHRoZSB0aW1lb3V0IGxhdGVyIG9uXG5cdCAqL1xuXHRwcml2YXRlIHRpbWVySWQ6IG51bWJlcjtcblxuXHQvKipcblx0ICogUHJvbWlzZSByZXNvbHZlIGZ1bmN0aW9uLCBldmVudHVhbGx5IGdldHRpbmcgY2FsbGVkIG9uY2UgdGhlIHRpbWVyIGZpbmlzaGVzXG5cdCAqL1xuXHRwcml2YXRlIGZpbmlzaFByb21pc2VSZXNvbHZlcjogKCkgPT4gdm9pZDtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICovXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLm5vdyA9IDA7XG5cdFx0dGhpcy5yZW1haW5pbmcgPSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN0YXJ0IChvciByZXN1bWUpIHRoZSB0aW1lclxuXHQgKlxuXHQgKiBAcGFyYW0gICBkdXJhdGlvbiBUaW1lciBkdXJhdGlvbiwgaW4gbXNcblx0ICogQHJldHVybnMgICAgICAgICAgUHJvbWlzZSwgcmVzb2x2ZWQgb25jZSB0aGUgdGltZXIgZmluaXNoZXNcblx0ICovXG5cdHB1YmxpYyBzdGFydCggZHVyYXRpb246IG51bWJlciApOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCAoIHJlc29sdmU6ICgpID0+IHZvaWQsIHJlamVjdDogKCkgPT4gdm9pZCApID0+IHtcblxuXHRcdFx0Ly8gRm9yIHRoZSBmaXJzdCBydW4gLi4uXG5cdFx0XHR0aGlzLnJlbWFpbmluZyA9IGR1cmF0aW9uO1xuXG5cdFx0XHQvLyBTZXR1cCwgdGhlbiBzdGFydCB0aGUgdGltZXJcblx0XHRcdHRoaXMuZmluaXNoUHJvbWlzZVJlc29sdmVyID0gcmVzb2x2ZTtcblx0XHRcdHRoaXMuY29udGludWUoKTtcblxuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXVzZSB0aGUgdGltZXJcblx0ICovXG5cdHB1YmxpYyBwYXVzZSgpOiB2b2lkIHtcblx0XHRjbGVhclRpbWVvdXQoIHRoaXMudGltZXJJZCApO1xuXHRcdHRoaXMucmVtYWluaW5nIC09IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5ub3c7XG5cdH1cblxuXHQvKipcblx0ICogQ29udGludWUgdGhlIHRpbWVyXG5cdCAqL1xuXHRwdWJsaWMgY29udGludWUoKTogdm9pZCB7XG5cdFx0dGhpcy5ub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0XHR0aGlzLnRpbWVySWQgPSB3aW5kb3cuc2V0VGltZW91dCggKCkgPT4ge1xuXHRcdFx0dGhpcy5maW5pc2goKTtcblx0XHR9LCB0aGlzLnJlbWFpbmluZyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN0b3AgdGhlIHRpbWVyXG5cdCAqL1xuXHRwdWJsaWMgc3RvcCgpOiB2b2lkIHtcblx0XHRjbGVhclRpbWVvdXQoIHRoaXMudGltZXJJZCApO1xuXHRcdHRoaXMucmVtYWluaW5nID0gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBGaW5pc2ggdXAgdGhlIHRpbWVvdXQgYnkgcmVzb2x2aW5nIHRoZSB0aW1lciBwcm9taXNlXG5cdCAqL1xuXHRwcml2YXRlIGZpbmlzaCgpOiB2b2lkIHtcblx0XHR0aGlzLmZpbmlzaFByb21pc2VSZXNvbHZlcigpO1xuXHR9XG5cbn1cbiJdfQ==