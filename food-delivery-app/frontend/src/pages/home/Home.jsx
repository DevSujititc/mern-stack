import React, {useState} from 'react'
import './home.css'
import Header from '../../components/header/Header'
import FoodMenu from '../../components/foodMenu/FoodMenu'
import FoodDisplay from '../../components/foodDisplay/FoodDisplay'
import AppDownload from '../../components/appDownload/AppDownload'
const Home = () => {
    const [category, setCategory] = useState('All')
    
    // console.log(category)

  return (
    <div>
      <Header />
      <FoodMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  )
}

export default Home

