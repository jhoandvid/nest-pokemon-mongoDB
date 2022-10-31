import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { SeedService } from './seed.service';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  async executeSeed() {
    return this.seedService.executeSeed();
    
  }

 
}
