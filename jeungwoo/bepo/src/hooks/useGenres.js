import { useQuery } from '@tanstack/react-query'
import { fetchGenres } from '../api/rawg'

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
  })
}
