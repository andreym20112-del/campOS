'use client'

import { useState } from 'react'

const SCENES = [
  {
    char: { emoji: '🧑‍💼', name: 'Principal Rivera', role: 'NPC · Neutral' },
    speech: "I found out who hacked the WiFi. But I'll only tell you if your team can prove they understand why the system failed. What is the first rule of network security?",
    choices: [
      { text: "Never share your password with anyone — not even the IT guy.", pts: 300, correct: true },
      { text: "Use a really long password with numbers and symbols.", pts: 150, correct: false },
      { text: "Update your software regularly to patch vulnerabilities.", pts: 150, correct: false },
    ],
    outcomes: [
      "Correct! Rivera nods. \"Password sharing is the #1 entry point for hackers.\" He slides you a USB with the hacker's identity. Mission advanced. 🗂️",
      "\"That's important, but not the first rule,\" Rivera says. \"Think about human behavior.\" You gain partial info — the hacker used a shared password.",
      "\"Good practice,\" Rivera says, \"but that wouldn't have prevented this attack.\" You gain partial info.",
    ]
  },
  {
    char: { emoji: '👩‍💻', name: 'Ms. Chen', role: 'NPC · Ally' },
    speech: "I managed to recover part of the hacker's code. It's encrypted. Which type of attack does this pattern look like to you?",
    choices: [
      { text: "It's a phishing attack — fake login page to steal credentials.", pts: 300, correct: true },
      { text: "Looks like a DDoS — flooding the server with requests.", pts: 100, correct: false },
      { text: "It's ransomware — encrypting files for money.", pts: 100, correct: false },
    ],
    outcomes: [
      "\"Exactly right!\" Ms. Chen pulls up the fake login page. \"Someone made a copy of the school portal.\" You now have a lead. 🎯",
      "\"Not quite — DDoS wouldn't explain the stolen credentials.\" Ms. Chen keeps digging. Partial progress.",
      "\"No — no files were encrypted here.\" Ms. Chen points to the login logs. Partial progress.",
    ]
  },
  {
    char: { emoji: '🕵️', name: 'Detective Mode', role: 'SYSTEM · Final Call' },
    speech: "You have all the clues. The hacker used a phishing page and a shared password. Who is the most likely suspect based on the evidence?",
    choices: [
      { text: "A student who had access to the IT room last Tuesday.", pts: 400, correct: true },
      { text: "An outside hacker who found the school's IP address online.", pts: 150, correct: false },
      { text: "A teacher who accidentally clicked a malicious link.", pts: 200, correct: false },
    ],
    outcomes: [
      "🎉 MISSION COMPLETE! You identified the suspect. The WiFi is restored and your team gets full XP. Outstanding work!",
      "\"Possible, but the phishing page was hosted on the school network — it was an insider.\" So close.",
      "\"A teacher might have been the victim, not the attacker.\" Review the evidence again.",
    ]
  },
]

export default function StoryPage() {
  const [sceneIdx, setSceneIdx]     = useState(0)
  const [chosen, setChosen]         = useState<number | null>(null)
  const [totalScore, setTotalScore] = useState(0)
  const [finished, setFinished]     = useState(false)

  const scene = SCENES[sceneIdx]

  function handleChoice(idx: number) {
    if (chosen !== null) return
    setChosen(idx)
    setTotalScore(s => s + scene.choices[idx].pts)
  }

  function handleNext() {
    if (sceneIdx < SCENES.length - 1) {
      setSceneIdx(i => i + 1)
      setChosen(null)
    } else {
      setFinished(true)
    }
  }

  if (finished) {
    const max = SCENES.reduce((a, s) => a + Math.max(...s.choices.map(c => c.pts)), 0)
    const pct = Math.round(totalScore / max * 100)
    return (
      <main className="min-h-screen p-4 flex flex-col items-center justify-center gap-6"
        style={{ background: 'var(--bg)' }}>
        <div className="text-5xl">🏆</div>
        <div className="text-center">
          <p className="font-mono-camp text-xs uppercase tracking-widest mb-2"
            style={{ color: 'var(--lime)' }}>// mission complete</p>
          <h1 className="text-3xl font-bold">Save The School WiFi</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--muted2)' }}>Case closed</p>
        </div>
        <div className="rounded-2xl p-6 w-full max-w-sm text-center"
          style={{ background: 'var(--s2)', border: '1px solid #ffffff1A' }}>
          <p className="font-mono-camp text-xs uppercase tracking-widest mb-1"
            style={{ color: 'var(--muted)' }}>final score</p>
          <p className="font-mono-camp text-5xl font-bold" style={{ color: 'var(--lime)' }}>
            {totalScore}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--muted2)' }}>
            {pct}% of max score
          </p>
          <div className="h-2 rounded-full mt-4" style={{ background: 'var(--s3)' }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ background: 'var(--lime)', width: `${pct}%` }} />
          </div>
        </div>
        <button
          onClick={() => { setSceneIdx(0); setChosen(null); setTotalScore(0); setFinished(false) }}
          className="px-8 py-3 rounded-xl font-mono-camp font-bold transition-colors"
          style={{ background: 'var(--lime)', color: '#000' }}>
          Play again →
        </button>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-4 flex flex-col gap-4"
      style={{ background: 'var(--bg)' }}>

      {/* Header */}
      <div className="rounded-xl p-4"
        style={{ background: 'var(--s2)', border: '1px solid #00E5FF25' }}>
        <p className="font-mono-camp text-xs uppercase tracking-widest mb-1"
          style={{ color: 'var(--cyan)' }}>// mode: story mission</p>
        <h1 className="text-xl font-bold">Save The School WiFi</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted2)' }}>
          Scene {sceneIdx + 1} of {SCENES.length}
        </p>
      </div>

      {/* Progress */}
      <div className="flex gap-2">
        {SCENES.map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{ background: i < sceneIdx ? 'var(--cyan)' : i === sceneIdx ? 'var(--lime)' : 'var(--s3)' }} />
        ))}
      </div>

      {/* Score */}
      <div className="flex justify-end">
        <span className="px-3 py-1 rounded-full font-mono-camp text-xs"
          style={{ background: '#AAFF0015', border: '1px solid #AAFF0030', color: 'var(--lime)' }}>
          {totalScore} pts
        </span>
      </div>

      {/* Scene */}
      <div className="rounded-2xl p-4"
        style={{ background: 'var(--s2)', border: '1px solid #ffffff1A' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: '#00E5FF15' }}>
            {scene.char.emoji}
          </div>
          <div>
            <p className="font-mono-camp text-xs font-bold" style={{ color: 'var(--cyan)' }}>
              {scene.char.name}
            </p>
            <p className="font-mono-camp text-xs" style={{ color: 'var(--muted)' }}>
              {scene.char.role}
            </p>
          </div>
        </div>
        <div className="rounded-xl p-3 text-sm leading-relaxed"
          style={{ background: 'var(--s3)', border: '1px solid #ffffff0F', color: 'var(--text)' }}>
          "{scene.speech}"
        </div>
        {/* Scene progress dots */}
        <div className="flex gap-2 mt-3">
          {SCENES.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full"
              style={{ background: i <= sceneIdx ? 'var(--cyan)' : 'var(--s3)' }} />
          ))}
        </div>
      </div>

      {/* Choices */}
      <p className="font-mono-camp text-xs uppercase tracking-widest"
        style={{ color: 'var(--muted)' }}>// choose your response</p>

      <div className="flex flex-col gap-3">
        {scene.choices.map((choice, i) => (
          <button key={i}
            onClick={() => handleChoice(i)}
            disabled={chosen !== null}
            className="rounded-xl p-4 text-left transition-all duration-200"
            style={{
              background: chosen === null ? 'var(--s2)'
                : i === chosen && choice.correct ? '#AAFF0015'
                : i === chosen ? '#FF406015'
                : 'var(--s2)',
              border: chosen === null ? '1px solid #ffffff1A'
                : i === chosen && choice.correct ? '1px solid #AAFF0060'
                : i === chosen ? '1px solid #FF406060'
                : '1px solid #ffffff0A',
              color: chosen === null ? 'var(--text)'
                : i === chosen && choice.correct ? 'var(--lime)'
                : i === chosen ? 'var(--coral)'
                : 'var(--muted)',
              opacity: chosen !== null && i !== chosen ? 0.4 : 1,
              cursor: chosen !== null ? 'default' : 'pointer',
            }}>
            <div className="flex justify-between items-start gap-3">
              <span className="text-sm font-medium leading-snug">{choice.text}</span>
              <span className="font-mono-camp text-xs flex-shrink-0 mt-0.5"
                style={{ color: 'var(--muted)' }}>+{choice.pts}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Outcome */}
      {chosen !== null && (
        <div className="rounded-xl p-4 flex flex-col gap-3"
          style={{ background: 'var(--s2)', border: '1px solid #ffffff1A' }}>
          <div>
            <p className="font-mono-camp text-xs uppercase tracking-widest mb-2"
              style={{ color: 'var(--lime)' }}>// outcome</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted2)' }}>
              {scene.outcomes[chosen]}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono-camp text-xs px-3 py-1 rounded-full"
              style={{ background: '#AAFF0020', border: '1px solid #AAFF0040', color: 'var(--lime)' }}>
              +{scene.choices[chosen].pts} XP
            </span>
            <button onClick={handleNext}
              className="px-5 py-2 rounded-xl font-mono-camp text-sm font-bold transition-colors"
              style={{ background: 'var(--lime)', color: '#000' }}>
              {sceneIdx < SCENES.length - 1 ? 'Next scene →' : 'Finish mission →'}
            </button>
          </div>
        </div>
      )}
    </main>
  )
}