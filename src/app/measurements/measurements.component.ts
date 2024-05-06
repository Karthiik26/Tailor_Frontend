import { formatDate } from '@angular/common';
import { Component } from '@angular/core';

interface FormalDress {
  FormalShirtCheckBox:boolean,
  ShirtArmhole:Number,
  ShirtBackLength:Number,
  ShirtBackWidth:Number,
  ShirtBiceps:Number,
  ShirtChest:Number,
  ShirtFirstButton:Number,
  ShirtFrontLength:Number,
  ShirtSeat:Number,
  ShirtShoulder:Number,
  ShirtWeist:Number,
  ShirtCollar:Number
  ShirtFrontWidth:Number,
  
  ShirtFullHands:Number,
  ShirtFullHandsComment:String,
  ShirtFullHandsCuff:Number,
  ShirtFullHandsForearm:Number,
  
  ShirtHalfHands:Number,
  ShirtHalfHandsLength:Number,
  ShirtHalfHandsOpening:Number,

  FormalPantCheckBox:boolean,
  PantBackPackets:Number,
  PantBackRaise:Number,
  PantBottom:Number,
  PantComment:String,
  PantFrontRaise:Number,
  PantHip:Number,
  PantInseamLength:Number,
  PantKnee:Number,
  PantLength:Number,
  PantThighs:Number,
  PantWeist:Number
}

interface Blazzer {
  BlazerWeist:Number,
  BlazerChest:Number,
  BlazerBottom:Number,
  BlazerFirstButton:Number,
  BlazerShoulder:Number,
  BlazerIndividualShoulder:Number,
  BlazerSleevsLength:Number,
  BlazerAramhole:Number,
  BlazerBiceps:Number,
  BlazerCuff:Number,
  BlazerFrontWidth:Number,
  BlazerBackWidth:Number,
  BlazerFrontLength:Number,
  BlazerBackLength:Number,
  BlazerComment:String
}

interface KurtaPyjama {
  KurtaCheckBox:Boolean,
  KurtaArmhole:Number,
  KurtaFrontLength:Number,
  KurtaBiceps:Number,
  KurtaChest:Number,
  KurtaFullHands:Number,
  KurtaFullHandsCuff:Number,
  KurtaForearm:Number,
  KurtaShoulder:Number,
  KurtaSllevsRound:Number,
  KurtaWeist:Number,
  KurtaCollar:Number,
  KurtaComment:String,

  PaijamaCheckBox:boolean,
  PaijamaBackPocket:Number,
  PaijamaBackRaise:Number,
  PaijamaBottom:Number,
  PaijamaComment:String,
  PaijamaFrontRaise:Number,
  PaijamaHips:Number,
  PaijamaInseamLength:Number,
  PaijamaKnee:Number,
  PaijamaLength:Number,
  PaijamaThighs:Number,
  PaijamaWeist:Number,
}

interface Sherwani {
  SherwaniArmhole:Number,
  SherwaniBiceps:Number,
  SherwaniChest:Number,
  SherwaniComment:String,
  SherwaniCuff:Number,
  SherwaniFrontLength:Number,
  SherwaniHips:Number,
  SherwaniIndividualShoulder:Number,
  SherwaniNackCollar:Number,
  SherwaniShoulder:Number,
  SherwaniSleevsLength:Number,
  SherwaniStomach:Number,
}

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.css']
})
export class MeasurementsComponent {


  // Select One From Bottom 4 Option
  Blazerhiding: boolean = false;
  FormalShirthiding: boolean = false;
  KurtaAndPaijamaHidding: boolean = false;
  SherwaniHidding: boolean = false;


  ProcedSaveButton: boolean = false;
  ProcedSaveButton02: boolean = false;
  ProcedSaveButton03: boolean = false;
  ProcedSaveButton04: boolean = false;

  // formal shirt in checkbox
  FormalDress() {
    this.FormalShirthiding = !this.FormalShirthiding;
    // this.ProcedSaveButton = !this.ProcedSaveButton02;
    this.Blazerhiding = false;
    this.KurtaAndPaijamaHidding = false;
    this.SherwaniHidding=false;
  }

  // blazer in checkbox
  Blazer() {
    this.ProcedSaveButton02 = true;
    this.Blazerhiding = true;
    this.FormalShirthiding = false;
    this.KurtaAndPaijamaHidding = false;
    this.SherwaniHidding=false;
  }

  // Kurta In CheckBox
  KurtaandPaijama() {
    this.KurtaAndPaijamaHidding = !this.KurtaAndPaijamaHidding;
    // this.ProcedSaveButton03 = !this.ProcedSaveButton03;
    this.FormalShirthiding = false;
    this.Blazerhiding = false;
    this.SherwaniHidding=false;
  }
  Sherwani() {
    this.ProcedSaveButton04 = true;
    this.FormalShirthiding = false;
    this.Blazerhiding = false;
    this.KurtaAndPaijamaHidding=false;
    this.SherwaniHidding = true;
  }

  // Formal Shirt-------------------------------------

  // form function formal dress code
  SubmitFormalDress(FormData: FormalDress) {
    console.log(FormData);
  }

  // Shirt Hands-----------

  FullSleevs: boolean = false;
  HalfSleevs: any = false;

  Changeelement(e: any) {
    console.log(e.target.value);
    if (e.target.value == 0) {
      this.FullSleevs = false;
      this.HalfSleevs = false;
    }
    if (e.target.value == 1) {
      this.FullSleevs = !this.FullSleevs;
      this.HalfSleevs = false
    }
    if (e.target.value == 2) {
      this.FullSleevs = false;
      this.HalfSleevs = !this.HalfSleevs;
    } else {
      // this.ProcedSaveButton = false;
    }
  }


  // Formal Pant & shirt Radio ----------

  FormalPant: boolean = false;
  FormalShirt: boolean = false;

  checkbox1: boolean = false;
  checkbox2: boolean = false;
  UpdateText() {
    if (this.checkbox1 && this.checkbox2) {
      console.log('selected');
      this.FormalPant = true;
      this.FormalShirt = true;
      this.ProcedSaveButton = true;
    }
    else if (this.checkbox1) {
      console.log('check 1');
      this.FormalShirt = true;
      this.FormalPant = false;
      this.ProcedSaveButton = true;
    }
    else if (this.checkbox2) {
      console.log('check 2');
      this.FormalPant = true;
      this.FormalShirt = false;
      this.ProcedSaveButton = true;
    }
    else {
      console.log('Wrong');
      this.FormalPant = false;
      this.FormalShirt = false;
      this.ProcedSaveButton = false;
    }
  }
  // blazzer -------------------------------------
  // blazer form data
  BlazerFormGet(blazerFormvalues: Blazzer) {
    console.log(blazerFormvalues);
  }
  // kurta & paijama
  Kurta: boolean = false;
  Paijama: boolean = false;

  checkboxKurta: boolean = false;
  checkboxPaijama: boolean = false;
  UpdateTextKurta() {
    if (this.checkboxKurta && this.checkboxPaijama) {
      console.log('selected');
      this.Paijama = true;
      this.Kurta = true;
      this.ProcedSaveButton03 = true;
    }
    else if (this.checkboxKurta) {
      console.log('check 1');
      this.Kurta = true;
      this.Paijama = false;
      this.ProcedSaveButton03 = true;
    }
    else if (this.checkboxPaijama) {
      console.log('check 2');
      this.Paijama = true;
      this.Kurta = false;
      this.ProcedSaveButton03 = true;
    }
    else {
      console.log('Wrong');
      this.Paijama = false;
      this.Kurta = false;
      this.ProcedSaveButton03 = false;
    }
  }

  // Kurta Form Get
  SubmitKurtaPaijama(KurtaPaijama: KurtaPyjama) {
    console.log(KurtaPaijama);

  }
  // sherwani
  SherwaniFormGet(Sherwanidata: Sherwani) {
    console.log(Sherwanidata);
  }
}
