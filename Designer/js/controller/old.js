// Controler


function mode(btn) {
    //console.log("works");
    //console.log(btn);
    if (btn.innerText == "╳") {
        btn.innerText = "⬛";
        //console.log("also");
    }
    else if (btn.innerText == "⬛") {
        btn.innerText = "╳";
    }
}
//Denne koden fyller ruter med enten x eller [] avhengig av knappens tilstand. 
//Den logger også om ruten er "filled" eller "empty" til objektet i model.js
function fill(square, smallLevels) {

    let ps = square.id;
    let myButton = document.getElementById("fillBtn");

    if (myButton.innerText == "╳" && square.style.color == "white" || myButton.innerText == "╳" && square.style.color == '') {
        square.style.color = "black";
        //console.log(ps);

        activePuzzle.grid[ps].state = "filledx";
        activePuzzle.grid[ps].correct = false;

        //console.log(levelObj.levels[0].level1.puzzles[0].grid[0][ps].state);
        //console.log("1");
    }
    else if (myButton.innerText == "╳" && square.style.color == "black") {
        square.style.color = "white";
        activePuzzle.grid[ps].correct = false;
        activePuzzle.grid[ps].state = "empty";

        //console.log(levelObj.levels[0].level1.puzzles[0].grid[0][ps].state);

        //console.log("2");
    }

    else if (myButton.innerText == "⬛" && square.style.backgroundColor == '' || myButton.innerText == "⬛" && square.style.backgroundColor == "white") {
        square.style.backgroundColor = "gray";
        square.style.color = "gray";
        //console.log("yeah");

        activePuzzle.grid[ps].state = "filled";
        activePuzzle.grid[ps].correct = true;


        //console.log(levelObj.levels[0].level1.puzzles[0].grid[0][ps].state);
    }
    else if (myButton.innerText == "⬛" && square.style.backgroundColor == "gray") {
        square.style.backgroundColor = "white";
        square.style.color = "white";
        //console.log("see?");
        activePuzzle.grid[ps].correct = false;
        activePuzzle.grid[ps].state = "empty";
        //console.log(levelObj.levels[0].level1.puzzles[0].grid[0][ps].state);
    }
    //evaluate(square);
}
//Denne koden henter id til rutene langs toppen og på venstre side, slik at jeg kan behandle de separat
//utdatert?
function edge() {
    let place;
    let places;
    for (box in row) {
        place = row[box];
        places = document.getElementById(place);
        rowEdge.push(places);
    }
    for (box in column) {
        place = column[box];
        places = document.getElementById(place);
        columnEdge.push(places);
        //console.log(document.getElementById(place));
    }
}


//utdatert
function distinct() {
    for (rute in rowEdge) {

    }
}

function evaluate(square) {
    let sqrId = square.id;
    let correct;
    possiblePoints = count();
    //console.log(square.id);
    //console.log("here!");

    if (activePuzzle.grid[sqrId].state == "filled" && activePuzzle.grid[sqrId].correct == true) {
        //console.log("true");
        correct = "true";
        points++;
    }
    else if (activePuzzle.grid[sqrId].state == "filled" && activePuzzle.grid[sqrId].correct == false) {
        correct = "false";
        square.style.backgroundColorolor = "red";
        square.style.color = "red";
        const tick = setTimeout(emptyOut, 1000, square);

    }
    else if (activePuzzle.grid[sqrId].state == "filledx" && activePuzzle.grid[sqrId].correct == false) {
        correct = "true";
        //console.log("uh?");
    }
    else if (activePuzzle.grid[sqrId].state == "filledx" && activePuzzle.grid[sqrId].correct == true) {
        correct = "false";
        square.style.color = "red";
        const tickx = setTimeout(emptyOutx, 1000, square);



        //console.log("uh?");
    }


    //console.log(correct);
    if (correct == "false" && lives > 0) {
        lives = lives - 1;
        document.getElementById("life").innerHTML = "Lives:" + ' ' + lives;
    }

    if (possiblePoints == points) {
        setTimeout(function () { alert("win"); }, 500);
        setTimeout(function () {
            if (level == "small") {
                A++;
                if (levelObj.levels.level1.puzzles[A] != undefined) {
                    updateViewSmall();
                    points = 0;
                }
                else { alert("no more levels"); }

            }
            else if (level == "medium") {
                B++;
                if (levelObj.levels.level1.puzzles[B] != undefined) {
                    updateViewMedium();
                    points = 0;
                }
                else { alert("no more levels"); }
            }
            else if (level == "Large") {
                C++;
                if (levelObj.levels.level1.puzzles[C] != undefined) {
                    updateViewLarge();
                    points = 0;
                }
                else { alert("no more levels"); }
            }
            else if (level == "XL") {
                D++;
                if (levelObj.levels.level1.puzzles[C] != undefined) {
                    updateViewXL();
                    points = 0;
                }
                else { alert("no more levels"); }
            }
        }, 2000)
    }
    if (lives == 0) {
        setTimeout(function () { alert("you lost!"); }, 500);
        if (level == "small") {
            lives = 5;
            updateViewSmall();
        }
        else if (level == "medium") {
            lives = 5;
            updateViewMedium();

        }
        else if (level == "Large") {
            lives = 5;
            updateViewLarge();
        }
        else if (level == "XL") {
            lives = 5;
            updateViewXL();
        }


    }

}

function emptyOut(square) {
    square.style.backgroundColor = "white";
    square.style.color = "white";
}
function emptyOutx(square) {
    square.style.color = "white";
}

//skal telle antall korrekte ruter på en puzzle
function count() {
    let rows = activePuzzle.rows;
    let count = 0;
    for (num in rows) {
        let place = rows[num];
        //console.log(place);
        for (int in place) {
            let nr = place[int];
           // console.log(nr);
            count += nr;

        }
    } return count;
}



function placeEdgeNr(puzzle) {
    genTrueFalseArr(puzzle);
    genTrueFalseArrCol(puzzle);
}

let row1 = [];
let row2 = [];
let row3 = [];
let row4 = [];
let row5 = [];
let row6 = [];
let row7 = [];
let row8 = [];
let row9 = [];
let row10 = [];
let row11 = [];
let row12 = [];
let row13 = [];
let row14 = [];
let row15 = [];
let column1 = [];
let column2 = [];
let column3 = [];
let column4 = [];
let column5 = [];
let column6 = [];
let column7 = [];
let column8 = [];
let column9 = [];
let column10 = [];
let column11 = [];
let column12 = [];
let column13 = [];
let column14 = [];
let column15 = [];
let pass;
//let myRow;
function genTrueFalseArr(puzzle) {
    //console.log(puzzle.size);
    for (let j = 1; j <= puzzle.size; j++) {
        //myRow = row+j   
        for (let i = 1; i <= puzzle.size; i++) {
            pass = "x" + i + "y" + j;
            if (j == 1) {
                row1.push(puzzle.grid[pass].correct);
            }

            if (j == 2) {
                row2.push(puzzle.grid[pass].correct);
            }
            if (j == 3) {
                row3.push(puzzle.grid[pass].correct);
            }
            if (j == 4) {
                row4.push(puzzle.grid[pass].correct);
            }
            if (j == 5) {
                row5.push(puzzle.grid[pass].correct);
            }
            if (j == 6) {
                row6.push(puzzle.grid[pass].correct);
            }
            if (j == 7) {
                row7.push(puzzle.grid[pass].correct);
            }
            if (j == 8) {
                row8.push(puzzle.grid[pass].correct);
            }
            if (j == 9) {
                row9.push(puzzle.grid[pass].correct);
            }
            if (j == 10) {
                row10.push(puzzle.grid[pass].correct);
            }
            if (j == 11) {
                row11.push(puzzle.grid[pass].correct);
            }
            if (j == 12) {
                row12.push(puzzle.grid[pass].correct);
            }
            if (j == 13) {
                row13.push(puzzle.grid[pass].correct);
            }
            if (j == 14) {
                row14.push(puzzle.grid[pass].correct);
            }
            if (j == 15) {
                row15.push(puzzle.grid[pass].correct);
            }

        }
    }
    //console.log(row1, row2, row3, row4, row5);
    /*let myRow;
    for(let i = 1; i<6; i++){
    myRow = "row" + i;
    console.log(myRow);
    getNumbers(myRow);
    }*/
    getNumbers(row1, puzzle);
    getNumbers(row2, puzzle);
    getNumbers(row3, puzzle);
    getNumbers(row4, puzzle);
    getNumbers(row5, puzzle);
    getNumbers(row6, puzzle);
    getNumbers(row7, puzzle);
    getNumbers(row8, puzzle);
    getNumbers(row9, puzzle);
    getNumbers(row10, puzzle);
    getNumbers(row11, puzzle);
    getNumbers(row12, puzzle);
    getNumbers(row13, puzzle);
    getNumbers(row14, puzzle);
    getNumbers(row15, puzzle);
    placeNumbers(puzzle);
    //getNumbers(row1, row2, row3, row4, row5);
}


function genTrueFalseArrCol(puzzle) {
    for (let j = 1; j <= puzzle.size; j++) {
        //myRow = row+j   
        for (let i = 1; i <= puzzle.size; i++) {
            pass = "x" + i + "y" + j;
            if (i == 1) {
                column1.push(puzzle.grid[pass].correct);
            }

            if (i == 2) {
                column2.push(puzzle.grid[pass].correct);
            }
            if (i == 3) {
                column3.push(puzzle.grid[pass].correct);
            }
            if (i == 4) {
                column4.push(puzzle.grid[pass].correct);
            }
            if (i == 5) {
                column5.push(puzzle.grid[pass].correct);
            }
            if (i == 6) {
                column6.push(puzzle.grid[pass].correct);
            }
            if (i == 7) {
                column7.push(puzzle.grid[pass].correct);
            }
            if (i == 8) {
                column8.push(puzzle.grid[pass].correct);
            }
            if (i == 9) {
                column9.push(puzzle.grid[pass].correct);
            }
            if (i == 10) {
                column10.push(puzzle.grid[pass].correct);
            }
            if (i == 11) {
                column11.push(puzzle.grid[pass].correct);
            }
            if (i == 12) {
                column12.push(puzzle.grid[pass].correct);
            }
            if (i == 13) {
                column13.push(puzzle.grid[pass].correct);
            }
            if (i == 14) {
                column14.push(puzzle.grid[pass].correct);
            }
            if (i == 15) {
                column15.push(puzzle.grid[pass].correct);
            }

        }
    }
  //  console.log(column1, column2, column3, column4, column5);
    /*let myRow;
    for(let i = 1; i<6; i++){
    myRow = "row" + i;
    console.log(myRow);
    getNumbers(myRow);
    }*/

    getNumbersCol(puzzle);

    //placeNumbersCol();
    //getNumbers(row1, row2, row3, row4, row5);*/
}

let results1 = []
let results2 = []
let results3 = []
let results4 = []
let results5 = []
let results6 = []
let results7 = []
let results8 = []
let results9 = []
let results10 = []
let results11 = []
let results12 = []
let results13 = []
let results14 = []
let results15 = []
let counter = 0;
let resultN = [];
let n = 1;
function getNumbers(row, puzzle) {
    if (row == row1) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results1.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results1.push(counter);
        }
        counter = 0;
        //console.log(results1);
    }
    //-------------------------
    else if (row == row2) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results2.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results2.push(counter);
        }
        counter = 0;
        //console.log(results2);
    }
    //-----------------------------
    else if (row == row3) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results3.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results3.push(counter);
        }
        counter = 0;
       // console.log(results3);
    }
    //------------------------------------
    else if (row == row4) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results4.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results4.push(counter);
        }
        counter = 0;
      //  console.log(results4);
    }
    //-------------------------------------------
    else if (row == row5) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results5.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results5.push(counter);
        }
        counter = 0;
        //console.log(results5);
    }
    //--------------------------------------
    else if (row == row6) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results6.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results6.push(counter);
        }
        counter = 0;
        //console.log(results6);
    }
    //--------------------------------------
    else if (row == row7) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results7.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results7.push(counter);
        }
        counter = 0;
        //console.log(results7);
    }
    //--------------------------------------
    else if (row == row8) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results8.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results8.push(counter);
        }
        counter = 0;
        //console.log(results8);
    }
    //--------------------------------------
    else if (row == row9) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results9.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results9.push(counter);
        }
        counter = 0;
        //console.log(results9);
    }
    //--------------------------------------
    else if (row == row10) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results10.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results10.push(counter);
        }
        counter = 0;
        //console.log(results10);
    }
    //--------------------------------------
    else if (row == row11) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results11.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results11.push(counter);
        }
        counter = 0;
        //console.log(results11);
    }
    //--------------------------------------
    else if (row == row12) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results12.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results12.push(counter);
        }
        counter = 0;
       // console.log(results12);
    }
    //--------------------------------------
    else if (row == row13) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results13.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results13.push(counter);
        }
        counter = 0;
        //console.log(results13);
    }
    //--------------------------------------
    else if (row == row14) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results14.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results14.push(counter);
        }
        counter = 0;
        //console.log(results14);
    }
    //--------------------------------------
    else if (row == row15) {
        for (let i = 0; i < row.length; i++) {
            if (row[i]) {
                counter++;
            }
            else {
                if (counter !== 0) {
                    results15.push(counter);
                    counter = 0;
                }
            }
        }
        if (counter !== 0) {
            results15.push(counter);
        }
        counter = 0;
        //console.log(results15);
    }
    //----------------------------------------
    resultN[0] = results1;
    resultN[1] = results2;
    resultN[2] = results3;
    resultN[3] = results4;
    resultN[4] = results5;
    resultN[5] = results6;
    resultN[6] = results7;
    resultN[7] = results8;
    resultN[8] = results9;
    resultN[9] = results10;
    resultN[10] = results11;
    resultN[11] = results12;
    resultN[12] = results13;
    resultN[13] = results14;
    resultN[14] = results15;

}
let colresults1 = []
let colresults2 = []
let colresults3 = []
let colresults4 = []
let colresults5 = []
let colresults6 = []
let colresults7 = []
let colresults8 = []
let colresults9 = []
let colresults10 = []
let colresults11 = []
let colresults12 = []
let colresults13 = []
let colresults14 = []
let colresults15 = []
let colcounter = 0;
let colresultN = [];
let coln = 1;
let funcArray = [getNumbersCol1, getNumbersCol2, getNumbersCol3, getNumbersCol4, getNumbersCol5, getNumbersCol6, getNumbersCol7, getNumbersCol8, getNumbersCol9, getNumbersCol10, getNumbersCol11, getNumbersCol12, getNumbersCol13, getNumbersCol14, getNumbersCol15];
function getNumbersCol(puzzle) {
    for (funs in funcArray) {
        funcArray[funs]();
    }
    placeNumbersCol(puzzle);
}

function getNumbersCol1() {

    for (let i = 0; i < column1.length; i++) {
        if (column1[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults1.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults1.push(colcounter);
    }
    colcounter = 0;
    console.log(colresults1);
    colresultN[0] = colresults1;
}
function getNumbersCol2() {
    for (let i = 0; i < column2.length; i++) {
        if (column2[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults2.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults2.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults2);
    colresultN[1] = colresults2;
}

function getNumbersCol3() {

    for (let i = 0; i < column3.length; i++) {
        if (column3[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults3.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults3.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults3);
    colresultN[2] = colresults3;
}

function getNumbersCol4() {

    for (let i = 0; i < column4.length; i++) {
        if (column4[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults4.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults4.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults4);
    colresultN[3] = colresults4;
}

function getNumbersCol5() {

    for (let i = 0; i < column5.length; i++) {
        if (column5[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults5.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults5.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults5);
    colresultN[4] = colresults5;
}

//--------------------------------------------    
function getNumbersCol6() {

    for (let i = 0; i < column6.length; i++) {
        if (column6[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults6.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults6.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults6);
    colresultN[5] = colresults6;
}
//------------------------------------------------
function getNumbersCol7() {

    for (let i = 0; i < column7.length; i++) {
        if (column7[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults7.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults7.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults7);
    colresultN[6] = colresults7;
}
//------------------------------------------------
function getNumbersCol8() {

    for (let i = 0; i < column8.length; i++) {
        if (column8[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults8.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults8.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults8);
    colresultN[7] = colresults8;
}
//------------------------------------------------
function getNumbersCol9() {

    for (let i = 0; i < column9.length; i++) {
        if (column9[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults9.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults9.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults9);
    colresultN[8] = colresults9;
}
//------------------------------------------------
function getNumbersCol10() {

    for (let i = 0; i < column10.length; i++) {
        if (column10[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults10.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults10.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults10);
    colresultN[9] = colresults10;
}
//------------------------------------------------
function getNumbersCol11() {

    for (let i = 0; i < column11.length; i++) {
        if (column11[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults11.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults11.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults11);
    colresultN[10] = colresults11;
}
//------------------------------------------------
function getNumbersCol12() {

    for (let i = 0; i < column12.length; i++) {
        if (column12[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults12.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults12.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults12);
    colresultN[11] = colresults12;
}
//------------------------------------------------
function getNumbersCol13() {

    for (let i = 0; i < column13.length; i++) {
        if (column13[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults13.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults13.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults13);
    colresultN[12] = colresults13;
}
//------------------------------------------------
function getNumbersCol14() {

    for (let i = 0; i < column14.length; i++) {
        if (column14[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults14.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults14.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults5);
    colresultN[13] = colresults14;
}
//------------------------------------------------
function getNumbersCol15() {

    for (let i = 0; i < column15.length; i++) {
        if (column15[i]) {
            colcounter++;
        }
        else {
            if (colcounter !== 0) {
                colresults15.push(colcounter);
                colcounter = 0;
            }
        }
    }
    if (colcounter !== 0) {
        colresults15.push(colcounter);
    }
    colcounter = 0;
    //console.log(colresults15);
    colresultN[14] = colresults15;
}
//------------------------------------------------

let columnId;
let rowId;
let cellId
function placeNumbers(puzzle) {
    let currentClass = "columnEdgex" + puzzle.size;
    for (let i = 0; i < puzzle.size; i++) {
       // console.log(resultN[i]);
        
            activePuzzle.rows[i] = resultN[i]; 
    

    }
    for (let i = 1; i <= puzzle.size; i++) {

        columnId = "x0" + "y" + i;
        cellId = columnId + "z" + i;
        document.getElementById(columnId).innerHTML = `<div id=${cellId} class=${currentClass}></div>`;
        for (nums in resultN[i - 1]) {
            //console.log(resultN[i - 1][nums]);
            document.getElementById(cellId).innerHTML += `<p>${resultN[i - 1][nums]}</p>`;
        }
    }//console.log(levelObj.levels.level1.puzzles[A].rows);
}
/*function placeNumbersCol(){
//let rowId;
//let cellId;
 
for (let i = 1; i <= 5; i++) {
    rowId = "x" + i + "y0";
    cellId = rowId + i;
    console.log(rowId);
    document.getElementById(rowId).innerHTML = `<div id=${cellId} class="rowEdgex5"></div>`;

    for (let i = 1; i <= 5; i++) {
        columnId = "x0" + "y" + i;
        cellId = columnId + i;
        document.getElementById(columnId).innerHTML = `<div id=${cellId} class="columnEdgex5"></div>`;
        for (nums in resultN[i-1]) {
            console.log(resultN[i - 1][nums]);
            document.getElementById(cellId).innerHTML += `<p>${colresultN[i - 1][nums]}</p>`;
        }
    }

}
}*/

function placeNumbersCol(puzzle) {
    let rowId;
    let cellId;
    let currentClass = "rowEdgex" + puzzle.size;
    for (let i = 0; i < puzzle.size; i++) {
        console.log(colresultN[i]);
        
            //levelObj.levels.level1.puzzles[A].columns[i] = colresultN[i]; 
            activePuzzle.columns[i] = colresultN[i]; 
        

    }
    for (let i = 1; i <= puzzle.size; i++) {
        rowId = "x" + i + "y0";
        cellId = rowId + "z" + i;
        console.log(rowId);
        document.getElementById(rowId).innerHTML = `<div id=${cellId} class=${currentClass}></div>`;
        for (nums in colresultN[i - 1]) {
            console.log(colresultN[i - 1][nums]);
            document.getElementById(cellId).innerHTML += `<p>${colresultN[i - 1][nums]}</p>`;
        }

    }
    console.log(levelObj.levels.level1.puzzles[A].columns);
    console.log(activePuzzle);
}

function getEdge(x, y) {
    let leftArr = [];
    let topArr = [];
    console.log(x, y);
    if (x == "x0") {
        console.log(x, y);
        leftArr.push(x, y);
        console.log(leftArr);
        let myKey = x + y;
        console.log(myKey);
        document.getElementById(myKey).classList.add("leftColumn");

    }
    if (y == "y0" && x != "x0") {
        let otherKey = x + y;
        document.getElementById(otherKey).classList.add("topRow");
    }
}
function converter(example){
    let i = 0;
    Object.keys(example).forEach(key => { 
        //console.log(key, example[key])
        converted.length = i+1;
        converted[i] = [key];
       
        Object.values(example).forEach(val => { console.log(val.state)});
        let stateBit; 
        switch(example[key].state){
            case "empty":
                stateBit = 0;
                break;
            case "filled":
                stateBit = 1;
                break;
            case "filledx":
                stateBit = 2;
                break
        }
        converted[i][1]= stateBit;
        Object.values(example).forEach(val => { console.log(val.correct)}); 
        let correctBit;
        switch(example[key].correct){
            case true:
                correctBit = 1;
                break;
            case false:
                correctBit = 0;
                break;
        }
        converted[i][2] = correctBit;
        
        i++;
    });  
    console.log(converted)   
}
function downloadNonogram(grid) {
    converter(grid);
    let jsonString = JSON.stringify(grid);
    let blob = new Blob([jsonString], { type: "application/json" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = url;
    a.download = 'nonogram.json';
    a.click();
}
function downloadNumbers(row, column) {
    downloadNumbersCol(column);
    let jsonString = JSON.stringify(row);
    let blob = new Blob([jsonString], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'nonogramNrsRow.json';
    a.click();
}
function downloadNumbersCol(column) {
    let jsonString = JSON.stringify(column);
    let blob = new Blob([jsonString], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'nonogramNrsCol.json';
    a.click();
}
