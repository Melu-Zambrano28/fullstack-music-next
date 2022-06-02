import { Playlist } from '@prisma/client'
import useSWR from 'swr'
import { Me } from '../pages/api/me'
import fetcher from './fetcher'

export const useMe = () => {
  const { data, error } = useSWR<Me>('/me', fetcher)

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  }
}

export const usePlaylist = () => {
  const { data, error } = useSWR<Playlist[]>('/playlist', fetcher)
  return {
    playlists: data || [],
    isLoading: !data && !error,
    isError: error,
  }
}
