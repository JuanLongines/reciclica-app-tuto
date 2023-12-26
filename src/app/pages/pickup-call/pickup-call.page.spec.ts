import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PickupCallPage } from './pickup-call.page';
import { Router, provideRouter } from '@angular/router';
import { routes } from 'src/app/app.routes';

describe('PickupCallPage', () => {
  let component: PickupCallPage;
  let fixture: ComponentFixture<PickupCallPage>;
  let router:Router;
  
  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      providers:[provideRouter(routes)]
    }).compileComponents();

    fixture = TestBed.createComponent(PickupCallPage);
    component = fixture.componentInstance;
    router= TestBed.get(Router);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to home on create new pickup call',()=>{
    spyOn(router,'navigate');
    component.newPickupCall();
    expect(router.navigate).toHaveBeenCalledWith(['home'])
  });
});
