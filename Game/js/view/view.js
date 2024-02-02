// View1
updateViewStart();
function updateViewStart() {
    activePuzzle = undefined;
    html = /*HTML*/ `
    <h1 id="welcome">Velkommen til Nonogram!</h1>
    <h2>Velg type brett:</h2>
    <table id="container">
    
    <tr>
    <th onclick="updateViewSmall()"><h3>spill 3x3</h3></th>
    <td>
    <div>
    <table id="t3"></table>
    </div>
    </td>
    
    <th onclick="updateViewMedium()"><h3>spill 5x5</h3></th>
    
    <td><div>
    <table id="t5"></table>
    </div></td></tr>
    
    <tr>
    <th onclick="updateViewLarge()"><h3>spill 10x10</h3></th>
    <td><div>
    <table id="t10"></table>
    </div></td>
    
    <th onclick="updateViewXL()"><h3>spill 15x15</h3></th>
    
    <td><div>
    <table id="t15"></table>
    </div></td>
    </tr>
    </table>
    `;
    app.innerHTML = html;
    document.getElementById("t3").innerHTML +=`<tr><img height="350px" width="350px" src="./img/nonogram3x3.png" /></tr>`;
    document.getElementById("t5").innerHTML +=`<tr><img height="350px" width="350px" src="./img/nonogram5x5.png" /></tr>`;
    document.getElementById("t10").innerHTML +=`<tr><img height="350px" width="350px" src="./img/nonogram10x10.png" /></tr>`;
    document.getElementById("t15").innerHTML += `<tr><img height="350px" width="350px" src="./img/nonogram15x15.png" /></tr>`;
}


//view2
//updateViewSmall();
async function updateViewSmall() {
    level = "small";
    activePuzzle = await fetchJSON('/Game/js/model/testBoard1.json', A);
    activeGame = games.level1;
    console.log(activePuzzle);
    html = /*html*/ `
    <div id="small" class="board">
    <h1 class="level">Level ${activePuzzle.id}</h1>
    <h2 id="life" class="level">Lives: ${lives}</h2>
    <button id="homeBtn" onclick="updateViewStart()"><=HOME</button>
    <table id="x3"></table>
    <button id="fillBtn" class="btn" onclick="mode(this)">╳</button>
    </div>
    `;
    app.innerHTML = html;
    row.length = 0;
    column.length = 0;
    let ps;
    let psp;
    for (let j = 0; j < 4; j++) {
        ps = "y" + j;
        column.push("x" + "0" + ps);
        document.getElementById("x3").innerHTML +=
            `<tr id=${ps}></tr>`;
        for (let k = 0; k < 4; k++) {
            psp = "x" + k;
            if (row.length <= 3) {
                row.push(psp + "y" + "0");
            }
            if (j == 0 || k == 0) {
                if (j == 0 && k == 0) {
                    document.getElementById(ps).innerHTML += `<td id=${psp}${ps} class="infoSquares"></td>`;
                }
                else {
                    document.getElementById(ps).innerHTML += `<td id=${psp}${ps} class="infoSquares"><span class="spanx3">╳</span></td>`;
                }
            }
            else if (j != 0 && k != 0) {
                if (activePuzzle.grid[j - 1][k - 1] == 2) {
                    console.log("X");
                    document.getElementById(ps).innerHTML += `
            
                        <td id=${psp}${ps} style="color: black;" class="squares"><span class="spanx3">╳</span></td>`;
                }
                else {
                    document.getElementById(ps).innerHTML += `
             <td id=${psp}${ps} class="squares" onclick="fill(this, [${k},${j}])"><span class="spanx3">╳</span></td>
             `;
                }

            }
        }
    }
    let rowId;
    let cellId;
    for (let i = 1; i <= 3; i++) {
        rowId = "x" + i + "y0";
        cellId = rowId + i;
        //console.log(rowId);
        document.getElementById(rowId).innerHTML = `<div id=${cellId} class="rowEdgex3"></div>`;

        for (nums in activePuzzle.columns[i - 1]) {
            //console.log(activePuzzle.columns[i - 1][nums]);
            document.getElementById(cellId).innerHTML += `<p>${activePuzzle.columns[i - 1][nums]}</p>`;
        }

    }


    let columnId;
    for (let i = 1; i <= 3; i++) {
        columnId = "x0" + "y" + i;
        cellId = columnId + i;
        document.getElementById(columnId).innerHTML = `<div id=${cellId} class="columnEdgex3"></div>`;
        for (nums in activePuzzle.rows[i - 1]) {
            //console.log(activePuzzle.rows[i - 1][nums]);
            document.getElementById(cellId).innerHTML += `<p>${activePuzzle.rows[i - 1][nums]}</p>`;
        }
    }theLines(activePuzzle);
}

//View3
//updateViewMedium();
async function updateViewMedium() {
    activePuzzle = await fetchJSON('/Game/js/model/testBoard2.json', B);
    activeGame = games.level2;
    level = "medium";
    html = /*html*/ `
    <div id="medium" class="board">
    <h1 class="level">level ${activePuzzle.id}</h1>
    <h2 id="life" class="level">Lives: ${lives}</h2>
    <button id="homeBtn" onclick="updateViewStart()"><=HOME</button>

    <table id="x5"></table>
    <button id="fillBtn" class="btn" onclick="mode(this)">╳</button>

    </div>
    `;
    app.innerHTML = html;
    row.length = 0;
    column.length = 0;
    let ps;
    let psp;
    for (let j = 0; j < 6; j++) {
        ps = "y" + j;
        column.push("x" + "0" + ps);
        document.getElementById("x5").innerHTML +=
            `<tr id=${ps}></tr>`;
        for (let k = 0; k < 6; k++) {
            psp = "x" + k;
            if (row.length <= 5) {
                row.push(psp + "y" + "0");
            }
            if (j == 0 || k == 0) {
                if (j == 0 && k == 0) {
                    document.getElementById(ps).innerHTML += `<td id=${psp}${ps} class="infoSquares"></td>`;
                }
                else {
                    document.getElementById(ps).innerHTML += `<td id=${psp}${ps} class="infoSquares"><span class="spanx5">╳</span></td>`;
                }
            }
            else if (j != 0 && k != 0) {
                if (activePuzzle.grid[j - 1][k - 1] == 2) {
                    console.log("X");
                    document.getElementById(ps).innerHTML += `
            
                        <td id=${psp}${ps} style="color: black;" class="squares"><span class="spanx5">╳</span></td>`;
                }
                else {
                    document.getElementById(ps).innerHTML += `
             <td id=${psp}${ps} class="squares" onclick="fill(this, [${k},${j}])"><span class="spanx5">╳</span></td>
             `;
                }

            }
        }
    }
    let rowId;
    let cellId;
    for (let i = 1; i <= 5; i++) {
        rowId = "x" + i + "y0";
        cellId = rowId + i;
        console.log(rowId);
        document.getElementById(rowId).innerHTML = `<div id=${cellId} class="rowEdgex5"></div>`;
        for (nums in activePuzzle.columns[i - 1]) {
            console.log(activePuzzle.columns[i - 1][nums]);
            document.getElementById(cellId).innerHTML += `<p>${activePuzzle.columns[i - 1][nums]}</p>`;
        }
    }
    let columnId;
    for (let i = 1; i <= 5; i++) {
        columnId = "x0" + "y" + i;
        cellId = columnId + i;
        document.getElementById(columnId).innerHTML = `<div id=${cellId} class="columnEdgex5"></div>`;
        for (nums in activePuzzle.rows[i - 1]) {
            console.log(activePuzzle.rows[i - 1][nums]);
            document.getElementById(cellId).innerHTML += `<p>${activePuzzle.rows[i - 1][nums]}</p>`;
        }
    }theLines(activePuzzle);
}

//View4
//updateViewLarge();
async function updateViewLarge() {
    activePuzzle = await fetchJSON('/Game/js/model/testBoard3.json', C);
    activeGame = games.level3;
    level = "Large";
    html = /*html*/ `
    <div id="large" class="board">
    <h1 class="level">level ${activePuzzle.id}</h1>
    <h2 id="life" class="level">Lives: ${lives}</h2>
    <button id="homeBtn" onclick="updateViewStart()"><=HOME</button>
    <table id="x10"></table>
    <button id="fillBtn" class="btn" onclick="mode(this)">╳</button>
    </div>
    `;
    app.innerHTML = html;
    row.length = 0;
    column.length = 0;
    let ps;
    let psp;
    for (let j = 0; j < 11; j++) {
        ps = "y" + j;
        column.push("x" + "0" + ps);
        document.getElementById("x10").innerHTML +=
            `<tr id=${ps}></tr>`;
        for (let k = 0; k < 11; k++) {
            psp = "x" + k;
            if (row.length <= 10) {
                row.push(psp + "y" + "0");
            }
            if (j == 0 || k == 0) {
                if (j == 0 && k == 0) {
                    document.getElementById(ps).innerHTML += `<td id=${psp}${ps} class="infoSquares"></td>`;
                }
                else {
                    document.getElementById(ps).innerHTML += `<td id=${psp}${ps} class="infoSquares"><span class="spanx10">╳</span></td>`;
                }
            }
            else if (j != 0 && k != 0) {
                if (activePuzzle.grid[j - 1][k - 1] == 2) {
                    console.log("X");
                    document.getElementById(ps).innerHTML += `
            
                        <td id=${psp}${ps} style="color: black;" class="squares"><span class="spanx10">╳</span></td>`;
                }
                else {
                    document.getElementById(ps).innerHTML += `
             <td id=${psp}${ps} class="squares" onclick="fill(this, [${k},${j}])"><span class="spanx10">╳</span></td>
             `;
                }

            }
        }
    }
    let rowId;
    let cellId;
    for (let i = 1; i <= 10; i++) {
        rowId = "x" + i + "y0";
        cellId = rowId + i;
        document.getElementById(rowId).innerHTML = `<div id=${cellId} class="rowEdgex10"></div>`;
        for (nums in activePuzzle.columns[i - 1]) {
            document.getElementById(cellId).innerHTML += `<p>${activePuzzle.columns[i - 1][nums]}</p>`;
        }
    }
    let columnId;
    for (let i = 1; i <= 10; i++) {
        columnId = "x0" + "y" + i;
        cellId = columnId + i;
        document.getElementById(columnId).innerHTML = `<div id=${cellId} class="columnEdgex10"></div>`;
        for (nums in activePuzzle.rows[i - 1]) {
            document.getElementById(cellId).innerHTML += `<p>${activePuzzle.rows[i - 1][nums]}</p>`;
        }
    }theLines(activePuzzle);
}

//View5
//updateViewXL();
async function updateViewXL() {
    activePuzzle = await fetchJSON('/Game/js/model/testBoard4.json', D);
    activeGame = games.level4;
    level = "XL";
    //activePuzzle = levelObj.levels.level4.puzzles[D];
    //levelObj.levels.level4.puzzles[D].grid = JSON.parse(dogpuzzlex15);
    html = /*html*/ `
    <div id="XL" class="board">
    <h1 class="level">level ${activePuzzle.id}</h1>
    <h2 id="life" class="level">Lives: ${lives}</h2>
    <button id="homeBtn" onclick="updateViewStart()"><=HOME</button>
    <table id="x15"></table>
    <button id="fillBtn" class="btn" onclick="mode(this)">╳</button>
    </div>
    `;
    app.innerHTML = html;
    row.length = 0;
    column.length = 0;
    let ps;
    let psp;
    for (let j = 0; j < 16; j++) {
        ps = "y" + j;
        column.push("x" + "0" + ps);
        document.getElementById("x15").innerHTML +=
            `<tr id=${ps}></tr>`;
        for (let k = 0; k < 16; k++) {
            psp = "x" + k;
            if (row.length <= 15) {
                row.push(psp + "y" + "0");
            }
            if (j == 0 || k == 0) {
                if (j == 0 && k == 0) {
                    document.getElementById(ps).innerHTML += `<td id=${psp}${ps} class="infoSquares"></td>`;
                }
                else {
                    document.getElementById(ps).innerHTML += `<td id=${psp}${ps} class="infoSquares"><span class="spanx15">╳</span></td>`;
                }
            }
            else if (j != 0 && k != 0) {
                if (activePuzzle.grid[j - 1][k - 1] == 2) {
                    console.log("X");
                    document.getElementById(ps).innerHTML += `
            
                        <td id=${psp}${ps} style="color: black;" class="squares"><span class="spanx15">╳</span></td>`;
                }
                else {
                    document.getElementById(ps).innerHTML += `
             <td id=${psp}${ps} class="squares" onclick="fill(this, [${k},${j}])"><span class="spanx15">╳</span></td>
             `;
                }

            }
        }
    }
    let rowId;
    let cellId;
    for (let i = 1; i <= 15; i++) {
        rowId = "x" + i + "y0";
        cellId = rowId + i + 1;
        document.getElementById(rowId).innerHTML = `<div id=${cellId} class="rowEdgex15"></div>`;
        for (nums in activePuzzle.columns[i - 1]) {
            document.getElementById(cellId).innerHTML += `<p>${activePuzzle.columns[i - 1][nums]}</p>`;
        }
    }
    let columnId;
    for (let i = 1; i <= 15; i++) {
        columnId = "x0" + "y" + i;
        cellId = columnId + "z";
        document.getElementById(columnId).innerHTML = `<div id=${cellId} class="columnEdgex15"></div>`;
        for (nums in activePuzzle.rows[i - 1]) {
            document.getElementById(cellId).innerHTML += `<p>${activePuzzle.rows[i - 1][nums]}</p>`;
        }

    } theLines(activePuzzle);
}
