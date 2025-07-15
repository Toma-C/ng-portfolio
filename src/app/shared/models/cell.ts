export class Cell {
    x: number;
    y: number;
    state: 'empty' | 'black' | 'white';
    constructor(x:number = -1, y:number =-1,state: 'empty' | 'black' | 'white' = 'empty'){
        this.state = state;
        this.x = x;
        this.y = y;
    }
}
