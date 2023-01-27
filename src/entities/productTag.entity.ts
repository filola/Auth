import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Products } from './product.entity';
import { Tags } from './tag.entity';

@Entity({ name: 'product_tag' })
export class ProductTags extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //   @ManyToOne(() => Product, product => product.)
  //   product: string;

  @Column()
  TagId: number;

  @ManyToOne(() => Tags, (tag) => tag.prdouctTag)
  @JoinColumn([{ name: 'Tag_id', referencedColumnName: 'id' }])
  Tag: Tags;

  @Column()
  ProductId: number;

  @ManyToOne(() => Products, (product) => product.productTag)
  @JoinColumn([{ name: 'Product_id', referencedColumnName: 'id' }])
  Product: Products;
}
