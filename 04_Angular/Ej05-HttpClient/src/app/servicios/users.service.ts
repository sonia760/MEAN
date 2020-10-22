import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn : 'root' })
export class UsersService {

    public constructor(private httpClient:HttpClient){
    }

    public listarUsuarios():Observable<any>{
        return this.httpClient.get("https://reqres.in/api/users?delay=5")
    }

}