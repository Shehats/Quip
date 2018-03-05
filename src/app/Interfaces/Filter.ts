import { Instance } from './Instance';

export interface Filter {
  isOf (target: Instance): boolean;
}