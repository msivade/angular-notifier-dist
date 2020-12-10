import { Injectable } from '@angular/core';
import { fade } from '../animation-presets/fade.animation-preset';
import { slide } from '../animation-presets/slide.animation-preset';
import * as i0 from "@angular/core";
/**
 * Notifier animation service
 */
export class NotifierAnimationService {
    /**
     * Constructor
     */
    constructor() {
        this.animationPresets = {
            fade,
            slide
        };
    }
    /**
     * Get animation data
     *
     * This method generates all data the Web Animations API needs to animate our notification. The result depends on both the animation
     * direction (either in or out) as well as the notifications (and its attributes) itself.
     *
     * @param   direction    Animation direction, either in or out
     * @param   notification Notification the animation data should be generated for
     * @returns Animation information
     */
    getAnimationData(direction, notification) {
        // Get all necessary animation data
        let keyframes;
        let duration;
        let easing;
        if (direction === 'show') {
            keyframes = this.animationPresets[notification.component.getConfig().animations.show.preset].show(notification);
            duration = notification.component.getConfig().animations.show.speed;
            easing = notification.component.getConfig().animations.show.easing;
        }
        else {
            keyframes = this.animationPresets[notification.component.getConfig().animations.hide.preset].hide(notification);
            duration = notification.component.getConfig().animations.hide.speed;
            easing = notification.component.getConfig().animations.hide.easing;
        }
        // Build and return animation data
        return {
            keyframes: [
                keyframes.from,
                keyframes.to
            ],
            options: {
                duration,
                easing,
                fill: 'forwards' // Keep the newly painted state after the animation finished
            }
        };
    }
}
/** @nocollapse */ NotifierAnimationService.ɵfac = function NotifierAnimationService_Factory(t) { return new (t || NotifierAnimationService)(); };
/** @nocollapse */ NotifierAnimationService.ɵprov = i0.ɵɵdefineInjectable({ token: NotifierAnimationService, factory: NotifierAnimationService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NotifierAnimationService, [{
        type: Injectable
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItYW5pbWF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbXNpdmFkZS9EZXYvcHJvamVjdHMvYW5ndWxhci1ub3RpZmllci9wcm9qZWN0cy9hbmd1bGFyLW5vdGlmaWVyL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9ub3RpZmllci1hbmltYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7O0FBRXBFOztHQUVHO0FBRUgsTUFBTSxPQUFPLHdCQUF3QjtJQVNwQzs7T0FFRztJQUNIO1FBQ0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQ3ZCLElBQUk7WUFDSixLQUFLO1NBQ0wsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSxnQkFBZ0IsQ0FBRSxTQUEwQixFQUFFLFlBQWtDO1FBRXRGLG1DQUFtQztRQUNuQyxJQUFJLFNBQTJDLENBQUM7UUFDaEQsSUFBSSxRQUFnQixDQUFDO1FBQ3JCLElBQUksTUFBYyxDQUFDO1FBQ25CLElBQUssU0FBUyxLQUFLLE1BQU0sRUFBRztZQUMzQixTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxJQUFJLENBQUUsWUFBWSxDQUFFLENBQUM7WUFDcEgsUUFBUSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEUsTUFBTSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDbkU7YUFBTTtZQUNOLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDLElBQUksQ0FBRSxZQUFZLENBQUUsQ0FBQztZQUNwSCxRQUFRLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwRSxNQUFNLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNuRTtRQUVELGtDQUFrQztRQUNsQyxPQUFPO1lBQ04sU0FBUyxFQUFFO2dCQUNWLFNBQVMsQ0FBQyxJQUFJO2dCQUNkLFNBQVMsQ0FBQyxFQUFFO2FBQ1o7WUFDRCxPQUFPLEVBQUU7Z0JBQ1IsUUFBUTtnQkFDUixNQUFNO2dCQUNOLElBQUksRUFBRSxVQUFVLENBQUMsNERBQTREO2FBQzdFO1NBQ0QsQ0FBQztJQUVILENBQUM7O21IQTFEVyx3QkFBd0I7bUZBQXhCLHdCQUF3QixXQUF4Qix3QkFBd0I7a0RBQXhCLHdCQUF3QjtjQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOb3RpZmllckFuaW1hdGlvbkRhdGEsIE5vdGlmaWVyQW5pbWF0aW9uUHJlc2V0LCBOb3RpZmllckFuaW1hdGlvblByZXNldEtleWZyYW1lcyB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1hbmltYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpZXJOb3RpZmljYXRpb24gfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItbm90aWZpY2F0aW9uLm1vZGVsJztcbmltcG9ydCB7IGZhZGUgfSBmcm9tICcuLi9hbmltYXRpb24tcHJlc2V0cy9mYWRlLmFuaW1hdGlvbi1wcmVzZXQnO1xuaW1wb3J0IHsgc2xpZGUgfSBmcm9tICcuLi9hbmltYXRpb24tcHJlc2V0cy9zbGlkZS5hbmltYXRpb24tcHJlc2V0JztcblxuLyoqXG4gKiBOb3RpZmllciBhbmltYXRpb24gc2VydmljZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpZXJBbmltYXRpb25TZXJ2aWNlIHtcblxuXHQvKipcblx0ICogTGlzdCBvZiBhbmltYXRpb24gcHJlc2V0cyAoY3VycmVudGx5IHN0YXRpYylcblx0ICovXG5cdHByaXZhdGUgcmVhZG9ubHkgYW5pbWF0aW9uUHJlc2V0czoge1xuXHRcdFsgYW5pbWF0aW9uUHJlc2V0TmFtZTogc3RyaW5nIF06IE5vdGlmaWVyQW5pbWF0aW9uUHJlc2V0XG5cdH07XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yXG5cdCAqL1xuXHRwdWJsaWMgY29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5hbmltYXRpb25QcmVzZXRzID0ge1xuXHRcdFx0ZmFkZSxcblx0XHRcdHNsaWRlXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYW5pbWF0aW9uIGRhdGFcblx0ICpcblx0ICogVGhpcyBtZXRob2QgZ2VuZXJhdGVzIGFsbCBkYXRhIHRoZSBXZWIgQW5pbWF0aW9ucyBBUEkgbmVlZHMgdG8gYW5pbWF0ZSBvdXIgbm90aWZpY2F0aW9uLiBUaGUgcmVzdWx0IGRlcGVuZHMgb24gYm90aCB0aGUgYW5pbWF0aW9uXG5cdCAqIGRpcmVjdGlvbiAoZWl0aGVyIGluIG9yIG91dCkgYXMgd2VsbCBhcyB0aGUgbm90aWZpY2F0aW9ucyAoYW5kIGl0cyBhdHRyaWJ1dGVzKSBpdHNlbGYuXG5cdCAqXG5cdCAqIEBwYXJhbSAgIGRpcmVjdGlvbiAgICBBbmltYXRpb24gZGlyZWN0aW9uLCBlaXRoZXIgaW4gb3Igb3V0XG5cdCAqIEBwYXJhbSAgIG5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb24gdGhlIGFuaW1hdGlvbiBkYXRhIHNob3VsZCBiZSBnZW5lcmF0ZWQgZm9yXG5cdCAqIEByZXR1cm5zIEFuaW1hdGlvbiBpbmZvcm1hdGlvblxuXHQgKi9cblx0cHVibGljIGdldEFuaW1hdGlvbkRhdGEoIGRpcmVjdGlvbjogJ3Nob3cnIHwgJ2hpZGUnLCBub3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uICk6IE5vdGlmaWVyQW5pbWF0aW9uRGF0YSB7XG5cblx0XHQvLyBHZXQgYWxsIG5lY2Vzc2FyeSBhbmltYXRpb24gZGF0YVxuXHRcdGxldCBrZXlmcmFtZXM6IE5vdGlmaWVyQW5pbWF0aW9uUHJlc2V0S2V5ZnJhbWVzO1xuXHRcdGxldCBkdXJhdGlvbjogbnVtYmVyO1xuXHRcdGxldCBlYXNpbmc6IHN0cmluZztcblx0XHRpZiAoIGRpcmVjdGlvbiA9PT0gJ3Nob3cnICkge1xuXHRcdFx0a2V5ZnJhbWVzID0gdGhpcy5hbmltYXRpb25QcmVzZXRzWyBub3RpZmljYXRpb24uY29tcG9uZW50LmdldENvbmZpZygpLmFuaW1hdGlvbnMuc2hvdy5wcmVzZXQgXS5zaG93KCBub3RpZmljYXRpb24gKTtcblx0XHRcdGR1cmF0aW9uID0gbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRDb25maWcoKS5hbmltYXRpb25zLnNob3cuc3BlZWQ7XG5cdFx0XHRlYXNpbmcgPSBub3RpZmljYXRpb24uY29tcG9uZW50LmdldENvbmZpZygpLmFuaW1hdGlvbnMuc2hvdy5lYXNpbmc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGtleWZyYW1lcyA9IHRoaXMuYW5pbWF0aW9uUHJlc2V0c1sgbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRDb25maWcoKS5hbmltYXRpb25zLmhpZGUucHJlc2V0IF0uaGlkZSggbm90aWZpY2F0aW9uICk7XG5cdFx0XHRkdXJhdGlvbiA9IG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0Q29uZmlnKCkuYW5pbWF0aW9ucy5oaWRlLnNwZWVkO1xuXHRcdFx0ZWFzaW5nID0gbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRDb25maWcoKS5hbmltYXRpb25zLmhpZGUuZWFzaW5nO1xuXHRcdH1cblxuXHRcdC8vIEJ1aWxkIGFuZCByZXR1cm4gYW5pbWF0aW9uIGRhdGFcblx0XHRyZXR1cm4ge1xuXHRcdFx0a2V5ZnJhbWVzOiBbXG5cdFx0XHRcdGtleWZyYW1lcy5mcm9tLFxuXHRcdFx0XHRrZXlmcmFtZXMudG9cblx0XHRcdF0sXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGR1cmF0aW9uLFxuXHRcdFx0XHRlYXNpbmcsXG5cdFx0XHRcdGZpbGw6ICdmb3J3YXJkcycgLy8gS2VlcCB0aGUgbmV3bHkgcGFpbnRlZCBzdGF0ZSBhZnRlciB0aGUgYW5pbWF0aW9uIGZpbmlzaGVkXG5cdFx0XHR9XG5cdFx0fTtcblxuXHR9XG5cbn1cbiJdfQ==