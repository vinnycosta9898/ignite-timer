import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme/defaultTheme';
import { GlobalStyle } from './styles/GlobalStyle';

import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/Router';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
      <GlobalStyle/>
    </ThemeProvider>
  )
}

export default App
