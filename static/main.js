const socket = io('/');
socket.on('deviceorientation', handleOrientation);

const element = document.querySelector('.device');

function handleOrientation(angles) {
    const rotateX = computeRotateX(angles);
    const rotateY = computeRotateY(angles);
    const transforms = [
        `rotateX(${rotateX}deg)`,
        `rotateY(${rotateY}deg)`
    ];
    element.style.transform = transforms.join(' ');
}

function computeRotateX({ beta }) {
    // beta(x) = [-180, 180]
    // [1] Convert beta orientation to [0, 360] range
    // [2] Translate angle to be compatible with CSS Transforms rotations
    beta = beta > 0 ? beta : 360 + beta; // [1]
    beta = (360 - (beta - 90)) % 360;    // [2]
    return beta;
}

function computeRotateY({ beta, gamma }) {
    // beta(x) = [-180, 180], gamma(y) = [-90, 90]
    return gamma;
}
