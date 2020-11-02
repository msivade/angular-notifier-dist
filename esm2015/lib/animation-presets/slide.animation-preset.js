/**
 * Slide animation preset
 */
export const slide = {
    hide: (notification) => {
        // Prepare variables
        const config = notification.component.getConfig();
        const shift = notification.component.getShift();
        let from;
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
    },
    show: (notification) => {
        // Prepare variables
        const config = notification.component.getConfig();
        let from;
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
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuYW5pbWF0aW9uLXByZXNldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbm90aWZpZXIvIiwic291cmNlcyI6WyJsaWIvYW5pbWF0aW9uLXByZXNldHMvc2xpZGUuYW5pbWF0aW9uLXByZXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBNEI7SUFDN0MsSUFBSSxFQUFFLENBQUUsWUFBa0MsRUFBcUMsRUFBRTtRQUVoRixvQkFBb0I7UUFDcEIsTUFBTSxNQUFNLEdBQW1CLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbEUsTUFBTSxLQUFLLEdBQVcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4RCxJQUFJLElBRUgsQ0FBQztRQUNGLElBQUksRUFFSCxDQUFDO1FBRUYsZ0VBQWdFO1FBQ2hFLElBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRztZQUNyRCxJQUFJLEdBQUc7Z0JBQ04sU0FBUyxFQUFFLG1CQUFvQixLQUFNLFNBQVM7YUFDOUMsQ0FBQztZQUNGLEVBQUUsR0FBRztnQkFDSixTQUFTLEVBQUUsOEJBQStCLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVMsZ0JBQWlCLEtBQU0sU0FBUzthQUM5RyxDQUFDO1NBQ0Y7YUFBTSxJQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUc7WUFDN0QsSUFBSSxHQUFHO2dCQUNOLFNBQVMsRUFBRSxtQkFBb0IsS0FBTSxTQUFTO2FBQzlDLENBQUM7WUFDRixFQUFFLEdBQUc7Z0JBQ0osU0FBUyxFQUFFLDZCQUE4QixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFTLGdCQUFpQixLQUFNLFNBQVM7YUFDN0csQ0FBQztTQUNGO2FBQU07WUFDTixJQUFJLGtCQUEwQixDQUFDO1lBQy9CLElBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRztnQkFDbEQsa0JBQWtCLEdBQUcsaUJBQWtCLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVMsYUFBYSxDQUFDO2FBQ3pGO2lCQUFNO2dCQUNOLGtCQUFrQixHQUFHLGdCQUFpQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFTLGFBQWEsQ0FBQzthQUN4RjtZQUNELElBQUksR0FBRztnQkFDTixTQUFTLEVBQUUsc0JBQXVCLEtBQU0sU0FBUzthQUNqRCxDQUFDO1lBQ0YsRUFBRSxHQUFHO2dCQUNKLFNBQVMsRUFBRSxzQkFBdUIsa0JBQW1CLE9BQU87YUFDNUQsQ0FBQztTQUNGO1FBRUQsT0FBTztRQUNQLE9BQU87WUFDTixJQUFJO1lBQ0osRUFBRTtTQUNGLENBQUM7SUFFSCxDQUFDO0lBQ0QsSUFBSSxFQUFFLENBQUUsWUFBa0MsRUFBcUMsRUFBRTtRQUVoRixvQkFBb0I7UUFDcEIsTUFBTSxNQUFNLEdBQW1CLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbEUsSUFBSSxJQUVILENBQUM7UUFDRixJQUFJLEVBRUgsQ0FBQztRQUVGLGdFQUFnRTtRQUNoRSxJQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUc7WUFDckQsSUFBSSxHQUFHO2dCQUNOLFNBQVMsRUFBRSw4QkFBK0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUyxxQkFBcUI7YUFDbkcsQ0FBQztZQUNGLEVBQUUsR0FBRztnQkFDSixTQUFTLEVBQUUsd0JBQXdCO2FBQ25DLENBQUM7U0FDRjthQUFNLElBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRztZQUM3RCxJQUFJLEdBQUc7Z0JBQ04sU0FBUyxFQUFFLDZCQUE4QixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFTLHFCQUFxQjthQUNsRyxDQUFDO1lBQ0YsRUFBRSxHQUFHO2dCQUNKLFNBQVMsRUFBRSx3QkFBd0I7YUFDbkMsQ0FBQztTQUNGO2FBQU07WUFDTixJQUFJLGtCQUEwQixDQUFDO1lBQy9CLElBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRztnQkFDbEQsa0JBQWtCLEdBQUcsaUJBQWtCLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVMsYUFBYSxDQUFDO2FBQ3pGO2lCQUFNO2dCQUNOLGtCQUFrQixHQUFHLGdCQUFpQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFTLGFBQWEsQ0FBQzthQUN4RjtZQUNELElBQUksR0FBRztnQkFDTixTQUFTLEVBQUUsc0JBQXVCLGtCQUFtQixPQUFPO2FBQzVELENBQUM7WUFDRixFQUFFLEdBQUc7Z0JBQ0osU0FBUyxFQUFFLDJCQUEyQjthQUN0QyxDQUFDO1NBQ0Y7UUFFRCxPQUFPO1FBQ1AsT0FBTztZQUNOLElBQUk7WUFDSixFQUFFO1NBQ0YsQ0FBQztJQUVILENBQUM7Q0FDRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTm90aWZpZXJBbmltYXRpb25QcmVzZXQsIE5vdGlmaWVyQW5pbWF0aW9uUHJlc2V0S2V5ZnJhbWVzIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLWFuaW1hdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllckNvbmZpZyB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1jb25maWcubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpZXJOb3RpZmljYXRpb24gfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItbm90aWZpY2F0aW9uLm1vZGVsJztcblxuLyoqXG4gKiBTbGlkZSBhbmltYXRpb24gcHJlc2V0XG4gKi9cbmV4cG9ydCBjb25zdCBzbGlkZTogTm90aWZpZXJBbmltYXRpb25QcmVzZXQgPSB7XG5cdGhpZGU6ICggbm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiApOiBOb3RpZmllckFuaW1hdGlvblByZXNldEtleWZyYW1lcyA9PiB7XG5cblx0XHQvLyBQcmVwYXJlIHZhcmlhYmxlc1xuXHRcdGNvbnN0IGNvbmZpZzogTm90aWZpZXJDb25maWcgPSBub3RpZmljYXRpb24uY29tcG9uZW50LmdldENvbmZpZygpO1xuXHRcdGNvbnN0IHNoaWZ0OiBudW1iZXIgPSBub3RpZmljYXRpb24uY29tcG9uZW50LmdldFNoaWZ0KCk7XG5cdFx0bGV0IGZyb206IHtcblx0XHRcdFsgYW5pbWF0YWJsZVByb3BlcnR5TmFtZTogc3RyaW5nIF06IHN0cmluZztcblx0XHR9O1xuXHRcdGxldCB0bzoge1xuXHRcdFx0WyBhbmltYXRhYmxlUHJvcGVydHlOYW1lOiBzdHJpbmcgXTogc3RyaW5nO1xuXHRcdH07XG5cblx0XHQvLyBDb25maWd1cmUgdmFyaWFibGVzLCBkZXBlbmRpbmcgb24gY29uZmlndXJhdGlvbiBhbmQgY29tcG9uZW50XG5cdFx0aWYgKCBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5wb3NpdGlvbiA9PT0gJ2xlZnQnICkge1xuXHRcdFx0ZnJvbSA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoIDAsICR7IHNoaWZ0IH1weCwgMCApYFxuXHRcdFx0fTtcblx0XHRcdHRvID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCggY2FsYyggLTEwMCUgLSAkeyBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5kaXN0YW5jZSB9cHggLSAxMHB4ICksICR7IHNoaWZ0IH1weCwgMCApYFxuXHRcdFx0fTtcblx0XHR9IGVsc2UgaWYgKCBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5wb3NpdGlvbiA9PT0gJ3JpZ2h0JyApIHtcblx0XHRcdGZyb20gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCAwLCAkeyBzaGlmdCB9cHgsIDAgKWBcblx0XHRcdH07XG5cdFx0XHR0byA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoIGNhbGMoIDEwMCUgKyAkeyBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5kaXN0YW5jZSB9cHggKyAxMHB4ICksICR7IHNoaWZ0IH1weCwgMCApYFxuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGhvcml6b250YWxQb3NpdGlvbjogc3RyaW5nO1xuXHRcdFx0aWYgKCBjb25maWcucG9zaXRpb24udmVydGljYWwucG9zaXRpb24gPT09ICd0b3AnICkge1xuXHRcdFx0XHRob3Jpem9udGFsUG9zaXRpb24gPSBgY2FsYyggLTEwMCUgLSAkeyBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5kaXN0YW5jZSB9cHggLSAxMHB4IClgO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aG9yaXpvbnRhbFBvc2l0aW9uID0gYGNhbGMoIDEwMCUgKyAkeyBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5kaXN0YW5jZSB9cHggKyAxMHB4IClgO1xuXHRcdFx0fVxuXHRcdFx0ZnJvbSA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoIC01MCUsICR7IHNoaWZ0IH1weCwgMCApYFxuXHRcdFx0fTtcblx0XHRcdHRvID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCggLTUwJSwgJHsgaG9yaXpvbnRhbFBvc2l0aW9uIH0sIDAgKWBcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gRG9uZVxuXHRcdHJldHVybiB7XG5cdFx0XHRmcm9tLFxuXHRcdFx0dG9cblx0XHR9O1xuXG5cdH0sXG5cdHNob3c6ICggbm90aWZpY2F0aW9uOiBOb3RpZmllck5vdGlmaWNhdGlvbiApOiBOb3RpZmllckFuaW1hdGlvblByZXNldEtleWZyYW1lcyA9PiB7XG5cblx0XHQvLyBQcmVwYXJlIHZhcmlhYmxlc1xuXHRcdGNvbnN0IGNvbmZpZzogTm90aWZpZXJDb25maWcgPSBub3RpZmljYXRpb24uY29tcG9uZW50LmdldENvbmZpZygpO1xuXHRcdGxldCBmcm9tOiB7XG5cdFx0XHRbIGFuaW1hdGFibGVQcm9wZXJ0eU5hbWU6IHN0cmluZyBdOiBzdHJpbmc7XG5cdFx0fTtcblx0XHRsZXQgdG86IHtcblx0XHRcdFsgYW5pbWF0YWJsZVByb3BlcnR5TmFtZTogc3RyaW5nIF06IHN0cmluZztcblx0XHR9O1xuXG5cdFx0Ly8gQ29uZmlndXJlIHZhcmlhYmxlcywgZGVwZW5kaW5nIG9uIGNvbmZpZ3VyYXRpb24gYW5kIGNvbXBvbmVudFxuXHRcdGlmICggY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwucG9zaXRpb24gPT09ICdsZWZ0JyApIHtcblx0XHRcdGZyb20gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCBjYWxjKCAtMTAwJSAtICR7IGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weCAtIDEwcHggKSwgMCwgMCApYFxuXHRcdFx0fTtcblx0XHRcdHRvID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCggMCwgMCwgMCApJ1xuXHRcdFx0fTtcblx0XHR9IGVsc2UgaWYgKCBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5wb3NpdGlvbiA9PT0gJ3JpZ2h0JyApIHtcblx0XHRcdGZyb20gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCBjYWxjKCAxMDAlICsgJHsgY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwuZGlzdGFuY2UgfXB4ICsgMTBweCApLCAwLCAwIClgXG5cdFx0XHR9O1xuXHRcdFx0dG8gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKCAwLCAwLCAwICknXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgaG9yaXpvbnRhbFBvc2l0aW9uOiBzdHJpbmc7XG5cdFx0XHRpZiAoIGNvbmZpZy5wb3NpdGlvbi52ZXJ0aWNhbC5wb3NpdGlvbiA9PT0gJ3RvcCcgKSB7XG5cdFx0XHRcdGhvcml6b250YWxQb3NpdGlvbiA9IGBjYWxjKCAtMTAwJSAtICR7IGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weCAtIDEwcHggKWA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRob3Jpem9udGFsUG9zaXRpb24gPSBgY2FsYyggMTAwJSArICR7IGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weCArIDEwcHggKWA7XG5cdFx0XHR9XG5cdFx0XHRmcm9tID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCggLTUwJSwgJHsgaG9yaXpvbnRhbFBvc2l0aW9uIH0sIDAgKWBcblx0XHRcdH07XG5cdFx0XHR0byA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoIC01MCUsIDAsIDAgKSdcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gRG9uZVxuXHRcdHJldHVybiB7XG5cdFx0XHRmcm9tLFxuXHRcdFx0dG9cblx0XHR9O1xuXG5cdH1cbn07XG4iXX0=