import { Injectable } from '@nestjs/common';
import { PokemonService } from '../pokemon/pokemon.service';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor( 
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>, //inyeccion de dependencia directamnete al modelo

    private readonly pokemonService:PokemonService, //inyeccion de dependencia directamnete al service

    private readonly http:AxiosAdapter,
    ) {}



 
   async executeSeed(){

    await this.pokemonModel.deleteMany(); //delete * from pokemons


    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

   /*  const insertPromiseArray=[]; */

   const pokemonToInsert:{name:string, no:number}[]=[];


    data.results.forEach(async ({name, url})=>{

      const segments=url.split('/');
      const no:number=+segments[segments.length-2];
    
    
      //Insertar multiples registros simultáneamente
     /*  insertPromiseArray.push(this.pokemonService.create({name, no})) */


     pokemonToInsert.push({name, no});

     //insertar registros uno por uno
     //const pokemon= await this.pokemonService.create({name, no});



    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    //await Promise.all(insertPromiseArray);

    return 'Seed Executed';
  
    }
}
