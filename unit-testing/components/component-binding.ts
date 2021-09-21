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
