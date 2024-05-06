import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';


@Component({
  selector: 'app-admin-user-manage',
  templateUrl: './admin-user-manage.component.html',
  styleUrls: ['./admin-user-manage.component.css']
})
export class AdminUserManageComponent {

  constructor(private loginservice : LoginService){}

  ngOnInit(){
    this.FetchingData();
  }
  
  UserData:any;
  length:any;
  FetchingData(){
    this.loginservice.UserFetching().subscribe({
      next:(value)=> {
        console.log(value);
        this.UserData=value;
        for (let i = 0; i < this.UserData.length; i++) {
          const element = this.UserData[i];
          this.length=this.UserData.length
        }
      },error:(err)=> {
        console.log(err);
      },
    })
  }

  DeleteUser(data:any){
    console.log(data);
    this.loginservice.DeleteUser(data).subscribe({
      next:(value) => {
        console.log(value);
        this.FetchingData();
      },error:(err) => {
        console.log(err);
        
      },
    })
  }

}
