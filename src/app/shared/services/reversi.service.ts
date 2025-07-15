import { Injectable } from '@angular/core';
import {Board} from 'src/app/shared/models/board';
import {Cell} from 'src/app/shared/models/cell';

@Injectable({
  providedIn: 'root'
})
export class ReversiService {
    board = new Board(8);
    boardat(x: number, y: number){
        return this.board.boardarray[y][x];
    }

    flip(pos: {x: number, y:number}){
        const cell = this.board.boardarray[pos.y][pos.x];
        if(cell.state == 'white'){
            cell.state = 'black';
        }else if(cell.state == 'black'){
            cell.state = 'white';
        }
    }

    getboard(){
        return this.board.boardarray;
    }

    isValidMove(pos: {x: number, y: number}, player: 'black' | 'white'){
        const opponent = player == 'black' ? 'white' : 'black';
        const cell = this.board.boardarray[pos.y][pos.x];
        const board = this.getboard();
        const size = board.length;
        if(cell.state !== 'empty') return false;
        for(let dx = -1; dx<=1;dx++){
            for(let dy = -1; dy<=1;dy++){
                if( dx == 0 && dy == 0 ) continue;

                let nx = pos.x + dx;
                let ny = pos.y + dy;
                let foundopponent = false;

                while(nx >=0 && nx < size && ny >=0 && ny < size ){
                    const nextCell = board[ny][nx];
                    if(nextCell.state === opponent){
                        foundopponent = true;
                    } else if ( nextCell.state === player && foundopponent ){
                        return true;
                    }else{
                        break
                    }
                    nx += dx;
                    ny += dy;
                }
            }
        }
        return false;
    }
    getValidMoves( player: 'black'|'white' ): Cell[]{
    const valid:Cell[] = [];
     for (let y = 0; y < this.board.boardarray.length; y++) {
        for (let x = 0; x < this.board.boardarray[y].length; x++) {
          const cell = this.board.boardarray[y][x];
          if (this.isValidMove({x, y}, player)) {
            valid.push(cell);
          }
        }
      }
      return valid;
    }
    applyMove(pos:{x:number, y:number},player : 'black' | 'white'): number{
        if(!this.isValidMove(pos, player)){
            return -1;
        }
        const board = this.getboard();
        const opponent = player == 'black' ? 'white' : 'black';
        board[pos.y][pos.x].state = player;

        for(let dy=-1;dy<=1;dy++){
            for(let dx=-1;dx<=1;dx++){

                if(dx ==0 && dy == 0 ) continue;

                let nx = pos.x + dx;
                let ny = pos.y + dy;
                let cellstoflip :{x:number,y:number}[] = [];
                
                while(nx >=0 && nx < board.length && ny >=0 && ny < board.length ){
                    const nextCell = board[ny][nx];
                    if(nextCell.state === opponent){
                        cellstoflip.push({x:nx,y:ny});
                    } else if ( nextCell.state === player){
                        for(let cell of cellstoflip){
                            this.flip(cell);
                        }
                        break;
                    }else {
                        break;
                    }
                    nx += dx;
                    ny += dy;
                }
            }
        }
        return 1;
    }

}
                
            
