import { useDebounce } from '@site/src/hooks/useDebounce';

import type { RunStatus } from '../contexts/demo/demoReducer';

export default function useDebouncedStatus(status: RunStatus) {
  const debouncedStatus = useDebounce(status, 300);

  const isRunning = debouncedStatus === 'running' && status === 'running';
  return isRunning ? 'running' : debouncedStatus;
}
