import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
    Renderer,
    OnInit,
    forwardRef
  } from '@angular/core';
  import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
  import { Select2OptionData } from './ng-select2.interface';
  
  @Component({
    selector: 'ng-select2',
    templateUrl: './ng-select2.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgSelect2Component),
        multi: true
      }
    ]
  })
  export class NgSelect2Component implements AfterViewInit, OnChanges, OnDestroy, OnInit, ControlValueAccessor {
    @ViewChild('selector') selector: ElementRef;
  
    // data for select2 drop down
    @Input() data: Array<Select2OptionData>;
  
    // value for placeholder
    @Input() placeholder = '';
  
    @Input() dropdownParent = '';
  
  
    @Input() allowClear = false;
  
    // width of select2 input
    @Input() width: string;
  
    // enable / disable select2
    @Input() disabled: boolean = false;
  
    // all additional options
    @Input() options: Select2Options;
  
    // emitter when value is changed
    @Output() valueChanged = new EventEmitter<string|string[]>();
  

    private value:string|string[];
    private element: JQuery<HTMLElement> = undefined;
    private check: boolean = false;
  
    constructor(private renderer: Renderer) { }
  
    ngOnInit() {

    }
  
    ngOnChanges(changes: SimpleChanges) {
      if(!this.element) {
        return;
      }

      if(changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
        this.initPlugin();
        this.setElementValue(this.value);
      }
  
      if(changes['disabled'] && changes['disabled'].previousValue !== changes['disabled'].currentValue) {
        this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
      }
  
      if (changes['placeholder'] && changes['placeholder'].previousValue !== changes['placeholder'].currentValue) {
        this.renderer.setElementAttribute(this.selector.nativeElement, 'data-placeholder', this.placeholder);
      }
  
      if (changes['dropdownParent'] && changes['dropdownParent'].previousValue !== changes['dropdownParent'].currentValue) {
        this.renderer.setElementAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
      }
  
      if (changes['allowClear'] && changes['allowClear'].previousValue !== changes['allowClear'].currentValue) {
        this.renderer.setElementAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
      }
    }
  
    ngAfterViewInit() {
      this.element = jQuery(this.selector.nativeElement);
      this.renderer.setElementAttribute(this.selector.nativeElement, 'data-placeholder', this.placeholder);
      this.renderer.setElementAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
      this.renderer.setElementAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
  
      this.initPlugin();
  
      if (typeof this.value !== 'undefined') {
        this.setElementValue(this.value);
      }
  
      this.element.on('select2:select select2:unselect', (e: any) => {
        var newValue =  this.element.val();
        var value = typeof newValue  === "number" ? newValue.toString() : <string | string[]>newValue;
  
        this.setElementValue(value);
      });
    }
  
    ngOnDestroy() {
      this.element.off("select2:select");
    }
  
    private initPlugin() {
      if(!this.element.select2) {
        if(!this.check) {
          this.check = true;
          console.log("Please add Select2 library (js file) to the project. You can download it from https://github.com/select2/select2/tree/master/dist/js.");
        }
  
        return;
      }
  
      // If select2 already initialized remove him and remove all tags inside
      if (this.element.hasClass('select2-hidden-accessible') === true) {
        this.element.select2('destroy');
        this.renderer.setElementProperty(this.selector.nativeElement, 'innerHTML', '');
      }
  
      let options: Select2Options = {
        data: this.data,
        width: (this.width) ? this.width : 'resolve'
      };
  
      if (this.dropdownParent) {
        options = {
          data: this.data,
          width: (this.width) ? this.width : 'resolve',
          dropdownParent: jQuery('#' + this.dropdownParent)
        };
      }
  
      // this.options.placeholder = '::SELECT::';
      Object.assign(options, this.options);
  
      if(options.matcher) {
        jQuery.fn.select2.amd.require(['select2/compat/matcher'], (oldMatcher: any) => {
          options.matcher = oldMatcher(options.matcher);
          this.element.select2(options);
  
          if (typeof this.value !== 'undefined') {
            this.setElementValue(this.value);
          }
        });
      } else {
        this.element.select2(options);
      }
  
      this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
    }
  
    private setElementValue (newValue: string | string[]) {
      var isOptionsExists:boolean = false;
        if(Array.isArray(newValue)) {
          for (const option of this.selector.nativeElement.options) {
            var isSelected = (newValue.indexOf(option.value) > -1);
            this.renderer.setElementProperty(option, 'selected', isSelected);
            isOptionsExists = isOptionsExists || isSelected;
          }
        } else {
          for (const option of this.selector.nativeElement.options){
            isOptionsExists = isOptionsExists || option.value == newValue;
          }
          this.renderer.setElementProperty(this.selector.nativeElement, 'value', isOptionsExists ? newValue : null);
        }
  
        if(this.element) {
          this.element.trigger('change.select2');
          this.valueChanged.emit(newValue && isOptionsExists ? newValue : null);
        }
    }
  
    //#region ControlValueAccessor
    writeValue(value: string|string[]) {
      if (value !== undefined && value != this.value) {
        this.value = value;
        this.setElementValue(value);
      }
    }
  
    registerOnChange(fn: any): void {
      this.valueChanged.subscribe(fn);
    }
  
    registerOnTouched(fn: any): void {}

    // TODO add support for disabled

    //#endregion
  }