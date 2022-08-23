import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product_Tag } from './productTag.entity';

@Entity({ name: 'tags' })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag_name: string;

  @OneToMany(() => Product_Tag, (productTag) => productTag.Tag)
  prdouct_tag: Product_Tag[];
}
