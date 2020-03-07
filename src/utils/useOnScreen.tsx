import * as React from 'react';
// Hook
export default function useOnScreen(
  ref: React.MutableRefObject<Element>,
  margin = 0
) {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    const { current } = ref;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: `${margin}px`,
      }
    );
    if (ref.current) {
      observer.observe(current);
    }
    return () => {
      observer.unobserve(current);
    };
  }); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}
