import { Injectable } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI = environment.apiBaseUrl;
  UserID:any
  UserFullName : any
  UserN : any
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  

  formModel = this.fb.group({
    Email: ['', Validators.email],
    FirstName: [''],
    LastName: [''],
  });
  getAll() {
    return this.http.get(this.BaseURI + '/account');
  }

  

}
