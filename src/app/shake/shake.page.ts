import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShakeService } from '@app/shared/services/shake/shake.service';
import { WisdomService } from '@app/shared/services/wisdom/wisdom.service';
import { sample } from 'lodash';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter, skip, delay } from 'rxjs/operators';
import { WisdomItem } from 'src/core/types';

@Component({
  selector: 'app-shake',
  templateUrl: './shake.page.html',
  styleUrls: ['./shake.page.scss'],
})
export class ShakePage implements OnInit, OnDestroy {
  public loadingLabel = 'asking around...';
  public isLoading = true;
  public item: Observable<WisdomItem>;

  private get randomWisdomItem(): Observable<WisdomItem> {
    return this.wisdomService.wisdomItems$.pipe(
      map((wisdomItems: WisdomItem[]) => sample(wisdomItems))
    );
  }

  constructor(
    private readonly wisdomService: WisdomService,
    private readonly shakeService: ShakeService
  ) {
    this.item = new BehaviorSubject(null);
  }

  public async ngOnInit(): Promise<void> {
    this.item = this.randomWisdomItem;
    this.isLoading = false;

    this.shakeService.isShaking
      .pipe(
        skip(1),
        delay(300),
        untilDestroyed(this),
        filter(() => !this.isLoading)
      )
      .subscribe(() => {
        this.onSwipe();
      });
  }

  //untilDestroyed pipe
  public ngOnDestroy(): void {}

  public onSwipe(): void {
    if (!this.isLoading) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      setTimeout(() => {
        this.item = this.randomWisdomItem;
      }, 800);
    }
  }
}
