import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NamePage from "./Pages/NamePage";
import ChatPage from "./Pages/ChatPage";
import "./style/style.css";

export default function App() {
  const [userName, setUserName] = useState("");
  return (
    <div className="root">
      <Router>
        <Switch>
          <Route exact path="/">
            <NamePage setUserName={setUserName} userName={userName} />
          </Route>
          <Route exact path="/Chat">
            <ChatPage userName={userName} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

