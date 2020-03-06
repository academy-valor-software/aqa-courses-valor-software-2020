import {IEducation} from '../data/edication-data.interface';

export function getRandom(): number {
  return Math.floor(Math.random() * 1000);
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
