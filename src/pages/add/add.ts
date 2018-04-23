import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import Tesseract from 'tesseract.js';
/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
  providers: [Camera]
})
export class AddPage {

  srcImage: string;
  OCRAD: any;
  code: string;

  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public loadingCtrl: LoadingController,
              private camera: Camera) {
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  ionViewDidLoad() {
  //  this.presentActionSheet();
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Choose Photo',
          handler: () => {
            this.getPicture(0); // 0 == Library
          }
        },
        /*  
        {
          text: 'Take Photo',
          handler: () => {
            this.getPicture(1); // 1 == Camera
          }
        },
        */
        {
          text: 'Demo Photo',
          handler: () => {
            this.srcImage = './assets/imgs/demo.jpg';
            this.analyze(this.srcImage);
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  getPicture(sourceType: number) {
    this.camera.getPicture({
      quality: 100,
      destinationType: 0, // DATA_URL
      sourceType,
      allowEdit: false,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.srcImage = `data:image/jpeg;base64,${imageData}`;
      this.analyze(this.srcImage);
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  analyze(image) {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();

    
    /// Recognize data from image
    Tesseract.recognize(image, {})
      .progress((progress) => {
        console.log('progress:', progress);
      })
      .then((tesseractResult) => {
        console.log(tesseractResult);
          var lines:any[] = tesseractResult.lines;
          for(var i = 0; i < lines.length; ++i){
            if(lines[i].text.indexOf("code:") != -1){
                this.code = lines[i+1].words[0].text;
                console.log("final code:",this.code);
            }
          }
        loader.dismissAll();
      });
  }

  restart() {
    this.srcImage = '';
    this.presentActionSheet();
  }



}
