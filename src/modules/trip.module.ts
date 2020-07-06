import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Trips } from '../models/Trips';

@Module({
  imports: [SequelizeModule.forFeature([Trips])],
  exports: [SequelizeModule]
})
export class TripsModule {}