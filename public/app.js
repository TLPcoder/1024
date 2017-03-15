"use strict";
window.onload = function(){
    var board = document.getElementById('board');
    var tile1 = document.getElementById('tileValue0');
    var controls = document.getElementById('controls');
    class Controls{
        constructor(){
            this.up = document.createElement('button');
            this.down = document.createElement('button');
            this.left = document.createElement('button');
            this.right = document.createElement('button');
            this.board = [[2,2,2,2],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        }
        append(){
            controls.appendChild(this.up);
            controls.appendChild(this.down);
            controls.appendChild(this.left);
            controls.appendChild(this.right);
        }
        value(){
            this.up.textContent = 'UP';
            this.down.textContent = 'DOWN';
            this.left.textContent = 'LEFT';
            this.right.textContent = 'RIGHT';
        }
        addListener(){
            this.up.addEventListener('click',() => {this.moveUp();});
            this.down.addEventListener('click',() => {this.moveDown();});
            this.left.addEventListener('click',() => {this.moveLeft();});
            this.right.addEventListener('click',() => {this.moveRight();});
        }
        generateRandom(){
            function randomNumber() {return Math.floor(Math.random() * 4);}
            function randomNum2To4(){
                while(true){
                    let number = Math.floor(Math.random() * 5);
                    if(number === 2 || number === 4){
                        return number;
                    }
                }
            }
            while(true){
                let position1 = randomNumber();
                let position2 = randomNumber();
                console.log(this.board[position1][position2]);
                if(this.board[position1][position2] === 0){
                    this.board[position1].splice(position2,1,randomNum2To4());
                    break;
                }
            }
            this.updateBoard();
        }
        updateBoard(){
            for(var i = 0; i < this.board.length; i++){
                for(var k = 0; k < this.board[i].length; k++){
                    let currentTile = document.getElementById(`tileValue${i}${k}`);
                    console.log(currentTile);
                    currentTile.innerHTML = this.board[i][k];
                }
            }
            console.log(this.board);
        }
        swap(arr, mainArrayIndex1, subArrayIndex1, mainArrayIndex2, subArrayIndex2){
            var tmp = arr[mainArrayIndex1][subArrayIndex1];
            arr[mainArrayIndex1][subArrayIndex1] = arr[mainArrayIndex2][subArrayIndex2];
            arr[mainArrayIndex2][subArrayIndex2] = tmp;
        }
        moveUp(){
            console.log("up");
        }
        moveDown(){
            console.log("down");
        }
        moveLeft(){
            console.log("left");
            for(let i = this.board.length - 1; i >= 0; i--){
                for(let j = this.board[i].length - 1; j >= 0; j--){
                    if(this.board[i][j-1] === 0){
                        this.swap(this.board, i, j, i, j-1);
                    }else if(this.board[i][j] === this.board[i][j-1]){
                        let added = this.board[i][j] + this.board[i][j-1];
                        this.board[i][j] = 0;
                        this.board[i][j-1] = added;
                        this.moveLeft();
                    }
                }
            }
            this.generateRandom();
        }
        moveRight(){
            console.log("right");
            for(let i = 0; i < this.board.length; i++){
                for(let j = 0; j < this.board[i].length; j++){
                    if(this.board[i][j+1] === 0){
                        this.swap(this.board, i, j, i, j+1);
                    }else if(this.board[i][j] === this.board[i][j+1]){
                        let added = this.board[i][j] + this.board[i][j+1];
                        this.board[i][j] = 0;
                        this.board[i][j+1] = added;
                        this.moveRight();
                    }
                }
            }
            this.generateRandom();
        }
    }
    var startGame = new Controls();
    startGame.append();
    startGame.generateRandom();
    startGame.generateRandom();
    startGame.value();
    startGame.addListener();
};
