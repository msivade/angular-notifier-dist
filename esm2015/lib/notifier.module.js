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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL21zaXZhZGUvRGV2L3Byb2plY3RzL2FuZ3VsYXItbm90aWZpZXIvcHJvamVjdHMvYW5ndWxhci1ub3RpZmllci9zcmMvIiwic291cmNlcyI6WyJsaWIvbm90aWZpZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM3RixPQUFPLEVBQUUsY0FBYyxFQUFtQixNQUFNLGdDQUFnQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFOUU7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsMkJBQTJCLENBQUUsT0FBd0I7SUFDcEUsT0FBTyxJQUFJLGNBQWMsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUN0QyxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSw0QkFBNEI7SUFDM0MsT0FBTyxJQUFJLGNBQWMsQ0FBRSxFQUFFLENBQUUsQ0FBQztBQUNqQyxDQUFDO0FBRUQ7O0dBRUc7QUF5QkgsTUFBTSxPQUFPLGNBQWM7SUFFMUI7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFFLFVBQTJCLEVBQUU7UUFDdEQsT0FBTztZQUNOLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFFViw4RkFBOEY7Z0JBQzlGO29CQUNDLE9BQU8sRUFBRSxvQkFBb0I7b0JBQzdCLFFBQVEsRUFBRSxPQUFPO2lCQUNqQjtnQkFFRCwrRUFBK0U7Z0JBQy9FO29CQUNDLElBQUksRUFBRTt3QkFDTCxvQkFBb0I7cUJBQ3BCO29CQUNELE9BQU8sRUFBRSxtQkFBbUI7b0JBQzVCLFVBQVUsRUFBRSwyQkFBMkI7aUJBQ3ZDO2FBRUQ7U0FDRCxDQUFDO0lBQ0gsQ0FBQzs7cUVBOUJXLGNBQWM7OEhBQWQsY0FBYyxtQkFiZjtRQUNWLHdCQUF3QjtRQUN4QixlQUFlO1FBQ2Ysb0JBQW9CO1FBRXBCLDRFQUE0RTtRQUM1RTtZQUNDLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsVUFBVSxFQUFFLDRCQUE0QjtTQUN4QztLQUVELFlBZFE7WUFDUixZQUFZO1NBQ1o7d0ZBY1csY0FBYyxtQkF0QnpCLDBCQUEwQjtRQUMxQiw2QkFBNkIsYUFNN0IsWUFBWSxhQUhaLDBCQUEwQjtrREFrQmYsY0FBYztjQXhCMUIsUUFBUTtlQUFFO2dCQUNWLFlBQVksRUFBRTtvQkFDYiwwQkFBMEI7b0JBQzFCLDZCQUE2QjtpQkFDN0I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNSLDBCQUEwQjtpQkFDMUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNSLFlBQVk7aUJBQ1o7Z0JBQ0QsU0FBUyxFQUFFO29CQUNWLHdCQUF3QjtvQkFDeEIsZUFBZTtvQkFDZixvQkFBb0I7b0JBRXBCLDRFQUE0RTtvQkFDNUU7d0JBQ0MsT0FBTyxFQUFFLG1CQUFtQjt3QkFDNUIsVUFBVSxFQUFFLDRCQUE0QjtxQkFDeEM7aUJBRUQ7YUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOb3RpZmllckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ub3RpZmllci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdGlmaWVyTm90aWZpY2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25vdGlmaWVyLW5vdGlmaWNhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm90aWZpZXJDb25maWcsIE5vdGlmaWVyT3B0aW9ucyB9IGZyb20gJy4vbW9kZWxzL25vdGlmaWVyLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmllckFuaW1hdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25vdGlmaWVyLWFuaW1hdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWVyUXVldWVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ub3RpZmllci1xdWV1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbm90aWZpZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmllckNvbmZpZ1Rva2VuLCBOb3RpZmllck9wdGlvbnNUb2tlbiB9IGZyb20gJy4vbm90aWZpZXIudG9rZW5zJztcblxuLyoqXG4gKiBGYWN0b3J5IGZvciBhIG5vdGlmaWVyIGNvbmZpZ3VyYXRpb24gd2l0aCBjdXN0b20gb3B0aW9uc1xuICpcbiAqIFNpZGVub3RlOlxuICogUmVxdWlyZWQgYXMgQW5ndWxhciBBb1QgY29tcGlsYXRpb24gY2Fubm90IGhhbmRsZSBkeW5hbWljIGZ1bmN0aW9uczsgc2VlIDxodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMTI2Mj4uXG4gKlxuICogQHBhcmFtICAgb3B0aW9ucyAtIEN1c3RvbSBub3RpZmllciBvcHRpb25zXG4gKiBAcmV0dXJucyAtIE5vdGlmaWVyIGNvbmZpZ3VyYXRpb24gYXMgcmVzdWx0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3RpZmllckN1c3RvbUNvbmZpZ0ZhY3RvcnkoIG9wdGlvbnM6IE5vdGlmaWVyT3B0aW9ucyApOiBOb3RpZmllckNvbmZpZyB7XG5cdHJldHVybiBuZXcgTm90aWZpZXJDb25maWcoIG9wdGlvbnMgKTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IGZvciBhIG5vdGlmaWVyIGNvbmZpZ3VyYXRpb24gd2l0aCBkZWZhdWx0IG9wdGlvbnNcbiAqXG4gKiBTaWRlbm90ZTpcbiAqIFJlcXVpcmVkIGFzIEFuZ3VsYXIgQW9UIGNvbXBpbGF0aW9uIGNhbm5vdCBoYW5kbGUgZHluYW1pYyBmdW5jdGlvbnM7IHNlZSA8aHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTEyNjI+LlxuICpcbiAqIEByZXR1cm5zIC0gTm90aWZpZXIgY29uZmlndXJhdGlvbiBhcyByZXN1bHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vdGlmaWVyRGVmYXVsdENvbmZpZ0ZhY3RvcnkoKTogTm90aWZpZXJDb25maWcge1xuXHRyZXR1cm4gbmV3IE5vdGlmaWVyQ29uZmlnKCB7fSApO1xufVxuXG4vKipcbiAqIE5vdGlmaWVyIG1vZHVsZVxuICovXG5ATmdNb2R1bGUoIHtcblx0ZGVjbGFyYXRpb25zOiBbXG5cdFx0Tm90aWZpZXJDb250YWluZXJDb21wb25lbnQsXG5cdFx0Tm90aWZpZXJOb3RpZmljYXRpb25Db21wb25lbnRcblx0XSxcblx0ZXhwb3J0czogW1xuXHRcdE5vdGlmaWVyQ29udGFpbmVyQ29tcG9uZW50XG5cdF0sXG5cdGltcG9ydHM6IFtcblx0XHRDb21tb25Nb2R1bGVcblx0XSxcblx0cHJvdmlkZXJzOiBbXG5cdFx0Tm90aWZpZXJBbmltYXRpb25TZXJ2aWNlLFxuXHRcdE5vdGlmaWVyU2VydmljZSxcblx0XHROb3RpZmllclF1ZXVlU2VydmljZSxcblxuXHRcdC8vIFByb3ZpZGUgdGhlIGRlZmF1bHQgbm90aWZpZXIgY29uZmlndXJhdGlvbiBpZiBqdXN0IHRoZSBtb2R1bGUgaXMgaW1wb3J0ZWRcblx0XHR7XG5cdFx0XHRwcm92aWRlOiBOb3RpZmllckNvbmZpZ1Rva2VuLFxuXHRcdFx0dXNlRmFjdG9yeTogbm90aWZpZXJEZWZhdWx0Q29uZmlnRmFjdG9yeVxuXHRcdH1cblxuXHRdXG59IClcbmV4cG9ydCBjbGFzcyBOb3RpZmllck1vZHVsZSB7XG5cblx0LyoqXG5cdCAqIFNldHVwIHRoZSBub3RpZmllciBtb2R1bGUgd2l0aCBjdXN0b20gcHJvdmlkZXJzLCBpbiB0aGlzIGNhc2Ugd2l0aCBhIGN1c3RvbSBjb25maWd1cmF0aW9uIGJhc2VkIG9uIHRoZSBnaXZuZSBvcHRpb25zXG5cdCAqXG5cdCAqIEBwYXJhbSAgIFtvcHRpb25zPXt9XSAtIEN1c3RvbSBub3RpZmllciBvcHRpb25zXG5cdCAqIEByZXR1cm5zIC0gTm90aWZpZXIgbW9kdWxlIHdpdGggY3VzdG9tIHByb3ZpZGVyc1xuXHQgKi9cblx0cHVibGljIHN0YXRpYyB3aXRoQ29uZmlnKCBvcHRpb25zOiBOb3RpZmllck9wdGlvbnMgPSB7fSApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5vdGlmaWVyTW9kdWxlPiB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG5nTW9kdWxlOiBOb3RpZmllck1vZHVsZSxcblx0XHRcdHByb3ZpZGVyczogW1xuXG5cdFx0XHRcdC8vIFByb3ZpZGUgdGhlIG9wdGlvbnMgaXRzZWxmIHVwZnJvbnQgKGFzIHdlIG5lZWQgdG8gaW5qZWN0IHRoZW0gYXMgZGVwZW5kZW5jaWVzIC0tIHNlZSBiZWxvdylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHByb3ZpZGU6IE5vdGlmaWVyT3B0aW9uc1Rva2VuLFxuXHRcdFx0XHRcdHVzZVZhbHVlOiBvcHRpb25zXG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gUHJvdmlkZSBhIGN1c3RvbSBub3RpZmllciBjb25maWd1cmF0aW9uLCBiYXNlZCBvbiB0aGUgZ2l2ZW4gbm90aWZpZXIgb3B0aW9uc1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZGVwczogW1xuXHRcdFx0XHRcdFx0Tm90aWZpZXJPcHRpb25zVG9rZW5cblx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdHByb3ZpZGU6IE5vdGlmaWVyQ29uZmlnVG9rZW4sXG5cdFx0XHRcdFx0dXNlRmFjdG9yeTogbm90aWZpZXJDdXN0b21Db25maWdGYWN0b3J5XG5cdFx0XHRcdH1cblxuXHRcdFx0XVxuXHRcdH07XG5cdH1cblxufVxuIl19