"use client";

import { useState, useEffect, useCallback } from "react";

export interface GyroTilt {
  rotateX: number;
  rotateY: number;
  available: boolean;
}

export function useGyroTilt(): GyroTilt {
  const [tilt, setTilt] = useState<GyroTilt>({ rotateX: 0, rotateY: 0, available: false });

  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (e.beta == null || e.gamma == null) return;
    const rx = Math.max(-6, Math.min(6, e.beta * 0.12));
    const ry = Math.max(-6, Math.min(6, e.gamma * 0.12));
    setTilt({ rotateX: rx, rotateY: ry, available: true });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // iOS 13+ requires permission
    type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    const DOE = DeviceOrientationEvent as DeviceOrientationEventWithPermission;

    if (typeof DOE.requestPermission === "function") {
      // Permission must be requested on user gesture — skip auto-init on iOS
      return;
    }

    window.addEventListener("deviceorientation", handleOrientation, true);
    return () => window.removeEventListener("deviceorientation", handleOrientation, true);
  }, [handleOrientation]);

  return tilt;
}
