export class DateStringify extends Date {
  constructor() {
    super();
  }
  stringify(): string {
    return `${this.getFullYear()}-${this.getMonthStr()}-${this.getDateStr()} ${this.getHoursStr()}:${this.getMinutes()}:${this.getSeconds()}`;
  }
  fillZero(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }
  getDateStr(): string {
    return this.fillZero(super.getDate());
  }
  getMonthStr(): string {
    return this.fillZero(super.getMonth() + 1);
  }
  getHoursStr(): string {
    return this.fillZero(super.getHours());
  }
}
