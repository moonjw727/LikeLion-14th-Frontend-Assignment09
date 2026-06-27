export default function GameResultCard({ game }) {
  const mc = game.metacritic

  const mcClass = mc >= 50 ? 'text-gold border-gold'
    : mc ? 'text-[#ff6b6b] border-[#ff6b6b]'
    : ''

  const platforms = (game.platforms ?? []).slice(0, 5).map((p) => p.platform.name)
  const genres = (game.genres ?? []).map((g) => g.name)
  const description = game.description_raw?.trim()

  return (
    <div className="rounded-xl overflow-hidden border border-line max-w-2xl mx-auto">
      <div className="relative h-75 overflow-hidden">
        {game.background_image ? (
          <img src={game.background_image} alt={game.name} className="w-full h-full object-cover block" />
        ) : (
          <div className="w-full h-full bg-surface-alt flex items-center justify-center text-6xl">
            🎮
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-bg/95 to-transparent" />

        {mc && (
          <div className={`absolute top-4 right-4 font-aggro text-xl font-bold px-3 py-1 rounded-md border bg-bg/90 ${mcClass}`}>
            {mc}
          </div>
        )}
      </div>

      <div className="bg-surface p-6">
        <h2 className="font-aggro text-[1.65rem] font-bold text-foreground leading-tight mb-4">
          {game.name}
        </h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {genres.map((g) => (
            <span key={g} className="font-aggro text-[0.68rem] px-2.5 py-0.5 rounded border text-gold bg-gold/10 border-gold/25">
              {g}
            </span>
          ))}
          {platforms.map((p) => (
            <span key={p} className="font-aggro text-[0.68rem] px-2.5 py-0.5 rounded border text-gold bg-gold/10 border-gold/25">
              {p}
            </span>
          ))}
        </div>

        {description && (
          <p className="text-muted text-[0.9rem] leading-[1.75] line-clamp-5 mb-4">
            {description}
          </p>
        )}

        <div className="flex flex-wrap gap-6 font-aggro text-[0.78rem] text-muted">
          {game.rating > 0 && (
            <span>★ {game.rating.toFixed(1)} <span className="opacity-50">/ 5</span></span>
          )}
          {game.released && <span>🗓 {game.released}</span>}
          {game.playtime > 0 && <span>⏱ avg {game.playtime}h</span>}
        </div>
      </div>
    </div>
  )
}
