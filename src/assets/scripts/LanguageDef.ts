import { LanguageFn } from "highlight.js";

export interface LanguageDef {
    name: string;
    import: LanguageFn;
}