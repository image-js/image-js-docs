import { ComputeData, WorkerResponse } from '@site/src/types/IJS';
import { Image, Mask } from 'image-js';

type WorkerMessageHandler = (event: MessageEvent<WorkerResponse>) => void;

interface Job {
  data: ComputeData;
  resolve: (value: SuccessData) => void;
  reject: (value: Error) => void;
}

interface SuccessData {
  image: Image | Mask;
  time: number;
}

export class JobManager {
  private _callback: WorkerMessageHandler;
  private _worker: Worker;
  private _runningJobs = new Map<string, Job>();
  private _runningJobName: string | null = null;
  constructor() {
    // @ts-expect-error we don't augment import.meta
    this._worker = new Worker(new URL('./worker.ts', import.meta.url));
    this._callback = (event) => {
      const job = this._runningJobs.get(event.data.name);
      if (!job) {
        return;
      }
      this._runningJobs.delete(event.data.name);
      if (event.data.type === 'success') {
        const data = event.data.data;
        if (data.type === 'image') {
          const { width, height, colorModel, data: imgData, bitDepth } = data;
          job.resolve({
            image: new Image(width, height, {
              colorModel,
              data: imgData,
              bitDepth,
            }),
            time: event.data.time,
          });
        } else {
          const { width, height, data: imgData } = data;
          job.resolve({
            image: new Mask(width, height, {
              data: imgData,
            }),
            time: event.data.time,
          });
        }
      } else {
        job.reject(new Error(event.data.error));
      }
      this._runningJobName = null;
      this._runNextJob();
    };
    this._worker.addEventListener('message', this._callback);
  }

  public abortJob(name: string) {
    const job = this._runningJobs.get(name);
    if (!job) {
      return;
    }
    job.reject(new Error('Job canceled'));
    this._runningJobs.delete(name);
    if (this._runningJobName === name) {
      this._runningJobName = null;
      this._worker.removeEventListener('message', this._callback);
      this._worker.terminate();

      // Recreate the worker
      // @ts-expect-error we don't augment import.meta
      this._worker = new Worker(new URL('./worker.ts', import.meta.url));
      this._worker.addEventListener('message', this._callback);
    }
  }

  private _addJob(job: Job) {
    this._runningJobs.set(job.data.name, job);
    this._runNextJob(job.data.name);
  }
  private _runNextJob(jobName?: string) {
    if (this._runningJobName !== null) {
      // A job is already running
      return;
    }

    const nextJob = jobName
      ? this._runningJobs.get(jobName)
      : this._runningJobs.values().next().value;

    if (!nextJob) {
      return;
    }
    this._runningJobName = nextJob.data.name;
    this._worker.postMessage(nextJob.data);
  }
  runJob(data: ComputeData) {
    this.abortJob(data.name);

    return new Promise<SuccessData>((resolve, reject) => {
      this._addJob({
        data,
        resolve,
        reject,
      });
    });
  }
}

let jobManager: JobManager | null = null;
export default function getJobManager() {
  if (!jobManager) {
    jobManager = new JobManager();
  }
  return jobManager;
}
