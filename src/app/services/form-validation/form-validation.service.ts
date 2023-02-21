import { ElementRef, Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormValidationService {
    validateForm(formGroup: FormGroup, elementRef: ElementRef): boolean {
        this.updateFieldsValidity(formGroup, elementRef);
        return formGroup.valid;
    }

    updateFieldsValidity(formGroup: FormGroup, elementRef: ElementRef) {
        this.markGroupDirty(formGroup);
        this.setFocusToFirstInvalidControl(formGroup, elementRef);
    }

    markGroupDirty(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((key) => {
            switch (this.getControlType(formGroup.controls[key])) {
                case 'FormGroup':
                    this.markGroupDirty(formGroup.get(key) as FormGroup);
                    break;
                case 'FormArray':
                    this.markArrayDirty(formGroup.get(key) as FormArray);
                    break;
                case 'FormControl':
                    this.markControlDirty(formGroup.get(key) as FormControl);
                    break;
            }
        });
    }

    markArrayDirty(formArray: FormArray) {
        formArray.controls.forEach((control) => {
            switch (this.getControlType(control)) {
                case 'FormGroup':
                    this.markGroupDirty(control as FormGroup);
                    break;
                case 'FormArray':
                    this.markArrayDirty(control as FormArray);
                    break;
                case 'FormControl':
                    this.markControlDirty(control as FormControl);
                    break;
            }
        });
    }

    markControlDirty(formControl: FormControl) {
        formControl.markAsDirty();
    }

    getControlType(control: AbstractControl): string {
        if (control.hasOwnProperty('controls')) {
            if (Array.isArray(control.value)) {
                return 'FormArray';
            } else {
                return 'FormGroup';
            }
        }
        return 'FormControl';
    }

    setFocusToFirstInvalidControl(formGroup: FormGroup, componentRef: ElementRef) {
        for (let key of Object.keys(formGroup.controls)) {
            if (formGroup.controls[key].invalid) {
                const invalidControl = componentRef.nativeElement.querySelector(
                    'input.app-form-control__field.ng-invalid, ' +
                        'select.app-form-control__field.ng-invalid, ' +
                        'textarea.app-form-control__field.ng-invalid'
                );
                invalidControl?.focus();
                break;
            }
        }
    }

    validateIsValueMatch(targetControl: AbstractControl, targetFieldName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const invalid = control.value !== targetControl.value;
            return invalid ? { notMatchTargetValue: { targetFieldName: targetFieldName } } : null;
        };
    }
}
