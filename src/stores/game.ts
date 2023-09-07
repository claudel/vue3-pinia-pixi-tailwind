import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'
import type Player from '@/interfaces/player'

export const useGameStore = defineStore('game', () => {
  const defaultPlayer: Player = {
    gid: '',
    name: ''
  }
  const player: any = ref(defaultPlayer)

  async function loadPlayer(playerId: string) {
    try {
      const response = await axios.get('https://localhost:8888/' + playerId)
      if (response && response.status === 200) {
        const loadedPlayer = response.data

        setPlayer(loadedPlayer)

        return player
      }
    } catch (e) {
      // do nothing
    }

    return null
  }

  function setPlayer(loadedPlayer: any) {
    player.value.gid = loadedPlayer.gid
    player.value.name = loadedPlayer.name
  }

  return {
    player,
    loadPlayer
  }
})
