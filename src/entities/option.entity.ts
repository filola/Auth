import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'options', orderBy: { id: 'ASC' } })
export class option extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option: string;

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
