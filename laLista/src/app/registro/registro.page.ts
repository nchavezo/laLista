import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Usuarios } from '../login/model/usuarios';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

    newUser = {
      username: '',
      password: '',
      email: '',
    };

    confirmPassword: string = '';

  constructor(private router: Router, private loginService: LoginService) { }

  goBack() {
    this.router.navigate(['/login']);
  }



  registerUser() {
    if (this.newUser.password === this.confirmPassword) {
      const user: Usuarios = new Usuarios(this.newUser);
      const randomNumber = Math.floor(Math.random() * 100);

      user.id = `nchavez-${randomNumber.toString().padStart(2, '0')}`;

      this.loginService.registerUser(user).subscribe((response) => {
        if (response) {
          console.log('Usuario registrado correctamente', response);
          this.router.navigateByUrl('/login'); 
        }
      });
    } else {
      console.log("Las contraseñas no coinciden");
    }
  }
}
