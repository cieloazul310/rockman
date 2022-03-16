/* eslint @typescript-eslint/no-use-before-define: off */
import * as React from 'react';

type Easing = {
  linear: (n: number) => number;
  elastic: (n: number) => number;
  inExpo: (n: number) => number;
};
type EasingName = 'linear' | 'elastic' | 'inExpo';

// Some easing functions copied from:
// https://github.com/streamich/ts-easing/blob/master/src/index.ts
// Hardcode here or pull in a dependency
const easing: Easing = {
  linear: (n: number) => n,
  elastic: (n: number) => n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: (n: number) => 2 ** (10 * (n - 1)),
};

function useAnimationTimer(duration = 1000, delay = 0) {
  const [elapsed, setTime] = React.useState(0);

  React.useEffect(
    () => {
      let animationFrame: number;
      let timerStop: NodeJS.Timeout;
      let start: number;

      // Function to be executed on each animation frame
      function onFrame() {
        setTime(Date.now() - start);
        loop();
      }

      // Call onFrame() on next animation frame
      function loop() {
        animationFrame = requestAnimationFrame(onFrame);
      }

      function onStart() {
        // Set a timeout to stop things when duration time elapses
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setTime(Date.now() - start);
        }, duration);

        // Start the loop
        start = Date.now();
        loop();
      }

      // Start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);

      // Clean things up
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [duration, delay] // Only re-run effect if duration or delay changes
  );

  return elapsed;
}

// Hook
export default function useAnimation(easingName: EasingName = 'linear', duration = 500, delay = 0) {
  // The useAnimationTimer hook calls useState every animation frame ...
  // ... giving us elapsed time and causing a rerender as frequently ...
  // ... as possible for a smooth animation.
  const elapsed = useAnimationTimer(duration, delay);
  // Amount of specified duration elapsed on a scale from 0 - 1
  const n = Math.min(1, elapsed / duration);
  // Return altered value based on our specified easing function
  return easing[easingName](n);
}
