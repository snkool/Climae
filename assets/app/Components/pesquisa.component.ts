import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';

@Component({
    selector: 'pesquisa-app',
    templateUrl: './pesquisa.component.html' 
})

@Injectable()
export class PesquisaComponent {
    public previsaoTempo: any; //Armazena os dados fornecidos pela API
    public show:boolean = false; //Mostra a div com o resultado da previsão do tempo
    public cidade: any;
    /*Loader que aparece logo após a pesquisa ser feita*/ 
    public showloader: boolean = false;      
    private subscription: Subscription;
    private timer: Observable<any>;

    constructor(private http: HttpClient) {}

    public ngOnInit() {
        this.setTimer();
    }
    public ngOnDestroy() {
        if ( this.subscription && this.subscription instanceof Subscription) {
        this.subscription.unsubscribe();
        }
    }

    public setTimer(){
        //mostra o loader 
        this.showloader = true;

        this.timer = Observable.timer(4000); // Espera 4 segundos enquanto o getWeather() recebe as informações
        this.subscription = this.timer.subscribe(() => {
            //esconde o loader
            this.showloader = false;
        });
    }

    //Funcao executada assim que o usuario digitar o nome da cidade e apertar enter 
    onEnter(value: string) { this.cidade = value; this.enviarForm(this.cidade); this.setTimer();}

    //Funcao que chama a getWeather() e armazena todos os dados na variavel previsaoTempo
    enviarForm(cidade){
        this.getWeather(cidade) 
        //.subscribe(data => console.log(data));
        .subscribe(data => this.previsaoTempo = data)
        this.show = true;
        console.log(this.previsaoTempo);
        if(this.previsaoTempo == undefined){
            console.log("Aguardando...")
        }
    }

    //Da um get no http da api
    getWeather(cidade){
        return this.http.get(
            `http://api.weatherstack.com/current?access_key=3106fef17d0e1dec72f4d89e5d3b1091&query=${cidade}`
            );  
    }   
  
}

