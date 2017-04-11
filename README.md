1024

A game based on the popular mobile application 1024. A game where the user can test their skills and try to accomplish the goal of combining numbers until they equal 1024.

Live: https://trevor1024.herokuapp.com/

I used OOP and vanilla javascript to create this application and it is mobile friendly using media queries.

The data structure used to represent the board is a multidimensional array where a blank space is represented by a 0 and any other space represented by its numerical value

```javascript
this.board = [
    [0, 0, 0, 0],
    [0, 2, 0, 16],
    [0, 4, 4, 8],
    [2, 8, 64, 128]
];
```
To start off the game a startgame() function is called which sets prepares the board.

```javascript
    startGame(){
        this.append();
        this.generateRandom();
        this.generateRandom();
        this.value();
        this.addListener(); // adds event listeners to arrow keys and buttons for mobile
    }
```

append(): appends 4 buttons to the board for mobile play

generateRandom(): creates random values 2-4 and updates the board

```javascript
generateRandom() {
    this.win(); //checks to see if player won game
    function randomNumber() { // create random number
        return Math.floor(Math.random() * 4);
    }

    function randomNum2To4() { // create random numbers 2 or 4
        while (true) {
            let number = Math.floor(Math.random() * 5);
            if (number === 2 || number === 4) {
                return number;
            }
        }
    }
    while (true) { //randomly generates a number 2 or 4 where there is a 0
        let position1 = randomNumber();
        let position2 = randomNumber();
        if (this.board[position1][position2] === 0) {
            this.board[position1].splice(position2, 1, randomNum2To4());
            break;
        }
    }
    this.updateBoard(); //updates the board and makes the square have the correct coloring and style
}
```

addListener(): adds event listeners to arrow keys and buttons for mobile play.

When an arrow key or button his pressed the correct responding event listener fires off with its corrasponding movement. LEFT, RIGHT, UP, DOWN

```javascript
moveLeft() {
    var currentBoard = this.board.join(''); //creates a copy of the board with a string typing
    var move = (arr) => {
        for (let j = 0; j < arr.length; j++) { //combines all equal values
            if (arr[j] === arr[j + 1]) {
                arr[j] = arr[j] + arr[j + 1];
                arr.splice(j + 1, 1);
            }
        }
    };
    for (let i = 0; i < this.board.length; i++) {
        var newArray = this.board[i].filter((el) => {//filters out all 0 to make it more simple
                return el > 0;
        });
        move(newArray); //passes array with 0 removed to move which combine equal values
        while (newArray.length < 4) {//puts back the zeros that were removed
            newArray.push(0);
        }
        this.board[i] = newArray; //updates board with new values
    }
    this.makeableMove(currentBoard); //checks the copy of the board we made with the new board to check if there is a possible move
}
```

makeAbleMove(arr) makes all the functions calls to set the board up for the following move depending on the board state.

```javascript
    makeableMove(oldBoard){
        if(!this.checkLost()){ //checks if there are any moves possibles in all dirrections
            alert("No more moves. You Lost!");
        }else{
            oldBoard === this.board.join('') ? console.log('cant make that move'):this.generateRandom();// if there is a possible move we compare the old and current board to see if there is a possible move in that direction if there is not we console log 'cant make that move' else we restart the game cycle with another call to generateRandom().
        }
    }
```

Hope you enjoy the game 1024 I know I do : )
