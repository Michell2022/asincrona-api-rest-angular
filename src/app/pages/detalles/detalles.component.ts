import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonesService } from 'src/app/services/pokemones.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  id!: number;

  obtenerInfo:any = {};

  constructor(private router:ActivatedRoute, private info:PokemonesService){ }

  ngOnInit(): void {

  }
}
