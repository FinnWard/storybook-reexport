import defaultA from './module-a.js';

export default {
    ...defaultA,
    name: "Bob"
}

export * from './module-a.js';