// Testing reactive forms

// Verifying view-to-model data flow
it('should update the value of the input field', () => {
    const input = fixture.nativeElement.querySelector('input');
    const event = createNewEvent('input');

    input.value = 'red';
    input.dispatchEvent(event);

    expect(fixture.componentInstance.favoriteColorControl.value).toEqual('red');
});

// Model-to-view data flow
it('should update the value in the control', () => {
    component.favoriteColorControl.setValue('blue');

    const input = fixture.nativeElement.querySelector('input');

    expect(input.value).toEqual('blue');
});
