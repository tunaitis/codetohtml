import { App } from './App';
import { LanguageDef } from './LanguageDef';

import '../styles/main.scss';

import themes from '../../_data/themes.json';

const languages: LanguageDef[] = [
    { label: 'Assembly', name: 'x86asm', import: require('highlight.js/lib/languages/x86asm') },
    { label: 'Ada', name: 'ada', import: require('highlight.js/lib/languages/ada') },
    { label: 'C', name: 'c', import: require('highlight.js/lib/languages/c') },
    { label: 'C++', name: 'cpp', import: require('highlight.js/lib/languages/cpp') },
    { label: 'C#', name: 'csharp', import: require('highlight.js/lib/languages/csharp') },
    { label: 'Clojure', name: 'clojure', import: require('highlight.js/lib/languages/clojure') },
    { label: 'D', name: 'd', import: require('highlight.js/lib/languages/d') },
    { label: 'Dart', name: 'dart', import: require('highlight.js/lib/languages/dart') },
    { label: 'Delphi', name: 'delphi', import: require('highlight.js/lib/languages/delphi') },
    { label: 'Fortran', name: 'fortran', import: require('highlight.js/lib/languages/fortran') },
    { label: 'Go', name: 'go', import: require('highlight.js/lib/languages/go') },
    { label: 'Groovy', name: 'groovy', import: require('highlight.js/lib/languages/groovy') },
    { label: 'Haskell', name: 'haskell', import: require('highlight.js/lib/languages/haskell') },
    { label: 'HTML', name: 'html', import: require('highlight.js/lib/languages/xml') },
    { label: 'Java', name: 'java', import: require('highlight.js/lib/languages/java') },
    { label: 'JavaScript', name: 'javascript', import: require('highlight.js/lib/languages/javascript') },
    { label: 'Julia', name: 'julia', import: require('highlight.js/lib/languages/julia') },
    { label: 'Kotlin', name: 'kotlin', import: require('highlight.js/lib/languages/kotlin') },
    { label: 'Lisp', name: 'lisp', import: require('highlight.js/lib/languages/lisp') },
    { label: 'Lua', name: 'lua', import: require('highlight.js/lib/languages/lua') },
    { label: 'MATLAB', name: 'matlab', import: require('highlight.js/lib/languages/matlab') },
    { label: 'Objective-C', name: 'objectivec', import: require('highlight.js/lib/languages/objectivec') },
    { label: 'Perl', name: 'perl', import: require('highlight.js/lib/languages/perl') },
    { label: 'PHP', name: 'php', import: require('highlight.js/lib/languages/php') },
    { label: 'PowerShell', name: 'powershell', import: require('highlight.js/lib/languages/powershell') },
    { label: 'Prolog', name: 'prolog', import: require('highlight.js/lib/languages/prolog') },
    { label: 'Python', name: 'python', import: require('highlight.js/lib/languages/python') },
    { label: 'R', name: 'r', import: require('highlight.js/lib/languages/r') },
    { label: 'Ruby', name: 'ruby', import: require('highlight.js/lib/languages/ruby') },
    { label: 'Rust', name: 'rust', import: require('highlight.js/lib/languages/rust') },
    { label: 'SAS', name: 'sas', import: require('highlight.js/lib/languages/sas') },
    { label: 'Scala', name: 'scala', import: require('highlight.js/lib/languages/scala') },
    { label: 'SQL', name: 'sql', import: require('highlight.js/lib/languages/sql') },
    { label: 'Swift', name: 'swift', import: require('highlight.js/lib/languages/swift') },
    { label: 'TypeScript', name: 'typescript', import: require('highlight.js/lib/languages/typescript') },
    { label: 'Visual Basic', name: 'vbnet', import: require('highlight.js/lib/languages/vbnet') },
];

const root = document.querySelector<HTMLElement>('.app');
if (root !== null) {
    const app = new App(root);
    app.configureLanguages(languages);
    app.configureThemes(themes);
    app.updatePreview();
}
