import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme/defaultTheme';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle/>
    </ThemeProvider>
  )
}

export default App
