import { Component } from '@angular/core';
import { Share } from '@capacitor/share';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  goToNetwork() {
    this.navCtrl.navigateForward('/home/network');
  }

  goToCamera() {
    // this.navCtrl.navigateForward('/home/camera')
    this.navCtrl.navigateBack('/home')
  }
  async share() {
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }
}
