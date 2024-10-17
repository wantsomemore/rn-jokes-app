import {EJokeType} from '@/enums/EJokeType';
import {IFlag} from './IFlag';
import {ELang} from '@/enums/ELang';
import {EJokeCategory} from '@/enums/EJokeCategory';

export interface IJoke {
  error: boolean;
  category: EJokeCategory;
  type: EJokeType;
  setup: string;
  delivery: string;
  flags: IFlag;
  id: number;
  safe: boolean;
  lang: ELang;
  liked: boolean;
}
