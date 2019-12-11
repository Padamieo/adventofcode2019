import init from './hello';

test('should return Hello World!', () => {
	expect(init()).toBe('Hello World!');
});