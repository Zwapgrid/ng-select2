import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from '../../../../index';
import { DataService } from '../../services/data.service';

import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {
  public exampleData: Observable<Array<Select2OptionData>>;
  public model:string;

  constructor(private service: DataService) {}

  ngOnInit() {
    this.exampleData = this.service.getDynamicList().pipe(delay(4000));
    Observable.create(obs => {
      obs.next('dyn3');
      obs.complete();
    }).delay(6000).subscribe((val)=>{
      this.model = val;
    });
  }
}
