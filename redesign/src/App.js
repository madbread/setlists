import {useFetchAuth} from './useFetchAuth';
import LoginForm from './Forms/LoginForm';
import Page from './components/Page';
import RegisterUserForm from './Forms/RegisterUserForm';
import ForgotPasswordForm from './Forms/ForgotPasswordForm';

import './globals.css'
import './songlist.css'

const App = () => {
  const [loadingUser, user] = useFetchAuth();
  if (loadingUser) return <div className="loading">loading...</div>;

  return user.logged_in
    ? <Page/>
    : <>
        <LoginForm/>
        <RegisterUserForm />
        <ForgotPasswordForm />
      </>
}

export default App;
