// Component inside a test host

// The setup for the test-host tests is similar to the setup for the stand-alone tests
// dashboard-hero.component.spec.ts
TestBed.configureTestingModule({
    declarations: [
        DashboardHeroComponent,
        TestHostComponent
    ]
});
fixture = TestBed.createComponent(TestHostComponent);
testHost = fixture.componentInstance;
heroEl = fixture.nativeElement.querySelector('.hero');
fixture.detectChanges(); // onInit

// dashboard-hero.component.spec.ts
it('should display hero name', () => {
  const expectedPipedName = testHost.hero.name.toUpperCase();
  expect(heroEl.textContent).toContain(expectedPipedName);
});

it('should raise selected event when clicked', () => {
  click(heroEl);
  // selected hero should be the same data bound hero
  expect(testHost.selectedHero).toBe(testHost.hero);
});
