import {Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { fromEvent } from 'rxjs';
import {map, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {ajax} from "rxjs/ajax";
import {IUser} from "../../model/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit {

  user: IUser

  firstName = new FormControl('',[Validators.required, Validators.minLength(2)]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(2)]);
  dateOfBirth = new FormControl('', [Validators.required, Validators.minLength(10)]);
  email = new FormControl('', [Validators.email, Validators.required]);
  framework = new FormControl('', [Validators.required]);
  frameworkVersion = new FormControl('', [Validators.required]);
  hobby = new FormControl('', [Validators.required]);
  periodHobby = new FormControl('', [Validators.required, Validators.minLength(7)])

  myFormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    dateOfBirth: this.dateOfBirth,
    email: this.email,
    framework: this.framework,
    frameworkVersion: this.frameworkVersion,
    hobby: this.hobby
  })

  constructor() {}

  ngOnInit(): void {
    const search = document.getElementById('search') as HTMLElement;
    const stream$ = fromEvent(search, 'input')
      .pipe(
        map(e => this.myFormGroup.controls.email.value),
        debounceTime(2000),
        distinctUntilChanged(),
        tap(() => {
          if(this.myFormGroup.controls.email.valid){
            alert('This email is exist! Please enter another email')
          }
        })
        // switchMap( v => {
        //   return ajax.getJSON('this must be valid url address', v)
        // })
      )
    stream$.subscribe(value => {})

  }
  save(): void {
    console.log(this.myFormGroup.value)
  }

}



