import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid red;
`;

const Title = styled.h1`
  color: gray;
`;

const Button = styled.button`
  background-color: ${({ success }) => (success ? "green" : "red")};
`;

const App = () => {
  const [isActive, toggleActive] = useState(false);
  const [initialTime, setInitialTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setInitialTime((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && initialTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, initialTime]);

  const handleReset = () => {
    toggleActive(false);
    setInitialTime(0);
  };

  return (
    <Container>
      <Title>Timer: {initialTime}</Title>
      <Button onClick={() => toggleActive((prev) => !prev)}>
        {isActive ? "Pause" : "Start"}
      </Button>
      <Button onClick={handleReset}>Reset</Button>
      {isActive && initialTime !== 0 ? <Button success>Record</Button> : null}
    </Container>
  );
};

export default App;
