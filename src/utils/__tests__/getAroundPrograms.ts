import { getAroundCore } from '../getAroundPrograms';

/**
 * default:
 * length = 10, index = 2, limit = 5, threshould = 2
 * => [0, 1, *2*, 3, 4] (0, 5)
 *
 * length = 10, index = 5, limit = 5, threshould = 2
 * => [3, 4, *5*, 6, 7] (3, 8)
 *
 * index < threshould:
 * length = 10, index = 1, limit = 5, threshould = 2
 * => [0, *1*, 2, 3, 4] (0, 5)
 *
 * index > length - threshould (8 >= 10 - 2)
 * length = 10, index = 8, limit = 5, threshould = 2
 * => [5, 6, 7, *8*, 9] (5, 10)
 *
 */

describe('getAroundPrograms', () => {
  it('default', () => {
    expect(getAroundCore(10, 2, 5)).toStrictEqual([0, 5]);
    expect(getAroundCore(10, 5, 5)).toStrictEqual([3, 8]);
  });
  it('index < threshould', () => {
    expect(getAroundCore(10, 1, 5)).toStrictEqual([0, 5]);
  });
  it('index >= threshould', () => {
    expect(getAroundCore(10, 8, 5)).toStrictEqual([5, 10]);
  });
});
