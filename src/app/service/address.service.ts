import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http : HttpClient) { }


  FetchingData(Data:any){
    return this.http.get(`http://localhost:4500/UserDetails/${Data}`);
  }
  
  AddAddress(Userid:any, AddAddress:any){
    return this.http.put(`http://localhost:4500/Address/${Userid}`, AddAddress);
  }

  DeletingAddress(userid:any, addressid:any){
    return this.http.put(`http://localhost:4500/DeletingAddress/${userid}`, addressid);
  }

  GettingParticularAddress(UserId:any, AddresId:any){
    return this.http.get(`http://localhost:4500/GettingAddressFromUser/${UserId}/${AddresId}`);
  }

  UpdatingAddress(userId:any, AddressId:any, Data:any){
    return this.http.put(`http://localhost:4500/AddressUpdate/${userId}/${AddressId}`, Data);
  }

}
