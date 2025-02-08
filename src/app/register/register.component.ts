import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
    NavbarComponent,
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

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('succes', this.registerForm.value);
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
async createPost(data:any){
  try {
    const res=await axios.post('http://localhost:5000/user/register',JSON.stringify(data))
    
  } catch (error) {
    console.log(error);
    
  }
}
buttonClick(){
  this.createPost({
    name:"",
    email:"",
    password:"",
    role:"general"
  })
}

}
