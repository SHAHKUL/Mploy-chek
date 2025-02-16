import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../profile.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  username?: any;
  role?: any;
 
  private profileService = inject(ProfileService);
  constructor(private userService: UserService) {}

  ngOnInit(): void {


    this.profileService.currentProfile.subscribe((cur) => {
     
      this.username=cur.name
      this.role=cur.role
    });
  }

  logout() {

    this.username = '';
    this.role = '';
  }
}
