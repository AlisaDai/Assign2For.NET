import { Injectable } from '@angular/core';
import { Child } from '../models/child';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ChildService {

  private BASE_URL = "https://localhost:44303/api/children";
  private headers = new Headers({ 'Content-Type': 'application/json'});

  constructor(private http: Http) { } 

  getChildren(): Promise<Child[]> {
    return this.http.get(this.BASE_URL, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Child[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  update(child: Child): Promise<Child> {
    const url = '${this.BASE_URL}/${child.Id}';
    return this.http
      .put(url, JSON.stringify(child), { headers: this.headers })
      .toPromise()
      .then(() => child)
      .catch(this.handleError);
  }

  create(newChild: Child): Promise<Child> {
    return this.http
      .post(this.BASE_URL, JSON.stringify(newChild), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getChildById(id: number): Promise<Child> {
    return this.getChildren()
      .then(result => result.find(child => child.Id === id));
  }
}
