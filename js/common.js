const c = document.querySelector('.container');
const indexs = document.querySelectorAll('.index');
let cur = -1;
indexs.forEach((index, i) => {
    index.addEventListener('click', () => {
        // clear
        c.className = 'container';
        void c.offsetWidth; // Reflow
        c.classList.add('open');
        c.classList.add(`i${i + 1}`);
        if (cur > i) {
            c.classList.add('flip')
        }
        cur = i
    })
});
//-----------------------------------------//

function Canvas() {
    this.obj = document.getElementById('canvas');
    this.width = 500;
    this.height = 500;
    //this.borderSize =
}

let canv = new Canvas();

const ctx = canvas.getContext("2d");

canvas.width = canv.width;
canvas.height = canv.height;






ctx.fillStyle = "#bbada0";
ctx.fillRect(0, 0, canvas.width, canvas.height);