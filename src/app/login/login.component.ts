import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../service/user.service';
import { ProfileService } from '../profile.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService],
})
export class LoginComponent implements OnInit{
  userForm: FormGroup;
  message: string = '';
  userName: string = '';
  loading: boolean = false; // To manage the loading state

  private profileService=inject(ProfileService)

  ngOnInit(): void {
    this.profileService.currentProfile.subscribe(profile=>{
      console.log(profile);
      
    })
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const loginData = this.userForm.value;
      this.loginPost(loginData);
    } else {
      console.log('form is invalid');
    }
  }

  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }

  async loginPost(data: any) {
    this.loading = true; // Show loading spinner

    try {
      // Simulate delay before sending the request
      await this.userService.simulateApiDelay();

      // Proceed with the login request
      const res = await this.userService.loginUser(data);
      this.message = res.message;
      alert(res.message);

      if (this.message === 'User Login successfully') {
     
        this.router.navigate(['/home']);
        this.profileService.changeProfile(res)
      }
    } catch (error) {
      console.log('Error during login:', error);
    } finally {
      this.loading = false; // Hide loading spinner
    }
  }


}
