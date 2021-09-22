// Calling compileComponents()

// The async beforeEach
beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [ BannerComponent ],
  }).compileComponents();  // compile template and css
});

// The synchronous beforeEach
beforeEach(() => {
   fixture = TestBed.createComponent(BannerComponent);
   component = fixture.componentInstance;  // BannerComponent test instance
   h1 = fixture.nativeElement.querySelector('h1');
 });

// Consolidated setup
beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [ BannerComponent ],
  }).compileComponents();
  fixture = TestBed.createComponent(BannerComponent);
  component = fixture.componentInstance;
  h1 = fixture.nativeElement.querySelector('h1');
});
