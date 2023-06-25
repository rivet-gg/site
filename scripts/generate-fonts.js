const fs = require('fs');
const path = require('path');

// Function to capitalize first letter of each word in a string
function capitalizeWords(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Read the directory files
let fonts = [];
fonts.push(...fs.readdirSync(path.join(__dirname, '../public/fonts/open-sans')));
fonts.push(...fs.readdirSync(path.join(__dirname, '../public/fonts/saira')));

// Filter out non-TTF files (optional)
fonts = fonts.filter(file => path.extname(file) === '.ttf');

// Continue with the rest of your code...

// Start of the CSS string
let cssString = '';

// Iterate over the array and create a CSS rule for each font
fonts.forEach(font => {
  // Determine the font weight
  let weight = 'normal';
  if (font.includes('Bold')) weight = 'bold';
  if (font.includes('ExtraBold')) weight = '800';
  if (font.includes('SemiBold')) weight = '600';
  if (font.includes('Light')) weight = '300';

  // Determine the font style
  let style = 'normal';
  if (font.includes('Italic')) style = 'italic';

  // Format the font family name
  let family;
  if (font.includes('OpenSans')) {
    family = 'Open Sans';
    if (font.includes('Condensed')) family = 'Open Sans Condensed';
    if (font.includes('SemiCondensed')) family = 'Open Sans Semi Condensed';
  } else if (font.includes('SairaExtraCondensed')) {
    family = 'Saira Extra Condensed';
  } else {
    throw new Error('Unknown font family');
  }

  // Generate the CSS rule
  let rule = `@font-face {
    font-family: '${capitalizeWords(family)}';
    src: url('/fonts/open-sans/${font}') format('truetype');
    font-weight: ${weight};
    font-style: ${style};
}\n\n`;

  // Add the rule to the CSS string
  cssString += rule;
});

// Write the CSS string to a file
fs.writeFile(path.join(__dirname, '../src/styles/fonts.css'), cssString, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('The file was saved!');
});
