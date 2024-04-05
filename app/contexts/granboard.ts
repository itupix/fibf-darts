"use client";
import { type Granboard } from "@/services/granboard"
import { Segment } from "next/dist/server/app-render/types"
import { createContext } from "react"

type GranboardContext = {
  granboard: Granboard | undefined,
  simulateSuccessHit: () => void,
  simulateFailHit: () => void,
  simulateHit: (type: number, section: number) => void,
  segment: Segment,
  connectionState: string,
  onSegmentHit: (segment: Segment) => void,
  onConnectionTest: () => void
}

export const GranboardContext = createContext<GranboardContext>({
  granboard: undefined,
  simulateSuccessHit: () => { },
  simulateFailHit: () => { },
  simulateHit: () => { },
  segment: undefined,
  connectionState: 'standby',
  onSegmentHit: () => { },
  onConnectionTest: () => { }
})