import './App.css'
import useRouletteStore from './store/store'
import GenreSelector from './components/GenreSelector'
import GameResultCard from './components/GameResultCard'
import { useRandomGame } from './hooks/useRandomGame'

export default function App() {
  const {
    resultGame, selectedGenre, selectedPlatform, setResultGame, setError, reset,
  } = useRouletteStore()

  const { mutate: spin, isPending } = useRandomGame()

  const handleSpin = () => {
    spin(
      { selectedGenre, selectedPlatform },
      {
        onSuccess: setResultGame,
        onError: (error) => setError(error.message ?? '알 수 없는 오류가 발생했어요.'),
      }
    )
  }

  const showResult = !isPending && resultGame

  return (
    <div className="min-h-screen bg-bg">
      <header className="text-center py-12 px-4">
        <h1 className="font-aggro text-gold mb-3">
          랜덤 게임 뽑기
        </h1>
        <p className="font-aggro text-muted">
          어떤 게임이 나올까?
        </p>
      </header>

      {!showResult && (
        <>
          <GenreSelector isLoading={isPending} />

          <div className="text-center py-10 px-4">
            <button
              className="px-14 py-4 bg-gold text-bg font-aggro text-sm rounded-lg cursor-pointer disabled:opacity-50"
              onClick={handleSpin}
              disabled={isPending}
            >
              {isPending ? '로딩중...' : '뽑기'}
            </button>
          </div>

          {isPending && (
            <div className="text-center pb-12">
              <div className="w-12 h-12 rounded-full border-2 border-line border-t-gold animate-spin mx-auto" />
              <p className="mt-4 font-aggro text-xs tracking-widest text-muted">
                게임 검색 중…
              </p>
            </div>
          )}
        </>
      )}

      {showResult && (
        <div className="px-5 pb-16">
          <GameResultCard game={resultGame} />
          <div className="text-center mt-8">
            <button
              className="px-9 py-3 bg-transparent text-gold font-bold border-2 border-gold rounded-lg cursor-pointer"
              onClick={reset}
            >
              다시 뽑기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
