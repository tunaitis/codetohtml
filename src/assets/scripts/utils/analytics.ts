
export function logFileUpload(size: number) {
    gtag('event', 'file_upload', {size: size});
}

export function logGenerateCode(language: string, theme: string, destination: string) {
    gtag('event', 'generate_code', {theme: theme, language: language, destination: destination});
}

export function logThemeSelect(theme: string) {
    gtag('event', 'theme_select', {name: theme});
}