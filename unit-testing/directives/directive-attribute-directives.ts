//  Testing Attribute Directives

// requires only the techniques explored in the "Nested component tests" section
beforeEach(() => {
    fixture = TestBed.configureTestingModule({
        declarations: [
            AboutComponent,
            HighlightDirective
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .createComponent(AboutComponent)
    .fixture.detectChanges();
});
it('should have skyblue <h2>', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const bgColor = h2.style.backgroundColor;
    expect(bgColor).toBe('skyBlue');
});

// Create an artificial test component that apply to the directive
beforeEach(() => {
  fixture = TestBed.configureTestingModule({
    declarations: [ HighlightDirective, TestComponent ]
  })
  .createComponent(TestComponent);

  fixture.detectChanges(); // initial binding

  // all elements with an attached HighlightDirective
  des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

  // the h2 without the HighlightDirective
  bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
});

// color tests
it('should have three highlighted elements', () => {
  expect(des.length).toBe(3);
});

it('should color 1st <h2> background "yellow"', () => {
  const bgColor = des[0].nativeElement.style.backgroundColor;
  expect(bgColor).toBe('yellow');
});

it('should color 2nd <h2> background w/ default color', () => {
  const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
  const bgColor = des[1].nativeElement.style.backgroundColor;
  expect(bgColor).toBe(dir.defaultColor);
});

it('should bind <input> background to value color', () => {
  // easier to work with nativeElement
  const input = des[2].nativeElement as HTMLInputElement;
  expect(input.style.backgroundColor).toBe('cyan', 'initial backgroundColor');

  input.value = 'green';

  // Dispatch a DOM event so that Angular responds to the input value change.
  input.dispatchEvent(new Event('input'));
  fixture.detectChanges();

  expect(input.style.backgroundColor).toBe('green', 'changed backgroundColor');
});


it('bare <h2> should not have a customProperty', () => {
  expect(bareH2.properties.customProperty).toBeUndefined();
});
