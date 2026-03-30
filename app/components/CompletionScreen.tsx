'use client'

import { useState } from 'react'
import { Job } from './CourierApp'

interface Props {
  job: Job
  finalPay: number
  onNewJob: () => void
}

export default function CompletionScreen({ job, finalPay, onNewJob }: Props) {
  const [rating, setRating] = useState<number | null>(null)

  const basePay = job.basePay
  const tip = job.tip
  const bonus = Math.max(0, finalPay - basePay - tip)

  const ratings = [
    { emoji: '😕', label: 'Bad' },
    { emoji: '😐', label: 'Okay' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😊', label: 'Great' },
    { emoji: '🤩', label: 'Amazing' },
  ]

  return (
    <div className="flex flex-col h-full text-white animate-fade-in">
      <div className="flex-1 flex flex-col items-center px-5 pt-16 overflow-y-auto">
        {/* Check icon */}
        <div className="w-24 h-24 rounded-full bg-emerald-500/15 border-2 border-emerald-500/60 flex items-center justify-center mb-5 animate-pop-in">
          <svg
            className="w-11 h-11 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-1">Delivered!</h1>
        <p className="text-zinc-400 text-sm mb-7">Order successfully completed</p>

        {/* Earnings card */}
        <div className="w-full bg-zinc-900 rounded-2xl p-5 mb-3 border border-zinc-800/50">
          <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider text-center mb-4">
            Earnings Breakdown
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between">
              <span className="text-zinc-400 text-sm">Base Pay</span>
              <span className="text-zinc-200 text-sm">${basePay.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 text-sm">Customer Tip</span>
              <span className="text-emerald-400 text-sm">${tip.toFixed(2)}</span>
            </div>
            {bonus > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-sm">Agent Bonus</span>
                <span className="text-emerald-400 text-sm">+${bonus.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-zinc-800 pt-2.5 flex justify-between items-baseline">
              <span className="text-white font-bold text-sm">Total Earned</span>
              <span className="text-emerald-400 font-bold text-2xl">${finalPay.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Summary card */}
        <div className="w-full bg-zinc-900 rounded-2xl p-4 mb-3 border border-zinc-800/50">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-500 text-xs">Order ID</span>
              <span className="text-zinc-300 text-xs font-mono">{job.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 text-xs">Distance</span>
              <span className="text-zinc-300 text-xs">{job.distance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 text-xs">Customer</span>
              <span className="text-zinc-300 text-xs">{job.dropoff.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 text-xs">Restaurant</span>
              <span className="text-zinc-300 text-xs">{job.pickup.name}</span>
            </div>
          </div>
        </div>

        {/* Rating card */}
        <div className="w-full bg-zinc-900 rounded-2xl p-4 mb-3 border border-zinc-800/50">
          <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider text-center mb-3">
            How was this delivery?
          </div>
          <div className="flex justify-between gap-1">
            {ratings.map((r, i) => (
              <button
                key={i}
                onClick={() => setRating(i)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl text-xl transition-all active:scale-95 ${
                  rating === i
                    ? 'bg-emerald-500/20 border border-emerald-500/40'
                    : 'bg-zinc-800 hover:bg-zinc-700 border border-transparent'
                }`}
              >
                <span>{r.emoji}</span>
                {rating === i && (
                  <span className="text-emerald-400 text-xs font-medium">{r.label}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pb-6" />
      </div>

      {/* CTA */}
      <div className="px-5 pb-8 pt-4 border-t border-zinc-900">
        <button
          onClick={onNewJob}
          className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white font-bold text-base rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
        >
          Find New Job
        </button>
      </div>
    </div>
  )
}
