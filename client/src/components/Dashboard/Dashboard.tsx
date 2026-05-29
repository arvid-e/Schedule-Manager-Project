import { useState } from 'react';
import Week from '../Week/Week';

function Dashboard() {
  const [weekNumber, setWeekNumber] = useState<string>('5');
  const [input, setInput] = useState<string>('');

  const handleClick = () => {
    setWeekNumber(input);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter week number..."
        onChange={(e) => setInput(e.target.value)}
      ></input>

      <button onClick={() => handleClick()}>Change week</button>

      <Week weekNumber={weekNumber} />
    </>
  );
}

export default Dashboard;
