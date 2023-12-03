import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'https://api-lista-nico.onrender.com/productos';
  constructor(private http: HttpClient) {}

  regitroProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

}