'use client'

import { useState, useEffect } from 'react'

const TEAMS = [
  { id: 'a', name: '⚡ Firewall', color: '#FF4060', pts: 840 },
  { id: 'b', name: '◈ Bytes',    color: '#00E5FF', pts: 920 },
  { id: 'c', name: '▲ Proxies',  color: '#AAFF00', pts: 610 },
  { id: 'd', name: '◉ Root Access', color: '#B366FF', pts: 750 },
]

const MAX_PTS = 1200

export default function HostPage() {
  const [teams, setTeams] = useState(TEAMS)
  const [timer, setTimer] = useState(20)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    if (timer <= 0) { setRunning(false); return }
    const id = setTimeout(() => setTimer(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timer, running])

  function resetTimer() {
    setTimer(20)
    setRunning(true)
  }

  function addBonus() {
    const idx = Math.floor(Math.random() * teams.length)
    setTeams(prev => prev.map((t, i) => i === idx ? { ...t, pts: t.pts + 100 } : t))
  }

  function nextQuestion() {
    setTeams(prev => prev.map(t => ({
      ...t,
      pts: t.pts + Math.floor(Math.random() * 180 + 40)
    })))
    resetTimer()
  }

  const timerColor = timer <= 5 ? 'var(--coral)' : 'var(--amber)'

  return (
    <main className="min-h-screen p-4 flex flex-col gap-4"
      style={{ background: 'var(--bg)' }}>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono-camp text-xs uppercase tracking-widest mb-1"
            style={{ color: 'var(--lime)' }}>// active session</p>
          <h1 className="text-2xl font-bold">Save The School WiFi 🛜</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted2)' }}>
            Round 2 of 4 — Trivia Battle
          </p>
        </div>

        {/* Timer */}
        <div className="rounded-xl p-3 text-center min-w-[70px]"
          style={{ background: 'var(--s2)', border: '1px solid #ffffff1A' }}>
          <div className="font-mono-camp text-3xl font-bold leading-none"
            style={{ color: timerColor }}>{timer}</div>
          <div className="font-mono-camp text-xs mt-1 uppercase tracking-wider"
            style={{ color: 'var(--muted)' }}>sec</div>
        </div>
      </div>

      {/* Teams grid */}
      <div className="grid grid-cols-2 gap-3">
        {teams.map(team => (
          <div key={team.id} className="rounded-xl p-3"
            style={{ background: 'var(--s2)', border: '1px solid #ffffff1A' }}>
            <p className="font-mono-camp text-xs font-bold uppercase tracking-wide mb-1"
              style={{ color: team.color }}>{team.name}</p>
            <p className="font-mono-camp text-3xl font-bold leading-none"
              style={{ color: team.color }}>{team.pts}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>points</p>
            <div className="h-1 rounded-full mt-3" style={{ background: 'var(--s3)' }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ background: team.color, width: `${Math.min(team.pts / MAX_PTS * 100, 100)}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Current question */}
      <div className="rounded-xl p-4" style={{ background: 'var(--s2)', border: '1px solid #ffffff1A' }}>
        <p className="font-mono-camp text-xs uppercase tracking-widest mb-2"
          style={{ color: 'var(--cyan)' }}>// current question</p>
        <p className="text-sm font-medium leading-relaxed">
          "What does HTTP stand for in web communication?"
        </p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {['Hyper Tech Transfer Protocol', 'HyperText Transfer Protocol',
            'High Transfer Text Process', 'HyperLink Text Protocol'].map((ans, i) => (
            <div key={i} className="rounded-lg px-3 py-2 text-xs leading-snug"
              style={{
                background: 'var(--s3)',
                border: `1px solid ${i === 1 ? '#AAFF0060' : '#ffffff0F'}`,
                color: i === 1 ? 'var(--lime)' : 'var(--muted2)',
              }}>
              {i === 1 && '✓ '}{ans}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button onClick={addBonus}
          className="flex-1 py-3 rounded-xl text-sm font-medium transition-colors"
          style={{ background: 'var(--s2)', border: '1px solid #ffffff1A', color: 'var(--text)' }}>
          + Bonus
        </button>
        <button onClick={resetTimer}
          className="flex-1 py-3 rounded-xl text-sm font-medium transition-colors"
          style={{ background: 'var(--s2)', border: '1px solid #ffffff1A', color: 'var(--text)' }}>
          ↺ Reset
        </button>
        <button onClick={nextQuestion}
          className="flex-1 py-3 rounded-xl text-sm font-bold transition-colors font-mono-camp"
          style={{ background: 'var(--lime)', color: '#000' }}>
          Next →
        </button>
      </div>
    </main>
  )
}