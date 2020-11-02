/**
 * @fileoverview added by tsickle
 * Generated from: lib/notifier.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotifierContainerComponent } from './components/notifier-container.component';
import { NotifierNotificationComponent } from './components/notifier-notification.component';
import { NotifierConfig } from './models/notifier-config.model';
import { NotifierAnimationService } from './services/notifier-animation.service';
import { NotifierQueueService } from './services/notifier-queue.service';
import { NotifierService } from './services/notifier.service';
import { NotifierConfigToken, NotifierOptionsToken } from './notifier.tokens';
/**
 * Factory for a notifier configuration with custom options
 *
 * Sidenote:
 * Required as Angular AoT compilation cannot handle dynamic functions; see <https://github.com/angular/angular/issues/11262>.
 *
 * @param {?} options - Custom notifier options
 * @return {?} - Notifier configuration as result
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
 * @return {?} - Notifier configuration as result
 */
export function notifierDefaultConfigFactory() {
    return new NotifierConfig({});
}
/**
 * Notifier module
 */
var NotifierModule = /** @class */ (function () {
    function NotifierModule() {
    }
    /**
     * Setup the notifier module with custom providers, in this case with a custom configuration based on the givne options
     *
     * @param   [options={}] - Custom notifier options
     * @returns - Notifier module with custom providers
     */
    /**
     * Setup the notifier module with custom providers, in this case with a custom configuration based on the givne options
     *
     * @param {?=} options
     * @return {?} - Notifier module with custom providers
     */
    NotifierModule.withConfig = /**
     * Setup the notifier module with custom providers, in this case with a custom configuration based on the givne options
     *
     * @param {?=} options
     * @return {?} - Notifier module with custom providers
     */
    function (options) {
        if (options === void 0) { options = {}; }
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
    };
    NotifierModule.decorators = [
        { type: NgModule, args: [{
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
                },] }
    ];
    return NotifierModule;
}());
export { NotifierModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ub3RpZmllci8iLCJzb3VyY2VzIjpbImxpYi9ub3RpZmllci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QyxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDN0YsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7Ozs7QUFXOUUsTUFBTSxVQUFVLDJCQUEyQixDQUFFLE9BQXdCO0lBQ3BFLE9BQU8sSUFBSSxjQUFjLENBQUUsT0FBTyxDQUFFLENBQUM7QUFDdEMsQ0FBQzs7Ozs7Ozs7O0FBVUQsTUFBTSxVQUFVLDRCQUE0QjtJQUMzQyxPQUFPLElBQUksY0FBYyxDQUFFLEVBQUUsQ0FBRSxDQUFDO0FBQ2pDLENBQUM7Ozs7QUFLRDtJQUFBO0lBd0RBLENBQUM7SUE5QkE7Ozs7O09BS0c7Ozs7Ozs7SUFDVyx5QkFBVTs7Ozs7O0lBQXhCLFVBQTBCLE9BQTZCO1FBQTdCLHdCQUFBLEVBQUEsWUFBNkI7UUFDdEQsT0FBTztZQUNOLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFFViw4RkFBOEY7Z0JBQzlGO29CQUNDLE9BQU8sRUFBRSxvQkFBb0I7b0JBQzdCLFFBQVEsRUFBRSxPQUFPO2lCQUNqQjtnQkFFRCwrRUFBK0U7Z0JBQy9FO29CQUNDLElBQUksRUFBRTt3QkFDTCxvQkFBb0I7cUJBQ3BCO29CQUNELE9BQU8sRUFBRSxtQkFBbUI7b0JBQzVCLFVBQVUsRUFBRSwyQkFBMkI7aUJBQ3ZDO2FBRUQ7U0FDRCxDQUFDO0lBQ0gsQ0FBQzs7Z0JBdERELFFBQVEsU0FBRTtvQkFDVixZQUFZLEVBQUU7d0JBQ2IsMEJBQTBCO3dCQUMxQiw2QkFBNkI7cUJBQzdCO29CQUNELE9BQU8sRUFBRTt3QkFDUiwwQkFBMEI7cUJBQzFCO29CQUNELE9BQU8sRUFBRTt3QkFDUixZQUFZO3FCQUNaO29CQUNELFNBQVMsRUFBRTt3QkFDVix3QkFBd0I7d0JBQ3hCLGVBQWU7d0JBQ2Ysb0JBQW9CO3dCQUVwQiw0RUFBNEU7d0JBQzVFOzRCQUNDLE9BQU8sRUFBRSxtQkFBbUI7NEJBQzVCLFVBQVUsRUFBRSw0QkFBNEI7eUJBQ3hDO3FCQUVEO2lCQUNEOztJQWlDRCxxQkFBQztDQUFBLEFBeERELElBd0RDO1NBaENZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5vdGlmaWVyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25vdGlmaWVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm90aWZpZXJOb3RpZmljYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpZXItbm90aWZpY2F0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3RpZmllckNvbmZpZywgTm90aWZpZXJPcHRpb25zIH0gZnJvbSAnLi9tb2RlbHMvbm90aWZpZXItY29uZmlnLm1vZGVsJztcbmltcG9ydCB7IE5vdGlmaWVyQW5pbWF0aW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbm90aWZpZXItYW5pbWF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpZXJRdWV1ZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25vdGlmaWVyLXF1ZXVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ub3RpZmllci5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWVyQ29uZmlnVG9rZW4sIE5vdGlmaWVyT3B0aW9uc1Rva2VuIH0gZnJvbSAnLi9ub3RpZmllci50b2tlbnMnO1xuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGEgbm90aWZpZXIgY29uZmlndXJhdGlvbiB3aXRoIGN1c3RvbSBvcHRpb25zXG4gKlxuICogU2lkZW5vdGU6XG4gKiBSZXF1aXJlZCBhcyBBbmd1bGFyIEFvVCBjb21waWxhdGlvbiBjYW5ub3QgaGFuZGxlIGR5bmFtaWMgZnVuY3Rpb25zOyBzZWUgPGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzExMjYyPi5cbiAqXG4gKiBAcGFyYW0gICBvcHRpb25zIC0gQ3VzdG9tIG5vdGlmaWVyIG9wdGlvbnNcbiAqIEByZXR1cm5zIC0gTm90aWZpZXIgY29uZmlndXJhdGlvbiBhcyByZXN1bHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vdGlmaWVyQ3VzdG9tQ29uZmlnRmFjdG9yeSggb3B0aW9uczogTm90aWZpZXJPcHRpb25zICk6IE5vdGlmaWVyQ29uZmlnIHtcblx0cmV0dXJuIG5ldyBOb3RpZmllckNvbmZpZyggb3B0aW9ucyApO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGEgbm90aWZpZXIgY29uZmlndXJhdGlvbiB3aXRoIGRlZmF1bHQgb3B0aW9uc1xuICpcbiAqIFNpZGVub3RlOlxuICogUmVxdWlyZWQgYXMgQW5ndWxhciBBb1QgY29tcGlsYXRpb24gY2Fubm90IGhhbmRsZSBkeW5hbWljIGZ1bmN0aW9uczsgc2VlIDxodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMTI2Mj4uXG4gKlxuICogQHJldHVybnMgLSBOb3RpZmllciBjb25maWd1cmF0aW9uIGFzIHJlc3VsdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbm90aWZpZXJEZWZhdWx0Q29uZmlnRmFjdG9yeSgpOiBOb3RpZmllckNvbmZpZyB7XG5cdHJldHVybiBuZXcgTm90aWZpZXJDb25maWcoIHt9ICk7XG59XG5cbi8qKlxuICogTm90aWZpZXIgbW9kdWxlXG4gKi9cbkBOZ01vZHVsZSgge1xuXHRkZWNsYXJhdGlvbnM6IFtcblx0XHROb3RpZmllckNvbnRhaW5lckNvbXBvbmVudCxcblx0XHROb3RpZmllck5vdGlmaWNhdGlvbkNvbXBvbmVudFxuXHRdLFxuXHRleHBvcnRzOiBbXG5cdFx0Tm90aWZpZXJDb250YWluZXJDb21wb25lbnRcblx0XSxcblx0aW1wb3J0czogW1xuXHRcdENvbW1vbk1vZHVsZVxuXHRdLFxuXHRwcm92aWRlcnM6IFtcblx0XHROb3RpZmllckFuaW1hdGlvblNlcnZpY2UsXG5cdFx0Tm90aWZpZXJTZXJ2aWNlLFxuXHRcdE5vdGlmaWVyUXVldWVTZXJ2aWNlLFxuXG5cdFx0Ly8gUHJvdmlkZSB0aGUgZGVmYXVsdCBub3RpZmllciBjb25maWd1cmF0aW9uIGlmIGp1c3QgdGhlIG1vZHVsZSBpcyBpbXBvcnRlZFxuXHRcdHtcblx0XHRcdHByb3ZpZGU6IE5vdGlmaWVyQ29uZmlnVG9rZW4sXG5cdFx0XHR1c2VGYWN0b3J5OiBub3RpZmllckRlZmF1bHRDb25maWdGYWN0b3J5XG5cdFx0fVxuXG5cdF1cbn0gKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWVyTW9kdWxlIHtcblxuXHQvKipcblx0ICogU2V0dXAgdGhlIG5vdGlmaWVyIG1vZHVsZSB3aXRoIGN1c3RvbSBwcm92aWRlcnMsIGluIHRoaXMgY2FzZSB3aXRoIGEgY3VzdG9tIGNvbmZpZ3VyYXRpb24gYmFzZWQgb24gdGhlIGdpdm5lIG9wdGlvbnNcblx0ICpcblx0ICogQHBhcmFtICAgW29wdGlvbnM9e31dIC0gQ3VzdG9tIG5vdGlmaWVyIG9wdGlvbnNcblx0ICogQHJldHVybnMgLSBOb3RpZmllciBtb2R1bGUgd2l0aCBjdXN0b20gcHJvdmlkZXJzXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIHdpdGhDb25maWcoIG9wdGlvbnM6IE5vdGlmaWVyT3B0aW9ucyA9IHt9ICk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuXHRcdHJldHVybiB7XG5cdFx0XHRuZ01vZHVsZTogTm90aWZpZXJNb2R1bGUsXG5cdFx0XHRwcm92aWRlcnM6IFtcblxuXHRcdFx0XHQvLyBQcm92aWRlIHRoZSBvcHRpb25zIGl0c2VsZiB1cGZyb250IChhcyB3ZSBuZWVkIHRvIGluamVjdCB0aGVtIGFzIGRlcGVuZGVuY2llcyAtLSBzZWUgYmVsb3cpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRwcm92aWRlOiBOb3RpZmllck9wdGlvbnNUb2tlbixcblx0XHRcdFx0XHR1c2VWYWx1ZTogb3B0aW9uc1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFByb3ZpZGUgYSBjdXN0b20gbm90aWZpZXIgY29uZmlndXJhdGlvbiwgYmFzZWQgb24gdGhlIGdpdmVuIG5vdGlmaWVyIG9wdGlvbnNcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGRlcHM6IFtcblx0XHRcdFx0XHRcdE5vdGlmaWVyT3B0aW9uc1Rva2VuXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRwcm92aWRlOiBOb3RpZmllckNvbmZpZ1Rva2VuLFxuXHRcdFx0XHRcdHVzZUZhY3Rvcnk6IG5vdGlmaWVyQ3VzdG9tQ29uZmlnRmFjdG9yeVxuXHRcdFx0XHR9XG5cblx0XHRcdF1cblx0XHR9O1xuXHR9XG5cbn1cbiJdfQ==