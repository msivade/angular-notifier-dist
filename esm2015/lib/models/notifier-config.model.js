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
     * @param [customOptions={}] Custom notifier options, optional
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXItY29uZmlnLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ub3RpZmllci8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvbm90aWZpZXItY29uZmlnLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRDQTs7Ozs7O0dBTUc7QUFDSCxNQUFNLE9BQU8sY0FBYztJQXdEMUI7Ozs7T0FJRztJQUNILFlBQW9CLGdCQUFpQyxFQUFFO1FBRXRELHFCQUFxQjtRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2pCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFO2dCQUNMLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE1BQU0sRUFBRSxFQUFFO2dCQUNWLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ1Y7WUFDRCxPQUFPLEVBQUUsR0FBRztZQUNaLEtBQUssRUFBRTtnQkFDTixNQUFNLEVBQUUsTUFBTTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNWO1lBQ0QsSUFBSSxFQUFFO2dCQUNMLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE1BQU0sRUFBRSxPQUFPO2dCQUNmLEtBQUssRUFBRSxHQUFHO2FBQ1Y7U0FDRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNoQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxLQUFLO1lBQ2QsV0FBVyxFQUFFLGVBQWU7WUFDNUIsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixRQUFRLEVBQUUsQ0FBQztTQUNYLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ2YsVUFBVSxFQUFFO2dCQUNYLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFFBQVEsRUFBRSxNQUFNO2FBQ2hCO1lBQ0QsUUFBUSxFQUFFO2dCQUNULFFBQVEsRUFBRSxFQUFFO2dCQUNaLEdBQUcsRUFBRSxFQUFFO2dCQUNQLFFBQVEsRUFBRSxRQUFRO2FBQ2xCO1NBQ0QsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBRXhCLDhHQUE4RztRQUM5RyxrSUFBa0k7UUFDbEksNEZBQTRGO1FBQzVGLElBQUssYUFBYSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUc7WUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSyxhQUFhLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRztZQUM3QyxJQUFLLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRztnQkFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7YUFDM0Q7WUFDRCxJQUFLLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRztnQkFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7YUFDM0Q7WUFDRCxJQUFLLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRztnQkFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO2FBQ3JFO1lBQ0QsSUFBSyxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUc7Z0JBQ25ELE1BQU0sQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUUsQ0FBQzthQUN2RTtZQUNELElBQUssYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFHO2dCQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFFLENBQUM7YUFDckU7U0FDRDtRQUNELElBQUssYUFBYSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUc7WUFDNUMsTUFBTSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUUsQ0FBQztTQUN6RDtRQUNELElBQUssYUFBYSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUc7WUFDM0MsSUFBSyxhQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUc7Z0JBQ3RELE1BQU0sQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUUsQ0FBQzthQUM3RTtZQUNELElBQUssYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFHO2dCQUNwRCxNQUFNLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFFLENBQUM7YUFDekU7U0FDRDtJQUVGLENBQUM7Q0FFRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTm90aWZpZXIgb3B0aW9uc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWVyT3B0aW9ucyB7XG5cdGFuaW1hdGlvbnM/OiB7XG5cdFx0ZW5hYmxlZD86IGJvb2xlYW47XG5cdFx0aGlkZT86IHtcblx0XHRcdGVhc2luZz86IHN0cmluZztcblx0XHRcdG9mZnNldD86IG51bWJlciB8IGZhbHNlO1xuXHRcdFx0cHJlc2V0Pzogc3RyaW5nO1xuXHRcdFx0c3BlZWQ/OiBudW1iZXI7XG5cdFx0fTtcblx0XHRvdmVybGFwPzogbnVtYmVyIHwgZmFsc2U7XG5cdFx0c2hpZnQ/OiB7XG5cdFx0XHRlYXNpbmc/OiBzdHJpbmc7XG5cdFx0XHRzcGVlZD86IG51bWJlcjtcblx0XHR9O1xuXHRcdHNob3c/OiB7XG5cdFx0XHRlYXNpbmc/OiBzdHJpbmc7XG5cdFx0XHRwcmVzZXQ/OiBzdHJpbmc7XG5cdFx0XHRzcGVlZD86IG51bWJlcjtcblx0XHR9O1xuXHR9O1xuXHRiZWhhdmlvdXI/OiB7XG5cdFx0YXV0b0hpZGU/OiBudW1iZXIgfCBmYWxzZTtcblx0XHRvbkNsaWNrPzogJ2hpZGUnIHwgZmFsc2U7XG5cdFx0b25Nb3VzZW92ZXI/OiAncGF1c2VBdXRvSGlkZScgfCAncmVzZXRBdXRvSGlkZScgfCBmYWxzZTtcblx0XHRzaG93RGlzbWlzc0J1dHRvbj86IGJvb2xlYW47XG5cdFx0c3RhY2tpbmc/OiBudW1iZXIgfCBmYWxzZTtcblx0fTtcblx0cG9zaXRpb24/OiB7XG5cdFx0aG9yaXpvbnRhbD86IHtcblx0XHRcdGRpc3RhbmNlPzogbnVtYmVyO1xuXHRcdFx0cG9zaXRpb24/OiAnbGVmdCcgfCAnbWlkZGxlJyB8ICdyaWdodCc7XG5cdFx0fTtcblx0XHR2ZXJ0aWNhbD86IHtcblx0XHRcdGRpc3RhbmNlPzogbnVtYmVyO1xuXHRcdFx0Z2FwPzogbnVtYmVyO1xuXHRcdFx0cG9zaXRpb24/OiAndG9wJyB8ICdib3R0b20nO1xuXHRcdH07XG5cdH07XG5cdHRoZW1lPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIE5vdGlmaWVyIGNvbmZpZ3VyYXRpb25cbiAqXG4gKiBUaGUgbm90aWZpZXIgY29uZmlndXJhdGlvbiBkZWZpbmVzIHdoYXQgbm90aWZpY2F0aW9ucyBsb29rIGxpa2UsIGhvdyB0aGV5IGJlaGF2ZSwgYW5kIGhvdyB0aGV5IGdldCBhbmltYXRlZC4gSXQgaXMgYSBnbG9iYWxcbiAqIGNvbmZpZ3VyYXRpb24sIHdoaWNoIG1lYW5zIHRoYXQgaXQgb25seSBjYW4gYmUgc2V0IG9uY2UgKGF0IHRoZSBiZWdpbm5pbmcpLCBhbmQgY2Fubm90IGJlIGNoYW5nZWQgYWZ0ZXJ3YXJkcy4gQWxpZ25pbmcgdG8gdGhlIHdvcmxkIG9mXG4gKiBBbmd1bGFyLCB0aGlzIGNvbmZpZ3VyYXRpb24gY2FuIGJlIHByb3ZpZGVkIGluIHRoZSByb290IGFwcCBtb2R1bGUgLSBhbHRlcm5hdGl2ZWx5LCBhIG1lYW5pbmdmdWwgZGVmYXVsdCBjb25maWd1cmF0aW9uIHdpbGwgYmUgdXNlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vdGlmaWVyQ29uZmlnIGltcGxlbWVudHMgTm90aWZpZXJPcHRpb25zIHtcblxuXHQvKipcblx0ICogQ3VzdG9taXplIGFuaW1hdGlvbnNcblx0ICovXG5cdHB1YmxpYyBhbmltYXRpb25zOiB7XG5cdFx0ZW5hYmxlZDogYm9vbGVhbjtcblx0XHRoaWRlOiB7XG5cdFx0XHRlYXNpbmc6IHN0cmluZztcblx0XHRcdG9mZnNldDogbnVtYmVyIHwgZmFsc2U7XG5cdFx0XHRwcmVzZXQ6IHN0cmluZztcblx0XHRcdHNwZWVkOiBudW1iZXI7XG5cdFx0fTtcblx0XHRvdmVybGFwOiBudW1iZXIgfCBmYWxzZTtcblx0XHRzaGlmdDoge1xuXHRcdFx0ZWFzaW5nOiBzdHJpbmc7XG5cdFx0XHRzcGVlZDogbnVtYmVyO1xuXHRcdH07XG5cdFx0c2hvdzoge1xuXHRcdFx0ZWFzaW5nOiBzdHJpbmc7XG5cdFx0XHRwcmVzZXQ6IHN0cmluZztcblx0XHRcdHNwZWVkOiBudW1iZXI7XG5cdFx0fTtcblx0fTtcblxuXHQvKipcblx0ICogQ3VzdG9taXplIGJlaGF2aW91clxuXHQgKi9cblx0cHVibGljIGJlaGF2aW91cjoge1xuXHRcdGF1dG9IaWRlOiBudW1iZXIgfCBmYWxzZTtcblx0XHRvbkNsaWNrOiAnaGlkZScgfCBmYWxzZTtcblx0XHRvbk1vdXNlb3ZlcjogJ3BhdXNlQXV0b0hpZGUnIHwgJ3Jlc2V0QXV0b0hpZGUnIHwgZmFsc2U7XG5cdFx0c2hvd0Rpc21pc3NCdXR0b246IGJvb2xlYW47XG5cdFx0c3RhY2tpbmc6IG51bWJlciB8IGZhbHNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDdXN0b21pemUgcG9zaXRpb25pbmdcblx0ICovXG5cdHB1YmxpYyBwb3NpdGlvbjoge1xuXHRcdGhvcml6b250YWw6IHtcblx0XHRcdGRpc3RhbmNlOiBudW1iZXI7XG5cdFx0XHRwb3NpdGlvbjogJ2xlZnQnIHwgJ21pZGRsZScgfCAncmlnaHQnO1xuXHRcdH07XG5cdFx0dmVydGljYWw6IHtcblx0XHRcdGRpc3RhbmNlOiBudW1iZXI7XG5cdFx0XHRnYXA6IG51bWJlcjtcblx0XHRcdHBvc2l0aW9uOiAndG9wJyB8ICdib3R0b20nO1xuXHRcdH07XG5cdH07XG5cblx0LyoqXG5cdCAqIEN1c3RvbWl6ZSB0aGVtaW5nXG5cdCAqL1xuXHRwdWJsaWMgdGhlbWU6IHN0cmluZztcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIFtjdXN0b21PcHRpb25zPXt9XSBDdXN0b20gbm90aWZpZXIgb3B0aW9ucywgb3B0aW9uYWxcblx0ICovXG5cdHB1YmxpYyBjb25zdHJ1Y3RvciggY3VzdG9tT3B0aW9uczogTm90aWZpZXJPcHRpb25zID0ge30gKSB7XG5cblx0XHQvLyBTZXQgZGVmYXVsdCB2YWx1ZXNcblx0XHR0aGlzLmFuaW1hdGlvbnMgPSB7XG5cdFx0XHRlbmFibGVkOiB0cnVlLFxuXHRcdFx0aGlkZToge1xuXHRcdFx0XHRlYXNpbmc6ICdlYXNlJyxcblx0XHRcdFx0b2Zmc2V0OiA1MCxcblx0XHRcdFx0cHJlc2V0OiAnZmFkZScsXG5cdFx0XHRcdHNwZWVkOiAzMDBcblx0XHRcdH0sXG5cdFx0XHRvdmVybGFwOiAxNTAsXG5cdFx0XHRzaGlmdDoge1xuXHRcdFx0XHRlYXNpbmc6ICdlYXNlJyxcblx0XHRcdFx0c3BlZWQ6IDMwMFxuXHRcdFx0fSxcblx0XHRcdHNob3c6IHtcblx0XHRcdFx0ZWFzaW5nOiAnZWFzZScsXG5cdFx0XHRcdHByZXNldDogJ3NsaWRlJyxcblx0XHRcdFx0c3BlZWQ6IDMwMFxuXHRcdFx0fVxuXHRcdH07XG5cdFx0dGhpcy5iZWhhdmlvdXIgPSB7XG5cdFx0XHRhdXRvSGlkZTogNzAwMCxcblx0XHRcdG9uQ2xpY2s6IGZhbHNlLFxuXHRcdFx0b25Nb3VzZW92ZXI6ICdwYXVzZUF1dG9IaWRlJyxcblx0XHRcdHNob3dEaXNtaXNzQnV0dG9uOiB0cnVlLFxuXHRcdFx0c3RhY2tpbmc6IDRcblx0XHR9O1xuXHRcdHRoaXMucG9zaXRpb24gPSB7XG5cdFx0XHRob3Jpem9udGFsOiB7XG5cdFx0XHRcdGRpc3RhbmNlOiAxMixcblx0XHRcdFx0cG9zaXRpb246ICdsZWZ0J1xuXHRcdFx0fSxcblx0XHRcdHZlcnRpY2FsOiB7XG5cdFx0XHRcdGRpc3RhbmNlOiAxMixcblx0XHRcdFx0Z2FwOiAxMCxcblx0XHRcdFx0cG9zaXRpb246ICdib3R0b20nXG5cdFx0XHR9XG5cdFx0fTtcblx0XHR0aGlzLnRoZW1lID0gJ21hdGVyaWFsJztcblxuXHRcdC8vIFRoZSBmb2xsb3dpbmcgbWVyZ2VzIHRoZSBjdXN0b20gb3B0aW9ucyBpbnRvIHRoZSBub3RpZmllciBjb25maWcsIHJlc3BlY3RpbmcgdGhlIGFscmVhZHkgc2V0IGRlZmF1bHQgdmFsdWVzXG5cdFx0Ly8gVGhpcyBsaW5lYXIsIG1vcmUgZXhwbGljaXQgYW5kIGNvZGUtc2l6eSB3b3JrZmxvdyBpcyBwcmVmZXJyZWQgaGVyZSBvdmVyIGEgcmVjdXJzaXZlIG9uZSAoYmVjYXVzZSB3ZSBrbm93IHRoZSBvYmplY3Qgc3RydWN0dXJlKVxuXHRcdC8vIFRlY2huaWNhbCBzaWRlbm90ZTogT2JqZWN0cyBhcmUgbWVyZ2VkLCBvdGhlciB0eXBlcyBvZiB2YWx1ZXMgc2ltcGx5IG92ZXJ3cml0dGVuIC8gY29waWVkXG5cdFx0aWYgKCBjdXN0b21PcHRpb25zLnRoZW1lICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR0aGlzLnRoZW1lID0gY3VzdG9tT3B0aW9ucy50aGVtZTtcblx0XHR9XG5cdFx0aWYgKCBjdXN0b21PcHRpb25zLmFuaW1hdGlvbnMgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggY3VzdG9tT3B0aW9ucy5hbmltYXRpb25zLmVuYWJsZWQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0dGhpcy5hbmltYXRpb25zLmVuYWJsZWQgPSBjdXN0b21PcHRpb25zLmFuaW1hdGlvbnMuZW5hYmxlZDtcblx0XHRcdH1cblx0XHRcdGlmICggY3VzdG9tT3B0aW9ucy5hbmltYXRpb25zLm92ZXJsYXAgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0dGhpcy5hbmltYXRpb25zLm92ZXJsYXAgPSBjdXN0b21PcHRpb25zLmFuaW1hdGlvbnMub3ZlcmxhcDtcblx0XHRcdH1cblx0XHRcdGlmICggY3VzdG9tT3B0aW9ucy5hbmltYXRpb25zLmhpZGUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0T2JqZWN0LmFzc2lnbiggdGhpcy5hbmltYXRpb25zLmhpZGUsIGN1c3RvbU9wdGlvbnMuYW5pbWF0aW9ucy5oaWRlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGN1c3RvbU9wdGlvbnMuYW5pbWF0aW9ucy5zaGlmdCAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRPYmplY3QuYXNzaWduKCB0aGlzLmFuaW1hdGlvbnMuc2hpZnQsIGN1c3RvbU9wdGlvbnMuYW5pbWF0aW9ucy5zaGlmdCApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBjdXN0b21PcHRpb25zLmFuaW1hdGlvbnMuc2hvdyAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRPYmplY3QuYXNzaWduKCB0aGlzLmFuaW1hdGlvbnMuc2hvdywgY3VzdG9tT3B0aW9ucy5hbmltYXRpb25zLnNob3cgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCBjdXN0b21PcHRpb25zLmJlaGF2aW91ciAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0T2JqZWN0LmFzc2lnbiggdGhpcy5iZWhhdmlvdXIsIGN1c3RvbU9wdGlvbnMuYmVoYXZpb3VyICk7XG5cdFx0fVxuXHRcdGlmICggY3VzdG9tT3B0aW9ucy5wb3NpdGlvbiAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCBjdXN0b21PcHRpb25zLnBvc2l0aW9uLmhvcml6b250YWwgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0T2JqZWN0LmFzc2lnbiggdGhpcy5wb3NpdGlvbi5ob3Jpem9udGFsLCBjdXN0b21PcHRpb25zLnBvc2l0aW9uLmhvcml6b250YWwgKTtcblx0XHRcdH1cblx0XHRcdGlmICggY3VzdG9tT3B0aW9ucy5wb3NpdGlvbi52ZXJ0aWNhbCAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRPYmplY3QuYXNzaWduKCB0aGlzLnBvc2l0aW9uLnZlcnRpY2FsLCBjdXN0b21PcHRpb25zLnBvc2l0aW9uLnZlcnRpY2FsICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH1cblxufVxuIl19