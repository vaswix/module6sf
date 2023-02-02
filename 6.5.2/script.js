const btn = document.getElementsByClassName('btn-arrow')[0];


btn.addEventListener('click', () => {
    alert(`Ширина: ${window.screen.width}px, Высота ${window.screen.height}px`);
})