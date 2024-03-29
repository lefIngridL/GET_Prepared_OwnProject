// View1
updateViewStart();
function updateViewStart() {
    activePuzzle = undefined;
    html = /*HTML*/ `
    <h1 id="welcome">Velkommen til Nonogram Designer!</h1>
    <h2>Velg type brett:</h2>
    <table id="container">
    
    <tr>
    <th onclick="updateViewSmall()"><h3>Design 3x3</h3></th>
    <td>
    <div>
    <table id="t3"></table>
    </div>
    </td>
    
    <th onclick="updateViewMedium()"><h3>Design 5x5</h3></th>
    
    <td><div>
    <table id="t5"></table>
    </div></td></tr>
    
    <tr>
    <th onclick="updateViewLarge()"><h3>Design 10x10</h3></th>
    <td><div>
    <table id="t10"></table>
    </div></td>
    
    <th onclick="updateViewXL()"><h3>Design 15x15</h3></th>
    
    <td><div>
    <table id="t15"></table>
    </div></td>
    </tr>
    </table>
    `;
    app.innerHTML = html;
    let psp;
    let ps3;
    let ps5;
    let ps10;
    let ps15;
    for (let i = 0; i < 3; i++) {
        ps3 = "t3y" + i;
        document.getElementById("t3").innerHTML += `
        <tr id=${ps3}></tr>
        `;
        for (let k = 0; k < 3; k++) {
            psp = "x" + k;
            document.getElementById(ps3).innerHTML += `<td></td>`;
        }

    }

    for (let i = 0; i < 5; i++) {
        ps5 = "t5y" + i;
        document.getElementById("t5").innerHTML += `
        <tr id=${ps5}></tr>
        `;
        for (let k = 0; k < 5; k++) {
            psp = "x" + k;
            document.getElementById(ps5).innerHTML += `<td></td>`;
        }
    }
    for (let i = 0; i < 10; i++) {
        ps10 = "t10y" + i;
        document.getElementById("t10").innerHTML += `
        <tr id=${ps10}></tr>
        `;
        for (let k = 0; k < 10; k++) {
            psp = "x" + k;
            document.getElementById(ps10).innerHTML += `<td></td>`;
        }
    }
    for (let i = 0; i < 15; i++) {
        ps15 = "t15y" + i;
        document.getElementById("t15").innerHTML += `
        <tr id=${ps15}></tr>
        `;
        for (let k = 0; k < 15; k++) {
            psp = "x" + k;
            document.getElementById(ps15).innerHTML += `<td></td>`;
        }
    }

}

//view2
//updateViewSmall();
function updateViewSmall() {
    level = "small";
    activePuzzle = LevelObj.level1.puzzles[0];
    html = /*html*/ `
    <div id="small" class="board">
    <h1 class="level">Level ${activePuzzle.id}</h1>
    <h2 id="life" class="level">Lives: ${lives}</h2>
    <button id="homeBtn" onclick="updateViewStart()"><=HOME</button>
    <button id="dwnLoadBtn" onclick="downloadNonogram(levelObj.levels.level1.puzzles[0])
    ;downloadNumbers(activePuzzle.rows, activePuzzle.columns)">Finish and download pattern</button>
    <button id="placeBtn" onclick="placeEdgeNr(activePuzzle)">place row numbers</button>
    <table id="x3"></table>
    <button id="fillBtn" class="btn" onclick="mode(this)">╳</button>
   
    </div>
    
    `;
    app.innerHTML = html;
    row.length = 0;
    column.length = 0;
    let ps;
    let psp;
    let i = 0;
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
                document.getElementById(ps).innerHTML += `
        
            <td id=${psp}${ps} class="infoSquares"><span class="rowEdgex3"></span></td>
            `;
            getEdge(psp, ps);
            }
            else if (j != 0 && k != 0)
                document.getElementById(ps).innerHTML += `
        
        <td id=${psp}${ps} class="squaresx3" onclick="fill(this, [${k},${j}])"><span class="spanx3">╳</span></td>
        `;

         


        }
    }
}


//View3
//updateViewMedium();
function updateViewMedium() {
    level = "medium";
    activePuzzle = LevelObj.level2.puzzles[0];
    html = /*html*/ `
    <div id="medium" class="board">
    <h1 class="level">level ${activePuzzle.id}</h1>
    <h2 id="life" class="level">Lives: ${lives}</h2>
    <button id="homeBtn" onclick="updateViewStart()"><=HOME</button>
    <button id="dwnLoadBtn" onclick="downloadNonogram(levelObj.levels.level2.puzzles[B].grid); downloadNumbers(activePuzzle.rows, activePuzzle.columns)"
    >Finish and download pattern</button>
    <button id="placeBtn" onclick="placeEdgeNr(activePuzzle)">place row numbers</button>
    
    
    
    <table id="x5"></table>
    <button id="fillBtn" class="btn" onclick="mode(this)">╳</button>

    </div>
    `;
    app.innerHTML = html;
    row.length = 0;
    column.length = 0;
    let ps;
    let psp;
    let i = 0;
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
                document.getElementById(ps).innerHTML += `
            
                <td id=${psp}${ps} class="infoSquares"><span class="spanx5"></span></td>
                `;
                getEdge(psp, ps);
            }
            else if (j != 0 && k != 0)
                document.getElementById(ps).innerHTML += `
            
            <td id=${psp}${ps} class="squaresx5" onclick="fill(this, [${k},${j}])"><span class="spanx5">╳</span></td>
            `;
        }

    }
}


//View4
//updateViewLarge();
function updateViewLarge() {
    level = "Large";
    activePuzzle = LevelObj.level3.puzzles[0];
    html = /*html*/ `
    <div id="large" class="board">
    <h1 class="level">level ${activePuzzle.id}</h1>
    <h2 id="life" class="level">Lives: ${lives}</h2>
    <button id="homeBtn" onclick="updateViewStart()"><=HOME</button>
    <button id="dwnLoadBtn" onclick="downloadNonogram(levelObj.levels.level3.puzzles[C].grid); downloadNumbers(activePuzzle.rows, activePuzzle.columns)
    ">Finish and download pattern</button>
    <button id="placeBtn" onclick="placeEdgeNr(activePuzzle)">place row numbers</button>

    <table id="x10"></table>
    <button id="fillBtn" class="btn" onclick="mode(this)">╳</button>

    </div>
    `;
    app.innerHTML = html;
    row.length = 0;
    column.length = 0;
    let ps;
    let psp;
    let i = 0;
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
                document.getElementById(ps).innerHTML += `
            
                <td id=${psp}${ps} class="infoSquares"><span class="spanx10"></span></td>
                `;
                getEdge(psp, ps);
            }
            else if (j != 0 && k != 0)
                document.getElementById(ps).innerHTML += `
            
            <td id=${psp}${ps} class="squaresx10" onclick="fill(this, [${k},${j}])"><span class="spanx10">╳</span></td>
            `;
        }

    }
}


//View5
//updateViewXL();
function updateViewXL() {
    level = "XL";
    activePuzzle = LevelObj.level4.puzzles[0];
    html = /*html*/ `
    <div id="XL" class="board">
    <h1 class="level">level ${activePuzzle.id}</h1>
    <h2 id="life" class="level">Lives: ${lives}</h2>
    <button id="homeBtn" onclick="updateViewStart()"><=HOME</button>
    <button id="dwnLoadBtn" onclick="downloadNonogram(levelObj.levels.level4.puzzles[D].grid); downloadNumbers(activePuzzle.rows, activePuzzle.columns); downloadNonoObj(levelObj.levels.level4.puzzles[D],activePuzzle.rows, activePuzzle.columns);
    ">Finish and download pattern</button>
    <button id="placeBtn" onclick="placeEdgeNr(activePuzzle)">place row numbers</button>

    <table id="x15"></table>
    <button id="fillBtn" class="btn" onclick="mode(this)">╳</button>

    </div>
    `;
    app.innerHTML = html;
    row.length = 0;
    column.length = 0;
    let ps;
    let psp;
    let i = 0;
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
                document.getElementById(ps).innerHTML += `
            
                <td id=${psp}${ps} class="infoSquares"><span class="spanx15"></span></td>
                `;
                getEdge(psp, ps);
            }
            else if (j != 0 && k != 0)
                document.getElementById(ps).innerHTML += `
            
            <td id=${psp}${ps} class="squaresx15" onclick="fill(this, [${k},${j}])"><span class="spanx15">╳</span></td>
            `;
        }

    }
}


