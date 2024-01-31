import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Component, OnInit } from '@angular/core';
import { ContactPayload, Contacts, PhonePayload } from '@capacitor-community/contacts';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  contacts: any[] = []; 
  constructor(private callNumber: CallNumber) { }

  ngOnInit() {
    this.getContacts();
  }

  async getContacts() {
    try {
    const permission = await  Contacts.requestPermissions();

    if(!permission.contacts) {

      alert('User did not grant permission');

      return;

    }
    else if (permission.contacts == 'granted') {

      const result = await Contacts.getContacts({

        projection: {
          name: true,
          phones: true
        }

      });

      this.contacts = result.contacts; 
              
    }
      
    } catch (error) {

      console.log(error);
      
    }    
  }

  formatContactDetails(contact : ContactPayload) : string {

    const name = contact.name ? contact.name.display ? contact.name.display : '' : '';

    const details : string = (name)!.toString()

    // console.log(details, this.joinPhoneNumbers(contact.phones))

    return details;

  }

  // joinPhoneNumbers(phones: PhonePayload[] | undefined) : string {

  //   if(phones === undefined) {
  //     return '';
  //   }

  //   const phoneNumbers = phones.map((item) => item.number);

  //   return phoneNumbers.join(' ');

  // }

  call(contact: any) {

    let phoneNumber = contact.phones[0].number;

    this.callNumber.callNumber(phoneNumber, true)
    .then(res => console.log(`Calling... ${phoneNumber}`, res))
    .catch(err => console.log(`Error calling ${phoneNumber}...`, err));
    
  }

  
  public results = this.contacts;

  handleInput(event: any) {
    
    const query = event.target.value.toLowerCase();
  
    this.results = this.contacts.filter((contact) =>

      typeof contact.name?.display  === 'string' && contact.name.display.toLowerCase().includes(query)

    );
  
  }

}
