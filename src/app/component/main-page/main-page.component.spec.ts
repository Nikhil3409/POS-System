import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MainPageComponent, receiptModel } from './main-page.component';
import { CommonService } from 'src/app/service/common.service';
import { of } from 'rxjs';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let commonService: jasmine.SpyObj<CommonService>;

  beforeEach(() => {
    const commonServiceSpy = jasmine.createSpyObj('CommonService', ['getProducts', 'addtoCart', 'removeCartItem', 'getTotalPrice', 'removeAllCart']);

    TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      providers: [
        { provide: CommonService, useValue: commonServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    commonService = TestBed.inject(CommonService) as jasmine.SpyObj<CommonService>;
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('call selectProduct method and update selectedProductList, grandTotal, and itemTotal', fakeAsync(() => {
    const product = {};
    commonService.getProducts.and.returnValue(of([]));
    commonService.getTotalPrice.and.returnValue({ total: 100, itemTotal: 5 });

    component.selectProduct(product);

    tick();

    expect(commonService.addtoCart).toHaveBeenCalledWith(product);
    expect(component.selectedProductList).toEqual([]);
    expect(component.grandTotal).toEqual(100);
    expect(component.itemTotal).toEqual(5);
  }));

  it('call handleMinus method and update item quantity, grandTotal, and itemTotal', () => {
    const item = { quantity: 2 };

    component.handleMinus(item);
    expect(item.quantity).toEqual(1);
  });

});
