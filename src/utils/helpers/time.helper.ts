import * as moment from 'moment-timezone';

export abstract class TimeHelper {
  static formatTimeDMYHms(inp: moment.MomentInput): string {
    const time = moment(inp, true);
    return time.isValid() ? time.format('DD/MM/YYYY HH:mm:ss') : '01/01/1970 00:00:00';
  }

  static formatTimeDMYHm(inp: moment.MomentInput): string {
    const time = moment(inp, true);
    return time.isValid() ? time.format('DD/MM/YYYY HH:mm') : '01/01/1970 00:00';
  }

  static formatTimeDMY(inp: moment.MomentInput): string {
    const time = moment(inp, true);
    return time.isValid() ? time.format('DD/MM/YYYY') : '01/01/1970';
  }

  static formatTimeYMDHm(inp: moment.MomentInput): string {
    const time = moment(inp, true);
    return time.isValid() ? time.format('YYYY/MM/DD HH:mm') : '1970/01/01 00:00';
  }

  static formatTimeYMD(inp: moment.MomentInput): string {
    const time = moment(inp, true);
    return time.isValid() ? time.format('YYYY/MM/DD') : '1970/01/01';
  }

  static formatTimeHm(inp: moment.MomentInput): string {
    const time = moment(inp, true);
    return time.isValid() ? time.format('HH:mm') : '00:00';
  }

  static now(): string {
    return moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
  }

  static formatTimeStringDatabase(date: string): string {
    if (date == null || date == "") {
      return "";
    } else {
      return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
    }
  }
  static formatStringDateDMYToDate(date: string): Date {
    return new Date(this.formatTimeStringDatabase(date))|| null;
  }


}
