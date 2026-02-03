import { ThemeProvider } from "./components/theme-provider";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
