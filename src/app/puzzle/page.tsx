'use client'

import { useState, useEffect } from 'react'

const HINTS = [
  { id: 0, text: "Binary 0011 0111 = decimal 55, and 55 in ASCII is the character '7'" },
  { id: 1, text: "ASCII digits 48–57 = characters '0'–'9'. Subtract 48 from decimal to get the digit." },
  { id: 2, text: "The third group 0011 0101 = decimal 53. What character is that?" },
]

const CORRECT_CODE = '7251'
const TOTAL_SECS = 300

export default function PuzzlePage() {
  const [digits, setDigits]       = useState(['', '', '', ''])
  const [hints, setHints]         = useState<number[]>([])
  const [timeLeft, setTimeLeft]   = useState(TOTAL_SECS)
  const [result, setResult]       = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [solved, setSolved]       = useState(false)

  // Timer
  useEffect(() => {
    if (solved) return
    if (timeLeft <= 0) return
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, solved])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const timerStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
  const timerPct = (timeLeft / TOTAL_SECS) * 100
  const timerColor = timeLeft <= 60 ? 'var(--coral)' : 'var(--amber)'

  function handleDigit(val: string, idx: number) {
    if (!/^[0-9]$/.test(val) && val !== '') return
    const next = [...digits]
    next[idx] = val
    setDigits(next)
    setResult('idle')
    // auto focus next
    if (val && idx < 3) {
      document.getElementById(`digit-${idx + 1}`)?.focus()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      document.getElementById(`digit-${idx - 1}`)?.focus()
    }
  }

  function checkCode() {
    const entered = digits.join('')
    if (entered.length < 4) return
    if (entered === CORRECT_CODE) {
      setResult('correct')
      setSolved(true)
    } else {
      setResult('wrong')
      setTimeout(() => setResult('idle'), 1500)
    }
  }

  function revealHint(id: number) {
    if (!hints.includes(id)) setHints(h => [...h, id])
  }

  const penalty = hints.length * 50

  return (
    <main className="min-h-screen p-4 flex flex-col gap-4"
      style={{ background: 'var(--bg)' }}>

      {/* Header */}
      <div className="rounded-xl p-4"
        style={{ background: 'var(--s2)', border: '1px solid #FF406030' }}>
        <p className="font-mono-camp text-xs uppercase tracking-widest mb-1"
          style={{ color: 'var(--coral)' }}>// mode: puzzle escape</p>
        <h1 className="text-xl font-bold">Operation: Firewall Down</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted2)' }}>
          Decode the signal · Restore the network
        </p>
      </div>

      {/* Timer bar */}
      <div className="rounded-xl p-3 flex items-center gap-3"
        style={{ background: 'var(--s2)', border: '1px solid #ffffff1A' }}>
        <span style={{ color: 'var(--coral)', fontSize: 18 }}>⏱</span>
        <span className="font-mono-camp text-xl font-bold" style={{ color: timerColor }}>
          {timeLeft <= 0 ? '00:00' : timerStr}
        </span>
        <div className="flex-1 h-1 rounded-full" style={{ background: 'var(--s3)' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ background: timerColor, width: `${timerPct}%` }} />
        </div>
        {penalty > 0 && (
          <span className="font-mono-camp text-xs" style={{ color: 'var(--coral)' }}>
            -{penalty} pts
          </span>
        )}
      </div>

      {/* Clue */}
      <div className="rounded-xl p-4"
        style={{ background: 'var(--s2)', border: '1px solid #ffffff1A' }}>
        <p className="font-mono-camp text-xs uppercase tracking-widest mb-2"
          style={{ color: 'var(--violet)' }}>// encrypted message</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted2)' }}>
          The hacker left a message in binary. Each group of 8 bits = one ASCII digit of the code. Decode all 4 digits.
        </p>
        <div className="mt-3 rounded-lg p-4 text-center font-mono-camp text-lg tracking-widest"
          style={{ background: 'var(--s3)', border: '1px dashed #ffffff1A', color: 'var(--violet)' }}>
          0011 0111 &nbsp; 0011 0010 &nbsp; 0011 0101 &nbsp; 0011 0001
        </div>
      </div>

      {/* Hints */}
      <div className="grid grid-cols-1 gap-2">
        {HINTS.map(hint => (
          <div key={hint.id}
            onClick={() => revealHint(hint.id)}
            className="rounded-xl p-3 cursor-pointer transition-all"
            style={{
              background: 'var(--s2)',
              border: `1px solid ${hints.includes(hint.id) ? '#B366FF40' : '#ffffff1A'}`,
            }}>
            <p className="font-mono-camp text-xs mb-1" style={{ color: 'var(--violet)' }}>
              // hint {String(hint.id + 1).padStart(2, '0')}
            </p>
            {hints.includes(hint.id)
              ? <p className="text-sm" style={{ color: 'var(--muted2)' }}>{hint.text}</p>
              : <p className="text-sm" style={{ color: 'var(--muted)' }}>Tap to reveal (−50 pts)</p>
            }
          </div>
        ))}
      </div>

      {/* Code entry */}
      <div>
        <p className="font-mono-camp text-xs uppercase tracking-widest mb-3"
          style={{ color: 'var(--muted2)' }}>Enter the 4-digit code</p>
        <div className="flex gap-3 items-center">
          {digits.map((d, i) => (
            <input
              key={i}
              id={`digit-${i}`}
              className="w-12 h-14 rounded-xl text-center font-mono-camp text-2xl font-bold outline-none transition-all"
              style={{
                background: 'var(--s2)',
                border: `2px solid ${result === 'wrong' ? 'var(--coral)' : result === 'correct' ? 'var(--lime)' : '#ffffff1A'}`,
                color: 'var(--text)',
              }}
              maxLength={1}
              value={d}
              onChange={e => handleDigit(e.target.value, i)}
              onKeyDown={e => handleKeyDown(e, i)}
              disabled={solved}
            />
          ))}
          <button
            onClick={checkCode}
            disabled={solved || digits.join('').length < 4}
            className="flex-1 py-4 rounded-xl font-mono-camp font-bold text-sm transition-all"
            style={{
              background: solved ? '#AAFF0030' : 'var(--violet)',
              color: solved ? 'var(--lime)' : '#fff',
              opacity: digits.join('').length < 4 ? 0.5 : 1,
            }}>
            {solved ? '✓ Solved' : 'Unlock'}
          </button>
        </div>
      </div>

      {/* Result */}
      {result !== 'idle' && (
        <div className="rounded-xl p-3 text-center font-mono-camp text-sm font-bold"
          style={{
            background: result === 'correct' ? '#AAFF0015' : '#FF406015',
            border: `1px solid ${result === 'correct' ? '#AAFF0040' : '#FF406040'}`,
            color: result === 'correct' ? 'var(--lime)' : 'var(--coral)',
          }}>
          {result === 'correct'
            ? `✓ CODE ACCEPTED — Firewall restored! +${500 - penalty} pts`
            : '✗ Wrong code — try again'}
        </div>
      )}

      {timeLeft <= 0 && !solved && (
        <div className="rounded-xl p-3 text-center font-mono-camp text-sm font-bold"
          style={{ background: '#FF406015', border: '1px solid #FF406040', color: 'var(--coral)' }}>
          ⏱ Time's up — mission failed
        </div>
      )}
    </main>
  )
}