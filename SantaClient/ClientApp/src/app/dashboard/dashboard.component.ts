import { Component, OnInit } from '@angular/core';
import { Child } from '../models/child';
import { ChildService } from '../service/child.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  children: Child[];

  constructor(private childService: ChildService) { }

  ngOnInit() {
    //this.userSub = this.userService.getChildren()
    this.childService.getChildren().then(results => this.children = results.slice(0,4))
  }
}
