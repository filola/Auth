import { Products } from 'src/entities/product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Products)
export class ProductRepository extends Repository<Products> {}
