import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';
@Entity() //sql table === 'coffee'
// pass name in decorator if you want a different name @Entity('coffees')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  // help specify the owner side of the relationship , here coffee entity
  @JoinTable()
  // first param : establish what the type for relation is ; returns reference to the related entity , here flavor entity
  // second param: define an arrow function that returns the related entity and specify what prop needs to be selected that is the inverse side of the relationship ; here, what is coffee inside of the flavor entity
  // third param cascade: flavors that belong to a newly created coffee (that is not yet in our db) will automatically be inserted
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors: Flavor[];
}
