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

const LevelObj = {

    level1: {
        puzzles: [
            {
                id: null,
                size: 3,
                rows: [[], [], []],
                columns: [[], [], []],
                grid:
                    [
                        [0, 0, 0],
                        [0, 0, 0],
                        [0, 0, 0]
                    ]
            },

        ]
    },
    level2: {
        puzzles: [
            {
                id: null,
                size: 5,
                rows: [[], [], []],
                columns: [[], [], []],
                grid:
                    [
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                    ]
            },

        ]
    },
    level3: {
        puzzles: [
            {
                id: null,
                size: 10,
                rows: [[], [], []],
                columns: [[], [], []],
                grid:
                    [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ]
            },

        ]
    },
    level4: {
        puzzles: [
            {
                id: null,
                size: 15,
                rows: [[], [], []],
                columns: [[], [], []],
                grid:
                    [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    ]
            },

        ]
    },

}