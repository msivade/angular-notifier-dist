/**
 * @fileoverview added by tsickle
 * Generated from: lib/models/notifier-animation.model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Notifier animation data
 *
 * This interface describes an object containing all information necessary to run an animation, in particular to run an animation with the
 * all new (shiny) Web Animations API. When other components or services request data for an animation they have to run, this is the object
 * they get back from the animation service.
 *
 * Technical sidenote:
 * Nope, it's not a coincidence - the structure looks similar to the Web Animation API syntax.
 * @record
 */
export function NotifierAnimationData() { }
if (false) {
    /**
     * Animation keyframes; the first index ctonaining changes for animate-in, the second index those for animate-out
     * @type {?}
     */
    NotifierAnimationData.prototype.keyframes;
    /**
     * Futher animation options
     * @type {?}
     */
    NotifierAnimationData.prototype.options;
}
/**
 * Notifier animation preset
 *
 * This interface describes the structure of an animation preset, defining the keyframes for both animating-in and animating-out. Animation
 * presets are always defined outside the animation service, and therefore one day may become part of some new API.
 * @record
 */
export function NotifierAnimationPreset() { }
if (false) {
    /**
     * Function generating the keyframes for animating-out
     * @type {?}
     */
    NotifierAnimationPreset.prototype.hide;
    /**
     * Function generating the keyframes for animating-in
     * @type {?}
     */
    NotifierAnimationPreset.prototype.show;
}
/**
 * Notifier animation keyframes
 *
 * This interface describes the data, in particular all the keyframes animation presets return.
 * @record
 */
export function NotifierAnimationPresetKeyframes() { }
if (false) {
    /**
     * CSS attributes before the animation starts
     * @type {?}
     */
    NotifierAnimationPresetKeyframes.prototype.from;
    /**
     * CSS attributes after the animation ends
     * @type {?}
     */
    NotifierAnimationPresetKeyframes.prototype.to;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItYW5pbWF0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ub3RpZmllci8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvbm90aWZpZXItYW5pbWF0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSwyQ0ErQkM7Ozs7OztJQTFCQSwwQ0FFRzs7Ozs7SUFLSCx3Q0FpQkU7Ozs7Ozs7OztBQVVILDZDQVlDOzs7Ozs7SUFQQSx1Q0FBaUY7Ozs7O0lBS2pGLHVDQUFpRjs7Ozs7Ozs7QUFTbEYsc0RBZ0JDOzs7Ozs7SUFYQSxnREFFRTs7Ozs7SUFLRiw4Q0FFRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vdGlmaWVyTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9ub3RpZmllci1ub3RpZmljYXRpb24ubW9kZWwnO1xuXG4vKipcbiAqIE5vdGlmaWVyIGFuaW1hdGlvbiBkYXRhXG4gKlxuICogVGhpcyBpbnRlcmZhY2UgZGVzY3JpYmVzIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCBpbmZvcm1hdGlvbiBuZWNlc3NhcnkgdG8gcnVuIGFuIGFuaW1hdGlvbiwgaW4gcGFydGljdWxhciB0byBydW4gYW4gYW5pbWF0aW9uIHdpdGggdGhlXG4gKiBhbGwgbmV3IChzaGlueSkgV2ViIEFuaW1hdGlvbnMgQVBJLiBXaGVuIG90aGVyIGNvbXBvbmVudHMgb3Igc2VydmljZXMgcmVxdWVzdCBkYXRhIGZvciBhbiBhbmltYXRpb24gdGhleSBoYXZlIHRvIHJ1biwgdGhpcyBpcyB0aGUgb2JqZWN0XG4gKiB0aGV5IGdldCBiYWNrIGZyb20gdGhlIGFuaW1hdGlvbiBzZXJ2aWNlLlxuICpcbiAqIFRlY2huaWNhbCBzaWRlbm90ZTpcbiAqIE5vcGUsIGl0J3Mgbm90IGEgY29pbmNpZGVuY2UgLSB0aGUgc3RydWN0dXJlIGxvb2tzIHNpbWlsYXIgdG8gdGhlIFdlYiBBbmltYXRpb24gQVBJIHN5bnRheC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOb3RpZmllckFuaW1hdGlvbkRhdGEge1xuXG5cdC8qKlxuXHQgKiBBbmltYXRpb24ga2V5ZnJhbWVzOyB0aGUgZmlyc3QgaW5kZXggY3RvbmFpbmluZyBjaGFuZ2VzIGZvciBhbmltYXRlLWluLCB0aGUgc2Vjb25kIGluZGV4IHRob3NlIGZvciBhbmltYXRlLW91dFxuXHQgKi9cblx0a2V5ZnJhbWVzOiBBcnJheTx7XG5cdFx0WyBhbmltYXRhYmxlUHJvcGVydHlOYW1lOiBzdHJpbmcgXTogc3RyaW5nO1xuXHR9PjtcblxuXHQvKipcblx0ICogRnV0aGVyIGFuaW1hdGlvbiBvcHRpb25zXG5cdCAqL1xuXHRvcHRpb25zOiB7XG5cblx0XHQvKipcblx0XHQgKiBBbmltYXRpb24gZHVyYXRpb24sIGluIG1zXG5cdFx0ICovXG5cdFx0ZHVyYXRpb246IG51bWJlcjtcblxuXHRcdC8qKlxuXHRcdCAqIEFuaW1hdGlvbiBlYXNpbmcgZnVuY3Rpb24gKGNvbXAuIENTUyBlYXNpbmcgZnVuY3Rpb25zKVxuXHRcdCAqL1xuXHRcdGVhc2luZz86ICdsaW5lYXInIHwgJ2Vhc2UnIHwgJ2Vhc2UtaW4nIHwgJ2Vhc2Utb3V0JyB8ICdlYXNlLWluLW91dCcgfCBzdHJpbmc7XG5cblx0XHQvKipcblx0XHQgKiBBbmltYXRpb24gZmlsbCBtb2RlXG5cdFx0ICovXG5cdFx0ZmlsbDogJ25vbmUnIHwgJ2ZvcndhcmRzJyB8ICdiYWNrd2FyZHMnO1xuXG5cdH07XG5cbn1cblxuLyoqXG4gKiBOb3RpZmllciBhbmltYXRpb24gcHJlc2V0XG4gKlxuICogVGhpcyBpbnRlcmZhY2UgZGVzY3JpYmVzIHRoZSBzdHJ1Y3R1cmUgb2YgYW4gYW5pbWF0aW9uIHByZXNldCwgZGVmaW5pbmcgdGhlIGtleWZyYW1lcyBmb3IgYm90aCBhbmltYXRpbmctaW4gYW5kIGFuaW1hdGluZy1vdXQuIEFuaW1hdGlvblxuICogcHJlc2V0cyBhcmUgYWx3YXlzIGRlZmluZWQgb3V0c2lkZSB0aGUgYW5pbWF0aW9uIHNlcnZpY2UsIGFuZCB0aGVyZWZvcmUgb25lIGRheSBtYXkgYmVjb21lIHBhcnQgb2Ygc29tZSBuZXcgQVBJLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWVyQW5pbWF0aW9uUHJlc2V0IHtcblxuXHQvKipcblx0ICogRnVuY3Rpb24gZ2VuZXJhdGluZyB0aGUga2V5ZnJhbWVzIGZvciBhbmltYXRpbmctb3V0XG5cdCAqL1xuXHRoaWRlOiAoIG5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gKSA9PiBOb3RpZmllckFuaW1hdGlvblByZXNldEtleWZyYW1lcztcblxuXHQvKipcblx0ICogRnVuY3Rpb24gZ2VuZXJhdGluZyB0aGUga2V5ZnJhbWVzIGZvciBhbmltYXRpbmctaW5cblx0ICovXG5cdHNob3c6ICggbm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiApID0+IE5vdGlmaWVyQW5pbWF0aW9uUHJlc2V0S2V5ZnJhbWVzO1xuXG59XG5cbi8qKlxuICogTm90aWZpZXIgYW5pbWF0aW9uIGtleWZyYW1lc1xuICpcbiAqIFRoaXMgaW50ZXJmYWNlIGRlc2NyaWJlcyB0aGUgZGF0YSwgaW4gcGFydGljdWxhciBhbGwgdGhlIGtleWZyYW1lcyBhbmltYXRpb24gcHJlc2V0cyByZXR1cm4uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTm90aWZpZXJBbmltYXRpb25QcmVzZXRLZXlmcmFtZXMge1xuXG5cdC8qKlxuXHQgKiBDU1MgYXR0cmlidXRlcyBiZWZvcmUgdGhlIGFuaW1hdGlvbiBzdGFydHNcblx0ICovXG5cdGZyb206IHtcblx0XHRbIGFuaW1hdGFibGVQcm9wZXJ0eU5hbWU6IHN0cmluZyBdOiBzdHJpbmc7XG5cdH07XG5cblx0LyoqXG5cdCAqIENTUyBhdHRyaWJ1dGVzIGFmdGVyIHRoZSBhbmltYXRpb24gZW5kc1xuXHQgKi9cblx0dG86IHtcblx0XHRbIGFuaW1hdGFibGVQcm9wZXJ0eU5hbWU6IHN0cmluZyBdOiBzdHJpbmc7XG5cdH07XG5cbn1cbiJdfQ==