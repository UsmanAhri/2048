let selectedBlockAmount = Number(document.querySelector('.selected-size').value);

const c = document.querySelector('.container');
const indexItems = document.querySelectorAll('.index');
let cur = -1;
indexItems.forEach((index, i) => {
    index.addEventListener('click', () => {
        for (let j = 0; j < indexItems.length; j++) {
            indexItems[j].classList.remove('selected-size');
        }
        indexItems[i].classList.add('selected-size');
        selectedBlockAmount = Number(document.querySelector('.selected-size').value);

        staticBlock.coordinates = [
            {
                x: canv.borderSize,
                y: canv.borderSize
            }
        ];
        staticBlock.blockSizeCalculation();
        staticBlock.staticBlocksCoordinatesRecord();

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

let canv = {
    obj: document.getElementById('canvas'),
    width: 500,
    height: 500,
    borderSize: 5,
};

const ctx = canvas.getContext("2d");

canv.obj.width = canv.width;
canv.obj.height = canv.height;

function Block() {

}

Block.prototype = {
    size: Math.round((canv.width - canv.borderSize * (selectedBlockAmount + 1)) / selectedBlockAmount),
    coordinates: [
        {
            x: canv.borderSize,
            y: canv.borderSize
        }
    ],
    centeringNumbers:[],
    numbers: ["2048"],
    numberSize: "50px",
    numberBlocksCoordinates: [
        {
            x: canv.borderSize,
            y: canv.borderSize
        }
    ],
    numberBlocksBackgroundColors: {
        2: "#eee4da",
        4: "#ece0c7",
        8: "#f2b179",
        16: "#fa9360",
        32: "#fd775f",
        64: "#f85b40",
        128: "#edcf72",
        256: "#edcc5f",
        512: "#ecc657",
        1024: "#eec53d",
        2048: "#eec22e",
        larger: "#3d3a33"
    },
    blockSizeCalculation: function () {
        switch (selectedBlockAmount) {
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
    },
    staticBlocksCoordinatesRecord: function () {
        let blockX, blockY = canv.borderSize;

        for (let i = 0; i < selectedBlockAmount; i++) {
            blockX = canv.borderSize;
            for (let j = 0; j < selectedBlockAmount; j++) {
                if (j === 0) {
                    blockX = canv.borderSize;
                } else {
                    blockX = this.coordinates[j].x + this.size + canv.borderSize;
                }

                this.coordinates.push({
                    x: blockX,
                    y: blockY
                });
            }
            blockY = this.coordinates[this.coordinates.length - 1].y + this.size + canv.borderSize;
        }
        this.coordinates.shift();
    },
    centeringNumberCoordinatesRecord: function() {
        let centerX, centerY;

        for (let i = 0; i < this.numbers.length; i++) {
            centerX = this.numberBlocksCoordinates[i].x + Math.round(this.size / 2);
            centerY = this.numberBlocksCoordinates[i].y + Math.round(this.size / 2);
             this.centeringNumbers.push({
                 x: centerX,
                 y: centerY
             })
        }
    },
    allNumberCoordinatesRecord: function() {
        let centerX, centerY;

        for (let i = 0; i < this.numbers.length; i++) {
            centerX = this.numberBlocksCoordinates[i].x + Math.round(this.size / 2);
            centerY = this.numberBlocksCoordinates[i].y + Math.round(this.size / 2);
             this.centeringNumbers.push({
                 x: centerX,
                 y: centerY
             })
        }
    },
    createBlock: function () {
        console.log(this);
        if (this.numbers.length < this.coordinates.length) {
            this.numbers.push("2");
            this.numberBlocksCoordinates.push(
                this.coordinates[Math.round(Math.random() * (this.coordinates.length - 1))]
            )
        }
    }
};
//Not sure if constructor needs to be restored
Object.defineProperty(Block.prototype, "constructor", {
    enumerable: false,
    value: Block
});

let staticBlock = new Block();

staticBlock.staticBlocksCoordinatesRecord();

let blocksWithNumbers = new Block();

blocksWithNumbers.centeringNumberCoordinatesRecord();
blocksWithNumbers.createBlock();

function fas() {
    blocksWithNumbers.createBlock();
}

document.addEventListener('keydown', fas);




function canvasRadius(x, y, w, h, rad) {
    let r = x + w,
        b = y + h;

    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.lineTo(r - (rad), y);
    ctx.quadraticCurveTo(r, y, r, y + rad);
    ctx.lineTo(r, b - rad);
    ctx.quadraticCurveTo(r, b, r - rad, b);
    ctx.lineTo(x + rad, b);
    ctx.quadraticCurveTo(x, b, x, b - rad);
    ctx.lineTo(x, y + rad);
    ctx.quadraticCurveTo(x, y, x + rad, y);
    ctx.fill();
}

function drawGame() {
    ctx.fillStyle = "#bbada0";
    ctx.fillRect(0, 0, canv.width, canv.height);

    for (let i = 0; i < staticBlock.coordinates.length; i++) {
        ctx.fillStyle = "#d6cdc4";
        canvasRadius(staticBlock.coordinates[i].x, staticBlock.coordinates[i].y, staticBlock.size, staticBlock.size, 5);
    }

    for (let i = 0; i < blocksWithNumbers.numbers.length; i++) {
        if (blocksWithNumbers.numbers[i] <= "2048") {
            ctx.fillStyle = blocksWithNumbers.numberBlocksBackgroundColors[blocksWithNumbers.numbers[i]];
        }
        else {
            ctx.fillStyle = blocksWithNumbers.numberBlocksBackgroundColors.larger;
        }
        canvasRadius(blocksWithNumbers.numberBlocksCoordinates[i].x, blocksWithNumbers.numberBlocksCoordinates[i].y, blocksWithNumbers.size, blocksWithNumbers.size, 5);
    }


    for (let i = 0; i < blocksWithNumbers.numbers.length; i++) {
        if (blocksWithNumbers.numbers[i] === "2" || blocksWithNumbers.numbers[i] === "4") {
            ctx.fillStyle = "#726763";
        }
        else {
            ctx.fillStyle = "#ffffff";
        }
    }
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = blocksWithNumbers.numberSize + " Arial";
    ctx.fillText(blocksWithNumbers.numbers[0], blocksWithNumbers.centeringNumbers[0].x, blocksWithNumbers.centeringNumbers[0].y );

}

setInterval(drawGame, 50);