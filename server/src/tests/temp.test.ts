describe('FAILED TEST for check CI workflow', () => {
  it('FAILED TEST', async () => {
    function helloCI() {
      return 'Hello CI workflow';
    }

    expect(helloCI()).toBe('');
  });
});
