import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TailorService } from '../service/Tailor/tailor.service';
import { ClothService } from '../service/Admin/cloth.service';

@Component({
  selector: 'app-tailor-view',
  templateUrl: './tailor-view.component.html',
  styleUrls: ['./tailor-view.component.css']
})
export class TailorViewComponent {

  constructor(private router : Router, private tailor : TailorService, private cloth : ClothService){}

  RedirectToTailorsProfile(){
    this.router.navigate(['/TailorIg']);
  }

  FetchinTidFromTailor:any;
  ngOnInit(){
    this.FetchingTAILOR();
    let data = this.cloth.GetData()
    console.log(data);
    this.FetchinTidFromTailor=data;
    this.FetchingTailorById();
  }

  TailorDataById:any;
  FetchingTailorById(){
    this.tailor.GettingTailorById(this.FetchinTidFromTailor).subscribe({
      next:(value)=> {
        console.log(value);
        this.TailorDataById=value;
      },error:(err)=> {
        console.log(err);
      },
    })
  }

  TailorDetails:any;
  FetchingTAILOR(){
    this.tailor.FetchingTailors().subscribe({
      next:(value)=> {
        console.log(value);
        this.TailorDetails=value;
      },
      error:(err) => {
        console.log(err);
        
      },
    })
  }


  
  // Fetching Image
  getImageSource(imageData: any): string {
    if (!imageData || !imageData.Data || !imageData.Data.data) {
      return '';
    }
  
    // Convert the raw image data to base64
    const base64String = this.arrayBufferToBase64(imageData.Data.data);
  
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
