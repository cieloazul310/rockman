import * as Gatsby from 'gatsby';
import { renderHook } from '@testing-library/react-hooks';
// import { useAllArtists } from '../useAllArtists';
// import { AllArtistsQuery } from '../../../../graphql-types';
const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => {
    return allArtistsQuery();
  });
});
/*
describe('useAllArtists', () => {
  it('check isArray', () => {
    const { result } = renderHook(() => useAllArtists());
    expect(Array.isArray(result.current)).toBeTruthy();
  });
});

describe('useArtists', () => {
  it('edges', () => {
    const { result } = renderHook(() => useArtists('edges', 10));
    expect(result.current.map((d, i) => `${i + 1}. ${d.fieldValue} ${d.tunes.length}曲/${d.edges.length}回 `).join('\n')).toMatchSnapshot();
  });
  it('tunes', () => {
    const { result } = renderHook(() => useArtists('tunes', 10));
    expect(result.current.map((d, i) => `${i + 1}. ${d.fieldValue} ${d.tunes.length}曲/${d.edges.length}回 `).join('\n')).toMatchSnapshot();
  });
  it('abc', () => {
    const { result } = renderHook(() => useArtists('abc'));
    expect(result.current.map((d, i) => `${i + 1}. ${d.fieldValue} ${d.tunes.length}曲/${d.edges.length}回 `).join('\n')).toMatchSnapshot();
  });
});
*/
function allArtistsQuery() {
  return {};
}
