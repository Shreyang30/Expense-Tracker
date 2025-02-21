import { BrowserRouter,Route, Routes } from "react-router";
import {Signin, Signup,Account,Home,Landing,Profile,Transaction} from "./Pages/Index";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/Signin" element={<Signin/>}/>
      <Route path="/Account" element={<Account/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/" element={<Landing/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/Transaction" element={<Transaction/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
