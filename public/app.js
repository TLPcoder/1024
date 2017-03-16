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
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        }
        startGame(){
            this.append();
            this.generateRandom();
            this.generateRandom();
            this.value();
            this.addListener();
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
            document.onkeydown = (e) => {
                e = e || window.event;
                switch (e.which || e.keyCode) {
                    case 37: // left
                        this.moveLeft();
                        break;

                    case 38: // up
                        this.moveUp();
                        break;

                    case 39: // right
                        this.moveRight();
                        break;

                    case 40: // down
                        this.moveDown();
                        break;

                }
            };
        }
        win(){
            this.board.forEach((el)=>{
                if(el.includes(1024)){
                    setTimeout(function(){
                        alert('Congratulations You Won');
                    },300);
                    // var newGame = document.getElementById('newGame');
                    // var popUp = document.getElementById('popUp');
                    // popUp.style.zIndex = '10';
                    // newGame.addEventListener('click',() => {
                    //     this.reset();
                    // });
                }
            });
        }
        reset(){
            var popUp = document.getElementById('popUp');
            popUp.style.zIndex = '-5';
            this.board = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            this.startGame();
        }
        generateRandom() {
            this.win();
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
                    var tile = document.getElementById(`tile${i}${k}`)
                    switch(this.board[i][k]){
                        case 0:
                            tile.style.backgroundColor = '#CBC0B3';
                            break;
                        case 2:
                            tile.style.backgroundColor = '#EEE4DA';
                            break;
                        case 4:
                            tile.style.backgroundColor = '#EDE0C9';
                            break;
                        case 8:
                            tile.style.backgroundColor = '#F1B07D';
                            break;
                        case 16:
                            tile.style.backgroundColor = '#F39667';
                            break;
                        case 32:
                            tile.style.backgroundColor = '#F47C64';
                            break;
                        case 64:
                            tile.style.backgroundColor = '#F45F43';
                            break;
                        case 128:
                            tile.style.backgroundColor = '#ECCE78';
                            break;
                        case 256:
                            tile.style.backgroundColor = '#ECCB69';
                            break;
                        case 512:
                            tile.style.backgroundColor = '#ECCE78';
                            break;
                        case 1024:
                            tile.style.backgroundColor = '#ECC44D';
                            break;
                    }
                }
            }
            console.log(this.board);
        }
        swap(arr, mainArrayIndex1, subArrayIndex1, mainArrayIndex2, subArrayIndex2) {
            var tmp = arr[mainArrayIndex1][subArrayIndex1];
            arr[mainArrayIndex1][subArrayIndex1] = arr[mainArrayIndex2][subArrayIndex2];
            arr[mainArrayIndex2][subArrayIndex2] = tmp;
        }
        makeableMove(oldBoard){
            oldBoard.join('') === this.board.join('') ? alert("cant make that move"):this.generateRandom();
        }
        moveDown() {
            console.log("up");
            var currentBoard = [];
            for(let i = 0; i < this.board.length; i++){
                currentBoard.push([]);
                for(let j = 0; j < this.board[i].length; j++){
                    currentBoard[i].push(this.board[i][j]);
                }
            }
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
                    newArray.unshift(0);
                }
                for (var k = 0; k < this.board.length; k++) {
                    this.board[k][i] = newArray[k];
                }
            }
            this.makeableMove(currentBoard);
        }
        moveUp() {
            console.log("up");
            var currentBoard = [];
            for(let i = 0; i < this.board.length; i++){
                currentBoard.push([]);
                for(let j = 0; j < this.board[i].length; j++){
                    currentBoard[i].push(this.board[i][j]);
                }
            }
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
            this.makeableMove(currentBoard);
        }
        moveLeft() {
            console.log("left");
            var currentBoard = this.board.slice();
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
            this.makeableMove(currentBoard);
        }
        moveRight() {
            console.log("right");
            var currentBoard = this.board.slice();
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
            this.makeableMove(currentBoard);
        }
    }
    var Game = new Controls();
    Game.startGame();
};
