import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: { key: import.meta.env.VITE_RAWG_API_KEY },
})

export async function fetchGenres() {
  const res = await api.get('/genres')
  return res.data.results ?? []
}

export async function fetchRandomGame({ selectedGenre, selectedPlatform }) {
  const params = {}
  if (selectedGenre) params.genres = selectedGenre
  if (selectedPlatform) params.platforms = selectedPlatform

  const countRes = await api.get('/games', { params: { ...params, page_size: 1, page: 1 } })
  const total = Math.min(countRes.data.count ?? 0, 500)

  if (total === 0) {
    throw new Error('조건에 맞는 게임을 찾지 못했어요. 다른 조건을 선택해보세요!')
  }

  const winnerPage = Math.floor(Math.random() * total) + 1
  const winnerRes = await api.get('/games', { params: { ...params, page_size: 1, page: winnerPage } })
  const winner = winnerRes.data.results?.[0]

  if (!winner) {
    throw new Error('게임 데이터를 가져오지 못했어요. 잠시 후 다시 시도해주세요.')
  }

  const detailRes = await api.get(`/games/${winner.id}`)
  return { ...winner, ...detailRes.data }
}
