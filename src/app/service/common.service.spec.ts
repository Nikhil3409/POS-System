import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommonService]
    });
    service = TestBed.inject(CommonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get data', () => {
    const mockData = [{ id: 1, name: 'Product 1', price: 10 }];
    service.getData().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne('/assets/product.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('add a product', () => {
    const mockProduct = { id: 1, name: 'Product 1', price: 10 };
    service.addtoCart(mockProduct);
    const cartItems = service.cartItemList;
    expect(cartItems.length).toBe(1);
    expect(cartItems[0]).toEqual({ ...mockProduct, quantity: 1 });
  });

  it('remove a product', () => {
    const mockProduct = { id: 1, name: 'Product 1', price: 10 };
    service.addtoCart(mockProduct);
    service.removeCartItem(mockProduct);
    const cartItems = service.cartItemList;
    expect(cartItems.length).toBe(0);
  });

  it('remove all products ', () => {
    const mockProduct1 = { id: 1, name: 'Product 1', price: 10 };
    const mockProduct2 = { id: 2, name: 'Product 2', price: 20 };
    service.addtoCart(mockProduct1);
    service.addtoCart(mockProduct2);
    service.removeAllCart();
    const cartItems = service.cartItemList;
    expect(cartItems.length).toBe(0);
  });

  it('calculate total price and item total', () => {
    const mockProduct1 = { id: 1, name: 'Product 1', price: 10, quantity: 2 };
    const mockProduct2 = { id: 2, name: 'Product 2', price: 20, quantity: 1 };
    service.addtoCart(mockProduct1);
    service.addtoCart(mockProduct2);
    const totalPrice = service.getTotalPrice();
    expect(totalPrice.total).toBe(40);
    expect(totalPrice.itemTotal).toBe(3);
  });
});
