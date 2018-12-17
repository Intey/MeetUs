const MS_IN_HOUR = 60*60*100;
const MS_IN_MIN = 60*100;

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

  add = other => {
    return new Time(
      this.hours + other.hours,
      this.minutes - other.minutes,
      this.seconds - other.seconds,
    )
  }
  toMiliseconds = () => {
    return this.hours * 60 * 60 * 100 + this.minutes * 60 * 100 + this.seconds * 100;
  };

  static fromMiliseconds = (ms) => {

    const hours = Math.floor(ms/MS_IN_HOUR);
    const minutes = Math.floor( ((ms - hours * MS_IN_HOUR) / MS_IN_MIN) );
    const seconds = Math.floor( ((ms - (hours * MS_IN_HOUR + minutes * MS_IN_MIN)) / 100) );
    return new Time(
      hours,
      minutes,
      seconds
    )
  }

  toString(seconds=false) {
    let hs =`${this.hours}`.padStart(2, '0')
    let ms =`${this.minutes}`.padStart(2, '0')
    let ss =`${this.seconds}`.padStart(2, '0')
    if (seconds)
      return `${hs}:${ms}:${ss}`;
    else
      return `${hs}:${ms}`;
  }

  clone = () => {
    return new Time(this.hours, this.minutes, this.seconds)
  }
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
  return Math.round(time.toMiliseconds() / partSize.toMiliseconds());
}

export function sumTime(time, part) {
  let newTime = initTime(time.hours, time.minutes, time.seconds);
  newTime.hours += part.hours;
  newTime.minutes += part.minutes;
  newTime.seconds += part.seconds;
  return newTime;
}

export class TimeClock {
  constructor(start, end, step) {
    this.start = start
    this.end = end
    this.step = step
    this.length = timeParts(deltaTime(this.start, this.end), this.step)
  }

  /**
   * return time for given number. Starts from 0
   */
  getTimeByPart = (i) => {
    let part = i
    if (part > this.length) throw new Error("Out of range")
    let time = Time.fromMiliseconds(this.start.toMiliseconds() + this.step.toMiliseconds() * part)
    return time
  }

  getPartByTime = (time) => {
    return timeParts(deltaTime(this.start, time), this.step)
  }

}
