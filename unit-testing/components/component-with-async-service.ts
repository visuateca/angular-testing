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
