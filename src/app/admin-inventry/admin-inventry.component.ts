import { Component } from '@angular/core';
import { ClothService } from '../service/Admin/cloth.service';

@Component({
  selector: 'app-admin-inventry',
  templateUrl: './admin-inventry.component.html',
  styleUrls: ['./admin-inventry.component.css']
})
export class AdminInventryComponent {

  constructor(
    private clothservice: ClothService
  ) { }

  ngOnInit(): void {
    this.FetchingClothArray();
  }

  ClothData: any;
  ImageFinal: any;
  clothImage: string | ArrayBuffer | null = null;
  TotalStock:any;
  FetchingClothArray() {
    let localstorage = localStorage.getItem('AdminLoggin');
    let AdminId = localstorage && JSON.parse(localstorage)._id;
    console.log(AdminId);

    this.clothservice.GettingCloth(AdminId).subscribe(
      {
        next: (res: any) => {
          console.log("resonspse in cloth image");
          console.log(res);
          this.ClothData = res;
          this.TotalStock=this.ClothData.length;
        }, 
        error(err) {
          console.log(err);

        },
      }
    );
  }

  // Fetching Image
  getImageSource(imageData: any): string {
    if (imageData && imageData.data) {
      return `data:${imageData.contentType};base64,${imageData.data}`;
    }
    return '';
  }

  // Fetching Image File NAME
  getFileNameFromBase64(base64String: string): string {
    // Assuming contentType is always available and contains the file name
    const matches = base64String.match(/^data:image\/([a-zA-Z0-9]+);base64,/);
    if (matches && matches.length > 1) {
      const extension = matches[1];
      return `cloth_image.${extension}`;
    }
    return 'unknown_file';
  }

  DeletingImage(ClothId:any){
    console.log("CLOTH ID "+ClothId);
    let data = localStorage.getItem('AdminLoggin');
    let AdminId = data && JSON.parse(data)._id;  
    this.clothservice.DeletIngCloth(AdminId, {ClothId}).subscribe(
      {
        next : (res) => {
          console.log(res);
          this.FetchingClothArray();
        },
        error(err) {
          console.log(err);
          
        },
      }
    );
  }

  GettingClothToAC:any;
  GettingEditClothId(ClothId: any) {
    let data = localStorage.getItem('AdminLoggin');
    let AdminId = data && JSON.parse(data)._id;
      this.clothservice.GettingClothFromAdmin(AdminId, ClothId).subscribe({
        next: (res) => {
          console.log("getting address ");
          console.log(res);
          this.GettingClothToAC=res;
        },
        error(err) {
          console.log(err);
        },
      });

  }

// Updating Cloth
  UpdateCloth(ClothId:any,  Data:any, image:any){
    // console.log(ClothId);
    // console.log(Data);
    // console.log(image);
    
    const imageFile = image.files[0];

    this.clothservice.UpdatingClothProduct(ClothId, Data, imageFile).subscribe({
      next : (res) => {
        if (res) {
          this.FetchingClothArray();
        }
        
      },
      error : (err) => {
        console.log(err);
        
      },
    })
    
  }


}
