// Component with dependencies
import { TestBed } from '@angular/core/testing';

// Setup providers dependency in welcome.component.spec.ts
TestBed.configureTestingModule({
    declarations: [WelcomeComponent],
    providers: [
        { provide: UserService, useValue: userServiceStub } // use stub double, never real service
    ]
});

// Provide service test doubles
let userServiceStub: Partial<UserService>;
userServiceStub = {
    isLoggedIn: true,
    user: { name: 'test_user' }
}

// Get injected services
// The way that always works, is to get it from the injector of the component-under-test
userService = fixture.debugElement.injector.get(UserService);
// From root injector
userService = TestBed.inject(UserService);
