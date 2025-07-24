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

            interface Bar {
                img: p5.Image;
                x: number;
                y: number;
                delay: number;
            }

            let img : p5.Image | null = null;
            let bars: Bar[] = [];

            let barWidth = 30;
            let speed = 1;
            let lastFrameTime = 0;

            p.setup = () => {
                lastFrameTime = p.millis();

                p.createCanvas(p.windowWidth, p.windowHeight);
                p.background(240);
            };

        p.draw = () => {
            const now = p.millis();
            const dtime = (now - lastFrameTime) / 1000;

            p.clear();

            if(img && bars.length > 0){
                const scale = Math.min(p.width / img.width, p.height / img.height);
                const scaledWidth = img.width * scale;
                const scaledHeight = img.height * scale;
                const xOffset = (p.width - scaledWidth) / 2;

                //p.image(img,xOffset,0,scaledWidth,scaledHeight);
                for( const bar of bars ){
                    if( now > bar.delay ){
                        bar.y += speed * dtime;
                    }
                    
                    const destX = xOffset + bar.x * scale;
                    const destW = bar.img.width * scale; 
                    const destH = scaledHeight;
                    p.image(bar.img, destX, bar.y, destW, destH);

                }
            }else{
                p.clear();
            }
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };

        (p as any).setImage = (newImg: p5.Image) => {
            img = newImg;
            p.resizeCanvas(p.windowHeight, p.windowWidth)
            barWidth = p.int(img.width / 70);
            speed = p.int(img.height / 700);

            bars = [];
            const minDelay: number = 1000;
            const maxDelay: number = minDelay + 400;
            const delta: number = 50;
            let lastDelay: number = p.random(minDelay,maxDelay);
            for(let x = 0; x < img.width; x+= barWidth){
                const barImg = img.get(x,0,Math.min(barWidth, img.width - x), img.height);
                let delay = p.random(lastDelay - delta, lastDelay + delta);
                delay = p.min(maxDelay,delay);
                delay = p.max(minDelay,delay);
                lastDelay = delay;
                bars.push({
                    img:barImg,
                    x:x,
                    y:0,
                    delay:p.millis() + delay,
                })
            }
        };

        };
        this.p5Instance = new p5(sketch, this.container.nativeElement)
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
            if (input.files && input.files[0]) {
               const file = input.files[0];

                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageDataUrl = e.target?.result as string;

                    this.p5Instance.loadImage(imageDataUrl,
                        (img: p5.Image) => {
                            (this.p5Instance as any).setImage(img); // ✅ Set image inside sketch
                        },
                        (err) => {
                            console.error("Failed to load image in p5", err);
                        }
                    ); 
                };
              reader.readAsDataURL(file);
              };
    }


  ngOnDestroy(): void {
    this.p5Instance?.remove();
  }

}

