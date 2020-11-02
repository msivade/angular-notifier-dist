/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/notifier-animation.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { fade } from '../animation-presets/fade.animation-preset';
import { slide } from '../animation-presets/slide.animation-preset';
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
     * @param {?} direction    Animation direction, either in or out
     * @param {?} notification Notification the animation data should be generated for
     * @return {?} Animation information
     */
    getAnimationData(direction, notification) {
        // Get all necessary animation data
        /** @type {?} */
        let keyframes;
        /** @type {?} */
        let duration;
        /** @type {?} */
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
NotifierAnimationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NotifierAnimationService.ctorParameters = () => [];
if (false) {
    /**
     * List of animation presets (currently static)
     * @type {?}
     * @private
     */
    NotifierAnimationService.prototype.animationPresets;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItYW5pbWF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW5vdGlmaWVyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25vdGlmaWVyLWFuaW1hdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7O0FBTXBFLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFZcEM7UUFDQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDdkIsSUFBSTtZQUNKLEtBQUs7U0FDTCxDQUFDO0lBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7SUFZTSxnQkFBZ0IsQ0FBRSxTQUEwQixFQUFFLFlBQWtDOzs7WUFHbEYsU0FBMkM7O1lBQzNDLFFBQWdCOztZQUNoQixNQUFjO1FBQ2xCLElBQUssU0FBUyxLQUFLLE1BQU0sRUFBRztZQUMzQixTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxJQUFJLENBQUUsWUFBWSxDQUFFLENBQUM7WUFDcEgsUUFBUSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEUsTUFBTSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDbkU7YUFBTTtZQUNOLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDLElBQUksQ0FBRSxZQUFZLENBQUUsQ0FBQztZQUNwSCxRQUFRLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwRSxNQUFNLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNuRTtRQUVELGtDQUFrQztRQUNsQyxPQUFPO1lBQ04sU0FBUyxFQUFFO2dCQUNWLFNBQVMsQ0FBQyxJQUFJO2dCQUNkLFNBQVMsQ0FBQyxFQUFFO2FBQ1o7WUFDRCxPQUFPLEVBQUU7Z0JBQ1IsUUFBUTtnQkFDUixNQUFNO2dCQUNOLElBQUksRUFBRSxVQUFVLENBQUMsNERBQTREO2FBQzdFO1NBQ0QsQ0FBQztJQUVILENBQUM7OztZQTNERCxVQUFVOzs7Ozs7Ozs7O0lBTVYsb0RBRUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5vdGlmaWVyQW5pbWF0aW9uRGF0YSwgTm90aWZpZXJBbmltYXRpb25QcmVzZXQsIE5vdGlmaWVyQW5pbWF0aW9uUHJlc2V0S2V5ZnJhbWVzIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLWFuaW1hdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllck5vdGlmaWNhdGlvbiB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1ub3RpZmljYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgZmFkZSB9IGZyb20gJy4uL2FuaW1hdGlvbi1wcmVzZXRzL2ZhZGUuYW5pbWF0aW9uLXByZXNldCc7XG5pbXBvcnQgeyBzbGlkZSB9IGZyb20gJy4uL2FuaW1hdGlvbi1wcmVzZXRzL3NsaWRlLmFuaW1hdGlvbi1wcmVzZXQnO1xuXG4vKipcbiAqIE5vdGlmaWVyIGFuaW1hdGlvbiBzZXJ2aWNlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmllckFuaW1hdGlvblNlcnZpY2Uge1xuXG5cdC8qKlxuXHQgKiBMaXN0IG9mIGFuaW1hdGlvbiBwcmVzZXRzIChjdXJyZW50bHkgc3RhdGljKVxuXHQgKi9cblx0cHJpdmF0ZSByZWFkb25seSBhbmltYXRpb25QcmVzZXRzOiB7XG5cdFx0WyBhbmltYXRpb25QcmVzZXROYW1lOiBzdHJpbmcgXTogTm90aWZpZXJBbmltYXRpb25QcmVzZXRcblx0fTtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICovXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmFuaW1hdGlvblByZXNldHMgPSB7XG5cdFx0XHRmYWRlLFxuXHRcdFx0c2xpZGVcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhbmltYXRpb24gZGF0YVxuXHQgKlxuXHQgKiBUaGlzIG1ldGhvZCBnZW5lcmF0ZXMgYWxsIGRhdGEgdGhlIFdlYiBBbmltYXRpb25zIEFQSSBuZWVkcyB0byBhbmltYXRlIG91ciBub3RpZmljYXRpb24uIFRoZSByZXN1bHQgZGVwZW5kcyBvbiBib3RoIHRoZSBhbmltYXRpb25cblx0ICogZGlyZWN0aW9uIChlaXRoZXIgaW4gb3Igb3V0KSBhcyB3ZWxsIGFzIHRoZSBub3RpZmljYXRpb25zIChhbmQgaXRzIGF0dHJpYnV0ZXMpIGl0c2VsZi5cblx0ICpcblx0ICogQHBhcmFtICAgZGlyZWN0aW9uICAgIEFuaW1hdGlvbiBkaXJlY3Rpb24sIGVpdGhlciBpbiBvciBvdXRcblx0ICogQHBhcmFtICAgbm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbiB0aGUgYW5pbWF0aW9uIGRhdGEgc2hvdWxkIGJlIGdlbmVyYXRlZCBmb3Jcblx0ICogQHJldHVybnMgQW5pbWF0aW9uIGluZm9ybWF0aW9uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0QW5pbWF0aW9uRGF0YSggZGlyZWN0aW9uOiAnc2hvdycgfCAnaGlkZScsIG5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gKTogTm90aWZpZXJBbmltYXRpb25EYXRhIHtcblxuXHRcdC8vIEdldCBhbGwgbmVjZXNzYXJ5IGFuaW1hdGlvbiBkYXRhXG5cdFx0bGV0IGtleWZyYW1lczogTm90aWZpZXJBbmltYXRpb25QcmVzZXRLZXlmcmFtZXM7XG5cdFx0bGV0IGR1cmF0aW9uOiBudW1iZXI7XG5cdFx0bGV0IGVhc2luZzogc3RyaW5nO1xuXHRcdGlmICggZGlyZWN0aW9uID09PSAnc2hvdycgKSB7XG5cdFx0XHRrZXlmcmFtZXMgPSB0aGlzLmFuaW1hdGlvblByZXNldHNbIG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0Q29uZmlnKCkuYW5pbWF0aW9ucy5zaG93LnByZXNldCBdLnNob3coIG5vdGlmaWNhdGlvbiApO1xuXHRcdFx0ZHVyYXRpb24gPSBub3RpZmljYXRpb24uY29tcG9uZW50LmdldENvbmZpZygpLmFuaW1hdGlvbnMuc2hvdy5zcGVlZDtcblx0XHRcdGVhc2luZyA9IG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0Q29uZmlnKCkuYW5pbWF0aW9ucy5zaG93LmVhc2luZztcblx0XHR9IGVsc2Uge1xuXHRcdFx0a2V5ZnJhbWVzID0gdGhpcy5hbmltYXRpb25QcmVzZXRzWyBub3RpZmljYXRpb24uY29tcG9uZW50LmdldENvbmZpZygpLmFuaW1hdGlvbnMuaGlkZS5wcmVzZXQgXS5oaWRlKCBub3RpZmljYXRpb24gKTtcblx0XHRcdGR1cmF0aW9uID0gbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRDb25maWcoKS5hbmltYXRpb25zLmhpZGUuc3BlZWQ7XG5cdFx0XHRlYXNpbmcgPSBub3RpZmljYXRpb24uY29tcG9uZW50LmdldENvbmZpZygpLmFuaW1hdGlvbnMuaGlkZS5lYXNpbmc7XG5cdFx0fVxuXG5cdFx0Ly8gQnVpbGQgYW5kIHJldHVybiBhbmltYXRpb24gZGF0YVxuXHRcdHJldHVybiB7XG5cdFx0XHRrZXlmcmFtZXM6IFtcblx0XHRcdFx0a2V5ZnJhbWVzLmZyb20sXG5cdFx0XHRcdGtleWZyYW1lcy50b1xuXHRcdFx0XSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0ZHVyYXRpb24sXG5cdFx0XHRcdGVhc2luZyxcblx0XHRcdFx0ZmlsbDogJ2ZvcndhcmRzJyAvLyBLZWVwIHRoZSBuZXdseSBwYWludGVkIHN0YXRlIGFmdGVyIHRoZSBhbmltYXRpb24gZmluaXNoZWRcblx0XHRcdH1cblx0XHR9O1xuXG5cdH1cblxufVxuIl19