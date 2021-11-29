import { motionManager } from './motion';

interface AccelerometerData {
  x: number;
  y: number;
  z: number;
}

const FORCE_MAGNITUDE_THRESHOLD = 0.5;
const TIME_THRESHOLD = 100;
const SHAKE_TIMEOUT = 800;
const SHAKE_THROTTLE = 1000;
const IS_SHAKE_MOTION_COUNT = 3;

native.nativeShake = (cb: (shakes: number) => void): void => {
  let lastDataReadingTimestamp = 0;
  let lastMotionTimestamp = 0;
  let lastShakeTimestamp = 0;
  let motionCount = 0;

  const onSensorData = (data: AccelerometerData) => {
    const now = Date.now();
    if (now - lastMotionTimestamp > SHAKE_TIMEOUT) {
      motionCount = 0;
    }
    const timeDelta = now - lastDataReadingTimestamp;
    if (timeDelta > TIME_THRESHOLD) {
      const forceVector = Math.abs(
        Math.sqrt(
          Math.pow(data.x, 2) + Math.pow(data.y, 2) + Math.pow(data.z, 2)
        ) - 1
      );
      if (forceVector > FORCE_MAGNITUDE_THRESHOLD) {
        motionCount++;
        if (
          motionCount >= IS_SHAKE_MOTION_COUNT &&
          now - lastShakeTimestamp > SHAKE_THROTTLE
        ) {
          cb(motionCount);
          lastShakeTimestamp = now;
          motionCount = 0;
        }
        lastMotionTimestamp = now;
      }
      lastDataReadingTimestamp = now;
    }
  };
  motionManager.startAccelerometerUpdates((data) => onSensorData(data));
};
