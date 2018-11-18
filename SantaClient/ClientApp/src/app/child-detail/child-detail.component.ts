import { Component, OnInit, Input } from '@angular/core';
import { Child } from '../models/child';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ChildService } from '../service/child.service';

@Component({
  selector: 'app-child-detail',
  templateUrl: './child-detail.component.html',
  styleUrls: ['./child-detail.component.css']
})
export class ChildDetailComponent implements OnInit {

  @Input()
  child: Child;

  constructor(private childService: ChildService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.childService.getChildById(id)
        .then(result => this.child = result);
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.childService.update(this.child)
      .then(() => this.goBack());
  }
}
