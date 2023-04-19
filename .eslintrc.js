module.exports = {
    extends: ['eslint:recommended', 'prettier'],
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 12,
    },
    globals: {
        window: true,
        document: true,
    },
    rules: {
        'no-unused-vars': 'off',
    },
    ignorePatterns: ['**/*.test.js'],
};
