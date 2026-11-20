import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        files: ["CoWorkersAplication/js/**/*.js"],
        languageOptions: {
            globals: {
                ...globals.browser
            }
        }
    }
];