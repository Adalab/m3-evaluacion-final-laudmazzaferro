import React from 'react';
import './App.scss';
import { fetchCharapters } from './services/fetchCharapters'
import CharapterList from './Components/CharapterList/CharapterList'
import Filters from './Components/Filters/Filters'
import { Switch, Route } from 'react-router-dom';
import CharapterDetail from './Components/CharapterDetail/CharapterDetail';
import Footer from './Components/Footer/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charapters: [],
      userInput: '',
      selectValue:'Todos',
      radioValue:'All'
    }
    this.getUserInput = this.getUserInput.bind(this);
    this.getUserSelect = this.getUserSelect.bind(this);
    this.getUserRadio = this.getUserRadio.bind(this);
  }
  componentDidMount() {
    this.getCharapters();
  }
  getCharapters() {
    fetchCharapters()
      .then(data => {
        this.setState({
          charapters: data.results
        });
      });
  };

  getUserInput(event) {
    const inputValue = event.currentTarget.value;
    this.setState({
      userInput: inputValue
    })
  }
  getUserSelect(event){
    let newSelectValue = event.currentTarget.value;
    this.setState({
      selectValue:newSelectValue
    })
  }
  getUserRadio(event){
    const newRadioValue = event.currentTarget.value;
    this.setState({
      radioValue:newRadioValue
    })
  }

  render() {
    const { charapters, userInput ,selectValue, radioValue} = this.state
    return (
      <div className="App">
        
        <header className="App-header">
          <h1 className="App-title">Rick and Monty</h1>
        </header>
        <main className="App-main">
        <Switch>
          <Route exact path="/" render={() => {
            return (
              <div className="App-main-all">
                <Filters
                  userInput={userInput}
                  getUserInput={this.getUserInput}
                  getUserSelect={this.getUserSelect}
                  getUserRadio={this.getUserRadio}
                  radioValue={radioValue}
                />
                <CharapterList
                  charapters={charapters}
                  userInput={userInput}
                  selectValue={selectValue}
                  radioValue={radioValue}
                />
              </div>
            );
          }} />

          <Route path="/charapter-detail/:chapId" render={routerProps => {
            return (
              
              <CharapterDetail 
                routerProps={routerProps}
                charapters={charapters}
              />
            
            );
          }}/>

        </Switch>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
