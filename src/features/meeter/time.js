export class Time {
  constructor(h, m = 0, s = 0) {
    this.hours = h;
    this.minutes = m;
    this.seconds = s;
  }

  getHours = () => {
    return this.hours;
  };
  getMinutes = () => {
    return this.minutes;
  };

  delta = other => {
    return new Time(
      this.hours - other.hours,
      this.minutes - other.minutes,
      this.seconds - other.seconds,
    );
  };

  toMiliseconds = () => {
    return this.hours * 60 * 60 * 100 + this.minutes * 60 * 100 + this.seconds * 100;
  };
}
export function initTime(h, m = 0, s = 0) {
  const res = new Time(h, m, s);
  return res;
}

export function deltaTime(start, end) {
  const delta = end.delta(start);
  return delta;
}

export function timeParts(time, partSize) {
  return time.toMiliseconds() / partSize.toMiliseconds();
}

export function sumTime(time, part) {
  let newTime = initTime(time.hours, time.minutes, time.seconds);
  newTime.hours += part.hours;
  newTime.minutes += part.minutes;
  newTime.seconds += part.seconds;
  return newTime;
}
