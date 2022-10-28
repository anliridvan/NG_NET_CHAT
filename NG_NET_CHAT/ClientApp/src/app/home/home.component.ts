import { Component, Inject } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  //private connection: signalR.HubConnection;
  messages: any;
  connection: any;
  _baseUrl: string;
  hideJoin: boolean | undefined;
  userName: string | undefined;
  constructor( @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }
  ngOnInit(): void {
    this.initWebSocket();
    this.connection.start();
  }



  initWebSocket() {

    let connection = new HubConnectionBuilder()
    .withUrl("https://localhost:44498/Chat")
    .build();
  connection.on("ReceiveAllMessage", data => {
    console.log("REceived Data", data);
  });
  connection.start()
    .then(() => connection.invoke("ReceiveAllMessage", "Hello"));
      ;
    this.connection = new HubConnectionBuilder()
      .withUrl(this._baseUrl + 'hub/chat')
      .build();

    this.connection.on('messageReceived', (from: string, body: string) => {
      this.messages.push({ from, body });
    });

    this.connection.on('userJoined', (user: string) => {
      if (user === this.userName) {
        this.hideJoin = true;
      }
      this.messages.push({ from: '> ', body: user + ' joined' });
    });

    this.connection.on('userLeft', (user: string) => {
      this.messages.push({ from: '! ', body: user + ' has left!' });
    });
  }
}
