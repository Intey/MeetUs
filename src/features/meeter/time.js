export class Time {
  constructor(h, m = 0, s = 0) {
    this.hours = h;
    this.minutes = m;
    this.seconds = s;
  }

  getHours = () => {
    return this.hours;
  };

  delta = other => {
    return new Time(
      this.hours - other.hours,
      this.minutes - other.minutes,
      this.seconds - other.seconds,
    );
  };
}
export function initTime(h, m = 0, s = 0) {
  const res = new Time(h, m, s);
  return res;
}

export function deltaTime(start, end) {
  const delta = end.delta(start);
  return delta
}
