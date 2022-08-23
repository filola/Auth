import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Product_Tag } from './productTag.entity';
import { Tag } from './tag.entity';
import { Wishlist } from './wishlist.entity';

@Entity({ name: 'products', orderBy: { id: 'ASC' } })
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

  @OneToMany(() => Product_Tag, (productTag) => productTag.Product, {
    onDelete: 'CASCADE',
  })
  product_tag: Product_Tag[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.Product)
  wishlist: Wishlist[];

  @OneToMany(() => Cart, (cart) => cart.Product)
  cart: Cart[];
}
