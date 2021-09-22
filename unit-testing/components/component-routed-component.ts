// Routed components

// Getting :id parameter in hero-detail.component.ts (ngOnInit)
this.route.paramMap.subscribe(pmap => this.getHero(pmap.get('id')));

// ActivatedRouteStub
// The following ActivatedRouteStub class serves as a test double for ActivatedRoute
import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
    // Use a ReplaySubject to share previous values with subscribers
    // and pump new values into the `paramMap` observable
    private subject = new ReplaySubject<ParamMap>();

    constructor(private initialParams?: Params) {
        this.setParamMap(initialParams);
    }
    // The mock paramMap observable
    readonly paramMap = this.subject asObservable();
    // Set the paramMap observable's next value
    setParamMap(params: Params = {}) {
        this.subject.next(convertToParamMap(params));
    }
}

// Testing with ActivatedRouteStub
describe('when navigate to existing hero', () => {
    let expectedHero: Hero;

    beforeEach(async () => {
        expectedHero = firstHero;
        activatedRoute.setParamMap({ id: expectedHero.id });
        await createComponent();
    });
});

// Expects the component to try to navigate to the HeroListComponent
describe('when navigate to non-existent hero id', () => {
    beforeEach(async () => {
        ActivatedRoute.setParamMap({ id: 9999 });
        await createComponent();
    })
    it('should try to navigate back to hero list', () => {
        expect(page.gotoListSpy.calls.any()).toBe(true, 'comp.gotoList called');
        expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
    });
});

// Create and display a new hero
describe('when navigate with no hero id', () => {
    beforeEach(async () => {
        await createComponent();
    })
    it('should have hero.id === 0', () => {
        expect(component.hero.id).toBe(0);
    });
    it('should display empty hero name', () => {
        expect(page.nameDisplay.textContent).toBe('');
    });
});
