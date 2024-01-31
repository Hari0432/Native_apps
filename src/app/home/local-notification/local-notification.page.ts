import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-local-notification',
  templateUrl: './local-notification.page.html',
  styleUrls: ['./local-notification.page.scss'],
})
export class LocalNotificationPage implements OnInit {

  constructor() { }

  async ngOnInit() {
    await LocalNotifications.requestPermissions();
  }

  async schedule() {
    if(isPlatform('android') === true) {
      await LocalNotifications.createChannel({
        id: '1',
        name: 'Local Notifications',
        sound: 'sound.wav'
      });
    }

    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: 'My Notification Title',
          body: 'This is my notification message!',
          id: 1,
          // schedule:{ at: new Date(Date.now() + 1000 * 5) },
          sound: 'sound.wav',
          attachments: [],
          smallIcon: 'ic_stat_adb',
          actionTypeId: '',
          extra: {
            data: 'Checking extras'
          }
        }
      ]
    });
    console.log('notifs', notifs);
    
  }
}
