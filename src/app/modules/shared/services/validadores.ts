import { AbstractControl, FormGroup } from '@angular/forms';
import { BigNumber } from 'bignumber.js';

const expresionRegular = {
  entero: /^-{0,1}([0-9]+)$/,
};

export function enteroValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const esEntero = expresionRegular.entero.test(control.value);
  return !esEntero || !Number.isInteger(control.value * 1)
    ? { entero: { value: control.value } }
    : null;
}
// TODO: Revisar el tema de localización, dado que en lugar del punto decimal puede ser coma.
export const decimalValidator = (cifrasDecimales = 2, digitos = 16) => (
  control: AbstractControl
): { [key: string]: any } | null => {
  const expresionRegular = new RegExp(
    `^\\-?[0-9]{1,${digitos}}(\\.[0-9]{0,${cifrasDecimales}})?$`,
    'g'
  );
  const esDecimal = expresionRegular.test(control.value);

  return !esDecimal
    ? {
        decimal: {
          value: control.value,
          cifrasDecimales: cifrasDecimales,
          digitos: digitos,
        },
      }
    : null;
};

export const rangoValidator = (min = 1, max = 10) => (
  control: AbstractControl
): { [key: string]: any } | null => {
  const esValido = control.value * 1 >= min && control.value * 1 <= max;
  return !esValido
    ? {
        rango: {
          value: control.value,
          min: min,
          max: max,
        },
      }
    : null;
};

export function mayorACeroValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  return control.value * 1 > 0
    ? null
    : { mayorACero: { value: control.value } };
}

export const NumeroGrandeValidators = {
  MIN: (min = 0, incluirLimite = true) => (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const value = new BigNumber(control.value);
    const valido = incluirLimite
      ? value.isGreaterThanOrEqualTo(min)
      : value.isGreaterThan(min);
    if (!valido) {
      return {
        [incluirLimite ? 'numeroGrandeMinLim' : 'numeroGrandeMin']: {
          value: control.value,
          min: min,
        },
      };
    }
    return null;
  },
  ENTERO: (digitos = 16) => (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const expresionRegular = new RegExp(`^\\-?[0-9]{1,${digitos}}?$`, 'g');
    const esValido = expresionRegular.test(control.value);

    return !esValido
      ? {
          numeroGrandeEntero: {
            value: control.value,
          },
        }
      : null;
  },
};

export const fechaMenorQue = (fechaInicial: string, fechaFinal: string) => {
  return (formGroup: FormGroup): { [key: string]: any } => {
    const fInicial = formGroup.controls[fechaInicial];
    const fFinal = formGroup.controls[fechaFinal];

    if (
      fFinal.errors &&
      !fInicial.errors?.fechaInicialMenorQue &&
      !fFinal.errors?.fechaFinalMenorQue
    ) {
      return;
    }

    if (fInicial.value > fFinal.value) {
      fInicial.setErrors({ fechaInicialMenorQue: true });
    } else {
      fInicial.setErrors(null);
      fFinal.setErrors(null);
    }
    if (fFinal.value < fInicial.value) {
      fFinal.setErrors({ fechaFinalMenorQue: true });
    } else {
      fInicial.setErrors(null);
      fFinal.setErrors(null);
    }
  };
};
