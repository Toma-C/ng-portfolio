import { Component, Input } from '@angular/core';
import {Cell} from "src/app/shared/models/cell";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {
    @Input() cell!:Cell;
    onClick(){
        if(this.cell.state == 'empty'){
        this.cell.state='black';
        }else if(this.cell.state == 'black'){
        this.cell.state='white';
        }else if(this.cell.state == 'white'){
            this.cell.state='black';
        }
    }

}
