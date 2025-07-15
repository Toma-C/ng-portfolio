import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReversiService } from 'src/app/shared/services/reversi.service';
import { Cell } from 'src/app/shared/models/cell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
    constructor(public reversiService: ReversiService){}
    board: Cell[][] = [];
    highlightmap: boolean[][] = Array.from({ length: 8 }, () => Array(8).fill(false));

    ngOnInit() {
        this.board = this.reversiService.board.boardarray;
        this.updateValidMoves();
    }

    turn: 'black' | 'white' ='black';

    updateValidMoves() {
      const moves = this.reversiService.getValidMoves(this.turn);
      const map = Array.from({length: 8}, () => Array(8).fill(false));
      for(const cell of moves){
          map[cell.y][cell.x] = true;
      }
      this.highlightmap = map
    }

    isHighlighted(pos:{x: number, y: number}): boolean {
      return this.highlightmap[pos.y][pos.x];
    }


  onCellClicked(pos: {x:number; y:number}){
      let played = this.reversiService.applyMove(pos,this.turn);
      if(played == 1) this.turn = this.turn == 'black' ? 'white' : 'black'
      this.updateValidMoves();
  }

}
