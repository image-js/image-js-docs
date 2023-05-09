export function assertUnreachable(x: never): never {
  throw new Error(`unreachable: ${String(x)}`);
}

export function assert(value: unknown, message?: string): asserts value {
  if (!value) {
    throw new Error(`unreachable${message ? `: ${message}` : ''}`);
  }
}
