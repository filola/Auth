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
import { Carts } from './cart.entity';
import { Wishlists } from './wishlist.entity';

@Entity('users')
@Unique(['email', 'phone'])
export class Users extends BaseEntity {
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

  @OneToMany(() => Wishlists, (wishlist) => wishlist.User, {
    onDelete: 'CASCADE',
  })
  wishlist: Wishlists[];

  @OneToMany(() => Carts, (cart) => cart.User)
  cart: Carts[];
}
