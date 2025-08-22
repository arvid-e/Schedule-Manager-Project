import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import ToDoList from './components/ToDoList';

function App() {

  return (
    <>
      <Header/>
      
      <div id='to-to-list-container'>
        <ToDoList title="Monday"/>
        <ToDoList title="Tuesday"/>
        <ToDoList title="Wednesday"/>
        <ToDoList title="Thursday"/>
        <ToDoList title="Friday"/>
        <ToDoList title="Saturday"/>
        <ToDoList title="Sunday"/>
      </div>

      <Footer/>
    </>
  )
}

export default App
