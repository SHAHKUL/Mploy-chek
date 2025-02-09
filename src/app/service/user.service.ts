import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username: string = '';
  private role: string = '';

  constructor() {}
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  // Method to set the username
  setUsername(name: string): void {
    this.username = name;
    if (this.isBrowser()) {
      localStorage.setItem('username', name); // Only use localStorage in the browser
    }
  }

  // Method to get the username
  getUsername(): string {
    if (this.isBrowser()) {
      return localStorage.getItem('username') || '';
    }
    return this.username; 
  }

   // Method to set the username
   setRole(name: string): void {
    this.role = name;
    if (this.isBrowser()) {
      localStorage.setItem('role', name); // Only use localStorage in the browser
    }
  }

  // Method to get the username
  getRole(): string {
    if (this.isBrowser()) {
      return localStorage.getItem('role') || '';
    }
    return this.role; // Return the in-memory username if not in browser
  }


}
