import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppointmentService } from '../appointment.service';

@Injectable({
  providedIn: 'root'
})
export class ClothService {


  cartData2 = new EventEmitter<any[] | []>();

  constructor(private http: HttpClient, private appointment: AppointmentService) { }

  AddingClothProduct(_id: string, clothData: any, image: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('ClothName', clothData.ClothName);
    formData.append('ClothAbout', clothData.ClothAbout);
    formData.append('ClothQuantities', clothData.ClothQuantities);
    formData.append('ClothPrice', clothData.ClothPrice);
    formData.append('ClothTotalWithQuaPrice', clothData.ClothTotalWithQuaPrice);

    return this.http.post(`https://tailor-backend-hqfi.onrender.com/ClothInsert/${_id}`, formData);
  }

  GettingCloth(AdminId: any) {
    return this.http.get(`https://tailor-backend-hqfi.onrender.com/GettingCloth/${AdminId}`);
  }

  DeletIngCloth(AdminId: any, ClothId: any) {
    return this.http.put(`https://tailor-backend-hqfi.onrender.com/DeletingCloth/${AdminId}`, ClothId);
  }

  // https://tailor-backend-hqfi.onrender.com/GettingClothImages/65d39b492eb8902cd2166247/images
  FetchingAllImages(adminId: any) {
    return this.http.get(`https://tailor-backend-hqfi.onrender.com/GettingClothImages/${adminId}/images`);
  }

  GettingClothFromAdmin(AdminId: any, ClothId: any) {
    return this.http.get(`https://tailor-backend-hqfi.onrender.com/GettingClothFromAdmin/${AdminId}/${ClothId}`);
  }
  GettingExchangeData: any;
  Exchange(data: any) {
    this.GettingExchangeData = data;
  }

  UpdatingClothProduct(ClothId: string, clothData: any, image: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('ClothName', clothData.ClothName);
    formData.append('ClothAbout', clothData.ClothAbout);
    formData.append('ClothQuantities', clothData.ClothQuantities);
    formData.append('ClothPrice', clothData.ClothPrice);

    return this.http.put(`https://tailor-backend-hqfi.onrender.com/ClothUpdate/${ClothId}`, formData);
  }

  GettingClothDataByClothId(ClothId: any) {
    return this.http.get(`https://tailor-backend-hqfi.onrender.com/GettingDetailCloth/${ClothId}`);
  }

  // exchanging data between components
  ClothDataByClothId: any;
  ClothDataByClothId2: any;
  setGettingClothData(Data: any) {
    this.ClothDataByClothId = Data;
  }
  setGettingClothData2(Data: any) {
    this.ClothDataByClothId2 = Data;
  }

  GetData2() {
    return this.ClothDataByClothId2;
  }

  GetData() {
    return this.ClothDataByClothId;
  }

  AddtoCart(UserId: any, ClothId: any): Observable<any> {
    return this.http.post(`https://tailor-backend-hqfi.onrender.com/Addtocart/${UserId}/${ClothId}`, {});
  }

  private handleError(error: any) {
    console.error('API error', error);
    return throwError('An error occurred, please try again later.');
  }

  FetchingCart(userId: any) {
    return this.http.get(`https://tailor-backend-hqfi.onrender.com/AddtoCartGetting/${userId}`);
  }

  RemovingClothItem(UserId: any, ClothId: any) {
    return this.http.put(`https://tailor-backend-hqfi.onrender.com/RemovingClothItem/${UserId}`, ClothId);
  }

  UserId: any;
  getClothItems() {
    let data = localStorage.getItem('isLoggedIn');
    let userId = data && JSON.parse(data)._id;
    this.UserId = userId;
    return this.FetchingCart(userId);
  }

  // Updating ClothQuantityUser
  UpdatingQuantity(UserId: any, ClothId: any, Data: any) {
    return this.http.put(`https://tailor-backend-hqfi.onrender.com/updateClothQuantityUser/${UserId}/${ClothId}`, Data);
  }

  // Updating Price

  UpdatingPrice(): Observable<any> {
    return this.http.post(`https://tailor-backend-hqfi.onrender.com/CartPrice/${this.UserId}`, {});
  }

  // Payment
  // Payment Create order
  AdminId:any = `65d39b492eb8902cd2166247`;
  CreatingOrder(AddressId: any, PayementId:any, orderid:any, grandTotal: any) {
    const data = { AddressId, PayementId, orderid}
    return this.http.post(`https://tailor-backend-hqfi.onrender.com/CheckOutCartItems/CreateOrder/${this.UserId}/${this.AdminId}/${grandTotal}`, data);
  }

  // Time
  GettingTime() {
    return this.http.get('https://tailor-backend-hqfi.onrender.com/GetingTime', {});
  }

  // Order book
  GettingNotification(){
    let data = localStorage.getItem('isLoggedIn');
    let user = data && JSON.parse(data)._id;
    return this.http.get(`https://tailor-backend-hqfi.onrender.com/Notification/${user}`);
  }

  // Delivery msg
  DeliveryMsg(userId:any, OrderId:any){
    let data2 = `65d39b492eb8902cd2166247`;
    return this.http.post(`https://tailor-backend-hqfi.onrender.com/send/Delivery/message/${userId}/${OrderId}/${data2}`, {});
  }

  
}
