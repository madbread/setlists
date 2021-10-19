import Nav from './Nav';
import { Switch, Route } from "react-router-dom";
import SetlistsPage from './Setlists/SetlistsPage';
import SongsPage from './Songs/SongsPage';
import Footer from './Footer';

const Page = () => {
  return  (
    <div className="page">
      <Nav/>
      <Switch>
        <Route path="/setlists">
          <SetlistsPage/>
        </Route>
        <Route path="/songs">
          <SongsPage/>
        </Route>
        <Route path="/">
          <SetlistsPage/>
        </Route>
      </Switch>
      <Footer/>
    </div>
  )
}

export default Page;
