import { Route, Routes } from "react-router";
import HomePage from './homePage';
import ProfilePage from './profilePage';
import PostPage from './postPage';
import NavBar from './navigationBar'
import SigninPage from './signinPage'
import SignupPage from './signupPage'
import AddPop from './addPop'
import EditUserPop from './editePop'
import {useStore} from './store'
function App() 
{
    const addPop = useStore((set)=>set.addPop);
    const editeUserPop = useStore((set)=>set.editeUserPop);
  return (
    <div>
      <NavBar/>
      {addPop && <AddPop/>}
      {editeUserPop && <EditUserPop/>}
      <Routes>
        <Route path="/" element= {<HomePage/>} />
        <Route path="/profile" element= {<ProfilePage/>} />
        <Route path="/post/:id" element= {<PostPage/>} />
        <Route path="/signIn" element= {<SigninPage/>} />
        <Route path="/signUp" element= {<SignupPage/>} />
      </Routes>
    </div>
  )
}
export default App
