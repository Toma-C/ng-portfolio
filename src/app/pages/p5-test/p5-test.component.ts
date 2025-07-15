import { Component, ElementRef, ViewChild } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-p5-test',
  templateUrl: './p5-test.component.html',
  styleUrls: ['./p5-test.component.css']
})
export class P5TestComponent {
  @ViewChild('p5Container', { static: true }) container!: ElementRef<HTMLDivElement>;

  private p5Instance!: p5;

  ngOnInit(): void {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(500, 500);
        p.background(240);
      };

      p.draw = () => {
        p.clear();
        p.fill(100, 200, 255);
        p.stroke(0);
        p.circle(p.width / 2, p.height / 2, 100);
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    this.p5Instance = new p5(sketch, this.container.nativeElement);
  }

  ngOnDestroy(): void {
    this.p5Instance?.remove();
  }
}

