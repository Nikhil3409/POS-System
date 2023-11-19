import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OnChanges, SimpleChanges } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  @ViewChild('myModal', { static: false }) receipt!: ElementRef;
  @Output() Output: EventEmitter<string> = new EventEmitter();
  date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  saleNumber : number = 100;
  data1: any = [];
  data2: any = [];
  constructor(private datePipe: DatePipe, private service: CommonService) { }

  ngOnInit(): void {
  }

  open(data1: any, data2: any) {
    this.saleNumber = this.saleNumber + 1;
    this.data1 = [];
    this.data2 = [];
    this.data1.push(data1);
    this.data2 = data2;
    this.receipt.nativeElement.style.display = 'block';
  }

  close() {
    this.receipt.nativeElement.style.display = 'none';
    this.Output.emit();
  }

}
