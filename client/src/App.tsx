import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import ToDoList from './components/ToDoList';

function App() {

  return (
    <>
      <Header/>
      
      <div id='to-to-list-container'>
        <ToDoList/>
        <ToDoList/>
        <ToDoList/>
        <ToDoList/>
        <ToDoList/>
        <ToDoList/>
        <ToDoList/>
      </div>

      <Footer/>
    </>
  )
}

export default App
