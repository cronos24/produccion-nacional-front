import { FormGroup } from "@angular/forms";

export abstract class FormGeneric {

    protected abstract formGroup: FormGroup;
    protected abstract formGroupName: string;

    public getFatherFormGroupControl(control: string) {
        return this.formGroup.controls[control];
    }

    public getFatherFormGroupValue(control: string) {
        return this.formGroup.controls[control].value;
    }
    public setFatherFormGroupValue(control: string, value: string) {
        this.formGroup.controls[control].setValue(value);
    }

    public getChildFormGroup() {
        return this.formGroup.get(this.formGroupName) as FormGroup;
    }

    public getChildFormGroupControl(control: string) {
        return (this.formGroup.get(this.formGroupName) as FormGroup).controls[control];
    }

    public getChildFormGroupValue(control: string) {
        return (this.formGroup.get(this.formGroupName) as FormGroup).controls[control].value;
    }

    public setChildFormGroupValue(control: string, value: any) {
        (this.formGroup.get(this.formGroupName) as FormGroup).controls[control].setValue(value);
    }
}
