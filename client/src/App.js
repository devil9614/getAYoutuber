import styled from 'styled-components'
import Logo from "./Assets/Untitled.png"

function App() {
  return (
    <Main className="App">
      <img src = {Logo} alt = "Logo" />
      <h1>Coming Soon...</h1>
    </Main>
  );
}
const Main = styled.div`
  width:100vw;
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

export default App;
