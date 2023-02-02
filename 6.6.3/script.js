const echoUrl = 'wss://echo-ws-service.herokuapp.com';

const inputVal = document.getElementsByClassName('message-input')[0];
const output = document.getElementById('output');
const btnSend = document.getElementsByClassName('message-send')[0];

let websocket;

function writeToScreen(message, side = 'right') {
    let pre = document.createElement('p');
    pre.style.textAlign = side;
    pre.innerHTML = message;
    console.log(message);
    output.appendChild(pre);
}


document.addEventListener('DOMContentLoaded', () => {
    websocket = new WebSocket(echoUrl);
    websocket.onmessage = function (evt) {
        writeToScreen(
            '<span style="color: blue;">' + evt.data + '</span>'
            , 'left');
    };
    websocket.onerror = function (evt) {
        writeToScreen(
            '<span style="color: red;">ERROR:</span> ' + evt.data, 'left'
        );
    };
});


btnSend.addEventListener('click', () => {
    const message = inputVal.value;
    writeToScreen(message);
    websocket.send(message);
})

const getGeo = document.getElementsByClassName('geolocation-send')[0];
const status = document.querySelector('#status');

const error = () => {
    status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (pos) => {
    let p = document.createElement('p');
    p.style.textAlign = 'right';
    let send = document.createElement('a');
    send.href = `https://www.openstreetmap.org/#map=18/${pos.coords.latitude}/${pos.coords.longitude}`;
    send.textContent = 'Гео-позиция';
    output.appendChild(p);
    p.appendChild(send);
}

getGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
})

