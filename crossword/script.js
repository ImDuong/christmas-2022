// import { config } from './config.js';
// var totalClues = config.totalClues;

//Globals
var currentTextInput;
var puzzleArrayData;
//Loads the Crossword
function initializeScreen(){
    var puzzleTable = document.getElementById("puzzle");
    puzzleArrayData = preparePuzzleArray();
    for ( var i = 0; i < puzzleArrayData.length ; i++ ) {
        var row = puzzleTable.insertRow(-1);
        var rowData = puzzleArrayData[i];
        for(var j = 0 ; j < rowData.length ; j++){
            var cell = row.insertCell(-1);
            if(rowData[j] != 0){
                var txtID = String('txt' + '_' + i + '_' + j);
                cell.innerHTML = '<input type="text" class="inputBox" maxlength="1" style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
            }else{
                cell.style.backgroundColor  = "black";
            }
        }
    }
    addHint();
}
//Adds the hint numbers
function addHint(){
    document.getElementById("txt_0_0").placeholder = "1";
    document.getElementById("txt_1_0").placeholder = "2";
    document.getElementById("txt_2_0").placeholder = "3";
    document.getElementById("txt_3_0").placeholder = "4";
    // document.getElementById("txt_0_0").placeholder = "5";
    // document.getElementById("txt_9_0").placeholder = "6";
}
//Stores ID of the selected cell into currentTextInput
function textInputFocus(txtID123){
    currentTextInput = txtID123;
}
//Returns Array
function preparePuzzleArray(){
// var items = [	[0, 0, 0, 0, 'p', 0, 0, 0, 0, 0],
// 				[0, 0, 0, 0, 'u', 0, 0, 0, 0, 0 ],
// 				[0, 0, 0, 0, 'n', 0, 'b', 0, 0, 0],
// 				[0, 'h', 'y', 'd', 'e', 'r', 'a', 'b', 'a', 'd'],
// 				[0, 0, 0, 0, 0, 0, 'n', 0, 0, 'e'],
// 				[0, 0, 0, 0, 0, 0, 'g', 0, 0, 'l'],
// 				[0, 0, 'm', 'u', 'm', 'b', 'a', 'i', 0, 'h'],
// 				[0, 0, 0, 0, 0, 0, 'l', 0, 0, 'i'],
// 				[0, 0, 0, 0, 0, 0, 'o', 0, 0, 0],
// 				['k', 'a', 's', 'h', 'm', 'i','r', 0, 0, 0],
// 				[0, 0, 0, 0, 0, 0, 'e', 0, 0, 0]
// 			];
    var data = {
        across: {
            1: {
                clue: 'A sour fruit.',
                answer: 'LEMON',
                row: 0,
                col: 0,
            },
            2: {
                clue: 'A type of gemstone.',
                answer: 'OPAL',
                row: 1,
                col: 0,
            },
            3: {
                clue: 'A type of clothing.',
                answer: 'VEST',
                row: 2,
                col: 0,
            },
            4: {
                clue: 'A type of fish.',
                answer: 'EEL',
                row: 3,
                col: 0,
            },
        },
        down: {
            1: {
                clue: 'A strong affection.',
                answer: 'LOVE',
                row: 0,
                col: 0,
            },
        },
    };

    var items = [];
    for (var i = 0; i < 4; i++) {
        items[i] = [];
        for (var j = 0; j < 5; j++) {
            items[i][j] = 0;
        }
    }

    for (var key in data.across) {
        var word = data.across[key];
        for (var i = 0; i < word.answer.length; i++) {
            items[word.row][word.col + i] = word.answer[i];
        }
    }

    for (var key in data.down) {
        var word = data.down[key];
        for (var i = 0; i < word.answer.length; i++) {
            items[word.row + i][word.col] = word.answer[i];
        }
    }

    console.log(items);





    // var items = [
    //     ['l','e','m','o','n'],
    //     ['o','p','a','l',0],
    //     ['v','e','s','t',0],
    //     ['e','e','l',0,0]
    // ];

    return items;
}
//Clear All Button
function clearAllClicked(){
    currentTextInput = '';
    var puzzleTable = document.getElementById("puzzle");
    puzzleTable.innerHTML = '';
    initializeScreen();
}
//Check button
function checkClicked(){
    for ( var i = 0; i < puzzleArrayData.length ; i++ ) {
        var rowData = puzzleArrayData[i];
        for(var j = 0 ; j < rowData.length ; j++){
            if(rowData[j] != 0){
                var selectedInputTextElement = document.getElementById('txt' + '_' + i + '_' + j);
                if(selectedInputTextElement.value != puzzleArrayData[i][j]){
                    selectedInputTextElement.style.backgroundColor = 'red';
                    
                }else{
                    selectedInputTextElement.style.backgroundColor = 'white';
                }
            }
        }
    }
}
//Clue Button
// Initialize the number of clues
var totalClues = 5;
var usedClues = 0;

// Update the button text with the number of remaining clues
function updateClueButton() {
    var remainingClues = totalClues - usedClues;
    var clueButton = document.getElementById("clueButton");
    // Change the value of the "Clue" button
    clueButton.value = "Clue(" + remainingClues + ")";
}

function clueClicked(){
    if (currentTextInput != null){
        var temp1 = currentTextInput;
        var token = temp1.split("_");
        var row = token[1];
        var column = token[2];
        var selectedInput = document.getElementById(temp1);
        
        // Check if the selected square has a placeholder
        if (selectedInput.placeholder == "") {
            if (usedClues < totalClues) {
                selectedInput.value = puzzleArrayData[row][column];
                usedClues++;
                updateClueButton();
            } else {
                alert("No more clues left!");
            }
        } else {
            alert("You cannot use a clue on this square!");
        }
    }
}

//Solve Button
function solveClicked(){
    if (currentTextInput != null){
        var temp1 = currentTextInput;
        var token = temp1.split("_");
        var row = token[1];
        var column = token[2];
        
        // Print elements on top
        for(j = row; j >= 0; j--){
            if(puzzleArrayData[j][column] != 0){
                document.getElementById('txt' + '_' + j + '_' + column).value = puzzleArrayData[j][column];
                }else break;
        }
        // Print elements on right
        for(i = column; i< puzzleArrayData[row].length; i++){
            if(puzzleArrayData[row][i] != 0){
                document.getElementById('txt' + '_' + row + '_' + i).value = puzzleArrayData[row][i];
                }else break;
        }
        
        // Print elements below
        for(m = row; m< puzzleArrayData.length; m++){
            if(puzzleArrayData[m][column] != 0){
                document.getElementById('txt' + '_' + m + '_' + column).value = puzzleArrayData[m][column];
                }else break;
        }
        // Print elements on left
        for(k = column; k >= 0; k--){
            if(puzzleArrayData[row][k] != 0){
                document.getElementById('txt' + '_' + row + '_' + k).value = puzzleArrayData[row][k];
                }else break;
        }
        // Done!
        
    }
}