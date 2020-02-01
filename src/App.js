import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import InviteForm from "./components/Invite/InviteForm";
import Video from "./components/Video/Video";

function App() {
  const [playStatus, setPlayStatus] = React.useState(false);

  React.useEffect(() => {
    setPlayStatus(true);
  }, []);

  return (
    <div className='App'>
      <Video playStatus={playStatus} />
      <Header />
      <InviteForm />
    </div>
  );
}

export default App;
