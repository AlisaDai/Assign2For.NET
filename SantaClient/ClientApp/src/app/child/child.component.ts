import { Component, OnInit } from '@angular/core';
import { Child } from '../models/child';
import { ChildService } from '../service/child.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  providers: [ChildService]
})
export class ChildComponent implements OnInit {
  children: Child[];
  selected: Child;
  newChild: Child = new Child();

  constructor(private childService: ChildService,
    private router: Router) { }
  onSelect(child: Child): void {
    this.selected = child;
  }
  getChildren(): void {
    this.childService.getChildren().then(children => this.children = children);
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selected.Id]);
  }
  add(newChild: Child): void {
    newChild.FirstName = newChild.FirstName.trim();
    newChild.LastName = newChild.LastName.trim();
    newChild.BirthDate = newChild.BirthDate;
    newChild.Street = newChild.Street.trim();
    newChild.City = newChild.City.trim();
    newChild.Province = newChild.Province.trim();
    newChild.Country = newChild.Country.trim();
    newChild.PostalCode = newChild.PostalCode.trim();
    newChild.Latitude = newChild.Latitude;
    newChild.Longitude = newChild.Longitude;
    newChild.IsNaughty = newChild.IsNaughty;

    if (!newChild) { return; }
    this.childService.create(newChild)
      .then(newChild => {
        this.selected = null;
        this.router.navigate(['./dashboard']);
      });
  }
  delete(delChild: Child): void {
    this.childService
      .delete(delChild.Id)
      .then(() => {
        this.children = this.children.filter(c => c !== delChild);
        if (this.selected === delChild) { this.selected = null; }
      });
  }

  ngOnInit(): void {
    this.getChildren();
  }
}
