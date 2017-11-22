import { Component, OnInit } from  '@angular/core';
import { DataViewerService } from './data-viewer.service';
import { Data } from './data.model';

@Component({
    selector: 'data-viewer',
    templateUrl: 'data-viewer.html',
    styleUrls: [
        'data-viewer.css'
    ]
})
export class DataViewerComponent implements OnInit {

    private data:Array<Data>;
    private processedData:any;
    private errorMsg:any;
    private sortAsc:boolean=false;

    constructor(private dataViewerService: DataViewerService){

    }

    ngOnInit(){
        this.dataViewerService.getData()
            .subscribe( data => {
                this.data = data;                 
            }, err => {
                this.errorMsg = err;
            });
    }

    sort(columnName:string){
        this.sortAsc = !this.sortAsc;
        return this.data.sort( (row1:Data, row2:Data) => {
            switch(columnName){
                case 'category':
                case 'name':
                    return this.sortAsc ? (row1[columnName].localeCompare(row2[columnName])) : (row2[columnName].localeCompare(row1[columnName]));
                case 'amount':
                    return this.sortAsc ? (row1[columnName] - row2[columnName]) : -(row1[columnName] - row2[columnName]);
                default:
                return 0;
            }
        });
    }
}