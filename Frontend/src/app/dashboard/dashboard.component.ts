import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import NavComponent from '../components/nav/nav.component';
import  HomeComponent  from "../pages/home/home.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavComponent, HomeComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export default class DashboardComponent {

}
