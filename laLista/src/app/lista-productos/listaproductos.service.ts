import { Injectable } from '@angular/core';
import { Productos } from '../add-productos/model/productos';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = "https://api-lista-nico.onrender.com/productos";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ListaproductosService {

  constructor(private http: HttpClient) { }

  // Controla y enviará un mensaje a consola para todos los errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }

  getProducts(): Observable<Productos[]> {
    console.log("getProducts ()");
    return this.http.get<Productos[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  deleteProduct(id: string): Observable<Productos> {
    return this.http.delete<Productos>(apiUrl + "/" + id, httpOptions)
      .pipe(
        tap(_ => console.log('deleted product id=${id}')),
        catchError(this.handleError<Productos>('deleteProduct'))
      );
  }

  updateProduct(id: number, producto: Productos): Observable<Productos> {
    return this.http.put<Productos>(apiUrl + "/" + id, producto, httpOptions)
      .pipe(
        tap(_ => console.log('updated product id=${id}')),
        catchError(this.handleError<any>('updateProduct'))
      );
  }


}
