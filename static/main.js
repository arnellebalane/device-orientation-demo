const socket = io('/');
socket.on('deviceorientation', handleOrientation);

const element = document.querySelector('.device');
const offsets = { beta: 90 };

function handleOrientation({ alpha, beta, gamma }) {
    const transforms = [
        `rotateX(${-beta + offsets.beta}deg)`,
        `rotateY(${gamma}deg)`
    ];
    element.style.transform = transforms.join(' ');
}
