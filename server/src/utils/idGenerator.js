class IdGenerator {
	constructor() {
			this.currentId = 1;
	}

	generate() {
			return this.currentId++;
	}

	reset() {
			this.currentId = 1;
	}
}

module.exports = new IdGenerator();