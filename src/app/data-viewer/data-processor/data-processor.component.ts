import { Component, OnInit, Input, Output } from '@angular/core';
import { DataViewerService } from '../data-viewer.service';
import { Data } from '../data.model';

@Component({
    selector: 'data-processor',
    templateUrl: 'data-processor.html',
    styleUrls: [
        '../data-viewer.css'
    ]
})
export class DataProcessorComponent implements OnInit{
    private data:Array<Data>;
    private errorMsg:any;
    private processedData:any;
    private names:Array<any>;
    private c1:Array<any>;
    
    constructor(private dataViewerService: DataViewerService) {

    }

    ngOnInit(){
        this.dataViewerService.getData()
        .subscribe( data => {
            this.data = data;
            this.processData();
        }, err => {
            this.errorMsg = err;
        });
    }

    processData(){
        let arr:any = {};
        this.data.forEach( row => {
            arr[row.name] = {};  
        });
        this.data.forEach( row => {
            if(row.category === "C1") {
                arr[row.name].C1 = row.amount;
            }
            if(row.category === "C2") {
                arr[row.name].C2 = row.amount;
            }
            if(row.category === "C3") {
                arr[row.name].C3 = row.amount;
            }             
        });
   
        console.log(Object.keys(arr));
        this.names = Object.keys(arr);
        this.processedData = arr;
    }
}