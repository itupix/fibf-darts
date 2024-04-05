"use client";
import { Segment } from "@/services/boardinfo";
import { Granboard } from "@/services/granboard";
import { useCallback, useContext, useEffect, useState } from "react";
import { GameContext, type Shot } from "./contexts/game";
import { v4 as uuidv4 } from 'uuid'

export const useGranboard = () => {
  const { game, setGame } = useContext(GameContext)
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
      Type: 1,
      Value: 20,
      ShortName: 'S20',
      ID: 79,
      LongName: 'Simple 20',
      Section: 20,
    }
    setSegment(newSegment)
  }

  const simulateHit = (type: number, section: number) => {
    const newSegment: Segment = {
      Type: type,
      Value: 20,
      ShortName: 'Test',
      ID: 1,
      LongName: 'Test',
      Section: section,
    }
    setSegment(newSegment)
  }

  return {
    granboard,
    simulateHit,
    simulateSuccessHit,
    simulateFailHit,
    segment,
    connectionState,
    onSegmentHit,
    onConnectionTest
  }
}