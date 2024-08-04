import Spline from '@splinetool/react-spline';
import { useCallback, useEffect, useRef } from 'react';
import { useTime, useTransform } from 'framer-motion';

const f = 1000 * 60 * 60 * 10;

export default function Earth(props) {
  const ref = useRef();
  const earth = useRef();

  const time = useTime();

  const rotate = useTransform(time, [0, f], [0, 360], { clamp: false });

  useEffect(
    () =>
      rotate.onChange(value => {
        if (earth.current) {
          earth.current.rotation.y = value;
        }
      }),
    [rotate]
  );

  const onLoad = useCallback(splineApp => {
    let splineEarth = splineApp.findObjectByName('Earth');
    if (splineEarth) {
      earth.current = splineEarth;
    }
  }, []);

  return <Spline ref={ref} onLoad={onLoad} {...props} scene='/photoreal_earth.splinecode' />;
}