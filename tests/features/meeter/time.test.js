import { initTime, deltaTime, timeParts, sumTime, Time, TimeClock } from '../../../src/features/meeter/time';

describe('meeter/time', () => {
  it('should init time by h, m, s', () => {
    expect(initTime(3).getHours()).toBe(3);
  });
  it('should create delta with hours', () => {
    const start = initTime(0);
    const end = initTime(4);
    expect(deltaTime(start, end).getHours()).toBe(4);
  });

  it('should split time in parts', () => {
    let range = initTime(8);
    let part = initTime(0, 30);
    expect(timeParts(range, part)).toBe(16);
    range = initTime(4);
    part = initTime(0, 20);
    expect(timeParts(range, part)).toBe(12);

    range = initTime(2);
    part = initTime(0, 0, 15);
    expect(timeParts(range, part)).toBe(480);

    range = initTime(2);
    part = initTime(0, 25);
    expect(timeParts(range, part)).toBe(5);
  });

  it('should increate time with time', () => {
    const source = initTime(1);
    const part = initTime(0, 15);
    const newTime = sumTime(source, part);
    expect(source.getHours()).toBe(1);
    expect(newTime.getHours()).toBe(1);
    expect(newTime.getMinutes()).toBe(15);
  });
  it('should create time from miliseconds', () => {
    const ms = initTime(2, 10, 15).toMiliseconds()
    const time = Time.fromMiliseconds(ms);
    expect(time.hours).toBe(2)
    expect(time.minutes).toBe(10)
    expect(time.seconds).toBe(15)
  })
});

describe('time clock', () => {
  it('should take correct parts', () => {
    const start = new Time(9)
    const end = new Time(18)
    const step = new Time(0, 30)
    const clock = new TimeClock(start, end, step);
    expect(clock.length).toBe(9*2)
  })
  it('should return time for given index', () => {
    const start = new Time(9)
    const end = new Time(11)
    const step = new Time(0, 30)
    const clock = new TimeClock(start, end, step);
    const parts = 4
    expect(clock.getTimeByPart(0).toString()).toBe(start.toString())

    expect(clock.getTimeByPart(parts).toString()).toBe(end.toString())
  })

  it('should return part from given time', () => {
    const start = new Time(9)
    const end = new Time(11)
    const step = new Time(0, 30)
    const clock = new TimeClock(start, end, step);
    expect(clock.getPartByTime(start)).toBe(0);
    expect(clock.getPartByTime(end)).toBe(4);
    expect(clock.getPartByTime(new Time(9, 30))).toBe(1);

  })
})
