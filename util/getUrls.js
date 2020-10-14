const fs = require('fs');
const Works = require('../api/models/works');

module.exports = async () => {
  const fileObj = {};

  const getUrls = async (dir) => {
    let files = fs.readdirSync(dir);
    // exclude some files
    files = files.filter(
      (file) =>
        file !== '_app.js' &&
        file !== '_document.js' &&
        file !== '_error.js' &&
        file !== '404.js' &&
        file !== 'edit.js' &&
        file !== 'admin.js' &&
        file !== 'success.js'
    );

    const works = await Works.find({});

    works.forEach((work) => {
      fileObj[`/piece/${work.slug}`] = {
        page: `/piece/${work.slug}`,
        lastModified: work.updatedAt || work.created,
        images: work.images,
        caption: work.description,
        title: work.name,
      };
    });
    files.forEach((file) => {
      // Construct whole file-path & retrieve file's stats
      const filePath = `${dir}${file}`;
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        // Recurse one folder deeper
        getUrls(`${filePath}/`);
      } else {
        // Construct this file's pathname excluding the "pages" folder & its extension
        const cleanFileName = filePath
          .substr(0, filePath.lastIndexOf('.'))
          .replace('pages/', '');

        // Add this file to `fileObj`
        fileObj[`/${cleanFileName}`] = {
          page: `/${cleanFileName}`,
          lastModified: fileStat.mtime,
        };
      }
    });
  };

  // Start recursion to fill `fileObj`
  await getUrls('pages/');

  return fileObj;
};
