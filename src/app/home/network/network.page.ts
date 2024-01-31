import { Component, OnDestroy, OnInit } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit, OnDestroy {
  // status!: ConnectionStatus;
  status!: string;
  networkListener!: PluginListenerHandle;


  constructor() { }

  async ngOnInit() {

    this.networkListener = await Network.addListener('networkStatusChange', status => {
      this.changeStatus(status);
      console.log('Network changed', status); 
      
    });

    const status = await Network.getStatus();
    this.changeStatus(status)
    console.log('Network status:', this.status);
  }

  async changeStatus(status: any) {
    this.status = status.connected ? 'Online' : 'Offline';
    await Toast.show({
      text: this.status,
    });

  }

  ngOnDestroy(): void {
    if(this.networkListener){
      this.networkListener.remove();
    }
  }

}
