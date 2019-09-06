let selectedBlockSize = Number(document.querySelector('.selected-size').value);

const c = document.querySelector('.container');
const indexs = document.querySelectorAll('.index');
let cur = -1;
indexs.forEach((index, i) => {
    index.addEventListener('click', () => {
        for (let j = 0; j < indexs.length; j++) {
            indexs[j].classList.remove('selected-size');
        }
        indexs[i].classList.add('selected-size');
        selectedBlockSize = Number(document.querySelector('.selected-size').value);

        block.coordinates = [
            {
                x: canv.borderSise,
                y: canv.borderSise
            }
        ];
        block.blockSizeCalculation();
        block.staticBlocksCoordinatesRecord();

        c.className = 'container';
        void c.offsetWidth; // Reflow
        c.classList.add('open');
        c.classList.add(`i${i + 1}`);
        if (cur > i) {
            c.classList.add('flip');
        }
        cur = i
    })
});
//-----------------------------------------//

function Canvas() {
    this.obj = document.getElementById('canvas');
    this.width = 500;
    this.height = 500;
    this.borderSise = 5;
}

let canv = new Canvas();

const ctx = canvas.getContext("2d");

canvas.width = canv.width;
canvas.height = canv.height;

function Block() {
    this.size = Math.round((canv.width - canv.borderSise * (selectedBlockSize + 1)) / selectedBlockSize);
    this.coordinates = [
        {
            x: canv.borderSise,
            y: canv.borderSise
        }
    ];
    this.blockSizeCalculation = function() {
        switch (selectedBlockSize) {
            case 3:
                this.size = 160;
                break;
            case 4:
                this.size = 118.7;
                break;
            case 5:
                this.size = 94;
                break;
            case 6:
                this.size = 77.5;
                break;
            case 7:
                this.size = 65.7;
                break;
            case 8:
                this.size = 56.85;
                break;
            default:
                this.size = 160;
        }
        return this.size;
    };
    this.staticBlocksCoordinatesRecord = function() {
        let blockX, blockY = canv.borderSise;

        for (let i = 0; i < selectedBlockSize; i++) {
            blockX = canv.borderSise;
            for (let j = 0; j < selectedBlockSize; j++) {
                if (j === 0) {
                    blockX = canv.borderSise;
                }
                else {
                    blockX = this.coordinates[j].x + this.size + canv.borderSise;
                }

                this.coordinates.push({
                    x: blockX,
                    y: blockY
                });
            }
            blockY = this.coordinates[this.coordinates.length - 1].y + this.size + canv.borderSise;
        }
        this.coordinates.shift();
    }
}

let block = new Block();




block.staticBlocksCoordinatesRecord();
function drawGame() {


    ctx.fillStyle = "#bbada0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < block.coordinates.length; i++) {
        ctx.fillStyle = "#d6cfc5";
        ctx.fillRect(block.coordinates[i].x, block.coordinates[i].y, block.size, block.size);
    }

}

setInterval(drawGame, 50);