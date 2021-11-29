import { AccelerometerData, SensorOptions } from './motion.types';

const baseAcceleration = -9.81;

let coreMotionManager: CMMotionManager;
let sensorManager: any;
let sensorListener: android.hardware.SensorEventListener | undefined;

if (native.isAndroid) {
  const applicationContext =
    new android.content.ContextWrapper().getApplicationContext();
  sensorManager = applicationContext?.getSystemService(
    android.content.Context.SENSOR_SERVICE
  );
} else {
  coreMotionManager = CMMotionManager.alloc().init();
}

const getNativeDelay = (options: SensorOptions) => {
  if (!options || !options.sensorDelay) {
    return native.isAndroid
      ? android.hardware.SensorManager.SENSOR_DELAY_NORMAL
      : 0.2;
  }
  switch (options.sensorDelay) {
    case 'normal':
      return native.isAndroid
        ? android.hardware.SensorManager.SENSOR_DELAY_NORMAL
        : 0.2;
    case 'game':
      return native.isAndroid
        ? android.hardware.SensorManager.SENSOR_DELAY_GAME
        : 0.06;
    case 'ui':
      return native.isAndroid
        ? android.hardware.SensorManager.SENSOR_DELAY_UI
        : 0.02;
    case 'fastest':
      return native.isAndroid
        ? android.hardware.SensorManager.SENSOR_DELAY_FASTEST
        : 0.001;
  }
};

const startAccelerometerUpdates = (
  callback: (accelerometerData: AccelerometerData) => void,
  options?: SensorOptions
): void => {
  if (native.isAndroid) {
    const accelerometerSensor = sensorManager?.getDefaultSensor(
      android.hardware.Sensor.TYPE_ACCELEROMETER
    );
    if (sensorListener === undefined) {
      sensorListener = new android.hardware.SensorEventListener({
        onAccuracyChanged: (sensor, accuracy) => void 0,
        onSensorChanged: (event: android.hardware.SensorEvent) => {
          callback({
            x: event.values[0] / baseAcceleration,
            y: event.values[1] / baseAcceleration,
            z: event.values[2] / baseAcceleration,
          });
        },
      });
    }
    const nativeDelay = getNativeDelay(options);
    sensorManager.registerListener(
      sensorListener,
      accelerometerSensor,
      nativeDelay
    );
  } else {
    coreMotionManager.accelerometerUpdateInterval = getNativeDelay(options);
    if (coreMotionManager?.accelerometerAvailable) {
      const queue = NSOperationQueue.alloc().init();
      coreMotionManager?.startAccelerometerUpdatesToQueueWithHandler(
        queue,
        (data, error: NSError) => {
          callback({
            x: data?.acceleration?.x,
            y: data?.acceleration?.y,
            z: data?.acceleration?.z,
          });
        }
      );
    }
  }
};

const stopAccelerometerUpdates = () => {
  if (native.isAndroid) {
    if (sensorListener) {
      sensorManager.unregisterListener(sensorListener);
    }
  } else {
    coreMotionManager.stopAccelerometerUpdates();
  }
};

export const motionManager = {
  stopAccelerometerUpdates,
  startAccelerometerUpdates,
};
