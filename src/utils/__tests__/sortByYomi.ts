import { getYomi } from '../sortByYomi';

describe('get Yomi', () => {
  it('ordinary', () => {
    expect(getYomi('Queen', null)).toBe('queen');
  });
  it('lowercase', () => {
    expect(getYomi('cero', null)).toBe('cero');
  });
  it('The', () => {
    expect(getYomi('The Beatles', null)).toBe('beatles');
  });
  it('kana as alphabet', () => {
    expect(getYomi('가호', 'Gaho')).toBe('gaho');
  });
  it('The and Kana', () => {
    expect(getYomi('The ピーズ', null)).toBe('ぴーず');
  });
});
