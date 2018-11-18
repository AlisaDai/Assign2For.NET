import { Headers, Http, Response } from '@angular/http';
import { User } from '../models/user'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

export class UserService {
  Register_URL = "https://localhost:44303/register"
  Login_URL = "https://localhost:44303/login";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  login(user: User): Promise<User> {
    return this.http.post(this.Login_URL, { "username": user.Username, "password": user.Password }, { headers: this.headers }).toPromise().then(() => user).catch(this.handleError);
  }

  register(email: string, password: string): Promise<string> {
    return this.http.post(this.Register_URL, { "email": email, "password": password }, { headers: this.headers }).toPromise().then(res => res.json().data).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
