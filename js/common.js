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

        staticBlock.allCells = [
            {
                x: canv.borderSize,
                y: canv.borderSize
            }
        ];
        staticBlock.sizeCalculation();
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

const CTX = canv.obj.getContext("2d");

canv.obj.width = canv.width;
canv.obj.height = canv.height;

function Square() {}

Square.prototype = {
    size: Math.round((canv.width - canv.borderSize * (selectedBlockAmount + 1)) / selectedBlockAmount),
    directionArray: [],
    allCells: [
        {
            x: canv.borderSize,
            y: canv.borderSize,
            value: null,
            valueCoordinateX: null,
            valueCoordinateY: null
        }
    ],
    numberSize: "30px",
    numberCellBackgroundColors: {
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
        larger: "#3d3a33",
        null: "#d6cdc4"
    },
    sizeCalculation: function () {
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

        for (let y = 0; y < selectedBlockAmount; y++) {

            blockX = canv.borderSize;

            for (let x = 0; x < selectedBlockAmount; x++) {
                if (x === 0) {
                    blockX = canv.borderSize;
                } else {
                    blockX = this.allCells[x].x + this.size + canv.borderSize;
                }

                this.allCells.push({
                    x: blockX,
                    y: blockY,
                    value: null,
                    valueCoordinateX: null,
                    valueCoordinateY: null
                });
            }
            blockY = this.allCells[this.allCells.length - 1].y + this.size + canv.borderSize;
        }
        this.allCells.shift();
    },
    centeringNumberCoordinatesRecord: function () {
        let centerX, centerY;

        for (let i = 0; i < this.allCells.length; i++) {

            if (this.allCells[i].value) {
                centerX = 200;
                centerY = 200;
                this.allCells[i].valueCoordinateX = centerX;
                this.allCells[i].valueCoordinateY = centerY;
            }
        }
    },
    // allNumberCoordinatesRecord: function () {
    //     let centerX, centerY;
    //
    //     for (let i = 0; i < this.numbers.length; i++) {
    //         centerX = this.numberBlocksCoordinates[i].x + Math.round(this.size / 2);
    //         centerY = this.numberBlocksCoordinates[i].y + Math.round(this.size / 2);
    //         this.centeringNumbers.push({
    //             x: centerX,
    //             y: centerY
    //         })
    //     }
    // },
    createValueCell: function () {
        let randomCoordinates = Math.round(Math.random() * (this.allCells.length - 1));

        this.allCells[randomCoordinates].value = 2;
    },
    move: function () {

    }
};
//Not sure if constructor needs to be restored
Object.defineProperty(Square.prototype, "constructor", {
    enumerable: false,
    value: Square
});

let staticBlock = new Square();

staticBlock.staticBlocksCoordinatesRecord();

let blocksWithNumbers = new Square();
blocksWithNumbers.createValueCell();

function fas(event) {
    let cutKeyCode = event.code.substr(5).toLowerCase();

    if (
        cutKeyCode !== 'up' &&
        cutKeyCode !== 'down' &&
        cutKeyCode !== 'right' &&
        cutKeyCode !== 'left'
    ) {
        return false;
    } else if (cutKeyCode !== blocksWithNumbers.directionArray[0]) {
        if (blocksWithNumbers.directionArray.length === 3) {
            blocksWithNumbers.directionArray.pop();
        }
        blocksWithNumbers.directionArray.unshift(cutKeyCode);
        blocksWithNumbers.move();
    }
}

document.addEventListener('keydown', fas);


function canvasRadius(x, y, w, h, rad) {
    let r = x + w,
        b = y + h;

    CTX.beginPath();
    CTX.moveTo(x + rad, y);
    CTX.lineTo(r - (rad), y);
    CTX.quadraticCurveTo(r, y, r, y + rad);
    CTX.lineTo(r, b - rad);
    CTX.quadraticCurveTo(r, b, r - rad, b);
    CTX.lineTo(x + rad, b);
    CTX.quadraticCurveTo(x, b, x, b - rad);
    CTX.lineTo(x, y + rad);
    CTX.quadraticCurveTo(x, y, x + rad, y);
    CTX.fill();
}

function drawGame() {
    CTX.fillStyle = "#bbada0";
    CTX.fillRect(0, 0, canv.width, canv.height);

    for (let i = 0; i < staticBlock.allCells.length; i++) {
        CTX.fillStyle = "#d6cdc4";
        canvasRadius(staticBlock.allCells[i].x, staticBlock.allCells[i].y, staticBlock.size, staticBlock.size, 5);
    }

    for (let i = 0; i < blocksWithNumbers.allCells.length; i++) {
        if (blocksWithNumbers.allCells[i].value <= 2048 || blocksWithNumbers.allCells[i].value === null) {
            CTX.fillStyle = blocksWithNumbers.numberCellBackgroundColors[blocksWithNumbers.allCells[i].value];
        } else {
            CTX.fillStyle = blocksWithNumbers.numberCellBackgroundColors.larger;
        }
        //canvasRadius(blocksWithNumbers.allCells[i].x, blocksWithNumbers.allCells[i].y, blocksWithNumbers.size, blocksWithNumbers.size, 5);
    }


    for (let i = 0; i < blocksWithNumbers.allCells.length; i++) {
        if (blocksWithNumbers.allCells[i].value === 2 || blocksWithNumbers.allCells[i].value === 4) {
            CTX.fillStyle = "#726763";
        } else {
            CTX.fillStyle = "#ffffff";
        }
    }
    CTX.textAlign = "center";
    CTX.textBaseline = "middle";
    CTX.font = blocksWithNumbers.numberSize + " Arial";
    // for (let i = 0; i < blocksWithNumbers.allCells.length; i++) {
    //     if (blocksWithNumbers.allCells[i].value) {
    //         console.log('yes')
    //         blocksWithNumbers.centeringNumberCoordinatesRecord();
    //         for (let j = 0; i < blocksWithNumbers.allCells.length; i++) {
    //             CTX.fillText(blocksWithNumbers.allCells[j].value, blocksWithNumbers.allCells[j].valueCoordinateX, blocksWithNumbers.allCells[j].valueCoordinateY);
    //         }
    //     }
    // }

}

setInterval(drawGame, 50);