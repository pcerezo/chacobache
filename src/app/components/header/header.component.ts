import { isPlatformBrowser } from '@angular/common';
import { Component, DoCheck, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements DoCheck{
  token: string | null = null;

  private subscription!: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
  }

  ngDoCheck(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      if (isPlatformBrowser(this.platformId)) {
        this.token = localStorage.getItem('token');
      }
      else {
        this.token = null;
      }
    }
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      this.token = null;
      console.log("Item: " + localStorage.getItem('token'));
      this.router.navigate(['/login']);
    }
  }

}
