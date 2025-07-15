import { Component, Input , Output, EventEmitter, SimpleChanges} from '@angular/core';
import {Cell} from "src/app/shared/models/cell";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {
    @Input() cell!:Cell;
    @Input() x!:number;
    @Input() y!:number;
    @Input() highlight:boolean = false;
    @Input() highlightcolor:'black'|'white' = 'black';
    @Output() cellClick = new EventEmitter<{x:number; y:number}>();
    onClick(){
        this.cellClick.emit({x:this.x, y:this.y})
    }

    flipAnimation = false;
    private previousState: 'black' | 'white' | 'empty' = 'empty';

    ngOnChanges(changes: SimpleChanges): void {
        if(!('highlight' in changes) && ! ('highlightcolor' in changes)){
            return;
        }else if(this.previousState !== this.cell.state  ) {
          this.triggerFlip();
          this.previousState = this.cell.state;
       }
    }
    triggerFlip() {
        this.flipAnimation = false;

  // Force reflow before applying the class
  requestAnimationFrame(() => {
    this.flipAnimation = true;

    setTimeout(() => {
      this.flipAnimation = false;
    }, 400); // match your CSS duration
  });
    }

}
