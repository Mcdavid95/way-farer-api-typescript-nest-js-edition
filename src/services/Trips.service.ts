
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trips } from '../models/Trips';
import { CreateTrips } from '../dtos/trips.dto';


@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trips)
    private TripsModel: typeof Trips,
  ) {}

  /**
   * @method create
   * @param {CreateTrips} body 
   */
  async create (body: CreateTrips): Promise<Trips> {
    return this.TripsModel.create(body);
  }

  /**
   * @method findAll
   * @param options database query options
   */
  async findAll(options: unknown): Promise<Trips[]> {
    return this.TripsModel.findAll(options);
  }

  /**
   * @method findById
   * @param {number} id Trips id from Trips table
   */
  findById(id: number): Promise<Trips> {
    return this.TripsModel.findByPk(id);
  }

  /**
   * @method findOne
   * @param {number} id Trips id from Trips table
   */
  findOne(options: unknown): Promise<Trips> {
    return this.TripsModel.findOne(options);
  }

  /**
   * @method remove
   * @param {number} id Trips id from Trips table
   */
  async remove(id: number): Promise<void> {
    const Trips = await this.findOne(id);
    await Trips.destroy();
  }
}