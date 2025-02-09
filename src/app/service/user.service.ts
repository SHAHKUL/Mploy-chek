import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username: string = '';
  private role: string = '';

  constructor() {}
  private isBrowser(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }

  setUsername(name: string): void {
    this.username = name;
    if (this.isBrowser()) {
      localStorage.setItem('username', name); // Only use localStorage in the browser
    }
  }

  getUsername(): string {
    if (this.isBrowser()) {
      return localStorage.getItem('username') || '';
    }
    return this.username;
  }

  setRole(name: string): void {
    this.role = name;
    if (this.isBrowser()) {
      localStorage.setItem('role', name); // Only use localStorage in the browser
    }
  }

  getRole(): string {
    if (this.isBrowser()) {
      return localStorage.getItem('role') || '';
    }
    return this.role;
  }

  async loginUser(data: any) {
    try {
      const response = await axios.post(
        'http://localhost:5000/user/login',
        data
      );
      return response.data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  }

  async getUserProfile(userId: string) {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/profile/${userId}`
      );
      return response.data; // Return user profile data
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  simulateApiDelay() {
    return new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
  }
}
