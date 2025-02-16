import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [NavbarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  username?: any;
  private profileService=inject(ProfileService)

  ngOnInit(): void {

    this.profileService.currentProfile.subscribe((cur)=>{
      this.username=cur.name
    })
  }
}
