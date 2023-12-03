import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
    , public router: Router) { }

  // LLamamos al método que rescata los productos  
  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    console.log("Entrando :getProducts");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Harrys Loading...'
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

}
