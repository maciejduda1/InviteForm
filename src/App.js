import React from "react";
import "./App.css";
import Layout from "./views/Layout/Layout";
import CreateForm from "./views/CreateForm/CreateForm";
import firebaseConfig from "./firebase/firebaseConfig";
import * as firebase from 'firebase/app';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import InviteForm from "./components/Invite/InviteForm";
import Answers from "./views/Answers/Answers";

const App = () => {

  const [appInitialized, setInit] = React.useState(false)

  React.useEffect(() => {
    async function init() {
      await firebase.initializeApp(firebaseConfig);
      setInit(true)
    }
    init()
  }, [])

  return (
    <div className='App'>
      <Router>
        {appInitialized &&
          <Layout>
            <Switch>
              <Route path='/' exact>
                <Redirect to='/create' />
              </Route>
              <Route path='/create' exact>
                <CreateForm />
              </Route>
              <Route path='/:id' exact>
                <InviteForm />
              </Route>
              <Route path='/:id/answers' exact>
                <Answers />
              </Route>
              <Route path='*'>
                <Redirect to='/create' />
              </Route>
            </Switch>
          </Layout>
        }
      </Router>
    </div>
  );
}

export default App;
