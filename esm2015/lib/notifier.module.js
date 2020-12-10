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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL21zaXZhZGUvRGV2L3Byb2plY3RzL2FuZ3VsYXItbm90aWZpZXIvcHJvamVjdHMvYW5ndWxhci1ub3RpZmllci9zcmMvIiwic291cmNlcyI6WyJsaWIvbm90aWZpZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVDLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM3RixPQUFPLEVBQUUsY0FBYyxFQUFtQixNQUFNLGdDQUFnQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFOUU7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsMkJBQTJCLENBQUUsT0FBd0I7SUFDcEUsT0FBTyxJQUFJLGNBQWMsQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUN0QyxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSw0QkFBNEI7SUFDM0MsT0FBTyxJQUFJLGNBQWMsQ0FBRSxFQUFFLENBQUUsQ0FBQztBQUNqQyxDQUFDO0FBRUQ7O0dBRUc7QUF5QkgsTUFBTSxPQUFPLGNBQWM7SUFFMUI7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFFLFVBQTJCLEVBQUU7UUFDdEQsT0FBTztZQUNOLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFFViw4RkFBOEY7Z0JBQzlGO29CQUNDLE9BQU8sRUFBRSxvQkFBb0I7b0JBQzdCLFFBQVEsRUFBRSxPQUFPO2lCQUNqQjtnQkFFRCwrRUFBK0U7Z0JBQy9FO29CQUNDLElBQUksRUFBRTt3QkFDTCxvQkFBb0I7cUJBQ3BCO29CQUNELE9BQU8sRUFBRSxtQkFBbUI7b0JBQzVCLFVBQVUsRUFBRSwyQkFBMkI7aUJBQ3ZDO2FBRUQ7U0FDRCxDQUFDO0lBQ0gsQ0FBQzs7cUVBOUJXLGNBQWM7OEhBQWQsY0FBYyxtQkFiZjtRQUNWLHdCQUF3QjtRQUN4QixlQUFlO1FBQ2Ysb0JBQW9CO1FBRXBCLDRFQUE0RTtRQUM1RTtZQUNDLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsVUFBVSxFQUFFLDRCQUE0QjtTQUN4QztLQUVELFlBZFE7WUFDUixZQUFZO1NBQ1o7d0ZBY1csY0FBYyxtQkF0QnpCLDBCQUEwQjtRQUMxQiw2QkFBNkIsYUFNN0IsWUFBWSxhQUhaLDBCQUEwQjtrREFrQmYsY0FBYztjQXhCMUIsUUFBUTtlQUFFO2dCQUNWLFlBQVksRUFBRTtvQkFDYiwwQkFBMEI7b0JBQzFCLDZCQUE2QjtpQkFDN0I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNSLDBCQUEwQjtpQkFDMUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNSLFlBQVk7aUJBQ1o7Z0JBQ0QsU0FBUyxFQUFFO29CQUNWLHdCQUF3QjtvQkFDeEIsZUFBZTtvQkFDZixvQkFBb0I7b0JBRXBCLDRFQUE0RTtvQkFDNUU7d0JBQ0MsT0FBTyxFQUFFLG1CQUFtQjt3QkFDNUIsVUFBVSxFQUFFLDRCQUE0QjtxQkFDeEM7aUJBRUQ7YUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTm90aWZpZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3RpZmllck5vdGlmaWNhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ub3RpZmllci1ub3RpZmljYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE5vdGlmaWVyQ29uZmlnLCBOb3RpZmllck9wdGlvbnMgfSBmcm9tICcuL21vZGVscy9ub3RpZmllci1jb25maWcubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpZXJBbmltYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ub3RpZmllci1hbmltYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmllclF1ZXVlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbm90aWZpZXItcXVldWUuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmllclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25vdGlmaWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpZXJDb25maWdUb2tlbiwgTm90aWZpZXJPcHRpb25zVG9rZW4gfSBmcm9tICcuL25vdGlmaWVyLnRva2Vucyc7XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgYSBub3RpZmllciBjb25maWd1cmF0aW9uIHdpdGggY3VzdG9tIG9wdGlvbnNcbiAqXG4gKiBTaWRlbm90ZTpcbiAqIFJlcXVpcmVkIGFzIEFuZ3VsYXIgQW9UIGNvbXBpbGF0aW9uIGNhbm5vdCBoYW5kbGUgZHluYW1pYyBmdW5jdGlvbnM7IHNlZSA8aHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTEyNjI+LlxuICpcbiAqIEBwYXJhbSAgIG9wdGlvbnMgLSBDdXN0b20gbm90aWZpZXIgb3B0aW9uc1xuICogQHJldHVybnMgLSBOb3RpZmllciBjb25maWd1cmF0aW9uIGFzIHJlc3VsdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbm90aWZpZXJDdXN0b21Db25maWdGYWN0b3J5KCBvcHRpb25zOiBOb3RpZmllck9wdGlvbnMgKTogTm90aWZpZXJDb25maWcge1xuXHRyZXR1cm4gbmV3IE5vdGlmaWVyQ29uZmlnKCBvcHRpb25zICk7XG59XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgYSBub3RpZmllciBjb25maWd1cmF0aW9uIHdpdGggZGVmYXVsdCBvcHRpb25zXG4gKlxuICogU2lkZW5vdGU6XG4gKiBSZXF1aXJlZCBhcyBBbmd1bGFyIEFvVCBjb21waWxhdGlvbiBjYW5ub3QgaGFuZGxlIGR5bmFtaWMgZnVuY3Rpb25zOyBzZWUgPGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzExMjYyPi5cbiAqXG4gKiBAcmV0dXJucyAtIE5vdGlmaWVyIGNvbmZpZ3VyYXRpb24gYXMgcmVzdWx0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3RpZmllckRlZmF1bHRDb25maWdGYWN0b3J5KCk6IE5vdGlmaWVyQ29uZmlnIHtcblx0cmV0dXJuIG5ldyBOb3RpZmllckNvbmZpZygge30gKTtcbn1cblxuLyoqXG4gKiBOb3RpZmllciBtb2R1bGVcbiAqL1xuQE5nTW9kdWxlKCB7XG5cdGRlY2xhcmF0aW9uczogW1xuXHRcdE5vdGlmaWVyQ29udGFpbmVyQ29tcG9uZW50LFxuXHRcdE5vdGlmaWVyTm90aWZpY2F0aW9uQ29tcG9uZW50XG5cdF0sXG5cdGV4cG9ydHM6IFtcblx0XHROb3RpZmllckNvbnRhaW5lckNvbXBvbmVudFxuXHRdLFxuXHRpbXBvcnRzOiBbXG5cdFx0Q29tbW9uTW9kdWxlXG5cdF0sXG5cdHByb3ZpZGVyczogW1xuXHRcdE5vdGlmaWVyQW5pbWF0aW9uU2VydmljZSxcblx0XHROb3RpZmllclNlcnZpY2UsXG5cdFx0Tm90aWZpZXJRdWV1ZVNlcnZpY2UsXG5cblx0XHQvLyBQcm92aWRlIHRoZSBkZWZhdWx0IG5vdGlmaWVyIGNvbmZpZ3VyYXRpb24gaWYganVzdCB0aGUgbW9kdWxlIGlzIGltcG9ydGVkXG5cdFx0e1xuXHRcdFx0cHJvdmlkZTogTm90aWZpZXJDb25maWdUb2tlbixcblx0XHRcdHVzZUZhY3Rvcnk6IG5vdGlmaWVyRGVmYXVsdENvbmZpZ0ZhY3Rvcnlcblx0XHR9XG5cblx0XVxufSApXG5leHBvcnQgY2xhc3MgTm90aWZpZXJNb2R1bGUge1xuXG5cdC8qKlxuXHQgKiBTZXR1cCB0aGUgbm90aWZpZXIgbW9kdWxlIHdpdGggY3VzdG9tIHByb3ZpZGVycywgaW4gdGhpcyBjYXNlIHdpdGggYSBjdXN0b20gY29uZmlndXJhdGlvbiBiYXNlZCBvbiB0aGUgZ2l2bmUgb3B0aW9uc1xuXHQgKlxuXHQgKiBAcGFyYW0gICBbb3B0aW9ucz17fV0gLSBDdXN0b20gbm90aWZpZXIgb3B0aW9uc1xuXHQgKiBAcmV0dXJucyAtIE5vdGlmaWVyIG1vZHVsZSB3aXRoIGN1c3RvbSBwcm92aWRlcnNcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgd2l0aENvbmZpZyggb3B0aW9uczogTm90aWZpZXJPcHRpb25zID0ge30gKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOb3RpZmllck1vZHVsZT4ge1xuXHRcdHJldHVybiB7XG5cdFx0XHRuZ01vZHVsZTogTm90aWZpZXJNb2R1bGUsXG5cdFx0XHRwcm92aWRlcnM6IFtcblxuXHRcdFx0XHQvLyBQcm92aWRlIHRoZSBvcHRpb25zIGl0c2VsZiB1cGZyb250IChhcyB3ZSBuZWVkIHRvIGluamVjdCB0aGVtIGFzIGRlcGVuZGVuY2llcyAtLSBzZWUgYmVsb3cpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRwcm92aWRlOiBOb3RpZmllck9wdGlvbnNUb2tlbixcblx0XHRcdFx0XHR1c2VWYWx1ZTogb3B0aW9uc1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFByb3ZpZGUgYSBjdXN0b20gbm90aWZpZXIgY29uZmlndXJhdGlvbiwgYmFzZWQgb24gdGhlIGdpdmVuIG5vdGlmaWVyIG9wdGlvbnNcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGRlcHM6IFtcblx0XHRcdFx0XHRcdE5vdGlmaWVyT3B0aW9uc1Rva2VuXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRwcm92aWRlOiBOb3RpZmllckNvbmZpZ1Rva2VuLFxuXHRcdFx0XHRcdHVzZUZhY3Rvcnk6IG5vdGlmaWVyQ3VzdG9tQ29uZmlnRmFjdG9yeVxuXHRcdFx0XHR9XG5cblx0XHRcdF1cblx0XHR9O1xuXHR9XG5cbn1cbiJdfQ==