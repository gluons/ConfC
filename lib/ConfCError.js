'use strict';

class ConfCError extends Error {
	constructor(message) {
		super(message);
		this.name = 'ConfCError';
		this.message = message;
	}
}

module.exports = ConfCError;
