import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http : HttpClient) { }

  GettingOrderDetails(AdminId:any){
    return this.http.get(`http://localhost:4500/Admin/Orders/${AdminId}`);
  }

  // Cancellingorder
  OrderCancelling( UserId:any, AdminId:any, OrderId:any){
    return this.http.put(`http://localhost:4500/CancellIng/${UserId}/${AdminId}` , { OrderId: OrderId }, {responseType: 'text'});
  }
  
  ClothDataByClothId: any;
  setGettingClothData(Data: any) {
    this.ClothDataByClothId = Data;
  }

  GetData() {
    return this.ClothDataByClothId;
  }
}
