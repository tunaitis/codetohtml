import { LanguageFn } from "highlight.js";

export interface LanguageDef {
    name: string;
    label: string;
    import: LanguageFn;
}