import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http : HttpClient) { }


  FetchingData(Data:any){
    return this.http.get(`https://tailor-backend-hqfi.onrender.com/UserDetails/${Data}`);
  }
  
  AddAddress(Userid:any, AddAddress:any){
    return this.http.put(`https://tailor-backend-hqfi.onrender.com/Address/${Userid}`, AddAddress);
  }

  DeletingAddress(userid:any, addressid:any){
    return this.http.put(`https://tailor-backend-hqfi.onrender.com/DeletingAddress/${userid}`, addressid);
  }

  GettingParticularAddress(UserId:any, AddresId:any){
    return this.http.get(`https://tailor-backend-hqfi.onrender.com/GettingAddressFromUser/${UserId}/${AddresId}`);
  }

  UpdatingAddress(userId:any, AddressId:any, Data:any){
    return this.http.put(`https://tailor-backend-hqfi.onrender.com/AddressUpdate/${userId}/${AddressId}`, Data);
  }

}
