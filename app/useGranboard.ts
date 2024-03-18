"use client";
import { Segment } from "@/services/boardinfo";
import { Granboard } from "@/services/granboard";
import { useCallback, useEffect, useState } from "react";

export const useGranboard = () => {
  const [granboard, setGranboard] = useState<Granboard>();
  const [segment, setSegment] = useState<Segment>();
  const [connectionState, setConnectionState] = useState<
    "standby" | "connecting" | "connected" | "error"
  >("standby");

  const onConnectionTest = async () => {
    setConnectionState("connecting");

    try {
      setGranboard(await Granboard.ConnectToBoard());
      setConnectionState("connected");
    } catch (error) {
      console.error(error);
      setConnectionState("error");
    }
  };

  const onSegmentHit = useCallback((segment: Segment) => {
    setSegment(segment);
  }, []);

  useEffect(() => {
    if (granboard) {
      granboard.segmentHitCallback = onSegmentHit;
    }
  }, [granboard])

  const simulateSuccessHit = () => {
    const newSegment: Segment = {
      Type: 3,
      Value: 60,
      ShortName: 'T20',
      ID: 77,
      LongName: 'Triple 20',
      Section: 20,
    }
    setSegment(newSegment)
  }

  const simulateFailHit = () => {
    const newSegment: Segment = {
      Type: 2,
      Value: 40,
      ShortName: 'D20',
      ID: 79,
      LongName: 'Double 20',
      Section: 20,
    }
    setSegment(newSegment)
  }

  return {
    granboard,
    simulateSuccessHit,
    simulateFailHit,
    segment,
    connectionState,
    onSegmentHit,
    onConnectionTest
  }
}