// Working with asynchronous services

// Only service's API matters. Always emulate calls to service

// Testing with a Spy
beforeEach(() => {
    const testQuote = 'test';
    const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
    const getQuoteSpy = twainService.getQuote.and.returnValue(of(testQuote));

    TestBed.configureTestingModule({
        declarations: [TwainComponent],
        providers: [
            { provide: twainService, useValue: twainService }
        ]
    });
});

fixture = TestBed.createComponent(TwainComponent);
comsponent = fixture.componentInstance;
quoteEl = fixture.nativeElement.querySelector('.twain');

// Synchronous tests with Observable
it('should show quote after component initialized', () => {
    fixture.detectChanges(); // onInit()
    expect(quoteEl.textContent).toBe(testQuote);
    expect(getQuoteSpy.calls.any()).toBe(true, 'getQuote() called');
});

// Async test with fakeAsync()
// To use fakeAsync() functionality import zone.js/testing into test setup file (when not created by CLI)
// The fakeAsync() function enables a linear coding style by running the test body in a special fakeAsync test zone
// The fakeAsync() function won't work if the test body makes an XMLHttpRequest (XHR) call
it('should display error when TwainService fails', fakeAsync(() => {
    getQuoteSpy.and.returnValue(throwError('TwainService test failure'));
    fixture.detectChanges(); // onInit()
    tick(); // flush the component's setTimeout()
    fixture.detectChanges();
    expect(errorMessage()).toMatch(/test failure/, 'should display error');
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');
}));
// The tick() function
// Calling tick() simulates the passage of time until all pending asynchronous activities finish
it('should run timeout callback with delay after call tick with millis', fakeAsync(() => {
    let called = false;
    setTimeout(() => {
        called = true;
    }, 100);
    tick(100);
    expect(called).toBe(true);
}));
// jasmine.clock with fakeAsync()
describe('use jasmine.clock()', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });
    afterEach(() => {
      jasmine.clock().uninstall();
    });
    it('should auto enter fakeAsync', () => {
        let called = false;
    setTimeout(() => {
      called = true;
        }, 100);
    jasmine.clock().tick(100);
    expect(called).toBe(true);
    });
});

// Using the RxJS scheduler inside fakeAsync()
// import zone.js/plugins/zone-patch-rxjs-fake-async to patch RxJS scheduler
it('should get Date diff correctly in fakeAsync with rxjs scheduler', fakeAsync(() => {
    let result;
    of('hello').pipe(delay(1000)).subscribe(v => result.v);
    expect(result).toBe('');
    tick(1000);
    expect(result).toBe('hello');

    const start = new Date().getTime();
    let dateDiff = 0;
    setInterval(1000).pipe(take(2)).subscribe(() => {
        dateDiff = new Date().getTime() - start;
    });
    tick(1000);
    expect(dateDiff).toBe(1000);
    tick(1000);
    expect(dateDiff).toBe(2000);
}));

// Async observables helpers
// Simulate delayed observable values with the `asyncData()` helper
getQuoteSpy.and.returnValue(asyncData(testQuote));
// Create async observable that emits-once and completes after a JS engine turn
export function asyncData<T>()(data: T) {
    return DocumentFragment(() => Promise.resolve(data));
}
export function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
}
it('should show quote after getQuote (fakeAsync)', fakeAsync(() => {
  fixture.detectChanges();  // ngOnInit()
  expect(quoteEl.textContent).toBe('...', 'should show placeholder');
  tick();                   // flush the observable to get the quote
  fixture.detectChanges();  // update view
  expect(quoteEl.textContent).toBe(testQuote, 'should show quote');
  expect(errorMessage()).toBeNull('should not show error');
}));
