const socket = io('/controller');

function pick(object, keys) {
    const result = {};
    for (let key in object) {
        if (keys.includes(key)) {
            result[key] = object[key];
        }
    }
    return result;
}

function handleOrientation(e) {
    socket.emit('deviceorientation', pick(e, ['alpha', 'beta', 'gamma']));
}

window.addEventListener('deviceorientation', handleOrientation);
