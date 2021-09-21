// Component with @Input() and @Output()

// Basic setup
TestBed.configureTestingModule({declarations: [DashboardHeroComponent]})
fixture = TestBed.createComponent(DashboardHeroComponent);
comp = fixture.componentInstance;
// find the hero's DebugElement and element
heroDe = fixture.debugElement.query(By.css('.hero'));
heroEl = heroDe.nativeElement;
// mock the hero supplied by the parent component
expectedHero = {id: 42, name: 'Test Name'};
// simulate the parent setting the input property with that hero
comp.hero = expectedHero;
// trigger initial data binding
fixture.detectChanges();

// Test conversion to uppercase
it('should display hero name in uppercase', () => {
  const expectedPipedName = expectedHero.name.toUpperCase();
  expect(heroEl.textContent).toContain(expectedPipedName);
});

// Clicking triggerEventHandler()
it('should raise selected event when clicked (triggerEventHandler)', () => {
    let selectedHero: Herp | undefined;
    comp.selected.pipe(first()).subscribe((hero: Hero) => selectedHero = hero);
    heroDe.triggerEventHandler('click', null);
    expect(selectedHero).toBe(expectedHero);
});

// Click the element with click() helper
it('should raise selected event when clicked (element.click)', () => {
  let selectedHero: Hero | undefined;
  comp.selected.pipe(first()).subscribe((hero: Hero) => selectedHero = hero);

  heroEl.click();
  expect(selectedHero).toBe(expectedHero);
});
// click helper
export const buttonClickEvents = {
    left: { button: 0 },
    right: { button: 2 }
};
export function click(el: DebugElement | HTMLElement, eventObj: any = buttonClickEvents.left): void {
    if (el instanceof HTMLElement) {
        el.click();
    } else {
        el.triggerEventHandler('click', eventObj);
    }
}
