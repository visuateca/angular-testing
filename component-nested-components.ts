// Nested component tests

// 1-st approach
// Setup app.component.spec.ts
// Create and declare stub versions of the components and directive that play little or no role in the tests
@Component({selector: 'app-banner', template: ''})
class BannerStubComponent {
}
@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent {
}
@Component({selector: 'app-welcome', template: ''})
class WelcomeStubComponent {
}
// Then declare them in the TestBed configuration
TestBed.configureTestingModule({
  declarations: [
    AppComponent, RouterLinkDirectiveStub, BannerStubComponent, RouterOutletStubComponent, WelcomeStubComponent
  ]
})

// 2-nd approach
// Add NO_ERRORS_SCHEMA to the TestBed.schemas metadata
TestBed.configureTestingModule({
  declarations: [
    AppComponent,
    RouterLinkDirectiveStub
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

// Use both techniques together
TestBed.configureTestingModule({
  declarations: [
    AppComponent,
    BannerStubComponent,
    RouterLinkDirectiveStub
  ],
  schemas: [NO_ERRORS_SCHEMA]
})