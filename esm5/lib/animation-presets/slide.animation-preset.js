/**
 * @fileoverview added by tsickle
 * Generated from: lib/animation-presets/slide.animation-preset.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ɵ0 = /**
 * @param {?} notification
 * @return {?}
 */
function (notification) {
    // Prepare variables
    /** @type {?} */
    var config = notification.component.getConfig();
    /** @type {?} */
    var shift = notification.component.getShift();
    /** @type {?} */
    var from;
    /** @type {?} */
    var to;
    // Configure variables, depending on configuration and component
    if (config.position.horizontal.position === 'left') {
        from = {
            transform: "translate3d( 0, " + shift + "px, 0 )"
        };
        to = {
            transform: "translate3d( calc( -100% - " + config.position.horizontal.distance + "px - 10px ), " + shift + "px, 0 )"
        };
    }
    else if (config.position.horizontal.position === 'right') {
        from = {
            transform: "translate3d( 0, " + shift + "px, 0 )"
        };
        to = {
            transform: "translate3d( calc( 100% + " + config.position.horizontal.distance + "px + 10px ), " + shift + "px, 0 )"
        };
    }
    else {
        /** @type {?} */
        var horizontalPosition = void 0;
        if (config.position.vertical.position === 'top') {
            horizontalPosition = "calc( -100% - " + config.position.horizontal.distance + "px - 10px )";
        }
        else {
            horizontalPosition = "calc( 100% + " + config.position.horizontal.distance + "px + 10px )";
        }
        from = {
            transform: "translate3d( -50%, " + shift + "px, 0 )"
        };
        to = {
            transform: "translate3d( -50%, " + horizontalPosition + ", 0 )"
        };
    }
    // Done
    return {
        from: from,
        to: to
    };
}, ɵ1 = /**
 * @param {?} notification
 * @return {?}
 */
function (notification) {
    // Prepare variables
    /** @type {?} */
    var config = notification.component.getConfig();
    /** @type {?} */
    var from;
    /** @type {?} */
    var to;
    // Configure variables, depending on configuration and component
    if (config.position.horizontal.position === 'left') {
        from = {
            transform: "translate3d( calc( -100% - " + config.position.horizontal.distance + "px - 10px ), 0, 0 )"
        };
        to = {
            transform: 'translate3d( 0, 0, 0 )'
        };
    }
    else if (config.position.horizontal.position === 'right') {
        from = {
            transform: "translate3d( calc( 100% + " + config.position.horizontal.distance + "px + 10px ), 0, 0 )"
        };
        to = {
            transform: 'translate3d( 0, 0, 0 )'
        };
    }
    else {
        /** @type {?} */
        var horizontalPosition = void 0;
        if (config.position.vertical.position === 'top') {
            horizontalPosition = "calc( -100% - " + config.position.horizontal.distance + "px - 10px )";
        }
        else {
            horizontalPosition = "calc( 100% + " + config.position.horizontal.distance + "px + 10px )";
        }
        from = {
            transform: "translate3d( -50%, " + horizontalPosition + ", 0 )"
        };
        to = {
            transform: 'translate3d( -50%, 0, 0 )'
        };
    }
    // Done
    return {
        from: from,
        to: to
    };
};
/**
 * Slide animation preset
 * @type {?}
 */
export var slide = {
    hide: (ɵ0),
    show: (ɵ1)
};
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuYW5pbWF0aW9uLXByZXNldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvYW5pbWF0aW9uLXByZXNldHMvc2xpZGUuYW5pbWF0aW9uLXByZXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFRTyxVQUFFLFlBQWtDOzs7UUFHbkMsTUFBTSxHQUFtQixZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTs7UUFDM0QsS0FBSyxHQUFXLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFOztRQUNuRCxJQUVIOztRQUNHLEVBRUg7SUFFRCxnRUFBZ0U7SUFDaEUsSUFBSyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFHO1FBQ3JELElBQUksR0FBRztZQUNOLFNBQVMsRUFBRSxxQkFBb0IsS0FBSyxZQUFVO1NBQzlDLENBQUM7UUFDRixFQUFFLEdBQUc7WUFDSixTQUFTLEVBQUUsZ0NBQStCLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEscUJBQWtCLEtBQUssWUFBVTtTQUM5RyxDQUFDO0tBQ0Y7U0FBTSxJQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUc7UUFDN0QsSUFBSSxHQUFHO1lBQ04sU0FBUyxFQUFFLHFCQUFvQixLQUFLLFlBQVU7U0FDOUMsQ0FBQztRQUNGLEVBQUUsR0FBRztZQUNKLFNBQVMsRUFBRSwrQkFBOEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxxQkFBa0IsS0FBSyxZQUFVO1NBQzdHLENBQUM7S0FDRjtTQUFNOztZQUNGLGtCQUFrQixTQUFRO1FBQzlCLElBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRztZQUNsRCxrQkFBa0IsR0FBRyxtQkFBa0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxnQkFBYyxDQUFDO1NBQ3pGO2FBQU07WUFDTixrQkFBa0IsR0FBRyxrQkFBaUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxnQkFBYyxDQUFDO1NBQ3hGO1FBQ0QsSUFBSSxHQUFHO1lBQ04sU0FBUyxFQUFFLHdCQUF1QixLQUFLLFlBQVU7U0FDakQsQ0FBQztRQUNGLEVBQUUsR0FBRztZQUNKLFNBQVMsRUFBRSx3QkFBdUIsa0JBQWtCLFVBQVE7U0FDNUQsQ0FBQztLQUNGO0lBRUQsT0FBTztJQUNQLE9BQU87UUFDTixJQUFJLE1BQUE7UUFDSixFQUFFLElBQUE7S0FDRixDQUFDO0FBRUgsQ0FBQzs7OztBQUNLLFVBQUUsWUFBa0M7OztRQUduQyxNQUFNLEdBQW1CLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFOztRQUM3RCxJQUVIOztRQUNHLEVBRUg7SUFFRCxnRUFBZ0U7SUFDaEUsSUFBSyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFHO1FBQ3JELElBQUksR0FBRztZQUNOLFNBQVMsRUFBRSxnQ0FBK0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSx3QkFBc0I7U0FDbkcsQ0FBQztRQUNGLEVBQUUsR0FBRztZQUNKLFNBQVMsRUFBRSx3QkFBd0I7U0FDbkMsQ0FBQztLQUNGO1NBQU0sSUFBSyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFHO1FBQzdELElBQUksR0FBRztZQUNOLFNBQVMsRUFBRSwrQkFBOEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSx3QkFBc0I7U0FDbEcsQ0FBQztRQUNGLEVBQUUsR0FBRztZQUNKLFNBQVMsRUFBRSx3QkFBd0I7U0FDbkMsQ0FBQztLQUNGO1NBQU07O1lBQ0Ysa0JBQWtCLFNBQVE7UUFDOUIsSUFBSyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFHO1lBQ2xELGtCQUFrQixHQUFHLG1CQUFrQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLGdCQUFjLENBQUM7U0FDekY7YUFBTTtZQUNOLGtCQUFrQixHQUFHLGtCQUFpQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLGdCQUFjLENBQUM7U0FDeEY7UUFDRCxJQUFJLEdBQUc7WUFDTixTQUFTLEVBQUUsd0JBQXVCLGtCQUFrQixVQUFRO1NBQzVELENBQUM7UUFDRixFQUFFLEdBQUc7WUFDSixTQUFTLEVBQUUsMkJBQTJCO1NBQ3RDLENBQUM7S0FDRjtJQUVELE9BQU87SUFDUCxPQUFPO1FBQ04sSUFBSSxNQUFBO1FBQ0osRUFBRSxJQUFBO0tBQ0YsQ0FBQztBQUVILENBQUM7Ozs7O0FBakdGLE1BQU0sS0FBTyxLQUFLLEdBQTRCO0lBQzdDLElBQUksTUFnREg7SUFDRCxJQUFJLE1BK0NIO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOb3RpZmllckFuaW1hdGlvblByZXNldCwgTm90aWZpZXJBbmltYXRpb25QcmVzZXRLZXlmcmFtZXMgfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItYW5pbWF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5vdGlmaWVyQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllck5vdGlmaWNhdGlvbiB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1ub3RpZmljYXRpb24ubW9kZWwnO1xuXG4vKipcbiAqIFNsaWRlIGFuaW1hdGlvbiBwcmVzZXRcbiAqL1xuZXhwb3J0IGNvbnN0IHNsaWRlOiBOb3RpZmllckFuaW1hdGlvblByZXNldCA9IHtcblx0aGlkZTogKCBub3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uICk6IE5vdGlmaWVyQW5pbWF0aW9uUHJlc2V0S2V5ZnJhbWVzID0+IHtcblxuXHRcdC8vIFByZXBhcmUgdmFyaWFibGVzXG5cdFx0Y29uc3QgY29uZmlnOiBOb3RpZmllckNvbmZpZyA9IG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0Q29uZmlnKCk7XG5cdFx0Y29uc3Qgc2hpZnQ6IG51bWJlciA9IG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0U2hpZnQoKTtcblx0XHRsZXQgZnJvbToge1xuXHRcdFx0WyBhbmltYXRhYmxlUHJvcGVydHlOYW1lOiBzdHJpbmcgXTogc3RyaW5nO1xuXHRcdH07XG5cdFx0bGV0IHRvOiB7XG5cdFx0XHRbIGFuaW1hdGFibGVQcm9wZXJ0eU5hbWU6IHN0cmluZyBdOiBzdHJpbmc7XG5cdFx0fTtcblxuXHRcdC8vIENvbmZpZ3VyZSB2YXJpYWJsZXMsIGRlcGVuZGluZyBvbiBjb25maWd1cmF0aW9uIGFuZCBjb21wb25lbnRcblx0XHRpZiAoIGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLnBvc2l0aW9uID09PSAnbGVmdCcgKSB7XG5cdFx0XHRmcm9tID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCggMCwgJHsgc2hpZnQgfXB4LCAwIClgXG5cdFx0XHR9O1xuXHRcdFx0dG8gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCBjYWxjKCAtMTAwJSAtICR7IGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weCAtIDEwcHggKSwgJHsgc2hpZnQgfXB4LCAwIClgXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSBpZiAoIGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLnBvc2l0aW9uID09PSAncmlnaHQnICkge1xuXHRcdFx0ZnJvbSA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoIDAsICR7IHNoaWZ0IH1weCwgMCApYFxuXHRcdFx0fTtcblx0XHRcdHRvID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCggY2FsYyggMTAwJSArICR7IGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weCArIDEwcHggKSwgJHsgc2hpZnQgfXB4LCAwIClgXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgaG9yaXpvbnRhbFBvc2l0aW9uOiBzdHJpbmc7XG5cdFx0XHRpZiAoIGNvbmZpZy5wb3NpdGlvbi52ZXJ0aWNhbC5wb3NpdGlvbiA9PT0gJ3RvcCcgKSB7XG5cdFx0XHRcdGhvcml6b250YWxQb3NpdGlvbiA9IGBjYWxjKCAtMTAwJSAtICR7IGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weCAtIDEwcHggKWA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRob3Jpem9udGFsUG9zaXRpb24gPSBgY2FsYyggMTAwJSArICR7IGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weCArIDEwcHggKWA7XG5cdFx0XHR9XG5cdFx0XHRmcm9tID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCggLTUwJSwgJHsgc2hpZnQgfXB4LCAwIClgXG5cdFx0XHR9O1xuXHRcdFx0dG8gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCAtNTAlLCAkeyBob3Jpem9udGFsUG9zaXRpb24gfSwgMCApYFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBEb25lXG5cdFx0cmV0dXJuIHtcblx0XHRcdGZyb20sXG5cdFx0XHR0b1xuXHRcdH07XG5cblx0fSxcblx0c2hvdzogKCBub3RpZmljYXRpb246IE5vdGlmaWVyTm90aWZpY2F0aW9uICk6IE5vdGlmaWVyQW5pbWF0aW9uUHJlc2V0S2V5ZnJhbWVzID0+IHtcblxuXHRcdC8vIFByZXBhcmUgdmFyaWFibGVzXG5cdFx0Y29uc3QgY29uZmlnOiBOb3RpZmllckNvbmZpZyA9IG5vdGlmaWNhdGlvbi5jb21wb25lbnQuZ2V0Q29uZmlnKCk7XG5cdFx0bGV0IGZyb206IHtcblx0XHRcdFsgYW5pbWF0YWJsZVByb3BlcnR5TmFtZTogc3RyaW5nIF06IHN0cmluZztcblx0XHR9O1xuXHRcdGxldCB0bzoge1xuXHRcdFx0WyBhbmltYXRhYmxlUHJvcGVydHlOYW1lOiBzdHJpbmcgXTogc3RyaW5nO1xuXHRcdH07XG5cblx0XHQvLyBDb25maWd1cmUgdmFyaWFibGVzLCBkZXBlbmRpbmcgb24gY29uZmlndXJhdGlvbiBhbmQgY29tcG9uZW50XG5cdFx0aWYgKCBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5wb3NpdGlvbiA9PT0gJ2xlZnQnICkge1xuXHRcdFx0ZnJvbSA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoIGNhbGMoIC0xMDAlIC0gJHsgY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwuZGlzdGFuY2UgfXB4IC0gMTBweCApLCAwLCAwIClgXG5cdFx0XHR9O1xuXHRcdFx0dG8gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKCAwLCAwLCAwICknXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSBpZiAoIGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLnBvc2l0aW9uID09PSAncmlnaHQnICkge1xuXHRcdFx0ZnJvbSA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoIGNhbGMoIDEwMCUgKyAkeyBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5kaXN0YW5jZSB9cHggKyAxMHB4ICksIDAsIDAgKWBcblx0XHRcdH07XG5cdFx0XHR0byA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoIDAsIDAsIDAgKSdcblx0XHRcdH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBob3Jpem9udGFsUG9zaXRpb246IHN0cmluZztcblx0XHRcdGlmICggY29uZmlnLnBvc2l0aW9uLnZlcnRpY2FsLnBvc2l0aW9uID09PSAndG9wJyApIHtcblx0XHRcdFx0aG9yaXpvbnRhbFBvc2l0aW9uID0gYGNhbGMoIC0xMDAlIC0gJHsgY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwuZGlzdGFuY2UgfXB4IC0gMTBweCApYDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhvcml6b250YWxQb3NpdGlvbiA9IGBjYWxjKCAxMDAlICsgJHsgY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwuZGlzdGFuY2UgfXB4ICsgMTBweCApYDtcblx0XHRcdH1cblx0XHRcdGZyb20gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCAtNTAlLCAkeyBob3Jpem9udGFsUG9zaXRpb24gfSwgMCApYFxuXHRcdFx0fTtcblx0XHRcdHRvID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCggLTUwJSwgMCwgMCApJ1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBEb25lXG5cdFx0cmV0dXJuIHtcblx0XHRcdGZyb20sXG5cdFx0XHR0b1xuXHRcdH07XG5cblx0fVxufTtcbiJdfQ==