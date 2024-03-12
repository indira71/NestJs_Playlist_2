import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  constructor(private heroService: HeroService) {}

  @Get('index')
  @HttpCode(200)
  @Header('Contect-Type', 'application/json')
  index(@Res() response) {
    response.json(this.heroService);
  }

  @Get('detail/:id')
  show(@Param('id') id: number) {
    const hero = this.heroService.findAll().filter((hero) => {
      return hero.id == id;
    });

    return hero[0];
  }

  @Get('create')
  create(@Res({ passthrough: true }) response): string {
    response.cookie('name', 'Tobi');
    return 'Hero create';
  }

  @Post('store')
  @HttpCode(201)
  store(
    @Req() request,
    @Body() createHeroDto: CreateHeroDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      // const { id, nama, umur, keterangan } = request.body;
      // heroes.push({ id, nama, umur, keterangan });
      this.heroService.create(createHeroDto);
      return this.heroService.findAll();
    } catch (error) {
      response.status(500).json({ message: error });
    }
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateHerodto: UpdateHeroDto) {
    this.heroService.findAll().filter((hero) => {
      if (hero.id == id) {
        hero.nama = updateHerodto.nama;
        hero.keterangan = updateHerodto.keterangan;
      }
    });
    return this.heroService.findAll();
  }

  @Delete('destroy/:id')
  destroy(@Param('id') id: number) {
    const hero = this.heroService.findAll().filter((hero) => {
      return hero.id != id;
    });

    return hero;
  }
}
