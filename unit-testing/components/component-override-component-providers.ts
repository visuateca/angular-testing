// Override component providers

// TestBed.overrideComponent method can replace the component's providers with easy-to-manage test doubles
beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            HeroModule
        ],
        providers: [
            { provide: ActivatedRoute, useValue: activatedRoute },
            { provide: Router, useValue: routerSpy }
        ]
    }).overrideComponent(
        HeroDetailComponent,
        { set: { providers: [
            { provide: HeroDetailService, useClass: HeroDetailServiceSpy }
        ] } }
    ).compileComponents();
});

// Provide a spy stub (HeroDetailServiceSpy)
class HeroDetailServiceStub {
    testHero: Hero = { id: 42, name: 'test' };
    // emit cloned test hero
    getHero = jasmine.createSpy('getHero').and.callFake(
        () => asyncData(Object.assign({}, this.testHero))
    );
    // emit clone of test hero, with changes merged in
    saveHero = jasmine.createSpy('saveHero').and.callFake(
        (hero: Hero) => asyncData(Object.assign(this.testHero, hero)));
}

// The override tests
let hdsSpy: HeroDetailServiceSpy;

beforeEach(async () => {
  await createComponent();
  // get the component's injected HeroDetailServiceSpy
  hdsSpy = fixture.debugElement.injector.get(HeroDetailService) as any;
});

it('should have called `getHero`', () => {
  expect(hdsSpy.getHero.calls.count()).toBe(1, 'getHero called once');
});

it('should display stub hero\'s name', () => {
  expect(page.nameDisplay.textContent).toBe(hdsSpy.testHero.name);
});

it('should save stub hero change', fakeAsync(() => {
  const origName = hdsSpy.testHero.name;
  const newName = 'New Name';
  page.nameInput.value = newName;
  // In older browsers, such as IE, you might need a CustomEvent instead. See
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
  page.nameInput.dispatchEvent(new Event('input')); // tell Angular
  expect(component.hero.name).toBe(newName, 'component hero has new name');
  expect(hdsSpy.testHero.name).toBe(origName, 'service hero unchanged before save');
  click(page.saveBtn);
  expect(hdsSpy.saveHero.calls.count()).toBe(1, 'saveHero called once');
  tick();  // wait for async save to complete
  expect(hdsSpy.testHero.name).toBe(newName, 'service hero has new name after save');
  expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
}));
