import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts';
import { PatientService } from 'src/app/services/patient.service';
import { MatTableModule } from '@angular/material/table';
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
  selector: 'app-single-patient-details',
  templateUrl: './single-patient-details.component.html',
  styleUrls: ['./single-patient-details.component.scss'],

})
export class SinglePatientDetailsComponent implements OnInit {

  singlePatientData: any;
  selectedFile: File | null = null;
  audioData: any;
  displayedColumns: string[] = ['position', 'name', 'age','gender','date','action'];
  dataSource = ELEMENT_DATA;
  isConverted = false;
  reportData: any;
  textInput: string = '';
  diseaseInfo: any = null;

  constructor(private patientService: PatientService, private route: ActivatedRoute, private http: HttpClient,
    private dialogService: DialogService) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    // Check if the 'id' parameter exists before trying to convert it to a number
    if (idParam !== null && idParam !== undefined) {
      const id = +idParam; // '+' converts string to number
      this.patientService.getParticularPatientData(id).subscribe((data: any) => {
        this.singlePatientData = data[0]; // Assuming the response is a single patient data object
      });
    } else {
      console.error('ID parameter is null or undefined');
      // Handle the case when the 'id' parameter is not available
    }
  }

  

  onSubmit() {
    if (this.textInput.trim() !== '') {
      this.patientService.analyzeText(this.textInput).subscribe(
        (response) => {
          this.diseaseInfo = response;
        },
        (error) => {
          console.error('Error analyzing text:', error);
        }
      );
    }
  }

  



  // onUpload() {
  //   if (this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('audioFile', this.selectedFile);

  //     this.http.post('https://c0a5-2402-e280-3e06-3f6-68fd-981-22f9-62cd.ngrok-free.app/transcribe', formData)
  //       .subscribe(response => {
  //         console.log(response);
  //         // Handle success, if needed
  //       }, error => {
  //         console.error(error);
  //         // Handle error, if needed
  //       });
  //   }
  // }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.patientService.uploadAudioFile(file).subscribe(
        response => {
          // Handle success response
          console.log(response);
          this.isConverted = true;
          if (response) {
            this.reportData = response;
          }

        },
        error => {
          // Handle error
          console.error(error);
        }
      );
    }
  }

  openDialog(data: any){
    this.dialogService.openDialog(data);
  }
}