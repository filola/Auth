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
import { Carts } from './cart.entity';
import { ProductTags } from './productTag.entity';
import { Tags } from './tag.entity';
import { Wishlists } from './wishlist.entity';

@Entity({ name: 'products', orderBy: { id: 'ASC' } })
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  @OneToMany(() => ProductTags, (productTag) => productTag.Product, {
    onDelete: 'CASCADE',
  })
  productTag: ProductTags[];

  @OneToMany(() => Wishlists, (wishlist) => wishlist.Product)
  wishlist: Wishlists[];

  @OneToMany(() => Carts, (cart) => cart.Product)
  cart: Carts[];
}
