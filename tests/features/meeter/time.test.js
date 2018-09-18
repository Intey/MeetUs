import { initTime, deltaTime } from '../../../src/features/meeter/time';

describe('meeter/time', () => {
  it('should init time by h, m, s', () => {
    expect(initTime(3).getHours()).toBe(3)
  })
  it('should create delta with hours', () => {
    const start = initTime(0)
    const end = initTime(4)
    expect(deltaTime(start, end).getHours()).toBe(4)
  })
});
