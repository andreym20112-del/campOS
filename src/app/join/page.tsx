'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Step = 'code' | 'name' | 'team'

const TEAMS = [
  { name: 'Team Bytes',    color: '#00E5FF', bg: '#00E5FF20', letter: 'B' },
  { name: 'Team Firewall', color: '#FF4060', bg: '#FF406020', letter: 'F' },
  { name: 'Team Proxies',  color: '#AAFF00', bg: '#AAFF0020', letter: 'P' },
  { name: 'Root Access',   color: '#B366FF', bg: '#B366FF20', letter: 'R' },
]

export default function JoinPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('code')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [team, setTeam] = useState(TEAMS[0])
  const [error, setError] = useState('')

  function handleCode() {
    if (code.length < 4) {
      setError('Code must be at least 4 characters')
      return
    }
    setError('')
    setStep('name')
  }

  function handleName() {
    if (name.trim().length < 2) {
      setError('Enter your name to continue')
      return
    }
    setError('')
    const random = TEAMS[Math.floor(Math.random() * TEAMS.length)]
    setTeam(random)
    setStep('team')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6"
      style={{ background: 'var(--bg)' }}>

      {/* Logo */}
      <div className="font-mono-camp text-2xl font-bold tracking-tight">
        Camp<span style={{ color: 'var(--lime)' }}>OS</span>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm rounded-2xl p-6 flex flex-col gap-4"
        style={{ background: 'var(--s1)', border: '1px solid #ffffff1A' }}>

        {/* STEP: code */}
        {step === 'code' && (
          <>
            <div>
              <p className="font-mono-camp text-xs uppercase tracking-widest mb-2"
                style={{ color: 'var(--muted2)' }}>Room code</p>
              <input
                className="w-full rounded-lg p-3 text-center text-2xl font-bold tracking-[8px] uppercase outline-none transition-all"
                style={{
                  background: 'var(--s2)',
                  border: `1px solid ${error ? 'var(--coral)' : '#ffffff1A'}`,
                  color: 'var(--lime)',
                  fontFamily: 'Space Mono, monospace',
                }}
                maxLength={6}
                placeholder="XCAMP"
                value={code}
                onChange={e => { setCode(e.target.value.toUpperCase()); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleCode()}
                autoFocus
              />
              {error && <p className="text-xs mt-1" style={{ color: 'var(--coral)' }}>{error}</p>}
            </div>
            <button
              onClick={handleCode}
              className="w-full py-3 rounded-lg font-bold font-mono-camp transition-colors"
              style={{ background: 'var(--lime)', color: '#000' }}
            >
              Join →
            </button>
          </>
        )}

        {/* STEP: name */}
        {step === 'name' && (
          <>
            <div>
              <p className="font-mono-camp text-xs uppercase tracking-widest mb-2"
                style={{ color: 'var(--muted2)' }}>Your name</p>
              <input
                className="w-full rounded-lg p-3 text-base outline-none transition-all"
                style={{
                  background: 'var(--s2)',
                  border: `1px solid ${error ? 'var(--coral)' : '#ffffff1A'}`,
                  color: 'var(--text)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
                placeholder="Enter your name..."
                value={name}
                onChange={e => { setName(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleName()}
                autoFocus
              />
              {error && <p className="text-xs mt-1" style={{ color: 'var(--coral)' }}>{error}</p>}
            </div>
            <button
              onClick={handleName}
              className="w-full py-3 rounded-lg font-bold font-mono-camp transition-colors"
              style={{ background: 'var(--lime)', color: '#000' }}
            >
              Enter →
            </button>
          </>
        )}

        {/* STEP: team reveal */}
        {step === 'team' && (
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold font-mono-camp"
              style={{ background: team.bg, color: team.color }}>
              {team.letter}
            </div>
            <div>
              <p className="text-xl font-bold text-center font-mono-camp"
                style={{ color: team.color }}>{team.name}</p>
              <p className="text-sm text-center mt-1" style={{ color: 'var(--muted2)' }}>
                Welcome, {name}!
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 mt-2">
              <p className="font-mono-camp text-xs" style={{ color: 'var(--muted)' }}>
                // waiting for host...
              </p>
              <div className="flex gap-2">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: 'var(--muted)', animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="font-mono-camp text-xs" style={{ color: 'var(--muted)' }}>
        // or scan QR at the board
      </p>
    </main>
  )
}