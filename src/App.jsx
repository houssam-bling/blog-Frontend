import { Route, Routes } from "react-router";
import HomePage from './pages/homePage';
import ProfilePage from './pages/profilePage';
import PostPage from './pages/postPage';
import NavBar from './components/navigationBar'
import SigninPage from './pages/signinPage'
import SignupPage from './pages/signupPage'
import AddPop from './components/addPop'
import EditUserPop from './components/editePop'
import {useStore} from './store/store'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminProtectedRoute from './routes/AdminProtectedRouter.jsx'
import {Toaster} from 'react-hot-toast'
import NotFound from './pages/404'
import Dashboard from "./layouts/AdminLayout"
import PostDashboard from "./pages/admin/AdminPosts"
import UsersDashboard from "./pages/admin/AdminUsers"
import CommentsDashboard from "./pages/admin/AdminComments"
import AdminDashboard from "./pages/admin/AdminOverview"
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
