'use client'

import { useState, useEffect } from 'react'
import JobOfferScreen from './JobOfferScreen'
import ActiveDeliveryScreen, { ActiveStage } from './ActiveDeliveryScreen'
import ModificationAlert from './ModificationAlert'
import CompletionScreen from './CompletionScreen'

export interface Job {
  id: string
  pickup: { name: string; address: string }
  dropoff: { name: string; address: string }
  items: string[]
  distance: string
  eta: string
  basePay: number
  tip: number
}

export interface Modification {
  type: string
  description: string
  detail: string
  aiReason: string
  oldPay: number
  newPay: number
  newDropoffAddress?: string
  confirmOnly?: boolean
  efficiency?: { withDetour: string; withDetourNote: string; without: string }
  kitchenStatus?: string
}

type AppScreen = 'job-offer' | ActiveStage | 'complete'

const JOB: Job = {
  id: 'JOB-4821',
  pickup: {
    name: 'Sandwich Lab',
    address: 'Sandwich Lab Restaurant',
  },
  dropoff: {
    name: 'Agent #402 (AI)',
    address: 'Stella Tower, 7F Board Room',
  },
  items: ['Egg Mayo Sandwich ×15', 'Ham Cheese Sandwich ×5'],
  distance: '2.4 mi',
  eta: '18 min',
  basePay: 8.5,
  tip: 4.0,
}

const FLOOR_CHANGE_ALERT: Modification = {
  type: 'floor-change',
  description: 'Dropoff Floor Changed',
  detail: '7F Board Room → 12F Executive Lounge',
  aiReason: 'Meeting room changed by organizer — 12F confirmed available ✓',
  oldPay: 0,
  newPay: 0,
  newDropoffAddress: 'Stella Tower, 12F Executive Lounge',
  confirmOnly: true,
}

const ADDITIONAL_ITEMS_ALERT: Modification = {
  type: 'additional-items',
  description: 'Additional Items Requested',
  detail: '3 more Egg Mayo Sandwiches added',
  aiReason: '5 new attendees joined the board meeting',
  oldPay: 12.5,
  newPay: 17.5,
  efficiency: { withDetour: '$6.25/mi', withDetourNote: '+4 min', without: '$5.21/mi' },
  kitchenStatus: 'Kitchen confirmed · Ready in 4 min',
}

export default function CourierApp() {
  const [screen, setScreen] = useState<AppScreen>('job-offer')
  const [modification, setModification] = useState<Modification | null>(null)
  const [currentPay, setCurrentPay] = useState(JOB.basePay + JOB.tip)
  const [dropoffAddress, setDropoffAddress] = useState(JOB.dropoff.address)
  const [rerouteActive, setRerouteActive] = useState(false)

  // Alert 1 fires 1s after "Confirm Pickup" transitions to deliver
  useEffect(() => {
    if (screen === 'deliver') {
      const t = setTimeout(() => setModification(FLOOR_CHANGE_ALERT), 1000)
      return () => clearTimeout(t)
    }
  }, [screen])

  const handleAcceptJob = () => setScreen('pickup')

  const handleNextStep = () => {
    if (screen === 'pickup') setScreen('en-route')
    else if (screen === 'en-route') setScreen('deliver')
    else if (screen === 'deliver') setScreen('complete')
  }

  const handleAcceptMod = () => {
    const accepted = modification
    if (accepted && !accepted.confirmOnly) {
      setCurrentPay(accepted.newPay)
    }
    if (accepted?.newDropoffAddress) {
      setDropoffAddress(accepted.newDropoffAddress)
    }
    setModification(null)

    // Alert 2 fires 2s after Alert 1 is accepted
    if (accepted?.type === 'floor-change') {
      setTimeout(() => setModification(ADDITIONAL_ITEMS_ALERT), 2000)
    }

    // Activate reroute map when Alert 2 is accepted
    if (accepted?.type === 'additional-items') {
      setRerouteActive(true)
    }
  }

  const handleDeclineMod = () => {
    setModification(null)
  }

  const handleNewJob = () => {
    setScreen('job-offer')
    setCurrentPay(JOB.basePay + JOB.tip)
    setDropoffAddress(JOB.dropoff.address)
    setModification(null)
    setRerouteActive(false)
  }

  const isActiveStage = (s: AppScreen): s is ActiveStage =>
    s === 'pickup' || s === 'en-route' || s === 'deliver'

  return (
    <div className="relative w-full max-w-[390px] mx-auto bg-zinc-950" style={{ height: '100dvh' }}>
      {/* Screen content — overflow-hidden here so the modal is NOT clipped */}
      <div className="absolute inset-0 overflow-hidden">
        {screen === 'job-offer' && (
          <JobOfferScreen job={JOB} onAccept={handleAcceptJob} onDecline={() => {}} />
        )}

        {isActiveStage(screen) && (
          <ActiveDeliveryScreen
            job={JOB}
            stage={screen}
            dropoffAddress={dropoffAddress}
            currentPay={currentPay}
            rerouteActive={rerouteActive}
            onNextStep={handleNextStep}
          />
        )}

        {screen === 'complete' && (
          <CompletionScreen job={JOB} finalPay={currentPay} onNewJob={handleNewJob} />
        )}
      </div>

      {modification && (
        <ModificationAlert
          mod={modification}
          onAccept={handleAcceptMod}
          onDecline={handleDeclineMod}
        />
      )}
    </div>
  )
}
