import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { LogoComponent } from "./Components/logo.component";
import { FooterComponent } from "./Components/footer.component";
import { PesquisaComponent } from "./Components/pesquisa.component";   

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent,
        LogoComponent, 
        FooterComponent,
        PesquisaComponent
    ],
    imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
    bootstrap: [AppComponent, LogoComponent, FooterComponent, PesquisaComponent]
})
export class AppModule {

}