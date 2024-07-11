import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyles'; 
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import UserForm from './components/UserForm';
import AgentForm from './components/AgentForm';
import PropertyForm from './components/PropertyForm';
import BookingForm from './components/BookingForm';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <GlobalStyle /> 
      <div className="App">
        <Header />
        
          {/* <Switch> */}
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/users" component={UserForm} />
            <Route path="/agents" component={AgentForm} />
            <Route path="/properties" component={PropertyForm} />
            <Route path="/bookings" component={BookingForm} />
            
          {/* </Switch> */}
        </div>
        <Footer />
     
    </Router>
  );
}

export default App;
