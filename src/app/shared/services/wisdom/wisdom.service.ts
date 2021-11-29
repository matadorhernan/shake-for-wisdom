import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { WisdomItem } from 'src/core/types';

@Injectable({
  providedIn: 'root',
})
export class WisdomService {
  public wisdomItems$: Observable<WisdomItem[]>;
  constructor(firestore: Firestore) {
    this.wisdomItems$ = collectionData(
      collection(firestore, 'wisdom')
    ) as Observable<WisdomItem[]>;
  }
}
