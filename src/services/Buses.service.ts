
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Buses } from '../models/Buses';
import { CreateBuses } from '../dtos/Buses.dto';


@Injectable()
export class BusesService {
  constructor(
    @InjectModel(Buses)
    private BusesModel: typeof Buses,
  ) {}

  /**
   * @method create
   * @param {CreateBuses} body 
   */
  async create (body: CreateBuses): Promise<Buses> {
    return this.BusesModel.create(body);
  }

  /**
   * @method findAll
   * @param options database query options
   */
  async findAll(options: unknown): Promise<Buses[]> {
    return this.BusesModel.findAll(options);
  }

  /**
   * @method findById
   * @param {number} id Buses id from Buses table
   */
  findById(id: number): Promise<Buses> {
    return this.BusesModel.findByPk(id);
  }

  /**
   * @method findOne
   * @param {number} id Buses id from Buses table
   */
  findOne(options: unknown): Promise<Buses> {
    return this.BusesModel.findOne(options);
  }

  /**
   * @method remove
   * @param {number} id Buses id from Buses table
   */
  async remove(id: number): Promise<void> {
    const Buses = await this.findOne(id);
    await Buses.destroy();
  }
}