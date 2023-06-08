import fs from 'fs';
import metadataParser from 'markdown-yaml-metadata-parser';
import removeMd from 'remove-markdown';

const tagDirectory = {};
const authorDirectory = {};

const env = fs.readFileSync('.env', 'utf8');
const numQuotes = parseInt(env.split('=')[1]);
for (let i = 0; i < numQuotes; i++) {
  const paddedIndex = (i + 1).toString().padStart(4, '0');
  const url = `/quotes/quote${paddedIndex}.md`
  const quotFile = fs.readFileSync(`public/${url}`, 'utf8');
  const { metadata, content} = metadataParser(quotFile);
  const tags = metadata.tags || [];
  const author = metadata.author || '';

  if (author) {
    authorDirectory[author] = authorDirectory[author] || [];
    authorDirectory[author].push({index: i + 1, portion: removeMd(content.substring(0, 35)) + '...'});
  }
  

  tags.forEach(tag => {
    tagDirectory[tag] = tagDirectory[tag] || [];
    tagDirectory[tag].push({index: i + 1, author});
  });
}
fs.writeFileSync('src/assets/tags.json', JSON.stringify(tagDirectory, null, 2));
fs.writeFileSync('src/assets/authors.json', JSON.stringify(authorDirectory, null, 2));