// Testing services with the TestBed

// Basic setup
let service: ValueService;

beforeEach(() => {
  TestBed.configureTestingModule({ providers: [ValueService] });
  service = TestBed.inject(ValueService);
});

// Service with a dependency, provide the mock in the providers array
// Mock is a spy object
let masterService: MasterService;
let valueServiceSpy: jasmine.SpyObj<ValueService>;
beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
        providers: [
            MasterService, { provide: valueServiceSpy, useValue: spy }
        ]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
});

// Test
it('#getValue should return stubbed value from a spy', () => {
    const valueStub = 'stub value';
    valueServiceSpy.getValue.and.returnValue(stubValue);

    expect(masterService.getValue()).toBe(stubValue, 'service returned stub value');
    expect(valueServiceSpy.getValue.calls.count()).toBe(1, 'spy method was called once');
    expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
});

// Testing without beforeEach() setup
function setup() {
  const valueServiceSpy =
    jasmine.createSpyObj('ValueService', ['getValue']);
  const stubValue = 'stub value';
  const masterService = new MasterService(valueServiceSpy);

  valueServiceSpy.getValue.and.returnValue(stubValue);
  return { masterService, stubValue, valueServiceSpy };
}
it('#getValue should return stubbed value from a spy', () => {
  const { masterService, stubValue, valueServiceSpy } = setup();
  expect(masterService.getValue())
    .toBe(stubValue, 'service returned stub value');
  expect(valueServiceSpy.getValue.calls.count())
    .toBe(1, 'spy method was called once');
  expect(valueServiceSpy.getValue.calls.mostRecent().returnValue)
    .toBe(stubValue);
});
