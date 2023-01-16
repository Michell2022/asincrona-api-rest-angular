import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonesService {

  Myurl = "https://pokeapi.co/api/v2/pokemon/";

  constructor(private http:HttpClient ) { 
    console.log('Pokedex')
  }


  getData():Observable<string[]>{
    return this.http.get<string[]>(this.Myurl);
  }

  getItem(name: "string"): Observable<any> {
    return this.http.get(`${this.Myurl}/${name}`);
  }

}
