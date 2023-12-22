import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { hourglassOutline, add } from 'ionicons/icons';
import { PickupCallCardComponent } from 'src/app/components/pickup-call-card/pickup-call-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,PickupCallCardComponent],
})
export class HomePage implements OnInit {
  constructor(private router:Router) {
    addIcons({ hourglassOutline, add});
  }

  ngOnInit() {}

  goToPickupCalls(){
    this.router.navigate(['pickup-calls']);
  }

  newPickupCall(){
    this.router.navigate(['pickup-call']);
  }
}
