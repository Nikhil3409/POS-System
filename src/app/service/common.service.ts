import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<any>('/assets/product.json').pipe(map((res: any) => {
      res.forEach((element: any, index: any) => {
        element.id = index + 1
      });
      return res;
    }))
  }

  getProducts() {
    return this.productList.asObservable();
  }

  array: any = [];
  addtoCart(product: any) {
    let uniqueproduct: any = [];
    let itemMap: any = {};
    product.quantity = 1;
    this.array.push(product);
    this.array.forEach((item: any) => {
      if (itemMap[item.id]) {
        itemMap[item.id].quantity += 1;
      } else {
        itemMap[item.id] = { ...item };
        uniqueproduct.push(itemMap[item.id]);
      }
    });
    this.cartItemList = uniqueproduct;
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice() {
    let grandTotal = 0;
    let granditem = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += Number(a.price) * Number(a.quantity);
      granditem = Number(a.quantity) + granditem;
    })
    return {
      total: grandTotal,
      itemTotal: granditem
    };
  }

  removeCartItem(product: any) {
    this.array = [];
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        product.quantity = 0
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
