import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DetallesComponent } from './detalles/detalles.component';
import { BreakingComponent } from './breaking/breaking.component';



@NgModule({
  declarations: [
    HomeComponent,
    DetallesComponent,
    BreakingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
