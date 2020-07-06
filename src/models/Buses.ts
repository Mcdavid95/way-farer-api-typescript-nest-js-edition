import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Trips } from './Trips';

@Table({
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})
export class Buses extends Model<Buses> {
    @Column
    number_plate: string;

    @Column
    manufacturer: string;

    @Column
    model: string;

    @Column
    year: string;

    @Column
    capacity: number;

    @HasMany(() => Trips)
    trips: Trips[];
}
