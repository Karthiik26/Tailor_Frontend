import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ClothService } from '../service/Admin/cloth.service';
import { SocketioService } from '../socket/socketio.service';
import { OrdersService } from '../service/Orders-Admin/orders.service';
import { AddressService } from '../service/address.service';
// import { window } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    private router: Router, 
    private order: OrdersService, 
    private Cloth: ClothService, 
    private socket: SocketioService,
    private address : AddressService) { }

  @Input() item : any;
  @Input() nameinp:any;
  @Input() UserImg:any;

  Ordermsg: any;
  FirstName: any = '';
  dataid: any;
  CartArray: any;
  ShowHideLengthCart:boolean=true;
  ngOnInit(): void {
    this.Cloth.GetData();
    this.GettingName();
    this.GettingClothItems();
    this.Notification()
    this.Cloth.getClothItems().subscribe(
      (res: any) => {
        this.item = res.length;
        if (res.length===0) {
          // this.ShowHideLengthCart=false;
        }
      }
    )


    this.Notification();
    // this.Ordermsg=this.Cloth.GetData();
  }

  GettingName() {
    let data: any = localStorage.getItem('isLoggedIn');
    let user = data && JSON.parse(data)._id;
    if (typeof data === 'string') {
      data = JSON.parse(data);
      this.dataid = data._id;
      console.log(data._id);
      // console.log(data.FirstName);
      // this.FirstName = data.FirstName;
    }
    this.address.FetchingData(user).subscribe({
      next:(value:any) => {
        console.log(value);
        this.FirstName = value.FirstName;
      },error:(err) => {
        console.log(err);
        
      },
    })
  }

  home() {
    this.router.navigate(['/']);
  }

  LogOut() {
    // localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['Login']); 
  }

  NotificationHide: boolean = false;

  NotificationShow() {
    this.NotificationHide = !this.NotificationHide;
    this.Notification();
    // setTimeout(() => {
    //   this.NotificationHide = !this.NotificationHide;
    // }, 10000);
  }

  GettingClothItems() {
    let data = localStorage.getItem('isLoggedIn');
    let userid = data && JSON.parse(data)._id;
    this.Cloth.FetchingCart(userid).subscribe(
      {
        next: (res: any) => {
          console.log(res.length);
          this.CartArray = res.length;
        },
        error: (err) => {
          console.log(err);

        },
      }
    )
  }

  HideDotRed:any;
  hidenoti1:boolean=false;
  hidenoti2:boolean=true;
  Notification() {
    this.Cloth.GettingNotification().subscribe({
      next: (value: any) => {
        console.log(value);
        this.Ordermsg = value.reverse();
        if (value.length == 0) {
          this.HideDotRed=false;
          this.hidenoti1=false;
          this.hidenoti2=true;
        }else{
          this.hidenoti1=true;
          this.hidenoti2=false;
          this.HideDotRed=true
        }
        

      }, error: (err) => {
        console.log(err);
      },
    });
  }

  
// Fetching Image
getImageSource(imageData: any): string {
  if (!imageData || !imageData.data || !imageData.data.data) {
    return '';
  }
  // Convert the raw image data to base64
  const base64String = this.arrayBufferToBase64(imageData.data.data);
  if (base64String) {
    return `data:${imageData.contentType};base64,${base64String}`;
  }
  return '';
}

arrayBufferToBase64(buffer: ArrayBuffer): string {
  const binary = new Uint8Array(buffer);
  const bytes: number[] = [];

  binary.forEach(byte => bytes.push(byte));

  return btoa(String.fromCharCode.apply(null, bytes));
}


}
