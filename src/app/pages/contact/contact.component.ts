import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidationService} from '../../services/form-validation/form-validation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({
    name: this.fb.control(null, Validators.required),
    email: this.fb.control(null, [Validators.required, Validators.email]),
    phone: this.fb.control(null),
    type: this.fb.control(null, Validators.required),
    text: this.fb.control(null, Validators.maxLength(500)),
    accept: this.fb.control(false, Validators.requiredTrue)
  });
  formSent = false;

  constructor(
    private componentRef: ElementRef,
    private fb: FormBuilder,
    private formValidatorService: FormValidationService
  ) { }

  ngOnInit(): void {

  }

  submit() {
    if(!this.formValidatorService.validateForm(this.formGroup, this.componentRef)) {
      return;
    }

    console.log(this.formGroup.value);
    this.formSent = true;
    this.formGroup.reset();
  }

  reset() {
    this.formGroup.reset();
  }

}
