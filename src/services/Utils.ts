/**
 * Utilities
 */

export function isFunction(value: any): value is () => void {
  return typeof value === 'function';
}

export function safeInvoke(
  func: ((...args: any[]) => void) | undefined,
  ...args: any[]
) {
  if (isFunction(func)) {
    return func(...args);
  }
}
