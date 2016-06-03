import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
const keys = require('lodash/keys')

import {environment} from './environment';

let defaultHeaders = {
  'Accept': 'application/json;odata=verbose',
  'Content-Type': 'application/json;odata=verbose'
}

export interface ContextWebInformation {
  GetContextWebInformation: {
    FormDigestTimeoutSeconds: number,
    FormDigestValue: string;
  }
}

export interface SPList {
  Id: string;
  Title: string;
  DefaultView: {
    ServerRelativeUrl: string;
  }
}

@Injectable()
export class HttpService {
  requestDigest$ = new BehaviorSubject('');
  constructor(private http: Http) {
    this.getClientContext()
      .subscribe(ctx => {
        // Set initial form digest value
        this.requestDigest$.next(ctx.GetContextWebInformation.FormDigestValue)

        Observable
          // Get an updated form digest 10 seconds before it expires
          .interval((ctx.GetContextWebInformation.FormDigestTimeoutSeconds - 10) * 1000)
          // Fetch updated digest
          .flatMap(ctx => this.getClientContext())
          // Update local behavior subject for all post requests to use
          .subscribe(updatedCtx => this.requestDigest$.next(updatedCtx.GetContextWebInformation.FormDigestValue));
      })
  }

  getLists(): Observable<SPList[]> {
    if (environment.production) {
      const endpoint = `${environment.apiPath}/Web/Lists`;
      return this.getData(endpoint);
    } else {
      return this.http.get('../e2e/Lists.json')
        .map(response => response.json())
        .map(this.stripJSONWrapper)
    }
  }
  getList(listId: string): Observable<SPList> {
    if (environment.production) {
      const endpoint = `${environment.apiPath}/Web/Lists(guid'${listId}')`;
      return this.getData(endpoint);
    } else {
      return this.http.get('../e2e/List.json')
        .map(response => response.json())
        .map(this.stripJSONWrapper)
    }
  }
  getListItems(listId: string): Observable<any> {
    if (environment.production) {
      const endpoint = `${environment.apiPath}/Web/Lists(guid'${listId}')/Items`;
      return this.getData(endpoint);
    } else {
      return this.http.get('../e2e/ListItems.json')
        .map(response => response.json())
        .map(this.stripJSONWrapper)
    }
  }
  getListItem(listId: string, listItemId: number): Observable<any> {
    if (environment.production) {
      const endpoint = `${environment.apiPath}/Web/Lists(guid'${listId}')/Items(${listItemId})`;
      return this.getData(endpoint);
    } else {
      return this.http.get('../e2e/ListItem.json')
        .map(response => response.json())
        .map(this.stripJSONWrapper)
    }
  }

  getCurrentUser() {
    if (environment.production) {
      const endpoint = `${environment.apiPath}/Web/CurrentUser?$Select=Id,Name`;
      return this.getData(endpoint);
    } else {
      return this.http.get('../e2e/CurrentUser.json')
        .map(response => response.json())
        .map(this.stripJSONWrapper)
    }
  }

  getClientContext(): Observable<ContextWebInformation> {
    if (environment.production) {
      const endpoint = `${environment.apiPath}/contextinfo`;
      return this.http.post(endpoint, '', { headers: new Headers(defaultHeaders) })
        .map(response => response.json())
        .map(this.stripJSONWrapper)
        .do(clientContext => console.log('Client Context: ', clientContext));
    } else {
      return this.http.get('../e2e/ClientContext.json')
        .map(response => response.json())
        .map(this.stripJSONWrapper);
    }
  }

  createListItem(listId: string, listItem: any) {
      // Update existing list item
      const endpoint = `${environment.apiPath}/Web/Lists(guid'${listId}')/Items(${listItem.Id})`;
  }

  saveListItem(listItem: any) {
    if (environment.production) {
      const endpoint = listItem.__metadata.uri;
      return this.post(endpoint, listItem, 'MERGE');

    } else {
      // Return saved record with updated modified date
      let modifiedDate = new Date();
      let updatedListItem = Object.assign({}, listItem, { Modified: modifiedDate.toJSON() });
      return Observable.of(updatedListItem);
    }
  }


  private post(endpoint: string, body: Object = '', method: 'POST' | 'DELETE' | 'MERGE' | 'PUT' = 'MERGE') {

    return this.requestDigest$
      .filter(requestDigest => !!requestDigest)
      .take(1)
      .flatMap(requestDigest => {
        
        let bodyJson = JSON.stringify(strippedDeferredProperties(body));

        let headers = Object.assign({}, {
          'IF-MATCH': '*',
          'X-HTTP-Method': method,
          'X-RequestDigest': requestDigest,
        }, defaultHeaders);
        
        return this.http
          .post(endpoint, bodyJson, { headers: new Headers(headers) })
          .retry(2);
      })
  }

  private getData(endpoint: string): Observable<any> {
    return this.http.get(endpoint, { headers: new Headers(defaultHeaders) })
      .map(response => response.json())
      .retry(2)
      .map(this.stripJSONWrapper);
  }

  private stripJSONWrapper(json: any) {
    let payload = json.d;
    if (payload.results) {
      payload = payload.results;
    }
    return payload;
  }

}

function strippedDeferredProperties(obj: any) {
  let properties = keys(obj);

  let strippedObj = properties.reduce((acc, key) => {
    if (typeof obj[ key ] == 'object' && obj[ key ][ '__deferred' ]) {
      // Don't include async properties.
      return acc;
    } else if (key === '__metadata') {
      acc[ '__metadata' ] = { type: obj.__metadata.type };
    } else {
      acc[ key ] = obj[ key ];
    }
    return acc;
  }, {});  
  
  return strippedObj;
}

// function validateResponse(response: Response) {
//   console.log(response.text);
//   return response.json;
// }

// function parseJSON(response: Response) {

// }