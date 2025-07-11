import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-grid-row',
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.css'],
})
export class GridRowComponent {
  constructor(private _elementRef: ElementRef) {
    console.log(this._elementRef.nativeElement.querySelector('div'));
  }
  ngAfterViewInit() {}
}
