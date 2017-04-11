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
            this.up.className = "button";
            this.down.className = "button";
            this.left.className = "button";
            this.right.className = "button";
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
                }
            });
        }
        reset(){
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
                    currentTile.innerHTML = this.board[i][k];
                    var tile = document.getElementById(`tile${i}${k}`)
                    var value = document.getElementById(`tileValue${i}${k}`);
                    console.log(this.board[i][k]);
                    switch(this.board[i][k]){
                        case 0:
                            tile.style.backgroundColor = '#F9F6F2';
                            value.style.color = "#F9F6F2";
                            break;
                        case 2:
                            tile.style.backgroundColor = '#EEE4DA';
                            value.style.color = "#776E66";
                            break;
                        case 4:
                            tile.style.backgroundColor = '#CBC0B3';
                            value.style.color = "#776E66";
                            break;
                        case 8:
                            tile.style.backgroundColor = '#F1B07D';
                            value.style.color = "#F9F6F2";
                            break;
                        case 16:
                            tile.style.backgroundColor = '#F39667';
                            value.style.color = "#F9F6F2";
                            break;
                        case 32:
                            tile.style.backgroundColor = '#F47C64';
                            value.style.color = "#F9F6F2";
                            break;
                        case 64:
                            tile.style.backgroundColor = '#F45F43';
                            value.style.color = "#F9F6F2";
                            break;
                        case 128:
                            tile.style.backgroundColor = '#ECCE78';
                            value.style.color = "#F9F6F2";
                            break;
                        case 256:
                            tile.style.backgroundColor = '#ECCB69';
                            value.style.color = "#F9F6F2";
                            break;
                        case 512:
                            tile.style.backgroundColor = '#ECCE78';
                            value.style.color = "#F9F6F2";
                            break;
                        case 1024:
                            tile.style.backgroundColor = '#ECC44D';
                            value.style.color = "#F9F6F2";
                            break;
                    }
                }
            }
        }
        swap(arr, mainArrayIndex1, subArrayIndex1, mainArrayIndex2, subArrayIndex2) {
            var tmp = arr[mainArrayIndex1][subArrayIndex1];
            arr[mainArrayIndex1][subArrayIndex1] = arr[mainArrayIndex2][subArrayIndex2];
            arr[mainArrayIndex2][subArrayIndex2] = tmp;
        }
        makeableMove(oldBoard){
            if(!this.checkLost()){
                alert("No more moves. You Lost!");
            }else{
                oldBoard === this.board.join('') ? console.log('cant make that move'):this.generateRandom();
            }
        }
        moveDown() {
            var currentBoard = this.board.join('');
            var move = (arr) => {
                for (let j = arr.length - 1; j > 0; j--) {
                    if (arr[j] === arr[j - 1]) {
                        arr[j] = arr[j] + arr[j - 1];
                        arr.splice(j - 1, 1);
                    }
                }
            };
            for (let i = 0; i < this.board.length; i++) {
                var newArray = this.board.map((el) => el[i]).filter((el) => {
                        return el > 0;
                });
                move(newArray);
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
            var currentBoard = this.board.join('');
            var move = (arr) => {
                for (let j = arr.length - 1; j > 0; j--) {
                    if (arr[j] === arr[j - 1]) {
                        arr[j] = arr[j] + arr[j - 1];
                        arr.splice(j - 1, 1);
                    }
                }
            };
            for (let i = 0; i < this.board.length; i++) {
                var newArray = this.board.map((el) => el[i]).filter((el) => {
                        return el > 0;
                });
                move(newArray);
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
            var currentBoard = this.board.join('');
            var move = (arr) => {
                for (let j = 0; j < arr.length; j++) {
                    if (arr[j] === arr[j + 1]) {
                        arr[j] = arr[j] + arr[j + 1];
                        arr.splice(j + 1, 1);
                    }
                }
            };
            for (let i = 0; i < this.board.length; i++) {
                var newArray = this.board[i].filter((el) => {
                        return el > 0;
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
            var currentBoard = this.board.join('');
            var move = (arr) => {
                for (let j = arr.length - 1; j > 0; j--) {
                    if (arr[j] === arr[j - 1]) {
                        arr[j] = arr[j] + arr[j - 1];
                        arr.splice(j - 1, 1);
                    }
                }
            };
            for (let i = 0; i < this.board.length; i++) {
                var newArray = this.board[i].filter((el) => {
                        return el > 0;
                });
                move(newArray);
                while (newArray.length < 4) {
                    newArray.unshift(0);
                }
                this.board[i] = newArray;
            }
            this.makeableMove(currentBoard);
        }
        checkLost(){
            for(let i = 0; i < this.board.length; i++){
                for(let k = 0; k < this.board[i].length - 1; k++){
                    if(this.board[i][k] === this.board[i][k+1] || this.board[i][k] === 0){
                        return true;
                    }
                }
            }
            for(let i = 0; i < this.board.length; i++){
                for(let k = 0; k < this.board[i].length - 1; k++){
                    if(this.board[k][i] === this.board[k+1][i] || this.board[k][i] === 0){
                        return true;
                    }
                }
            }
            return false;
        }
    }
    var Game = new Controls();
    Game.startGame();
};
