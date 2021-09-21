// General guide to unit test components

// Use TestBed with mock service
import { TestBed } from '@angular/core/testing';

// Define mock service first in welcome.component.spec.ts
class MockUserService {
    isLoggedIn = true;
    user = { name: 'test', password: 'test' };
}

// Configure TestBed module in welcome.component.spec.ts with dependency service -> synchronous
beforeEach(() => {
    // Provide and inject both the component and the service in the TestBed configuration
    TestBed.configureTestingModule({
        providers: [
            WelcomeComponent, { provide: MockUserService, useClass: MockUserService }
        ]
    });

    component = TestBed.inject(WelcomeComponent);
    userService = TestBed.inject(UsersService);
});

// Configure TestBed module in welcome.component.spec.ts -> asynchronous
// async/await method
beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [
            AppComponent
        ]
    }).compileComponents();
});
// waitForAsync method
beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [
            BannerComponent
        ]
    }).compileComponents();
}));

// Use lifecycle hooks for initialization "onInit" in this case
it('should welcome logged in user after Angular calls ngOnInit', () => {
    comp.ngOnInit();
    expect(comp.welcome).toContain(userService.user.name);
});

// createComponent usage for reduced setup
TestBed.configureTestingModule({ declarations: [BannerComponent] });
const fixture = TestBed.createComponent(BannerComponent);
const component = fixture.componentInstance;
expect.component.toBeDefined();

// ComponentFixture.nativeElement
// If nativeElement is HTMLElement use standard querySelector
const bannerElement = fixture.nativeElement;
const p = bannerElement.querySelector('p');
expect(p.textContent).toEqual('banner works');

// ComponentFixture.debugElement
// nativeElement is convenience method for fixture.debugElement.nativeElement
import { DebugElement } from '@angular/core';
const bannerDe: DebugElement = fixture.debugElement;
const bannerNe: HTMLElement = bannerDe.nativeElement;

// For cases when tests don't run on browser platform (WebWorker, SSR) use By.css()
import { By } from '@angular/platform-browser';
const debugElement: DebugElement = fixture.debugElement;
const paragraph = debugElement.query(By.css('p'));
const p: HTMLElement = paragraph.nativeElement;
expect(p.textContent).toEqual('works');
