import { Component, EventEmitter, Output } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

export interface PeriodicElement {
  name: string;
  position: number;
  date: string;
  action: any;
  age: number;
  gender: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'John', age: 23, gender: 'Male', date: '24/2/2024', action: '' },
  { position: 2, name: 'George',age: 40, gender: 'Male', date: '14/1/2024', action: '' },
  { position: 3, name: 'Claura', age: 31, gender: 'Female',date: '18/2/2024', action: '' },
  { position: 4, name: 'Michael',age: 27, gender: 'Male', date: '01/2/2024', action: '' },
  { position: 5, name: 'Mike', age: 20, gender: 'Male',date: '20/1/2024', action: '' },
  { position: 6, name: 'Eleven', age: 25, gender: 'Female',date: '31/1/2024', action: '' },

];

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  dataSource = ELEMENT_DATA;
  @Output() close: EventEmitter<void> = new EventEmitter<void>;

  constructor(private dialogService: DialogService){};
  position = this.dialogService.position;

}
