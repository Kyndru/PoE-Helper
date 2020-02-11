import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  isLoading = false;

  constructor() { }

  ngOnInit() {
  }

  saveData(index: number) {

  }
}
