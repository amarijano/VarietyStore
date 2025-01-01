import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    files: [
      "**/constants/**/*.{js,jsx,ts,tsx}",
      "**/context/ModalContext.tsx",
      "**/hooks/useAuth.ts",
    ],
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-useless-catch": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tsPlugin,
      "simple-import-sort": simpleImportSortPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-duplicate-imports": "warn",
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
