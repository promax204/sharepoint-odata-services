import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { SharepointOdataServicesAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

// RxJS

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/throttleTime';

// import 'rxjs/add/observable/forkJoin';
// import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/combineLatest';
// import 'rxjs/add/operator/debounce';
// import 'rxjs/add/operator/pluck';
// import 'rxjs/add/operator/skipWhile';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/withLatestFrom';


bootstrap(SharepointOdataServicesAppComponent);

