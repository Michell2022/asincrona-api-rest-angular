import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonesService {

  // MI VARIABLE MYURL CONTENDRA MI ENLACE DE DONDE OBTENDREMOS LOS DATOS
  Myurl="https://pokeapi.co/api/v2";

  constructor(private http:HttpClient) { }

  // MI METODO GETPOKEMONES OBTENDRA INFORMACION A TRAVEX DE UNA PETICION HTTP GET
  getPokemones(id: number) {
    return this.http.get<any>(`${this.Myurl}/pokemon/${id}`);
  }

}
