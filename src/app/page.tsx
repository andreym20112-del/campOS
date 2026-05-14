export default function Home() {
  return (
    <main className="min-h-screen bg-[#070B0F] flex flex-col items-center justify-center gap-6 p-8">
      <div className="font-mono text-xs text-[#AAFF00] tracking-[4px] uppercase">
        // system online
      </div>
      <h1 className="text-5xl font-bold text-[#E8F0FE] tracking-tight">
        Camp<span className="text-[#AAFF00]">OS</span>
      </h1>
      <p className="text-[#6B7A99] font-mono text-sm">
        Live Event Engine for English Camps
      </p>
      <div className="flex gap-4 mt-4">
        <button className="px-6 py-3 bg-[#AAFF00] text-black font-bold font-mono rounded-lg hover:bg-[#ccff33] transition-colors">
          Host a session
        </button>
        <button className="px-6 py-3 border border-white/10 text-[#E8F0FE] font-mono rounded-lg hover:bg-white/5 transition-colors">
          Join with code
        </button>
      </div>
    </main>
  )
}