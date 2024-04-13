import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumeService {
  currentUser: any;
  productos:  any[] = [];
  
  constructor(private http: HttpClient) { }

  getUser(email: string, password: string) {
    return this.http.get<any>('http://localhost:3000/usuarios', {
      params: {
        email: email,
        password: password
      }
    }).pipe(
      tap((resp) => {
        if (resp && resp.length > 0) {
          // Usuario encontrado, guardamos los datos
          this.currentUser = resp[0];
          console.log('Usuario encontrado:', this.currentUser);
        } else {
          console.log('Usuario no encontrado');
        }
      })
    );
  }
  getProducts(){
    return this.http.get<any>('http://localhost:3000/productos')
  }
  createUser(body: any) {
    return this.http.post<any>('http://localhost:3000/usuarios', body);
  }
  getCarrito(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/carritos?id=${this.currentUser.id}`);
  }

  deleteProductoCarrito(body: any) {
    console.log("entro?")
    const resultado = {
      id: this.currentUser.id,
      productos: body
    };
    return this.http.put<any>(`http://localhost:3000/carritos/${this.currentUser.id}`, resultado);
  }
  
  
}
