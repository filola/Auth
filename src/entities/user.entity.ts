import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Wishlist } from './wishlist.entity';

@Entity('users')
@Unique(['email', 'phone'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.User, {
    onDelete: 'CASCADE',
  })
  wishlist: Wishlist[];

  @OneToMany(() => Cart, (cart) => cart.User)
  cart: Cart[];
}
