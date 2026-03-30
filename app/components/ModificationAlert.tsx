'use client'

import { Modification } from './CourierApp'

interface Props {
  mod: Modification
  onAccept: () => void
  onDecline: () => void
}

export default function ModificationAlert({ mod, onAccept, onDecline }: Props) {
  const payDiff = mod.newPay - mod.oldPay

  return (
    <>
      {/* Scrim */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 animate-fade-in" />

      {/* Bottom sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-zinc-950 rounded-t-3xl animate-slide-up border-t border-zinc-800/80">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-8 h-1 bg-zinc-800 rounded-full" />
        </div>

        <div className="px-5 pb-8 pt-3">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
              <span className="text-zinc-400 text-xs font-medium">Agent Update</span>
            </div>
          </div>

          {/* Title + detail */}
          <h3 className="text-white font-semibold text-xl leading-tight mb-1">{mod.description}</h3>
          <p className="text-zinc-400 text-sm mb-4">{mod.detail}</p>

          {/* Why this change */}
          <div className="bg-zinc-900 rounded-xl px-4 py-3 mb-3 border border-zinc-800/60">
            <div className="text-zinc-500 text-xs font-medium mb-1">Why this change?</div>
            <div className="text-zinc-300 text-sm leading-relaxed">{mod.aiReason}</div>
          </div>

          {mod.kitchenStatus && (
            <div className="bg-zinc-900 rounded-xl px-4 py-3 mb-3 border border-zinc-800/60 flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />
              <div className="text-zinc-200 text-sm font-medium">{mod.kitchenStatus}</div>
            </div>
          )}

          {mod.efficiency && (
            <div className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800/60">
              <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-3">Earnings Efficiency</div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-300 text-sm">If you accept</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 text-sm font-semibold">{mod.efficiency.withDetour}</span>
                  <span className="text-zinc-600 text-xs">({mod.efficiency.withDetourNote})</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-600 text-sm">If you decline</span>
                <span className="text-zinc-600 text-sm">{mod.efficiency.without}</span>
              </div>
            </div>
          )}

          {mod.confirmOnly ? (
            <button
              onClick={onAccept}
              className="w-full h-14 bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98] text-white font-semibold text-base rounded-2xl transition-all border border-zinc-800"
            >
              Got it
            </button>
          ) : (
            <>
              {/* Pay update card */}
              <div className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800/60">
                <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-3">Pay Update</div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <div className="text-zinc-600 text-xl font-semibold line-through">${mod.oldPay.toFixed(2)}</div>
                    <div className="text-zinc-600 text-xs mt-0.5">Current</div>
                  </div>

                  <div className="flex-1 flex items-center gap-1">
                    <div className="flex-1 h-px bg-zinc-800" />
                    <svg className="w-3.5 h-3.5 text-zinc-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                    </svg>
                    <div className="flex-1 h-px bg-zinc-800" />
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-emerald-400 text-2xl font-bold">${mod.newPay.toFixed(2)}</div>
                    <div className="text-zinc-500 text-xs mt-0.5">New Total</div>
                  </div>

                  <div className="ml-1 bg-zinc-800 rounded-lg px-3 py-1.5 border border-zinc-700/60">
                    <span className="text-emerald-400 text-sm font-semibold">+${payDiff.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={onAccept}
                  className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white font-semibold text-base rounded-2xl transition-all"
                >
                  Accept · +${payDiff.toFixed(2)} more
                </button>
                <button
                  onClick={onDecline}
                  className="w-full h-12 bg-transparent hover:bg-zinc-900 active:scale-[0.98] text-zinc-500 font-medium text-sm rounded-2xl transition-all"
                >
                  Decline
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
