import { Component } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  //private connection: signalR.HubConnection;
  messages: any;
  connection: any;
  hideJoin: boolean | undefined;
  userName: string | undefined;
  ngOnInit(): void {
    this.initWebSocket();
  }

  initWebSocket() {
    this.connection = new HubConnectionBuilder()
      .withUrl('/hub/chat')
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
