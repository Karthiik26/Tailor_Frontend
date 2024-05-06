import { Component, Input } from '@angular/core';
import { ClothService } from '../service/Admin/cloth.service';
import { DesignComponent } from '../design/design.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {

  constructor(private ClothService: ClothService) { }
  @Input() item = 0;
  clothnumber: any;
  DataItems: any;
  ngOnInit() {
    let data = this.ClothService.GetData();
    console.log(data);
    this.GetClothId(data);
    this.GettingClothItems();
  }


  GetClothId(ClothData: any) {
    this.ClothService.GettingClothDataByClothId(ClothData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.DataItems = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getImageSource(imageData: any): string {
    if (imageData && imageData.data) {
      return `data:${imageData.contentType};base64,${imageData.data}`;
    }
    return '';
  }

  AddToCart(data: any) {
    console.log(data);
    let Localdata = localStorage.getItem('isLoggedIn');
    let userid = Localdata && JSON.parse(Localdata)._id;
    // this.checkDuplicates(userid,data);
    this.ClothService.AddtoCart(userid, data).subscribe({
      next: (value) => {
        console.log(value);
        this.GettingClothItems();
      },
      error: (err) => {
        console.log(err);

      },
    })
  }

  GettingClothItems() {
    let data = localStorage.getItem('isLoggedIn');
    let userid = data && JSON.parse(data)._id;
    this.ClothService.FetchingCart(userid).subscribe(
      {
        next: (res: any) => {
          console.log(res.length);
          this.clothnumber = res.length;
        },
        error: (err) => {
          console.log(err);

        },
      }
    )
  }

}

