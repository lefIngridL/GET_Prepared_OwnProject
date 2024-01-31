// Model
const app = document.getElementById('app');
const row = [];
const column = [];
const rowEdge = [];
const columnEdge = [];
const level1 = {
    row1: {
        x1y1: 'o',
        x2y1: 'x',
        x3y1: 'x',

    },
    row2: {
        x1y2: 'o',
        x2y2: 'o',
        x3y2: 'o',

    },
    row3: {
        x1y3: 'o',
        x2y3: 'x',
        x3y3: 'o',

    },
    rowEdge: [
        ['3'], ['1'], ['2'],
    ],
    columnEdge: [
        ['1'], ['3'], ['1', '1'],
    ],
}

let smallLevels;

fetch('./smallLevels.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then((json) => {
        smallLevels = json;
        console.log(smallLevels.levels[0].level1.puzzles[0].grid[0].cell);
        // Call a function in view.js to use the data
        //useData(smallLevels);
    })
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });

//const object1 = JSON.parse(smallLevels);
//function useData(data){
//  JSON.parse(data);
//}

let level; //can be small, medium, Large og XL, denotes board size

let activePuzzle; //blir satt til f.eks "levelObj.levels.level1.puzzles[A]" i view.js. hjelper oss å skifte mellom brett/brettmønster. 
let lives = 5;  //hvor mange liv vi har. Går nedover med 1 hver gang vi gjør en feil.
let points = 0;
let possiblePoints;
//tellere for nivå på de forskjellige brettstørrelsene
let A = 0;
let B = 0;
let C = 0;
let D = 0;

//Objekt med informasjon om nivå, hint, mønster osv.
const levelObj = {
    levels:
    {
        level1: {
            puzzles: [
                {
                    id: 1.1,
                    size: 3,
                    rows: [[1], [3], [1, 1]],
                    columns: [[3], [1], [2]],
                    grid: {
                        x1y1: { "state": "empty", "correct": true },
                        x2y1: { "state": "empty", "correct": false },
                        x3y1: { "state": "empty", "correct": false },

                        x1y2: { "state": "empty", "correct": true },
                        x2y2: { "state": "empty", "correct": true },
                        x3y2: { "state": "empty", "correct": true },

                        x1y3: { "state": "empty", "correct": true },
                        x2y3: { "state": "empty", "correct": false },
                        x3y3: { "state": "empty", "correct": true },
                    }

                },
                {
                    id: 1.2,
                    size: 3,
                    rows: [[1], [1], [2]],
                    columns: [[0], [1], [3]],
                    grid: {
                        x1y1: { "state": "empty", "correct": false },
                        x2y1: { "state": "empty", "correct": false },
                        x3y1: { "state": "empty", "correct": true },

                        x1y2: { "state": "empty", "correct": false },
                        x2y2: { "state": "empty", "correct": false },
                        x3y2: { "state": "empty", "correct": true },

                        x1y3: { "state": "empty", "correct": false },
                        x2y3: { "state": "empty", "correct": true },
                        x3y3: { "state": "empty", "correct": true },
                    }

                },
                {
                    id: 1.3,
                    size: 3,
                    rows: '',
                    columns: '',
                    grid: '',
                },
                {
                    id: 1.4,
                    size: 3,
                    rows: '',
                    columns: '',
                    grid: '',
                },

            ]
        },

        level2: {
            puzzles: [
                {
                    id: 2.1,
                    size: 5,
                    rows: [[4], [1, 2], [2, 1], [1, 2], [2, 1]],
                    columns: [[3, 1], [1, 3], [1], [2, 2], [3]],
                    grid:
                    {
                        x1y1: { "state": "empty", "correct": true },
                        x2y1: { "state": "empty", "correct": true  },
                        x3y1: { "state": "empty", "correct": true  },
                        x4y1: { "state": "empty", "correct": true  },
                        x5y1: { "state": "empty", "correct": false },

                        x1y2: { "state": "empty", "correct": true },
                        x2y2: { "state": "empty", "correct": false },
                        x3y2: { "state": "empty", "correct": false },
                        x4y2: { "state": "empty", "correct": true },
                        x5y2: { "state": "empty", "correct": true },

                        x1y3: { "state": "empty", "correct": true },
                        x2y3: { "state": "empty", "correct": true },
                        x3y3: { "state": "empty", "correct": false },
                        x4y3: { "state": "empty", "correct": false },
                        x5y3: { "state": "empty", "correct": true },

                        x1y4: { "state": "empty", "correct": false },
                        x2y4: { "state": "empty", "correct": true },
                        x3y4: { "state": "empty", "correct": false },
                        x4y4: { "state": "empty", "correct": true },
                        x5y4: { "state": "empty", "correct": true },

                        x1y5: { "state": "empty", "correct": true },
                        x2y5: { "state": "empty", "correct": true },
                        x3y5: { "state": "empty", "correct": false },
                        x4y5: { "state": "empty", "correct": true },
                        x5y5: { "state": "empty", "correct": false },
                    }

                },
                {
                    id: 2.2,
                    size: 5,
                    rows: [[1], [1,1], [1, 1], [1,1,1], [1,1,1]],
                    columns: [[2], [2], [1, 2], [2], [2]],
                    grid:
                    {
                        x1y1: { "state": "empty", "correct": false },
                        x2y1: { "state": "empty", "correct": false },
                        x3y1: { "state": "empty", "correct": true },
                        x4y1: { "state": "empty", "correct": false },
                        x5y1: { "state": "empty", "correct": false },

                        x1y2: { "state": "empty", "correct": false },
                        x2y2: { "state": "empty", "correct": true },
                        x3y2: { "state": "empty", "correct": false },
                        x4y2: { "state": "empty", "correct": true },
                        x5y2: { "state": "empty", "correct": false },

                        x1y3: { "state": "empty", "correct": false },
                        x2y3: { "state": "empty", "correct": true },
                        x3y3: { "state": "empty", "correct": false },
                        x4y3: { "state": "empty", "correct": true },
                        x5y3: { "state": "empty", "correct": false },

                        x1y4: { "state": "empty", "correct": true },
                        x2y4: { "state": "empty", "correct": false },
                        x3y4: { "state": "empty", "correct": true },
                        x4y4: { "state": "empty", "correct": false },
                        x5y4: { "state": "empty", "correct": true },

                        x1y5: { "state": "empty", "correct": true },
                        x2y5: { "state": "empty", "correct": false },
                        x3y5: { "state": "empty", "correct": true },
                        x4y5: { "state": "empty", "correct": false },
                        x5y5: { "state": "empty", "correct": true },
                    }

                }

            ]
        },
        level3: {
            puzzles: [
                {
                    id: 3.1,
                    size:10,
                    rows: [[1,1], [3,1,3], [1, 3, 1], [1, 1], [2, 1], [4, 1], [2, 1], [8], [7], [7,3]],
                    columns: [[3], [1], [2], [1, 1], [], [], [], [], [], []],
                    grid:
                    {
                        x1y1: { "state": "empty", "correct": true },
                        x2y1: { "state": "empty", "correct": false },
                        x3y1: { "state": "empty", "correct": false },
                        x4y1: { "state": "empty", "correct": false },
                        x5y1: { "state": "empty", "correct": false },
                        x6y1: { "state": "empty", "correct": true },
                        x7y1: { "state": "empty", "correct": false },
                        x8y1: { "state": "empty", "correct": false },
                        x9y1: { "state": "empty", "correct": false },
                        x10y1: { "state": "empty", "correct": false },


                        x1y2: { "state": "empty", "correct": true },
                        x2y2: { "state": "empty", "correct": true },
                        x3y2: { "state": "empty", "correct": true },
                        x4y2: { "state": "empty", "correct": true },
                        x5y2: { "state": "empty", "correct": true },
                        x6y2: { "state": "empty", "correct": true },
                        x7y2: { "state": "empty", "correct": true },
                        x8y2: { "state": "empty", "correct": true },
                        x9y2: { "state": "empty", "correct": true },
                        x10y2: { "state": "empty", "correct": true },


                        x1y3: { "state": "empty", "correct": true },
                        x2y3: { "state": "empty", "correct": false },
                        x3y3: { "state": "empty", "correct": true },
                        x4y3: { "state": "empty", "correct": true },
                        x5y3: { "state": "empty", "correct": true },
                        x6y3: { "state": "empty", "correct": true },
                        x7y3: { "state": "empty", "correct": false },
                        x8y3: { "state": "empty", "correct": true },
                        x9y3: { "state": "empty", "correct": true },
                        x10y3: { "state": "empty", "correct": true },


                        x1y4: { "state": "empty", "correct": true },
                        x2y4: { "state": "empty", "correct": true },
                        x3y4: { "state": "empty", "correct": true },
                        x4y4: { "state": "empty", "correct": true },
                        x5y4: { "state": "empty", "correct": true },
                        x6y4: { "state": "empty", "correct": true },
                        x7y4: { "state": "empty", "correct": true },
                        x8y4: { "state": "empty", "correct": true },
                        x9y4: { "state": "empty", "correct": true },
                        x10y4: { "state": "empty", "correct": true },


                        x1y5: { "state": "empty", "correct": true },
                        x2y5: { "state": "empty", "correct": true },
                        x3y5: { "state": "empty", "correct": true },
                        x4y5: { "state": "empty", "correct": true },
                        x5y5: { "state": "empty", "correct": true },
                        x6y5: { "state": "empty", "correct": true },
                        x7y5: { "state": "empty", "correct": true },
                        x8y5: { "state": "empty", "correct": true },
                        x9y5: { "state": "empty", "correct": true },
                        x10y5: { "state": "empty", "correct": true },


                        x1y6: { "state": "empty", "correct": true },
                        x2y6: { "state": "empty", "correct": true },
                        x3y6: { "state": "empty", "correct": true },
                        x4y6: { "state": "empty", "correct": true },
                        x5y6: { "state": "empty", "correct": true },
                        x6y6: { "state": "empty", "correct": true },
                        x7y6: { "state": "empty", "correct": true },
                        x8y6: { "state": "empty", "correct": true },
                        x9y6: { "state": "empty", "correct": true },
                        x10y6: { "state": "empty", "correct": true },


                        x1y7: { "state": "empty", "correct": true },
                        x2y7: { "state": "empty", "correct": true },
                        x3y7: { "state": "empty", "correct": true },
                        x4y7: { "state": "empty", "correct": true },
                        x5y7: { "state": "empty", "correct": true },
                        x6y7: { "state": "empty", "correct": true },
                        x7y7: { "state": "empty", "correct": true },
                        x8y7: { "state": "empty", "correct": true },
                        x9y7: { "state": "empty", "correct": true },
                        x10y7: { "state": "empty", "correct": true },


                        x1y8: { "state": "empty", "correct": true },
                        x2y8: { "state": "empty", "correct": true },
                        x3y8: { "state": "empty", "correct": true },
                        x4y8: { "state": "empty", "correct": true },
                        x5y8: { "state": "empty", "correct": true },
                        x6y8: { "state": "empty", "correct": true },
                        x7y8: { "state": "empty", "correct": true },
                        x8y8: { "state": "empty", "correct": true },
                        x9y8: { "state": "empty", "correct": true },
                        x10y8: { "state": "empty", "correct": true },


                        x1y9: { "state": "empty", "correct": true },
                        x2y9: { "state": "empty", "correct": true },
                        x3y9: { "state": "empty", "correct": true },
                        x4y9: { "state": "empty", "correct": true },
                        x5y9: { "state": "empty", "correct": true },
                        x6y9: { "state": "empty", "correct": true },
                        x7y9: { "state": "empty", "correct": true },
                        x8y9: { "state": "empty", "correct": true },
                        x9y9: { "state": "empty", "correct": true },
                        x10y9: { "state": "empty", "correct": true },


                        x1y10: { "state": "empty", "correct": true },
                        x2y10: { "state": "empty", "correct": true },
                        x3y10: { "state": "empty", "correct": true },
                        x4y10: { "state": "empty", "correct": true },
                        x5y10: { "state": "empty", "correct": true },
                        x1y10: { "state": "empty", "correct": true },
                        x2y10: { "state": "empty", "correct": true },
                        x3y10: { "state": "empty", "correct": true },
                        x4y10: { "state": "empty", "correct": true },
                        x5y10: { "state": "empty", "correct": true },
                    }

                },
                {
                    id: 3.2,
                    size: 10,
                    rows: [[1], [2], [1, 1], [1, 1], [], [], [], [], [], []],
                    columns: [[2], [1], [1, 1], [1, 1], [], [], [], [], [], []],
                    grid:
                    {
                        x1y1: { "state": "empty", "correct": true },
                        x2y1: { "state": "empty", "correct": false },
                        x3y1: { "state": "empty", "correct": false },
                        x4y1: { "state": "empty", "correct": false },
                        x5y1: { "state": "empty", "correct": false },
                        x6y1: { "state": "empty", "correct": true },
                        x7y1: { "state": "empty", "correct": false },
                        x8y1: { "state": "empty", "correct": false },
                        x9y1: { "state": "empty", "correct": false },
                        x10y1: { "state": "empty", "correct": false },


                        x1y2: { "state": "empty", "correct": true },
                        x2y2: { "state": "empty", "correct": true },
                        x3y2: { "state": "empty", "correct": true },
                        x4y2: { "state": "empty", "correct": true },
                        x5y2: { "state": "empty", "correct": true },
                        x6y2: { "state": "empty", "correct": true },
                        x7y2: { "state": "empty", "correct": true },
                        x8y2: { "state": "empty", "correct": true },
                        x9y2: { "state": "empty", "correct": true },
                        x10y2: { "state": "empty", "correct": true },


                        x1y3: { "state": "empty", "correct": true },
                        x2y3: { "state": "empty", "correct": false },
                        x3y3: { "state": "empty", "correct": true },
                        x4y3: { "state": "empty", "correct": true },
                        x5y3: { "state": "empty", "correct": true },
                        x6y3: { "state": "empty", "correct": true },
                        x7y3: { "state": "empty", "correct": false },
                        x8y3: { "state": "empty", "correct": true },
                        x9y3: { "state": "empty", "correct": true },
                        x10y3: { "state": "empty", "correct": true },


                        x1y4: { "state": "empty", "correct": true },
                        x2y4: { "state": "empty", "correct": true },
                        x3y4: { "state": "empty", "correct": true },
                        x4y4: { "state": "empty", "correct": true },
                        x5y4: { "state": "empty", "correct": true },
                        x6y4: { "state": "empty", "correct": true },
                        x7y4: { "state": "empty", "correct": true },
                        x8y4: { "state": "empty", "correct": true },
                        x9y4: { "state": "empty", "correct": true },
                        x10y4: { "state": "empty", "correct": true },


                        x1y5: { "state": "empty", "correct": true },
                        x2y5: { "state": "empty", "correct": true },
                        x3y5: { "state": "empty", "correct": true },
                        x4y5: { "state": "empty", "correct": true },
                        x5y5: { "state": "empty", "correct": true },
                        x6y5: { "state": "empty", "correct": true },
                        x7y5: { "state": "empty", "correct": true },
                        x8y5: { "state": "empty", "correct": true },
                        x9y5: { "state": "empty", "correct": true },
                        x10y5: { "state": "empty", "correct": true },


                        x1y6: { "state": "empty", "correct": true },
                        x2y6: { "state": "empty", "correct": true },
                        x3y6: { "state": "empty", "correct": true },
                        x4y6: { "state": "empty", "correct": true },
                        x5y6: { "state": "empty", "correct": true },
                        x6y6: { "state": "empty", "correct": true },
                        x7y6: { "state": "empty", "correct": true },
                        x8y6: { "state": "empty", "correct": true },
                        x9y6: { "state": "empty", "correct": true },
                        x10y6: { "state": "empty", "correct": true },


                        x1y7: { "state": "empty", "correct": true },
                        x2y7: { "state": "empty", "correct": true },
                        x3y7: { "state": "empty", "correct": true },
                        x4y7: { "state": "empty", "correct": true },
                        x5y7: { "state": "empty", "correct": true },
                        x6y7: { "state": "empty", "correct": true },
                        x7y7: { "state": "empty", "correct": true },
                        x8y7: { "state": "empty", "correct": true },
                        x9y7: { "state": "empty", "correct": true },
                        x10y7: { "state": "empty", "correct": true },


                        x1y8: { "state": "empty", "correct": true },
                        x2y8: { "state": "empty", "correct": true },
                        x3y8: { "state": "empty", "correct": true },
                        x4y8: { "state": "empty", "correct": true },
                        x5y8: { "state": "empty", "correct": true },
                        x6y8: { "state": "empty", "correct": true },
                        x7y8: { "state": "empty", "correct": true },
                        x8y8: { "state": "empty", "correct": true },
                        x9y8: { "state": "empty", "correct": true },
                        x10y8: { "state": "empty", "correct": true },


                        x1y9: { "state": "empty", "correct": true },
                        x2y9: { "state": "empty", "correct": true },
                        x3y9: { "state": "empty", "correct": true },
                        x4y9: { "state": "empty", "correct": true },
                        x5y9: { "state": "empty", "correct": true },
                        x6y9: { "state": "empty", "correct": true },
                        x7y9: { "state": "empty", "correct": true },
                        x8y9: { "state": "empty", "correct": true },
                        x9y9: { "state": "empty", "correct": true },
                        x10y9: { "state": "empty", "correct": true },


                        x1y10: { "state": "empty", "correct": true },
                        x2y10: { "state": "empty", "correct": true },
                        x3y10: { "state": "empty", "correct": true },
                        x4y10: { "state": "empty", "correct": true },
                        x5y10: { "state": "empty", "correct": true },
                        x6y10: { "state": "empty", "correct": true },
                        x7y10: { "state": "empty", "correct": true },
                        x8y10: { "state": "empty", "correct": true },
                        x9y10: { "state": "empty", "correct": true },
                        x10y10: { "state": "empty", "correct": true },
                    }

                }

            ]
        },
        level4: {
            puzzles: [
                {
                    id: 4.1,
                    size: 15,
                    rows: [[1,1], [3,1,3], [1, 3, 1], [1, 1], [2, 1], [4, 1], [2, 1], [8], [7], [7,3], [4, 3, 1], [1, 1, 3], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
                    columns: [[1], [3,1], [1, 1, 1], [10], [8, 1], [7], [4], [1, 3, 1], [3, 7], [1, 5, 1], [1, 4], [3], [1, 1], [3,3], [1,1]],
                    grid:
                    {
                        x1y1: { "state": "empty", "correct": false },
                        x2y1: { "state": "empty", "correct": true },
                        x3y1: { "state": "empty", "correct": false },
                        x4y1: { "state": "empty", "correct": false },
                        x5y1: { "state": "empty", "correct": false },
                        x6y1: { "state": "empty", "correct": false },
                        x7y1: { "state": "empty", "correct": false },
                        x8y1: { "state": "empty", "correct": false },
                        x9y1: { "state": "empty", "correct": false },
                        x10y1: { "state": "empty", "correct": false },
                        x11y1: { "state": "empty", "correct": false },
                        x12y1: { "state": "empty", "correct": false },
                        x13y1: { "state": "empty", "correct": false },
                        x14y1: { "state": "empty", "correct": true },
                        x15y1: { "state": "empty", "correct": false },


                        x1y2: { "state": "empty", "correct": true },
                        x2y2: { "state": "empty", "correct": true },
                        x3y2: { "state": "empty", "correct": true },
                        x4y2: { "state": "empty", "correct": false },
                        x5y2: { "state": "empty", "correct": false },
                        x6y2: { "state": "empty", "correct": false },
                        x7y2: { "state": "empty", "correct": false },
                        x8y2: { "state": "empty", "correct": false },
                        x9y2: { "state": "empty", "correct": true },
                        x10y2: { "state": "empty", "correct": false },
                        x11y2: { "state": "empty", "correct": false },
                        x12y2: { "state": "empty", "correct": false },
                        x13y2: { "state": "empty", "correct": true },
                        x14y2: { "state": "empty", "correct": true },
                        x15y2: { "state": "empty", "correct": true },


                        x1y3: { "state": "empty", "correct": false },
                        x2y3: { "state": "empty", "correct": true },
                        x3y3: { "state": "empty", "correct": false },
                        x4y3: { "state": "empty", "correct": false },
                        x5y3: { "state": "empty", "correct": false },
                        x6y3: { "state": "empty", "correct": false },
                        x7y3: { "state": "empty", "correct": false },
                        x8y3: { "state": "empty", "correct": true },
                        x9y3: { "state": "empty", "correct": true },
                        x10y3: { "state": "empty", "correct": true },
                        x11y3: { "state": "empty", "correct": false },
                        x12y3: { "state": "empty", "correct": false },
                        x13y3: { "state": "empty", "correct": false },
                        x14y3: { "state": "empty", "correct": true },
                        x15y3: { "state": "empty", "correct": false },


                        x1y4: { "state": "empty", "correct": false},
                        x2y4: { "state": "empty", "correct": false },
                        x3y4: { "state": "empty", "correct": false },
                        x4y4: { "state": "empty", "correct": false },
                        x5y4: { "state": "empty", "correct": true },
                        x6y4: { "state": "empty", "correct": false },
                        x7y4: { "state": "empty", "correct": false },
                        x8y4: { "state": "empty", "correct": false },
                        x9y4: { "state": "empty", "correct": true },
                        x10y4: { "state": "empty", "correct": false },
                        x11y4: { "state": "empty", "correct": false },
                        x12y4: { "state": "empty", "correct": false },
                        x13y4: { "state": "empty", "correct": false },
                        x14y4: { "state": "empty", "correct": false },
                        x15y4: { "state": "empty", "correct": false },


                        x1y5: { "state": "empty", "correct": true },
                        x2y5: { "state": "empty", "correct": true },
                        x3y5: { "state": "empty", "correct": true },
                        x4y5: { "state": "empty", "correct": true },
                        x5y5: { "state": "empty", "correct": true },
                        x6y5: { "state": "empty", "correct": true },
                        x7y5: { "state": "empty", "correct": true },
                        x8y5: { "state": "empty", "correct": true },
                        x9y5: { "state": "empty", "correct": true },
                        x10y5: { "state": "empty", "correct": true },
                        x11y5: { "state": "empty", "correct": true },
                        x12y5: { "state": "empty", "correct": true },
                        x13y5: { "state": "empty", "correct": true },
                        x14y5: { "state": "empty", "correct": true },
                        x15y5: { "state": "empty", "correct": true },


                        x1y6: { "state": "empty", "correct": true },
                        x2y6: { "state": "empty", "correct": true },
                        x3y6: { "state": "empty", "correct": true },
                        x4y6: { "state": "empty", "correct": true },
                        x5y6: { "state": "empty", "correct": true },
                        x6y6: { "state": "empty", "correct": true },
                        x7y6: { "state": "empty", "correct": true },
                        x8y6: { "state": "empty", "correct": true },
                        x9y6: { "state": "empty", "correct": true },
                        x10y6: { "state": "empty", "correct": true },
                        x11y6: { "state": "empty", "correct": true },
                        x12y6: { "state": "empty", "correct": true },
                        x13y6: { "state": "empty", "correct": true },
                        x14y6: { "state": "empty", "correct": true },
                        x15y6: { "state": "empty", "correct": true },


                        x1y7: { "state": "empty", "correct": true },
                        x2y7: { "state": "empty", "correct": true },
                        x3y7: { "state": "empty", "correct": true },
                        x4y7: { "state": "empty", "correct": true },
                        x5y7: { "state": "empty", "correct": true },
                        x6y7: { "state": "empty", "correct": true },
                        x7y7: { "state": "empty", "correct": true },
                        x8y7: { "state": "empty", "correct": true },
                        x9y7: { "state": "empty", "correct": true },
                        x10y7: { "state": "empty", "correct": true },
                        x11y7: { "state": "empty", "correct": true },
                        x12y7: { "state": "empty", "correct": true },
                        x13y7: { "state": "empty", "correct": true },
                        x14y7: { "state": "empty", "correct": true },
                        x15y7: { "state": "empty", "correct": true },


                        x1y8: { "state": "empty", "correct": true },
                        x2y8: { "state": "empty", "correct": true },
                        x3y8: { "state": "empty", "correct": true },
                        x4y8: { "state": "empty", "correct": true },
                        x5y8: { "state": "empty", "correct": true },
                        x6y8: { "state": "empty", "correct": true },
                        x7y8: { "state": "empty", "correct": true },
                        x8y8: { "state": "empty", "correct": true },
                        x9y8: { "state": "empty", "correct": true },
                        x10y8: { "state": "empty", "correct": true },
                        x11y8: { "state": "empty", "correct": true },
                        x12y8: { "state": "empty", "correct": true },
                        x13y8: { "state": "empty", "correct": true },
                        x14y8: { "state": "empty", "correct": true },
                        x15y8: { "state": "empty", "correct": true },


                        x1y9: { "state": "empty", "correct": true },
                        x2y9: { "state": "empty", "correct": true },
                        x3y9: { "state": "empty", "correct": true },
                        x4y9: { "state": "empty", "correct": true },
                        x5y9: { "state": "empty", "correct": true },
                        x6y9: { "state": "empty", "correct": true },
                        x7y9: { "state": "empty", "correct": true },
                        x8y9: { "state": "empty", "correct": true },
                        x9y9: { "state": "empty", "correct": true },
                        x10y9: { "state": "empty", "correct": true },
                        x11y9: { "state": "empty", "correct": true },
                        x12y9: { "state": "empty", "correct": true },
                        x13y9: { "state": "empty", "correct": true },
                        x14y9: { "state": "empty", "correct": true },
                        x15y9: { "state": "empty", "correct": true },


                        x1y10: { "state": "empty", "correct": true },
                        x2y10: { "state": "empty", "correct": true },
                        x3y10: { "state": "empty", "correct": true },
                        x4y10: { "state": "empty", "correct": true },
                        x5y10: { "state": "empty", "correct": true },
                        x6y10: { "state": "empty", "correct": true },
                        x7y10: { "state": "empty", "correct": true },
                        x8y10: { "state": "empty", "correct": true },
                        x9y10: { "state": "empty", "correct": true },
                        x10y10: { "state": "empty", "correct": true },
                        x11y10: { "state": "empty", "correct": true },
                        x12y10: { "state": "empty", "correct": true },
                        x13y10: { "state": "empty", "correct": true },
                        x14y10: { "state": "empty", "correct": true },
                        x15y10: { "state": "empty", "correct": true },

                        
                        x1y11: { "state": "empty", "correct": true },
                        x2y11: { "state": "empty", "correct": true },
                        x3y11: { "state": "empty", "correct": true },
                        x4y11: { "state": "empty", "correct": true },
                        x5y11: { "state": "empty", "correct": true },
                        x6y11: { "state": "empty", "correct": true },
                        x7y11: { "state": "empty", "correct": true },
                        x8y11: { "state": "empty", "correct": true },
                        x9y11: { "state": "empty", "correct": true },
                        x10y11: { "state": "empty", "correct": true },
                        x11y11: { "state": "empty", "correct": true },
                        x12y11: { "state": "empty", "correct": true },
                        x13y11: { "state": "empty", "correct": true },
                        x14y11: { "state": "empty", "correct": true },
                        x15y11: { "state": "empty", "correct": true },

                        
                        x1y12: { "state": "empty", "correct": true },
                        x2y12: { "state": "empty", "correct": true },
                        x3y12: { "state": "empty", "correct": true },
                        x4y12: { "state": "empty", "correct": true },
                        x5y12: { "state": "empty", "correct": true },
                        x6y12: { "state": "empty", "correct": true },
                        x7y12: { "state": "empty", "correct": true },
                        x8y12: { "state": "empty", "correct": true },
                        x9y12: { "state": "empty", "correct": true },
                        x10y12: { "state": "empty", "correct": true },
                        x11y12: { "state": "empty", "correct": true },
                        x12y12: { "state": "empty", "correct": true },
                        x13y12: { "state": "empty", "correct": true },
                        x14y12: { "state": "empty", "correct": true },
                        x15y12: { "state": "empty", "correct": true },

                        
                        x1y13: { "state": "empty", "correct": true },
                        x2y13: { "state": "empty", "correct": true },
                        x3y13: { "state": "empty", "correct": true },
                        x4y13: { "state": "empty", "correct": true },
                        x5y13: { "state": "empty", "correct": true },
                        x6y13: { "state": "empty", "correct": true },
                        x7y13: { "state": "empty", "correct": true },
                        x8y13: { "state": "empty", "correct": true },
                        x9y13: { "state": "empty", "correct": true },
                        x10y13: { "state": "empty", "correct": true },
                        x11y13: { "state": "empty", "correct": true },
                        x12y13: { "state": "empty", "correct": true },
                        x13y13: { "state": "empty", "correct": true },
                        x14y13: { "state": "empty", "correct": true },
                        x15y13: { "state": "empty", "correct": true },

                        
                        x1y14: { "state": "empty", "correct": true },
                        x2y14: { "state": "empty", "correct": true },
                        x3y14: { "state": "empty", "correct": true },
                        x4y14: { "state": "empty", "correct": true },
                        x5y14: { "state": "empty", "correct": true },
                        x6y14: { "state": "empty", "correct": true },
                        x7y14: { "state": "empty", "correct": true },
                        x8y14: { "state": "empty", "correct": true },
                        x9y14: { "state": "empty", "correct": true },
                        x10y14: { "state": "empty", "correct": true },
                        x11y14: { "state": "empty", "correct": true },
                        x12y14: { "state": "empty", "correct": true },
                        x13y14: { "state": "empty", "correct": true },
                        x14y14: { "state": "empty", "correct": true },
                        x15y14: { "state": "empty", "correct": true },

                        
                        x1y15: { "state": "empty", "correct": true },
                        x2y15: { "state": "empty", "correct": true },
                        x3y15: { "state": "empty", "correct": true },
                        x4y15: { "state": "empty", "correct": true },
                        x5y15: { "state": "empty", "correct": true },
                        x6y15: { "state": "empty", "correct": true },
                        x7y15: { "state": "empty", "correct": true },
                        x8y15: { "state": "empty", "correct": true },
                        x9y15: { "state": "empty", "correct": true },
                        x10y15: { "state": "empty", "correct": true },
                        x11y15: { "state": "empty", "correct": true },
                        x12y15: { "state": "empty", "correct": true },
                        x13y15: { "state": "empty", "correct": true },
                        x14y15: { "state": "empty", "correct": true },
                        x15y15: { "state": "empty", "correct": true },

                        
                    }

                },
                {
                    id: 4.2,
                    size:15,
                    rows: [[1], [2], [2], [1, 1], [1, 1], [], [], [], [], [], [], [], [], [], []],
                    columns: [[2], [1], [2], [1, 1], [1, 1], [], [], [], [], [], [], [], [], [], []],
                    grid:
                    {
                        x1y1: { "state": "empty", "correct": true },
                        x2y1: { "state": "empty", "correct": false },
                        x3y1: { "state": "empty", "correct": false },
                        x4y1: { "state": "empty", "correct": false },
                        x5y1: { "state": "empty", "correct": false },
                        x6y1: { "state": "empty", "correct": true },
                        x7y1: { "state": "empty", "correct": false },
                        x8y1: { "state": "empty", "correct": false },
                        x9y1: { "state": "empty", "correct": false },
                        x10y1: { "state": "empty", "correct": false },
                        x11y1: { "state": "empty", "correct": true },
                        x12y1: { "state": "empty", "correct": false },
                        x13y1: { "state": "empty", "correct": false },
                        x14y1: { "state": "empty", "correct": false },
                        x15y1: { "state": "empty", "correct": false },


                        x1y2: { "state": "empty", "correct": true },
                        x2y2: { "state": "empty", "correct": true },
                        x3y2: { "state": "empty", "correct": true },
                        x4y2: { "state": "empty", "correct": true },
                        x5y2: { "state": "empty", "correct": true },
                        x6y2: { "state": "empty", "correct": true },
                        x7y2: { "state": "empty", "correct": true },
                        x8y2: { "state": "empty", "correct": true },
                        x9y2: { "state": "empty", "correct": true },
                        x10y2: { "state": "empty", "correct": true },
                        x11y2: { "state": "empty", "correct": true },
                        x12y2: { "state": "empty", "correct": true },
                        x13y2: { "state": "empty", "correct": true },
                        x14y2: { "state": "empty", "correct": true },
                        x15y2: { "state": "empty", "correct": true },


                        x1y3: { "state": "empty", "correct": true },
                        x2y3: { "state": "empty", "correct": false },
                        x3y3: { "state": "empty", "correct": true },
                        x4y3: { "state": "empty", "correct": true },
                        x5y3: { "state": "empty", "correct": true },
                        x6y3: { "state": "empty", "correct": true },
                        x7y3: { "state": "empty", "correct": false },
                        x8y3: { "state": "empty", "correct": true },
                        x9y3: { "state": "empty", "correct": true },
                        x10y3: { "state": "empty", "correct": true },
                        x11y3: { "state": "empty", "correct": true },
                        x12y3: { "state": "empty", "correct": false },
                        x13y3: { "state": "empty", "correct": true },
                        x14y3: { "state": "empty", "correct": true },
                        x15y3: { "state": "empty", "correct": true },


                        x1y4: { "state": "empty", "correct": true },
                        x2y4: { "state": "empty", "correct": true },
                        x3y4: { "state": "empty", "correct": true },
                        x4y4: { "state": "empty", "correct": true },
                        x5y4: { "state": "empty", "correct": true },
                        x6y4: { "state": "empty", "correct": true },
                        x7y4: { "state": "empty", "correct": true },
                        x8y4: { "state": "empty", "correct": true },
                        x9y4: { "state": "empty", "correct": true },
                        x10y4: { "state": "empty", "correct": true },
                        x11y4: { "state": "empty", "correct": true },
                        x12y4: { "state": "empty", "correct": true },
                        x13y4: { "state": "empty", "correct": true },
                        x14y4: { "state": "empty", "correct": true },
                        x15y4: { "state": "empty", "correct": true },


                        x1y5: { "state": "empty", "correct": true },
                        x2y5: { "state": "empty", "correct": true },
                        x3y5: { "state": "empty", "correct": true },
                        x4y5: { "state": "empty", "correct": true },
                        x5y5: { "state": "empty", "correct": true },
                        x6y5: { "state": "empty", "correct": true },
                        x7y5: { "state": "empty", "correct": true },
                        x8y5: { "state": "empty", "correct": true },
                        x9y5: { "state": "empty", "correct": true },
                        x10y5: { "state": "empty", "correct": true },
                        x11y5: { "state": "empty", "correct": true },
                        x12y5: { "state": "empty", "correct": true },
                        x13y5: { "state": "empty", "correct": true },
                        x14y5: { "state": "empty", "correct": true },
                        x15y5: { "state": "empty", "correct": true },


                        x1y6: { "state": "empty", "correct": true },
                        x2y6: { "state": "empty", "correct": true },
                        x3y6: { "state": "empty", "correct": true },
                        x4y6: { "state": "empty", "correct": true },
                        x5y6: { "state": "empty", "correct": true },
                        x6y6: { "state": "empty", "correct": true },
                        x7y6: { "state": "empty", "correct": true },
                        x8y6: { "state": "empty", "correct": true },
                        x9y6: { "state": "empty", "correct": true },
                        x10y6: { "state": "empty", "correct": true },
                        x11y6: { "state": "empty", "correct": true },
                        x12y6: { "state": "empty", "correct": true },
                        x13y6: { "state": "empty", "correct": true },
                        x14y6: { "state": "empty", "correct": true },
                        x15y6: { "state": "empty", "correct": true },


                        x1y7: { "state": "empty", "correct": true },
                        x2y7: { "state": "empty", "correct": true },
                        x3y7: { "state": "empty", "correct": true },
                        x4y7: { "state": "empty", "correct": true },
                        x5y7: { "state": "empty", "correct": true },
                        x6y7: { "state": "empty", "correct": true },
                        x7y7: { "state": "empty", "correct": true },
                        x8y7: { "state": "empty", "correct": true },
                        x9y7: { "state": "empty", "correct": true },
                        x10y7: { "state": "empty", "correct": true },
                        x11y7: { "state": "empty", "correct": true },
                        x12y7: { "state": "empty", "correct": true },
                        x13y7: { "state": "empty", "correct": true },
                        x14y7: { "state": "empty", "correct": true },
                        x15y7: { "state": "empty", "correct": true },


                        x1y8: { "state": "empty", "correct": true },
                        x2y8: { "state": "empty", "correct": true },
                        x3y8: { "state": "empty", "correct": true },
                        x4y8: { "state": "empty", "correct": true },
                        x5y8: { "state": "empty", "correct": true },
                        x6y8: { "state": "empty", "correct": true },
                        x7y8: { "state": "empty", "correct": true },
                        x8y8: { "state": "empty", "correct": true },
                        x9y8: { "state": "empty", "correct": true },
                        x10y8: { "state": "empty", "correct": true },
                        x11y8: { "state": "empty", "correct": true },
                        x12y8: { "state": "empty", "correct": true },
                        x13y8: { "state": "empty", "correct": true },
                        x14y8: { "state": "empty", "correct": true },
                        x15y8: { "state": "empty", "correct": true },


                        x1y9: { "state": "empty", "correct": true },
                        x2y9: { "state": "empty", "correct": true },
                        x3y9: { "state": "empty", "correct": true },
                        x4y9: { "state": "empty", "correct": true },
                        x5y9: { "state": "empty", "correct": true },
                        x6y9: { "state": "empty", "correct": true },
                        x7y9: { "state": "empty", "correct": true },
                        x8y9: { "state": "empty", "correct": true },
                        x9y9: { "state": "empty", "correct": true },
                        x10y9: { "state": "empty", "correct": true },
                        x11y9: { "state": "empty", "correct": true },
                        x12y9: { "state": "empty", "correct": true },
                        x13y9: { "state": "empty", "correct": true },
                        x14y9: { "state": "empty", "correct": true },
                        x15y9: { "state": "empty", "correct": true },


                        x1y10: { "state": "empty", "correct": true },
                        x2y10: { "state": "empty", "correct": true },
                        x3y10: { "state": "empty", "correct": true },
                        x4y10: { "state": "empty", "correct": true },
                        x5y10: { "state": "empty", "correct": true },
                        x6y10: { "state": "empty", "correct": true },
                        x7y10: { "state": "empty", "correct": true },
                        x8y10: { "state": "empty", "correct": true },
                        x9y10: { "state": "empty", "correct": true },
                        x10y10: { "state": "empty", "correct": true },
                        x11y10: { "state": "empty", "correct": true },
                        x12y10: { "state": "empty", "correct": true },
                        x13y10: { "state": "empty", "correct": true },
                        x14y10: { "state": "empty", "correct": true },
                        x15y10: { "state": "empty", "correct": true },

                        
                        x1y11: { "state": "empty", "correct": true },
                        x2y11: { "state": "empty", "correct": true },
                        x3y11: { "state": "empty", "correct": true },
                        x4y11: { "state": "empty", "correct": true },
                        x5y11: { "state": "empty", "correct": true },
                        x6y11: { "state": "empty", "correct": true },
                        x7y11: { "state": "empty", "correct": true },
                        x8y11: { "state": "empty", "correct": true },
                        x9y11: { "state": "empty", "correct": true },
                        x10y11: { "state": "empty", "correct": true },
                        x11y11: { "state": "empty", "correct": true },
                        x12y11: { "state": "empty", "correct": true },
                        x13y11: { "state": "empty", "correct": true },
                        x14y11: { "state": "empty", "correct": true },
                        x15y11: { "state": "empty", "correct": true },

                        
                        x1y12: { "state": "empty", "correct": true },
                        x2y12: { "state": "empty", "correct": true },
                        x3y12: { "state": "empty", "correct": true },
                        x4y12: { "state": "empty", "correct": true },
                        x5y12: { "state": "empty", "correct": true },
                        x6y12: { "state": "empty", "correct": true },
                        x7y12: { "state": "empty", "correct": true },
                        x8y12: { "state": "empty", "correct": true },
                        x9y12: { "state": "empty", "correct": true },
                        x10y12: { "state": "empty", "correct": true },
                        x11y12: { "state": "empty", "correct": true },
                        x12y12: { "state": "empty", "correct": true },
                        x13y12: { "state": "empty", "correct": true },
                        x14y12: { "state": "empty", "correct": true },
                        x15y12: { "state": "empty", "correct": true },

                        
                        x1y13: { "state": "empty", "correct": true },
                        x2y13: { "state": "empty", "correct": true },
                        x3y13: { "state": "empty", "correct": true },
                        x4y13: { "state": "empty", "correct": true },
                        x5y13: { "state": "empty", "correct": true },
                        x6y13: { "state": "empty", "correct": true },
                        x7y13: { "state": "empty", "correct": true },
                        x8y13: { "state": "empty", "correct": true },
                        x9y13: { "state": "empty", "correct": true },
                        x10y13: { "state": "empty", "correct": true },
                        x11y13: { "state": "empty", "correct": true },
                        x12y13: { "state": "empty", "correct": true },
                        x13y13: { "state": "empty", "correct": true },
                        x14y13: { "state": "empty", "correct": true },
                        x15y13: { "state": "empty", "correct": true },

                        
                        x1y14: { "state": "empty", "correct": true },
                        x2y14: { "state": "empty", "correct": true },
                        x3y14: { "state": "empty", "correct": true },
                        x4y14: { "state": "empty", "correct": true },
                        x5y14: { "state": "empty", "correct": true },
                        x6y14: { "state": "empty", "correct": true },
                        x7y14: { "state": "empty", "correct": true },
                        x8y14: { "state": "empty", "correct": true },
                        x9y14: { "state": "empty", "correct": true },
                        x10y14: { "state": "empty", "correct": true },
                        x11y14: { "state": "empty", "correct": true },
                        x12y14: { "state": "empty", "correct": true },
                        x13y14: { "state": "empty", "correct": true },
                        x14y14: { "state": "empty", "correct": true },
                        x15y14: { "state": "empty", "correct": true },

                        
                        x1y15: { "state": "empty", "correct": true },
                        x2y15: { "state": "empty", "correct": true },
                        x3y15: { "state": "empty", "correct": true },
                        x4y15: { "state": "empty", "correct": true },
                        x5y15: { "state": "empty", "correct": true },
                        x6y15: { "state": "empty", "correct": true },
                        x7y15: { "state": "empty", "correct": true },
                        x8y15: { "state": "empty", "correct": true },
                        x9y15: { "state": "empty", "correct": true },
                        x10y15: { "state": "empty", "correct": true },
                        x11y15: { "state": "empty", "correct": true },
                        x12y15: { "state": "empty", "correct": true },
                        x13y15: { "state": "empty", "correct": true },
                        x14y15: { "state": "empty", "correct": true },
                        x15y15: { "state": "empty", "correct": true },
                    }

                }

            ]
        }
    }
};


//lager leveler ved hjelp av et program som er avledet av dette nonogram prosjektet. Der kan jeg designe nivåer visuelt, dataene lagres i et kompatibelt objekt, konverteres til JSON, og lastes ned. Deretter limer jeg inn her tildeler en variabel, konverterer og spesifiserer hvilken del av levelObj som skal erstattes. 
//liste over 3x3 levels------------------------------------------------------
let level1x3 = '{"x1y1":{"state":"filled","correct":true},"x2y1":{"state":"empty","correct":false},"x3y1":{"state":"empty","correct":false},"x1y2":{"state":"filled","correct":true},"x2y2":{"state":"filled","correct":true},"x3y2":{"state":"filled","correct":true},"x1y3":{"state":"filled","correct":true},"x2y3":{"state":"empty","correct":false},"x3y3":{"state":"filled","correct":true}}';
levelObj.levels.level1.puzzles[0].grid = JSON.parse(level1x3);
let level2x3 = '{"x1y1":{"state":"empty","correct":false},"x2y1":{"state":"empty","correct":false},"x3y1":{"state":"filled","correct":true},"x1y2":{"state":"empty","correct":false},"x2y2":{"state":"empty","correct":false},"x3y2":{"state":"filled","correct":true},"x1y3":{"state":"empty","correct":false},"x2y3":{"state":"filled","correct":true},"x3y3":{"state":"filled","correct":true}}';
levelObj.levels.level1.puzzles[1].grid = JSON.parse(level2x3);
let level3x3 = '{"x1y1":{"state":"empty","correct":false},"x2y1":{"state":"filled","correct":true},"x3y1":{"state":"empty","correct":false},"x1y2":{"state":"filled","correct":true},"x2y2":{"state":"filledx","correct":false},"x3y2":{"state":"filled","correct":true},"x1y3":{"state":"filled","correct":true},"x2y3":{"state":"filled","correct":true},"x3y3":{"state":"filled","correct":true}}';
levelObj.levels.level1.puzzles[2].grid = JSON.parse(level3x3);
levelObj.levels.level1.puzzles[2].rows = [[1],[1,1],[3]];
levelObj.levels.level1.puzzles[2].columns = [[2],[1,1],[2]];
let level4x3 = '{"x1y1":{"state":"filled","correct":true},"x2y1":{"state":"filled","correct":true},"x3y1":{"state":"filled","correct":true},"x1y2":{"state":"filled","correct":true},"x2y2":{"state":"empty","correct":false},"x3y2":{"state":"empty","correct":false},"x1y3":{"state":"filled","correct":true},"x2y3":{"state":"empty","correct":false},"x3y3":{"state":"filled","correct":true}}';
levelObj.levels.level1.puzzles[3].grid = JSON.parse(level4x3);
levelObj.levels.level1.puzzles[3].rows= [[3],[1],[1,1]];
levelObj.levels.level1.puzzles[3].columns=[[3],[1],[1,1]] ;

//liste over 5x5 levels----------------------------------------
let level1x5 = '{"x1y1":{"state":"filled","correct":true},"x2y1":{"state":"filled","correct":true},"x3y1":{"state":"filled","correct":true},"x4y1":{"state":"filled","correct":true},"x5y1":{"state":"empty","correct":false},"x1y2":{"state":"filled","correct":true},"x2y2":{"state":"empty","correct":false},"x3y2":{"state":"empty","correct":false},"x4y2":{"state":"filled","correct":true},"x5y2":{"state":"filled","correct":true},"x1y3":{"state":"filled","correct":true},"x2y3":{"state":"filled","correct":true},"x3y3":{"state":"empty","correct":false},"x4y3":{"state":"empty","correct":false},"x5y3":{"state":"filled","correct":true},"x1y4":{"state":"empty","correct":false},"x2y4":{"state":"filled","correct":true},"x3y4":{"state":"empty","correct":false},"x4y4":{"state":"filled","correct":true},"x5y4":{"state":"filled","correct":true},"x1y5":{"state":"filled","correct":true},"x2y5":{"state":"filled","correct":true},"x3y5":{"state":"empty","correct":false},"x4y5":{"state":"filled","correct":true},"x5y5":{"state":"empty","correct":false}}';
levelObj.levels.level2.puzzles[0].grid = JSON.parse(level1x5);
let level2x5 = '{"x1y1":{"state":"empty","correct":false},"x2y1":{"state":"empty","correct":false},"x3y1":{"state":"filled","correct":true},"x4y1":{"state":"empty","correct":false},"x5y1":{"state":"empty","correct":false},"x1y2":{"state":"empty","correct":false},"x2y2":{"state":"filled","correct":true},"x3y2":{"state":"empty","correct":false},"x4y2":{"state":"filled","correct":true},"x5y2":{"state":"empty","correct":false},"x1y3":{"state":"empty","correct":false},"x2y3":{"state":"filled","correct":true},"x3y3":{"state":"empty","correct":false},"x4y3":{"state":"filled","correct":true},"x5y3":{"state":"empty","correct":false},"x1y4":{"state":"filled","correct":true},"x2y4":{"state":"empty","correct":false},"x3y4":{"state":"filled","correct":true},"x4y4":{"state":"empty","correct":false},"x5y4":{"state":"filled","correct":true},"x1y5":{"state":"filled","correct":true},"x2y5":{"state":"empty","correct":false},"x3y5":{"state":"filled","correct":true},"x4y5":{"state":"empty","correct":false},"x5y5":{"state":"filled","correct":true}}';
levelObj.levels.level2.puzzles[1].grid = JSON.parse(level2x5);
let level3x5 = '';
//levelObj.levels.level2.puzzles[2].grid = JSON.parse(level3x5);
let level4x5 = '';
//levelObj.levels.level2.puzzles[3].grid = JSON.parse(level4x5);

//liste over 10x10 levels--------------------------------------------
let level1x10 = '{"x1y1":{"state":"filled","correct":true},"x2y1":{"state":"filled","correct":true},"x3y1":{"state":"filled","correct":true},"x4y1":{"state":"filled","correct":true},"x5y1":{"state":"filled","correct":true},"x6y1":{"state":"filled","correct":true},"x7y1":{"state":"filled","correct":true},"x8y1":{"state":"empty","correct":false},"x9y1":{"state":"filledx","correct":false},"x10y1":{"state":"filled","correct":true},"x1y2":{"state":"empty","correct":false},"x2y2":{"state":"empty","correct":false},"x3y2":{"state":"empty","correct":false},"x4y2":{"state":"filledx","correct":false},"x5y2":{"state":"empty","correct":false},"x6y2":{"state":"empty","correct":false},"x7y2":{"state":"empty","correct":false},"x8y2":{"state":"filled","correct":true},"x9y2":{"state":"filledx","correct":false},"x10y2":{"state":"empty","correct":false},"x1y3":{"state":"empty","correct":false},"x2y3":{"state":"filledx","correct":false},"x3y3":{"state":"filled","correct":true},"x4y3":{"state":"filled","correct":true},"x5y3":{"state":"filled","correct":true},"x6y3":{"state":"filled","correct":true},"x7y3":{"state":"empty","correct":false},"x8y3":{"state":"filledx","correct":false},"x9y3":{"state":"filled","correct":true},"x10y3":{"state":"empty","correct":false},"x1y4":{"state":"empty","correct":false},"x2y4":{"state":"filled","correct":true},"x3y4":{"state":"empty","correct":false},"x4y4":{"state":"empty","correct":false},"x5y4":{"state":"filledx","correct":false},"x6y4":{"state":"empty","correct":false},"x7y4":{"state":"filled","correct":true},"x8y4":{"state":"empty","correct":false},"x9y4":{"state":"filled","correct":true},"x10y4":{"state":"filled","correct":true},"x1y5":{"state":"filled","correct":true},"x2y5":{"state":"filled","correct":true},"x3y5":{"state":"empty","correct":false},"x4y5":{"state":"filledx","correct":false},"x5y5":{"state":"filled","correct":true},"x6y5":{"state":"empty","correct":false},"x7y5":{"state":"filled","correct":true},"x8y5":{"state":"empty","correct":false},"x9y5":{"state":"filled","correct":true},"x10y5":{"state":"filledx","correct":false},"x1y6":{"state":"filledx","correct":false},"x2y6":{"state":"filled","correct":true},"x3y6":{"state":"empty","correct":false},"x4y6":{"state":"filled","correct":true},"x5y6":{"state":"filledx","correct":false},"x6y6":{"state":"empty","correct":false},"x7y6":{"state":"filled","correct":true},"x8y6":{"state":"empty","correct":false},"x9y6":{"state":"filled","correct":true},"x10y6":{"state":"filled","correct":true},"x1y7":{"state":"empty","correct":false},"x2y7":{"state":"filled","correct":true},"x3y7":{"state":"empty","correct":false},"x4y7":{"state":"filled","correct":true},"x5y7":{"state":"filled","correct":true},"x6y7":{"state":"filled","correct":true},"x7y7":{"state":"filled","correct":true},"x8y7":{"state":"filledx","correct":false},"x9y7":{"state":"filled","correct":true},"x10y7":{"state":"filledx","correct":false},"x1y8":{"state":"filled","correct":true},"x2y8":{"state":"filled","correct":true},"x3y8":{"state":"empty","correct":false},"x4y8":{"state":"empty","correct":false},"x5y8":{"state":"filledx","correct":false},"x6y8":{"state":"empty","correct":false},"x7y8":{"state":"empty","correct":false},"x8y8":{"state":"empty","correct":false},"x9y8":{"state":"filled","correct":true},"x10y8":{"state":"filled","correct":true},"x1y9":{"state":"filledx","correct":false},"x2y9":{"state":"empty","correct":false},"x3y9":{"state":"filled","correct":true},"x4y9":{"state":"filled","correct":true},"x5y9":{"state":"filled","correct":true},"x6y9":{"state":"filled","correct":true},"x7y9":{"state":"filled","correct":true},"x8y9":{"state":"filled","correct":true},"x9y9":{"state":"filledx","correct":false},"x10y9":{"state":"empty","correct":false},"x1y10":{"state":"empty","correct":false},"x2y10":{"state":"filled","correct":true},"x3y10":{"state":"filled","correct":true},"x4y10":{"state":"filled","correct":true},"x5y10":{"state":"filledx","correct":false},"x6y10":{"state":"filled","correct":true},"x7y10":{"state":"empty","correct":false},"x8y10":{"state":"empty","correct":false},"x9y10":{"state":"filledx","correct":false},"x10y10":{"state":"filled","correct":true}}';
//let level1x10NR = [[1,1],[3,1,3],[1,3,1],[1,1],[2,1],[4,1],[2,1],[8],[7],[7,3]];
levelObj.levels.level3.puzzles[0].grid = JSON.parse(level1x10);
levelObj.levels.level3.puzzles[0].rows =[[7,1],[1],[4,1],[1,1,2],[2,1,1,1],[1,1,1,2],[1,4,1],[2,2],[6],[3,1,1]];
levelObj.levels.level3.puzzles[0].columns =[[1,1,1],[1,5,1],[1,1,2],[1,1,2,2],[1,1,1,1,1],[1,1,1,2],[1,4,1],[1,1],[6],[1,1,1,1,1]];
let level2x10 = '';
//levelObj.levels.level3.puzzles[1].grid = JSON.parse(level2x10);
let level3x10 = '';
//levelObj.levels.level3.puzzles[2].grid = JSON.parse(level3x10);
let level4x10 = '';
//levelObj.levels.level3.puzzles[3].grid = JSON.parse(level4x10);


//liste over 15x15 levels------------------------------------------------
let level1x15 = '{"x1y1":{"state":"filledx","correct":false},"x2y1":{"state":"filled","correct":true},"x3y1":{"state":"filledx","correct":false},"x4y1":{"state":"empty","correct":false},"x5y1":{"state":"empty","correct":false},"x6y1":{"state":"empty","correct":false},"x7y1":{"state":"filledx","correct":false},"x8y1":{"state":"empty","correct":false},"x9y1":{"state":"filledx","correct":false},"x10y1":{"state":"empty","correct":false},"x11y1":{"state":"empty","correct":false},"x12y1":{"state":"filledx","correct":false},"x13y1":{"state":"filledx","correct":false},"x14y1":{"state":"filled","correct":true},"x15y1":{"state":"filledx","correct":false},"x1y2":{"state":"filled","correct":true},"x2y2":{"state":"filled","correct":true},"x3y2":{"state":"filled","correct":true},"x4y2":{"state":"empty","correct":false},"x5y2":{"state":"empty","correct":false},"x6y2":{"state":"filledx","correct":false},"x7y2":{"state":"empty","correct":false},"x8y2":{"state":"empty","correct":false},"x9y2":{"state":"filled","correct":true},"x10y2":{"state":"filledx","correct":false},"x11y2":{"state":"empty","correct":false},"x12y2":{"state":"empty","correct":false},"x13y2":{"state":"filled","correct":true},"x14y2":{"state":"filled","correct":true},"x15y2":{"state":"filled","correct":true},"x1y3":{"state":"empty","correct":false},"x2y3":{"state":"filled","correct":true},"x3y3":{"state":"empty","correct":false},"x4y3":{"state":"empty","correct":false},"x5y3":{"state":"empty","correct":false},"x6y3":{"state":"empty","correct":false},"x7y3":{"state":"filledx","correct":false},"x8y3":{"state":"filled","correct":true},"x9y3":{"state":"filled","correct":true},"x10y3":{"state":"filled","correct":true},"x11y3":{"state":"empty","correct":false},"x12y3":{"state":"empty","correct":false},"x13y3":{"state":"empty","correct":false},"x14y3":{"state":"filled","correct":true},"x15y3":{"state":"empty","correct":false},"x1y4":{"state":"empty","correct":false},"x2y4":{"state":"empty","correct":false},"x3y4":{"state":"empty","correct":false},"x4y4":{"state":"empty","correct":false},"x5y4":{"state":"filled","correct":true},"x6y4":{"state":"empty","correct":false},"x7y4":{"state":"empty","correct":false},"x8y4":{"state":"filledx","correct":false},"x9y4":{"state":"filled","correct":true},"x10y4":{"state":"filledx","correct":false},"x11y4":{"state":"empty","correct":false},"x12y4":{"state":"empty","correct":false},"x13y4":{"state":"empty","correct":false},"x14y4":{"state":"empty","correct":false},"x15y4":{"state":"empty","correct":false},"x1y5":{"state":"empty","correct":false},"x2y5":{"state":"filledx","correct":false},"x3y5":{"state":"empty","correct":false},"x4y5":{"state":"filled","correct":true},"x5y5":{"state":"filled","correct":true},"x6y5":{"state":"empty","correct":false},"x7y5":{"state":"empty","correct":false},"x8y5":{"state":"filledx","correct":false},"x9y5":{"state":"empty","correct":false},"x10y5":{"state":"empty","correct":false},"x11y5":{"state":"empty","correct":false},"x12y5":{"state":"filled","correct":true},"x13y5":{"state":"empty","correct":false},"x14y5":{"state":"filledx","correct":false},"x15y5":{"state":"filledx","correct":false},"x1y6":{"state":"empty","correct":false},"x2y6":{"state":"filled","correct":true},"x3y6":{"state":"filled","correct":true},"x4y6":{"state":"filled","correct":true},"x5y6":{"state":"filled","correct":true},"x6y6":{"state":"filledx","correct":false},"x7y6":{"state":"empty","correct":false},"x8y6":{"state":"filledx","correct":false},"x9y6":{"state":"empty","correct":false},"x10y6":{"state":"empty","correct":false},"x11y6":{"state":"empty","correct":false},"x12y6":{"state":"filled","correct":true},"x13y6":{"state":"empty","correct":false},"x14y6":{"state":"filledx","correct":false},"x15y6":{"state":"filledx","correct":false},"x1y7":{"state":"empty","correct":false},"x2y7":{"state":"empty","correct":false},"x3y7":{"state":"empty","correct":false},"x4y7":{"state":"filled","correct":true},"x5y7":{"state":"filled","correct":true},"x6y7":{"state":"empty","correct":false},"x7y7":{"state":"empty","correct":false},"x8y7":{"state":"empty","correct":false},"x9y7":{"state":"empty","correct":false},"x10y7":{"state":"empty","correct":false},"x11y7":{"state":"filledx","correct":false},"x12y7":{"state":"filled","correct":true},"x13y7":{"state":"empty","correct":false},"x14y7":{"state":"filledx","correct":false},"x15y7":{"state":"filledx","correct":false},"x1y8":{"state":"filledx","correct":false},"x2y8":{"state":"filledx","correct":false},"x3y8":{"state":"empty","correct":false},"x4y8":{"state":"filled","correct":true},"x5y8":{"state":"filled","correct":true},"x6y8":{"state":"filled","correct":true},"x7y8":{"state":"filled","correct":true},"x8y8":{"state":"filled","correct":true},"x9y8":{"state":"filled","correct":true},"x10y8":{"state":"filled","correct":true},"x11y8":{"state":"filled","correct":true},"x12y8":{"state":"filledx","correct":false},"x13y8":{"state":"empty","correct":false},"x14y8":{"state":"empty","correct":false},"x15y8":{"state":"empty","correct":false},"x1y9":{"state":"filledx","correct":false},"x2y9":{"state":"filledx","correct":false},"x3y9":{"state":"empty","correct":false},"x4y9":{"state":"filled","correct":true},"x5y9":{"state":"filled","correct":true},"x6y9":{"state":"filled","correct":true},"x7y9":{"state":"filled","correct":true},"x8y9":{"state":"filled","correct":true},"x9y9":{"state":"filled","correct":true},"x10y9":{"state":"filled","correct":true},"x11y9":{"state":"empty","correct":false},"x12y9":{"state":"empty","correct":false},"x13y9":{"state":"filledx","correct":false},"x14y9":{"state":"filled","correct":true},"x15y9":{"state":"empty","correct":false},"x1y10":{"state":"empty","correct":false},"x2y10":{"state":"empty","correct":false},"x3y10":{"state":"filledx","correct":false},"x4y10":{"state":"filled","correct":true},"x5y10":{"state":"filled","correct":true},"x6y10":{"state":"filled","correct":true},"x7y10":{"state":"filled","correct":true},"x8y10":{"state":"filled","correct":true},"x9y10":{"state":"filled","correct":true},"x10y10":{"state":"filled","correct":true},"x11y10":{"state":"empty","correct":false},"x12y10":{"state":"filledx","correct":false},"x13y10":{"state":"filled","correct":true},"x14y10":{"state":"filled","correct":true},"x15y10":{"state":"filled","correct":true},"x1y11":{"state":"empty","correct":false},"x2y11":{"state":"filledx","correct":false},"x3y11":{"state":"empty","correct":false},"x4y11":{"state":"filled","correct":true},"x5y11":{"state":"filled","correct":true},"x6y11":{"state":"filled","correct":true},"x7y11":{"state":"filled","correct":true},"x8y11":{"state":"filledx","correct":false},"x9y11":{"state":"filled","correct":true},"x10y11":{"state":"filled","correct":true},"x11y11":{"state":"filled","correct":true},"x12y11":{"state":"empty","correct":false},"x13y11":{"state":"empty","correct":false},"x14y11":{"state":"filled","correct":true},"x15y11":{"state":"filledx","correct":false},"x1y12":{"state":"empty","correct":false},"x2y12":{"state":"empty","correct":false},"x3y12":{"state":"empty","correct":false},"x4y12":{"state":"filled","correct":true},"x5y12":{"state":"empty","correct":false},"x6y12":{"state":"filled","correct":true},"x7y12":{"state":"empty","correct":false},"x8y12":{"state":"empty","correct":false},"x9y12":{"state":"filled","correct":true},"x10y12":{"state":"filled","correct":true},"x11y12":{"state":"filled","correct":true},"x12y12":{"state":"empty","correct":false},"x13y12":{"state":"empty","correct":false},"x14y12":{"state":"empty","correct":false},"x15y12":{"state":"empty","correct":false},"x1y13":{"state":"filledx","correct":false},"x2y13":{"state":"filledx","correct":false},"x3y13":{"state":"empty","correct":false},"x4y13":{"state":"filled","correct":true},"x5y13":{"state":"filledx","correct":false},"x6y13":{"state":"filled","correct":true},"x7y13":{"state":"empty","correct":false},"x8y13":{"state":"empty","correct":false},"x9y13":{"state":"filled","correct":true},"x10y13":{"state":"filledx","correct":false},"x11y13":{"state":"filled","correct":true},"x12y13":{"state":"filledx","correct":false},"x13y13":{"state":"filledx","correct":false},"x14y13":{"state":"filledx","correct":false},"x15y13":{"state":"empty","correct":false},"x1y14":{"state":"empty","correct":false},"x2y14":{"state":"empty","correct":false},"x3y14":{"state":"empty","correct":false},"x4y14":{"state":"filled","correct":true},"x5y14":{"state":"empty","correct":false},"x6y14":{"state":"filled","correct":true},"x7y14":{"state":"empty","correct":false},"x8y14":{"state":"empty","correct":false},"x9y14":{"state":"filled","correct":true},"x10y14":{"state":"empty","correct":false},"x11y14":{"state":"filled","correct":true},"x12y14":{"state":"empty","correct":false},"x13y14":{"state":"filledx","correct":false},"x14y14":{"state":"filledx","correct":false},"x15y14":{"state":"empty","correct":false},"x1y15":{"state":"empty","correct":false},"x2y15":{"state":"empty","correct":false},"x3y15":{"state":"filled","correct":true},"x4y15":{"state":"filledx","correct":false},"x5y15":{"state":"filled","correct":true},"x6y15":{"state":"empty","correct":false},"x7y15":{"state":"empty","correct":false},"x8y15":{"state":"filled","correct":true},"x9y15":{"state":"filledx","correct":false},"x10y15":{"state":"filled","correct":true},"x11y15":{"state":"empty","correct":false},"x12y15":{"state":"filledx","correct":false},"x13y15":{"state":"empty","correct":false},"x14y15":{"state":"empty","correct":false},"x15y15":{"state":"empty","correct":false}}';
levelObj.levels.level4.puzzles[0].grid = JSON.parse(level1x15);
let level2x15 = '{"x1y1":{"state":"empty","correct":false},"x2y1":{"state":"empty","correct":false},"x3y1":{"state":"filled","correct":true},"x4y1":{"state":"filled","correct":true},"x5y1":{"state":"filled","correct":true},"x6y1":{"state":"filled","correct":true},"x7y1":{"state":"filled","correct":true},"x8y1":{"state":"filled","correct":true},"x9y1":{"state":"filled","correct":true},"x10y1":{"state":"empty","correct":false},"x11y1":{"state":"empty","correct":false},"x12y1":{"state":"empty","correct":false},"x13y1":{"state":"filledx","correct":false},"x14y1":{"state":"empty","correct":false},"x15y1":{"state":"filledx","correct":false},"x1y2":{"state":"empty","correct":false},"x2y2":{"state":"filledx","correct":false},"x3y2":{"state":"filled","correct":true},"x4y2":{"state":"empty","correct":false},"x5y2":{"state":"filledx","correct":false},"x6y2":{"state":"filled","correct":true},"x7y2":{"state":"filledx","correct":false},"x8y2":{"state":"filledx","correct":false},"x9y2":{"state":"filled","correct":true},"x10y2":{"state":"filled","correct":true},"x11y2":{"state":"filled","correct":true},"x12y2":{"state":"filled","correct":true},"x13y2":{"state":"filled","correct":true},"x14y2":{"state":"filled","correct":true},"x15y2":{"state":"empty","correct":false},"x1y3":{"state":"empty","correct":false},"x2y3":{"state":"filled","correct":true},"x3y3":{"state":"filled","correct":true},"x4y3":{"state":"filled","correct":true},"x5y3":{"state":"filledx","correct":false},"x6y3":{"state":"filledx","correct":false},"x7y3":{"state":"empty","correct":false},"x8y3":{"state":"empty","correct":false},"x9y3":{"state":"empty","correct":false},"x10y3":{"state":"empty","correct":false},"x11y3":{"state":"filledx","correct":false},"x12y3":{"state":"empty","correct":false},"x13y3":{"state":"filled","correct":true},"x14y3":{"state":"empty","correct":false},"x15y3":{"state":"filledx","correct":false},"x1y4":{"state":"empty","correct":false},"x2y4":{"state":"filled","correct":true},"x3y4":{"state":"filled","correct":true},"x4y4":{"state":"filledx","correct":false},"x5y4":{"state":"filledx","correct":false},"x6y4":{"state":"filled","correct":true},"x7y4":{"state":"filledx","correct":false},"x8y4":{"state":"filled","correct":true},"x9y4":{"state":"empty","correct":false},"x10y4":{"state":"filled","correct":true},"x11y4":{"state":"empty","correct":false},"x12y4":{"state":"filled","correct":true},"x13y4":{"state":"filled","correct":true},"x14y4":{"state":"filled","correct":true},"x15y4":{"state":"empty","correct":false},"x1y5":{"state":"filledx","correct":false},"x2y5":{"state":"filledx","correct":false},"x3y5":{"state":"filled","correct":true},"x4y5":{"state":"filled","correct":true},"x5y5":{"state":"empty","correct":false},"x6y5":{"state":"filledx","correct":false},"x7y5":{"state":"filledx","correct":false},"x8y5":{"state":"empty","correct":false},"x9y5":{"state":"empty","correct":false},"x10y5":{"state":"filledx","correct":false},"x11y5":{"state":"filledx","correct":false},"x12y5":{"state":"empty","correct":false},"x13y5":{"state":"filled","correct":true},"x14y5":{"state":"empty","correct":false},"x15y5":{"state":"filledx","correct":false},"x1y6":{"state":"empty","correct":false},"x2y6":{"state":"filled","correct":true},"x3y6":{"state":"filled","correct":true},"x4y6":{"state":"empty","correct":false},"x5y6":{"state":"empty","correct":false},"x6y6":{"state":"filled","correct":true},"x7y6":{"state":"empty","correct":false},"x8y6":{"state":"empty","correct":false},"x9y6":{"state":"filled","correct":true},"x10y6":{"state":"filledx","correct":false},"x11y6":{"state":"empty","correct":false},"x12y6":{"state":"filled","correct":true},"x13y6":{"state":"filled","correct":true},"x14y6":{"state":"empty","correct":false},"x15y6":{"state":"empty","correct":false},"x1y7":{"state":"empty","correct":false},"x2y7":{"state":"filled","correct":true},"x3y7":{"state":"filled","correct":true},"x4y7":{"state":"filled","correct":true},"x5y7":{"state":"filled","correct":true},"x6y7":{"state":"filled","correct":true},"x7y7":{"state":"filled","correct":true},"x8y7":{"state":"filled","correct":true},"x9y7":{"state":"filled","correct":true},"x10y7":{"state":"filled","correct":true},"x11y7":{"state":"filled","correct":true},"x12y7":{"state":"filled","correct":true},"x13y7":{"state":"filled","correct":true},"x14y7":{"state":"empty","correct":false},"x15y7":{"state":"filledx","correct":false},"x1y8":{"state":"empty","correct":false},"x2y8":{"state":"empty","correct":false},"x3y8":{"state":"filledx","correct":false},"x4y8":{"state":"filled","correct":true},"x5y8":{"state":"filled","correct":true},"x6y8":{"state":"empty","correct":false},"x7y8":{"state":"filledx","correct":false},"x8y8":{"state":"filled","correct":true},"x9y8":{"state":"empty","correct":false},"x10y8":{"state":"filledx","correct":false},"x11y8":{"state":"empty","correct":false},"x12y8":{"state":"filledx","correct":false},"x13y8":{"state":"empty","correct":false},"x14y8":{"state":"filledx","correct":false},"x15y8":{"state":"empty","correct":false},"x1y9":{"state":"filledx","correct":false},"x2y9":{"state":"empty","correct":false},"x3y9":{"state":"empty","correct":false},"x4y9":{"state":"filled","correct":true},"x5y9":{"state":"filled","correct":true},"x6y9":{"state":"filledx","correct":false},"x7y9":{"state":"empty","correct":false},"x8y9":{"state":"empty","correct":false},"x9y9":{"state":"empty","correct":false},"x10y9":{"state":"filled","correct":true},"x11y9":{"state":"filled","correct":true},"x12y9":{"state":"filled","correct":true},"x13y9":{"state":"empty","correct":false},"x14y9":{"state":"empty","correct":false},"x15y9":{"state":"filledx","correct":false},"x1y10":{"state":"filledx","correct":false},"x2y10":{"state":"empty","correct":false},"x3y10":{"state":"filledx","correct":false},"x4y10":{"state":"filled","correct":true},"x5y10":{"state":"filled","correct":true},"x6y10":{"state":"filled","correct":true},"x7y10":{"state":"filled","correct":true},"x8y10":{"state":"empty","correct":false},"x9y10":{"state":"empty","correct":false},"x10y10":{"state":"filled","correct":true},"x11y10":{"state":"filledx","correct":false},"x12y10":{"state":"filled","correct":true},"x13y10":{"state":"empty","correct":false},"x14y10":{"state":"filledx","correct":false},"x15y10":{"state":"empty","correct":false},"x1y11":{"state":"empty","correct":false},"x2y11":{"state":"filledx","correct":false},"x3y11":{"state":"empty","correct":false},"x4y11":{"state":"filled","correct":true},"x5y11":{"state":"filled","correct":true},"x6y11":{"state":"filledx","correct":false},"x7y11":{"state":"empty","correct":false},"x8y11":{"state":"filledx","correct":false},"x9y11":{"state":"empty","correct":false},"x10y11":{"state":"filled","correct":true},"x11y11":{"state":"filled","correct":true},"x12y11":{"state":"filled","correct":true},"x13y11":{"state":"empty","correct":false},"x14y11":{"state":"filledx","correct":false},"x15y11":{"state":"empty","correct":false},"x1y12":{"state":"filledx","correct":false},"x2y12":{"state":"empty","correct":false},"x3y12":{"state":"empty","correct":false},"x4y12":{"state":"filled","correct":true},"x5y12":{"state":"filled","correct":true},"x6y12":{"state":"empty","correct":false},"x7y12":{"state":"empty","correct":false},"x8y12":{"state":"empty","correct":false},"x9y12":{"state":"empty","correct":false},"x10y12":{"state":"empty","correct":false},"x11y12":{"state":"filled","correct":true},"x12y12":{"state":"empty","correct":false},"x13y12":{"state":"filledx","correct":false},"x14y12":{"state":"empty","correct":false},"x15y12":{"state":"filledx","correct":false},"x1y13":{"state":"empty","correct":false},"x2y13":{"state":"filledx","correct":false},"x3y13":{"state":"empty","correct":false},"x4y13":{"state":"filled","correct":true},"x5y13":{"state":"filled","correct":true},"x6y13":{"state":"empty","correct":false},"x7y13":{"state":"empty","correct":false},"x8y13":{"state":"filledx","correct":false},"x9y13":{"state":"filled","correct":true},"x10y13":{"state":"filled","correct":true},"x11y13":{"state":"filled","correct":true},"x12y13":{"state":"filled","correct":true},"x13y13":{"state":"filled","correct":true},"x14y13":{"state":"empty","correct":false},"x15y13":{"state":"empty","correct":false},"x1y14":{"state":"filledx","correct":false},"x2y14":{"state":"filledx","correct":false},"x3y14":{"state":"filledx","correct":false},"x4y14":{"state":"filled","correct":true},"x5y14":{"state":"filled","correct":true},"x6y14":{"state":"empty","correct":false},"x7y14":{"state":"empty","correct":false},"x8y14":{"state":"empty","correct":false},"x9y14":{"state":"empty","correct":false},"x10y14":{"state":"filledx","correct":false},"x11y14":{"state":"filled","correct":true},"x12y14":{"state":"filledx","correct":false},"x13y14":{"state":"empty","correct":false},"x14y14":{"state":"filledx","correct":false},"x15y14":{"state":"filledx","correct":false},"x1y15":{"state":"filled","correct":true},"x2y15":{"state":"filled","correct":true},"x3y15":{"state":"filled","correct":true},"x4y15":{"state":"filled","correct":true},"x5y15":{"state":"filled","correct":true},"x6y15":{"state":"filled","correct":true},"x7y15":{"state":"filled","correct":true},"x8y15":{"state":"filled","correct":true},"x9y15":{"state":"filled","correct":true},"x10y15":{"state":"filled","correct":true},"x11y15":{"state":"filled","correct":true},"x12y15":{"state":"filled","correct":true},"x13y15":{"state":"filled","correct":true},"x14y15":{"state":"filled","correct":true},"x15y15":{"state":"filled","correct":true}}';
levelObj.levels.level4.puzzles[1].grid = JSON.parse(level2x15);
const obj = JSON.parse(level1x15);