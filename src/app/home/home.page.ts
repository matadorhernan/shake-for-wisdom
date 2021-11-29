import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShakeService } from '@app/shared/services/shake/shake.service';
import { NavController } from '@ionic/angular';
import { skip } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  constructor(
    private readonly router: NavController,
    private readonly shakeService: ShakeService
  ) {}

  public ngOnInit(): void {
    this.shakeService.isShaking
      .pipe(skip(1), untilDestroyed(this))
      .subscribe(() => {
        this.onSwipe();
      });
  }

  //untilDestroyed pipe
  public ngOnDestroy(): void {}

  public onSwipe(): void {
    this.router.navigateRoot(['/shake']);
  }
}
