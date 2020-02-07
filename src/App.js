import React from "react";
import "./App.css";
import Layout from "./views/Layout/Layout";
import CreateForm from "./views/CreateForm/CreateForm";

function App() {
  return (
    <div className='App'>
      <Layout>
        <CreateForm />
      </Layout>
    </div>
  );
}

export default App;
