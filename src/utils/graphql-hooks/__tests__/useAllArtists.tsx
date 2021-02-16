import * as Gatsby from 'gatsby';
import { renderHook } from '@testing-library/react-hooks';
import { useAllArtists } from '../useAllArtists';
const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => {
    return allArtistsQuery();
  });
});

describe('useAllArtists', () => {
  it('check isArray', () => {
    const { result } = renderHook(() => useAllArtists());
    expect(Array.isArray(result.current)).toBeTruthy();
  });
});

function allArtistsQuery() {
  return {
    allArtist: {
      edges: [],
    },
  };
}
