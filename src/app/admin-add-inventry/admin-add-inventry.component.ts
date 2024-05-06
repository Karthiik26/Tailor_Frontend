import { Component } from '@angular/core';
import { ClothService } from '../service/Admin/cloth.service';

@Component({
  selector: 'app-admin-add-inventry',
  templateUrl: './admin-add-inventry.component.html',
  styleUrls: ['./admin-add-inventry.component.css']
})
export class AdminAddInventryComponent {

  constructor(private service: ClothService) { }

  msgPopUp1: boolean = false;
  msgPopUp2: boolean = false;
  msgsending: String = '';
  msgsending2: String = '';

  
  ClothAdd(data: any, ImageData: any) {
    let Admin = localStorage.getItem('AdminLoggin');
    let AdminId = Admin && JSON.parse(Admin)._id;
    console.log(AdminId);

    const imageFile = ImageData.files[0];
    this.service.AddingClothProduct(AdminId, data, imageFile).subscribe(
      {
        next: (res) => {
          console.log(res);
          if (res.error === 'No file uploaded') {
            this.msgPopUp1 = false;
            this.msgPopUp2 = true;
            console.log('No file uploaded');
            
            this.msgsending = 'No file uploaded';
          } else if (res && res.error === 'Missing required fields') {
            this.msgPopUp1 = false;
            this.msgPopUp2 = true;
            this.msgsending = 'Missing required fields';
          } else if (res && res.message === 'File uploaded successfully') {
            this.msgPopUp2 = false;
            this.msgPopUp1 = true;
            this.msgsending2 = 'File uploaded successfully';
          } else {
            this.msgPopUp1 = false;
            this.msgPopUp2 = true;
            this.msgsending = 'Internal server error';
          }
        },
        error: (err) => {
          console.log(err);
          this.msgPopUp1 = false;
          this.msgPopUp2 = true;
          this.msgsending = 'Internal server error';
        },
      }
    )
  }

}
