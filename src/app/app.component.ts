import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isStandalonePage = false;
  title = 'background-test';
  constructor(private router: Router){
    this.router.events
    .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
      const standaloneRoutes = ['/lenguajesformales','/lista','/reversi']; // add more if needed
      this.isStandalonePage = standaloneRoutes.includes(event.urlAfterRedirects);
    });
    }
  }

