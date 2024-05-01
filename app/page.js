import Image from 'next/image'
import Navebar from './component/Navebar'
import Calendar from './component/Calendar'


export default function Home() {
  return (
    
    <div className='flex'>
      <Navebar />
      <Calendar />
    </div>
  )
}
