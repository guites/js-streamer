const fs    = require('fs')
const path = require('path')

exports.altstream = async function (request, response, next) {
    response.sendFile(path.join(__dirname, '../videos/multiple_choice/step1.mp4'))
}

exports.altstream2 = async function (request, response, next) {
    response.sendFile(path.join(__dirname, '../videos/multiple_choice/step2.mp4'))
}

exports.stream = async function (request, response, next) {
    const video = 'videos/vid.mp4' // source video
    let stat = fs.statSync(video)
    let range = request.headers.range // will be undefined on first request
    console.log(range)
    if (range) {
        let [start, end] = range.replace(/bytes=/, '').split('-')
        start = 1 // parseInt(start, 10)
        // we dont always request the end of the video so if we dont have one then set one that is the size minus last byte
        end = stat.size - 1 // end ? parseInt(end, 10) : stat.size - 1
        // 206 is partial content - tell browser streaming
        response.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${stat.size}`,
            "Accept-Ranges": "bytes",
            "Content-Length": (end - start) + 1, // not video size, actually length of buffer,
            "Content-Type": "video/mp4"
        })
        // only stream part of video from given timestamps - handles request for us
        fs.createReadStream(video, { start, end }).pipe(response)
    } else {
        response.writeHead(200, {
            "Content-Length": stat.size,
            "Content-Type": "video/mp4"
        })

        fs.createReadStream(video).pipe(response)
    }
}

