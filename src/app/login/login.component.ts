import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import axios from 'axios';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService]  
})
export class LoginComponent {
  userForm: FormGroup;
  message: string = '';
  userName:string=''

  constructor(private fb: FormBuilder, private router: Router,private userService: UserService) {
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
    try {
      const res = await axios.post('http://localhost:5000/user/login', data);
      this.message = res.data.message;
      alert(res.data.message);
      if (this.message === 'User Login successfully') {
        this.userService.setUsername(res.data.name);
        console.log(res.data.role);
        
        this.userService.setRole(res.data.role)
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
