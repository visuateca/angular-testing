// Setup
let component: BannerComponent;
let fixture: ComponentFixture<BannerComponent>;
let elementH1: HTMLElement;

beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [BannerComponent]
    });
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    elementH1 = fixture.nativeElement.querySelector('h1');
});

// createComponent doesn't bind data
// detectChanges must be called explicitly
it('should display original title after detectChanges()', () => {
    fixture.detectChanges();
    expect(elementH1.textContent().toContain('test title'));
});

// Automatic change detetion
import { ComponentFixtureAutoDetect } from '@anguar/core/testing';
TestBed.configureTestingModule({
    declarations: [BannerComponent],
    providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
    ]
});
it('should display original title', () => {
  // No `fixture.detectChanges()` needed
  expect(h1.textContent).toContain(comp.title);
});

// Change an input value with dispatchEvent()
// To simulate user input, find the input element and set its value property
it('should convert hero name to Title Case', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('input');
    const nameDisplay: HTMLElement = hostElement.querySelector('span');
    nameInput.value = 'quick BROWN fOx'
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(nameDisplay.textContent).toBe('Quick Brown Fox');
});
