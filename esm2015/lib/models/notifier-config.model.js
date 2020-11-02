/**
 * @fileoverview added by tsickle
 * Generated from: lib/models/notifier-config.model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Notifier options
 * @record
 */
export function NotifierOptions() { }
if (false) {
    /** @type {?|undefined} */
    NotifierOptions.prototype.animations;
    /** @type {?|undefined} */
    NotifierOptions.prototype.behaviour;
    /** @type {?|undefined} */
    NotifierOptions.prototype.position;
    /** @type {?|undefined} */
    NotifierOptions.prototype.theme;
}
/**
 * Notifier configuration
 *
 * The notifier configuration defines what notifications look like, how they behave, and how they get animated. It is a global
 * configuration, which means that it only can be set once (at the beginning), and cannot be changed afterwards. Aligning to the world of
 * Angular, this configuration can be provided in the root app module - alternatively, a meaningful default configuration will be used.
 */
export class NotifierConfig {
    /**
     * Constructor
     *
     * @param {?=} customOptions
     */
    constructor(customOptions = {}) {
        // Set default values
        this.animations = {
            enabled: true,
            hide: {
                easing: 'ease',
                offset: 50,
                preset: 'fade',
                speed: 300
            },
            overlap: 150,
            shift: {
                easing: 'ease',
                speed: 300
            },
            show: {
                easing: 'ease',
                preset: 'slide',
                speed: 300
            }
        };
        this.behaviour = {
            autoHide: 7000,
            onClick: false,
            onMouseover: 'pauseAutoHide',
            showDismissButton: true,
            stacking: 4
        };
        this.position = {
            horizontal: {
                distance: 12,
                position: 'left'
            },
            vertical: {
                distance: 12,
                gap: 10,
                position: 'bottom'
            }
        };
        this.theme = 'material';
        // The following merges the custom options into the notifier config, respecting the already set default values
        // This linear, more explicit and code-sizy workflow is preferred here over a recursive one (because we know the object structure)
        // Technical sidenote: Objects are merged, other types of values simply overwritten / copied
        if (customOptions.theme !== undefined) {
            this.theme = customOptions.theme;
        }
        if (customOptions.animations !== undefined) {
            if (customOptions.animations.enabled !== undefined) {
                this.animations.enabled = customOptions.animations.enabled;
            }
            if (customOptions.animations.overlap !== undefined) {
                this.animations.overlap = customOptions.animations.overlap;
            }
            if (customOptions.animations.hide !== undefined) {
                Object.assign(this.animations.hide, customOptions.animations.hide);
            }
            if (customOptions.animations.shift !== undefined) {
                Object.assign(this.animations.shift, customOptions.animations.shift);
            }
            if (customOptions.animations.show !== undefined) {
                Object.assign(this.animations.show, customOptions.animations.show);
            }
        }
        if (customOptions.behaviour !== undefined) {
            Object.assign(this.behaviour, customOptions.behaviour);
        }
        if (customOptions.position !== undefined) {
            if (customOptions.position.horizontal !== undefined) {
                Object.assign(this.position.horizontal, customOptions.position.horizontal);
            }
            if (customOptions.position.vertical !== undefined) {
                Object.assign(this.position.vertical, customOptions.position.vertical);
            }
        }
    }
}
if (false) {
    /**
     * Customize animations
     * @type {?}
     */
    NotifierConfig.prototype.animations;
    /**
     * Customize behaviour
     * @type {?}
     */
    NotifierConfig.prototype.behaviour;
    /**
     * Customize positioning
     * @type {?}
     */
    NotifierConfig.prototype.position;
    /**
     * Customize theming
     * @type {?}
     */
    NotifierConfig.prototype.theme;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItY29uZmlnLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ub3RpZmllci8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvbm90aWZpZXItY29uZmlnLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBLHFDQXVDQzs7O0lBdENBLHFDQWtCRTs7SUFDRixvQ0FNRTs7SUFDRixtQ0FVRTs7SUFDRixnQ0FBZTs7Ozs7Ozs7O0FBVWhCLE1BQU0sT0FBTyxjQUFjOzs7Ozs7SUE2RDFCLFlBQW9CLGdCQUFpQyxFQUFFO1FBRXRELHFCQUFxQjtRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2pCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFO2dCQUNMLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE1BQU0sRUFBRSxFQUFFO2dCQUNWLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ1Y7WUFDRCxPQUFPLEVBQUUsR0FBRztZQUNaLEtBQUssRUFBRTtnQkFDTixNQUFNLEVBQUUsTUFBTTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNWO1lBQ0QsSUFBSSxFQUFFO2dCQUNMLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE1BQU0sRUFBRSxPQUFPO2dCQUNmLEtBQUssRUFBRSxHQUFHO2FBQ1Y7U0FDRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNoQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxLQUFLO1lBQ2QsV0FBVyxFQUFFLGVBQWU7WUFDNUIsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixRQUFRLEVBQUUsQ0FBQztTQUNYLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ2YsVUFBVSxFQUFFO2dCQUNYLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFFBQVEsRUFBRSxNQUFNO2FBQ2hCO1lBQ0QsUUFBUSxFQUFFO2dCQUNULFFBQVEsRUFBRSxFQUFFO2dCQUNaLEdBQUcsRUFBRSxFQUFFO2dCQUNQLFFBQVEsRUFBRSxRQUFRO2FBQ2xCO1NBQ0QsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBRXhCLDhHQUE4RztRQUM5RyxrSUFBa0k7UUFDbEksNEZBQTRGO1FBQzVGLElBQUssYUFBYSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUc7WUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSyxhQUFhLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRztZQUM3QyxJQUFLLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRztnQkFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7YUFDM0Q7WUFDRCxJQUFLLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRztnQkFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7YUFDM0Q7WUFDRCxJQUFLLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRztnQkFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO2FBQ3JFO1lBQ0QsSUFBSyxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUc7Z0JBQ25ELE1BQU0sQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUUsQ0FBQzthQUN2RTtZQUNELElBQUssYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFHO2dCQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFFLENBQUM7YUFDckU7U0FDRDtRQUNELElBQUssYUFBYSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUc7WUFDNUMsTUFBTSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUUsQ0FBQztTQUN6RDtRQUNELElBQUssYUFBYSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUc7WUFDM0MsSUFBSyxhQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUc7Z0JBQ3RELE1BQU0sQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUUsQ0FBQzthQUM3RTtZQUNELElBQUssYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFHO2dCQUNwRCxNQUFNLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFFLENBQUM7YUFDekU7U0FDRDtJQUVGLENBQUM7Q0FFRDs7Ozs7O0lBdklBLG9DQWtCRTs7Ozs7SUFLRixtQ0FNRTs7Ozs7SUFLRixrQ0FVRTs7Ozs7SUFLRiwrQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE5vdGlmaWVyIG9wdGlvbnNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOb3RpZmllck9wdGlvbnMge1xuXHRhbmltYXRpb25zPzoge1xuXHRcdGVuYWJsZWQ/OiBib29sZWFuO1xuXHRcdGhpZGU/OiB7XG5cdFx0XHRlYXNpbmc/OiBzdHJpbmc7XG5cdFx0XHRvZmZzZXQ/OiBudW1iZXIgfCBmYWxzZTtcblx0XHRcdHByZXNldD86IHN0cmluZztcblx0XHRcdHNwZWVkPzogbnVtYmVyO1xuXHRcdH07XG5cdFx0b3ZlcmxhcD86IG51bWJlciB8IGZhbHNlO1xuXHRcdHNoaWZ0Pzoge1xuXHRcdFx0ZWFzaW5nPzogc3RyaW5nO1xuXHRcdFx0c3BlZWQ/OiBudW1iZXI7XG5cdFx0fTtcblx0XHRzaG93Pzoge1xuXHRcdFx0ZWFzaW5nPzogc3RyaW5nO1xuXHRcdFx0cHJlc2V0Pzogc3RyaW5nO1xuXHRcdFx0c3BlZWQ/OiBudW1iZXI7XG5cdFx0fTtcblx0fTtcblx0YmVoYXZpb3VyPzoge1xuXHRcdGF1dG9IaWRlPzogbnVtYmVyIHwgZmFsc2U7XG5cdFx0b25DbGljaz86ICdoaWRlJyB8IGZhbHNlO1xuXHRcdG9uTW91c2VvdmVyPzogJ3BhdXNlQXV0b0hpZGUnIHwgJ3Jlc2V0QXV0b0hpZGUnIHwgZmFsc2U7XG5cdFx0c2hvd0Rpc21pc3NCdXR0b24/OiBib29sZWFuO1xuXHRcdHN0YWNraW5nPzogbnVtYmVyIHwgZmFsc2U7XG5cdH07XG5cdHBvc2l0aW9uPzoge1xuXHRcdGhvcml6b250YWw/OiB7XG5cdFx0XHRkaXN0YW5jZT86IG51bWJlcjtcblx0XHRcdHBvc2l0aW9uPzogJ2xlZnQnIHwgJ21pZGRsZScgfCAncmlnaHQnO1xuXHRcdH07XG5cdFx0dmVydGljYWw/OiB7XG5cdFx0XHRkaXN0YW5jZT86IG51bWJlcjtcblx0XHRcdGdhcD86IG51bWJlcjtcblx0XHRcdHBvc2l0aW9uPzogJ3RvcCcgfCAnYm90dG9tJztcblx0XHR9O1xuXHR9O1xuXHR0aGVtZT86IHN0cmluZztcbn1cblxuLyoqXG4gKiBOb3RpZmllciBjb25maWd1cmF0aW9uXG4gKlxuICogVGhlIG5vdGlmaWVyIGNvbmZpZ3VyYXRpb24gZGVmaW5lcyB3aGF0IG5vdGlmaWNhdGlvbnMgbG9vayBsaWtlLCBob3cgdGhleSBiZWhhdmUsIGFuZCBob3cgdGhleSBnZXQgYW5pbWF0ZWQuIEl0IGlzIGEgZ2xvYmFsXG4gKiBjb25maWd1cmF0aW9uLCB3aGljaCBtZWFucyB0aGF0IGl0IG9ubHkgY2FuIGJlIHNldCBvbmNlIChhdCB0aGUgYmVnaW5uaW5nKSwgYW5kIGNhbm5vdCBiZSBjaGFuZ2VkIGFmdGVyd2FyZHMuIEFsaWduaW5nIHRvIHRoZSB3b3JsZCBvZlxuICogQW5ndWxhciwgdGhpcyBjb25maWd1cmF0aW9uIGNhbiBiZSBwcm92aWRlZCBpbiB0aGUgcm9vdCBhcHAgbW9kdWxlIC0gYWx0ZXJuYXRpdmVseSwgYSBtZWFuaW5nZnVsIGRlZmF1bHQgY29uZmlndXJhdGlvbiB3aWxsIGJlIHVzZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb3RpZmllckNvbmZpZyBpbXBsZW1lbnRzIE5vdGlmaWVyT3B0aW9ucyB7XG5cblx0LyoqXG5cdCAqIEN1c3RvbWl6ZSBhbmltYXRpb25zXG5cdCAqL1xuXHRwdWJsaWMgYW5pbWF0aW9uczoge1xuXHRcdGVuYWJsZWQ6IGJvb2xlYW47XG5cdFx0aGlkZToge1xuXHRcdFx0ZWFzaW5nOiBzdHJpbmc7XG5cdFx0XHRvZmZzZXQ6IG51bWJlciB8IGZhbHNlO1xuXHRcdFx0cHJlc2V0OiBzdHJpbmc7XG5cdFx0XHRzcGVlZDogbnVtYmVyO1xuXHRcdH07XG5cdFx0b3ZlcmxhcDogbnVtYmVyIHwgZmFsc2U7XG5cdFx0c2hpZnQ6IHtcblx0XHRcdGVhc2luZzogc3RyaW5nO1xuXHRcdFx0c3BlZWQ6IG51bWJlcjtcblx0XHR9O1xuXHRcdHNob3c6IHtcblx0XHRcdGVhc2luZzogc3RyaW5nO1xuXHRcdFx0cHJlc2V0OiBzdHJpbmc7XG5cdFx0XHRzcGVlZDogbnVtYmVyO1xuXHRcdH07XG5cdH07XG5cblx0LyoqXG5cdCAqIEN1c3RvbWl6ZSBiZWhhdmlvdXJcblx0ICovXG5cdHB1YmxpYyBiZWhhdmlvdXI6IHtcblx0XHRhdXRvSGlkZTogbnVtYmVyIHwgZmFsc2U7XG5cdFx0b25DbGljazogJ2hpZGUnIHwgZmFsc2U7XG5cdFx0b25Nb3VzZW92ZXI6ICdwYXVzZUF1dG9IaWRlJyB8ICdyZXNldEF1dG9IaWRlJyB8IGZhbHNlO1xuXHRcdHNob3dEaXNtaXNzQnV0dG9uOiBib29sZWFuO1xuXHRcdHN0YWNraW5nOiBudW1iZXIgfCBmYWxzZTtcblx0fTtcblxuXHQvKipcblx0ICogQ3VzdG9taXplIHBvc2l0aW9uaW5nXG5cdCAqL1xuXHRwdWJsaWMgcG9zaXRpb246IHtcblx0XHRob3Jpem9udGFsOiB7XG5cdFx0XHRkaXN0YW5jZTogbnVtYmVyO1xuXHRcdFx0cG9zaXRpb246ICdsZWZ0JyB8ICdtaWRkbGUnIHwgJ3JpZ2h0Jztcblx0XHR9O1xuXHRcdHZlcnRpY2FsOiB7XG5cdFx0XHRkaXN0YW5jZTogbnVtYmVyO1xuXHRcdFx0Z2FwOiBudW1iZXI7XG5cdFx0XHRwb3NpdGlvbjogJ3RvcCcgfCAnYm90dG9tJztcblx0XHR9O1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDdXN0b21pemUgdGhlbWluZ1xuXHQgKi9cblx0cHVibGljIHRoZW1lOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSBbY3VzdG9tT3B0aW9ucz17fV0gQ3VzdG9tIG5vdGlmaWVyIG9wdGlvbnMsIG9wdGlvbmFsXG5cdCAqL1xuXHRwdWJsaWMgY29uc3RydWN0b3IoIGN1c3RvbU9wdGlvbnM6IE5vdGlmaWVyT3B0aW9ucyA9IHt9ICkge1xuXG5cdFx0Ly8gU2V0IGRlZmF1bHQgdmFsdWVzXG5cdFx0dGhpcy5hbmltYXRpb25zID0ge1xuXHRcdFx0ZW5hYmxlZDogdHJ1ZSxcblx0XHRcdGhpZGU6IHtcblx0XHRcdFx0ZWFzaW5nOiAnZWFzZScsXG5cdFx0XHRcdG9mZnNldDogNTAsXG5cdFx0XHRcdHByZXNldDogJ2ZhZGUnLFxuXHRcdFx0XHRzcGVlZDogMzAwXG5cdFx0XHR9LFxuXHRcdFx0b3ZlcmxhcDogMTUwLFxuXHRcdFx0c2hpZnQ6IHtcblx0XHRcdFx0ZWFzaW5nOiAnZWFzZScsXG5cdFx0XHRcdHNwZWVkOiAzMDBcblx0XHRcdH0sXG5cdFx0XHRzaG93OiB7XG5cdFx0XHRcdGVhc2luZzogJ2Vhc2UnLFxuXHRcdFx0XHRwcmVzZXQ6ICdzbGlkZScsXG5cdFx0XHRcdHNwZWVkOiAzMDBcblx0XHRcdH1cblx0XHR9O1xuXHRcdHRoaXMuYmVoYXZpb3VyID0ge1xuXHRcdFx0YXV0b0hpZGU6IDcwMDAsXG5cdFx0XHRvbkNsaWNrOiBmYWxzZSxcblx0XHRcdG9uTW91c2VvdmVyOiAncGF1c2VBdXRvSGlkZScsXG5cdFx0XHRzaG93RGlzbWlzc0J1dHRvbjogdHJ1ZSxcblx0XHRcdHN0YWNraW5nOiA0XG5cdFx0fTtcblx0XHR0aGlzLnBvc2l0aW9uID0ge1xuXHRcdFx0aG9yaXpvbnRhbDoge1xuXHRcdFx0XHRkaXN0YW5jZTogMTIsXG5cdFx0XHRcdHBvc2l0aW9uOiAnbGVmdCdcblx0XHRcdH0sXG5cdFx0XHR2ZXJ0aWNhbDoge1xuXHRcdFx0XHRkaXN0YW5jZTogMTIsXG5cdFx0XHRcdGdhcDogMTAsXG5cdFx0XHRcdHBvc2l0aW9uOiAnYm90dG9tJ1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0dGhpcy50aGVtZSA9ICdtYXRlcmlhbCc7XG5cblx0XHQvLyBUaGUgZm9sbG93aW5nIG1lcmdlcyB0aGUgY3VzdG9tIG9wdGlvbnMgaW50byB0aGUgbm90aWZpZXIgY29uZmlnLCByZXNwZWN0aW5nIHRoZSBhbHJlYWR5IHNldCBkZWZhdWx0IHZhbHVlc1xuXHRcdC8vIFRoaXMgbGluZWFyLCBtb3JlIGV4cGxpY2l0IGFuZCBjb2RlLXNpenkgd29ya2Zsb3cgaXMgcHJlZmVycmVkIGhlcmUgb3ZlciBhIHJlY3Vyc2l2ZSBvbmUgKGJlY2F1c2Ugd2Uga25vdyB0aGUgb2JqZWN0IHN0cnVjdHVyZSlcblx0XHQvLyBUZWNobmljYWwgc2lkZW5vdGU6IE9iamVjdHMgYXJlIG1lcmdlZCwgb3RoZXIgdHlwZXMgb2YgdmFsdWVzIHNpbXBseSBvdmVyd3JpdHRlbiAvIGNvcGllZFxuXHRcdGlmICggY3VzdG9tT3B0aW9ucy50aGVtZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0dGhpcy50aGVtZSA9IGN1c3RvbU9wdGlvbnMudGhlbWU7XG5cdFx0fVxuXHRcdGlmICggY3VzdG9tT3B0aW9ucy5hbmltYXRpb25zICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRpZiAoIGN1c3RvbU9wdGlvbnMuYW5pbWF0aW9ucy5lbmFibGVkICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHRoaXMuYW5pbWF0aW9ucy5lbmFibGVkID0gY3VzdG9tT3B0aW9ucy5hbmltYXRpb25zLmVuYWJsZWQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGN1c3RvbU9wdGlvbnMuYW5pbWF0aW9ucy5vdmVybGFwICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHRoaXMuYW5pbWF0aW9ucy5vdmVybGFwID0gY3VzdG9tT3B0aW9ucy5hbmltYXRpb25zLm92ZXJsYXA7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGN1c3RvbU9wdGlvbnMuYW5pbWF0aW9ucy5oaWRlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdE9iamVjdC5hc3NpZ24oIHRoaXMuYW5pbWF0aW9ucy5oaWRlLCBjdXN0b21PcHRpb25zLmFuaW1hdGlvbnMuaGlkZSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBjdXN0b21PcHRpb25zLmFuaW1hdGlvbnMuc2hpZnQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0T2JqZWN0LmFzc2lnbiggdGhpcy5hbmltYXRpb25zLnNoaWZ0LCBjdXN0b21PcHRpb25zLmFuaW1hdGlvbnMuc2hpZnQgKTtcblx0XHRcdH1cblx0XHRcdGlmICggY3VzdG9tT3B0aW9ucy5hbmltYXRpb25zLnNob3cgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0T2JqZWN0LmFzc2lnbiggdGhpcy5hbmltYXRpb25zLnNob3csIGN1c3RvbU9wdGlvbnMuYW5pbWF0aW9ucy5zaG93ICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICggY3VzdG9tT3B0aW9ucy5iZWhhdmlvdXIgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdE9iamVjdC5hc3NpZ24oIHRoaXMuYmVoYXZpb3VyLCBjdXN0b21PcHRpb25zLmJlaGF2aW91ciApO1xuXHRcdH1cblx0XHRpZiAoIGN1c3RvbU9wdGlvbnMucG9zaXRpb24gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggY3VzdG9tT3B0aW9ucy5wb3NpdGlvbi5ob3Jpem9udGFsICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdE9iamVjdC5hc3NpZ24oIHRoaXMucG9zaXRpb24uaG9yaXpvbnRhbCwgY3VzdG9tT3B0aW9ucy5wb3NpdGlvbi5ob3Jpem9udGFsICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGN1c3RvbU9wdGlvbnMucG9zaXRpb24udmVydGljYWwgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0T2JqZWN0LmFzc2lnbiggdGhpcy5wb3NpdGlvbi52ZXJ0aWNhbCwgY3VzdG9tT3B0aW9ucy5wb3NpdGlvbi52ZXJ0aWNhbCApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHR9XG5cbn1cbiJdfQ==