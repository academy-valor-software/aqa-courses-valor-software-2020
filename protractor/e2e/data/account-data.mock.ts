import { getRandom } from '../helper/utils';
import { IAccount } from './account-data.interface';

export const accountData: IAccount = {
  email: 'MasalitinJW@gmail.com',
  password: 'Jenya123qaZ',

  wrongEmail : 'masalitinJ@',
  wrongPassword : 'smdjwdwjdw',

  firstName: 'Evgeniy',
  lastName: 'Masalitin',
  userId: 'GenuineMas',

  professionalHeadline: `QA engineer ${getRandom()}`,
  summary: `Worked as QA more than ${getRandom()} years. My favorite joke about QA is: A QA engineer walks into a ` +
      `bar. Orders a beer. Orders 0 beers. Orders 99999999999 beers. Orders a lizard. Orders -1 beers. Orders av` +
      `ueicbksjdhd. First real customer walks in and asks where the bathroom is. The bar bursts into flames, killing ` +
      `everyone.`,
  hourRate: getRandom().toString(),
};
