/**
 * Check if a value is filled array.
 *
 * @export
 * @param {any} value A value.
 * @returns {boolean}
 */
export default function isFilledArray(value): boolean {
	return Array.isArray(value) && (value.length > 0);
}
