import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from './product.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'product_tag' })
export class Product_Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //   @ManyToOne(() => Product, product => product.)
  //   product: string;

  @Column()
  Tag_id: number;

  @ManyToOne(() => Tag, (tag) => tag.prdouct_tag)
  @JoinColumn([{ name: 'Tag_id', referencedColumnName: 'id' }])
  Tag: Tag;

  @Column()
  Product_id: number;

  @ManyToOne(() => Product, (product) => product.product_tag)
  @JoinColumn([{ name: 'Product_id', referencedColumnName: 'id' }])
  Product: Product;
}
