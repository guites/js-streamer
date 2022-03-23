/**
 * Starts streaming fragmented mp4 data into video tag
 */
function streamIntoVideo() {
    const video = document.getElementById('alt-video');
    const mimeCodec = 'video/mp4; codecs=avc1.4D002A,mp4a.40.2';
    const isAbleToPlay = 'MediaSource' in window && MediaSource.isTypeSupported(mimeCodec);
    // TODO: should throw error stating that html element was not found
    if (!video) return;
    // TODO: should fallback to playing regular video with src="...mp4"
    if (!isAbleToPlay) return;
    const mediaSource = new MediaSource;

    video.src = URL.createObjectURL(mediaSource);
    const assetURL = 'http://localhost:3000/altstream';
    // prototype style argument passing! source https://stackoverflow.com/a/11986895
    mediaSource.addEventListener('sourceopen', sourceOpen);
    mediaSource.mimeCodec = mimeCodec;
    mediaSource.assetURL = assetURL;
}

/**
 * Fetch a video or an audio segment, and returns it as an ArrayBuffer, in a
 * Promise.
 * @param {string} url
 * @returns {Promise.<ArrayBuffer>}
 */
function fetchSegment(url) {
  return fetch(url).then(function(response) {
    return response.arrayBuffer();
  });
}

function sourceOpen () {
    const mediaSource = this;
    const mimeCodec = this.mimeCodec;
    const assetURL = this.assetURL;
    const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec)
    fetchAB(assetURL, function (buf) {
        sourceBuffer.addEventListener('updateend', function (_) {
            mediaSource.endOfStream();
        });
        sourceBuffer.appendBuffer(buf);
    });
};

function fetchAB (url, cb) {
    console.log(url);
    var xhr = new XMLHttpRequest;
    xhr.open('get', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        cb(xhr.response);
    };
    xhr.send();
};

streamIntoVideo();