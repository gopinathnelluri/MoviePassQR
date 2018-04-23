import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AddPage } from "../add/add";
import { NavParams, NavController } from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root:any = AddPage;
  tab2Root:any = HomePage;
  
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public nav: NavController){
  }

  ionViewDidLoad() {
    
  }

}
