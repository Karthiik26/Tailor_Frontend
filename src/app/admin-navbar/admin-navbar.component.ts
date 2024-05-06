import { Component } from '@angular/core';
import { OrdersService } from '../service/Orders-Admin/orders.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  constructor(private orders: OrdersService){}

  ngOnInit(){
    this.GettingOrdersDetails();
    
  }

  GettingOrdersDetails() {
    let Data = localStorage.getItem('AdminLoggin');
    let AdminId = Data && JSON.parse(Data)._id;
    this.orders.GettingOrderDetails(AdminId).subscribe({
      next: (value: any) => {
        console.log("Getting Orders", value);
      }, error: (err) => {
        console.log("order error", err);
      },
    })
  }



}
