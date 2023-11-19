import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceiptComponent } from './receipt.component';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/service/common.service';
import { ElementRef, EventEmitter } from '@angular/core';

describe('ReceiptComponent', () => {
  let component: ReceiptComponent;
  let fixture: ComponentFixture<ReceiptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptComponent],
      providers: [DatePipe, CommonService],
    });

    fixture = TestBed.createComponent(ReceiptComponent);
    component = fixture.componentInstance;
  });

  it('create the component', () => {
    expect(component).toBeTruthy();
  });

  it('initialize date on component creation', () => {
    expect(component.date).toBeDefined();
  });

  it('emit Output event on close method call', () => {
    const spy = spyOn(component.Output, 'emit');
    component.close();
    expect(spy).toHaveBeenCalled();
  });

  describe('open method', () => {
    it('set data1 and data2 properties', () => {
      const testData1 = {};
      const testData2 = {};

      component.open(testData1, testData2);

      expect(component.data1).toEqual([testData1]);
      expect(component.data2).toEqual(testData2);
    });

    it(' set display style to "block" on the receipt element', () => {
      component.receipt = { nativeElement: { style: { display: '' } } } as ElementRef;

      component.open(null, null);

      expect(component.receipt.nativeElement.style.display).toBe('block');
    });
  });

  describe('close method', () => {
    it('set display style to "none" on the receipt element', () => {
      component.receipt = { nativeElement: { style: { display: '' } } } as ElementRef;

      component.close();

      expect(component.receipt.nativeElement.style.display).toBe('none');
    });

    it('emit Output event', () => {
      const spy = spyOn(component.Output, 'emit');
      component.close();
      expect(spy).toHaveBeenCalled();
    });
  });
});
