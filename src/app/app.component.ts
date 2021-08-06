import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RootObject } from './interface/searchinterface'
import { SearchService } from './services/search.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public searchs : RootObject;
  public inputPage: number = 1;
  public inputTest: string;
  public inputLat:number;
  public inputLong: number;
  public img: string;
  public zoom: number = 13;

  constructor(private searchService: SearchService) {
   }
  
  ngOnInit(){
  }


  public getSearchs(): void {
    this.searchService.getSearchs().subscribe(
      (response: RootObject) => {
        this.searchs = response;
      },
      (error: HttpErrorResponse) => {
/*         alert(error.message); */
        alert("Please Enter Something");
      }
    );
  }
  public getPageNum(inputPage: number): void{
    this.searchService.changePageNum(inputPage);
  }

  public getTestParam(inputTest: string): void{
    this.searchService.changeTestParam(inputTest);
  }

  public getCoordClick(lat, long):void{
    this.inputLat = lat;
    this.inputLong = long;
    this.img = 'https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&&lat='
    +this.inputLat+ '&lng=' + this.inputLong+ '&zoom=13&height=512&width=512&points=['+this.inputLat
    + ','+ this.inputLong+',%22175,50,0%22,%22A%22]';
  }

  public onZoom(zoom:boolean):void{
    if(zoom){
      if(this.zoom >= 19) return;
      this.zoom +=1;
    }
    if(!zoom){
      if(this.zoom <= 11) return;
      this.zoom -=1;
    }
    this.img = 'https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&&lat='
    +this.inputLat+ '&lng=' + this.inputLong+ '&zoom='+this.zoom+'&height=512&width=512&points=['+this.inputLat
    + ','+ this.inputLong+',%22175,50,0%22,%22A%22]';
  }

}
