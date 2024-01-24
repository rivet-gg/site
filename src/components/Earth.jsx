import Spline from '@splinetool/react-spline';
import { useCallback, useEffect, useRef } from 'react';
import { useScroll, useTime, useTransform } from 'framer-motion';

const f = 1000 * 60 * 60 * 5;

export const Earth = props => {
  const ref = useRef();
  const earth = useRef();

  const time = useTime();

  const { scrollYProgress } = useScroll({
    offset: ['end end', 'start start']
  });

  const rotate = useTransform(time, [0, f], [0, 360], { clamp: false });

  const scrollRotate = useTransform(
    [scrollYProgress, rotate],
    () => (scrollYProgress.get() * Math.PI) / 2 + rotate.get()
  );

  useEffect(
    () =>
      scrollRotate.onChange(value => {
        if (earth.current) {
          earth.current.rotation.y = value;
        }
      }),
    [scrollRotate]
  );

  const onLoad = useCallback(splineApp => {
    let splineEarth = splineApp.findObjectByName('Earth');
    if (splineEarth) {
      earth.current = splineEarth;
    }
  }, []);

  return <Spline ref={ref} onLoad={onLoad} {...props} scene='/photoreal_earth.splinecode' />;
};
