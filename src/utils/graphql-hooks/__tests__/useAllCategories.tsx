import * as Gatsby from 'gatsby';
import { renderHook } from '@testing-library/react-hooks';
import { useCategories } from '../useAllCategories';
import { AllCategoriesQuery } from '../../../../graphql-types';
const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => {
    return allCategoriesQuery();
  });
});

describe('useCategories', () => {
  it('get a category', () => {
    const { result } = renderHook(() => useCategories(['アーティスト特集']));
    expect(result.current.length).toBe(1);
    expect(result.current[0].fieldValue).toBe('アーティスト特集');
  });

  it('get categories', () => {
    const { result } = renderHook(() => useCategories(['古い音楽雑誌で漫遊記', 'リズム特集']));
    expect(result.current.length).toBe(2);
    expect(result.current.map((d) => d.fieldValue ?? '')).toContain('古い音楽雑誌で漫遊記');
    expect(result.current.map((d) => d.fieldValue ?? '')).toContain('リズム特集');
    expect(result.current.map((d) => d.fieldValue ?? '')).not.toContain('アーティスト特集');
  });
});

function allCategoriesQuery(): AllCategoriesQuery {
  return {
    allProgram: {
      group: [
        { fieldValue: 'アーティスト特集', totalCount: 10 },
        { fieldValue: '古い音楽雑誌で漫遊記', totalCount: 10 },
        { fieldValue: 'リズム特集', totalCount: 10 },
      ],
    },
  };
}
