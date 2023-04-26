import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme/defaultTheme';
import { GlobalStyle } from './styles/GlobalStyle';

import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/Router';
import { CyclesContextProvider } from './Contexts/CyclesContext'


function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router/>
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle/>
    </ThemeProvider>
  )
}

export default App
