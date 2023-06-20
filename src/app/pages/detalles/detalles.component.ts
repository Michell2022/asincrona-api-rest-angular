import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonesService } from 'src/app/services/pokemones.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  pokemon: any = {}; // Objeto para almacenar los detalles del Pokémon

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonesService: PokemonesService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del Pokémon de los parámetros de la URL
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];

      // Obtener los detalles del Pokémon usando el servicio
      this.pokemonesService.getPokemones(id).subscribe(
        res => {
          this.pokemon = {
            id: res.id,
            hp: res.stats[0].base_stat,
            hpName: res.stats[0].stat.name,
            image: res.sprites.other.dream_world.front_default,
            name: res.name,
            typeOfPokemon1: res.types[0].type.name,
            typeOfPokemon2: res.types.length > 1 ? res.types[1].type.name : '',
            attack: res.stats[1].base_stat,
            defense: res.stats[2].base_stat,
            speed: res.stats[5].base_stat,
            attackName: res.stats[1].stat.name,
            defenseName: res.stats[2].stat.name,
            speedName: res.stats[5].stat.name
          };
        },
        err => {
          console.error(err);
        }
      );
    });
  }

  guardarDatos() {
    // Aquí puedes implementar el código para guardar los datos editados del Pokémon
    console.log(this.pokemon);
  }

  getTextColor(typeOfPokemon: string): string {
    if (typeOfPokemon && typeOfPokemon.toLowerCase) {
      return DetallesComponent.colors[typeOfPokemon.toLowerCase()];
    }
    return '';
  }
}
