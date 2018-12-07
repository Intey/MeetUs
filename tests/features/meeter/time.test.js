import { initTime, deltaTime, timeParts, sumTime } from '../../../src/features/meeter/time';

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
    expect(timeParts(range, part)).toBe(4.8);
  });

  it('should increate time with time', () => {
    const source = initTime(1);
    const part = initTime(0, 15);
    const newTime = sumTime(source, part);
    expect(source.getHours()).toBe(1);
    expect(newTime.getHours()).toBe(1);
    expect(newTime.getMinutes()).toBe(15);
  });
});
