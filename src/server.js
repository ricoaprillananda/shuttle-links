const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const USE_301 = process.env.USE_301 === 'true';

// Load static mappings
const linksPath = path.join(__dirname, 'links.json');
let links = {};
try {
  links = JSON.parse(fs.readFileSync(linksPath, 'utf8'));
} catch (err) {
  console.error('Failed to load links.json:', err);
  process.exit(1);
}

app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'shuttle-links' });
});

app.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const target = links[slug];
  if (target) {
    const statusCode = USE_301 ? 301 : 302;
    return res.redirect(statusCode, target);
  }
  res.status(404).json({ error: 'Unknown slug' });
});

app.listen(PORT, () => {
  console.log(`Shuttle Links server running on port ${PORT}`);
});
