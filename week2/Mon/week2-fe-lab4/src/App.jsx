import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import Sidebar from './Sidebar'
import './App.css'

function App() {
  const topics = [
    "Components",
    "JSX",
    "Props",
    "Import and Export",
  ];

  return (
    <div>
      <Header />
      <div className='content-layout'>
        <MainContent />
        <Sidebar topics={topics} />
      </div>
      <Footer />
    </div>
  );
}

export default App;