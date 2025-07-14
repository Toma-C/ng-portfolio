import { Injectable } from '@angular/core';
import {Board} from 'src/app/shared/models/board';

@Injectable({
  providedIn: 'root'
})
export class ReversiService {
    board = new Board(8);
    boardAt(x: number, y: number){
        return this.board.boardarray[y][x];
    }

}
