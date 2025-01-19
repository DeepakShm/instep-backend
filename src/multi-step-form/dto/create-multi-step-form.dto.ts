export class CreateMultiStepFormDto {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  city: string;
  zip: string;
  dob: string;
  gpa: string;
  universityocation: string;
  universityName: string;
  prevStep: number;
  currStep: number;
  nextStep: number;
}
