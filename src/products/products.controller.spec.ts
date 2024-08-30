import { TestBed, Mocked } from '@suites/unit';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

describe('Product Controller Unit Spec', () => {
  // declare the unit under test
  let productController: ProductsController;

  // declare a mock dependency
  let productService: Mocked<ProductsService>;

  beforeAll(async () => {
    // create an isolated test environment for the unit under test
    const { unit, unitRef } =
      await TestBed.solitary(ProductsController).compile();

    // assign the unit to test
    productController = unit;

    // assign the a dependency to mock from the unit reference
    productService = unitRef.get(ProductsService);
  });

  test('should return 3 products', async () => {
    // the products you expect to retrieve from the database
    const mockedProducts: Product[] = [
      {
        name: 'UltraWidget',
        description: 'A versatile gadget for everyday tasks.',
        price: 199.99,
        id: 'ce34a968-1a73-4b82-99fc-9af57768c22d',
      },
      {
        name: 'SmartLight 3000',
        description:
          'An energy-efficient smart light bulb with customizable colors.',
        price: 29.99,
        id: '080c044f-3dfc-43e0-90d9-9666086ff944',
      },
      {
        name: 'EcoBreeze Air Purifier',
        description:
          'A compact air purifier that removes 99.9% of airborne particles.',
        price: 149.95,
        id: 'a9188527-f139-482d-bd01-ff501c168c23',
      },
    ];
    // mock the findAll() method so that it returns
    // the expected data
    productService.findAll.mockReturnValue(mockedProducts);

    // call the function to test
    const products = await productController.getAll();

    // verify that the mocked service method
    // has been called as expected
    expect(productService.findAll).toHaveBeenCalled();
    // verify that it return the expected data
    expect(products).toEqual(mockedProducts);
  });
});
