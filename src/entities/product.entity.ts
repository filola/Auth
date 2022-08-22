import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'products', orderBy: { id: 'ASC' } })
@Unique([''])
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: true })
  like_count: number;

  @Column()
  description: string;

  @Column()
  origin: string;

  @Column({ nullable: true })
  sale_rate: number;
}
