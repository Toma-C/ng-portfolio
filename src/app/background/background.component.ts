import {
  AfterViewInit,
  Component,
  Directive,
  Input,
  QueryList,
  ViewChildren,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
function min(x: number, y: number) {
  return x <= y ? x : y;
}
function max(x: number, y: number) {
  return x >= y ? x : y;
}

@Directive({ selector: 'child-directive' })
class ChildDirective {}

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
})
export class BackgroundComponent implements AfterViewInit {
  @ViewChild('table') input!: ElementRef;

  ngAfterViewInit() {
    let board: number[][] = [];
    let board_next: number[][] = [];
    let Table = this.input.nativeElement;
    let indexr = 0;
    let indexc = 0;

    // populate randomly
    for (const row of Table.children) {
      board.push([]);
      board_next.push([]);
      indexc = 0;
      for (const cell of row.children) {
        let activity = getRandomInt(3) == 1 ? 1 : 0;
        board[indexr].push(activity);
        board_next[indexr].push(0);
        cell.children[0].classList.toggle('active', board[indexr][indexc]);
        indexc++;
      }
      indexr++;
    }

    setInterval(() => {
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 20; c++) {
          let neighborcount = 0;
          //  console.log('2INDEDX', r, c, 'VAL:', board[r][c]);
          if (r - 1 >= 0) {
            if (c - 1 >= 0) {
              neighborcount += board[r - 1][c - 1];
            }
            neighborcount += board[r - 1][c];
            if (c + 1 <= 19) {
              neighborcount += board[r - 1][c + 1];
            }
          }
          if (c - 1 >= 0) {
            neighborcount += board[r][c - 1];
          }
          if (c + 1 <= 19) {
            neighborcount += board[r][c + 1];
          }
          if (r + 1 < 4) {
            if (c - 1 >= 0) {
              neighborcount += board[r + 1][c - 1];
            }
            neighborcount += board[r + 1][c];
            if (c + 1 <= 19) {
              neighborcount += board[r + 1][c + 1];
            }
          }

          //  console.log(
          //    'row:',
          //    r,
          //    'col:',
          //    c,
          //    board[r][c],
          //    'neigh',
          //    neighborcount
          //  );
          if (board[r][c]) {
            if (neighborcount < 2) {
              board_next[r][c] = 0;
            } else if (neighborcount > 3) {
              board_next[r][c] = 0;
            } else {
              board_next[r][c] = 1;
            }
          } else {
            if (neighborcount == 3) {
              board_next[r][c] = 1;
            } else {
              board_next[r][c] = 0;
            }
          }
        }
      }
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 20; j++) {
          board[i][j] = board_next[i][j];
          board_next[i][j] = 0;
        }
      }

      let indr = 0;
      let indc = 0;

      //update classes
      for (const row of Table.children) {
        indc = 0;
        for (const cell of row.children) {
          let act = board[indr][indc];
          cell.children[0].classList.toggle('active', act);
          indc++;
        }
        indr++;
      }
    }, 1000);
    setInterval(() => {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 20; j++) {
          board[i][j] = getRandomInt(3) == 1 ? 1 : 0;
        }
      }
    }, 10000);
  }
}
