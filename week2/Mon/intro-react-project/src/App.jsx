import Header from "./Header";
import Footer from "./Footer";
import MainContent from "./MainContent";
import Greeting from "./Greeting";
import "./styles.css"

function App() {
  return (
    <div>
      <Header title="Welcome to My React App" />
      <Greeting message="Hello" name="John" />
      <MainContent content="This is the main content of the page" />
      <Greeting message="Goodbye" name="John" />
      <Footer footerText="© 2025 My React App" />
    </div>
  );
}

export default App;