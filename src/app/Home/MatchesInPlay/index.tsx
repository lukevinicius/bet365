import { SoccerInplayHome } from './SoccerInPlay'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

export function MatchesInPlay() {
  const [matches, setMatches] = useState([])

  async function connectSocket() {
    const socket = await io('http://localhost:3333')

    socket.on('soccer/in-play', (data) => {
      setMatches(data)
    })

    socket.on('connect', () => {
      console.log('Socket connected')
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })
  }

  useEffect(() => {
    connectSocket()
  }, [])

  return (
    <div className="w-full px-1 pb-1">
      <div className="bg-blue-900 flex items-center py-1 px-5 justify-between rounded-t-md">
        <p className="font-bold">Ao Vivo</p>
        {/* <p className="text-[0.8rem]">267 Eventos {'>'}</p> */}
      </div>
      <div>
        <SoccerInplayHome matches={matches} />
      </div>
    </div>
  )
}
