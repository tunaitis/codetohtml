import { App } from './App';
import { LanguageDef } from './LanguageDef';

import './styles/main.scss';

const languages: LanguageDef[] = [
    { name: 'html', import: require('highlight.js/lib/languages/xml') },
    { name: 'javascript', import: require('highlight.js/lib/languages/javascript') },
];
const themes = ['default', 'github', 'github-dark', 'github-dark-dimmed', 'monokai', 'rainbow'];

const app = new App(document.querySelector('main'));
app.configureLanguages(languages);
app.configureThemes(themes);
app.updatePreview();
