/* eslint-disable one-var */
import { useState, useEffect, useRef } from "react";

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

const useCountDown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();
  // const now = new Date().getTime();
  // const hours = differenceInHours(targetDate, now);

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // countdown starts in 48 hours
      // if (hours >= 48) {
      //     return false;
      // }
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

export function useEnterSubmit() {
    const formRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
            formRef.current?.requestSubmit();
            event.preventDefault();
        }
    };

    return { formRef, onKeyDown: handleKeyDown };
}

export default useCountDown;
