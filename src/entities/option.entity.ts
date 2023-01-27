import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'options', orderBy: { id: 'ASC' } })
export class Options extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option: string;

  @Column()
  price: number;

  @Column({ default: true })
  likeCount: number;

  @Column()
  description: string;

  @Column()
  origin: string;

  @Column({ nullable: true })
  saleRate: number;
}
