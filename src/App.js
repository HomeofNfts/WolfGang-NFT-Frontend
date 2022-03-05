import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Mint from './mint'
import Navbar from './navbar'
import Staking from './staking'
import Home from './home'

const App = () => {
  return (
   <Router>
			<main>
        <Navbar />			
        <Switch>
        <Route exact path="/"
            render={(props)=>
              (
                <Home {...props} 
                  
                />
              )
            }
          />
          <Route exact path="/mint"
            render={(props)=>
              (
                <Mint {...props} 
                  
                />
              )
            }
          />
          <Route path="/staking"
            render={(props) =>
              (
                <Staking {...props}
                  
                />
              )
            }
          />
        </Switch>
			</main>
		</Router>
  )
}

export default App