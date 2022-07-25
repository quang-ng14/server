const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
async function findVideos(videoDirectory, dateRange) {
    // check cac file trong folder
    try {
        var videoToWatch = [];
        const files = await readdir(videoDirectory);
        // duyet tung file
        files.forEach(file => {
            var onlyName = path.basename(file, '.mp4');
            if (path.extname(file) === '.mp4' && onlyName.startsWith(dateRange)) {
                videoToWatch.push(file);
                // console.log(videoToWatch);
            }
        });
        console.log(videoToWatch);
        return videoToWatch;
    } catch (error) {
        console.log('Folder is not exist!');
    }
}

module.exports = findVideos;