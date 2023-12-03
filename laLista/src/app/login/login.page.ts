import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from './login.service';
import { Usuarios } from './model/usuarios';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private LoginService: LoginService
  ) {}

 async login() {
  this.LoginService.getUsers().subscribe((users: Usuarios[]) => {
    const user = users.find((user) => user.username === this.username && user.password === this.password);
    
    if (user) {
      this.LoginService.setLoggedInUser(user);

      this.showLoginSuccessAlert();
      localStorage.setItem('loggedInUsername', this.username);
      this.router.navigateByUrl('/tabs'); 
    } else {
      this.showLoginErrorAlert();
    }
  });
}

async showLoginSuccessAlert() {
  const alert = await this.alertController.create({
    header: 'Login Success',
    message: 'You have successfully logged in!',
    buttons: ['OK']
  });
  await alert.present();
}

async showLoginErrorAlert() {
  const alert = await this.alertController.create({
    header: 'Login Error',
    message: 'Invalid username or password.',
    buttons: ['OK']
  });
  await alert.present();
}

resetPassword() {
  this.router.navigateByUrl('/view-email');
}


}
