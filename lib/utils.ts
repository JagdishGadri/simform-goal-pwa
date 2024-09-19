import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const readFileAsDataURL = (file: File | Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};

// export const debounce = function <T extends (...args: any[]) => any>(
//   originalFun: T,
//   delay: number
// ) {
//   let timerId: NodeJS.Timeout;
//   return function (...args: Parameters<T>) {
//     clearTimeout(timerId);
//     timerId = setTimeout(() => {
//       originalFun.apply(this, args);
//     }, delay);
//   };
// };

export type Callback = (...args: unknown[]) => void;

interface DebounceFunction<F extends Callback> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): void;
}

export const debounce = function <T extends Callback>(
  originalFun: T,
  delay: number
): DebounceFunction<T> {
  let timerId: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      originalFun.apply(this, args);
    }, delay);
  };
};

export const scrollToEnd: (elementId: string, extraHeight?: number) => void = (
  elementId: string,
  extraHeight: number = 0
) => {
  const messageContainer = document.getElementById(elementId);
  if (messageContainer) {
    setTimeout(() => {
      messageContainer.scrollTop = messageContainer.scrollHeight + extraHeight;
    }, 1000);
  }
};

export function getDateString(timeStr: Date) {
  // Create a Date object from the time string
  const time = new Date(timeStr);

  const today = new Date();

  // Get the difference in milliseconds
  const diff = today.getTime() - time.getTime();

  const oneDay = 1000 * 60 * 60 * 24;

  if (diff < oneDay) {
    return 'Today';
  } else if (diff === oneDay) {
    return 'Yesterday';
  } else {
    // Format the date if not today or yesterday
    return time.toLocaleDateString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
}

export function getTimeString(timeStr: Date) {
  const time = new Date(timeStr);

  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
