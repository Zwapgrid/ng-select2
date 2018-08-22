import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from '../../../../index';
import { Options, OptionData, SearchOptions } from 'select2';

@Component({
  selector: 'app-matcher',
  templateUrl: './matcher.component.html',
  styleUrls: ['./matcher.component.css']
})
export class MatcherComponent implements OnInit {
  public options: Options;
  public exampleData: Array<Select2OptionData>;

  ngOnInit() {
    this.options = {
      matcher: (params: SearchOptions, data: OptionData) => {
        var term = <any>params;
        var text = <any>data;
        if (text.toUpperCase().indexOf(term.toUpperCase()) == 0){
          return <OptionData>(<any>true);
        }
        return null;
      }
    };

    this.exampleData = [
      {
        id: 'AK',
        text: 'Alaska'
      },
      {
        id: 'HI',
        text: 'Hawaii'
      },
      {
        id: 'CA',
        text: 'California'
      },
      {
        id: 'NV',
        text: 'Nevada'
      },
      {
        id: 'OR',
        text: 'Oregon'
      },
      {
        id: 'WA',
        text: 'Washington'
      },
      {
        id: 'AZ',
        text: 'Arizona'
      },
      {
        id: 'CO',
        text: 'Colorado'
      }
    ];
  }
}
