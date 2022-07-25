const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

function changeExtension(videoDirectory) {
    // check cac file trong folder
    fs.readdir(videoDirectory, (err, files) => {
        if (err) {
            console.log('Folder is not exist!');
        }
        // duyet tung file
        files.forEach(file => {
            var aviName = path.basename(file, '.avi');
            var mp4Name = path.basename(file, '.mp4');
            if (path.extname(file) === '.avi' && aviName !== mp4Name) {
                // CHILD PROCESS TO CHANGE EXTENSION
                exec(`ffmpeg -i ${videoDirectory}/${file} ${videoDirectory}/${aviName}.mp4`, (err, stdout, stderr) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("success changed", stdout);
                })
            }
        })
        console.log('change completed!');
    })
}

module.exports = changeExtension;