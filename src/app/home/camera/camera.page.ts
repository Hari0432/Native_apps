import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  selectImage: any;
  shareImage: any;
  constructor() { }

  ngOnInit() {
  }

  checkPlatformForWeb() {

    if(Capacitor.getPlatform() === 'web') return true;
    
    return false;
  }

  async getPhoto() {

      const status = await Camera.requestPermissions();

      if(status.camera != 'granted' || status.photos != 'granted') return;

      const image = await Camera.getPhoto({

        quality: 100,
        // allowEditing: true,
        source: CameraSource.Prompt,
        width: 600,
        resultType: CameraResultType.Uri

      });

      console.log('Image: ',image);

      this.selectImage = image.webPath;

      this.shareImage = image.path;


      let shareIt = await Share.share({

        title: 'Image Sharing',
        // text: 'Sharing the Image',

        url: this.shareImage,
        // dialogTitle: 'Image Sharing',

      });
      console.log('Shared Image', shareIt)

}

  }
