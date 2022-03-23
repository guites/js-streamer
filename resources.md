<https://medium.com/swlh/building-a-video-streaming-service-in-javascript-7f751fe76564>
<https://github.com/kmaher9/mstream>
<https://stackoverflow.com/questions/56689420/how-to-get-body-json-response-from-xhr-request-with-puppeteer?noredirect=1&lq=1>
<https://stackoverflow.com/questions/60579493/intercept-a-certain-request-and-get-its-response-puppeteer>
<https://stackoverflow.com/a/69333734>
<https://github.com/gspteck/RecScreen/blob/main/js/main.js>

Exemplo usado na captação do video pelas requisições na aba network do twitter: <https://twitter.com/ScotPilie_Wx/status/1506447111658868753>

Basicamente, filtrando pelo tamanho do video (consta na url, 720x1280), é preciso baixar primeiro o .mp4, depois os .m4s em sequência, e uní-los usando `cat`.

O VLC já reconhece pela extensão mp4.

O ideal seria conseguir streamar um vídeo pro front end usando um server em node e front em vanilla js pra usar de exemplo, ao invés de ficar tocando o puppeteer no link do twitter, daí eu conseguiria depurar melhor etc.

Ver também

<https://github.com/AAndyProgram/SCrawler/blob/main/SCrawler/API/Twitter/SiteSettings.vb>
<https://github.com/twintproject/twint>
<https://github.com/puemos/hls-downloader>

Se eu conseguir interceptar os requests realizados na página com o puppeteer, seria questão de salvar cada request no local e depois pensar em uma lógica, provavelmente através do filename, pra realizar o download de um por um e depois concatenar os arquivos.

Fazendo isso, ao acessar a URL com o puppeteer seria questão de: verificar se contém um vídeo com src:blob,
se sim, utilizar a lógica de interceptar requests e etc, se não, baixar o html e pegar o id da thumbnail, pois é muito provavelmente um gif.

<https://medium.com/canal-tech/how-video-streaming-works-on-the-web-an-introduction-7919739f7e1>

```
MP4Box -dash 1000 -dash-profile live multiple_choice_test.mp4
MP4Box -dash 1000 -segment-name part -dash-profile live vid.mp4
```

<https://stackoverflow.com/a/48991053>
```
MP4Box -info big.mp4 2>&1 | grep RFC6381 | awk '{print $4}' | paste -sd , -

raw_codec=$(MP4Box -info video.mp4 2>&1 | grep RFC6381 | awk '{print $4}' | paste -sd , -);
echo "video/mp4; codecs="$raw_codec
```

<https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs>
<https://nickdesaulniers.github.io/netfix/demo/bufferAll.html>
