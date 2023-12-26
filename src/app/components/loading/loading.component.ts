import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStoreState } from 'src/app/store/app.store.state';
import { LoadingState } from 'src/app/store/loading/LoadingState';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule]
})
export class LoadingComponent  implements OnInit {

  loadingState$!: Observable<LoadingState>;

  constructor(private store:Store<AppStoreState>) { }

  ngOnInit() {
    this.loadingState$= this.store.select('loading');
  }

}
