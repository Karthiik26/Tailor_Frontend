import { Component } from '@angular/core';
import { AdminInventryComponent } from '../admin-inventry/admin-inventry.component';
import { ClothService } from '../service/Admin/cloth.service';

@Component({
  selector: 'app-admin-inventry-update',
  templateUrl: './admin-inventry-update.component.html',
  styleUrls: ['./admin-inventry-update.component.css']
})
export class AdminInventryUpdateComponent {

  constructor( private ClothService : ClothService ){}

  // DataSets:any;
  // ngOnInit(){
  //   this.DataSets = this.ClothService.GettingExchangeData;
  //   this.DataSets.ClothId;
  // }

}
