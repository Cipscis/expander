import { foo } from '../dist/expander.js';

describe('foo', () => {
	it('returns true', () => {
		expect(foo()).toBe(true);
	});
});
