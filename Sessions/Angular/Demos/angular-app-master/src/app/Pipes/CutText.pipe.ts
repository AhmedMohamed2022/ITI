import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CutText',
})
export class CutTextPipe implements PipeTransform {
  transform(value: string, count: number): string {
    if (count >= 0) return value.slice(0, count);
    else return "can't slice";
  }
}
