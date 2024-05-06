import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tailor-nav',
  templateUrl: './tailor-nav.component.html',
  styleUrls: ['./tailor-nav.component.css']
})
export class TailorNavComponent implements OnInit{

  constructor(
    private router: Router
  ) { }
  
  TailorName:any='';

  ngOnInit(): void {
    let data = localStorage.getItem('TailorLoggin');
    this.TailorName=data && JSON.parse(data).TailorName;
  }
  
  // TailorName:any=this.T1;


  TailorLogout(){
    localStorage.setItem('TailorLoggin', 'false');
    this.router.navigate(['TailorLogin']);
  }


}
