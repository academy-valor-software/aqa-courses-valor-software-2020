import { IEducation } from '../data/edication-data.interface';

export function getRandom(index: number): number {
  return Math.floor(Math.random() * index) + 1;
}

export function formatUserName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName[0]}.`;
}

export function concatEducationDetailsString(education: IEducation): string {
  const {endYear, startYear, university, country} = education;

  const educationDuration = +endYear - +startYear;
  return `${university}, ${country}\n` +
         `${startYear} - ${endYear}\n` +
         `(${educationDuration} years)`;
}

export function getNumbers(stringValue: string): string {
  return stringValue.replace(/\D/g, '');
}
