import { Injectable } from '@nestjs/common';
import { Hero } from './interfaces/hero.interface';

@Injectable()
export class HeroService {
  private readonly heroes: Hero[] = [
    {
      id: 1,
      nama: 'Setia Budi',
      umur: 21,
      keterangan: 'Pahlawan',
    },
    {
      id: 2,
      nama: 'sudirman',
      umur: 25,
      keterangan: 'Pahlawan',
    },
  ];

  create(hero: Hero) {
    this.heroes.push(hero);
  }

  findAll(): Hero[] {
    return this.heroes;
  }
}
