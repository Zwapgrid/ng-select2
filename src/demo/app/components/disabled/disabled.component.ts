import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from '../../../../index';
import { Options } from 'select2';

@Component({
  selector: 'app-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.css']
})
export class DisabledComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;
  public options: Options;

  public model:string;
  public disabled:boolean = false;

  ngOnInit() {
    this.exampleData = [
      {
        id: 'base1',
        text: 'Predefined 1'
      },
      {
        id: 'base2',
        text: 'Predefined 2'
      }
    ];
  }
}
