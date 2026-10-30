import { Route, Routes } from "react-router";
import HomePage from './pages/homePage';
import ProfilePage from './pages/profilePage';
import PostPage from './pages/postPage';
import NavBar from './components/navigationBar'
import SignInPage from './pages/signinPage'
import SignUpPage from './pages/signupPage'
import AddPostModal from './components/addPop'
import EditUserPop from './components/editePop'
import {useStore} from './store/store'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminProtectedRouter from './routes/AdminProtectedRouter.jsx'
import {Toaster} from 'react-hot-toast'
import NotFoundPage from './pages/404'
import AdminLayout from "./layouts/AdminLayout"
import AdminPosts from "./pages/admin/AdminPosts"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminComments from "./pages/admin/AdminComments"
import AdminOverview from "./pages/admin/AdminOverview"
function App() 
{
    const isAddPostModalOpen = useStore((state) => state.isAddPostModalOpen);
    const isEditUserModalOpen = useStore((state) => state.isEditUserModalOpen);
  return (
    <div>
      <Toaster/>
      <NavBar/>
      {isAddPostModalOpen && <AddPostModal/>}
      {isEditUserModalOpen && <EditUserPop/>}
      <Routes>
        <Route path="/" element= {<HomePage/>} />
        <Route path="/profile" element= {<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
        <Route path="/post/:id" element= {<PostPage/>} />
        <Route path="/signIn" element= {<SignInPage/>} />
        <Route path="/signUp" element= {<SignUpPage/>} />
        <Route path="/admin" element={<AdminProtectedRouter><AdminLayout/></AdminProtectedRouter>}>
          <Route index element={<AdminOverview/>}/>
          <Route path="posts" element={<AdminPosts/>}/>
          <Route path="users" element={<AdminUsers/>}/>
          <Route path="comments" element={<AdminComments/>}/>
        </Route>
        <Route path="*" element= {<NotFoundPage/>} />
      </Routes>
    </div>
  )
}
export default App
