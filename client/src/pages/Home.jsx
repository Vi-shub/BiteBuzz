import React from 'react'
import Header from '../components/Header'
import RecommededFood from '../components/RecommededFood'
import Service from '../components/Service'
import NewFoods from '../components/NewFoods'
import Service2 from '../components/Service2'
import Special from '../components/Special'

const Home = () => {
  return (
    <>
    <Header />
    <RecommededFood />
    <Service />
    <NewFoods />
    <Service2 />
    <Special />
    </>
  )
}

export default Home