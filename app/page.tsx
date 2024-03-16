"use client";

import { Segment } from "@/services/boardinfo";
import { Granboard } from "@/services/granboard";
import { useCallback, useEffect, useState } from "react";
export default function Home() {
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-10">
      {segment ? (
        <>
          <h1>Segment</h1>
          <table>
            <tr>
              <td>ID</td>
              <td>{segment.ID}</td>
            </tr>
            <tr>
              <td>LongName</td>
              <td>{segment.LongName}</td>
            </tr>
            <tr>
              <td>Section</td>
              <td>{segment.Section}</td>
            </tr>
            <tr>
              <td>ShortName</td>
              <td>{segment.ShortName}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>{segment.Type}</td>
            </tr>
            <tr>
              <td>Value</td>
              <td>{segment.Value}</td>
            </tr>
          </table>
        </>
      ) : (<p>Ya rien</p>)}
      <div className="grid gap-2 mb-6 md:grid-cols-2 items-center">
        <p>connection test:</p>
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={onConnectionTest}
        >
          {connectionState}
        </button>
      </div>
    </main>
  );
}
