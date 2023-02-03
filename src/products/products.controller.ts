import { Body, Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get('/list')
    getProductList(): Promise<ProductListDto> {

    }
    
}
