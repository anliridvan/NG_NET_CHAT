import { Component, Inject, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { MessageService } from '../service/message.service';
import { Guid } from 'guid-typescript';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit  {

  
  loggedInUser = JSON.parse(localStorage.getItem("login-user")!)
  users:any;
  chatUser:any;

  messages: any[] = [];
  displayMessages: any[] = []
  message!: string; 
  hubConnection!: HubConnection;

 
  connectedUsers: any[] = []
  constructor(private router: Router, private service: UserService, private messageService: MessageService) { }

  ngOnInit() {
     this.messageService.getReceivedMessages().subscribe((item:any)=>{
       if(item){
         this.messages=item;
         this.messages.forEach(x=>{
          x.type= x.Sender===this.loggedInUser.id? 'sent':'recieved';
         })
         console.log(this.messages);
       }
     })
    
    this.service.getAll().subscribe(
      (user:any) => {
        if(user){
        this.users=user.filter((x: { email: any; })=>x.email!==this.loggedInUser.email);
        this.users.forEach((item: { [x: string]: boolean; })=>{
          item['isActive']=false;
        })
        this.makeItOnline();
        }
      },
      err => {
        console.log(err);
      },
    );




    this.message = ''
    this.hubConnection = new HubConnectionBuilder().withUrl(environment.chatHubUrl).build();
    const self = this
    this.hubConnection.start()
      .then(() => {
        self.hubConnection.invoke("PublishUserOnConnect", this.loggedInUser.id, this.loggedInUser.firstName, this.loggedInUser.userName)
          .then(() => console.log('User Sent Successfully'))
          .catch(err => console.error(err));

        this.hubConnection.on("BroadcastUserOnConnect", Usrs => {
          this.connectedUsers = Usrs;
          this.makeItOnline();
        })
        this.hubConnection.on("BroadcastUserOnDisconnect", Usrs => {
          this.connectedUsers = Usrs;
          this.users.forEach((item: { isOnline: boolean; }) => {
            item.isOnline = false;
          });
          this.makeItOnline();
        })
      })
      .catch(err => console.log(err));

    // this.hubConnection.on("UserConnected", (connectionId) => this.UserConnectionID = connectionId);

    this.hubConnection.on('BroadCastDeleteMessage', (connectionId, message) => {
     let deletedMessage=this.messages.find(x=>x.id===message.id);
     if(deletedMessage){
       deletedMessage.isReceiverDeleted=message.isReceiverDeleted;
       deletedMessage.isSenderDeleted=message.isSenderDeleted;
       if(deletedMessage.isReceiverDeleted && deletedMessage.receiver===this.chatUser.id){
        this.displayMessages = this.messages.filter(x => (x.type === 'sent' && x.receiver === this.chatUser.id) || (x.type === 'recieved' && x.sender === this.chatUser.id));
       }
     }

    })

    this.hubConnection.on('ReceiveDM', (connectionId, message) => {
      console.log(message);
      message.type = 'recieved';
      this.messages.push(message);
      let curentUser = this.users.find((x: { id: any; }) => x.id === message.sender);
      this.chatUser = curentUser;
      this.users.forEach((item: { [x: string]: boolean; }) => {
        item['isActive'] = false;
      });
      var user = this.users.find((x: { id: any; }) => x.id == this.chatUser.id);
      user['isActive'] = true;
      this.displayMessages = this.messages.filter(x => (x.type === 'sent' && x.receiver === this.chatUser.id) || (x.type === 'recieved' && x.sender === this.chatUser.id));
    })
  }

  SendDirectMessage() {
    if (this.message != '' && this.message.trim() != '') {
      let guid=Guid.create();
      var msg = {
        id:guid.toString(),
        sender: this.loggedInUser.id,
        receiver: this.chatUser.id,
        messageDate: new Date(),
        type: 'sent',
        content: this.message
      };
      this.messages.push(msg);
      this.displayMessages = this.messages.filter(x => (x.type === 'sent' && x.receiver === this.chatUser.id) || (x.type === 'recieved' && x.sender === this.chatUser.id));

      this.hubConnection.invoke('SendMessageToUser', msg)
        .then(() => console.log('Message to user Sent Successfully'))
        .catch(err => console.error(err));
      this.message = '';
    }
  }

  openChat(user: { [x: string]: boolean; }) {
    this.users.forEach((item: { [x: string]: boolean; }) => {
      item['isActive'] = false;
    });
    user['isActive'] = true;
    this.chatUser = user;
    this.displayMessages = this.messages.filter(x => (x.type === 'sent' && x.receiver === this.chatUser.id) || (x.type === 'recieved' && x.sender === this.chatUser.id));;
  }

  makeItOnline() {
    if (this.connectedUsers && this.users) {
      this.connectedUsers.forEach(item => {
        var u = this.users.find((x: { userName: any; }) => x.userName == item.username);
        if (u) {
          u.isOnline = true;
        }
      })
    }
  }
  deleteMessage(message: { isSenderDeleted: any; isReceiverDeleted: boolean; },deleteType: any,isSender: any){
    let deleteMessage={
      'deleteType':deleteType,
      'message':message,
      'deletedUserId':this.loggedInUser.id
    }
    this.hubConnection.invoke('DeleteMessage', deleteMessage)
        .then(() => console.log('publish delete request'))
        .catch(err => console.error(err));
    message.isSenderDeleted=isSender;
    message.isReceiverDeleted=!isSender;
  }

  onLogout() {
    this.hubConnection.invoke("RemoveOnlineUser", this.loggedInUser.id)
      .then(() => {
        this.messages.push('User Disconnected Successfully')
      })
      .catch(err => console.error(err));
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  
}
