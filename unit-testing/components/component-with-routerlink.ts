// Components with RouterLink

// Replaces the real directive with an alternative version designed to validate the kind of anchor tag wiring
@Directive({
    selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {
    @InputEvent('routerLink') linkParams: any;

    @HostListener('click')
    onClick() {
        this.navigateTo = this.linkParams;
    }
    
    navigateTo: any = null;
}

// By.directive and injected directives
beforeEach(() => {
    fixture.detectChanges();
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
});

// Tests for routerLinks
it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe('/dashboard');
    expect(routerLinks[1].linkParams).toBe('/heroes');
    expect(routerLinks[2].linkParams).toBe('/about');
});
it('can click Heroes link in template', () => {
    const heroesLinkDe = linkDes[1];
    const heroesLink = routerLinks[1];

    expect(heroesLink.navigatedTo).toBeNull('should not have navigated yet');

    heroesLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(heroesLink.navigatedTo).toBe('/heroes');
});
