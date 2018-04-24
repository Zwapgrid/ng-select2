import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from '../../../../index';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;

  public model:string[];

  ngOnInit() {
    this.exampleData = [
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

    this.options = {
      width:"300",
      multiple: true,
      theme: 'classic',
      closeOnSelect: false
    }
  }
}
