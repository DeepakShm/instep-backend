import { BadRequestException } from '@nestjs/common';
import * as Yup from 'yup';
import { ValidationError } from 'yup';

export const APPLY_FORM_VALIDATIONS: Array<Yup.AnyObjectSchema> = [
  Yup.object().shape({
    firstname: Yup.string().required('First name required'),
    lastname: Yup.string().required('Last name required'),
    email: Yup.string().email('Invalid email').required('Email required'),
    phone: Yup.string().required('Phone number required'),
    dob: Yup.string().required('DOB required'),
  }),
  Yup.object().shape({
    universityLocation: Yup.string().required('University Location required'),
    universityName: Yup.string().required('University Name required'),
    gpa: Yup.string().required('CGPA required'),
  }),
  Yup.object().shape({
    address: Yup.string().required('Address required'),
    city: Yup.string().required('City required'),
    state: Yup.string().required('State required'),
    zip: Yup.string().required('Zip required'),
  }),
];

export async function validateSchema(value, id) {
  try {
    await APPLY_FORM_VALIDATIONS[id - 1].validate(value, { abortEarly: false });
    return value;
  } catch (error) {
    // console.log(schemaError(error));
    throw new BadRequestException(schemaError(error));
  }
}

function schemaError(err: ValidationError) {
  const invalid = [];
  err.inner.map((value) => {
    invalid.push({
      message: value.message,
      property: value.path,
    });
  });

  return invalid;
}
