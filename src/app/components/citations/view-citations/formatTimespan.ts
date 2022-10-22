import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

// Formats Timespan using PipeTransform
@Pipe({
    name: 'formatTimespan'
})
export class FormatTimeSpan implements PipeTransform {
    transform(value: any, args?: any): any {
        value = value.slice(0,5);
        return value;
    }
}