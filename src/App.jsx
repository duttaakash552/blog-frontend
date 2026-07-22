import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Menu from './components/Menu'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import BlogPost from './components/BlogPost'
import Profile from './components/Profile'
import MyBlog from './components/MyBlog'
import UpdatePost from './components/UpdatePost'
import Blog from './components/Blogs'
import BlogDetails from './components/BlogDetails'
import GuestRoute from './GuestRoute'
import ProtectedRoute from './ProtectedRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<GuestRoute><Register /></GuestRoute>} />
          <Route path='/login' element={<GuestRoute><Login /></GuestRoute>} />
          <Route path='/blog-post' element={<ProtectedRoute><BlogPost /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/my-blog' element={<ProtectedRoute><MyBlog /></ProtectedRoute>} />
          <Route path='/update-post/:postid' element={<ProtectedRoute><UpdatePost /></ProtectedRoute>} />
          <Route path='/blogs' element={<Blog />} />
          <Route path='/blog-details/:postid' element={<BlogDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
