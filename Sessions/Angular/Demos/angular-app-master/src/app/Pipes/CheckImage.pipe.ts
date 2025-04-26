import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CheckImage',
})
export class CheckImagePipe implements PipeTransform {
  transform(value: string): string {
    let DefaultImgURL = './defaultImg.jpg';
    if (value == '') return DefaultImgURL;
    else return value;
  }
}
