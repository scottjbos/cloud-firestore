import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {//implements OnInit {
  title="Bos Sandbox";
  routeLinks: any[];
  activeLinkIndex = -1;

  navLinks = [
    {path: "/dashboard", label: "Dashboard"},
    {path: "/todo", label: "Todo"},
    {path: "/cctransaction", label: "Credit Card Transactions"}
  ];

  // ngOnInit(): void {
  //   this.router.events.subscribe((res) => {
  //       this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
  //   });
}



