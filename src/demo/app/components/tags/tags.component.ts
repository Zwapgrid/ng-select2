import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from '../../../../index';
import { Options } from 'select2';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;
  public options: Options;

  public model:string[];

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

    this.options = {
      width:"300",
      tags:true,
      multiple: true
    }
  }
}
