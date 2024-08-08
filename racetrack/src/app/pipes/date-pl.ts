import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "DateFormat", standalone: true })
export class DateFormatPipe implements PipeTransform {
  transform(value: string) {
    return new Date(value).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "UTC",
    });
  }
}
