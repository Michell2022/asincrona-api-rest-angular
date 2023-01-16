import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonesService } from 'src/app/services/pokemones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  entrada!:any[];

  constructor(private pokemonService:PokemonesService, private router:Router){
    console.log("El componente se ah creado bien");
   }

   ngOnInit(): void {
    this.pokemonService.getData().subscribe( pokemonService => this.entrada = pokemonService);
  }

  validar(name:string){
    this.router.navigate(['detalles',name])
  }

}
