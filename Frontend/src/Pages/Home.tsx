import {useAppSelector} from '../app/hooks/hooks'
import { RootState } from '../app/store'

function Home() {
  const user = useAppSelector((state:RootState) => state.user.user)
  return (
    <div className='p-5 min-h-screen text-5xl bg-gradient-to-br from-black to-gray-700 text-white '>
        Welcome,{user?.name}
        <br/> What do you want to do today?
    </div>
  )
}

export default Home