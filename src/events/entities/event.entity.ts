import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// ===================================NOTES ==========================================
// Indexes are special lookup tables that a db search engine can use to retrieve data fast

// advanced use case
// composite index i.e contains multiple columns
// apply index decorator to the class itself and pass array of column names

// @Index(['name', 'type'])
@Entity()
export class RecommendationEvent {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type: string;

  // say common operation is retrieving event by name
  //  so add Index decoartor to the name column
  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
