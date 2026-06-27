import { useMutation } from '@tanstack/react-query'
import { fetchRandomGame } from '../api/rawg'

export function useRandomGame() {
  return useMutation({
    mutationFn: fetchRandomGame,
  })
}
