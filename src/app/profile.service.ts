import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
private profileSouce=new BehaviorSubject<any>(null)
currentProfile=this.profileSouce.asObservable()
  constructor() { }

  changeProfile(profile:any){
    this.profileSouce.next(profile)
  }
}
