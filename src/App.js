import React from "react";
import "./App.css";
import Layout from "./views/Layout/Layout";
import firebaseConfig from "./firebase/firebaseConfig";
import * as firebase from 'firebase/app';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Form from "./views/Form/Form";
import Answers from "./views/Answers/Answers";
import FormGenerator from "./views/CreateForm/FormGenerator/FormGenerator";

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
                <FormGenerator />
              </Route>
              <Route path='/:id' exact>
                <Form />
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
