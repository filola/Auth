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
import { User } from './user.entity';

@Entity({ name: 'wishlist' })
export class Wishlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  User_id: number;

  @Column()
  Product_id: number;

  @ManyToOne(() => Product, (product) => product.wishlist)
  @JoinColumn([{ name: 'Product_id', referencedColumnName: 'id' }])
  Product: Product;

  @ManyToOne(() => User, (user) => user.wishlist)
  @JoinColumn([{ name: 'User_id', referencedColumnName: 'id' }])
  User: User;
}
