const Recorder = require('node-rtsp-recorder').Recorder

var rec = new Recorder({
    url: 'rtsp://localhost:8554/mystream',
    timeLimit: 15, // time in seconds for each segmented video file
    folder: 'F:\Ca_nhan\DATN\Video_test',
    name: 'cam1'
    //directoryPathFormat: 'MMM-D-YYYY',
    //fileNameFormat: 'M-D-h-mm-ss',
})
// Default directoryPathFormat : MMM-Do-YY
// Default fileNameFormat : YYYY-M-D-h-mm-ss
// Refer to https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/ for custom formats.
// Starts Recording
rec.startRecording();

module.export = saveVideo;