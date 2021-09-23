import { useSpring } from 'react-spring';

export function useSpringNumber( to: number ) {
  const spring = useSpring({
    from: { value: 0 },
    to:   { value: to || 0 }
  });

  return spring.value;
}
