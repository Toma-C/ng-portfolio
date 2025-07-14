import { Component } from '@angular/core';
import { ReversiService } from 'src/app/shared/services/reversi.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
    constructor(public reversiService: ReversiService){}

  ngAfterViewInit() {


  }

}
