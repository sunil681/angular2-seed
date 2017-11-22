import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Data } from './data.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataViewerService{
    constructor(private http:Http){

    }

    getData():Observable<Array<Data>>{
        return this.http.get('mocks/rest/data.json')
        .map(response => response.json() || [])
        .catch( (err) => {
            console.error(err);
            return Observable.throw(err);
        });
    }
}