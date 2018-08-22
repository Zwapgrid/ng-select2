import { Component, OnInit } from '@angular/core';
import { Options } from 'select2';

@Component({
  selector: 'app-dynamic-options',
  templateUrl: './dynamic-options.component.html',
  styleUrls: ['./dynamic-options.component.css']
})
export class DynamicOptionsComponent implements OnInit {
  public options: Options;
  public options1: Options;
  public options2: Options;

  public model:string|string[];

  ngOnInit() {
    this.options = {
      width:"300"
    };

    var optionsData1 = [
      {
        id: 'opt1',
        text: 'Options 1'
      },
      {
        id: 'opt2',
        text: 'Options 2'
      },
      {
        id: 'opt3',
        text: 'Options 3'
      },
      {
        id: 'opt4',
        text: 'Options 4'
      }
    ];

    var optionsData2 = [
      {
        id: 'opt1',
        text: 'Options 1'
      },
      {
        id: 'opt2',
        text: 'Options 2'
      }
    ];

    this.options1 = {
      width:"300",
      tags:true,
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      data:optionsData1
    }

    this.options2 = {
      multiple:false,
      width:"400",
      disabled:true,
      data:optionsData2
    }
  }
}
