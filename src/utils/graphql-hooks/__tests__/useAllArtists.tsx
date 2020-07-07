import * as Gatsby from 'gatsby';
import { renderHook } from '@testing-library/react-hooks';
import { useAllArtists, useArtists } from '../useAllArtists';
import { AllArtistsQuery } from '../../../../graphql-types';
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

function allArtistsQuery(): AllArtistsQuery {
  /**
   * query AllArtists {
   * allProgram(sort: {fields: date, order: ASC}, limit: 10) {
   *   group(field: playlist___artist) {
   *     edges {
   *       node {
   *         id
   *         playlist {
   *           artist
   *           kana
   *           nation
   *           youtube
   *         }
   *       }
   *     }
   *     fieldValue
   *   }
   *  }
   * }
   */

  return {
    allProgram: {
      group: [
        {
          edges: [
            {
              node: {
                id: '20180002',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Andrew Lloyd Webber and Tim Rice',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Je6g1ufZhJY',
                  },
                  {
                    artist: 'Judee Sill',
                    kana: '',
                    nation: 'US',
                    youtube: '4gIBGTgnOdU',
                  },
                  {
                    artist: 'Fleetwood Mac',
                    kana: '',
                    nation: 'UK',
                    youtube: '-i3w576gr9o',
                  },
                  {
                    artist: '吉田ヨウヘイgroup',
                    kana: 'よしだようへいぐるーぷ',
                    nation: 'JPN',
                    youtube: 'kRa6RMfrfvI',
                  },
                  {
                    artist: 'Randy California',
                    kana: '',
                    nation: 'US',
                    youtube: '',
                  },
                  {
                    artist: 'CHAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'YMGf3zyhG94',
                  },
                  {
                    artist: 'SOON',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Andrew Lloyd Webber and Tim Rice',
        },
        {
          edges: [
            {
              node: {
                id: '20180004',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'cdMEZkGW2PA',
                  },
                  {
                    artist: 'People In the Box',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'dBz5JsdDTHw',
                  },
                  {
                    artist: 'BRAHMAN',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'NnRvCS_pa8I',
                  },
                  {
                    artist: 'Awesome City Club',
                    kana: '',
                    nation: 'JPN',
                    youtube: '8cP9HeZS37E',
                  },
                  {
                    artist: 'Czecho No Republic',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'FodrXpDdvtg',
                  },
                  {
                    artist: 'パノラマメロウ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'NYAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'PRTQb_BYqig',
                  },
                  {
                    artist: '陣内大蔵',
                    kana: 'じんないだいぞう',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Awesome City Club',
        },
        {
          edges: [
            {
              node: {
                id: '20180007',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'l1-D43s6D_A',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: 'yMVV_HsHcX0',
                  },
                  {
                    artist: 'Iron Maiden',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ie7GZGdgdPQ',
                  },
                  {
                    artist: '横浜銀蝿',
                    kana: 'よこはまぎんばえ',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'sumika',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mSe8zHd27MU',
                  },
                  {
                    artist: 'Nuno',
                    kana: null,
                    nation: 'US',
                    youtube: null,
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'BAND-MAID',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'axF56i4spio',
                  },
                  {
                    artist: 'アン・ルイス',
                    kana: null,
                    nation: 'JPN',
                    youtube: '-zGSdpa8t4g',
                  },
                ],
              },
            },
          ],
          fieldValue: 'BAND-MAID',
        },
        {
          edges: [
            {
              node: {
                id: '20180008',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Dio',
                    kana: null,
                    nation: 'UK',
                    youtube: 'oIqdF4i3q58',
                  },
                  {
                    artist: 'Rush',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'QuL_euRslTc',
                  },
                  {
                    artist: 'Loudness',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'od-fB3dBI2Y',
                  },
                  {
                    artist: 'The Groovers',
                    kana: '',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Quiet Riot',
                    kana: null,
                    nation: 'US',
                    youtube: 'ZxgMGk9JPVA',
                  },
                  {
                    artist: 'ゲスの極み乙女。',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'C6-AN8J385c',
                  },
                  {
                    artist: 'BLIZARD',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'VkEif3UPKKw',
                  },
                ],
              },
            },
          ],
          fieldValue: 'BLIZARD',
        },
        {
          edges: [
            {
              node: {
                id: '20180004',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'cdMEZkGW2PA',
                  },
                  {
                    artist: 'People In the Box',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'dBz5JsdDTHw',
                  },
                  {
                    artist: 'BRAHMAN',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'NnRvCS_pa8I',
                  },
                  {
                    artist: 'Awesome City Club',
                    kana: '',
                    nation: 'JPN',
                    youtube: '8cP9HeZS37E',
                  },
                  {
                    artist: 'Czecho No Republic',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'FodrXpDdvtg',
                  },
                  {
                    artist: 'パノラマメロウ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'NYAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'PRTQb_BYqig',
                  },
                  {
                    artist: '陣内大蔵',
                    kana: 'じんないだいぞう',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'BRAHMAN',
        },
        {
          edges: [
            {
              node: {
                id: '20180006',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Billy Joel',
                    kana: null,
                    nation: 'US',
                    youtube: 'SuFScoO4tb0',
                  },
                  {
                    artist: 'The Left Banke',
                    kana: null,
                    nation: 'US',
                    youtube: 'OdUovuUJ0fk',
                  },
                  {
                    artist: 'Michel Polnareff',
                    kana: '',
                    nation: 'FR',
                    youtube: 'CM8CzDsCoeE',
                  },
                  {
                    artist: 'Belinda Carlisle',
                    kana: null,
                    nation: 'US',
                    youtube: 'pmZYE8j2ZNs',
                  },
                  {
                    artist: 'The Posies',
                    kana: null,
                    nation: 'US',
                    youtube: 'q1oiHcKAAeA',
                  },
                  {
                    artist: 'オフコース',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'v8a6z8PixD0',
                  },
                  {
                    artist: 'Sheen',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'Belinda Carlisle',
        },
        {
          edges: [
            {
              node: {
                id: '20180006',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Billy Joel',
                    kana: null,
                    nation: 'US',
                    youtube: 'SuFScoO4tb0',
                  },
                  {
                    artist: 'The Left Banke',
                    kana: null,
                    nation: 'US',
                    youtube: 'OdUovuUJ0fk',
                  },
                  {
                    artist: 'Michel Polnareff',
                    kana: '',
                    nation: 'FR',
                    youtube: 'CM8CzDsCoeE',
                  },
                  {
                    artist: 'Belinda Carlisle',
                    kana: null,
                    nation: 'US',
                    youtube: 'pmZYE8j2ZNs',
                  },
                  {
                    artist: 'The Posies',
                    kana: null,
                    nation: 'US',
                    youtube: 'q1oiHcKAAeA',
                  },
                  {
                    artist: 'オフコース',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'v8a6z8PixD0',
                  },
                  {
                    artist: 'Sheen',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'Billy Joel',
        },
        {
          edges: [
            {
              node: {
                id: '20180003',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: '9VVFNgbsDC4',
                  },
                  {
                    artist: 'Black Sabbath',
                    kana: '',
                    nation: 'UK',
                    youtube: 'hkXHsK4AQPs',
                  },
                  {
                    artist: 'Led Zeppelin',
                    kana: '',
                    nation: 'UK',
                    youtube: 'S_CYdTmj7lA',
                  },
                  {
                    artist: 'EARTHSHAKER',
                    kana: '',
                    nation: 'JPN',
                    youtube: '2IkMJ2xhS8Q',
                  },
                  {
                    artist: '山下達郎',
                    kana: 'やましたたつろう',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'LU-NA',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Black Sabbath',
        },
        {
          edges: [
            {
              node: {
                id: '20180010',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'SalC2mBb1QQ',
                  },
                  {
                    artist: 'エレファントカシマシ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Mr.Children',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'ウルフルズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'JUN SKY WALKER(S)',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fIh0IAqObi8',
                  },
                  {
                    artist: 'Blur',
                    kana: '',
                    nation: 'UK',
                    youtube: 'p1a_4CN4onA',
                  },
                  {
                    artist: '鈴木祥子',
                    kana: 'すずきしょうこ',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Blur',
        },
        {
          edges: [
            {
              node: {
                id: '20180001',
                playlist: [
                  {
                    artist: 'The Knack',
                    kana: '',
                    nation: 'US',
                    youtube: 'bbr60I0u2Ng',
                  },
                  {
                    artist: 'Boston',
                    kana: '',
                    nation: 'US',
                    youtube: '2HuiH-0R6a0',
                  },
                  {
                    artist: 'Cheap Trick',
                    kana: '',
                    nation: 'US',
                    youtube: 'y1JuM8fP2dM',
                  },
                  {
                    artist: 'Suzi Quatro',
                    kana: '',
                    nation: 'US',
                    youtube: 'fKBtPXeJwEA',
                  },
                  {
                    artist: 'The Police',
                    kana: '',
                    nation: 'UK',
                    youtube: 'MbXWrmQW-OE',
                  },
                  {
                    artist: 'Japan',
                    kana: '',
                    nation: 'UK',
                    youtube: '',
                  },
                  {
                    artist: 'Kiss',
                    kana: '',
                    nation: 'US',
                    youtube: 'SzhdSKxrymY',
                  },
                  {
                    artist: 'Supertramp',
                    kana: '',
                    nation: 'UK',
                    youtube: 'gmj_EmVHiR4',
                  },
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fuebj1esuwY',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Boston',
        },
        {
          edges: [
            {
              node: {
                id: '20180005',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'GiuxvmiULhI',
                  },
                  {
                    artist: 'The Verve',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ToQ0n3itoII',
                  },
                  {
                    artist: 'The House of Love',
                    kana: null,
                    nation: 'UK',
                    youtube: 'GGQ5iYMasJY',
                  },
                  {
                    artist: 'The Sundays',
                    kana: null,
                    nation: 'UK',
                    youtube: 'yARVs1ZNLjU',
                  },
                  {
                    artist: 'ゆらゆら帝国',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mKUhq7SYouA',
                  },
                  {
                    artist: 'Bryan Adams',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'eFjjO_lhf9c',
                  },
                  {
                    artist: 'Rufus Wainwright',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'hv0kaGGFetA',
                  },
                  {
                    artist: 'Nav Katze',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'Bryan Adams',
        },
        {
          edges: [
            {
              node: {
                id: '20180002',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Andrew Lloyd Webber and Tim Rice',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Je6g1ufZhJY',
                  },
                  {
                    artist: 'Judee Sill',
                    kana: '',
                    nation: 'US',
                    youtube: '4gIBGTgnOdU',
                  },
                  {
                    artist: 'Fleetwood Mac',
                    kana: '',
                    nation: 'UK',
                    youtube: '-i3w576gr9o',
                  },
                  {
                    artist: '吉田ヨウヘイgroup',
                    kana: 'よしだようへいぐるーぷ',
                    nation: 'JPN',
                    youtube: 'kRa6RMfrfvI',
                  },
                  {
                    artist: 'Randy California',
                    kana: '',
                    nation: 'US',
                    youtube: '',
                  },
                  {
                    artist: 'CHAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'YMGf3zyhG94',
                  },
                  {
                    artist: 'SOON',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'CHAI',
        },
        {
          edges: [
            {
              node: {
                id: '20180001',
                playlist: [
                  {
                    artist: 'The Knack',
                    kana: '',
                    nation: 'US',
                    youtube: 'bbr60I0u2Ng',
                  },
                  {
                    artist: 'Boston',
                    kana: '',
                    nation: 'US',
                    youtube: '2HuiH-0R6a0',
                  },
                  {
                    artist: 'Cheap Trick',
                    kana: '',
                    nation: 'US',
                    youtube: 'y1JuM8fP2dM',
                  },
                  {
                    artist: 'Suzi Quatro',
                    kana: '',
                    nation: 'US',
                    youtube: 'fKBtPXeJwEA',
                  },
                  {
                    artist: 'The Police',
                    kana: '',
                    nation: 'UK',
                    youtube: 'MbXWrmQW-OE',
                  },
                  {
                    artist: 'Japan',
                    kana: '',
                    nation: 'UK',
                    youtube: '',
                  },
                  {
                    artist: 'Kiss',
                    kana: '',
                    nation: 'US',
                    youtube: 'SzhdSKxrymY',
                  },
                  {
                    artist: 'Supertramp',
                    kana: '',
                    nation: 'UK',
                    youtube: 'gmj_EmVHiR4',
                  },
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fuebj1esuwY',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Cheap Trick',
        },
        {
          edges: [
            {
              node: {
                id: '20180004',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'cdMEZkGW2PA',
                  },
                  {
                    artist: 'People In the Box',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'dBz5JsdDTHw',
                  },
                  {
                    artist: 'BRAHMAN',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'NnRvCS_pa8I',
                  },
                  {
                    artist: 'Awesome City Club',
                    kana: '',
                    nation: 'JPN',
                    youtube: '8cP9HeZS37E',
                  },
                  {
                    artist: 'Czecho No Republic',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'FodrXpDdvtg',
                  },
                  {
                    artist: 'パノラマメロウ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'NYAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'PRTQb_BYqig',
                  },
                  {
                    artist: '陣内大蔵',
                    kana: 'じんないだいぞう',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Czecho No Republic',
        },
        {
          edges: [
            {
              node: {
                id: '20180009',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '94uxNQqmknk',
                  },
                  {
                    artist: 'The Beatles',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Man4Xw8Xypo',
                  },
                  {
                    artist: 'くるり',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'The Lumineers',
                    kana: '',
                    nation: 'US',
                    youtube: 'zvCBSSwgtg4',
                  },
                  {
                    artist: 'YeYe',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'StkLx0e4f6c',
                  },
                  {
                    artist: 'David Bowie',
                    kana: '',
                    nation: 'UK',
                    youtube: '2_ayFz62eYE',
                  },
                  {
                    artist: 'Jethro Tull',
                    kana: '',
                    nation: 'UK',
                    youtube: 'luDfuZkeqKU',
                  },
                  {
                    artist: '遊佐未森',
                    kana: 'ゆさみもり',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'David Bowie',
        },
        {
          edges: [
            {
              node: {
                id: '20180008',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Dio',
                    kana: null,
                    nation: 'UK',
                    youtube: 'oIqdF4i3q58',
                  },
                  {
                    artist: 'Rush',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'QuL_euRslTc',
                  },
                  {
                    artist: 'Loudness',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'od-fB3dBI2Y',
                  },
                  {
                    artist: 'The Groovers',
                    kana: '',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Quiet Riot',
                    kana: null,
                    nation: 'US',
                    youtube: 'ZxgMGk9JPVA',
                  },
                  {
                    artist: 'ゲスの極み乙女。',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'C6-AN8J385c',
                  },
                  {
                    artist: 'BLIZARD',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'VkEif3UPKKw',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Dio',
        },
        {
          edges: [
            {
              node: {
                id: '20180003',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: '9VVFNgbsDC4',
                  },
                  {
                    artist: 'Black Sabbath',
                    kana: '',
                    nation: 'UK',
                    youtube: 'hkXHsK4AQPs',
                  },
                  {
                    artist: 'Led Zeppelin',
                    kana: '',
                    nation: 'UK',
                    youtube: 'S_CYdTmj7lA',
                  },
                  {
                    artist: 'EARTHSHAKER',
                    kana: '',
                    nation: 'JPN',
                    youtube: '2IkMJ2xhS8Q',
                  },
                  {
                    artist: '山下達郎',
                    kana: 'やましたたつろう',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'LU-NA',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'EARTHSHAKER',
        },
        {
          edges: [
            {
              node: {
                id: '20180002',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Andrew Lloyd Webber and Tim Rice',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Je6g1ufZhJY',
                  },
                  {
                    artist: 'Judee Sill',
                    kana: '',
                    nation: 'US',
                    youtube: '4gIBGTgnOdU',
                  },
                  {
                    artist: 'Fleetwood Mac',
                    kana: '',
                    nation: 'UK',
                    youtube: '-i3w576gr9o',
                  },
                  {
                    artist: '吉田ヨウヘイgroup',
                    kana: 'よしだようへいぐるーぷ',
                    nation: 'JPN',
                    youtube: 'kRa6RMfrfvI',
                  },
                  {
                    artist: 'Randy California',
                    kana: '',
                    nation: 'US',
                    youtube: '',
                  },
                  {
                    artist: 'CHAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'YMGf3zyhG94',
                  },
                  {
                    artist: 'SOON',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Fleetwood Mac',
        },
        {
          edges: [
            {
              node: {
                id: '20180007',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'l1-D43s6D_A',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: 'yMVV_HsHcX0',
                  },
                  {
                    artist: 'Iron Maiden',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ie7GZGdgdPQ',
                  },
                  {
                    artist: '横浜銀蝿',
                    kana: 'よこはまぎんばえ',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'sumika',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mSe8zHd27MU',
                  },
                  {
                    artist: 'Nuno',
                    kana: null,
                    nation: 'US',
                    youtube: null,
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'BAND-MAID',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'axF56i4spio',
                  },
                  {
                    artist: 'アン・ルイス',
                    kana: null,
                    nation: 'JPN',
                    youtube: '-zGSdpa8t4g',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Iron Maiden',
        },
        {
          edges: [
            {
              node: {
                id: '20180010',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'SalC2mBb1QQ',
                  },
                  {
                    artist: 'エレファントカシマシ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Mr.Children',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'ウルフルズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'JUN SKY WALKER(S)',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fIh0IAqObi8',
                  },
                  {
                    artist: 'Blur',
                    kana: '',
                    nation: 'UK',
                    youtube: 'p1a_4CN4onA',
                  },
                  {
                    artist: '鈴木祥子',
                    kana: 'すずきしょうこ',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'JUN SKY WALKER(S)',
        },
        {
          edges: [
            {
              node: {
                id: '20180001',
                playlist: [
                  {
                    artist: 'The Knack',
                    kana: '',
                    nation: 'US',
                    youtube: 'bbr60I0u2Ng',
                  },
                  {
                    artist: 'Boston',
                    kana: '',
                    nation: 'US',
                    youtube: '2HuiH-0R6a0',
                  },
                  {
                    artist: 'Cheap Trick',
                    kana: '',
                    nation: 'US',
                    youtube: 'y1JuM8fP2dM',
                  },
                  {
                    artist: 'Suzi Quatro',
                    kana: '',
                    nation: 'US',
                    youtube: 'fKBtPXeJwEA',
                  },
                  {
                    artist: 'The Police',
                    kana: '',
                    nation: 'UK',
                    youtube: 'MbXWrmQW-OE',
                  },
                  {
                    artist: 'Japan',
                    kana: '',
                    nation: 'UK',
                    youtube: '',
                  },
                  {
                    artist: 'Kiss',
                    kana: '',
                    nation: 'US',
                    youtube: 'SzhdSKxrymY',
                  },
                  {
                    artist: 'Supertramp',
                    kana: '',
                    nation: 'UK',
                    youtube: 'gmj_EmVHiR4',
                  },
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fuebj1esuwY',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Japan',
        },
        {
          edges: [
            {
              node: {
                id: '20180009',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '94uxNQqmknk',
                  },
                  {
                    artist: 'The Beatles',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Man4Xw8Xypo',
                  },
                  {
                    artist: 'くるり',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'The Lumineers',
                    kana: '',
                    nation: 'US',
                    youtube: 'zvCBSSwgtg4',
                  },
                  {
                    artist: 'YeYe',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'StkLx0e4f6c',
                  },
                  {
                    artist: 'David Bowie',
                    kana: '',
                    nation: 'UK',
                    youtube: '2_ayFz62eYE',
                  },
                  {
                    artist: 'Jethro Tull',
                    kana: '',
                    nation: 'UK',
                    youtube: 'luDfuZkeqKU',
                  },
                  {
                    artist: '遊佐未森',
                    kana: 'ゆさみもり',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Jethro Tull',
        },
        {
          edges: [
            {
              node: {
                id: '20180003',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: '9VVFNgbsDC4',
                  },
                  {
                    artist: 'Black Sabbath',
                    kana: '',
                    nation: 'UK',
                    youtube: 'hkXHsK4AQPs',
                  },
                  {
                    artist: 'Led Zeppelin',
                    kana: '',
                    nation: 'UK',
                    youtube: 'S_CYdTmj7lA',
                  },
                  {
                    artist: 'EARTHSHAKER',
                    kana: '',
                    nation: 'JPN',
                    youtube: '2IkMJ2xhS8Q',
                  },
                  {
                    artist: '山下達郎',
                    kana: 'やましたたつろう',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'LU-NA',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
            {
              node: {
                id: '20180007',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'l1-D43s6D_A',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: 'yMVV_HsHcX0',
                  },
                  {
                    artist: 'Iron Maiden',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ie7GZGdgdPQ',
                  },
                  {
                    artist: '横浜銀蝿',
                    kana: 'よこはまぎんばえ',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'sumika',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mSe8zHd27MU',
                  },
                  {
                    artist: 'Nuno',
                    kana: null,
                    nation: 'US',
                    youtube: null,
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'BAND-MAID',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'axF56i4spio',
                  },
                  {
                    artist: 'アン・ルイス',
                    kana: null,
                    nation: 'JPN',
                    youtube: '-zGSdpa8t4g',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Judas Priest',
        },
        {
          edges: [
            {
              node: {
                id: '20180002',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Andrew Lloyd Webber and Tim Rice',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Je6g1ufZhJY',
                  },
                  {
                    artist: 'Judee Sill',
                    kana: '',
                    nation: 'US',
                    youtube: '4gIBGTgnOdU',
                  },
                  {
                    artist: 'Fleetwood Mac',
                    kana: '',
                    nation: 'UK',
                    youtube: '-i3w576gr9o',
                  },
                  {
                    artist: '吉田ヨウヘイgroup',
                    kana: 'よしだようへいぐるーぷ',
                    nation: 'JPN',
                    youtube: 'kRa6RMfrfvI',
                  },
                  {
                    artist: 'Randy California',
                    kana: '',
                    nation: 'US',
                    youtube: '',
                  },
                  {
                    artist: 'CHAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'YMGf3zyhG94',
                  },
                  {
                    artist: 'SOON',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Judee Sill',
        },
        {
          edges: [
            {
              node: {
                id: '20180001',
                playlist: [
                  {
                    artist: 'The Knack',
                    kana: '',
                    nation: 'US',
                    youtube: 'bbr60I0u2Ng',
                  },
                  {
                    artist: 'Boston',
                    kana: '',
                    nation: 'US',
                    youtube: '2HuiH-0R6a0',
                  },
                  {
                    artist: 'Cheap Trick',
                    kana: '',
                    nation: 'US',
                    youtube: 'y1JuM8fP2dM',
                  },
                  {
                    artist: 'Suzi Quatro',
                    kana: '',
                    nation: 'US',
                    youtube: 'fKBtPXeJwEA',
                  },
                  {
                    artist: 'The Police',
                    kana: '',
                    nation: 'UK',
                    youtube: 'MbXWrmQW-OE',
                  },
                  {
                    artist: 'Japan',
                    kana: '',
                    nation: 'UK',
                    youtube: '',
                  },
                  {
                    artist: 'Kiss',
                    kana: '',
                    nation: 'US',
                    youtube: 'SzhdSKxrymY',
                  },
                  {
                    artist: 'Supertramp',
                    kana: '',
                    nation: 'UK',
                    youtube: 'gmj_EmVHiR4',
                  },
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fuebj1esuwY',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Kiss',
        },
        {
          edges: [
            {
              node: {
                id: '20180003',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: '9VVFNgbsDC4',
                  },
                  {
                    artist: 'Black Sabbath',
                    kana: '',
                    nation: 'UK',
                    youtube: 'hkXHsK4AQPs',
                  },
                  {
                    artist: 'Led Zeppelin',
                    kana: '',
                    nation: 'UK',
                    youtube: 'S_CYdTmj7lA',
                  },
                  {
                    artist: 'EARTHSHAKER',
                    kana: '',
                    nation: 'JPN',
                    youtube: '2IkMJ2xhS8Q',
                  },
                  {
                    artist: '山下達郎',
                    kana: 'やましたたつろう',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'LU-NA',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'LU-NA',
        },
        {
          edges: [
            {
              node: {
                id: '20180003',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: '9VVFNgbsDC4',
                  },
                  {
                    artist: 'Black Sabbath',
                    kana: '',
                    nation: 'UK',
                    youtube: 'hkXHsK4AQPs',
                  },
                  {
                    artist: 'Led Zeppelin',
                    kana: '',
                    nation: 'UK',
                    youtube: 'S_CYdTmj7lA',
                  },
                  {
                    artist: 'EARTHSHAKER',
                    kana: '',
                    nation: 'JPN',
                    youtube: '2IkMJ2xhS8Q',
                  },
                  {
                    artist: '山下達郎',
                    kana: 'やましたたつろう',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'LU-NA',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Led Zeppelin',
        },
        {
          edges: [
            {
              node: {
                id: '20180008',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Dio',
                    kana: null,
                    nation: 'UK',
                    youtube: 'oIqdF4i3q58',
                  },
                  {
                    artist: 'Rush',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'QuL_euRslTc',
                  },
                  {
                    artist: 'Loudness',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'od-fB3dBI2Y',
                  },
                  {
                    artist: 'The Groovers',
                    kana: '',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Quiet Riot',
                    kana: null,
                    nation: 'US',
                    youtube: 'ZxgMGk9JPVA',
                  },
                  {
                    artist: 'ゲスの極み乙女。',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'C6-AN8J385c',
                  },
                  {
                    artist: 'BLIZARD',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'VkEif3UPKKw',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Loudness',
        },
        {
          edges: [
            {
              node: {
                id: '20180006',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Billy Joel',
                    kana: null,
                    nation: 'US',
                    youtube: 'SuFScoO4tb0',
                  },
                  {
                    artist: 'The Left Banke',
                    kana: null,
                    nation: 'US',
                    youtube: 'OdUovuUJ0fk',
                  },
                  {
                    artist: 'Michel Polnareff',
                    kana: '',
                    nation: 'FR',
                    youtube: 'CM8CzDsCoeE',
                  },
                  {
                    artist: 'Belinda Carlisle',
                    kana: null,
                    nation: 'US',
                    youtube: 'pmZYE8j2ZNs',
                  },
                  {
                    artist: 'The Posies',
                    kana: null,
                    nation: 'US',
                    youtube: 'q1oiHcKAAeA',
                  },
                  {
                    artist: 'オフコース',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'v8a6z8PixD0',
                  },
                  {
                    artist: 'Sheen',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'Michel Polnareff',
        },
        {
          edges: [
            {
              node: {
                id: '20180010',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'SalC2mBb1QQ',
                  },
                  {
                    artist: 'エレファントカシマシ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Mr.Children',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'ウルフルズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'JUN SKY WALKER(S)',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fIh0IAqObi8',
                  },
                  {
                    artist: 'Blur',
                    kana: '',
                    nation: 'UK',
                    youtube: 'p1a_4CN4onA',
                  },
                  {
                    artist: '鈴木祥子',
                    kana: 'すずきしょうこ',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Mr.Children',
        },
        {
          edges: [
            {
              node: {
                id: '20180004',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'cdMEZkGW2PA',
                  },
                  {
                    artist: 'People In the Box',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'dBz5JsdDTHw',
                  },
                  {
                    artist: 'BRAHMAN',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'NnRvCS_pa8I',
                  },
                  {
                    artist: 'Awesome City Club',
                    kana: '',
                    nation: 'JPN',
                    youtube: '8cP9HeZS37E',
                  },
                  {
                    artist: 'Czecho No Republic',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'FodrXpDdvtg',
                  },
                  {
                    artist: 'パノラマメロウ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'NYAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'PRTQb_BYqig',
                  },
                  {
                    artist: '陣内大蔵',
                    kana: 'じんないだいぞう',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'NYAI',
        },
        {
          edges: [
            {
              node: {
                id: '20180005',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'GiuxvmiULhI',
                  },
                  {
                    artist: 'The Verve',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ToQ0n3itoII',
                  },
                  {
                    artist: 'The House of Love',
                    kana: null,
                    nation: 'UK',
                    youtube: 'GGQ5iYMasJY',
                  },
                  {
                    artist: 'The Sundays',
                    kana: null,
                    nation: 'UK',
                    youtube: 'yARVs1ZNLjU',
                  },
                  {
                    artist: 'ゆらゆら帝国',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mKUhq7SYouA',
                  },
                  {
                    artist: 'Bryan Adams',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'eFjjO_lhf9c',
                  },
                  {
                    artist: 'Rufus Wainwright',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'hv0kaGGFetA',
                  },
                  {
                    artist: 'Nav Katze',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'Nav Katze',
        },
        {
          edges: [
            {
              node: {
                id: '20180007',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'l1-D43s6D_A',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: 'yMVV_HsHcX0',
                  },
                  {
                    artist: 'Iron Maiden',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ie7GZGdgdPQ',
                  },
                  {
                    artist: '横浜銀蝿',
                    kana: 'よこはまぎんばえ',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'sumika',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mSe8zHd27MU',
                  },
                  {
                    artist: 'Nuno',
                    kana: null,
                    nation: 'US',
                    youtube: null,
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'BAND-MAID',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'axF56i4spio',
                  },
                  {
                    artist: 'アン・ルイス',
                    kana: null,
                    nation: 'JPN',
                    youtube: '-zGSdpa8t4g',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Nuno',
        },
        {
          edges: [
            {
              node: {
                id: '20180004',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'cdMEZkGW2PA',
                  },
                  {
                    artist: 'People In the Box',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'dBz5JsdDTHw',
                  },
                  {
                    artist: 'BRAHMAN',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'NnRvCS_pa8I',
                  },
                  {
                    artist: 'Awesome City Club',
                    kana: '',
                    nation: 'JPN',
                    youtube: '8cP9HeZS37E',
                  },
                  {
                    artist: 'Czecho No Republic',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'FodrXpDdvtg',
                  },
                  {
                    artist: 'パノラマメロウ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'NYAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'PRTQb_BYqig',
                  },
                  {
                    artist: '陣内大蔵',
                    kana: 'じんないだいぞう',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'People In the Box',
        },
        {
          edges: [
            {
              node: {
                id: '20180008',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Dio',
                    kana: null,
                    nation: 'UK',
                    youtube: 'oIqdF4i3q58',
                  },
                  {
                    artist: 'Rush',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'QuL_euRslTc',
                  },
                  {
                    artist: 'Loudness',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'od-fB3dBI2Y',
                  },
                  {
                    artist: 'The Groovers',
                    kana: '',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Quiet Riot',
                    kana: null,
                    nation: 'US',
                    youtube: 'ZxgMGk9JPVA',
                  },
                  {
                    artist: 'ゲスの極み乙女。',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'C6-AN8J385c',
                  },
                  {
                    artist: 'BLIZARD',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'VkEif3UPKKw',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Quiet Riot',
        },
        {
          edges: [
            {
              node: {
                id: '20180002',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Andrew Lloyd Webber and Tim Rice',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Je6g1ufZhJY',
                  },
                  {
                    artist: 'Judee Sill',
                    kana: '',
                    nation: 'US',
                    youtube: '4gIBGTgnOdU',
                  },
                  {
                    artist: 'Fleetwood Mac',
                    kana: '',
                    nation: 'UK',
                    youtube: '-i3w576gr9o',
                  },
                  {
                    artist: '吉田ヨウヘイgroup',
                    kana: 'よしだようへいぐるーぷ',
                    nation: 'JPN',
                    youtube: 'kRa6RMfrfvI',
                  },
                  {
                    artist: 'Randy California',
                    kana: '',
                    nation: 'US',
                    youtube: '',
                  },
                  {
                    artist: 'CHAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'YMGf3zyhG94',
                  },
                  {
                    artist: 'SOON',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Randy California',
        },
        {
          edges: [
            {
              node: {
                id: '20180005',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'GiuxvmiULhI',
                  },
                  {
                    artist: 'The Verve',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ToQ0n3itoII',
                  },
                  {
                    artist: 'The House of Love',
                    kana: null,
                    nation: 'UK',
                    youtube: 'GGQ5iYMasJY',
                  },
                  {
                    artist: 'The Sundays',
                    kana: null,
                    nation: 'UK',
                    youtube: 'yARVs1ZNLjU',
                  },
                  {
                    artist: 'ゆらゆら帝国',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mKUhq7SYouA',
                  },
                  {
                    artist: 'Bryan Adams',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'eFjjO_lhf9c',
                  },
                  {
                    artist: 'Rufus Wainwright',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'hv0kaGGFetA',
                  },
                  {
                    artist: 'Nav Katze',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'Rufus Wainwright',
        },
        {
          edges: [
            {
              node: {
                id: '20180008',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Dio',
                    kana: null,
                    nation: 'UK',
                    youtube: 'oIqdF4i3q58',
                  },
                  {
                    artist: 'Rush',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'QuL_euRslTc',
                  },
                  {
                    artist: 'Loudness',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'od-fB3dBI2Y',
                  },
                  {
                    artist: 'The Groovers',
                    kana: '',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Quiet Riot',
                    kana: null,
                    nation: 'US',
                    youtube: 'ZxgMGk9JPVA',
                  },
                  {
                    artist: 'ゲスの極み乙女。',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'C6-AN8J385c',
                  },
                  {
                    artist: 'BLIZARD',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'VkEif3UPKKw',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Rush',
        },
        {
          edges: [
            {
              node: {
                id: '20180002',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Andrew Lloyd Webber and Tim Rice',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Je6g1ufZhJY',
                  },
                  {
                    artist: 'Judee Sill',
                    kana: '',
                    nation: 'US',
                    youtube: '4gIBGTgnOdU',
                  },
                  {
                    artist: 'Fleetwood Mac',
                    kana: '',
                    nation: 'UK',
                    youtube: '-i3w576gr9o',
                  },
                  {
                    artist: '吉田ヨウヘイgroup',
                    kana: 'よしだようへいぐるーぷ',
                    nation: 'JPN',
                    youtube: 'kRa6RMfrfvI',
                  },
                  {
                    artist: 'Randy California',
                    kana: '',
                    nation: 'US',
                    youtube: '',
                  },
                  {
                    artist: 'CHAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'YMGf3zyhG94',
                  },
                  {
                    artist: 'SOON',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'SOON',
        },
        {
          edges: [
            {
              node: {
                id: '20180006',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Billy Joel',
                    kana: null,
                    nation: 'US',
                    youtube: 'SuFScoO4tb0',
                  },
                  {
                    artist: 'The Left Banke',
                    kana: null,
                    nation: 'US',
                    youtube: 'OdUovuUJ0fk',
                  },
                  {
                    artist: 'Michel Polnareff',
                    kana: '',
                    nation: 'FR',
                    youtube: 'CM8CzDsCoeE',
                  },
                  {
                    artist: 'Belinda Carlisle',
                    kana: null,
                    nation: 'US',
                    youtube: 'pmZYE8j2ZNs',
                  },
                  {
                    artist: 'The Posies',
                    kana: null,
                    nation: 'US',
                    youtube: 'q1oiHcKAAeA',
                  },
                  {
                    artist: 'オフコース',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'v8a6z8PixD0',
                  },
                  {
                    artist: 'Sheen',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'Sheen',
        },
        {
          edges: [
            {
              node: {
                id: '20180001',
                playlist: [
                  {
                    artist: 'The Knack',
                    kana: '',
                    nation: 'US',
                    youtube: 'bbr60I0u2Ng',
                  },
                  {
                    artist: 'Boston',
                    kana: '',
                    nation: 'US',
                    youtube: '2HuiH-0R6a0',
                  },
                  {
                    artist: 'Cheap Trick',
                    kana: '',
                    nation: 'US',
                    youtube: 'y1JuM8fP2dM',
                  },
                  {
                    artist: 'Suzi Quatro',
                    kana: '',
                    nation: 'US',
                    youtube: 'fKBtPXeJwEA',
                  },
                  {
                    artist: 'The Police',
                    kana: '',
                    nation: 'UK',
                    youtube: 'MbXWrmQW-OE',
                  },
                  {
                    artist: 'Japan',
                    kana: '',
                    nation: 'UK',
                    youtube: '',
                  },
                  {
                    artist: 'Kiss',
                    kana: '',
                    nation: 'US',
                    youtube: 'SzhdSKxrymY',
                  },
                  {
                    artist: 'Supertramp',
                    kana: '',
                    nation: 'UK',
                    youtube: 'gmj_EmVHiR4',
                  },
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fuebj1esuwY',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Supertramp',
        },
        {
          edges: [
            {
              node: {
                id: '20180001',
                playlist: [
                  {
                    artist: 'The Knack',
                    kana: '',
                    nation: 'US',
                    youtube: 'bbr60I0u2Ng',
                  },
                  {
                    artist: 'Boston',
                    kana: '',
                    nation: 'US',
                    youtube: '2HuiH-0R6a0',
                  },
                  {
                    artist: 'Cheap Trick',
                    kana: '',
                    nation: 'US',
                    youtube: 'y1JuM8fP2dM',
                  },
                  {
                    artist: 'Suzi Quatro',
                    kana: '',
                    nation: 'US',
                    youtube: 'fKBtPXeJwEA',
                  },
                  {
                    artist: 'The Police',
                    kana: '',
                    nation: 'UK',
                    youtube: 'MbXWrmQW-OE',
                  },
                  {
                    artist: 'Japan',
                    kana: '',
                    nation: 'UK',
                    youtube: '',
                  },
                  {
                    artist: 'Kiss',
                    kana: '',
                    nation: 'US',
                    youtube: 'SzhdSKxrymY',
                  },
                  {
                    artist: 'Supertramp',
                    kana: '',
                    nation: 'UK',
                    youtube: 'gmj_EmVHiR4',
                  },
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fuebj1esuwY',
                  },
                ],
              },
            },
          ],
          fieldValue: 'Suzi Quatro',
        },
        {
          edges: [
            {
              node: {
                id: '20180009',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '94uxNQqmknk',
                  },
                  {
                    artist: 'The Beatles',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Man4Xw8Xypo',
                  },
                  {
                    artist: 'くるり',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'The Lumineers',
                    kana: '',
                    nation: 'US',
                    youtube: 'zvCBSSwgtg4',
                  },
                  {
                    artist: 'YeYe',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'StkLx0e4f6c',
                  },
                  {
                    artist: 'David Bowie',
                    kana: '',
                    nation: 'UK',
                    youtube: '2_ayFz62eYE',
                  },
                  {
                    artist: 'Jethro Tull',
                    kana: '',
                    nation: 'UK',
                    youtube: 'luDfuZkeqKU',
                  },
                  {
                    artist: '遊佐未森',
                    kana: 'ゆさみもり',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'The Beatles',
        },
        {
          edges: [
            {
              node: {
                id: '20180008',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Dio',
                    kana: null,
                    nation: 'UK',
                    youtube: 'oIqdF4i3q58',
                  },
                  {
                    artist: 'Rush',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'QuL_euRslTc',
                  },
                  {
                    artist: 'Loudness',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'od-fB3dBI2Y',
                  },
                  {
                    artist: 'The Groovers',
                    kana: '',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Quiet Riot',
                    kana: null,
                    nation: 'US',
                    youtube: 'ZxgMGk9JPVA',
                  },
                  {
                    artist: 'ゲスの極み乙女。',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'C6-AN8J385c',
                  },
                  {
                    artist: 'BLIZARD',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'VkEif3UPKKw',
                  },
                ],
              },
            },
          ],
          fieldValue: 'The Groovers',
        },
        {
          edges: [
            {
              node: {
                id: '20180005',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'GiuxvmiULhI',
                  },
                  {
                    artist: 'The Verve',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ToQ0n3itoII',
                  },
                  {
                    artist: 'The House of Love',
                    kana: null,
                    nation: 'UK',
                    youtube: 'GGQ5iYMasJY',
                  },
                  {
                    artist: 'The Sundays',
                    kana: null,
                    nation: 'UK',
                    youtube: 'yARVs1ZNLjU',
                  },
                  {
                    artist: 'ゆらゆら帝国',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mKUhq7SYouA',
                  },
                  {
                    artist: 'Bryan Adams',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'eFjjO_lhf9c',
                  },
                  {
                    artist: 'Rufus Wainwright',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'hv0kaGGFetA',
                  },
                  {
                    artist: 'Nav Katze',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'The House of Love',
        },
        {
          edges: [
            {
              node: {
                id: '20180001',
                playlist: [
                  {
                    artist: 'The Knack',
                    kana: '',
                    nation: 'US',
                    youtube: 'bbr60I0u2Ng',
                  },
                  {
                    artist: 'Boston',
                    kana: '',
                    nation: 'US',
                    youtube: '2HuiH-0R6a0',
                  },
                  {
                    artist: 'Cheap Trick',
                    kana: '',
                    nation: 'US',
                    youtube: 'y1JuM8fP2dM',
                  },
                  {
                    artist: 'Suzi Quatro',
                    kana: '',
                    nation: 'US',
                    youtube: 'fKBtPXeJwEA',
                  },
                  {
                    artist: 'The Police',
                    kana: '',
                    nation: 'UK',
                    youtube: 'MbXWrmQW-OE',
                  },
                  {
                    artist: 'Japan',
                    kana: '',
                    nation: 'UK',
                    youtube: '',
                  },
                  {
                    artist: 'Kiss',
                    kana: '',
                    nation: 'US',
                    youtube: 'SzhdSKxrymY',
                  },
                  {
                    artist: 'Supertramp',
                    kana: '',
                    nation: 'UK',
                    youtube: 'gmj_EmVHiR4',
                  },
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fuebj1esuwY',
                  },
                ],
              },
            },
          ],
          fieldValue: 'The Knack',
        },
        {
          edges: [
            {
              node: {
                id: '20180006',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Billy Joel',
                    kana: null,
                    nation: 'US',
                    youtube: 'SuFScoO4tb0',
                  },
                  {
                    artist: 'The Left Banke',
                    kana: null,
                    nation: 'US',
                    youtube: 'OdUovuUJ0fk',
                  },
                  {
                    artist: 'Michel Polnareff',
                    kana: '',
                    nation: 'FR',
                    youtube: 'CM8CzDsCoeE',
                  },
                  {
                    artist: 'Belinda Carlisle',
                    kana: null,
                    nation: 'US',
                    youtube: 'pmZYE8j2ZNs',
                  },
                  {
                    artist: 'The Posies',
                    kana: null,
                    nation: 'US',
                    youtube: 'q1oiHcKAAeA',
                  },
                  {
                    artist: 'オフコース',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'v8a6z8PixD0',
                  },
                  {
                    artist: 'Sheen',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'The Left Banke',
        },
        {
          edges: [
            {
              node: {
                id: '20180009',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '94uxNQqmknk',
                  },
                  {
                    artist: 'The Beatles',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Man4Xw8Xypo',
                  },
                  {
                    artist: 'くるり',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'The Lumineers',
                    kana: '',
                    nation: 'US',
                    youtube: 'zvCBSSwgtg4',
                  },
                  {
                    artist: 'YeYe',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'StkLx0e4f6c',
                  },
                  {
                    artist: 'David Bowie',
                    kana: '',
                    nation: 'UK',
                    youtube: '2_ayFz62eYE',
                  },
                  {
                    artist: 'Jethro Tull',
                    kana: '',
                    nation: 'UK',
                    youtube: 'luDfuZkeqKU',
                  },
                  {
                    artist: '遊佐未森',
                    kana: 'ゆさみもり',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'The Lumineers',
        },
        {
          edges: [
            {
              node: {
                id: '20180001',
                playlist: [
                  {
                    artist: 'The Knack',
                    kana: '',
                    nation: 'US',
                    youtube: 'bbr60I0u2Ng',
                  },
                  {
                    artist: 'Boston',
                    kana: '',
                    nation: 'US',
                    youtube: '2HuiH-0R6a0',
                  },
                  {
                    artist: 'Cheap Trick',
                    kana: '',
                    nation: 'US',
                    youtube: 'y1JuM8fP2dM',
                  },
                  {
                    artist: 'Suzi Quatro',
                    kana: '',
                    nation: 'US',
                    youtube: 'fKBtPXeJwEA',
                  },
                  {
                    artist: 'The Police',
                    kana: '',
                    nation: 'UK',
                    youtube: 'MbXWrmQW-OE',
                  },
                  {
                    artist: 'Japan',
                    kana: '',
                    nation: 'UK',
                    youtube: '',
                  },
                  {
                    artist: 'Kiss',
                    kana: '',
                    nation: 'US',
                    youtube: 'SzhdSKxrymY',
                  },
                  {
                    artist: 'Supertramp',
                    kana: '',
                    nation: 'UK',
                    youtube: 'gmj_EmVHiR4',
                  },
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fuebj1esuwY',
                  },
                ],
              },
            },
          ],
          fieldValue: 'The Police',
        },
        {
          edges: [
            {
              node: {
                id: '20180006',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Billy Joel',
                    kana: null,
                    nation: 'US',
                    youtube: 'SuFScoO4tb0',
                  },
                  {
                    artist: 'The Left Banke',
                    kana: null,
                    nation: 'US',
                    youtube: 'OdUovuUJ0fk',
                  },
                  {
                    artist: 'Michel Polnareff',
                    kana: '',
                    nation: 'FR',
                    youtube: 'CM8CzDsCoeE',
                  },
                  {
                    artist: 'Belinda Carlisle',
                    kana: null,
                    nation: 'US',
                    youtube: 'pmZYE8j2ZNs',
                  },
                  {
                    artist: 'The Posies',
                    kana: null,
                    nation: 'US',
                    youtube: 'q1oiHcKAAeA',
                  },
                  {
                    artist: 'オフコース',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'v8a6z8PixD0',
                  },
                  {
                    artist: 'Sheen',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'The Posies',
        },
        {
          edges: [
            {
              node: {
                id: '20180005',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'GiuxvmiULhI',
                  },
                  {
                    artist: 'The Verve',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ToQ0n3itoII',
                  },
                  {
                    artist: 'The House of Love',
                    kana: null,
                    nation: 'UK',
                    youtube: 'GGQ5iYMasJY',
                  },
                  {
                    artist: 'The Sundays',
                    kana: null,
                    nation: 'UK',
                    youtube: 'yARVs1ZNLjU',
                  },
                  {
                    artist: 'ゆらゆら帝国',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mKUhq7SYouA',
                  },
                  {
                    artist: 'Bryan Adams',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'eFjjO_lhf9c',
                  },
                  {
                    artist: 'Rufus Wainwright',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'hv0kaGGFetA',
                  },
                  {
                    artist: 'Nav Katze',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'The Sundays',
        },
        {
          edges: [
            {
              node: {
                id: '20180005',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'GiuxvmiULhI',
                  },
                  {
                    artist: 'The Verve',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ToQ0n3itoII',
                  },
                  {
                    artist: 'The House of Love',
                    kana: null,
                    nation: 'UK',
                    youtube: 'GGQ5iYMasJY',
                  },
                  {
                    artist: 'The Sundays',
                    kana: null,
                    nation: 'UK',
                    youtube: 'yARVs1ZNLjU',
                  },
                  {
                    artist: 'ゆらゆら帝国',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mKUhq7SYouA',
                  },
                  {
                    artist: 'Bryan Adams',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'eFjjO_lhf9c',
                  },
                  {
                    artist: 'Rufus Wainwright',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'hv0kaGGFetA',
                  },
                  {
                    artist: 'Nav Katze',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'The Verve',
        },
        {
          edges: [
            {
              node: {
                id: '20180009',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '94uxNQqmknk',
                  },
                  {
                    artist: 'The Beatles',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Man4Xw8Xypo',
                  },
                  {
                    artist: 'くるり',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'The Lumineers',
                    kana: '',
                    nation: 'US',
                    youtube: 'zvCBSSwgtg4',
                  },
                  {
                    artist: 'YeYe',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'StkLx0e4f6c',
                  },
                  {
                    artist: 'David Bowie',
                    kana: '',
                    nation: 'UK',
                    youtube: '2_ayFz62eYE',
                  },
                  {
                    artist: 'Jethro Tull',
                    kana: '',
                    nation: 'UK',
                    youtube: 'luDfuZkeqKU',
                  },
                  {
                    artist: '遊佐未森',
                    kana: 'ゆさみもり',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'YeYe',
        },
        {
          edges: [
            {
              node: {
                id: '20180007',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'l1-D43s6D_A',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: 'yMVV_HsHcX0',
                  },
                  {
                    artist: 'Iron Maiden',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ie7GZGdgdPQ',
                  },
                  {
                    artist: '横浜銀蝿',
                    kana: 'よこはまぎんばえ',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'sumika',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mSe8zHd27MU',
                  },
                  {
                    artist: 'Nuno',
                    kana: null,
                    nation: 'US',
                    youtube: null,
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'BAND-MAID',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'axF56i4spio',
                  },
                  {
                    artist: 'アン・ルイス',
                    kana: null,
                    nation: 'JPN',
                    youtube: '-zGSdpa8t4g',
                  },
                ],
              },
            },
          ],
          fieldValue: 'sumika',
        },
        {
          edges: [
            {
              node: {
                id: '20180009',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '94uxNQqmknk',
                  },
                  {
                    artist: 'The Beatles',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Man4Xw8Xypo',
                  },
                  {
                    artist: 'くるり',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'The Lumineers',
                    kana: '',
                    nation: 'US',
                    youtube: 'zvCBSSwgtg4',
                  },
                  {
                    artist: 'YeYe',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'StkLx0e4f6c',
                  },
                  {
                    artist: 'David Bowie',
                    kana: '',
                    nation: 'UK',
                    youtube: '2_ayFz62eYE',
                  },
                  {
                    artist: 'Jethro Tull',
                    kana: '',
                    nation: 'UK',
                    youtube: 'luDfuZkeqKU',
                  },
                  {
                    artist: '遊佐未森',
                    kana: 'ゆさみもり',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'くるり',
        },
        {
          edges: [
            {
              node: {
                id: '20180005',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'GiuxvmiULhI',
                  },
                  {
                    artist: 'The Verve',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ToQ0n3itoII',
                  },
                  {
                    artist: 'The House of Love',
                    kana: null,
                    nation: 'UK',
                    youtube: 'GGQ5iYMasJY',
                  },
                  {
                    artist: 'The Sundays',
                    kana: null,
                    nation: 'UK',
                    youtube: 'yARVs1ZNLjU',
                  },
                  {
                    artist: 'ゆらゆら帝国',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mKUhq7SYouA',
                  },
                  {
                    artist: 'Bryan Adams',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'eFjjO_lhf9c',
                  },
                  {
                    artist: 'Rufus Wainwright',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'hv0kaGGFetA',
                  },
                  {
                    artist: 'Nav Katze',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'ゆらゆら帝国',
        },
        {
          edges: [
            {
              node: {
                id: '20180007',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'l1-D43s6D_A',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: 'yMVV_HsHcX0',
                  },
                  {
                    artist: 'Iron Maiden',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ie7GZGdgdPQ',
                  },
                  {
                    artist: '横浜銀蝿',
                    kana: 'よこはまぎんばえ',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'sumika',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mSe8zHd27MU',
                  },
                  {
                    artist: 'Nuno',
                    kana: null,
                    nation: 'US',
                    youtube: null,
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'BAND-MAID',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'axF56i4spio',
                  },
                  {
                    artist: 'アン・ルイス',
                    kana: null,
                    nation: 'JPN',
                    youtube: '-zGSdpa8t4g',
                  },
                ],
              },
            },
          ],
          fieldValue: 'アン・ルイス',
        },
        {
          edges: [
            {
              node: {
                id: '20180010',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'SalC2mBb1QQ',
                  },
                  {
                    artist: 'エレファントカシマシ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Mr.Children',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'ウルフルズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'JUN SKY WALKER(S)',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fIh0IAqObi8',
                  },
                  {
                    artist: 'Blur',
                    kana: '',
                    nation: 'UK',
                    youtube: 'p1a_4CN4onA',
                  },
                  {
                    artist: '鈴木祥子',
                    kana: 'すずきしょうこ',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'ウルフルズ',
        },
        {
          edges: [
            {
              node: {
                id: '20180010',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'SalC2mBb1QQ',
                  },
                  {
                    artist: 'エレファントカシマシ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Mr.Children',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'ウルフルズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'JUN SKY WALKER(S)',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fIh0IAqObi8',
                  },
                  {
                    artist: 'Blur',
                    kana: '',
                    nation: 'UK',
                    youtube: 'p1a_4CN4onA',
                  },
                  {
                    artist: '鈴木祥子',
                    kana: 'すずきしょうこ',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'エレファントカシマシ',
        },
        {
          edges: [
            {
              node: {
                id: '20180006',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Billy Joel',
                    kana: null,
                    nation: 'US',
                    youtube: 'SuFScoO4tb0',
                  },
                  {
                    artist: 'The Left Banke',
                    kana: null,
                    nation: 'US',
                    youtube: 'OdUovuUJ0fk',
                  },
                  {
                    artist: 'Michel Polnareff',
                    kana: '',
                    nation: 'FR',
                    youtube: 'CM8CzDsCoeE',
                  },
                  {
                    artist: 'Belinda Carlisle',
                    kana: null,
                    nation: 'US',
                    youtube: 'pmZYE8j2ZNs',
                  },
                  {
                    artist: 'The Posies',
                    kana: null,
                    nation: 'US',
                    youtube: 'q1oiHcKAAeA',
                  },
                  {
                    artist: 'オフコース',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'v8a6z8PixD0',
                  },
                  {
                    artist: 'Sheen',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
          ],
          fieldValue: 'オフコース',
        },
        {
          edges: [
            {
              node: {
                id: '20180008',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Dio',
                    kana: null,
                    nation: 'UK',
                    youtube: 'oIqdF4i3q58',
                  },
                  {
                    artist: 'Rush',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'QuL_euRslTc',
                  },
                  {
                    artist: 'Loudness',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'od-fB3dBI2Y',
                  },
                  {
                    artist: 'The Groovers',
                    kana: '',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Quiet Riot',
                    kana: null,
                    nation: 'US',
                    youtube: 'ZxgMGk9JPVA',
                  },
                  {
                    artist: 'ゲスの極み乙女。',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'C6-AN8J385c',
                  },
                  {
                    artist: 'BLIZARD',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'VkEif3UPKKw',
                  },
                ],
              },
            },
          ],
          fieldValue: 'ゲスの極み乙女。',
        },
        {
          edges: [
            {
              node: {
                id: '20180001',
                playlist: [
                  {
                    artist: 'The Knack',
                    kana: '',
                    nation: 'US',
                    youtube: 'bbr60I0u2Ng',
                  },
                  {
                    artist: 'Boston',
                    kana: '',
                    nation: 'US',
                    youtube: '2HuiH-0R6a0',
                  },
                  {
                    artist: 'Cheap Trick',
                    kana: '',
                    nation: 'US',
                    youtube: 'y1JuM8fP2dM',
                  },
                  {
                    artist: 'Suzi Quatro',
                    kana: '',
                    nation: 'US',
                    youtube: 'fKBtPXeJwEA',
                  },
                  {
                    artist: 'The Police',
                    kana: '',
                    nation: 'UK',
                    youtube: 'MbXWrmQW-OE',
                  },
                  {
                    artist: 'Japan',
                    kana: '',
                    nation: 'UK',
                    youtube: '',
                  },
                  {
                    artist: 'Kiss',
                    kana: '',
                    nation: 'US',
                    youtube: 'SzhdSKxrymY',
                  },
                  {
                    artist: 'Supertramp',
                    kana: '',
                    nation: 'UK',
                    youtube: 'gmj_EmVHiR4',
                  },
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fuebj1esuwY',
                  },
                ],
              },
            },
            {
              node: {
                id: '20180002',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Andrew Lloyd Webber and Tim Rice',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Je6g1ufZhJY',
                  },
                  {
                    artist: 'Judee Sill',
                    kana: '',
                    nation: 'US',
                    youtube: '4gIBGTgnOdU',
                  },
                  {
                    artist: 'Fleetwood Mac',
                    kana: '',
                    nation: 'UK',
                    youtube: '-i3w576gr9o',
                  },
                  {
                    artist: '吉田ヨウヘイgroup',
                    kana: 'よしだようへいぐるーぷ',
                    nation: 'JPN',
                    youtube: 'kRa6RMfrfvI',
                  },
                  {
                    artist: 'Randy California',
                    kana: '',
                    nation: 'US',
                    youtube: '',
                  },
                  {
                    artist: 'CHAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'YMGf3zyhG94',
                  },
                  {
                    artist: 'SOON',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
            {
              node: {
                id: '20180003',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: '9VVFNgbsDC4',
                  },
                  {
                    artist: 'Black Sabbath',
                    kana: '',
                    nation: 'UK',
                    youtube: 'hkXHsK4AQPs',
                  },
                  {
                    artist: 'Led Zeppelin',
                    kana: '',
                    nation: 'UK',
                    youtube: 'S_CYdTmj7lA',
                  },
                  {
                    artist: 'EARTHSHAKER',
                    kana: '',
                    nation: 'JPN',
                    youtube: '2IkMJ2xhS8Q',
                  },
                  {
                    artist: '山下達郎',
                    kana: 'やましたたつろう',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'LU-NA',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
            {
              node: {
                id: '20180004',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'cdMEZkGW2PA',
                  },
                  {
                    artist: 'People In the Box',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'dBz5JsdDTHw',
                  },
                  {
                    artist: 'BRAHMAN',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'NnRvCS_pa8I',
                  },
                  {
                    artist: 'Awesome City Club',
                    kana: '',
                    nation: 'JPN',
                    youtube: '8cP9HeZS37E',
                  },
                  {
                    artist: 'Czecho No Republic',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'FodrXpDdvtg',
                  },
                  {
                    artist: 'パノラマメロウ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'NYAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'PRTQb_BYqig',
                  },
                  {
                    artist: '陣内大蔵',
                    kana: 'じんないだいぞう',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
            {
              node: {
                id: '20180005',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'GiuxvmiULhI',
                  },
                  {
                    artist: 'The Verve',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ToQ0n3itoII',
                  },
                  {
                    artist: 'The House of Love',
                    kana: null,
                    nation: 'UK',
                    youtube: 'GGQ5iYMasJY',
                  },
                  {
                    artist: 'The Sundays',
                    kana: null,
                    nation: 'UK',
                    youtube: 'yARVs1ZNLjU',
                  },
                  {
                    artist: 'ゆらゆら帝国',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mKUhq7SYouA',
                  },
                  {
                    artist: 'Bryan Adams',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'eFjjO_lhf9c',
                  },
                  {
                    artist: 'Rufus Wainwright',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'hv0kaGGFetA',
                  },
                  {
                    artist: 'Nav Katze',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
            {
              node: {
                id: '20180006',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Billy Joel',
                    kana: null,
                    nation: 'US',
                    youtube: 'SuFScoO4tb0',
                  },
                  {
                    artist: 'The Left Banke',
                    kana: null,
                    nation: 'US',
                    youtube: 'OdUovuUJ0fk',
                  },
                  {
                    artist: 'Michel Polnareff',
                    kana: '',
                    nation: 'FR',
                    youtube: 'CM8CzDsCoeE',
                  },
                  {
                    artist: 'Belinda Carlisle',
                    kana: null,
                    nation: 'US',
                    youtube: 'pmZYE8j2ZNs',
                  },
                  {
                    artist: 'The Posies',
                    kana: null,
                    nation: 'US',
                    youtube: 'q1oiHcKAAeA',
                  },
                  {
                    artist: 'オフコース',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'v8a6z8PixD0',
                  },
                  {
                    artist: 'Sheen',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                ],
              },
            },
            {
              node: {
                id: '20180007',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'l1-D43s6D_A',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: 'yMVV_HsHcX0',
                  },
                  {
                    artist: 'Iron Maiden',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ie7GZGdgdPQ',
                  },
                  {
                    artist: '横浜銀蝿',
                    kana: 'よこはまぎんばえ',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'sumika',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mSe8zHd27MU',
                  },
                  {
                    artist: 'Nuno',
                    kana: null,
                    nation: 'US',
                    youtube: null,
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'BAND-MAID',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'axF56i4spio',
                  },
                  {
                    artist: 'アン・ルイス',
                    kana: null,
                    nation: 'JPN',
                    youtube: '-zGSdpa8t4g',
                  },
                ],
              },
            },
            {
              node: {
                id: '20180008',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Dio',
                    kana: null,
                    nation: 'UK',
                    youtube: 'oIqdF4i3q58',
                  },
                  {
                    artist: 'Rush',
                    kana: null,
                    nation: 'CAN',
                    youtube: 'QuL_euRslTc',
                  },
                  {
                    artist: 'Loudness',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'od-fB3dBI2Y',
                  },
                  {
                    artist: 'The Groovers',
                    kana: '',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'Quiet Riot',
                    kana: null,
                    nation: 'US',
                    youtube: 'ZxgMGk9JPVA',
                  },
                  {
                    artist: 'ゲスの極み乙女。',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'C6-AN8J385c',
                  },
                  {
                    artist: 'BLIZARD',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'VkEif3UPKKw',
                  },
                ],
              },
            },
            {
              node: {
                id: '20180009',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '94uxNQqmknk',
                  },
                  {
                    artist: 'The Beatles',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Man4Xw8Xypo',
                  },
                  {
                    artist: 'くるり',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'The Lumineers',
                    kana: '',
                    nation: 'US',
                    youtube: 'zvCBSSwgtg4',
                  },
                  {
                    artist: 'YeYe',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'StkLx0e4f6c',
                  },
                  {
                    artist: 'David Bowie',
                    kana: '',
                    nation: 'UK',
                    youtube: '2_ayFz62eYE',
                  },
                  {
                    artist: 'Jethro Tull',
                    kana: '',
                    nation: 'UK',
                    youtube: 'luDfuZkeqKU',
                  },
                  {
                    artist: '遊佐未森',
                    kana: 'ゆさみもり',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
            {
              node: {
                id: '20180010',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'SalC2mBb1QQ',
                  },
                  {
                    artist: 'エレファントカシマシ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Mr.Children',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'ウルフルズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'JUN SKY WALKER(S)',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fIh0IAqObi8',
                  },
                  {
                    artist: 'Blur',
                    kana: '',
                    nation: 'UK',
                    youtube: 'p1a_4CN4onA',
                  },
                  {
                    artist: '鈴木祥子',
                    kana: 'すずきしょうこ',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'スピッツ',
        },
        {
          edges: [
            {
              node: {
                id: '20180004',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'cdMEZkGW2PA',
                  },
                  {
                    artist: 'People In the Box',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'dBz5JsdDTHw',
                  },
                  {
                    artist: 'BRAHMAN',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'NnRvCS_pa8I',
                  },
                  {
                    artist: 'Awesome City Club',
                    kana: '',
                    nation: 'JPN',
                    youtube: '8cP9HeZS37E',
                  },
                  {
                    artist: 'Czecho No Republic',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'FodrXpDdvtg',
                  },
                  {
                    artist: 'パノラマメロウ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'NYAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'PRTQb_BYqig',
                  },
                  {
                    artist: '陣内大蔵',
                    kana: 'じんないだいぞう',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'パノラマメロウ',
        },
        {
          edges: [
            {
              node: {
                id: '20180007',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'l1-D43s6D_A',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: 'yMVV_HsHcX0',
                  },
                  {
                    artist: 'Iron Maiden',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ie7GZGdgdPQ',
                  },
                  {
                    artist: '横浜銀蝿',
                    kana: 'よこはまぎんばえ',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'sumika',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mSe8zHd27MU',
                  },
                  {
                    artist: 'Nuno',
                    kana: null,
                    nation: 'US',
                    youtube: null,
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'BAND-MAID',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'axF56i4spio',
                  },
                  {
                    artist: 'アン・ルイス',
                    kana: null,
                    nation: 'JPN',
                    youtube: '-zGSdpa8t4g',
                  },
                ],
              },
            },
            {
              node: {
                id: '20180010',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'SalC2mBb1QQ',
                  },
                  {
                    artist: 'エレファントカシマシ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Mr.Children',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'ウルフルズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'JUN SKY WALKER(S)',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fIh0IAqObi8',
                  },
                  {
                    artist: 'Blur',
                    kana: '',
                    nation: 'UK',
                    youtube: 'p1a_4CN4onA',
                  },
                  {
                    artist: '鈴木祥子',
                    kana: 'すずきしょうこ',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: 'フラワーカンパニーズ',
        },
        {
          edges: [
            {
              node: {
                id: '20180002',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Andrew Lloyd Webber and Tim Rice',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Je6g1ufZhJY',
                  },
                  {
                    artist: 'Judee Sill',
                    kana: '',
                    nation: 'US',
                    youtube: '4gIBGTgnOdU',
                  },
                  {
                    artist: 'Fleetwood Mac',
                    kana: '',
                    nation: 'UK',
                    youtube: '-i3w576gr9o',
                  },
                  {
                    artist: '吉田ヨウヘイgroup',
                    kana: 'よしだようへいぐるーぷ',
                    nation: 'JPN',
                    youtube: 'kRa6RMfrfvI',
                  },
                  {
                    artist: 'Randy California',
                    kana: '',
                    nation: 'US',
                    youtube: '',
                  },
                  {
                    artist: 'CHAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'YMGf3zyhG94',
                  },
                  {
                    artist: 'SOON',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: '吉田ヨウヘイgroup',
        },
        {
          edges: [
            {
              node: {
                id: '20180003',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: '9VVFNgbsDC4',
                  },
                  {
                    artist: 'Black Sabbath',
                    kana: '',
                    nation: 'UK',
                    youtube: 'hkXHsK4AQPs',
                  },
                  {
                    artist: 'Led Zeppelin',
                    kana: '',
                    nation: 'UK',
                    youtube: 'S_CYdTmj7lA',
                  },
                  {
                    artist: 'EARTHSHAKER',
                    kana: '',
                    nation: 'JPN',
                    youtube: '2IkMJ2xhS8Q',
                  },
                  {
                    artist: '山下達郎',
                    kana: 'やましたたつろう',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'LU-NA',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: '山下達郎',
        },
        {
          edges: [
            {
              node: {
                id: '20180007',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'l1-D43s6D_A',
                  },
                  {
                    artist: 'Judas Priest',
                    kana: '',
                    nation: 'UK',
                    youtube: 'yMVV_HsHcX0',
                  },
                  {
                    artist: 'Iron Maiden',
                    kana: null,
                    nation: 'UK',
                    youtube: 'ie7GZGdgdPQ',
                  },
                  {
                    artist: '横浜銀蝿',
                    kana: 'よこはまぎんばえ',
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'sumika',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'mSe8zHd27MU',
                  },
                  {
                    artist: 'Nuno',
                    kana: null,
                    nation: 'US',
                    youtube: null,
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: null,
                    nation: 'JPN',
                    youtube: null,
                  },
                  {
                    artist: 'BAND-MAID',
                    kana: null,
                    nation: 'JPN',
                    youtube: 'axF56i4spio',
                  },
                  {
                    artist: 'アン・ルイス',
                    kana: null,
                    nation: 'JPN',
                    youtube: '-zGSdpa8t4g',
                  },
                ],
              },
            },
          ],
          fieldValue: '横浜銀蝿',
        },
        {
          edges: [
            {
              node: {
                id: '20180009',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '94uxNQqmknk',
                  },
                  {
                    artist: 'The Beatles',
                    kana: '',
                    nation: 'UK',
                    youtube: 'Man4Xw8Xypo',
                  },
                  {
                    artist: 'くるり',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'The Lumineers',
                    kana: '',
                    nation: 'US',
                    youtube: 'zvCBSSwgtg4',
                  },
                  {
                    artist: 'YeYe',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'StkLx0e4f6c',
                  },
                  {
                    artist: 'David Bowie',
                    kana: '',
                    nation: 'UK',
                    youtube: '2_ayFz62eYE',
                  },
                  {
                    artist: 'Jethro Tull',
                    kana: '',
                    nation: 'UK',
                    youtube: 'luDfuZkeqKU',
                  },
                  {
                    artist: '遊佐未森',
                    kana: 'ゆさみもり',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: '遊佐未森',
        },
        {
          edges: [
            {
              node: {
                id: '20180010',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'SalC2mBb1QQ',
                  },
                  {
                    artist: 'エレファントカシマシ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'Mr.Children',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'ウルフルズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'JUN SKY WALKER(S)',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'フラワーカンパニーズ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'fIh0IAqObi8',
                  },
                  {
                    artist: 'Blur',
                    kana: '',
                    nation: 'UK',
                    youtube: 'p1a_4CN4onA',
                  },
                  {
                    artist: '鈴木祥子',
                    kana: 'すずきしょうこ',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: '鈴木祥子',
        },
        {
          edges: [
            {
              node: {
                id: '20180004',
                playlist: [
                  {
                    artist: 'スピッツ',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'cdMEZkGW2PA',
                  },
                  {
                    artist: 'People In the Box',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'dBz5JsdDTHw',
                  },
                  {
                    artist: 'BRAHMAN',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'NnRvCS_pa8I',
                  },
                  {
                    artist: 'Awesome City Club',
                    kana: '',
                    nation: 'JPN',
                    youtube: '8cP9HeZS37E',
                  },
                  {
                    artist: 'Czecho No Republic',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'FodrXpDdvtg',
                  },
                  {
                    artist: 'パノラマメロウ',
                    kana: '',
                    nation: 'JPN',
                    youtube: '',
                  },
                  {
                    artist: 'NYAI',
                    kana: '',
                    nation: 'JPN',
                    youtube: 'PRTQb_BYqig',
                  },
                  {
                    artist: '陣内大蔵',
                    kana: 'じんないだいぞう',
                    nation: 'JPN',
                    youtube: '',
                  },
                ],
              },
            },
          ],
          fieldValue: '陣内大蔵',
        },
      ],
    },
  };
}
