function log(eventName: string, eventParams: any) {
    if (typeof gtag === 'undefined') {
        return;
    }
    gtag('event', eventName, eventParams);
}

export function logFileUpload(size: number) {
    log('file_upload', { size: size });
}

export function logGenerateCode(language: string, theme: string, destination: string) {
    log('generate_code', { theme: theme, language: language, destination: destination });
}

export function logThemeSelect(theme: string) {
    log('theme_select', { name: theme });
}