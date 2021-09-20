// General guide to unit test components

// Use TestBed with mock service
import { TestBed } from '@angular/core/testing';

// Define mock service first in welcome.component.spec.ts
class MockUserService {
    isLoggedIn = true;
    user = { name: 'test', password: 'test' };
}

// Configure TestBed module in welcome.component.spec.ts
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

// Use lifecycle hooks for initialization "onInit" in this case
it('should welcome logged in user after Angular calls ngOnInit', () => {
    comp.ngOnInit();
    expect(comp.welcome).toContain(userService.user.name);
});
