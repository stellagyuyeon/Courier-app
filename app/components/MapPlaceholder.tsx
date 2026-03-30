type MapStage = 'offer' | 'pickup' | 'en-route' | 'deliver'

interface Props {
  stage: MapStage
  rerouteActive?: boolean
}

export function MapPlaceholder({ stage, rerouteActive = false }: Props) {
  const courierX =
    stage === 'pickup' ? 68 : stage === 'en-route' ? 165 : stage === 'deliver' ? 255 : 68

  return (
    <div className="relative w-full h-44 rounded-2xl overflow-hidden">
      <svg
        viewBox="0 0 360 176"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect width="360" height="176" fill="#18181b" />

        {/* Grid */}
        {[22, 44, 66, 88, 110, 132, 154].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="360" y2={y} stroke="#27272a" strokeWidth="0.8" />
        ))}
        {[45, 90, 135, 180, 225, 270, 315].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="176" stroke="#27272a" strokeWidth="0.8" />
        ))}

        {/* Streets — horizontal */}
        <rect x="0" y="65" width="360" height="7" fill="#27272a" />
        <rect x="0" y="108" width="360" height="5" fill="#27272a" />
        <rect x="0" y="38" width="360" height="3" fill="#27272a" />
        <rect x="0" y="144" width="360" height="3" fill="#27272a" />

        {/* Streets — vertical */}
        <rect x="78" y="0" width="6" height="176" fill="#27272a" />
        <rect x="178" y="0" width="6" height="176" fill="#27272a" />
        <rect x="265" y="0" width="5" height="176" fill="#27272a" />
        <rect x="130" y="0" width="3" height="176" fill="#27272a" />

        {/* Street labels */}
        <text x="90" y="62" fill="#3f3f46" fontSize="7" fontFamily="system-ui">
          Market St
        </text>
        <text x="190" y="62" fill="#3f3f46" fontSize="7" fontFamily="system-ui">
          Mission St
        </text>

        {/* Original route — dims when reroute is active */}
        <path
          d="M 68 69 L 260 69 L 260 112"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="6 4"
          style={{ opacity: rerouteActive ? 0.12 : 0.8, transition: 'opacity 0.6s ease' }}
        />

        {/* Reroute path: courier → Sandwich Lab → Stella Tower */}
        <path
          d="M 255 69 L 68 69 L 260 69 L 260 112"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="6 4"
          style={{ opacity: rerouteActive ? 0.9 : 0, transition: 'opacity 0.6s ease' }}
        />

        {/* Pickup pin — green, fades when reroute active */}
        <circle
          cx="68" cy="69" r="10" fill="#10b981"
          style={{ opacity: rerouteActive ? 0 : 0.15, transition: 'opacity 0.5s' }}
        />
        <circle
          cx="68" cy="69" r="6" fill="#10b981"
          style={{ opacity: rerouteActive ? 0 : 1, transition: 'opacity 0.5s' }}
        />
        <circle
          cx="68" cy="69" r="2.5" fill="#fff"
          style={{ opacity: rerouteActive ? 0 : 1, transition: 'opacity 0.5s' }}
        />

        {/* Re-pickup pin (amber) — fades in when reroute active */}
        <circle
          cx="68" cy="69" r="10" fill="#f59e0b"
          style={{ opacity: rerouteActive ? 0.2 : 0, transition: 'opacity 0.5s' }}
        />
        <circle
          cx="68" cy="69" r="6" fill="#f59e0b"
          style={{ opacity: rerouteActive ? 1 : 0, transition: 'opacity 0.5s' }}
        />
        <circle
          cx="68" cy="69" r="2.5" fill="#fff"
          style={{ opacity: rerouteActive ? 1 : 0, transition: 'opacity 0.5s' }}
        />

        {/* Dropoff pin (gray/white) */}
        <circle cx="260" cy="112" r="10" fill="#a1a1aa" opacity="0.15" />
        <circle cx="260" cy="112" r="6" fill="#a1a1aa" />
        <circle cx="260" cy="112" r="2.5" fill="#fff" />

        {/* Courier dot — visible when not on offer screen */}
        {stage !== 'offer' && (
          <>
            <circle cx={courierX} cy="69" r="11" fill="#ffffff" opacity="0.12" />
            <circle cx={courierX} cy="69" r="7" fill="#ffffff" />
            <circle cx={courierX} cy="69" r="3" fill="#09090b" />
          </>
        )}

        {/* Pickup label — fades out when reroute active */}
        <rect
          x="44" y="79" width="44" height="13" fill="#09090b" rx="3"
          style={{ opacity: rerouteActive ? 0 : 0.85, transition: 'opacity 0.5s' }}
        />
        <text
          x="66" y="89" textAnchor="middle" fill="#10b981" fontSize="8" fontFamily="system-ui" fontWeight="600"
          style={{ opacity: rerouteActive ? 0 : 1, transition: 'opacity 0.5s' }}
        >
          Pickup
        </text>

        {/* Re-pickup label — fades in when reroute active */}
        <rect
          x="38" y="79" width="58" height="13" fill="#09090b" rx="3"
          style={{ opacity: rerouteActive ? 0.85 : 0, transition: 'opacity 0.5s' }}
        />
        <text
          x="67" y="89" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="system-ui" fontWeight="600"
          style={{ opacity: rerouteActive ? 1 : 0, transition: 'opacity 0.5s' }}
        >
          Re-pickup
        </text>

        {/* Dropoff label */}
        <rect x="235" y="122" width="49" height="13" fill="#09090b" rx="3" opacity="0.85" />
        <text x="260" y="132" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="system-ui" fontWeight="600">
          Dropoff
        </text>
      </svg>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-900/60 to-transparent pointer-events-none" />

      {/* Live badge */}
      <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg px-2 py-1">
        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        <span className="text-zinc-400 text-xs">Live</span>
      </div>
    </div>
  )
}
