var fs = require('fs');
const Handlebars = require('handlebars');

// The entire data object needs to be included in the dataset site so the OpenActive parser can read it
var data = JSON.parse(fs.readFileSync('system-list.jsonld', { encoding:'utf8' }));
// Create a `data` property containing `data.json` so that Mustache can read it
data.json = JSON.stringify(data, null, 2);

// Use the resulting JSON with the mustache template to render the dataset site.
var html = renderTemplate('index', data);
fs.writeFileSync('./publish/index.html', html, { encoding:'utf8' });

/**
 * Render the specified Handlebars template with the supplied data
 *
 * @param {string} templateName Filename of the Handlebars template
 * @param {any} data JSON to pass into the Handlebars template
 */
function renderTemplate(templateName, data) {
  const getTemplate = (name) => {
    const file = fs.readFileSync(`${__dirname}/templates/${name}.handlebars`, { encoding:'utf8' });
    return Handlebars.compile(file);
  };

  const template = getTemplate(templateName);

  return template(data, {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
    helpers: {
    },
  });
}

