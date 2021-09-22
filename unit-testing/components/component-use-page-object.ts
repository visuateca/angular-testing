// Use a page object

// Tame the complexity with a Page class that handles access to component properties and encapsulates the logic that sets them
// Page class for the hero-detail.component.spec.ts
class Page {
    // getter properties wait to query the DOM until called.
    get buttons() {
      return this.queryAll<HTMLButtonElement>('button');
    }
    get saveBtn() {
      return this.buttons[0];
    }
    get cancelBtn() {
      return this.buttons[1];
    }
    get nameDisplay() {
      return this.query<HTMLElement>('span');
    }
    get nameInput() {
      return this.query<HTMLInputElement>('input');
    }
  
    gotoListSpy: jasmine.Spy;
    navigateSpy: jasmine.Spy;
  
    constructor(someFixture: ComponentFixture<HeroDetailComponent>) {
      // get the navigate spy from the injected router spy object
      const routerSpy = someFixture.debugElement.injector.get(Router) as any;
      this.navigateSpy = routerSpy.navigate;
  
      // spy on component's `gotoList()` method
      const someComponent = someFixture.componentInstance;
      this.gotoListSpy = spyOn(someComponent, 'gotoList').and.callThrough();
    }
  
    //// query helpers ////
    private query<T>(selector: string): T {
      return fixture.nativeElement.querySelector(selector);
    }
  
    private queryAll<T>(selector: string): T[] {
      return fixture.nativeElement.querySelectorAll(selector);
    }
  }

  // A createComponent method creates a page object and fills in the blanks once the hero arrives
  function createComponent() {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);
  
    fixture.detectChanges(); // 1st onInit
    return fixture.whenStable().then(() => {
      fixture.detectChanges(); // // 2nd change detection displays the async-fetched hero
    });
  }

  // hero-detail.component.spec.ts
  it('should display that hero\'s name', () => {
    expect(page.nameDisplay.textContent).toBe(expectedHero.name);
  });
  
  it('should navigate when click cancel', () => {
    click(page.cancelBtn);
    expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
  });
  
  it('should save when click save but not navigate immediately', () => {
    // Get service injected into component and spy on its`saveHero` method.
    // It delegates to fake `HeroService.updateHero` which delivers a safe test result.
    const hds = fixture.debugElement.injector.get(HeroDetailService);
    const saveSpy = spyOn(hds, 'saveHero').and.callThrough();
  
    click(page.saveBtn);
    expect(saveSpy.calls.any()).toBe(true, 'HeroDetailService.save called');
    expect(page.navigateSpy.calls.any()).toBe(false, 'router.navigate not called');
  });
  
  it('should navigate when click save and save resolves', fakeAsync(() => {
       click(page.saveBtn);
       tick();  // wait for async save to complete
       expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
     }));
  
  it('should convert hero name to Title Case', () => {
    // get the name's input and display elements from the DOM
    const hostElement: HTMLElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
    const nameDisplay: HTMLElement = hostElement.querySelector('span')!;
  
    // simulate user entering a new name into the input box
    nameInput.value = 'quick BROWN  fOx';
  
    // Dispatch a DOM event so that Angular learns of input value change.
    // In older browsers, such as IE, you might need a CustomEvent instead. See
    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
    nameInput.dispatchEvent(new Event('input'));
  
    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();
  
    expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
  });
