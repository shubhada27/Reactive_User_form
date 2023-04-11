import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map }  from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }


  postUser(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data).pipe(
      map((res:any) => {
        return res
      }
    ))
  }


  getUser(){
    return this.http.get("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res
    }))
  }

  deleteUser(id: number){
    return this.http.delete("http://localhost:3000/posts/"+ id).pipe(map((res:any)=>{
      return res;
    }))
  }

  updateUser(id:number,data:any){
    return this.http.put("http://localhost:3000/posts/"+ id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  
}
