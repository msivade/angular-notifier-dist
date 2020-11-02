/**
 * @fileoverview added by tsickle
 * Generated from: lib/animation-presets/slide.animation-preset.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const ɵ0 = /**
 * @param {?} notification
 * @return {?}
 */
(notification) => {
    // Prepare variables
    /** @type {?} */
    const config = notification.component.getConfig();
    /** @type {?} */
    const shift = notification.component.getShift();
    /** @type {?} */
    let from;
    /** @type {?} */
    let to;
    // Configure variables, depending on configuration and component
    if (config.position.horizontal.position === 'left') {
        from = {
            transform: `translate3d( 0, ${shift}px, 0 )`
        };
        to = {
            transform: `translate3d( calc( -100% - ${config.position.horizontal.distance}px - 10px ), ${shift}px, 0 )`
        };
    }
    else if (config.position.horizontal.position === 'right') {
        from = {
            transform: `translate3d( 0, ${shift}px, 0 )`
        };
        to = {
            transform: `translate3d( calc( 100% + ${config.position.horizontal.distance}px + 10px ), ${shift}px, 0 )`
        };
    }
    else {
        /** @type {?} */
        let horizontalPosition;
        if (config.position.vertical.position === 'top') {
            horizontalPosition = `calc( -100% - ${config.position.horizontal.distance}px - 10px )`;
        }
        else {
            horizontalPosition = `calc( 100% + ${config.position.horizontal.distance}px + 10px )`;
        }
        from = {
            transform: `translate3d( -50%, ${shift}px, 0 )`
        };
        to = {
            transform: `translate3d( -50%, ${horizontalPosition}, 0 )`
        };
    }
    // Done
    return {
        from,
        to
    };
}, ɵ1 = /**
 * @param {?} notification
 * @return {?}
 */
(notification) => {
    // Prepare variables
    /** @type {?} */
    const config = notification.component.getConfig();
    /** @type {?} */
    let from;
    /** @type {?} */
    let to;
    // Configure variables, depending on configuration and component
    if (config.position.horizontal.position === 'left') {
        from = {
            transform: `translate3d( calc( -100% - ${config.position.horizontal.distance}px - 10px ), 0, 0 )`
        };
        to = {
            transform: 'translate3d( 0, 0, 0 )'
        };
    }
    else if (config.position.horizontal.position === 'right') {
        from = {
            transform: `translate3d( calc( 100% + ${config.position.horizontal.distance}px + 10px ), 0, 0 )`
        };
        to = {
            transform: 'translate3d( 0, 0, 0 )'
        };
    }
    else {
        /** @type {?} */
        let horizontalPosition;
        if (config.position.vertical.position === 'top') {
            horizontalPosition = `calc( -100% - ${config.position.horizontal.distance}px - 10px )`;
        }
        else {
            horizontalPosition = `calc( 100% + ${config.position.horizontal.distance}px + 10px )`;
        }
        from = {
            transform: `translate3d( -50%, ${horizontalPosition}, 0 )`
        };
        to = {
            transform: 'translate3d( -50%, 0, 0 )'
        };
    }
    // Done
    return {
        from,
        to
    };
};
/**
 * Slide animation preset
 * @type {?}
 */
export const slide = {
    hide: (ɵ0),
    show: (ɵ1)
};
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuYW5pbWF0aW9uLXByZXNldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvYW5pbWF0aW9uLXByZXNldHMvc2xpZGUuYW5pbWF0aW9uLXByZXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFRTyxDQUFFLFlBQWtDLEVBQXFDLEVBQUU7OztVQUcxRSxNQUFNLEdBQW1CLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFOztVQUMzRCxLQUFLLEdBQVcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7O1FBQ25ELElBRUg7O1FBQ0csRUFFSDtJQUVELGdFQUFnRTtJQUNoRSxJQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUc7UUFDckQsSUFBSSxHQUFHO1lBQ04sU0FBUyxFQUFFLG1CQUFvQixLQUFNLFNBQVM7U0FDOUMsQ0FBQztRQUNGLEVBQUUsR0FBRztZQUNKLFNBQVMsRUFBRSw4QkFBK0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUyxnQkFBaUIsS0FBTSxTQUFTO1NBQzlHLENBQUM7S0FDRjtTQUFNLElBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRztRQUM3RCxJQUFJLEdBQUc7WUFDTixTQUFTLEVBQUUsbUJBQW9CLEtBQU0sU0FBUztTQUM5QyxDQUFDO1FBQ0YsRUFBRSxHQUFHO1lBQ0osU0FBUyxFQUFFLDZCQUE4QixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFTLGdCQUFpQixLQUFNLFNBQVM7U0FDN0csQ0FBQztLQUNGO1NBQU07O1lBQ0Ysa0JBQTBCO1FBQzlCLElBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRztZQUNsRCxrQkFBa0IsR0FBRyxpQkFBa0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUyxhQUFhLENBQUM7U0FDekY7YUFBTTtZQUNOLGtCQUFrQixHQUFHLGdCQUFpQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFTLGFBQWEsQ0FBQztTQUN4RjtRQUNELElBQUksR0FBRztZQUNOLFNBQVMsRUFBRSxzQkFBdUIsS0FBTSxTQUFTO1NBQ2pELENBQUM7UUFDRixFQUFFLEdBQUc7WUFDSixTQUFTLEVBQUUsc0JBQXVCLGtCQUFtQixPQUFPO1NBQzVELENBQUM7S0FDRjtJQUVELE9BQU87SUFDUCxPQUFPO1FBQ04sSUFBSTtRQUNKLEVBQUU7S0FDRixDQUFDO0FBRUgsQ0FBQzs7OztBQUNLLENBQUUsWUFBa0MsRUFBcUMsRUFBRTs7O1VBRzFFLE1BQU0sR0FBbUIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7O1FBQzdELElBRUg7O1FBQ0csRUFFSDtJQUVELGdFQUFnRTtJQUNoRSxJQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUc7UUFDckQsSUFBSSxHQUFHO1lBQ04sU0FBUyxFQUFFLDhCQUErQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFTLHFCQUFxQjtTQUNuRyxDQUFDO1FBQ0YsRUFBRSxHQUFHO1lBQ0osU0FBUyxFQUFFLHdCQUF3QjtTQUNuQyxDQUFDO0tBQ0Y7U0FBTSxJQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUc7UUFDN0QsSUFBSSxHQUFHO1lBQ04sU0FBUyxFQUFFLDZCQUE4QixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFTLHFCQUFxQjtTQUNsRyxDQUFDO1FBQ0YsRUFBRSxHQUFHO1lBQ0osU0FBUyxFQUFFLHdCQUF3QjtTQUNuQyxDQUFDO0tBQ0Y7U0FBTTs7WUFDRixrQkFBMEI7UUFDOUIsSUFBSyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFHO1lBQ2xELGtCQUFrQixHQUFHLGlCQUFrQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFTLGFBQWEsQ0FBQztTQUN6RjthQUFNO1lBQ04sa0JBQWtCLEdBQUcsZ0JBQWlCLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVMsYUFBYSxDQUFDO1NBQ3hGO1FBQ0QsSUFBSSxHQUFHO1lBQ04sU0FBUyxFQUFFLHNCQUF1QixrQkFBbUIsT0FBTztTQUM1RCxDQUFDO1FBQ0YsRUFBRSxHQUFHO1lBQ0osU0FBUyxFQUFFLDJCQUEyQjtTQUN0QyxDQUFDO0tBQ0Y7SUFFRCxPQUFPO0lBQ1AsT0FBTztRQUNOLElBQUk7UUFDSixFQUFFO0tBQ0YsQ0FBQztBQUVILENBQUM7Ozs7O0FBakdGLE1BQU0sT0FBTyxLQUFLLEdBQTRCO0lBQzdDLElBQUksTUFnREg7SUFDRCxJQUFJLE1BK0NIO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOb3RpZmllckFuaW1hdGlvblByZXNldCwgTm90aWZpZXJBbmltYXRpb25QcmVzZXRLZXlmcmFtZXMgfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItYW5pbWF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5vdGlmaWVyQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllck5vdGlmaWNhdGlvbiB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1ub3RpZmljYXRpb24ubW9kZWwnO1xuXG4vKipcbiAqIFNsaWRlIGFuaW1hdGlvbiBwcmVzZXRcbiAqL1xuZXhwb3J0IGNvbnN0IHNsaWRlOiBOb3RpZmllckFuaW1hdGlvblByZXNldCA9IHtcblx0aGlkZTogKCBub3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uICk6IE5vdGlmaWVyQW5pbWF0aW9uUHJlc2V0S2V5ZnJhbWVzID0+IHtcblxuXHRcdC8vIFByZXBhcmUgdmFyaWFibGVzXG5cdFx0Y29uc3QgY29uZmlnOiBOb3RpZmllckNvbmZpZyA9IG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0Q29uZmlnKCk7XG5cdFx0Y29uc3Qgc2hpZnQ6IG51bWJlciA9IG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0U2hpZnQoKTtcblx0XHRsZXQgZnJvbToge1xuXHRcdFx0WyBhbmltYXRhYmxlUHJvcGVydHlOYW1lOiBzdHJpbmcgXTogc3RyaW5nO1xuXHRcdH07XG5cdFx0bGV0IHRvOiB7XG5cdFx0XHRbIGFuaW1hdGFibGVQcm9wZXJ0eU5hbWU6IHN0cmluZyBdOiBzdHJpbmc7XG5cdFx0fTtcblxuXHRcdC8vIENvbmZpZ3VyZSB2YXJpYWJsZXMsIGRlcGVuZGluZyBvbiBjb25maWd1cmF0aW9uIGFuZCBjb21wb25lbnRcblx0XHRpZiAoIGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLnBvc2l0aW9uID09PSAnbGVmdCcgKSB7XG5cdFx0XHRmcm9tID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCggMCwgJHsgc2hpZnQgfXB4LCAwIClgXG5cdFx0XHR9O1xuXHRcdFx0dG8gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCBjYWxjKCAtMTAwJSAtICR7IGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weCAtIDEwcHggKSwgJHsgc2hpZnQgfXB4LCAwIClgXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSBpZiAoIGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLnBvc2l0aW9uID09PSAncmlnaHQnICkge1xuXHRcdFx0ZnJvbSA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoIDAsICR7IHNoaWZ0IH1weCwgMCApYFxuXHRcdFx0fTtcblx0XHRcdHRvID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCggY2FsYyggMTAwJSArICR7IGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weCArIDEwcHggKSwgJHsgc2hpZnQgfXB4LCAwIClgXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgaG9yaXpvbnRhbFBvc2l0aW9uOiBzdHJpbmc7XG5cdFx0XHRpZiAoIGNvbmZpZy5wb3NpdGlvbi52ZXJ0aWNhbC5wb3NpdGlvbiA9PT0gJ3RvcCcgKSB7XG5cdFx0XHRcdGhvcml6b250YWxQb3NpdGlvbiA9IGBjYWxjKCAtMTAwJSAtICR7IGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weCAtIDEwcHggKWA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRob3Jpem9udGFsUG9zaXRpb24gPSBgY2FsYyggMTAwJSArICR7IGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weCArIDEwcHggKWA7XG5cdFx0XHR9XG5cdFx0XHRmcm9tID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCggLTUwJSwgJHsgc2hpZnQgfXB4LCAwIClgXG5cdFx0XHR9O1xuXHRcdFx0dG8gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCAtNTAlLCAkeyBob3Jpem9udGFsUG9zaXRpb24gfSwgMCApYFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBEb25lXG5cdFx0cmV0dXJuIHtcblx0XHRcdGZyb20sXG5cdFx0XHR0b1xuXHRcdH07XG5cblx0fSxcblx0c2hvdzogKCBub3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uICk6IE5vdGlmaWVyQW5pbWF0aW9uUHJlc2V0S2V5ZnJhbWVzID0+IHtcblxuXHRcdC8vIFByZXBhcmUgdmFyaWFibGVzXG5cdFx0Y29uc3QgY29uZmlnOiBOb3RpZmllckNvbmZpZyA9IG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0Q29uZmlnKCk7XG5cdFx0bGV0IGZyb206IHtcblx0XHRcdFsgYW5pbWF0YWJsZVByb3BlcnR5TmFtZTogc3RyaW5nIF06IHN0cmluZztcblx0XHR9O1xuXHRcdGxldCB0bzoge1xuXHRcdFx0WyBhbmltYXRhYmxlUHJvcGVydHlOYW1lOiBzdHJpbmcgXTogc3RyaW5nO1xuXHRcdH07XG5cblx0XHQvLyBDb25maWd1cmUgdmFyaWFibGVzLCBkZXBlbmRpbmcgb24gY29uZmlndXJhdGlvbiBhbmQgY29tcG9uZW50XG5cdFx0aWYgKCBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5wb3NpdGlvbiA9PT0gJ2xlZnQnICkge1xuXHRcdFx0ZnJvbSA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoIGNhbGMoIC0xMDAlIC0gJHsgY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwuZGlzdGFuY2UgfXB4IC0gMTBweCApLCAwLCAwIClgXG5cdFx0XHR9O1xuXHRcdFx0dG8gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKCAwLCAwLCAwICknXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSBpZiAoIGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLnBvc2l0aW9uID09PSAncmlnaHQnICkge1xuXHRcdFx0ZnJvbSA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoIGNhbGMoIDEwMCUgKyAkeyBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5kaXN0YW5jZSB9cHggKyAxMHB4ICksIDAsIDAgKWBcblx0XHRcdH07XG5cdFx0XHR0byA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoIDAsIDAsIDAgKSdcblx0XHRcdH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBob3Jpem9udGFsUG9zaXRpb246IHN0cmluZztcblx0XHRcdGlmICggY29uZmlnLnBvc2l0aW9uLnZlcnRpY2FsLnBvc2l0aW9uID09PSAndG9wJyApIHtcblx0XHRcdFx0aG9yaXpvbnRhbFBvc2l0aW9uID0gYGNhbGMoIC0xMDAlIC0gJHsgY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwuZGlzdGFuY2UgfXB4IC0gMTBweCApYDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhvcml6b250YWxQb3NpdGlvbiA9IGBjYWxjKCAxMDAlICsgJHsgY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwuZGlzdGFuY2UgfXB4ICsgMTBweCApYDtcblx0XHRcdH1cblx0XHRcdGZyb20gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCAtNTAlLCAkeyBob3Jpem9udGFsUG9zaXRpb24gfSwgMCApYFxuXHRcdFx0fTtcblx0XHRcdHRvID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCggLTUwJSwgMCwgMCApJ1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBEb25lXG5cdFx0cmV0dXJuIHtcblx0XHRcdGZyb20sXG5cdFx0XHR0b1xuXHRcdH07XG5cblx0fVxufTtcbiJdfQ==