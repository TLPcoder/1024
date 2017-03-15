"use strict";
window.onload = function() {
    var board = document.getElementById('board');
    var controls = document.getElementById('controls');
    class Controls {
        constructor() {
            this.up = document.createElement('button');
            this.down = document.createElement('button');
            this.left = document.createElement('button');
            this.right = document.createElement('button');
            this.board = [
                [4, 2, 2, 8],
                [2, 4, 0, 4],
                [0, 2, 2, 2],
                [2, 2, 0, 2]
            ];
        }
        append() {
            controls.appendChild(this.up);
            controls.appendChild(this.down);
            controls.appendChild(this.left);
            controls.appendChild(this.right);
        }
        value() {
            this.up.textContent = 'UP';
            this.down.textContent = 'DOWN';
            this.left.textContent = 'LEFT';
            this.right.textContent = 'RIGHT';
        }
        addListener() {
            this.up.addEventListener('click', () => {
                this.moveUp();
            });
            this.down.addEventListener('click', () => {
                this.moveDown();
            });
            this.left.addEventListener('click', () => {
                this.moveLeft();
            });
            this.right.addEventListener('click', () => {
                this.moveRight();
            });
        }
        generateRandom() {
            function randomNumber() {
                return Math.floor(Math.random() * 4);
            }

            function randomNum2To4() {
                while (true) {
                    let number = Math.floor(Math.random() * 5);
                    if (number === 2 || number === 4) {
                        return number;
                    }
                }
            }
            while (true) {
                let position1 = randomNumber();
                let position2 = randomNumber();
                console.log(this.board[position1][position2]);
                if (this.board[position1][position2] === 0) {
                    this.board[position1].splice(position2, 1, randomNum2To4());
                    break;
                }
            }
            this.updateBoard();
        }
        updateBoard() {
            for (var i = 0; i < this.board.length; i++) {
                for (var k = 0; k < this.board[i].length; k++) {
                    let currentTile = document.getElementById(`tileValue${i}${k}`);
                    console.log(currentTile);
                    currentTile.innerHTML = this.board[i][k];
                }
            }
            console.log(this.board);
        }
        swap(arr, mainArrayIndex1, subArrayIndex1, mainArrayIndex2, subArrayIndex2) {
            var tmp = arr[mainArrayIndex1][subArrayIndex1];
            arr[mainArrayIndex1][subArrayIndex1] = arr[mainArrayIndex2][subArrayIndex2];
            arr[mainArrayIndex2][subArrayIndex2] = tmp;
        }
        moveDown() {
            console.log("down");
            console.log(this.board);

            var moveAgain = () => {
                for (let i = 0; i < this.board.length; i++) {
                    for (let j = 0; j < this.board.length; j++) {
                        if (this.board[j + 1] !== undefined && this.board[j + 1][i] === 0) {
                            this.swap(this.board, j, i, j + 1, i);
                        } else if (this.board[j + 1] !== undefined && this.board[j][i] === this.board[j + 1][i]) {
                            let added = this.board[j][i] + this.board[j + 1][i];
                            this.board[j][i] = 0;
                            this.board[j + 1][i] = added;
                            moveAgain();
                        }
                    }
                }
            };
            moveAgain();
            this.generateRandom();
        }
        moveUp() {
            console.log("up");
            var move = (arr) => {
                for (let j = arr.length - 1; j > 0; j--) {
                    if (arr[j] === arr[j - 1]) {
                        arr[j] = arr[j] + arr[j - 1];
                        arr.splice(j - 1, 1);
                    }
                    if (arr[j] === arr[j - 1]) {
                        move(arr);
                    }
                }
            };
            for (let i = 0; i < this.board.length; i++) {
                var newArray = this.board.map((el) => el[i]).filter((el) => {
                    if (el !== 0) {
                        return el;
                    }
                });
                move(newArray);
                console.log("new Array", newArray);
                while (newArray.length < 4) {
                    newArray.push(0);
                }
                for (var k = 0; k < this.board.length; k++) {
                    this.board[k][i] = newArray[k];
                }
            }
            this.generateRandom();
        }
        moveLeft() {
            console.log("left");
            var move = (arr) => {
                for (let j = 0; j < arr.length; j++) {
                    if (arr[j] === arr[j + 1]) {
                        arr[j] = arr[j] + arr[j + 1];
                        arr.splice(j + 1, 1);
                    }
                    if (arr[0] === arr[1]) {
                        move(arr);
                    }
                }
            };
            for (let i = 0; i < this.board.length; i++) {
                var newArray = this.board[i].filter((el) => {
                    if (el !== 0) {
                        return el;
                    }
                });
                move(newArray);
                while (newArray.length < 4) {
                    newArray.push(0);
                }
                this.board[i] = newArray;
            }
            this.generateRandom();
        }
        moveRight() {
            console.log("right");
            var move = (arr) => {
                for (let j = arr.length - 1; j > 0; j--) {
                    if (arr[j] === arr[j - 1]) {
                        arr[j] = arr[j] + arr[j - 1];
                        arr.splice(j - 1, 1);
                    }
                    if (arr[j] === arr[j - 1]) {
                        move(arr);
                    }
                }
            };
            for (let i = 0; i < this.board.length; i++) {
                var newArray = this.board[i].filter((el) => {
                    if (el !== 0) {
                        return el;
                    }
                });
                console.log("before", newArray);
                move(newArray);
                while (newArray.length < 4) {
                    newArray.unshift(0);
                }
                this.board[i] = newArray;
            }
            this.generateRandom();
        }
    }
    var startGame = new Controls();
    startGame.append();
    // startGame.generateRandom();
    // startGame.generateRandom();
    startGame.updateBoard()
    startGame.value();
    startGame.addListener();
};
