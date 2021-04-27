import { NgModule } from '@angular/core';
import { FusejsPipe } from './fusejs.pipe';
import { FusejsService } from './fusejs.service';
export class FusejsModule {
}
FusejsModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    FusejsService
                ],
                declarations: [
                    FusejsPipe,
                ],
                exports: [
                    FusejsPipe,
                ]
            },] }
];
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVzZWpzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mdXNlanMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFhaEQsTUFBTSxPQUFPLFlBQVk7OztZQVh4QixRQUFRLFNBQUM7Z0JBQ1IsU0FBUyxFQUFFO29CQUNULGFBQWE7aUJBQ2Q7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLFVBQVU7aUJBQ1g7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFVBQVU7aUJBQ1g7YUFDRjs7QUFDMkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IEZ1c2Vqc1BpcGUgfSBmcm9tICcuL2Z1c2Vqcy5waXBlJ1xuaW1wb3J0IHsgRnVzZWpzU2VydmljZSB9IGZyb20gJy4vZnVzZWpzLnNlcnZpY2UnXG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIEZ1c2Vqc1NlcnZpY2VcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRnVzZWpzUGlwZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEZ1c2Vqc1BpcGUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRnVzZWpzTW9kdWxlIHt9O1xuIl19