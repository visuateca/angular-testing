// Component marble tests

import { cold, getTestScheduler } from 'jasmine-marbles';
// Marble testing uses a test scheduler to simulate the passage of time in a synchronous test
// This test defines a cold observable that waits three frames (---),
// emits a value (x), and completes (|). In the second argument you map the value marker (x) to the emitted value (testQuote)
it('should show quote after getQuote (marbles)', () => {
    const q$ = cold('---x|', { x: testQuote });
    getQuoteSpy.and.returnValue(q$);
    
    fixture.detectChanges(); // ngOnInit()
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');
    // This step serves a purpose analogous to tick() and whenStable() in the earlier fakeAsync() and waitForAsync() examples
    getTestScheduler().flush();
    fixture.detectChanges() // update view
    expect(quoteEl.textContent).toBe(testQuote, 'should show quote');
    expect(errorMessage()).toBeNull('should not show error');
});
// Marble error testing
it('should display error when TwainService fails', fakeAsync(() => {
  // observable error after delay
  const q$ = cold('---#|', null, new Error('TwainService test failure'));
  getQuoteSpy.and.returnValue( q$ );
  fixture.detectChanges(); // ngOnInit()
  expect(quoteEl.textContent).toBe('...', 'should show placeholder');
  getTestScheduler().flush(); // flush the observables
  tick();                     // component shows error after a setTimeout()
  fixture.detectChanges();    // update error message
  expect(errorMessage()).toMatch(/test failure/, 'should display error');
  expect(quoteEl.textContent).toBe('...', 'should show placeholder');
}));
