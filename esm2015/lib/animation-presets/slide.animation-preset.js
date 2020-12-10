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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuYW5pbWF0aW9uLXByZXNldC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9tc2l2YWRlL0Rldi9wcm9qZWN0cy9hbmd1bGFyLW5vdGlmaWVyL3Byb2plY3RzL2FuZ3VsYXItbm90aWZpZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL2FuaW1hdGlvbi1wcmVzZXRzL3NsaWRlLmFuaW1hdGlvbi1wcmVzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUE7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQTRCO0lBQzdDLElBQUksRUFBRSxDQUFFLFlBQWtDLEVBQXFDLEVBQUU7UUFFaEYsb0JBQW9CO1FBQ3BCLE1BQU0sTUFBTSxHQUFtQixZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xFLE1BQU0sS0FBSyxHQUFXLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEQsSUFBSSxJQUVILENBQUM7UUFDRixJQUFJLEVBRUgsQ0FBQztRQUVGLGdFQUFnRTtRQUNoRSxJQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUc7WUFDckQsSUFBSSxHQUFHO2dCQUNOLFNBQVMsRUFBRSxtQkFBb0IsS0FBTSxTQUFTO2FBQzlDLENBQUM7WUFDRixFQUFFLEdBQUc7Z0JBQ0osU0FBUyxFQUFFLDhCQUErQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFTLGdCQUFpQixLQUFNLFNBQVM7YUFDOUcsQ0FBQztTQUNGO2FBQU0sSUFBSyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFHO1lBQzdELElBQUksR0FBRztnQkFDTixTQUFTLEVBQUUsbUJBQW9CLEtBQU0sU0FBUzthQUM5QyxDQUFDO1lBQ0YsRUFBRSxHQUFHO2dCQUNKLFNBQVMsRUFBRSw2QkFBOEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUyxnQkFBaUIsS0FBTSxTQUFTO2FBQzdHLENBQUM7U0FDRjthQUFNO1lBQ04sSUFBSSxrQkFBMEIsQ0FBQztZQUMvQixJQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUc7Z0JBQ2xELGtCQUFrQixHQUFHLGlCQUFrQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFTLGFBQWEsQ0FBQzthQUN6RjtpQkFBTTtnQkFDTixrQkFBa0IsR0FBRyxnQkFBaUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUyxhQUFhLENBQUM7YUFDeEY7WUFDRCxJQUFJLEdBQUc7Z0JBQ04sU0FBUyxFQUFFLHNCQUF1QixLQUFNLFNBQVM7YUFDakQsQ0FBQztZQUNGLEVBQUUsR0FBRztnQkFDSixTQUFTLEVBQUUsc0JBQXVCLGtCQUFtQixPQUFPO2FBQzVELENBQUM7U0FDRjtRQUVELE9BQU87UUFDUCxPQUFPO1lBQ04sSUFBSTtZQUNKLEVBQUU7U0FDRixDQUFDO0lBRUgsQ0FBQztJQUNELElBQUksRUFBRSxDQUFFLFlBQWtDLEVBQXFDLEVBQUU7UUFFaEYsb0JBQW9CO1FBQ3BCLE1BQU0sTUFBTSxHQUFtQixZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xFLElBQUksSUFFSCxDQUFDO1FBQ0YsSUFBSSxFQUVILENBQUM7UUFFRixnRUFBZ0U7UUFDaEUsSUFBSyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFHO1lBQ3JELElBQUksR0FBRztnQkFDTixTQUFTLEVBQUUsOEJBQStCLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVMscUJBQXFCO2FBQ25HLENBQUM7WUFDRixFQUFFLEdBQUc7Z0JBQ0osU0FBUyxFQUFFLHdCQUF3QjthQUNuQyxDQUFDO1NBQ0Y7YUFBTSxJQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUc7WUFDN0QsSUFBSSxHQUFHO2dCQUNOLFNBQVMsRUFBRSw2QkFBOEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUyxxQkFBcUI7YUFDbEcsQ0FBQztZQUNGLEVBQUUsR0FBRztnQkFDSixTQUFTLEVBQUUsd0JBQXdCO2FBQ25DLENBQUM7U0FDRjthQUFNO1lBQ04sSUFBSSxrQkFBMEIsQ0FBQztZQUMvQixJQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUc7Z0JBQ2xELGtCQUFrQixHQUFHLGlCQUFrQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFTLGFBQWEsQ0FBQzthQUN6RjtpQkFBTTtnQkFDTixrQkFBa0IsR0FBRyxnQkFBaUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUyxhQUFhLENBQUM7YUFDeEY7WUFDRCxJQUFJLEdBQUc7Z0JBQ04sU0FBUyxFQUFFLHNCQUF1QixrQkFBbUIsT0FBTzthQUM1RCxDQUFDO1lBQ0YsRUFBRSxHQUFHO2dCQUNKLFNBQVMsRUFBRSwyQkFBMkI7YUFDdEMsQ0FBQztTQUNGO1FBRUQsT0FBTztRQUNQLE9BQU87WUFDTixJQUFJO1lBQ0osRUFBRTtTQUNGLENBQUM7SUFFSCxDQUFDO0NBQ0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vdGlmaWVyQW5pbWF0aW9uUHJlc2V0LCBOb3RpZmllckFuaW1hdGlvblByZXNldEtleWZyYW1lcyB9IGZyb20gJy4uL21vZGVscy9ub3RpZmllci1hbmltYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpZXJDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvbm90aWZpZXItY29uZmlnLm1vZGVsJztcbmltcG9ydCB7IE5vdGlmaWVyTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWVyLW5vdGlmaWNhdGlvbi5tb2RlbCc7XG5cbi8qKlxuICogU2xpZGUgYW5pbWF0aW9uIHByZXNldFxuICovXG5leHBvcnQgY29uc3Qgc2xpZGU6IE5vdGlmaWVyQW5pbWF0aW9uUHJlc2V0ID0ge1xuXHRoaWRlOiAoIG5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gKTogTm90aWZpZXJBbmltYXRpb25QcmVzZXRLZXlmcmFtZXMgPT4ge1xuXG5cdFx0Ly8gUHJlcGFyZSB2YXJpYWJsZXNcblx0XHRjb25zdCBjb25maWc6IE5vdGlmaWVyQ29uZmlnID0gbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRDb25maWcoKTtcblx0XHRjb25zdCBzaGlmdDogbnVtYmVyID0gbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRTaGlmdCgpO1xuXHRcdGxldCBmcm9tOiB7XG5cdFx0XHRbIGFuaW1hdGFibGVQcm9wZXJ0eU5hbWU6IHN0cmluZyBdOiBzdHJpbmc7XG5cdFx0fTtcblx0XHRsZXQgdG86IHtcblx0XHRcdFsgYW5pbWF0YWJsZVByb3BlcnR5TmFtZTogc3RyaW5nIF06IHN0cmluZztcblx0XHR9O1xuXG5cdFx0Ly8gQ29uZmlndXJlIHZhcmlhYmxlcywgZGVwZW5kaW5nIG9uIGNvbmZpZ3VyYXRpb24gYW5kIGNvbXBvbmVudFxuXHRcdGlmICggY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwucG9zaXRpb24gPT09ICdsZWZ0JyApIHtcblx0XHRcdGZyb20gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCAwLCAkeyBzaGlmdCB9cHgsIDAgKWBcblx0XHRcdH07XG5cdFx0XHR0byA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoIGNhbGMoIC0xMDAlIC0gJHsgY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwuZGlzdGFuY2UgfXB4IC0gMTBweCApLCAkeyBzaGlmdCB9cHgsIDAgKWBcblx0XHRcdH07XG5cdFx0fSBlbHNlIGlmICggY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwucG9zaXRpb24gPT09ICdyaWdodCcgKSB7XG5cdFx0XHRmcm9tID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCggMCwgJHsgc2hpZnQgfXB4LCAwIClgXG5cdFx0XHR9O1xuXHRcdFx0dG8gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCBjYWxjKCAxMDAlICsgJHsgY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwuZGlzdGFuY2UgfXB4ICsgMTBweCApLCAkeyBzaGlmdCB9cHgsIDAgKWBcblx0XHRcdH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBob3Jpem9udGFsUG9zaXRpb246IHN0cmluZztcblx0XHRcdGlmICggY29uZmlnLnBvc2l0aW9uLnZlcnRpY2FsLnBvc2l0aW9uID09PSAndG9wJyApIHtcblx0XHRcdFx0aG9yaXpvbnRhbFBvc2l0aW9uID0gYGNhbGMoIC0xMDAlIC0gJHsgY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwuZGlzdGFuY2UgfXB4IC0gMTBweCApYDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhvcml6b250YWxQb3NpdGlvbiA9IGBjYWxjKCAxMDAlICsgJHsgY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwuZGlzdGFuY2UgfXB4ICsgMTBweCApYDtcblx0XHRcdH1cblx0XHRcdGZyb20gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCAtNTAlLCAkeyBzaGlmdCB9cHgsIDAgKWBcblx0XHRcdH07XG5cdFx0XHR0byA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoIC01MCUsICR7IGhvcml6b250YWxQb3NpdGlvbiB9LCAwIClgXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIERvbmVcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZnJvbSxcblx0XHRcdHRvXG5cdFx0fTtcblxuXHR9LFxuXHRzaG93OiAoIG5vdGlmaWNhdGlvbjogTm90aWZpZXJOb3RpZmljYXRpb24gKTogTm90aWZpZXJBbmltYXRpb25QcmVzZXRLZXlmcmFtZXMgPT4ge1xuXG5cdFx0Ly8gUHJlcGFyZSB2YXJpYWJsZXNcblx0XHRjb25zdCBjb25maWc6IE5vdGlmaWVyQ29uZmlnID0gbm90aWZpY2F0aW9uLmNvbXBvbmVudC5nZXRDb25maWcoKTtcblx0XHRsZXQgZnJvbToge1xuXHRcdFx0WyBhbmltYXRhYmxlUHJvcGVydHlOYW1lOiBzdHJpbmcgXTogc3RyaW5nO1xuXHRcdH07XG5cdFx0bGV0IHRvOiB7XG5cdFx0XHRbIGFuaW1hdGFibGVQcm9wZXJ0eU5hbWU6IHN0cmluZyBdOiBzdHJpbmc7XG5cdFx0fTtcblxuXHRcdC8vIENvbmZpZ3VyZSB2YXJpYWJsZXMsIGRlcGVuZGluZyBvbiBjb25maWd1cmF0aW9uIGFuZCBjb21wb25lbnRcblx0XHRpZiAoIGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLnBvc2l0aW9uID09PSAnbGVmdCcgKSB7XG5cdFx0XHRmcm9tID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCggY2FsYyggLTEwMCUgLSAkeyBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5kaXN0YW5jZSB9cHggLSAxMHB4ICksIDAsIDAgKWBcblx0XHRcdH07XG5cdFx0XHR0byA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoIDAsIDAsIDAgKSdcblx0XHRcdH07XG5cdFx0fSBlbHNlIGlmICggY29uZmlnLnBvc2l0aW9uLmhvcml6b250YWwucG9zaXRpb24gPT09ICdyaWdodCcgKSB7XG5cdFx0XHRmcm9tID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCggY2FsYyggMTAwJSArICR7IGNvbmZpZy5wb3NpdGlvbi5ob3Jpem9udGFsLmRpc3RhbmNlIH1weCArIDEwcHggKSwgMCwgMCApYFxuXHRcdFx0fTtcblx0XHRcdHRvID0ge1xuXHRcdFx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCggMCwgMCwgMCApJ1xuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGhvcml6b250YWxQb3NpdGlvbjogc3RyaW5nO1xuXHRcdFx0aWYgKCBjb25maWcucG9zaXRpb24udmVydGljYWwucG9zaXRpb24gPT09ICd0b3AnICkge1xuXHRcdFx0XHRob3Jpem9udGFsUG9zaXRpb24gPSBgY2FsYyggLTEwMCUgLSAkeyBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5kaXN0YW5jZSB9cHggLSAxMHB4IClgO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aG9yaXpvbnRhbFBvc2l0aW9uID0gYGNhbGMoIDEwMCUgKyAkeyBjb25maWcucG9zaXRpb24uaG9yaXpvbnRhbC5kaXN0YW5jZSB9cHggKyAxMHB4IClgO1xuXHRcdFx0fVxuXHRcdFx0ZnJvbSA9IHtcblx0XHRcdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoIC01MCUsICR7IGhvcml6b250YWxQb3NpdGlvbiB9LCAwIClgXG5cdFx0XHR9O1xuXHRcdFx0dG8gPSB7XG5cdFx0XHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKCAtNTAlLCAwLCAwICknXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIERvbmVcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZnJvbSxcblx0XHRcdHRvXG5cdFx0fTtcblxuXHR9XG59O1xuIl19