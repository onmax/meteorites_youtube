const modal = document.getElementById('videoInfo');
const overlay = document.getElementById('overlay');

function moreInfo() {
    const moreInfo = document.getElementById('moreInfo');
    overlay.addEventListener('click', hideModal);
    moreInfo.addEventListener('click', showModal);
}

function showModal() {
    modal.classList.add('show-modal')
    overlay.classList.add('show-overlay')
}

function hideModal() {
    modal.classList.toggle('show-modal')
    overlay.classList.toggle('show-overlay')
}