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
import ProtectedRoute from './ProtectedRoute'
import AdminProtectedRoute from './AdminProtectedRouter.jsx'
import {Toaster} from 'react-hot-toast'
import NotFound from './404'
import Dashboard from "./AdminLayout"
import PostDashboard from "./AdminPosts"
import UsersDashboard from "./AdminUsers"
import CommentsDashboard from "./AdminComments"
import AdminDashboard from "./AdminOverview.jsx"
function App() 
{
    const addPop = useStore((set)=>set.addPop);
    const editeUserPop = useStore((set)=>set.editeUserPop);
  return (
    <div>
      <Toaster/>
      <NavBar/>
      {addPop && <AddPop/>}
      {editeUserPop && <EditUserPop/>}
      <Routes>
        <Route path="/" element= {<HomePage/>} />
        <Route path="/profile" element= {<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
        <Route path="/post/:id" element= {<PostPage/>} />
        <Route path="/signIn" element= {<SigninPage/>} />
        <Route path="/signUp" element= {<SignupPage/>} />
        <Route path="/admin" element={<AdminProtectedRoute><Dashboard/></AdminProtectedRoute>}>
          <Route index element={<AdminDashboard/>}/>
          <Route path="posts" element={<PostDashboard/>}/>
          <Route path="users" element={<UsersDashboard/>}/>
          <Route path="comments" element={<CommentsDashboard/>}/>
        </Route>
        <Route path="*" element= {<NotFound/>} />
      </Routes>
    </div>
  )
}
export default App
