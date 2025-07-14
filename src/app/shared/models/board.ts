import {Cell } from './cell'
export class Board {
    boardarray: Cell[][] = [];
    constructor(public size: number = 8){
        this.boardarray = this.newboard(size);
        this.initialpos();
    }

    private newboard(size: number){
        return Array.from({length:size}, () => Array.from({length:size}, () => (new Cell)));
    }
    private initialpos(){

    }
}

