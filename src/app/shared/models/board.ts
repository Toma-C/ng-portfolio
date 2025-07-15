import {Cell } from './cell'
export class Board {
    boardarray: Cell[][] = [];
    constructor(public size: number = 8){
        this.boardarray = this.newboard(size);
        this.initialize();
    }

    private newboard(size: number){
        let arr = Array.from({length:size}, (x,i) => Array.from({length:size}, (y,j) => new Cell(j,i) ));

        return arr;

    }
    private initialize(){

        let mid :number = this.size/2;
        this.boardarray[mid][mid].state = 'white';
        this.boardarray[mid-1][mid-1].state = 'white';
        this.boardarray[mid-1][mid].state = 'black';
        this.boardarray[mid][mid-1].state = 'black';

    }
}

