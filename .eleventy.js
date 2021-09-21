const fs = require('fs');
const path = require('path');
const manifestPath = path.resolve(__dirname, 'dist/assets/manifest.json');

module.exports = function (config) {


    config.addNunjucksAsyncShortcode('webpack', async (name) =>
        new Promise((resolve) => {
            fs.readFile(manifestPath, { encoding: 'utf8' }, (err, data) => {
                return resolve(err ? `/assets/${name}` : JSON.parse(data)[name]);
            });
        }));

    config.addPassthroughCopy({ "src/static": "/" });

    config.addWatchTarget("src/assets/scripts");

    return {
        dir: {
            includes: '_components',
            input: 'src',
            layouts: '_layouts',
            output: 'dist',
        },
        // Allows using markup and EJS features in markdown
        markdownTemplateEngine: 'njk',
        templateFormats: [
            'njk',
            'md',
        ],
    };
};