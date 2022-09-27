import { useEffect, useState } from "react";

const CountDown = ({ count, setLinkNav }) => {
  const [counter, setCounter] = useState(count);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <div>
      {counter > 0 ? (
        <p>Offer expires in: {counter} s</p>
      ) : (
        <p>Offer expired{setLinkNav("disableLink")}</p>
      )}
    </div>
  );
};

export default CountDown;
