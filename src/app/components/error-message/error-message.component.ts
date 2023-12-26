import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule]
})
export class ErrorMessageComponent  implements OnInit {

  @Input() message!: string;
  @Input() field!: AbstractControl | null;
  @Input() error!: string;

  constructor() { }

  ngOnInit() {}

  shouldShowComponent(){
    if(this.field?.touched && this.field.errors?.[this.error]){
      return true;
    }
    return false
  }

}
