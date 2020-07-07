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
  /**
   * allProgram(sort: {fields: week, order: ASC}) {
   *   group(field: categories) {
   *     fieldValue
   *       edges {
   *         node {
   *           id
   *           week
   *           title
   *           date(formatString: "YYYY-MM-DD")
   *           fields {
   *             slug
   *           }
   *         }
   *       }
   *     }
   *   }
   */
  return {
    allProgram: {
      group: [
        {
          fieldValue: 'T・Y・K(当初やりたかった感じ)',
          edges: [
            {
              node: {
                id: '20190053',
                week: 53,
                title: 'ロク漫1周年！T・Y・K(当初やりたかった感じ)で漫遊記',
                date: '2019-01-06',
                fields: {
                  slug: '/program/20190053',
                },
              },
            },
            {
              node: {
                id: '20200111',
                week: 111,
                title: 'TYK・アメリカ編で漫遊記',
                date: '2020-02-16',
                fields: {
                  slug: '/program/20200111',
                },
              },
            },
          ],
        },
        {
          fieldValue: 'アーティスト特集',
          edges: [
            {
              node: {
                id: '20180017',
                week: 17,
                title: 'ユーライアヒープで漫遊記',
                date: '2018-04-29',
                fields: {
                  slug: '/program/20180017',
                },
              },
            },
            {
              node: {
                id: '20180022',
                week: 22,
                title: 'ザ・コレクターズで漫遊記',
                date: '2018-06-03',
                fields: {
                  slug: '/program/20180022',
                },
              },
            },
            {
              node: {
                id: '20180027',
                week: 27,
                title: 'Teenage Fanclubで漫遊記',
                date: '2018-07-08',
                fields: {
                  slug: '/program/20180027',
                },
              },
            },
            {
              node: {
                id: '20180035',
                week: 35,
                title: 'ロックなビリージョエルで漫遊記',
                date: '2018-09-02',
                fields: {
                  slug: '/program/20180035',
                },
              },
            },
            {
              node: {
                id: '20180040',
                week: 40,
                title: 'ポール・ロジャースで漫遊記',
                date: '2018-10-07',
                fields: {
                  slug: '/program/20180040',
                },
              },
            },
            {
              node: {
                id: '20180046',
                week: 46,
                title: 'Pixiesで漫遊記',
                date: '2018-11-18',
                fields: {
                  slug: '/program/20180046',
                },
              },
            },
            {
              node: {
                id: '20180049',
                week: 49,
                title: 'シン・リジィで漫遊記',
                date: '2018-12-09',
                fields: {
                  slug: '/program/20180049',
                },
              },
            },
            {
              node: {
                id: '20190058',
                week: 58,
                title: 'ライドで漫遊記',
                date: '2019-02-10',
                fields: {
                  slug: '/program/20190058',
                },
              },
            },
            {
              node: {
                id: '20190063',
                week: 63,
                title: 'THE SWEETで漫遊記',
                date: '2019-03-17',
                fields: {
                  slug: '/program/20190063',
                },
              },
            },
            {
              node: {
                id: '20190067',
                week: 67,
                title: 'ウィッシュボーンアッシュで漫遊記',
                date: '2019-04-14',
                fields: {
                  slug: '/program/20190067',
                },
              },
            },
            {
              node: {
                id: '20190072',
                week: 72,
                title: 'ミック・ロンソンで漫遊記',
                date: '2019-05-19',
                fields: {
                  slug: '/program/20190072',
                },
              },
            },
            {
              node: {
                id: '20190077',
                week: 77,
                title: 'ロニー・ジェイムス・ディオで漫遊記',
                date: '2019-06-23',
                fields: {
                  slug: '/program/20190077',
                },
              },
            },
            {
              node: {
                id: '20190080',
                week: 80,
                title: 'ジェスロ・タルで漫遊記',
                date: '2019-07-14',
                fields: {
                  slug: '/program/20190080',
                },
              },
            },
            {
              node: {
                id: '20190085',
                week: 85,
                title: 'コクトー・ツインズで漫遊記',
                date: '2019-08-18',
                fields: {
                  slug: '/program/20190085',
                },
              },
            },
            {
              node: {
                id: '20190087',
                week: 87,
                title: 'BUMP OF CHICKENで漫遊記',
                date: '2019-09-01',
                fields: {
                  slug: '/program/20190087',
                },
              },
            },
            {
              node: {
                id: '20190094',
                week: 94,
                title: 'The Night Flight Orchestraで漫遊記',
                date: '2019-10-20',
                fields: {
                  slug: '/program/20190094',
                },
              },
            },
            {
              node: {
                id: '20190097',
                week: 97,
                title: 'ザ・マフスで漫遊記',
                date: '2019-11-10',
                fields: {
                  slug: '/program/20190097',
                },
              },
            },
            {
              node: {
                id: '20190101',
                week: 101,
                title: 'ミッジ・ユーロで漫遊記',
                date: '2019-12-08',
                fields: {
                  slug: '/program/20190101',
                },
              },
            },
            {
              node: {
                id: '20200110',
                week: 110,
                title: 'ジェネレーションXで漫遊記',
                date: '2020-02-09',
                fields: {
                  slug: '/program/20200110',
                },
              },
            },
            {
              node: {
                id: '20200115',
                week: 115,
                title: 'ストーン・テンプル・パイロッツで漫遊記',
                date: '2020-03-15',
                fields: {
                  slug: '/program/20200115',
                },
              },
            },
            {
              node: {
                id: '20200119',
                week: 119,
                title: 'スージー・クアトロで漫遊記',
                date: '2020-04-12',
                fields: {
                  slug: '/program/20200119',
                },
              },
            },
            {
              node: {
                id: '20200124',
                week: 124,
                title: 'ベル・アンド・セバスチャンで漫遊記',
                date: '2020-05-17',
                fields: {
                  slug: '/program/20200124',
                },
              },
            },
            {
              node: {
                id: '20200129',
                week: 129,
                title: 'ディアフーフで漫遊記',
                date: '2020-06-21',
                fields: {
                  slug: '/program/20200129',
                },
              },
            },
          ],
        },
        {
          fieldValue: 'ゲスト回',
          edges: [
            {
              node: {
                id: '20180007',
                week: 7,
                title: 'スピッツメンバーと漫遊記',
                date: '2018-02-18',
                fields: {
                  slug: '/program/20180007',
                },
              },
            },
            {
              node: {
                id: '20180008',
                week: 8,
                title: 'スピッツメンバーと漫遊記パート2',
                date: '2018-02-25',
                fields: {
                  slug: '/program/20180008',
                },
              },
            },
            {
              node: {
                id: '20180031',
                week: 31,
                title: 'スピッツメンバーと漫遊記 田村明浩編',
                date: '2018-08-05',
                fields: {
                  slug: '/program/20180031',
                },
              },
            },
            {
              node: {
                id: '20180032',
                week: 32,
                title: 'スピッツメンバーと漫遊記 三輪テツヤ編',
                date: '2018-08-12',
                fields: {
                  slug: '/program/20180032',
                },
              },
            },
            {
              node: {
                id: '20180033',
                week: 33,
                title: 'スピッツメンバーと漫遊記 崎山龍男編',
                date: '2018-08-19',
                fields: {
                  slug: '/program/20180033',
                },
              },
            },
            {
              node: {
                id: '20180044',
                week: 44,
                title: 'クージーことクジヒロコと漫遊記',
                date: '2018-11-04',
                fields: {
                  slug: '/program/20180044',
                },
              },
            },
            {
              node: {
                id: '20190054',
                week: 54,
                title: 'スピッツ三輪テツヤで漫遊記2019新春',
                date: '2019-01-13',
                fields: {
                  slug: '/program/20190054',
                },
              },
            },
            {
              node: {
                id: '20190055',
                week: 55,
                title: 'スピッツ崎山龍男で漫遊記2019',
                date: '2019-01-20',
                fields: {
                  slug: '/program/20190055',
                },
              },
            },
            {
              node: {
                id: '20190056',
                week: 56,
                title: 'スピッツ田村明浩で漫遊記2019',
                date: '2019-01-27',
                fields: {
                  slug: '/program/20190056',
                },
              },
            },
            {
              node: {
                id: '20190083',
                week: 83,
                title: 'フラワーカンパニーズ 鈴木圭介くんと漫遊記',
                date: '2019-08-04',
                fields: {
                  slug: '/program/20190083',
                },
              },
            },
            {
              node: {
                id: '20200105',
                week: 105,
                title: 'スピッツメンバーで漫遊記・2020初春 三輪テツヤ編',
                date: '2020-01-05',
                fields: {
                  slug: '/program/20200105',
                },
              },
            },
            {
              node: {
                id: '20200106',
                week: 106,
                title: 'スピッツメンバーで漫遊記・2020初春 崎山龍男編',
                date: '2020-01-12',
                fields: {
                  slug: '/program/20200106',
                },
              },
            },
            {
              node: {
                id: '20200107',
                week: 107,
                title: 'スピッツメンバーで漫遊記・2020初春 田村明浩編',
                date: '2020-01-19',
                fields: {
                  slug: '/program/20200107',
                },
              },
            },
            {
              node: {
                id: '20200108',
                week: 108,
                title: 'スピッツメンバーで漫遊記・2020初春 クジヒロコ編',
                date: '2020-01-26',
                fields: {
                  slug: '/program/20200108',
                },
              },
            },
          ],
        },
        {
          fieldValue: 'スピッツメンバーと漫遊記',
          edges: [
            {
              node: {
                id: '20180007',
                week: 7,
                title: 'スピッツメンバーと漫遊記',
                date: '2018-02-18',
                fields: {
                  slug: '/program/20180007',
                },
              },
            },
            {
              node: {
                id: '20180008',
                week: 8,
                title: 'スピッツメンバーと漫遊記パート2',
                date: '2018-02-25',
                fields: {
                  slug: '/program/20180008',
                },
              },
            },
            {
              node: {
                id: '20180031',
                week: 31,
                title: 'スピッツメンバーと漫遊記 田村明浩編',
                date: '2018-08-05',
                fields: {
                  slug: '/program/20180031',
                },
              },
            },
            {
              node: {
                id: '20180032',
                week: 32,
                title: 'スピッツメンバーと漫遊記 三輪テツヤ編',
                date: '2018-08-12',
                fields: {
                  slug: '/program/20180032',
                },
              },
            },
            {
              node: {
                id: '20180033',
                week: 33,
                title: 'スピッツメンバーと漫遊記 崎山龍男編',
                date: '2018-08-19',
                fields: {
                  slug: '/program/20180033',
                },
              },
            },
            {
              node: {
                id: '20180044',
                week: 44,
                title: 'クージーことクジヒロコと漫遊記',
                date: '2018-11-04',
                fields: {
                  slug: '/program/20180044',
                },
              },
            },
            {
              node: {
                id: '20190054',
                week: 54,
                title: 'スピッツ三輪テツヤで漫遊記2019新春',
                date: '2019-01-13',
                fields: {
                  slug: '/program/20190054',
                },
              },
            },
            {
              node: {
                id: '20190055',
                week: 55,
                title: 'スピッツ崎山龍男で漫遊記2019',
                date: '2019-01-20',
                fields: {
                  slug: '/program/20190055',
                },
              },
            },
            {
              node: {
                id: '20190056',
                week: 56,
                title: 'スピッツ田村明浩で漫遊記2019',
                date: '2019-01-27',
                fields: {
                  slug: '/program/20190056',
                },
              },
            },
            {
              node: {
                id: '20200105',
                week: 105,
                title: 'スピッツメンバーで漫遊記・2020初春 三輪テツヤ編',
                date: '2020-01-05',
                fields: {
                  slug: '/program/20200105',
                },
              },
            },
            {
              node: {
                id: '20200106',
                week: 106,
                title: 'スピッツメンバーで漫遊記・2020初春 崎山龍男編',
                date: '2020-01-12',
                fields: {
                  slug: '/program/20200106',
                },
              },
            },
            {
              node: {
                id: '20200107',
                week: 107,
                title: 'スピッツメンバーで漫遊記・2020初春 田村明浩編',
                date: '2020-01-19',
                fields: {
                  slug: '/program/20200107',
                },
              },
            },
            {
              node: {
                id: '20200108',
                week: 108,
                title: 'スピッツメンバーで漫遊記・2020初春 クジヒロコ編',
                date: '2020-01-26',
                fields: {
                  slug: '/program/20200108',
                },
              },
            },
          ],
        },
        {
          fieldValue: 'プロデューサー特集',
          edges: [
            {
              node: {
                id: '20190100',
                week: 100,
                title: 'ビッカートン&ワディントンで漫遊記',
                date: '2019-12-01',
                fields: {
                  slug: '/program/20190100',
                },
              },
            },
          ],
        },
        {
          fieldValue: 'リクエスト特集',
          edges: [
            {
              node: {
                id: '20180009',
                week: 9,
                title: 'アコギサウンドリクエストで漫遊記',
                date: '2018-03-04',
                fields: {
                  slug: '/program/20180009',
                },
              },
            },
            {
              node: {
                id: '20180011',
                week: 11,
                title: '今、気になる邦楽リクエストで漫遊記',
                date: '2018-03-18',
                fields: {
                  slug: '/program/20180011',
                },
              },
            },
            {
              node: {
                id: '20180030',
                week: 30,
                title: '夏ロックで漫遊記',
                date: '2018-07-29',
                fields: {
                  slug: '/program/20180030',
                },
              },
            },
            {
              node: {
                id: '20180039',
                week: 39,
                title: 'ちょっぴりタイムマシンリクエストで漫遊記',
                date: '2018-09-30',
                fields: {
                  slug: '/program/20180039',
                },
              },
            },
            {
              node: {
                id: '20180052',
                week: 52,
                title: 'タイトルに男性名が入ったロックナンバーで漫遊記',
                date: '2018-12-30',
                fields: {
                  slug: '/program/20180052',
                },
              },
            },
            {
              node: {
                id: '20190062',
                week: 62,
                title: '花の名前がタイトルに入ったロックナンバーで漫遊記',
                date: '2019-03-10',
                fields: {
                  slug: '/program/20190062',
                },
              },
            },
            {
              node: {
                id: '20190070',
                week: 70,
                title: 'アナタのアゲアゲロックナンバーリクエストで漫遊記・洋楽編',
                date: '2019-05-05',
                fields: {
                  slug: '/program/20190070',
                },
              },
            },
            {
              node: {
                id: '20190071',
                week: 71,
                title: 'アナタのアゲアゲロックナンバーリクエストで漫遊記・邦楽編',
                date: '2019-05-12',
                fields: {
                  slug: '/program/20190071',
                },
              },
            },
            {
              node: {
                id: '20190081',
                week: 81,
                title: 'ご当地ロック国内編（東京以外）で漫遊記',
                date: '2019-07-21',
                fields: {
                  slug: '/program/20190081',
                },
              },
            },
            {
              node: {
                id: '20190091',
                week: 91,
                title: 'クルマにまつわるロックナンバーで漫遊記',
                date: '2019-09-29',
                fields: {
                  slug: '/program/20190091',
                },
              },
            },
            {
              node: {
                id: '20190098',
                week: 98,
                title: '私の好きな洋楽の歌詞リクエストで漫遊記',
                date: '2019-11-17',
                fields: {
                  slug: '/program/20190098',
                },
              },
            },
            {
              node: {
                id: '20200116',
                week: 116,
                title: '春ソングリクエストで漫遊記',
                date: '2020-03-22',
                fields: {
                  slug: '/program/20200116',
                },
              },
            },
            {
              node: {
                id: '20200125',
                week: 125,
                title: '旅にまつわるナンバーリクエストで漫遊記(邦楽編)',
                date: '2020-05-24',
                fields: {
                  slug: '/program/20200125',
                },
              },
            },
            {
              node: {
                id: '20200126',
                week: 126,
                title: '旅にまつわるナンバーリクエストで漫遊記(洋楽編)',
                date: '2020-05-31',
                fields: {
                  slug: '/program/20200126',
                },
              },
            },
          ],
        },
        {
          fieldValue: 'リズム特集',
          edges: [
            {
              node: {
                id: '20180013',
                week: 13,
                title: 'タンタンタコタコで漫遊記',
                date: '2018-04-01',
                fields: {
                  slug: '/program/20180013',
                },
              },
            },
            {
              node: {
                id: '20180028',
                week: 28,
                title: 'シャッフルのリズムで漫遊記',
                date: '2018-07-15',
                fields: {
                  slug: '/program/20180028',
                },
              },
            },
            {
              node: {
                id: '20180042',
                week: 42,
                title: 'ツンタンビートで漫遊記',
                date: '2018-10-21',
                fields: {
                  slug: '/program/20180042',
                },
              },
            },
            {
              node: {
                id: '20190069',
                week: 69,
                title: '3連ロッカバラードで漫遊記',
                date: '2019-04-28',
                fields: {
                  slug: '/program/20190069',
                },
              },
            },
            {
              node: {
                id: '20190082',
                week: 82,
                title: 'お馬さんリズムで漫遊記',
                date: '2019-07-28',
                fields: {
                  slug: '/program/20190082',
                },
              },
            },
            {
              node: {
                id: '20190092',
                week: 92,
                title: '水戸黄門リズムで漫遊記',
                date: '2019-10-06',
                fields: {
                  slug: '/program/20190092',
                },
              },
            },
          ],
        },
        {
          fieldValue: '古い音楽雑誌で漫遊記',
          edges: [
            {
              node: {
                id: '20180019',
                week: 19,
                title: 'MUSIC LIFE 1969年4月号で漫遊記',
                date: '2018-05-13',
                fields: {
                  slug: '/program/20180019',
                },
              },
            },
            {
              node: {
                id: '20180024',
                week: 24,
                title: '宝島1986年6月号で漫遊記',
                date: '2018-06-17',
                fields: {
                  slug: '/program/20180024',
                },
              },
            },
            {
              node: {
                id: '20180038',
                week: 38,
                title: 'MUSIC LIFE 1976年9月号で漫遊記',
                date: '2018-09-23',
                fields: {
                  slug: '/program/20180038',
                },
              },
            },
            {
              node: {
                id: '20180047',
                week: 47,
                title: 'ロッキングオンジャパン1995年9月号で漫遊記',
                date: '2018-11-25',
                fields: {
                  slug: '/program/20180047',
                },
              },
            },
            {
              node: {
                id: '20190061',
                week: 61,
                title: 'MUSIC LIFE 1980年12月号で漫遊記',
                date: '2019-03-03',
                fields: {
                  slug: '/program/20190061',
                },
              },
            },
            {
              node: {
                id: '20190076',
                week: 76,
                title: "ROCKIN'ON JAPAN 2001年12月号で漫遊記",
                date: '2019-06-16',
                fields: {
                  slug: '/program/20190076',
                },
              },
            },
          ],
        },
        {
          fieldValue: '地域特集',
          edges: [
            {
              node: {
                id: '20180034',
                week: 34,
                title: '沖縄ロックバンドで漫遊記',
                date: '2018-08-26',
                fields: {
                  slug: '/program/20180034',
                },
              },
            },
            {
              node: {
                id: '20180037',
                week: 37,
                title: 'アジア圏のロックで漫遊記',
                date: '2018-09-16',
                fields: {
                  slug: '/program/20180037',
                },
              },
            },
            {
              node: {
                id: '20180048',
                week: 48,
                title: 'オーストラリアのロックバンドで漫遊記',
                date: '2018-12-02',
                fields: {
                  slug: '/program/20180048',
                },
              },
            },
            {
              node: {
                id: '20190065',
                week: 65,
                title: '北海道のロックバンドで漫遊記',
                date: '2019-03-31',
                fields: {
                  slug: '/program/20190065',
                },
              },
            },
            {
              node: {
                id: '20190075',
                week: 75,
                title: 'バーミンガムのロックバンドで漫遊記',
                date: '2019-06-09',
                fields: {
                  slug: '/program/20190075',
                },
              },
            },
            {
              node: {
                id: '20190081',
                week: 81,
                title: 'ご当地ロック国内編（東京以外）で漫遊記',
                date: '2019-07-21',
                fields: {
                  slug: '/program/20190081',
                },
              },
            },
            {
              node: {
                id: '20190095',
                week: 95,
                title: '名古屋のロックバンドで漫遊記',
                date: '2019-10-27',
                fields: {
                  slug: '/program/20190095',
                },
              },
            },
            {
              node: {
                id: '20200109',
                week: 109,
                title: '福岡のレジェンドロックバンドで漫遊記',
                date: '2020-02-02',
                fields: {
                  slug: '/program/20200109',
                },
              },
            },
            {
              node: {
                id: '20200127',
                week: 127,
                title: '意外な国の70年代ロックで漫遊記',
                date: '2020-06-07',
                fields: {
                  slug: '/program/20200127',
                },
              },
            },
          ],
        },
        {
          fieldValue: '変則アーティスト特集',
          edges: [
            {
              node: {
                id: '20190088',
                week: 88,
                title: '元ディープ・パープルで漫遊記',
                date: '2019-09-08',
                fields: {
                  slug: '/program/20190088',
                },
              },
            },
            {
              node: {
                id: '20190102',
                week: 102,
                title: 'ビートルズのカバー曲で漫遊記',
                date: '2019-12-15',
                fields: {
                  slug: '/program/20190102',
                },
              },
            },
            {
              node: {
                id: '20200113',
                week: 113,
                title: 'ツェッペリン風味で漫遊記',
                date: '2020-03-01',
                fields: {
                  slug: '/program/20200113',
                },
              },
            },
          ],
        },
        {
          fieldValue: '面白ソング特集',
          edges: [
            {
              node: {
                id: '20180012',
                week: 12,
                title: 'クセになる面白ソングで漫遊記',
                date: '2018-03-25',
                fields: {
                  slug: '/program/20180012',
                },
              },
            },
            {
              node: {
                id: '20190066',
                week: 66,
                title: 'クセになる面白ソングで漫遊記・パート2',
                date: '2019-04-07',
                fields: {
                  slug: '/program/20190066',
                },
              },
            },
          ],
        },
      ],
    },
  };
}
