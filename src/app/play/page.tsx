'use client'

import { useState, useEffect } from 'react'

const QUESTIONS = [
  {
    q: "What does HTTP stand for in web communication?",
    opts: ["Hyper Tech Transfer Protocol", "HyperText Transfer Protocol", "High Transfer Text Process", "HyperLink Text Protocol"],
    correct: 1
  },
  {
    q: "Which of these is NOT a programming language?",
    opts: ["Python", "JavaScript", "Photoshop", "Ruby"],
    correct: 2
  },
  {
    q: "What does 'URL' stand for?",
    opts: ["Uniform Resource Locator", "Universal Remote Link", "Unique Read Location", "User Reference Label"],
    correct: 0
  },
  {
    q: "How many bits are in 1 byte?",
    opts: ["4", "16", "32", "8"],
    correct: 3
  },
  {
    q: "What does 'Wi-Fi' actually stand for?",
    opts: ["Wireless Fidelity", "Wide Fiber", "Wireless Frequency", "It's a made-up term"],
    correct: 3
  },
]

type State = 'playing' | 'correct' | 'wrong' | 'timeout'

export default function PlayPage() {
  const [qIdx, setQIdx]       = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [state, setState]     = useState<State>('playing')
  const [timer, setTimer]     = useState(20)
  const [streak, setStreak]   = useState(0)
  const [score, setScore]     = useState(0)

  const question = QUESTIONS[qIdx]

  // Timer
  useEffect(() => {
    if (state !== 'playing') return
    if (timer <= 0) { handleTimeout(); return }
    const id = setTimeout(() => setTimer(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timer, state])

  function handleSelect(idx: number) {
    if (state !== 'playing') return
    setSelected(idx)
    if (idx === question.correct) {
      const pts = 200 + streak * 50
      setScore(s => s + pts)
      setStreak(s => s + 1)
      setState('correct')
    } else {
      setStreak(0)
      setState('wrong')
    }
    setTimeout(() => nextQuestion(), 2000)
  }

  function handleTimeout() {
    setStreak(0)
    setState('timeout')
    setTimeout(() => nextQuestion(), 2000)
  }

  function nextQuestion() {
    setQIdx(i => (i + 1) % QUESTIONS.length)
    setSelected(null)
    setState('playing')
    setTimer(20)
  }

  function optionStyle(idx: number) {
    if (state === 'playing') return {
      background: 'var(--s2)',
      border: '1.5px solid #ffffff1A',
      color: 'var(--text)',
      cursor: 'pointer',
    }
    if (idx === question.correct) return {
      background: '#AAFF0015',
      border: '1.5px solid #AAFF0060',
      color: 'var(--lime)',
      cursor: 'default',
    }
    if (idx === selected) return {
      background: '#FF406015',
      border: '1.5px solid #FF406060',
      color: 'var(--coral)',
      cursor: 'default',
    }
    return {
      background: 'var(--s2)',
      border: '1.5px solid #ffffff1A',
      color: 'var(--muted)',
      cursor: 'default',
      opacity: '0.5',
    }
  }

  const timerColor = timer <= 5 ? 'var(--coral)' : 'var(--amber)'

  return (
    <main className="min-h-screen p-4 flex flex-col gap-4"
      style={{ background: 'var(--bg)' }}>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono-camp text-xs uppercase tracking-widest"
            style={{ color: 'var(--cyan)' }}>// round 2 · trivia battle</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono-camp"
              style={{ background: '#FFB80020', border: '1px solid #FFB80040', color: 'var(--amber)' }}>
              🔥 ×{streak} streak
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono-camp"
              style={{ background: '#AAFF0015', border: '1px solid #AAFF0030', color: 'var(--lime)' }}>
              {score} pts
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono-camp text-4xl font-bold leading-none"
            style={{ color: timerColor }}>{timer}</div>
          <div className="font-mono-camp text-xs mt-1 uppercase tracking-wider"
            style={{ color: 'var(--muted)' }}>sec</div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {QUESTIONS.map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{ background: i < qIdx ? 'var(--lime)' : i === qIdx ? 'var(--amber)' : 'var(--s3)' }} />
        ))}
      </div>

      {/* Question */}
      <div className="rounded-2xl p-5 text-center"
        style={{ background: 'var(--s2)', border: '1px solid #ffffff1A' }}>
        <p className="font-mono-camp text-xs uppercase tracking-widest mb-3"
          style={{ color: 'var(--muted)' }}>question {qIdx + 1} of {QUESTIONS.length}</p>
        <p className="text-lg font-bold leading-snug">"{question.q}"</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {question.opts.map((opt, i) => (
          <button key={i}
            onClick={() => handleSelect(i)}
            className="rounded-2xl p-4 text-sm font-medium text-center leading-snug transition-all duration-200"
            style={optionStyle(i)}>
            {opt}
          </button>
        ))}
      </div>

      {/* Result message */}
      {state !== 'playing' && (
        <div className="rounded-xl p-3 text-center font-mono-camp text-sm font-bold"
          style={{
            background: state === 'correct' ? '#AAFF0015' : '#FF406015',
            border: `1px solid ${state === 'correct' ? '#AAFF0040' : '#FF406040'}`,
            color: state === 'correct' ? 'var(--lime)' : 'var(--coral)',
          }}>
          {state === 'correct' && `✓ Correct! +${200 + (streak - 1) * 50} pts`}
          {state === 'wrong'   && '✗ Not quite — keep going!'}
          {state === 'timeout' && "⏱ Time's up!"}
        </div>
      )}
    </main>
  )
}