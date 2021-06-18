import React from 'react';
import MainGame from './components/MainGame';
import { GlobalStyle, Wrapper } from './App.styles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div className="text-center mx-auto m-5 p-5">
          <h1>Random Quiz App</h1>
          <MainGame />
        </div>
      </Wrapper>
    </>
  );
}

export default App;
