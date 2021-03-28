import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity() //sql table === 'coffee'
// pass name in decorato if you want a different name @Entity('coffees')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true })
  flavors: string[];
}
