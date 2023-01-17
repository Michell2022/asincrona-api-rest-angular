import { Component, OnInit } from '@angular/core';
import { PokemonesService } from 'src/app/services/pokemones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // DECLARO MI VARIABLE QUE RECIBIRA UNA COPIA DE LA LISTA ENTRADA
  originalEntrada: any[] = [];

  // ASIGNO LOS DATOS DE ORIGINALENTRADA A ENTRADA
  entrada: any[] = [...this.originalEntrada];

  // DECLARO MI VARIABLE BUSCADOR
  buscador = '';

  constructor(private mydata: PokemonesService) { }

  ngOnInit(): void {
    this.getPoketodo();
  }


  getPoketodo() {
    let pokemonInfo;

    // CREO UNA ESTRUCTURA DE CONTROL FOR PARA OBTENER SOLO 150 POKEMONES CON SUS RESPECTIVAS INFORMACIONES:
    for (let i = 1; i <= 150; i++) {
      this.mydata.getPokemones(String(i)).subscribe(
        res => {
          pokemonInfo = {
            // OBTENGO LOS DATOS POSICION - IMAGEN - NOMBRE Y EXPERIENCIA PARA EL SIGUIENTE NIVEL
            position: i,
            image: res.sprites.front_default,
            name: res.name,
            nextExperiencia: res.base_experience

          }
          // LOS DATOS OBTENIDOS SERAN ASIGNADOS A MI VARIABLE ORIGINALENTRADA CON EL METODO PUSH
          this.originalEntrada.push(pokemonInfo);
          // DE IGUAL MANERA QUE AL INICIO ASIGNARE LOS DATOS DE ORIGINALENTRADA A ENTRADA
          this.entrada = [...this.originalEntrada]
        },
        err => {
          alert(err);
        },
      )
    }
  }

  // CREO MI FUNCION SEARCH 
  search() {
    // SI MI BUSCADOR NO TIENE INFORMACION - MI VARIABLE ORIGINALENTRADA ASIGNARA LOS DATOS A ENTRADA Y LOS MOSTRARA SOLO SI SE CUMPLE LA CONDICION
    if (this.buscador === '') {
      this.entrada = [...this.originalEntrada];
      // FILTRANDO MIS ELEMENTOS
      // toLowerCase() CONVERTIRA MI VALOR INGRESADO EN MINUSCULA.
      // SI EL INDICE ES MAYOR QUE -1, SIGNIFICA QUE "this.buscador" se encuentra en "dato.name" Y LA FUNCION DEVUELVE true - EL ELEMENTO SE INCLUIRA dato.name
      // EL INDICE -1, SIGNIFICA QUE "this.buscador" NO SE ENCUENTRA EN "dato.name" Y LA FUNCION DEVUELVE false - EL ELEMENTO NO SE INCLUIRA dato.name
    } else {
      this.entrada = this.originalEntrada.filter(dato =>
        dato.name.toLowerCase().indexOf(this.buscador.toLowerCase()) > -1);
    }
  }
}