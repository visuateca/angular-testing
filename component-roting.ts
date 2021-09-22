// Routing component

// Providing a router spy for component test suite happens to be as easy as providing a Service spy.
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);
TestBed.configureTestingModule({
    providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: Router, useValue: routerSpy }
    ]
});

// Test clicks the displayed hero and confirms that Router.navigateByUrl is called with the expected url
it('should tell ROUTER to navigate when hero clicked', () => {
    heroClick();

    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spu.calls.first().args[0];
    const id = comp.heroes[0].id;
    expect(navArgs).toBe('/heroes/' + id, 'should nav to HeroDetail for first hero');
});