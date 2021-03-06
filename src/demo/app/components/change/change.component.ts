import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Select2OptionData } from '../../../../index';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;
  public startValue: string;
  public selected: string;

  constructor(private service: DataService) {}

  ngOnInit() {
    this.exampleData = this.service.getChangeList();
    this.selected = 'car3';
  }

  public changeValue() {
    this.selected = 'car2';
  }

  public changeData() {
    this.exampleData = this.service.getChangeListAlternative();
  }

  public changed(e: any): void {
    this.selected = e.value;
  }
}
