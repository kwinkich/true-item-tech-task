process.env.NODE_ENV = 'test';

const idGenerator = require('../src/utils/idGenerator');

beforeEach(() => {
    idGenerator.reset();
});

afterEach(() => {
});

afterAll(() => {
});