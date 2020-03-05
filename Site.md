
# Site Design

## sitemap

- index `/page/index.tsx`
- /week/ `/page/week.tsx` (List)
- /week/${week.id}/ `/template/week.tsx` (Swipeable)
- /artist/ `/page/artist/index.tsx` (List)
- /artist/all/ `page/artist/all.tsx` (Swipeable)
- /artist/${artist}/ `/template/artist.tsx` (Swipeable)
- /categories/ `/page/categories.tsx` (Swipeable)
- /selectors/ `/page/selectors.tsx` (Swipeable)

## layouts

- layout
- SEO
- drawer
- Swipeable View
- Page Container

## components

- WeekSummary `/coponents/WeekSummary.tsx`
- Viewer `/components/Viewer.tsx`
- TunesByWeek `/components/TunesByWeek.tsx`
- TuneCard `/components/TuneCard.tsx`
- PageNavigation `/components/PageNavigation`

## naming

- week: 放送回 `Yaml` *Deprecated*
- program: 放送回 `Program`
- category: カテゴリー
- guest: ゲスト
- playlist: プレイリスト `ProgramPlaylist[]`
- tune: 曲 `ProgramPlaylist`
- artist: アーティスト
- selector: 選曲

## queries

### allWeeks

```graphql
  allWeeks {
    edges {
      node {
        id
        title
        date(formatString: "YYYY-MM-DD")
        categories
        guests
        subtitle
        week
        year
        playlist {
          artist
          corner
          id
          indexInWeek
          index
          kana
          label
          name
          nation
          producer
          selector
          title
          week
          year
          youtube
        }
        fields {
          slug
        }
      }
    }
  }
```
