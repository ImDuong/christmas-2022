var puzzleImageSrc = "../../assets/imgs/puzzle/"

var rows = 6;
var columns = 5;

var nbIncorrectTiles = rows * columns;

var currTile;
var otherTile;

var turns = 0;

window.onload = function () {
    //initialize the rows x columns board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>
            let tile = document.createElement("img");
            tile.src = puzzleImageSrc + "blank.jpg";

            // store real 2D index, starting from 1
            tile.original_piece = r * columns + c + 1

            //DRAG FUNCTIONALITY
            addEventListener(tile)

            document.getElementById("board").append(tile);
        }
    }

    //pieces: the best way to play this game is looking at the image name =))
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i); //put 1 to (rows * columns) into the array (the 2D index, starting from 1)
    }

    // shuffle the pieces
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    // initialize the randomized pieces
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let piece = pieces[r * columns + c]
            let randRow = Math.ceil(piece / columns)
            let randCol = ((piece - 1) % columns) + 1

            // console.log(piece, "->", "row:", randRow, "col:", randCol);
            let tile = document.createElement("img");
            tile.src = puzzleImageSrc + "splitted/row-" + randRow + "-column-" + randCol + ".jpg";

            // store real 2D index
            tile.temp_piece = piece

            //DRAG FUNCTIONALITY
            addEventListener(tile)

            document.getElementById("pieces").append(tile);
        }
    }
}

//DRAG TILES
function dragStart() {
    currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the image that is being dropped on
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }

    if (currTile.temp_piece == otherTile.original_piece) {
        otherTile.attached = true
        nbIncorrectTiles--
    } else if (currTile.attached && currTile.temp_piece != otherTile.original_piece) {
        currTile.attached = false
        nbIncorrectTiles++
    }
    otherTile.temp_piece = currTile.temp_piece

    isWinnable()


    // obj is not swapped, only swap the source
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 100;
    document.getElementById("turns").innerText = turns;
}

function isWinnable() {
    // console.log("Number of left over tiles:", nbIncorrectTiles);
    if (nbIncorrectTiles == 0) {
        // inform congratulations
        console.log("Victoryyyy");
        let congrats = document.getElementById("congrats");
        congrats.style.display = "flex"

        // lock all tiles in board
        let board = document.getElementById("board")
        for (let i = 0; i < board.childElementCount; i++) {
            removeEventListener(board.children[i])
        }

        // lock all ties in pieces
        let pieces = document.getElementById("pieces")
        for (let i = 0; i < pieces.childElementCount; i++) {
            removeEventListener(pieces.children[i])
        }
        return true
    }
    return false
}

function addEventListener(ele) {
    ele.addEventListener("dragstart", dragStart); //click on image to drag
    ele.addEventListener("dragover", dragOver);   //drag an image
    ele.addEventListener("dragenter", dragEnter); //dragging an image into another one
    ele.addEventListener("dragleave", dragLeave); //dragging an image away from another one
    ele.addEventListener("drop", dragDrop);       //drop an image onto another one
    ele.addEventListener("dragend", dragEnd);      //after you completed dragDrop
}

function removeEventListener(ele) {
    ele.removeEventListener("dragstart", dragStart); //click on image to drag
    ele.removeEventListener("dragover", dragOver);   //drag an image
    ele.removeEventListener("dragenter", dragEnter); //dragging an image into another one
    ele.removeEventListener("dragleave", dragLeave); //dragging an image away from another one
    ele.removeEventListener("drop", dragDrop);       //drop an image onto another one
    ele.removeEventListener("dragend", dragEnd);      //after you completed dragDrop
}