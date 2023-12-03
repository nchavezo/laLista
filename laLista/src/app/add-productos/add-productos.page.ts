import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from './productos.service';
import { Productos } from './model/productos';

@Component({
  selector: 'app-add-productos',
  templateUrl: './add-productos.page.html',
  styleUrls: ['./add-productos.page.scss'],
})
export class AddProductosPage {

  nuevoProducto = {
    nombre: '',
    cantidad: 0
  };

  constructor( private router:Router, private productosService: ProductosService) { }

  goBack() {
    this.router.navigate(['/lista-productos']);
  }



  regitroProducto() {
      const producto: Productos = new Productos(this.nuevoProducto);
      const randomNumber = Math.floor(Math.random() * 100);

      producto.id = `nchavez-${randomNumber.toString().padStart(2, '0')}`;

    this.productosService.regitroProducto(producto).subscribe((response) => {
      if (response) {
        console.log('Producto añadido correctamente', response);
        this.router.navigateByUrl('/lista-productos'); 
        window.location.reload();

      }
    });
    
  }
}
  
