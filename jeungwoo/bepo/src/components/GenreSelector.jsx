import useRouletteStore from '../store/store'
import { useGenres } from '../hooks/useGenres'

const PLATFORMS = [
  { id: null,  name: '전체' },
  { id: 4,     name: 'PC' },
  { id: 187,   name: 'PS5' },
  { id: 18,    name: 'PS4' },
  { id: 1,     name: 'Xbox One' },
  { id: 186,   name: 'Xbox Series X' },
  { id: 7,     name: 'Switch' },
  { id: 3,     name: 'iOS' },
  { id: 21,    name: 'Android' },
]

const chip = (active) =>
  `px-3.5 py-1.5 rounded-md border text-sm cursor-pointer transition-colors disabled:opacity-50 ${
    active
      ? 'border-gold bg-gold/15 text-gold'
      : 'border-line bg-surface text-muted hover:border-gold hover:text-foreground'
  }`

export default function GenreSelector({ isLoading }) {
  const { selectedGenre, selectedPlatform, selectGenre, selectPlatform } = useRouletteStore()
  const { data: genres = [], isLoading: genresLoading } = useGenres()

  return (
    <div className="max-w-3xl mx-auto px-5 py-2">
      <section className="mb-7">
        <span className="block font-aggro text-[0.65rem] tracking-[0.18em] text-gold uppercase mb-2.5">
          장르
        </span>
        <div className="flex flex-wrap gap-2">
          <button className={chip(selectedGenre === null)} onClick={() => selectGenre(null)} disabled={isLoading}>
            전체
          </button>
          {genres.map((g) => (
            <button key={g.id} className={chip(selectedGenre === g.slug)} onClick={() => selectGenre(g.slug)} disabled={isLoading}>
              {g.name}
            </button>
          ))}
          {genresLoading && (
            <span className="text-muted text-sm font-aggro">장르 불러오는 중…</span>
          )}
        </div>
      </section>

      <section>
        <span className="block font-aggro text-[0.65rem] tracking-[0.18em] text-gold uppercase mb-2.5">
          플랫폼
        </span>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <button key={p.id ?? 'all'} className={chip(selectedPlatform === p.id)} onClick={() => selectPlatform(p.id)} disabled={isLoading}>
              {p.name}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
