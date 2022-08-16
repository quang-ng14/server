"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = require("fs");
const node_rtsp_stream_1 = __importDefault(require("node-rtsp-stream"));
const changeExtension = require("./utils/changeExtension");
const findVideos = require("./utils/findVideos");
const Recorder = require('node-rtsp-recorder').Recorder;
const port = 80;
const _streamUrl = 'rtsp://34.127.2.194:554';
var app = (0, express_1.default)();
app.use(express_1.default.static('www'));
app.use(express_1.default.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + "/templates");
app.get('/', (req, res) => {
    //res.contentType("text/plain");
    res.render("index.html", { title: "Stream", streamHost: "34.143.192.209" /*"localhost" */ /*  "34.143.192.209" */ });
    //res.sendFile(__dirname + "/templates/index.html");
});
app.get('/cam/:id', (req, res) => {
    //res.contentType("text/plain");
    let camId = req.params.id;
    res.render("cam" + camId + ".html", { title: "Stream", streamHost: /*"localhost" */ "34.143.192.209" });
    //res.sendFile(__dirname + "/templates/index.html");
});
app.get('/login', (req, res) => {
    //res.contentType("text/plain");
    res.render("login.html", { title: "Login" });
    //res.sendFile(__dirname + "/templates/index.html");
});
let rtspConvToWs1 = new node_rtsp_stream_1.default({
    name: 'cam1',
    streamUrl: _streamUrl + '/cam1',
    wsPort: 81,
    ffmpegOptions: {
        '-stats': '',
        '-r': 30 // options with required values specify the value after the key
    }
});
let rtspConvToWs2 = new node_rtsp_stream_1.default({
    name: 'cam2',
    streamUrl: _streamUrl + '/cam2',
    wsPort: 82,
    ffmpegOptions: {
        '-stats': '',
        '-r': 30 // options with required values specify the value after the key
    }
});
let rtspConvToWs3 = new node_rtsp_stream_1.default({
    name: 'cam3',
    streamUrl: _streamUrl + '/cam3',
    wsPort: 85,
    ffmpegOptions: {
        '-stats': '',
        '-r': 30 // options with required values specify the value after the key
    }
});
let rtspConvToWs4 = new node_rtsp_stream_1.default({
    name: 'cam4',
    streamUrl: _streamUrl + '/cam4',
    wsPort: 84,
    ffmpegOptions: {
        '-stats': '',
        '-r': 30 // options with required values specify the value after the key
    }
});
var nameChanged;
var dataDate;
var dataHour;
var videoDirectory = `${__dirname}/video_test/cam1/${dataDate}/video`;
var nameFile;
// set name;
var cam1 = "Cam 1";
var cam2 = "Cam 2";
var cam3 = "Cam 3";
var cam4 = "Cam 4";
app.get("/record", function (req, res) {
    //res.sendFile(__dirname + "/templates/index2.html");
    res.render("index2.html", { title: "Record" });
});
app.post('/add-time', function (req, res) {
    if (req.body) {
        dataDate = req.body.dayChosen;
        dataHour = req.body.hourChosen;
        videoDirectory = `${__dirname}/video_test/cam1/${dataDate}/video`;
        console.log('2+ ' + dataDate + dataHour);
        // ham change extension
        changeExtension(videoDirectory);
    }
    res.status(200).json({
        status: 'success',
        path: videoDirectory
    });
});
// extname()
app.get('/video-record', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(videoDirectory);
        console.log(dataDate);
        console.log(dataHour);
        const dataRecord = yield findVideos(videoDirectory, dataHour);
        console.log(dataRecord);
        res.status(200).json({
            status: 'success',
            dataRecord
        });
    });
});
app.get('/get-cam-name', function (req, res) {
    res.status(200).json({
        status: 'success',
        cam1,
        cam2,
        cam3,
        cam4,
    });
});
app.post('/change-name/', function (req, res) {
    if (req.body.id && req.body.name) {
        var id = req.body.id;
        var name = req.body.name;
        if (id == 1)
            cam1 = name;
        else if (id == 2)
            cam2 = name;
        else if (id == 3)
            cam3 = name;
        else
            cam4 = name;
    }
    res.status(200).json({
        status: 'success',
        cam1,
        cam2,
        cam3,
        cam4,
    });
});
app.post('/video1', function (req, res) {
    console.log(req.body);
    if (req.body) {
        nameFile = req.body;
        // ham change extension
        //changeExtension(videoDirectory, nameFile.dataName);
    }
    res.status(200).json({
        nameFile
    });
});
var username, password;
app.post('/login1', function (req, res) {
    if (req.body) {
        username = req.body.username;
        password = req.body.password;
    }
    if (username === 'quang' && password === '14012000') {
        res.status(200).json({
            isSuccess: true
        });
    }
    else {
        res.status(200).json({
            isSuccess: false
        });
    }
});
app.get("/video", function (req, res) {
    let range = req.headers.range;
    if (!range) {
        // res.status(400).send("requires range header!");
        range = 'bytes=0-';
    }
    const videoPath = `${__dirname}/video_test/cam1/${dataDate}/video/${nameFile.dataName}`;
    //const videoPath = `${__dirname}/video_test/cam1/2022-07-23/video/18-37-08.mp4`;
    //console.log('22+' + nameFile.dataName);
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = Math.pow(10, 6);
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    console.log('ready to stream');
    videoStream.pipe(res);
});
var RecordPath = __dirname + '/video_test/';
var rec = new Recorder({
    url: 'rtsp://34.127.2.194:554/cam1',
    timeLimit: 300,
    folder: RecordPath,
    //folder: 'D:/Download/NodejsWebApp1-express-master/NodejsWebApp1/video_test',
    name: 'cam1',
    directoryPathFormat: 'YYYY-MM-D',
    fileNameFormat: 'HH-mm-ss',
});
rec.startRecording();
setTimeout(() => {
    console.log('Stopping Recording');
    rec.stopRecording();
    rec = null;
}, 300000);
let server = app.listen(port, () => {
    let addressInfo = server.address();
    console.log("Nodejs server start listening at %s:%d", addressInfo.address, addressInfo.port);
});
console.log(__filename);
//# sourceMappingURL=server.js.map