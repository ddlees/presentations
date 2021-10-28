import {lstatSync} from 'fs';
import {readdir, readFile, writeFile} from 'fs/promises';
import Mustache from 'mustache';

(async () => {
  const dist = './dist';
  const template = (await readFile('./index.mustache')).toString();
  const files = await readdir(dist);
  
  const data = {
    slides: files.filter((file) => lstatSync(`${dist}/${file}`).isDirectory())
  };

  const index = Mustache.render(template, data);
  await writeFile(`${dist}/index.html`, index);
})().catch(console.error);
