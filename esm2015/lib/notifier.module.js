import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotifierContainerComponent } from './components/notifier-container.component';
import { NotifierNotificationComponent } from './components/notifier-notification.component';
import { NotifierConfig } from './models/notifier-config.model';
import { NotifierAnimationService } from './services/notifier-animation.service';
import { NotifierQueueService } from './services/notifier-queue.service';
import { NotifierService } from './services/notifier.service';
import { NotifierConfigToken, NotifierOptionsToken } from './notifier.tokens';
import * as i0 from "@angular/core";
/**
 * Factory for a notifier configuration with custom options
 *
 * Sidenote:
 * Required as Angular AoT compilation cannot handle dynamic functions; see <https://github.com/angular/angular/issues/11262>.
 *
 * @param   options - Custom notifier options
 * @returns - Notifier configuration as result
 */
export function notifierCustomConfigFactory(options) {
    return new NotifierConfig(options);
}
/**
 * Factory for a notifier configuration with default options
 *
 * Sidenote:
 * Required as Angular AoT compilation cannot handle dynamic functions; see <https://github.com/angular/angular/issues/11262>.
 *
 * @returns - Notifier configuration as result
 */
export function notifierDefaultConfigFactory() {
    return new NotifierConfig({});
}
/**
 * Notifier module
 */
export class NotifierModule {
    /**
     * Setup the notifier module with custom providers, in this case with a custom configuration based on the givne options
     *
     * @param   [options={}] - Custom notifier options
     * @returns - Notifier module with custom providers
     */
    static withConfig(options = {}) {
        return {
            ngModule: NotifierModule,
            providers: [
                // Provide the options itself upfront (as we need to inject them as dependencies -- see below)
                {
                    provide: NotifierOptionsToken,
                    useValue: options
                },
                // Provide a custom notifier configuration, based on the given notifier options
                {
                    deps: [
                        NotifierOptionsToken
                    ],
                    provide: NotifierConfigToken,
                    useFactory: notifierCustomConfigFactory
                }
            ]
        };
    }
}
/** @nocollapse */ NotifierModule.ɵmod = i0.ɵɵdefineNgModule({ type: NotifierModule });
/** @nocollapse */ NotifierModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NotifierModule_Factory(t) { return new (t || NotifierModule)(); }, providers: [
        NotifierAnimationService,
        NotifierService,
        NotifierQueueService,
        // Provide the default notifier configuration if just the module is imported
        {
            provide: NotifierConfigToken,
            useFactory: notifierDefaultConfigFactory
        }
    ], imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NotifierModule, { declarations: [NotifierContainerComponent,
        NotifierNotificationComponent], imports: [CommonModule], exports: [NotifierContainerComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NotifierModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    NotifierContainerComponent,
                    NotifierNotificationComponent
                ],
                exports: [
                    NotifierContainerComponent
                ],
                imports: [
                    CommonModule
                ],
                providers: [
                    NotifierAnimationService,
                    NotifierService,
                    NotifierQueueService,
                    // Provide the default notifier configuration if just the module is imported
                    {
                        provide: NotifierConfigToken,
                        useFactory: notifierDefaultConfigFactory
                    }
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ub3RpZmllci8iLCJzb3VyY2VzIjpbImxpYi9ub3RpZmllci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUMsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzdGLE9BQU8sRUFBRSxjQUFjLEVBQW1CLE1BQU0sZ0NBQWdDLENBQUM7QUFDakYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDakYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUU5RTs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSwyQkFBMkIsQ0FBRSxPQUF3QjtJQUNwRSxPQUFPLElBQUksY0FBYyxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ3RDLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLDRCQUE0QjtJQUMzQyxPQUFPLElBQUksY0FBYyxDQUFFLEVBQUUsQ0FBRSxDQUFDO0FBQ2pDLENBQUM7QUFFRDs7R0FFRztBQXlCSCxNQUFNLE9BQU8sY0FBYztJQUUxQjs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUUsVUFBMkIsRUFBRTtRQUN0RCxPQUFPO1lBQ04sUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUVWLDhGQUE4RjtnQkFDOUY7b0JBQ0MsT0FBTyxFQUFFLG9CQUFvQjtvQkFDN0IsUUFBUSxFQUFFLE9BQU87aUJBQ2pCO2dCQUVELCtFQUErRTtnQkFDL0U7b0JBQ0MsSUFBSSxFQUFFO3dCQUNMLG9CQUFvQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFLG1CQUFtQjtvQkFDNUIsVUFBVSxFQUFFLDJCQUEyQjtpQkFDdkM7YUFFRDtTQUNELENBQUM7SUFDSCxDQUFDOztxRUE5QlcsY0FBYzs4SEFBZCxjQUFjLG1CQWJmO1FBQ1Ysd0JBQXdCO1FBQ3hCLGVBQWU7UUFDZixvQkFBb0I7UUFFcEIsNEVBQTRFO1FBQzVFO1lBQ0MsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixVQUFVLEVBQUUsNEJBQTRCO1NBQ3hDO0tBRUQsWUFkUTtZQUNSLFlBQVk7U0FDWjt3RkFjVyxjQUFjLG1CQXRCekIsMEJBQTBCO1FBQzFCLDZCQUE2QixhQU03QixZQUFZLGFBSFosMEJBQTBCO2tEQWtCZixjQUFjO2NBeEIxQixRQUFRO2VBQUU7Z0JBQ1YsWUFBWSxFQUFFO29CQUNiLDBCQUEwQjtvQkFDMUIsNkJBQTZCO2lCQUM3QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1IsMEJBQTBCO2lCQUMxQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1IsWUFBWTtpQkFDWjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1Ysd0JBQXdCO29CQUN4QixlQUFlO29CQUNmLG9CQUFvQjtvQkFFcEIsNEVBQTRFO29CQUM1RTt3QkFDQyxPQUFPLEVBQUUsbUJBQW1CO3dCQUM1QixVQUFVLEVBQUUsNEJBQTRCO3FCQUN4QztpQkFFRDthQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOb3RpZmllckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ub3RpZmllci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdGlmaWVyTm90aWZpY2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25vdGlmaWVyLW5vdGlmaWNhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm90aWZpZXJDb25maWcsIE5vdGlmaWVyT3B0aW9ucyB9IGZyb20gJy4vbW9kZWxzL25vdGlmaWVyLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllckFuaW1hdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25vdGlmaWVyLWFuaW1hdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWVyUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ub3RpZmllci1xdWV1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbm90aWZpZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmllckNvbmZpZ1Rva2VuLCBOb3RpZmllck9wdGlvbnNUb2tlbiB9IGZyb20gJy4vbm90aWZpZXIudG9rZW5zJztcblxuLyoqXG4gKiBGYWN0b3J5IGZvciBhIG5vdGlmaWVyIGNvbmZpZ3VyYXRpb24gd2l0aCBjdXN0b20gb3B0aW9uc1xuICpcbiAqIFNpZGVub3RlOlxuICogUmVxdWlyZWQgYXMgQW5ndWxhciBBb1QgY29tcGlsYXRpb24gY2Fubm90IGhhbmRsZSBkeW5hbWljIGZ1bmN0aW9uczsgc2VlIDxodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMTI2Mj4uXG4gKlxuICogQHBhcmFtICAgb3B0aW9ucyAtIEN1c3RvbSBub3RpZmllciBvcHRpb25zXG4gKiBAcmV0dXJucyAtIE5vdGlmaWVyIGNvbmZpZ3VyYXRpb24gYXMgcmVzdWx0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3RpZmllckN1c3RvbUNvbmZpZ0ZhY3RvcnkoIG9wdGlvbnM6IE5vdGlmaWVyT3B0aW9ucyApOiBOb3RpZmllckNvbmZpZyB7XG5cdHJldHVybiBuZXcgTm90aWZpZXJDb25maWcoIG9wdGlvbnMgKTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IGZvciBhIG5vdGlmaWVyIGNvbmZpZ3VyYXRpb24gd2l0aCBkZWZhdWx0IG9wdGlvbnNcbiAqXG4gKiBTaWRlbm90ZTpcbiAqIFJlcXVpcmVkIGFzIEFuZ3VsYXIgQW9UIGNvbXBpbGF0aW9uIGNhbm5vdCBoYW5kbGUgZHluYW1pYyBmdW5jdGlvbnM7IHNlZSA8aHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTEyNjI+LlxuICpcbiAqIEByZXR1cm5zIC0gTm90aWZpZXIgY29uZmlndXJhdGlvbiBhcyByZXN1bHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vdGlmaWVyRGVmYXVsdENvbmZpZ0ZhY3RvcnkoKTogTm90aWZpZXJDb25maWcge1xuXHRyZXR1cm4gbmV3IE5vdGlmaWVyQ29uZmlnKCB7fSApO1xufVxuXG4vKipcbiAqIE5vdGlmaWVyIG1vZHVsZVxuICovXG5ATmdNb2R1bGUoIHtcblx0ZGVjbGFyYXRpb25zOiBbXG5cdFx0Tm90aWZpZXJDb250YWluZXJDb21wb25lbnQsXG5cdFx0Tm90aWZpZXJOb3RpZmljYXRpb25Db21wb25lbnRcblx0XSxcblx0ZXhwb3J0czogW1xuXHRcdE5vdGlmaWVyQ29udGFpbmVyQ29tcG9uZW50XG5cdF0sXG5cdGltcG9ydHM6IFtcblx0XHRDb21tb25Nb2R1bGVcblx0XSxcblx0cHJvdmlkZXJzOiBbXG5cdFx0Tm90aWZpZXJBbmltYXRpb25TZXJ2aWNlLFxuXHRcdE5vdGlmaWVyU2VydmljZSxcblx0XHROb3RpZmllclF1ZXVlU2VydmljZSxcblxuXHRcdC8vIFByb3ZpZGUgdGhlIGRlZmF1bHQgbm90aWZpZXIgY29uZmlndXJhdGlvbiBpZiBqdXN0IHRoZSBtb2R1bGUgaXMgaW1wb3J0ZWRcblx0XHR7XG5cdFx0XHRwcm92aWRlOiBOb3RpZmllckNvbmZpZ1Rva2VuLFxuXHRcdFx0dXNlRmFjdG9yeTogbm90aWZpZXJEZWZhdWx0Q29uZmlnRmFjdG9yeVxuXHRcdH1cblxuXHRdXG59IClcbmV4cG9ydCBjbGFzcyBOb3RpZmllck1vZHVsZSB7XG5cblx0LyoqXG5cdCAqIFNldHVwIHRoZSBub3RpZmllciBtb2R1bGUgd2l0aCBjdXN0b20gcHJvdmlkZXJzLCBpbiB0aGlzIGNhc2Ugd2l0aCBhIGN1c3RvbSBjb25maWd1cmF0aW9uIGJhc2VkIG9uIHRoZSBnaXZuZSBvcHRpb25zXG5cdCAqXG5cdCAqIEBwYXJhbSAgIFtvcHRpb25zPXt9XSAtIEN1c3RvbSBub3RpZmllciBvcHRpb25zXG5cdCAqIEByZXR1cm5zIC0gTm90aWZpZXIgbW9kdWxlIHdpdGggY3VzdG9tIHByb3ZpZGVyc1xuXHQgKi9cblx0cHVibGljIHN0YXRpYyB3aXRoQ29uZmlnKCBvcHRpb25zOiBOb3RpZmllck9wdGlvbnMgPSB7fSApOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bmdNb2R1bGU6IE5vdGlmaWVyTW9kdWxlLFxuXHRcdFx0cHJvdmlkZXJzOiBbXG5cblx0XHRcdFx0Ly8gUHJvdmlkZSB0aGUgb3B0aW9ucyBpdHNlbGYgdXBmcm9udCAoYXMgd2UgbmVlZCB0byBpbmplY3QgdGhlbSBhcyBkZXBlbmRlbmNpZXMgLS0gc2VlIGJlbG93KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cHJvdmlkZTogTm90aWZpZXJPcHRpb25zVG9rZW4sXG5cdFx0XHRcdFx0dXNlVmFsdWU6IG9wdGlvbnNcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBQcm92aWRlIGEgY3VzdG9tIG5vdGlmaWVyIGNvbmZpZ3VyYXRpb24sIGJhc2VkIG9uIHRoZSBnaXZlbiBub3RpZmllciBvcHRpb25zXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRkZXBzOiBbXG5cdFx0XHRcdFx0XHROb3RpZmllck9wdGlvbnNUb2tlblxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0cHJvdmlkZTogTm90aWZpZXJDb25maWdUb2tlbixcblx0XHRcdFx0XHR1c2VGYWN0b3J5OiBub3RpZmllckN1c3RvbUNvbmZpZ0ZhY3Rvcnlcblx0XHRcdFx0fVxuXG5cdFx0XHRdXG5cdFx0fTtcblx0fVxuXG59XG4iXX0=