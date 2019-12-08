let selectedBlockAmount = Number(document.querySelector('.selected-size').value);

const c = document.querySelector('.container');
const indexItems = document.querySelectorAll('.index');
let startButton = document.getElementById('start');

let cur = -1;
indexItems.forEach((index, i) => {
    index.addEventListener('click', () => {
        for (let j = 0; j < indexItems.length; j++) {
            indexItems[j].classList.remove('selected-size');
        }
        indexItems[i].classList.add('selected-size');
        selectedBlockAmount = Number(document.querySelector('.selected-size').value);

        cell.allCells = [
            {
                x: canv.borderSize,
                y: canv.borderSize
            }
        ];
        cell.sizeCalculation();
        cell.cellsCoordinatesRecord();

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
    cellsCoordinatesRecord: function () {
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
    numbersCoordinatesRecord: function () {
        let centerX, centerY;

        for (let i = 0; i < this.allCells.length; i++) {
            if (this.allCells[i].value !== null) {
                centerX = this.allCells[i].x + (this.size / 2);
                centerY = this.allCells[i].y + (this.size / 2);

                this.allCells[i].valueCoordinateX = centerX;
                this.allCells[i].valueCoordinateY = centerY;

            }
        }
    },
    createValueCell: function () {
        let randomNumber = Math.round(Math.random() * (this.allCells.length - 1));

        if (this.allCells[randomNumber].value !== null) {
            this.createValueCell();
        }
        else {
            this.allCells[randomNumber].value = 2;
        }
    },
    move: function () {

    }
};
//Not sure if constructor needs to be restored
Object.defineProperty(Square.prototype, "constructor", {
    enumerable: false,
    value: Square
});

let cell = new Square();

cell.cellsCoordinatesRecord();

startButton.addEventListener('click', function () {

    cell.createValueCell();
});

function fas(event) {
    let cutKeyCode = event.code.substr(5).toLowerCase();

    if (
        cutKeyCode !== 'up' &&
        cutKeyCode !== 'down' &&
        cutKeyCode !== 'right' &&
        cutKeyCode !== 'left'
    ) {
        return false;
    } else if (cutKeyCode !== cell.directionArray[0]) {
        if (cell.directionArray.length === 3) {
            cell.directionArray.pop();
        }
        cell.directionArray.unshift(cutKeyCode);
        cell.move();
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

    // for (let i = 0; i < cell.allCells.length; i++) {
    //     CTX.fillStyle = "#d6cdc4";
    //     canvasRadius(cell.allCells[i].x, cell.allCells[i].y, cell.size, cell.size, 5);
    // }

    CTX.textAlign = "center";
    CTX.textBaseline = "middle";
    CTX.font = cell.numberSize + " Arial";
    for (let i = 0; i < cell.allCells.length; i++) {
        if (cell.allCells[i].value <= 2048 || cell.allCells[i].value === null) {
            CTX.fillStyle = cell.numberCellBackgroundColors[cell.allCells[i].value];
        } else {
            CTX.fillStyle = cell.numberCellBackgroundColors.larger;
        }
        canvasRadius(cell.allCells[i].x, cell.allCells[i].y, cell.size, cell.size, 5);

        if (cell.allCells[i].value === 2 || cell.allCells[i].value === 4) {
            CTX.fillStyle = "#726763";
        } else {
            CTX.fillStyle = "#ffffff";
        }

        // if (cell.allCells[i].value !== null) {
        //     cell.numbersCoordinatesRecord();
        //     for (let j = 0; i < cell.allCells.length; i++) {
        //         CTX.fillText(cell.allCells[j].value, cell.allCells[j].valueCoordinateX, cell.allCells[j].valueCoordinateY);
        //     }
        // }
        if (cell.allCells[i].value !== null) {
            cell.numbersCoordinatesRecord();
            CTX.fillText(cell.allCells[i].value, cell.allCells[i].valueCoordinateX, cell.allCells[i].valueCoordinateY)
        }
    }
}

setInterval(drawGame, 50);