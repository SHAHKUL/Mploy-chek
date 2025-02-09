import { Component } from '@angular/core';
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
import axios from 'axios';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  message:string=''

  constructor(private fb: FormBuilder,private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role:"general"
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.createPost(formData);
    } else {
      console.log('form is invalid');
    }
  }
  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  async createPost(data: any) {
    try {
      const res = await axios.post(
        'http://localhost:5000/user/register',
        data
      );
      alert(res.data.message)
      this.message=res.data.message
      if(this.message==='User Registered Successfully'){
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.log(error);
    }
  }

}
