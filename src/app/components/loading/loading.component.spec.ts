import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Store, provideState, provideStore } from '@ngrx/store';
import { AppStoreState } from 'src/app/store/app.store.state';
import { loadingFeature } from 'src/app/store/loading/loading.reducers';
import { LoadingComponent } from './loading.component';
import { hide, show } from 'src/app/store/loading/loading.actions';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let store: Store<AppStoreState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[
        provideStore(),
        provideState(loadingFeature)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide loading component when it is not loading', () => {
    const compiled=fixture.nativeElement;
    store.dispatch(hide());
    fixture.detectChanges();

    expect(compiled.querySelector(".backdrop")).toBeNull();
  });

  it('should show loading component when it is loading', () => {
    const compiled=fixture.nativeElement;
    store.dispatch(show());
    fixture.detectChanges();

    expect(compiled.querySelector(".backdrop")).not.toBeNull();
  });
});
