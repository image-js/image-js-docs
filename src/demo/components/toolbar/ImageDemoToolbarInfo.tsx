import React from 'react';

import useThrottle from '../../../components/utils/useThrottle';
import { useDemoStateContext } from '../../contexts/demo/demoContext';
import { useImageRunState } from '../../contexts/run/imageRunContext';
import useDebouncedStatus from '../../hooks/useDebouncedStatus';

export default function ImageDemoToolbarInfo() {
  const { selectedDevice } = useDemoStateContext();

  if (selectedDevice) {
    return <FrameRateInfo />;
  } else {
    return <ImageInfo />;
  }
}

function FrameRateInfo() {
  const runState = useImageRunState();

  const opsThrottled = useThrottle(runState.operationsPerSecond, 1000);
  return (
    <div className="image-demo-toolbar-info">
      {Math.round(opsThrottled)} ops/s
    </div>
  );
}

function ImageInfo() {
  const runState = useImageRunState();
  const debouncedStatus = useDebouncedStatus(runState.status);
  return (
    <div className="image-demo-toolbar-info">
      {debouncedStatus === 'success' && (
        <span>Ran in {formatTime(runState.time)}</span>
      )}
      {debouncedStatus === 'error' && <span>Processing failed</span>}
      {debouncedStatus === 'running' && <span>Running...</span>}
    </div>
  );
}

function formatTime(time: number) {
  // Time is in miliseconds
  if (time >= 10 ** 4) {
    return `${(time / 10 ** 3).toFixed(1)}s`;
  }
  if (time >= 10 ** 3) {
    return `${(time / 10 ** 3).toFixed(2)}s`;
  } else if (time >= 10) {
    return `${Math.round(time)}ms`;
  } else if (time > 0.1) {
    return `${time.toFixed(2)}ms`;
  } else {
    return `${(time * 10 ** 3).toFixed(2)}μs`;
  }
}
