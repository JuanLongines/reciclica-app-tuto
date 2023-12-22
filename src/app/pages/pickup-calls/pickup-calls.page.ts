import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {hourglassOutline,checkmarkCircleOutline,trophy} from 'ionicons/icons';
import { PickupCallCardComponent } from 'src/app/components/pickup-call-card/pickup-call-card.component';

@Component({
  selector: 'app-pickup-calls',
  templateUrl: './pickup-calls.page.html',
  styleUrls: ['./pickup-calls.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,PickupCallCardComponent]
})
export class PickupCallsPage implements OnInit {

  constructor() {
    addIcons({ hourglassOutline,checkmarkCircleOutline,trophy});
   }

  ngOnInit() {
  }

}
