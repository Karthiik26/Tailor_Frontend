import { Component } from '@angular/core';
import { OrdersService } from '../service/Orders-Admin/orders.service';
import { SocketioService } from '../socket/socketio.service';
import { ClothService } from '../service/Admin/cloth.service';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent {

  constructor(private orders: OrdersService, private socketio: SocketioService, private cloth: ClothService, private addressservice: AddressService) { }

  AdminId: any;
  UserId: any;
  ngOnInit() {
    let Data = localStorage.getItem('AdminLoggin');
    this.AdminId = Data && JSON.parse(Data)._id;
    console.log(this.AdminId);

    let user = localStorage.getItem('isLoggedIn');
    this.UserId = user && JSON.parse(user)._id;
    console.log(this.UserId);
    this.GettingOrdersDetails();
    this.FetchingOrders();
  }

  OrderUserDetails: any;
  OrderDetails: any;
  CartItems: any;
 
  GettingOrdersDetails() {
    this.orders.GettingOrderDetails(this.AdminId).subscribe({
      next: (value: any) => {
        console.log("Getting Orders", value);
        this.OrderDetails = value;
        this.OrderUserDetails = value.UserDetails;
        this.CartItems = value.CartItems;
      }, error: (err) => {
        console.log("order error", err);
      },
    })
  }

  
  CancelOrder(OrderId: any, userId: any) {
    this.orders.OrderCancelling(userId, this.AdminId, OrderId).subscribe({
      next: (value) => {
        console.log(value);
        this.GettingOrdersDetails();
      }, error: (err) => {
        console.log(err);
      },
    })
    this.cloth.GettingNotification();
  }

  FetchingOrders() {
    let user = localStorage.getItem('isLoggedIn');
    let data = user && JSON.parse(user)._id;
    this.addressservice.FetchingData(data).subscribe({
      next: (value: any) => {
        console.log(value.OrderConfirmation);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  GetOrderId:any;
  userId:any;
  ProcedForDelivery(orderid:any, userid:any){
    this.GetOrderId=orderid;
    this.userId=userid;
    console.log(userid,orderid);
    
  }  
  
  OutForDelivery:boolean=true;
  ConfirmOrder(){
    this.cloth.DeliveryMsg(this.userId, this.GetOrderId).subscribe({
      next:(value:any) => {
        console.log("msg",value);
        if (value.message === 'Message sent and saved successfully') {
          this.OutForDelivery=false;
        }
      },error:(err)=> {
        console.log(err);
      },
    })
  }
  
  // Function to determine whether to show the Proceed button or not
shouldShowProceedButton(orderId: string, userId: string): boolean {
  return this.OutForDelivery && orderId !== this.GetOrderId && userId !== this.userId;
}

}
