import { Injectable } from '@angular/core';

//
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login() {
    const dummyResponse = {
      user_id: '007',
      user_name: 'test',
    };
    this.storage.set('USER_INFO', dummyResponse).then(() => {
      this.router.navigate(['tabs']);
      this.authState.next(true);
    });
  }

  loging(dum) {
    this.storage.set('USER_INFO', dum).then(() => {
      this.router.navigate(['tabs']);
      this.authState.next(true);
    });
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }


}
