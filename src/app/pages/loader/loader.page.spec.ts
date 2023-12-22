import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { LoaderPage } from './loader.page';
import { Router, provideRouter } from '@angular/router';
import { routes } from 'src/app/app.routes';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPage } from '../login/login.page';
import { IonicModule } from '@ionic/angular';

describe('LoaderPage', () => {
  let component: LoaderPage;
  let fixture: ComponentFixture<LoaderPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        // provideHttpClient(),
        //  provideHttpClientTesting(),

        provideRouter(routes),

        //    provideStore(),
        //  provideState(bookingFeature),
        //  provideEffects(BookingEffects),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderPage);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to login page after load', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.ngOnInit();
    tick(1500);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));
});
