'use client'

import { Job } from './CourierApp'
import { MapPlaceholder } from './MapPlaceholder'

interface Props {
  job: Job
  onAccept: () => void
  onDecline: () => void
}

export default function JobOfferScreen({ job, onAccept, onDecline }: Props) {
  const totalPay = job.basePay + job.tip

  return (
    <div className="flex flex-col h-full text-white animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-12 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          <span className="text-white text-sm font-medium">New Order</span>
        </div>
        <span className="text-zinc-600 text-xs font-mono">{job.id}</span>
      </div>

      {/* Agent dispatch label */}
      <div className="px-5 pb-2">
        <span className="text-zinc-500 text-xs">Dispatched by AI Agent</span>
      </div>

      {/* Map */}
      <div className="px-5">
        <MapPlaceholder stage="offer" />
      </div>

      {/* Route */}
      <div className="px-5 mt-4">
        {/* Pickup row */}
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center pt-1">
            <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            </div>
            <div className="w-px flex-1 bg-zinc-800 my-1" style={{ minHeight: 24 }} />
          </div>
          <div className="flex-1 min-w-0 pb-4">
            <div className="text-zinc-500 text-xs mb-0.5">Pickup</div>
            <div className="text-white font-medium text-sm leading-tight">{job.pickup.name}</div>
            <div className="text-zinc-500 text-xs mt-0.5 truncate">{job.pickup.address}</div>
          </div>
        </div>

        {/* Dropoff row */}
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center pt-1">
            <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <div className="w-2 h-2 bg-zinc-300 rounded-full" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-zinc-500 text-xs mb-0.5">Dropoff</div>
            <div className="text-white font-medium text-sm leading-tight">{job.dropoff.name}</div>
            <div className="text-zinc-500 text-xs mt-0.5 truncate">{job.dropoff.address}</div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-5 mt-4 grid grid-cols-3 gap-2">
        <div className="bg-zinc-900 rounded-xl p-3 text-center border border-zinc-800/60">
          <div className="text-white font-semibold text-base">{job.distance}</div>
          <div className="text-zinc-500 text-xs mt-0.5">Distance</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-3 text-center border border-zinc-800/60">
          <div className="text-white font-semibold text-base">{job.eta}</div>
          <div className="text-zinc-500 text-xs mt-0.5">Est. Time</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-3 text-center border border-zinc-800/60">
          <div className="text-emerald-400 font-semibold text-base">${totalPay.toFixed(2)}</div>
          <div className="text-zinc-500 text-xs mt-0.5">Payout</div>
        </div>
      </div>

      {/* Pay breakdown */}
      <div className="mx-5 mt-2 bg-zinc-900 rounded-xl px-4 py-3 border border-zinc-800/60">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-zinc-500">Base Pay</span>
          <span className="text-zinc-300">${job.basePay.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Customer Tip</span>
          <span className="text-zinc-300">${job.tip.toFixed(2)}</span>
        </div>
      </div>

      {/* Order items */}
      <div className="px-5 mt-4">
        <div className="text-zinc-600 text-xs font-medium uppercase tracking-wider mb-2">Order</div>
        <div className="space-y-1.5">
          {job.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-zinc-300 text-sm">
              <div className="w-1 h-1 bg-zinc-600 rounded-full flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* CTA Buttons */}
      <div className="px-5 pb-8 pt-5 space-y-2">
        <button
          onClick={onAccept}
          className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white font-semibold text-base rounded-2xl transition-all"
        >
          Accept · ${totalPay.toFixed(2)}
        </button>
        <button
          onClick={onDecline}
          className="w-full h-12 bg-transparent hover:bg-zinc-900 active:scale-[0.98] text-zinc-500 font-medium text-sm rounded-2xl transition-all"
        >
          Decline
        </button>
      </div>
    </div>
  )
}
