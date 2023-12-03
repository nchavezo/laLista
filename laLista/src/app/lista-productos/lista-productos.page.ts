import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from '../add-productos/model/productos';
import { ListaproductosService } from './listaproductos.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage implements OnInit {

  productos: Productos[] = [];
  // Injectamos Librerias
  constructor(public restApi: ListaproductosService
    , public loadingController: LoadingController
    , public alertController: AlertController
    , public router: Router) { }

  // LLamamos al método que rescata los productos  
  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    console.log("Entrando :getProducts");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Cargando lista...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getProducts()
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
  // Si funciona asigno el resultado al arreglo productos
          this.productos = res;
          console.log("thisProductos:",this.productos);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
  // Si da error, imprimo en consola.
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }


  async delete(id: string) {
    // Confirma Primero
    this.presentAlertConfirm(id, 'Esta eliminando un producto de la lista');

  }
  async presentAlertConfirm(id: string, msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!', // Título
      message: msg,   // Mensaje
      buttons: [   // Botones
        {
          text: 'Confirmar Eliminacion',
          handler: () => { // Si presiona ejecuta esto
            //this.router.navigate(['']);
            this.deleteConfirmado(id)
          }
        }
      ]
    });
    // Presenta en pantalla
    await alert.present();
  }

  // Es invocado desde el Alert
  async deleteConfirmado(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando Lista...'
    });
    await loading.present();
    await this.restApi.deleteProduct(id)
      .subscribe({
        next: (res) => {
          console.log("Error DetailProduct Página", res);
          loading.dismiss();
          this.router.navigate(['/lista-productos']);
          window.location.reload();

        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error DetailProduct Página", err);
          loading.dismiss();
        }

      })
  }
}
