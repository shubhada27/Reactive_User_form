import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from './model/userdata.model';
import { SharedService } from './shared/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'buzz_board_task';


  userInformation: any;

  constructor (private apiService:SharedService){}

  userModel: UserModel =  new UserModel();
  

   userForm = new FormGroup({
    firstName :  new FormControl('',Validators.required),
    lastName : new FormControl(''),
    email : new FormControl(''),
    phoneNumber : new FormControl(''),
    company : new FormControl(''),
    gender: new FormControl(''),
    date : new FormControl(''),
    pwd : new FormControl(''),
    confirmPassword : new FormControl('')
  

   })

   ngOnInit(){
    this.getUserData();
   }


   postUserData(){
    this.userModel = this.userForm.value;
    this.apiService.postUser(this.userModel).subscribe(res => {
      console.log(res);
      alert("Employee Added");

      this.getUserData();
    },
    err=>{
      alert("Something went wrong");
    })
    
  }


  getUserData(){
    this.apiService.getUser().subscribe(res=>{
      this.userInformation = res;
    },
    err =>{
      console.log(err);
    })

    
  }


  deleteUserData(userid:any){
    this.apiService.deleteUser(userid).subscribe(res=>{
      alert("User Successfully Deleted");
      this.getUserData();
    })
  }


  onEdit(user:any){

    this.userModel.id = user.id;
    this.userForm.controls["firstName"].setValue(user.firstName);
    this.userForm.controls["lastName"].setValue(user.lastName);
    this.userForm.controls["email"].setValue(user.email);
    this.userForm.controls["phoneNumber"].setValue(user.phoneNumber);
    this.userForm.controls["company"].setValue(user.company);
    this.userForm.controls["gender"].setValue(user.gender);
    this.userForm.controls["date"].setValue(user.date);
    this.userForm.controls["pwd"].setValue(user.pwd);
    this.userForm.controls["confirmPassword"].setValue(user.confirmPassword);


  
  }

  updateUserData(){
    this.userModel.firstName = this.userForm.value.firstName;
    this.userModel.lastName =  this.userForm.value.lastName;
    this.userModel.email = this.userForm.value.email;
    this.userModel.phoneNumber = this.userForm.value.phoneNumber;
    this.userModel.company = this.userForm.value.company;
    this.userModel.gender = this.userForm.value.gender;
    this.userModel.date = this.userForm.value.date;
    this.userModel.pwd = this.userForm.value.pwd;
    this.userModel.confirmPassword = this.userForm.value.confirmPassword;

    console.log(this.userModel.id);

    console.log(this.userForm);
    this.apiService.updateUser(this.userModel.id,this.userModel).subscribe(res=>{
      alert("user Added SuccessFully");

      this.getUserData();
    })
  }

  get f(){
    return this.userForm.controls;
  }

}
