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
