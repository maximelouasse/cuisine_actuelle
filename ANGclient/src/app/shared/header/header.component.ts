import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public seePopupLoginRegsiter = false;

  constructor() {}

  ngOnInit(): void {}

  checkPopupLoginRegister () {
    if (this.seePopupLoginRegsiter) {
      this.seePopupLoginRegsiter = false;
    } else {
      this.seePopupLoginRegsiter = true;
    }
  }
}
