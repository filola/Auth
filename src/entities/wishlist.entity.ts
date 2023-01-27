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
import { Users } from './user.entity';

@Entity({ name: 'wishlist' })
export class Wishlists extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  UserId: number;

  @Column()
  ProductId: number;

  @ManyToOne(() => Products, (product) => product.wishlist)
  @JoinColumn([{ name: 'Product_id', referencedColumnName: 'id' }])
  Product: Products;

  @ManyToOne(() => Users, (user) => user.wishlist)
  @JoinColumn([{ name: 'User_id', referencedColumnName: 'id' }])
  User: Users;
}
