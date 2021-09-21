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
