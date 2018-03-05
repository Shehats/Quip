import { Pipe, PipeTransform } from '@angular/core';
import { Instance } from '../Interfaces/Instance';
import { Filter } from '../Interfaces/Filter';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import * as _ from 'underscore';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform <T extends Instance, F extends Filter> (value: Observable<T[]>,
    args?: string, kwargs?: string | string [] | F | F []): Observable<T[]> {
    return (args)? value.map(
    	x => x.filter(y => (y.getFilter().toLowerCase()
        .includes(args.toLowerCase()))).filter(g => this.refactor(g, kwargs))): value;
  }

  private refactor <T extends Instance, F extends Filter> (param: T, kwargs?: string | string [] | F | F []): boolean {
    return (!kwargs)
    ? true : (typeof kwargs === 'string')? param.getFilter().toString().toLowerCase().includes(kwargs.toLowerCase())
    : (kwargs as Filter) ? ((kwargs as Filter).isOf(param))
    : (_.isArray(kwargs) && kwargs as string []) ? _.filter((kwargs as string []),
      x => param.getFilter().toLowerCase().includes(x)).length > 0
    : _.filter((kwargs as Filter []), x => (x.isOf(param))).length > 0;
  }
}
