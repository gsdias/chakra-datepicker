module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true,
    jest: true,
    commonjs: true,
  },
  globals: {
    shallow: 'writable',
    mount: 'writable',
    render: 'writable',
    store: 'writable',
    Provider: 'writable',
    JSX: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
  plugins: [
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'max-len': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
        mjs: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['*.stories.tsx', '*.test.tsx'],
      rules: {
        'react/jsx-props-no-spreading': ['off'],
        'no-console': ['off'],
      },
    },
  ],
}
