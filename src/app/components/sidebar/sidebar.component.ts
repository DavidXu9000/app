import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private auth: AuthService) { }

  login() {
    //this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
  
  isLoggedIn(): boolean {
    return this.auth.isAuthenticated
  }


}
