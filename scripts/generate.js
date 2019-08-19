const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const marked = require('marked');
const {minify} = require('html-minifier');
const {readFile, readdir, writeFile, stat, rmdir, mkdir} = fs.promises

const frontMatterPattern = /^---\n(?<frontMatterContent>(.*\n)+)^---$/gm;
const slugPattern = /^(?<slug>[a-zA-Z0-9-]+).md$/;
const dataDir = path.join(__dirname, '..', 'data');
const postsInputDir = path.join(dataDir, 'posts');
const projectsInputDir = path.join(dataDir, 'projects');
const assetsDir = path.join(__dirname, '..', 'src', 'assets')
const postsOutputDir = path.join(assetsDir, 'posts')
const projectsOutputDir = path.join(assetsDir, 'projects')
const minifyOptions = {collapseWhitespace: true}
marked.setOptions({gfm: true, breaks: true, xhtml: true});

function dateComparator(a, b) {
  const aDate = Date.parse(a.date);
  const bDate = Date.parse(b.date);
  return aDate < bDate ? 1 : aDate === bDate ? 0 : -1;
}

async function generatePostData() {
  await rmdir(postsOutputDir, {recursive: true})
  await mkdir(postsOutputDir)
  const postFileNames = await readdir(postsInputDir);

  const postData = await Promise.all(postFileNames.map(fileName => extractData(postsInputDir, fileName)));

  await Promise.all([
      ...postData.map(([{slug}, html]) =>
        writeFile(path.join(postsOutputDir, `${slug}.html`), minify(html, minifyOptions))
      ),
      writeFile(
        path.join(postsOutputDir, 'data.json'),
        JSON.stringify(postData.map(([data]) => data).sort(dateComparator))
      )
    ]
  )
}

async function generateProjectData() {
  await rmdir(projectsOutputDir, {recursive: true})
  await mkdir(projectsOutputDir)
  const projectFileNames = await readdir(projectsInputDir);
  const projectData = await Promise.all(projectFileNames.map(fileName => extractData(projectsInputDir, fileName)));

  await Promise.all([
      ...projectData.map(([{slug}, html]) =>
        writeFile(path.join(projectsOutputDir, `${slug}.html`), minify(html, minifyOptions))
      ),
      writeFile(
        path.join(projectsOutputDir, 'data.json'),
        JSON.stringify(projectData.map(([data]) => data).sort(dateComparator))
      )
    ]
  )
}

async function extractData(directoryPath, fileName) {
  const filePath = path.join(directoryPath, fileName);
  const data = (await readFile(filePath)).toString();
  const slugMatch = slugPattern.exec(fileName)
  if (slugMatch === null) {
    throw new Error(`Invalid post :: slug [${fileName}]`)
  }
  const slug = slugMatch.groups.slug
  const frontMatterMatch = frontMatterPattern.exec(data);
  if (frontMatterMatch === null) {
    throw new Error(`Invalid post :: front matter [${fileName}]`)
  }
  const frontMatter = yaml.safeLoad(frontMatterMatch.groups.frontMatterContent);
  const html = marked(data.replace(frontMatterPattern, '').trim());
  return [{...frontMatter, slug}, html];
}


Promise.all([
  generatePostData(),
  generateProjectData()
])
  .catch((err) => console.error(err))
