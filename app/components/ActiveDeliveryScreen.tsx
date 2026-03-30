'use client'

import { Job } from './CourierApp'
import { MapPlaceholder } from './MapPlaceholder'

export type ActiveStage = 'pickup' | 'en-route' | 'deliver'

interface Props {
  job: Job
  stage: ActiveStage
  dropoffAddress: string
  currentPay: number
  rerouteActive: boolean
  onNextStep: () => void
}

const STEPS: { id: ActiveStage; label: string }[] = [
  { id: 'pickup', label: 'Pickup' },
  { id: 'en-route', label: 'On the Way' },
  { id: 'deliver', label: 'Deliver' },
]

const ACTIONS: Record<ActiveStage, string> = {
  pickup: 'Arrived — Mark Picked Up',
  'en-route': 'Confirm Pickup',
  deliver: 'Confirm Delivery',
}

const STATUS_MSGS: Record<ActiveStage, { icon: string; title: string; sub: string }> = {
  pickup: {
    icon: '🧭',
    title: 'Head to pickup location',
    sub: 'Sandwich Lab',
  },
  'en-route': {
    icon: '🏃',
    title: 'On the way to customer',
    sub: 'Estimated arrival · 8 min',
  },
  deliver: {
    icon: '📦',
    title: "You've arrived — deliver order",
    sub: 'Ring doorbell or knock on arrival',
  },
}

export default function ActiveDeliveryScreen({
  job,
  stage,
  dropoffAddress,
  currentPay,
  rerouteActive,
  onNextStep,
}: Props) {
  const currentIndex = STEPS.findIndex((s) => s.id === stage)
  const msg = STATUS_MSGS[stage]

  return (
    <div className="flex flex-col w-full h-full text-white animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-12 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          <span className="text-white text-sm font-medium">Active Delivery</span>
        </div>
        <span className="text-zinc-600 text-xs font-mono">{job.id}</span>
      </div>

      {/* Step indicator */}
      <div className="px-5 mb-4">
        <div className="relative">
          {/* Track */}
          <div className="absolute top-3.5 left-3.5 right-3.5 h-px bg-zinc-800" />
          {/* Progress fill */}
          <div
            className="absolute top-3.5 left-3.5 h-px bg-zinc-500 transition-all duration-500"
            style={{
              width:
                currentIndex === 0
                  ? '0px'
                  : currentIndex === 1
                  ? 'calc(50% - 14px)'
                  : 'calc(100% - 28px)',
            }}
          />
          {/* Steps */}
          <div className="relative flex justify-between">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    i < currentIndex
                      ? 'bg-emerald-500 text-white'
                      : i === currentIndex
                      ? 'bg-white text-zinc-900'
                      : 'bg-zinc-800 text-zinc-600'
                  }`}
                >
                  {i < currentIndex ? '✓' : i + 1}
                </div>
                <div
                  className={`text-xs mt-1 font-medium transition-colors ${
                    i === currentIndex
                      ? 'text-white'
                      : i < currentIndex
                      ? 'text-zinc-400'
                      : 'text-zinc-600'
                  }`}
                >
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="px-5">
        <MapPlaceholder stage={stage} rerouteActive={rerouteActive} />
      </div>

      {/* Status message */}
      <div className="mx-5 mt-3 bg-zinc-900 rounded-xl px-4 py-3 flex items-center gap-3 border border-zinc-800/60">
        <div className="text-xl">{msg.icon}</div>
        <div className="min-w-0">
          <div className="text-white font-medium text-sm">{msg.title}</div>
          <div className="text-zinc-500 text-xs mt-0.5 truncate">{msg.sub}</div>
        </div>
      </div>

      {/* Delivery card */}
      <div className="mx-5 mt-3 bg-zinc-900 rounded-xl p-4 border border-zinc-800/60">
        <div className="flex items-center justify-between mb-3">
          <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Delivery Details</div>
          <div className="text-emerald-400 font-semibold text-sm">${currentPay.toFixed(2)}</div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            </div>
            <div className="min-w-0">
              <div className="text-zinc-500 text-xs">From</div>
              <div className="text-white text-sm font-medium leading-tight">{job.pickup.name}</div>
              <div className="text-zinc-500 text-xs truncate">{job.pickup.address}</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
            </div>
            <div className="min-w-0">
              <div className="text-zinc-500 text-xs">To</div>
              <div className="text-white text-sm font-medium leading-tight">Stella Tower Board Room</div>
              <div className="text-zinc-500 text-xs truncate">{dropoffAddress}</div>
              <div className="text-zinc-600 text-xs mt-0.5">AI-dispatched order</div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-zinc-800">
          <div className="text-zinc-600 text-xs font-medium uppercase tracking-wider mb-1.5">Items</div>
          {job.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-zinc-400 text-xs">
              <div className="w-1 h-1 bg-zinc-700 rounded-full flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* Action */}
      <div className="px-5 pb-8 pt-4">
        <button
          onClick={onNextStep}
          className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white font-semibold text-base rounded-2xl transition-all"
        >
          {ACTIONS[stage]}
        </button>
      </div>
    </div>
  )
}
