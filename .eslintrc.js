module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/destructuring-assignment": [2, "always"],
        "react/prefer-es6-class": "warn",
        "func-names": ["error", "as-needed"],
        "no-plusplus": "off",
        "max-len": [
            "warn",
            {
                "code": 240,
                "ignoreComments": true
            }
        ],
        "no-shadow": [
            "error",
            { "builtinGlobals": false, "hoist": "functions", "allow": [] }
        ],
        "no-console": "warn",
        "no-extra-semi": "warn",
        "no-unused-vars": [
            "error",
            {
                "ignoreRestSiblings": true
            }
        ],
    },
    "settings": {
        "react": {
            "createClass": "createReactClass",
            "pragma": "React",
            "version": "detect",
            "flowVersion": "0.53"
        },
    }
};
