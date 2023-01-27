import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ProductTags } from './productTag.entity';

@Entity({ name: 'tags' })
export class Tags extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagName: string;

  @OneToMany(() => ProductTags, (productTag) => productTag.Tag)
  prdouctTag: ProductTags[];
}
