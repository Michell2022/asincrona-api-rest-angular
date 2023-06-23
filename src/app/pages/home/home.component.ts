import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonesService } from 'src/app/services/pokemones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  originalPokemons: any[] = [];
  filteredPokemons: any[] = [];
  searchTerm = '';
  currentPage = 1;
  noPokemonFound = false;

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
    this.getPokemons();
  }

  getPokemons(): void {
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

          this.originalPokemons.push(pokemonInfo);
          this.originalPokemons.sort((a, b) => a.id - b.id);
          this.filterPokemons();
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  filterPokemons(): void {
    if (this.searchTerm === '') {
      this.filteredPokemons = [...this.originalPokemons];
    } else {
      this.filteredPokemons = this.originalPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;
    this.noPokemonFound = this.filteredPokemons.length === 0 && this.searchTerm !== '';
  }

  search(): void {
    this.filterPokemons();
  }

  sendData(): void {
    const selectedPokemon = this.originalPokemons.find(pokemon =>
      pokemon.name.toLowerCase() === this.searchTerm.toLowerCase()
    );

    if (selectedPokemon) {
      this.router.navigate(['detalles', selectedPokemon.id]);
    } else {
      this.noPokemonFound = true;
    }
  }

  seleccionarPokemon(pokemon: any): void {
    this.searchTerm = pokemon.name;
    this.filterPokemons();
  }

  getTextColor(tipoPoke: string): string {
    return HomeComponent.colors[tipoPoke.toLowerCase()] || 'white';
  }
}