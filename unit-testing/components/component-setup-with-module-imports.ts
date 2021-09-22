// Setup with module imports

// One approach is to configure the testing module from the individual pieces
// beforeEach() is asynchronous and calls TestBed.compileComponents because the HeroDetailComponent has an external template and css file
beforeEach(async () => {
  const routerSpy = createRouterSpy();

  await TestBed
      .configureTestingModule({
        imports: [FormsModule],
        declarations: [HeroDetailComponent, TitleCasePipe],
        providers: [
          {provide: ActivatedRoute, useValue: activatedRoute},
          {provide: HeroService, useClass: TestHeroService},
          {provide: Router, useValue: routerSpy},
        ]
      })
      .compileComponents();
});

// Import a shared module
beforeEach(async () => {
  const routerSpy = createRouterSpy();

  await TestBed
      .configureTestingModule({
        imports: [SharedModule],
        declarations: [HeroDetailComponent],
        providers: [
          {provide: ActivatedRoute, useValue: activatedRoute},
          {provide: HeroService, useClass: TestHeroService},
          {provide: Router, useValue: routerSpy},
        ]
      })
      .compileComponents();
});

// Import a feature module
beforeEach(async () => {
  const routerSpy = createRouterSpy();

  await TestBed
      .configureTestingModule({
        imports: [HeroModule],
        providers: [
          {provide: ActivatedRoute, useValue: activatedRoute},
          {provide: HeroService, useClass: TestHeroService},
          {provide: Router, useValue: routerSpy},
        ]
      })
      .compileComponents();
});
