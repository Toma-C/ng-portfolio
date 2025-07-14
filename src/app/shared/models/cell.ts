export class Cell {
    state: 'empty' | 'black' | 'white';
    highlight?: boolean;
    ispossiblemove?: boolean;
    constructor(state: 'empty' | 'black' | 'white' = 'empty'){
        this.state = state;
    }
}
