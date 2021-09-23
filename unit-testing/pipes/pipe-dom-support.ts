// Writing DOM tests to support a pipe test

// Adding component tests
it('should convert hero name to Title Case', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostEkement.querySelector('input');
    const nameDisplay: HTMLElement = hostElement.querySelector('span');

    nameInput.value = 'quick BROWN  fOx';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
});
