import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class MessageService {
    readonly BaseURI = environment.apiBaseUrl;
    constructor(private http: HttpClient){

    }
    getReceivedMessages() {
      return this.http.get(this.BaseURI + '/message');
    }
      deleteMessage(message:string) {
        return this.http.post(this.BaseURI + '/message',message);
      }
  }