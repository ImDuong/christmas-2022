var puzzleImageSrc = "../../assets/imgs/puzzle/"

var rows = 6;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

window.onload = function () {
    //initialize the 5x5 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>
            let tile = document.createElement("img");
            tile.src = puzzleImageSrc + "blank.jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

            document.getElementById("board").append(tile);
        }
    }

    //pieces: the best way to play this game is looking at the image name =))
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i); //put 1 to 30 into the array (the 2D index)
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let piece = pieces[r * columns + c]
            let randRow = Math.ceil(piece / columns)
            let randCol = ((piece - 1) % columns) + 1
            
            console.log(piece, "->", "row:", randRow, "col:", randCol);
            let tile = document.createElement("img");
            tile.src = puzzleImageSrc + "splitted/row-" + randRow + "-column-" + randCol + ".jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

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
    otherTile = this; //this refers to image that is being dropped on
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 100;
    document.getElementById("turns").innerText = turns;
}