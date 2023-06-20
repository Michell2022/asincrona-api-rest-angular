import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonesService } from 'src/app/services/pokemones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // Arreglo para almacenar los datos originales de los Pokémon
    originalEntrada: any[] = [];

    // Arreglo para almacenar los datos filtrados de los Pokémon
    entrada: any[] = [];
  
    // Variable para almacenar el valor del buscador
    buscador = '';

      // Colores para los tipos de Pokémon
  static colors: Record<string, string> = {
    fire: '#e4604d',
    grass: '#9dd465',
    electric: '#fed32f',
    water: '#0090ff',
    ground: '#e4c967',
    rock: '#cabb7b',
    fairy: '#eeb2fa',
    poison: '#9f619d',
    bug: '#c5cf4a',
    dragon: '#857af7',
    psychic: '#e56eaf',
    flying: '#80a4f9',
    fighting: '#9b5a48',
    normal: '#bab8ab',
    steel: '#4682B4',
    ghost: '#a499c9',
    ice: '#00a4e3',
  };
  
    constructor(private mydata: PokemonesService, private router: Router) { }
  
    ngOnInit(): void {
      // Obtener los datos de los Pokémon al inicializar el componente
      this.getPoketodo();
    }
  
    getPoketodo() {
      for (let i = 1; i <= 150; i++) {
        this.mydata.getPokemones(i).subscribe(
          res => {
            const pokemonInfo = {
              position: i,
              id: res.id,
              image: res.sprites.other.dream_world.front_default,
              name: res.name,
              experiencia: res.base_experience,
              tipoPoke: res.types[0].type.name
            };
  
            // Agregar los datos del Pokémon al arreglo originalEntrada
            this.originalEntrada.push(pokemonInfo);
  
            // Ordenar el arreglo originalEntrada por el ID del Pokémon
            this.originalEntrada.sort((a, b) => a.id - b.id);
  
            // Copiar los datos originales al arreglo entrada
            this.entrada = [...this.originalEntrada];
          },
          err => {
            console.error(err);
          }
        );
      }
    }
  
    search() {
      if (this.buscador === '') {
        // Si el buscador está vacío, mostrar todos los Pokémon
        this.entrada = [...this.originalEntrada];
      } else {
        // Filtrar los Pokémon por el nombre ingresado en el buscador
        this.entrada = this.originalEntrada.filter(dato =>
          dato.name.toLowerCase().includes(this.buscador.toLowerCase())
        );
      }
    }
  
    sendData() {
      // Enviar los datos del Pokémon seleccionado a la página de detalles
      const selectedPokemon = this.originalEntrada.find(dato =>
        dato.name.toLowerCase() === this.buscador.toLowerCase()
      );
  
      if (selectedPokemon) {
        this.router.navigate(['detalles', selectedPokemon.id]);
      }
    }
  
    seleccionarPokemon(dato: any) {
      // Al seleccionar un Pokémon, asignar su nombre al buscador y realizar la búsqueda automáticamente
      this.buscador = dato.name;
      this.search();
    }


    getTextColor(tipoPoke: string): string {
      return HomeComponent.colors[tipoPoke.toLowerCase()] || 'white';
    }
    
  }