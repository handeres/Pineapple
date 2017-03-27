import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-busy-indicator',
  templateUrl: 'shared/components/busy-indicator/busy-indicator.component.html',
})
export class BusyIndicatorComponent {

  @Input()
  public isBusy: boolean = false;

  constructor() { }
}
