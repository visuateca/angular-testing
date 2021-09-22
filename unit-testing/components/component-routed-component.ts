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

