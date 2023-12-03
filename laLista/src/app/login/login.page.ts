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
      this.router.navigateByUrl('/menu'); 
    } else {
      this.showLoginErrorAlert();
    }
  });
}

async showLoginSuccessAlert() {
  const alert = await this.alertController.create({
    header: 'Login Correcto',
    message: 'Login Correcto, usted ha accedido!',
    buttons: ['OK']
  });
  await alert.present();
}

async showLoginErrorAlert() {
  const alert = await this.alertController.create({
    header: 'Login Incorrecto',
    message: 'Error en el acceso al sistema, intente nuevamente.',
    buttons: ['OK']
  });
  await alert.present();
}

resetPassword() {
  this.router.navigateByUrl('/view-email');
}


}
