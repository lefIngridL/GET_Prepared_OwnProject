const app = document.getElementById('app');
const row = [];
const column = [];
const rowEdge = [];
const columnEdge = [];
const converted = [];
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
                        x1y1: { "state": "empty", "correct": false },
                        x2y1: { "state": "empty", "correct": false },
                        x3y1: { "state": "empty", "correct": false },

                        x1y2: { "state": "empty", "correct": false },
                        x2y2: { "state": "empty", "correct": false },
                        x3y2: { "state": "empty", "correct": false },

                        x1y3: { "state": "empty", "correct": false },
                        x2y3: { "state": "empty", "correct": false },
                        x3y3: { "state": "empty", "correct": false },
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
                        x3y1: { "state": "empty", "correct": false },

                        x1y2: { "state": "empty", "correct": false },
                        x2y2: { "state": "empty", "correct": false },
                        x3y2: { "state": "empty", "correct": false },

                        x1y3: { "state": "empty", "correct": false },
                        x2y3: { "state": "empty", "correct": false },
                        x3y3: { "state": "empty", "correct": false },
                    }

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
                        x1y1: { "state": "empty", "correct": false },
                        x2y1: { "state": "empty", "correct": false  },
                        x3y1: { "state": "empty", "correct": false  },
                        x4y1: { "state": "empty", "correct": false  },
                        x5y1: { "state": "empty", "correct": false },

                        x1y2: { "state": "empty", "correct": false },
                        x2y2: { "state": "empty", "correct": false },
                        x3y2: { "state": "empty", "correct": false },
                        x4y2: { "state": "empty", "correct": false },
                        x5y2: { "state": "empty", "correct": false },

                        x1y3: { "state": "empty", "correct": false },
                        x2y3: { "state": "empty", "correct": false },
                        x3y3: { "state": "empty", "correct": false },
                        x4y3: { "state": "empty", "correct": false },
                        x5y3: { "state": "empty", "correct": false },

                        x1y4: { "state": "empty", "correct": false },
                        x2y4: { "state": "empty", "correct": false },
                        x3y4: { "state": "empty", "correct": false },
                        x4y4: { "state": "empty", "correct": false },
                        x5y4: { "state": "empty", "correct": false },

                        x1y5: { "state": "empty", "correct": false },
                        x2y5: { "state": "empty", "correct": false },
                        x3y5: { "state": "empty", "correct": false },
                        x4y5: { "state": "empty", "correct": false },
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
                        x3y1: { "state": "empty", "correct": false },
                        x4y1: { "state": "empty", "correct": false },
                        x5y1: { "state": "empty", "correct": false },

                        x1y2: { "state": "empty", "correct": false },
                        x2y2: { "state": "empty", "correct": false },
                        x3y2: { "state": "empty", "correct": false },
                        x4y2: { "state": "empty", "correct": false },
                        x5y2: { "state": "empty", "correct": false },

                        x1y3: { "state": "empty", "correct": false },
                        x2y3: { "state": "empty", "correct": false },
                        x3y3: { "state": "empty", "correct": false },
                        x4y3: { "state": "empty", "correct": false },
                        x5y3: { "state": "empty", "correct": false },

                        x1y4: { "state": "empty", "correct": false },
                        x2y4: { "state": "empty", "correct": false },
                        x3y4: { "state": "empty", "correct": false },
                        x4y4: { "state": "empty", "correct": false },
                        x5y4: { "state": "empty", "correct": false },

                        x1y5: { "state": "empty", "correct": false },
                        x2y5: { "state": "empty", "correct": false },
                        x3y5: { "state": "empty", "correct": false },
                        x4y5: { "state": "empty", "correct": false },
                        x5y5: { "state": "empty", "correct": false },
                    }

                }

            ]
        },
        level3: {
            puzzles: [
                {
                    id: 3.1,
                    size: 10,
                    rows: [[1,1], [3,1,3], [1, 3, 1], [1, 1], [2, 1], [4, 1], [2, 1], [8], [7], [7,3]],
                    columns: [[3], [1], [2], [1, 1], [], [], [], [], [], []],
                    grid:
                    {
                        x1y1: { "state": "empty", "correct": false },
                        x2y1: { "state": "empty", "correct": false },
                        x3y1: { "state": "empty", "correct": false },
                        x4y1: { "state": "empty", "correct": false },
                        x5y1: { "state": "empty", "correct": false },
                        x6y1: { "state": "empty", "correct": false },
                        x7y1: { "state": "empty", "correct": false },
                        x8y1: { "state": "empty", "correct": false },
                        x9y1: { "state": "empty", "correct": false },
                        x10y1: { "state": "empty", "correct": false },


                        x1y2: { "state": "empty", "correct": false },
                        x2y2: { "state": "empty", "correct": false },
                        x3y2: { "state": "empty", "correct": false },
                        x4y2: { "state": "empty", "correct": false },
                        x5y2: { "state": "empty", "correct": false },
                        x6y2: { "state": "empty", "correct": false },
                        x7y2: { "state": "empty", "correct": false },
                        x8y2: { "state": "empty", "correct": false },
                        x9y2: { "state": "empty", "correct": false },
                        x10y2: { "state": "empty", "correct": false },


                        x1y3: { "state": "empty", "correct": false },
                        x2y3: { "state": "empty", "correct": false },
                        x3y3: { "state": "empty", "correct": false },
                        x4y3: { "state": "empty", "correct": false },
                        x5y3: { "state": "empty", "correct": false },
                        x6y3: { "state": "empty", "correct": false },
                        x7y3: { "state": "empty", "correct": false },
                        x8y3: { "state": "empty", "correct": false },
                        x9y3: { "state": "empty", "correct": false },
                        x10y3: { "state": "empty", "correct": false },


                        x1y4: { "state": "empty", "correct": false },
                        x2y4: { "state": "empty", "correct": false },
                        x3y4: { "state": "empty", "correct": false },
                        x4y4: { "state": "empty", "correct": false },
                        x5y4: { "state": "empty", "correct": false },
                        x6y4: { "state": "empty", "correct": false },
                        x7y4: { "state": "empty", "correct": false },
                        x8y4: { "state": "empty", "correct": false },
                        x9y4: { "state": "empty", "correct": false },
                        x10y4: { "state": "empty", "correct": false },


                        x1y5: { "state": "empty", "correct": false },
                        x2y5: { "state": "empty", "correct": false },
                        x3y5: { "state": "empty", "correct": false },
                        x4y5: { "state": "empty", "correct": false },
                        x5y5: { "state": "empty", "correct": false },
                        x6y5: { "state": "empty", "correct": false },
                        x7y5: { "state": "empty", "correct": false },
                        x8y5: { "state": "empty", "correct": false },
                        x9y5: { "state": "empty", "correct": false },
                        x10y5: { "state": "empty", "correct": false },


                        x1y6: { "state": "empty", "correct": false },
                        x2y6: { "state": "empty", "correct": false },
                        x3y6: { "state": "empty", "correct": false },
                        x4y6: { "state": "empty", "correct": false },
                        x5y6: { "state": "empty", "correct": false },
                        x6y6: { "state": "empty", "correct": false },
                        x7y6: { "state": "empty", "correct": false },
                        x8y6: { "state": "empty", "correct": false },
                        x9y6: { "state": "empty", "correct": false },
                        x10y6: { "state": "empty", "correct": false },


                        x1y7: { "state": "empty", "correct": false },
                        x2y7: { "state": "empty", "correct": false },
                        x3y7: { "state": "empty", "correct": false },
                        x4y7: { "state": "empty", "correct": false },
                        x5y7: { "state": "empty", "correct": false },
                        x6y7: { "state": "empty", "correct": false },
                        x7y7: { "state": "empty", "correct": false },
                        x8y7: { "state": "empty", "correct": false },
                        x9y7: { "state": "empty", "correct": false },
                        x10y7: { "state": "empty", "correct": false },


                        x1y8: { "state": "empty", "correct": false },
                        x2y8: { "state": "empty", "correct": false },
                        x3y8: { "state": "empty", "correct": false },
                        x4y8: { "state": "empty", "correct": false },
                        x5y8: { "state": "empty", "correct": false },
                        x6y8: { "state": "empty", "correct": false },
                        x7y8: { "state": "empty", "correct": false },
                        x8y8: { "state": "empty", "correct": false },
                        x9y8: { "state": "empty", "correct": false },
                        x10y8: { "state": "empty", "correct": false },


                        x1y9: { "state": "empty", "correct": false },
                        x2y9: { "state": "empty", "correct": false },
                        x3y9: { "state": "empty", "correct": false },
                        x4y9: { "state": "empty", "correct": false },
                        x5y9: { "state": "empty", "correct": false },
                        x6y9: { "state": "empty", "correct": false },
                        x7y9: { "state": "empty", "correct": false },
                        x8y9: { "state": "empty", "correct": false },
                        x9y9: { "state": "empty", "correct": false },
                        x10y9: { "state": "empty", "correct": false },


                        x1y10: { "state": "empty", "correct": false },
                        x2y10: { "state": "empty", "correct": false },
                        x3y10: { "state": "empty", "correct": false },
                        x4y10: { "state": "empty", "correct": false },
                        x5y10: { "state": "empty", "correct": false },
                        x6y10: { "state": "empty", "correct": false },
                        x7y10: { "state": "empty", "correct": false },
                        x8y10: { "state": "empty", "correct": false },
                        x9y10: { "state": "empty", "correct": false },
                        x10y10: { "state": "empty", "correct": false },
                    }

                },
                {
                    id: 3.2,
                    size: 10,
                    rows: [[1], [2], [1, 1], [1, 1], [], [], [], [], [], []],
                    columns: [[2], [1], [1, 1], [1, 1], [], [], [], [], [], []],
                    grid:
                    {
                        x1y1: { "state": "empty", "correct": false },
                        x2y1: { "state": "empty", "correct": false },
                        x3y1: { "state": "empty", "correct": false },
                        x4y1: { "state": "empty", "correct": false },
                        x5y1: { "state": "empty", "correct": false },
                        x6y1: { "state": "empty", "correct": false },
                        x7y1: { "state": "empty", "correct": false },
                        x8y1: { "state": "empty", "correct": false },
                        x9y1: { "state": "empty", "correct": false },
                        x10y1: { "state": "empty", "correct": false },


                        x1y2: { "state": "empty", "correct": false },
                        x2y2: { "state": "empty", "correct": false },
                        x3y2: { "state": "empty", "correct": false },
                        x4y2: { "state": "empty", "correct": false },
                        x5y2: { "state": "empty", "correct": false },
                        x6y2: { "state": "empty", "correct": false },
                        x7y2: { "state": "empty", "correct": false },
                        x8y2: { "state": "empty", "correct": false },
                        x9y2: { "state": "empty", "correct": false },
                        x10y2: { "state": "empty", "correct": false },


                        x1y3: { "state": "empty", "correct": false },
                        x2y3: { "state": "empty", "correct": false },
                        x3y3: { "state": "empty", "correct": false },
                        x4y3: { "state": "empty", "correct": false },
                        x5y3: { "state": "empty", "correct": false },
                        x6y3: { "state": "empty", "correct": false },
                        x7y3: { "state": "empty", "correct": false },
                        x8y3: { "state": "empty", "correct": false },
                        x9y3: { "state": "empty", "correct": false },
                        x10y3: { "state": "empty", "correct": false },


                        x1y4: { "state": "empty", "correct": false },
                        x2y4: { "state": "empty", "correct": false },
                        x3y4: { "state": "empty", "correct": false },
                        x4y4: { "state": "empty", "correct": false },
                        x5y4: { "state": "empty", "correct": false },
                        x6y4: { "state": "empty", "correct": false },
                        x7y4: { "state": "empty", "correct": false },
                        x8y4: { "state": "empty", "correct": false },
                        x9y4: { "state": "empty", "correct": false },
                        x10y4: { "state": "empty", "correct": false },


                        x1y5: { "state": "empty", "correct": false },
                        x2y5: { "state": "empty", "correct": false },
                        x3y5: { "state": "empty", "correct": false },
                        x4y5: { "state": "empty", "correct": false },
                        x5y5: { "state": "empty", "correct": false },
                        x6y5: { "state": "empty", "correct": false },
                        x7y5: { "state": "empty", "correct": false },
                        x8y5: { "state": "empty", "correct": false },
                        x9y5: { "state": "empty", "correct": false },
                        x10y5: { "state": "empty", "correct": false },


                        x1y6: { "state": "empty", "correct": false },
                        x2y6: { "state": "empty", "correct": false },
                        x3y6: { "state": "empty", "correct": false },
                        x4y6: { "state": "empty", "correct": false },
                        x5y6: { "state": "empty", "correct": false },
                        x6y6: { "state": "empty", "correct": false },
                        x7y6: { "state": "empty", "correct": false },
                        x8y6: { "state": "empty", "correct": false },
                        x9y6: { "state": "empty", "correct": false },
                        x10y6: { "state": "empty", "correct": false },


                        x1y7: { "state": "empty", "correct": false },
                        x2y7: { "state": "empty", "correct": false },
                        x3y7: { "state": "empty", "correct": false },
                        x4y7: { "state": "empty", "correct": false },
                        x5y7: { "state": "empty", "correct": false },
                        x6y7: { "state": "empty", "correct": false },
                        x7y7: { "state": "empty", "correct": false },
                        x8y7: { "state": "empty", "correct": false },
                        x9y7: { "state": "empty", "correct": false },
                        x10y7: { "state": "empty", "correct": false },


                        x1y8: { "state": "empty", "correct": false },
                        x2y8: { "state": "empty", "correct": false },
                        x3y8: { "state": "empty", "correct": false },
                        x4y8: { "state": "empty", "correct": false },
                        x5y8: { "state": "empty", "correct": false },
                        x6y8: { "state": "empty", "correct": false },
                        x7y8: { "state": "empty", "correct": false },
                        x8y8: { "state": "empty", "correct": false },
                        x9y8: { "state": "empty", "correct": false },
                        x10y8: { "state": "empty", "correct": false },


                        x1y9: { "state": "empty", "correct": false },
                        x2y9: { "state": "empty", "correct": false },
                        x3y9: { "state": "empty", "correct": false },
                        x4y9: { "state": "empty", "correct": false },
                        x5y9: { "state": "empty", "correct": false },
                        x6y9: { "state": "empty", "correct": false },
                        x7y9: { "state": "empty", "correct": false },
                        x8y9: { "state": "empty", "correct": false },
                        x9y9: { "state": "empty", "correct": false },
                        x10y9: { "state": "empty", "correct": false },


                        x1y10: { "state": "empty", "correct": false },
                        x2y10: { "state": "empty", "correct": false },
                        x3y10: { "state": "empty", "correct": false },
                        x4y10: { "state": "empty", "correct": false },
                        x5y10: { "state": "empty", "correct": false },
                        x6y10: { "state": "empty", "correct": false },
                        x7y10: { "state": "empty", "correct": false },
                        x8y10: { "state": "empty", "correct": false },
                        x9y10: { "state": "empty", "correct": false },
                        x10y10: { "state": "empty", "correct": false },
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
                    columns: [[3], [3,1], [1, 1, 1], [10], [8, 1], [7], [4], [1, 3, 1], [3, 7], [1, 5, 1], [1, 4], [3], [1, 1], [3,3], [1,1]],
                    grid:
                    {
                        x1y1: { "state": "empty", "correct": false },
                        x2y1: { "state": "empty", "correct": false },
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
                        x14y1: { "state": "empty", "correct": false },
                        x15y1: { "state": "empty", "correct": false },


                        x1y2: { "state": "empty", "correct": false },
                        x2y2: { "state": "empty", "correct": false },
                        x3y2: { "state": "empty", "correct": false },
                        x4y2: { "state": "empty", "correct": false },
                        x5y2: { "state": "empty", "correct": false },
                        x6y2: { "state": "empty", "correct": false },
                        x7y2: { "state": "empty", "correct": false },
                        x8y2: { "state": "empty", "correct": false },
                        x9y2: { "state": "empty", "correct": false },
                        x10y2: { "state": "empty", "correct": false },
                        x11y2: { "state": "empty", "correct": false },
                        x12y2: { "state": "empty", "correct": false },
                        x13y2: { "state": "empty", "correct": false },
                        x14y2: { "state": "empty", "correct": false },
                        x15y2: { "state": "empty", "correct": false },


                        x1y3: { "state": "empty", "correct": false },
                        x2y3: { "state": "empty", "correct": false },
                        x3y3: { "state": "empty", "correct": false },
                        x4y3: { "state": "empty", "correct": false },
                        x5y3: { "state": "empty", "correct": false },
                        x6y3: { "state": "empty", "correct": false },
                        x7y3: { "state": "empty", "correct": false },
                        x8y3: { "state": "empty", "correct": false },
                        x9y3: { "state": "empty", "correct": false },
                        x10y3: { "state": "empty", "correct": false },
                        x11y3: { "state": "empty", "correct": false },
                        x12y3: { "state": "empty", "correct": false },
                        x13y3: { "state": "empty", "correct": false },
                        x14y3: { "state": "empty", "correct": false },
                        x15y3: { "state": "empty", "correct": false },


                        x1y4: { "state": "empty", "correct": false},
                        x2y4: { "state": "empty", "correct": false },
                        x3y4: { "state": "empty", "correct": false },
                        x4y4: { "state": "empty", "correct": false },
                        x5y4: { "state": "empty", "correct": false },
                        x6y4: { "state": "empty", "correct": false },
                        x7y4: { "state": "empty", "correct": false },
                        x8y4: { "state": "empty", "correct": false },
                        x9y4: { "state": "empty", "correct": false },
                        x10y4: { "state": "empty", "correct": false },
                        x11y4: { "state": "empty", "correct": false },
                        x12y4: { "state": "empty", "correct": false },
                        x13y4: { "state": "empty", "correct": false },
                        x14y4: { "state": "empty", "correct": false },
                        x15y4: { "state": "empty", "correct": false },


                        x1y5: { "state": "empty", "correct": false },
                        x2y5: { "state": "empty", "correct": false },
                        x3y5: { "state": "empty", "correct": false },
                        x4y5: { "state": "empty", "correct": false },
                        x5y5: { "state": "empty", "correct": false },
                        x6y5: { "state": "empty", "correct": false },
                        x7y5: { "state": "empty", "correct": false },
                        x8y5: { "state": "empty", "correct": false },
                        x9y5: { "state": "empty", "correct": false },
                        x10y5: { "state": "empty", "correct": false },
                        x11y5: { "state": "empty", "correct": false },
                        x12y5: { "state": "empty", "correct": false },
                        x13y5: { "state": "empty", "correct": false },
                        x14y5: { "state": "empty", "correct": false },
                        x15y5: { "state": "empty", "correct": false },


                        x1y6: { "state": "empty", "correct": false },
                        x2y6: { "state": "empty", "correct": false },
                        x3y6: { "state": "empty", "correct": false },
                        x4y6: { "state": "empty", "correct": false },
                        x5y6: { "state": "empty", "correct": false },
                        x6y6: { "state": "empty", "correct": false },
                        x7y6: { "state": "empty", "correct": false },
                        x8y6: { "state": "empty", "correct": false },
                        x9y6: { "state": "empty", "correct": false },
                        x10y6: { "state": "empty", "correct": false },
                        x11y6: { "state": "empty", "correct": false },
                        x12y6: { "state": "empty", "correct": false },
                        x13y6: { "state": "empty", "correct": false },
                        x14y6: { "state": "empty", "correct": false },
                        x15y6: { "state": "empty", "correct": false },


                        x1y7: { "state": "empty", "correct": false },
                        x2y7: { "state": "empty", "correct": false },
                        x3y7: { "state": "empty", "correct": false },
                        x4y7: { "state": "empty", "correct": false },
                        x5y7: { "state": "empty", "correct": false },
                        x6y7: { "state": "empty", "correct": false },
                        x7y7: { "state": "empty", "correct": false },
                        x8y7: { "state": "empty", "correct": false },
                        x9y7: { "state": "empty", "correct": false },
                        x10y7: { "state": "empty", "correct": false },
                        x11y7: { "state": "empty", "correct": false },
                        x12y7: { "state": "empty", "correct": false },
                        x13y7: { "state": "empty", "correct": false },
                        x14y7: { "state": "empty", "correct": false },
                        x15y7: { "state": "empty", "correct": false },


                        x1y8: { "state": "empty", "correct": false },
                        x2y8: { "state": "empty", "correct": false },
                        x3y8: { "state": "empty", "correct": false },
                        x4y8: { "state": "empty", "correct": false },
                        x5y8: { "state": "empty", "correct": false },
                        x6y8: { "state": "empty", "correct": false },
                        x7y8: { "state": "empty", "correct": false },
                        x8y8: { "state": "empty", "correct": false },
                        x9y8: { "state": "empty", "correct": false },
                        x10y8: { "state": "empty", "correct": false },
                        x11y8: { "state": "empty", "correct": false },
                        x12y8: { "state": "empty", "correct": false },
                        x13y8: { "state": "empty", "correct": false },
                        x14y8: { "state": "empty", "correct": false },
                        x15y8: { "state": "empty", "correct": false },


                        x1y9: { "state": "empty", "correct": false },
                        x2y9: { "state": "empty", "correct": false },
                        x3y9: { "state": "empty", "correct": false },
                        x4y9: { "state": "empty", "correct": false },
                        x5y9: { "state": "empty", "correct": false },
                        x6y9: { "state": "empty", "correct": false },
                        x7y9: { "state": "empty", "correct": false },
                        x8y9: { "state": "empty", "correct": false },
                        x9y9: { "state": "empty", "correct": false },
                        x10y9: { "state": "empty", "correct": false },
                        x11y9: { "state": "empty", "correct": false },
                        x12y9: { "state": "empty", "correct": false },
                        x13y9: { "state": "empty", "correct": false },
                        x14y9: { "state": "empty", "correct": false },
                        x15y9: { "state": "empty", "correct": false },


                        x1y10: { "state": "empty", "correct": false },
                        x2y10: { "state": "empty", "correct": false },
                        x3y10: { "state": "empty", "correct": false },
                        x4y10: { "state": "empty", "correct": false },
                        x5y10: { "state": "empty", "correct": false },
                        x6y10: { "state": "empty", "correct": false },
                        x7y10: { "state": "empty", "correct": false },
                        x8y10: { "state": "empty", "correct": false },
                        x9y10: { "state": "empty", "correct": false },
                        x10y10: { "state": "empty", "correct": false },
                        x11y10: { "state": "empty", "correct": false },
                        x12y10: { "state": "empty", "correct": false },
                        x13y10: { "state": "empty", "correct": false },
                        x14y10: { "state": "empty", "correct": false },
                        x15y10: { "state": "empty", "correct": false },

                        
                        x1y11: { "state": "empty", "correct": false },
                        x2y11: { "state": "empty", "correct": false },
                        x3y11: { "state": "empty", "correct": false },
                        x4y11: { "state": "empty", "correct": false },
                        x5y11: { "state": "empty", "correct": false },
                        x6y11: { "state": "empty", "correct": false },
                        x7y11: { "state": "empty", "correct": false },
                        x8y11: { "state": "empty", "correct": false },
                        x9y11: { "state": "empty", "correct": false },
                        x10y11: { "state": "empty", "correct": false },
                        x11y11: { "state": "empty", "correct": false },
                        x12y11: { "state": "empty", "correct": false },
                        x13y11: { "state": "empty", "correct": false },
                        x14y11: { "state": "empty", "correct": false },
                        x15y11: { "state": "empty", "correct": false },

                        
                        x1y12: { "state": "empty", "correct": false },
                        x2y12: { "state": "empty", "correct": false },
                        x3y12: { "state": "empty", "correct": false },
                        x4y12: { "state": "empty", "correct": false },
                        x5y12: { "state": "empty", "correct": false },
                        x6y12: { "state": "empty", "correct": false },
                        x7y12: { "state": "empty", "correct": false },
                        x8y12: { "state": "empty", "correct": false },
                        x9y12: { "state": "empty", "correct": false },
                        x10y12: { "state": "empty", "correct": false },
                        x11y12: { "state": "empty", "correct": false },
                        x12y12: { "state": "empty", "correct": false },
                        x13y12: { "state": "empty", "correct": false },
                        x14y12: { "state": "empty", "correct": false },
                        x15y12: { "state": "empty", "correct": false },

                        
                        x1y13: { "state": "empty", "correct": false },
                        x2y13: { "state": "empty", "correct": false },
                        x3y13: { "state": "empty", "correct": false },
                        x4y13: { "state": "empty", "correct": false },
                        x5y13: { "state": "empty", "correct": false },
                        x6y13: { "state": "empty", "correct": false },
                        x7y13: { "state": "empty", "correct": false },
                        x8y13: { "state": "empty", "correct": false },
                        x9y13: { "state": "empty", "correct": false },
                        x10y13: { "state": "empty", "correct": false },
                        x11y13: { "state": "empty", "correct": false },
                        x12y13: { "state": "empty", "correct": false },
                        x13y13: { "state": "empty", "correct": false },
                        x14y13: { "state": "empty", "correct": false },
                        x15y13: { "state": "empty", "correct": false },

                        
                        x1y14: { "state": "empty", "correct": false },
                        x2y14: { "state": "empty", "correct": false },
                        x3y14: { "state": "empty", "correct": false },
                        x4y14: { "state": "empty", "correct": false },
                        x5y14: { "state": "empty", "correct": false },
                        x6y14: { "state": "empty", "correct": false },
                        x7y14: { "state": "empty", "correct": false },
                        x8y14: { "state": "empty", "correct": false },
                        x9y14: { "state": "empty", "correct": false },
                        x10y14: { "state": "empty", "correct": false },
                        x11y14: { "state": "empty", "correct": false },
                        x12y14: { "state": "empty", "correct": false },
                        x13y14: { "state": "empty", "correct": false },
                        x14y14: { "state": "empty", "correct": false },
                        x15y14: { "state": "empty", "correct": false },

                        
                        x1y15: { "state": "empty", "correct": false },
                        x2y15: { "state": "empty", "correct": false },
                        x3y15: { "state": "empty", "correct": false },
                        x4y15: { "state": "empty", "correct": false },
                        x5y15: { "state": "empty", "correct": false },
                        x6y15: { "state": "empty", "correct": false },
                        x7y15: { "state": "empty", "correct": false },
                        x8y15: { "state": "empty", "correct": false },
                        x9y15: { "state": "empty", "correct": false },
                        x10y15: { "state": "empty", "correct": false },
                        x11y15: { "state": "empty", "correct": false },
                        x12y15: { "state": "empty", "correct": false },
                        x13y15: { "state": "empty", "correct": false },
                        x14y15: { "state": "empty", "correct": false },
                        x15y15: { "state": "empty", "correct": false },

                        
                    }

                },
                {
                    id: 4.2,
                    size: 15,
                    rows: [[1], [2], [2], [1, 1], [1, 1], [], [], [], [], [], [], [], [], [], []],
                    columns: [[2], [1], [2], [1, 1], [1, 1], [], [], [], [], [], [], [], [], [], []],
                    grid:
                    {
                        x1y1: { "state": "empty", "correct": false },
                        x2y1: { "state": "empty", "correct": false },
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
                        x14y1: { "state": "empty", "correct": false },
                        x15y1: { "state": "empty", "correct": false },


                        x1y2: { "state": "empty", "correct": false },
                        x2y2: { "state": "empty", "correct": false },
                        x3y2: { "state": "empty", "correct": false },
                        x4y2: { "state": "empty", "correct": false },
                        x5y2: { "state": "empty", "correct": false },
                        x6y2: { "state": "empty", "correct": false },
                        x7y2: { "state": "empty", "correct": false },
                        x8y2: { "state": "empty", "correct": false },
                        x9y2: { "state": "empty", "correct": false },
                        x10y2: { "state": "empty", "correct": false },
                        x11y2: { "state": "empty", "correct": false },
                        x12y2: { "state": "empty", "correct": false },
                        x13y2: { "state": "empty", "correct": false },
                        x14y2: { "state": "empty", "correct": false },
                        x15y2: { "state": "empty", "correct": false },


                        x1y3: { "state": "empty", "correct": false },
                        x2y3: { "state": "empty", "correct": false },
                        x3y3: { "state": "empty", "correct": false },
                        x4y3: { "state": "empty", "correct": false },
                        x5y3: { "state": "empty", "correct": false },
                        x6y3: { "state": "empty", "correct": false },
                        x7y3: { "state": "empty", "correct": false },
                        x8y3: { "state": "empty", "correct": false },
                        x9y3: { "state": "empty", "correct": false },
                        x10y3: { "state": "empty", "correct": false },
                        x11y3: { "state": "empty", "correct": false },
                        x12y3: { "state": "empty", "correct": false },
                        x13y3: { "state": "empty", "correct": false },
                        x14y3: { "state": "empty", "correct": false },
                        x15y3: { "state": "empty", "correct": false },


                        x1y4: { "state": "empty", "correct": false },
                        x2y4: { "state": "empty", "correct": false },
                        x3y4: { "state": "empty", "correct": false },
                        x4y4: { "state": "empty", "correct": false },
                        x5y4: { "state": "empty", "correct": false },
                        x6y4: { "state": "empty", "correct": false },
                        x7y4: { "state": "empty", "correct": false },
                        x8y4: { "state": "empty", "correct": false },
                        x9y4: { "state": "empty", "correct": false },
                        x10y4: { "state": "empty", "correct": false },
                        x11y4: { "state": "empty", "correct": false },
                        x12y4: { "state": "empty", "correct": false },
                        x13y4: { "state": "empty", "correct": false },
                        x14y4: { "state": "empty", "correct": false },
                        x15y4: { "state": "empty", "correct": false },


                        x1y5: { "state": "empty", "correct": false },
                        x2y5: { "state": "empty", "correct": false },
                        x3y5: { "state": "empty", "correct": false },
                        x4y5: { "state": "empty", "correct": false },
                        x5y5: { "state": "empty", "correct": false },
                        x6y5: { "state": "empty", "correct": false },
                        x7y5: { "state": "empty", "correct": false },
                        x8y5: { "state": "empty", "correct": false },
                        x9y5: { "state": "empty", "correct": false },
                        x10y5: { "state": "empty", "correct": false },
                        x11y5: { "state": "empty", "correct": false },
                        x12y5: { "state": "empty", "correct": false },
                        x13y5: { "state": "empty", "correct": false },
                        x14y5: { "state": "empty", "correct": false },
                        x15y5: { "state": "empty", "correct": false },


                        x1y6: { "state": "empty", "correct": false },
                        x2y6: { "state": "empty", "correct": false },
                        x3y6: { "state": "empty", "correct": false },
                        x4y6: { "state": "empty", "correct": false },
                        x5y6: { "state": "empty", "correct": false },
                        x6y6: { "state": "empty", "correct": false },
                        x7y6: { "state": "empty", "correct": false },
                        x8y6: { "state": "empty", "correct": false },
                        x9y6: { "state": "empty", "correct": false },
                        x10y6: { "state": "empty", "correct": false },
                        x11y6: { "state": "empty", "correct": false },
                        x12y6: { "state": "empty", "correct": false },
                        x13y6: { "state": "empty", "correct": false },
                        x14y6: { "state": "empty", "correct": false },
                        x15y6: { "state": "empty", "correct": false },


                        x1y7: { "state": "empty", "correct": false },
                        x2y7: { "state": "empty", "correct": false },
                        x3y7: { "state": "empty", "correct": false },
                        x4y7: { "state": "empty", "correct": false },
                        x5y7: { "state": "empty", "correct": false },
                        x6y7: { "state": "empty", "correct": false },
                        x7y7: { "state": "empty", "correct": false },
                        x8y7: { "state": "empty", "correct": false },
                        x9y7: { "state": "empty", "correct": false },
                        x10y7: { "state": "empty", "correct": false },
                        x11y7: { "state": "empty", "correct": false },
                        x12y7: { "state": "empty", "correct": false },
                        x13y7: { "state": "empty", "correct": false },
                        x14y7: { "state": "empty", "correct": false },
                        x15y7: { "state": "empty", "correct": false },


                        x1y8: { "state": "empty", "correct": false },
                        x2y8: { "state": "empty", "correct": false },
                        x3y8: { "state": "empty", "correct": false },
                        x4y8: { "state": "empty", "correct": false },
                        x5y8: { "state": "empty", "correct": false },
                        x6y8: { "state": "empty", "correct": false },
                        x7y8: { "state": "empty", "correct": false },
                        x8y8: { "state": "empty", "correct": false },
                        x9y8: { "state": "empty", "correct": false },
                        x10y8: { "state": "empty", "correct": false },
                        x11y8: { "state": "empty", "correct": false },
                        x12y8: { "state": "empty", "correct": false },
                        x13y8: { "state": "empty", "correct": false },
                        x14y8: { "state": "empty", "correct": false },
                        x15y8: { "state": "empty", "correct": false },


                        x1y9: { "state": "empty", "correct": false },
                        x2y9: { "state": "empty", "correct": false },
                        x3y9: { "state": "empty", "correct": false },
                        x4y9: { "state": "empty", "correct": false },
                        x5y9: { "state": "empty", "correct": false },
                        x6y9: { "state": "empty", "correct": false },
                        x7y9: { "state": "empty", "correct": false },
                        x8y9: { "state": "empty", "correct": false },
                        x9y9: { "state": "empty", "correct": false },
                        x10y9: { "state": "empty", "correct": false },
                        x11y9: { "state": "empty", "correct": false },
                        x12y9: { "state": "empty", "correct": false },
                        x13y9: { "state": "empty", "correct": false },
                        x14y9: { "state": "empty", "correct": false },
                        x15y9: { "state": "empty", "correct": false },


                        x1y10: { "state": "empty", "correct": false },
                        x2y10: { "state": "empty", "correct": false },
                        x3y10: { "state": "empty", "correct": false },
                        x4y10: { "state": "empty", "correct": false },
                        x5y10: { "state": "empty", "correct": false },
                        x6y10: { "state": "empty", "correct": false },
                        x7y10: { "state": "empty", "correct": false },
                        x8y10: { "state": "empty", "correct": false },
                        x9y10: { "state": "empty", "correct": false },
                        x10y10: { "state": "empty", "correct": false },
                        x11y10: { "state": "empty", "correct": false },
                        x12y10: { "state": "empty", "correct": false },
                        x13y10: { "state": "empty", "correct": false },
                        x14y10: { "state": "empty", "correct": false },
                        x15y10: { "state": "empty", "correct": false },

                        
                        x1y11: { "state": "empty", "correct": false },
                        x2y11: { "state": "empty", "correct": false },
                        x3y11: { "state": "empty", "correct": false },
                        x4y11: { "state": "empty", "correct": false },
                        x5y11: { "state": "empty", "correct": false },
                        x6y11: { "state": "empty", "correct": false },
                        x7y11: { "state": "empty", "correct": false },
                        x8y11: { "state": "empty", "correct": false },
                        x9y11: { "state": "empty", "correct": false },
                        x10y11: { "state": "empty", "correct": false },
                        x11y11: { "state": "empty", "correct": false },
                        x12y11: { "state": "empty", "correct": false },
                        x13y11: { "state": "empty", "correct": false },
                        x14y11: { "state": "empty", "correct": false },
                        x15y11: { "state": "empty", "correct": false },

                        
                        x1y12: { "state": "empty", "correct": false },
                        x2y12: { "state": "empty", "correct": false },
                        x3y12: { "state": "empty", "correct": false },
                        x4y12: { "state": "empty", "correct": false },
                        x5y12: { "state": "empty", "correct": false },
                        x6y12: { "state": "empty", "correct": false },
                        x7y12: { "state": "empty", "correct": false },
                        x8y12: { "state": "empty", "correct": false },
                        x9y12: { "state": "empty", "correct": false },
                        x10y12: { "state": "empty", "correct": false },
                        x11y12: { "state": "empty", "correct": false },
                        x12y12: { "state": "empty", "correct": false },
                        x13y12: { "state": "empty", "correct": false },
                        x14y12: { "state": "empty", "correct": false },
                        x15y12: { "state": "empty", "correct": false },

                        
                        x1y13: { "state": "empty", "correct": false },
                        x2y13: { "state": "empty", "correct": false },
                        x3y13: { "state": "empty", "correct": false },
                        x4y13: { "state": "empty", "correct": false },
                        x5y13: { "state": "empty", "correct": false },
                        x6y13: { "state": "empty", "correct": false },
                        x7y13: { "state": "empty", "correct": false },
                        x8y13: { "state": "empty", "correct": false },
                        x9y13: { "state": "empty", "correct": false },
                        x10y13: { "state": "empty", "correct": false },
                        x11y13: { "state": "empty", "correct": false },
                        x12y13: { "state": "empty", "correct": false },
                        x13y13: { "state": "empty", "correct": false },
                        x14y13: { "state": "empty", "correct": false },
                        x15y13: { "state": "empty", "correct": false },

                        
                        x1y14: { "state": "empty", "correct": false },
                        x2y14: { "state": "empty", "correct": false },
                        x3y14: { "state": "empty", "correct": false },
                        x4y14: { "state": "empty", "correct": false },
                        x5y14: { "state": "empty", "correct": false },
                        x6y14: { "state": "empty", "correct": false },
                        x7y14: { "state": "empty", "correct": false },
                        x8y14: { "state": "empty", "correct": false },
                        x9y14: { "state": "empty", "correct": false },
                        x10y14: { "state": "empty", "correct": false },
                        x11y14: { "state": "empty", "correct": false },
                        x12y14: { "state": "empty", "correct": false },
                        x13y14: { "state": "empty", "correct": false },
                        x14y14: { "state": "empty", "correct": false },
                        x15y14: { "state": "empty", "correct": false },

                        
                        x1y15: { "state": "empty", "correct": false },
                        x2y15: { "state": "empty", "correct": false },
                        x3y15: { "state": "empty", "correct": false },
                        x4y15: { "state": "empty", "correct": false },
                        x5y15: { "state": "empty", "correct": false },
                        x6y15: { "state": "empty", "correct": false },
                        x7y15: { "state": "empty", "correct": false },
                        x8y15: { "state": "empty", "correct": false },
                        x9y15: { "state": "empty", "correct": false },
                        x10y15: { "state": "empty", "correct": false },
                        x11y15: { "state": "empty", "correct": false },
                        x12y15: { "state": "empty", "correct": false },
                        x13y15: { "state": "empty", "correct": false },
                        x14y15: { "state": "empty", "correct": false },
                        x15y15: { "state": "empty", "correct": false },
                    }

                }

            ]
        }
    }
};
