import React, { useState, useEffect } from 'react';

const CountdownTimer = ({checkTimeout, restartTime, handleRestartTime}) => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Giảm số giây đi 1 mỗi giây
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        // Khi số giây hết, giảm số phút đi 1 và đặt lại số giây về 59
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Khi số phút và số giây đều hết, xóa interval để dừng đồng hồ
          clearInterval(intervalId);
          // Thực hiện hàm checkTimeout khi hết thời gian
          checkTimeout();
        }
      }
    }, 1000);

    // Clear interval khi component unmount
    return () => clearInterval(intervalId);
  }, [minutes, seconds]);

  // Reset lại đồng hồ khi restart
  useEffect(() => {
    if (restartTime) {
      setMinutes(0);
      setSeconds(5);
      handleRestartTime();
    }
  }, [restartTime]);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
    </div>
  );
};

export default CountdownTimer;
