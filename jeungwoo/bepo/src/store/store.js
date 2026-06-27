import { create } from 'zustand'

const useRouletteStore = create((set) => ({
  selectedGenre: null,
  selectedPlatform: null,
  resultGame: null,
  error: null,

  selectGenre: (genre) => set({ selectedGenre: genre }),
  selectPlatform: (platform) => set({ selectedPlatform: platform }),
  setResultGame: (game) => set({ resultGame: game, error: null }),
  setError: (error) => set({ error }),
  reset: () => set({ resultGame: null, error: null }),
}))

export default useRouletteStore
