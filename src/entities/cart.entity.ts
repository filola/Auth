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

@Entity({ name: 'carts' })
export class Carts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantuty: number;

  @Column()
  UserId: number;

  @Column()
  ProductId: number;

  @ManyToOne(() => Products, (product) => product.cart)
  @JoinColumn([{ name: 'Product_id', referencedColumnName: 'id' }])
  Product: Products;

  @ManyToOne(() => Users, (user) => user.cart)
  @JoinColumn([{ name: 'User_id', referencedColumnName: 'id' }])
  User: Users;
}
