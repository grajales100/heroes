import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  private url = 'https://loginapp-752c5-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient) { }
  
  crearHeroe(heroe: HeroeModel){
    
    return this.http.post(`${this.url}/heroes.json`,heroe)
    .pipe(
      map( (resp:any) =>{
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel){
    
    const heroeTem = {
      ...heroe
    };

    delete heroeTem.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTem);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(this.crearArreglo),
        delay(500)
      );
  }

  getHeroe(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private crearArreglo( heroes: object | any){
    const heroesA: HeroeModel[] = [];
    
    console.log(heroes);

    if ( heroes === null){return [];}

    Object.keys( heroes ).forEach( key=> {
      const hero: HeroeModel = heroes[key];
      hero.id = key;
      heroesA.push(hero);
    });

    return heroesA;
  }
}
