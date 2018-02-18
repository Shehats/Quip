import { Instance } from '../models/Instance';

export interface Filter {
  isOf (target: Instance): boolean;
}