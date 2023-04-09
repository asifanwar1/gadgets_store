import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import Banner from 'components/Banner'
import AboutUs from 'components/AboutUs'
import ProductsCarousel from 'components/ProductsCarousel';
import ContactUs from 'components/ContactUs';
import Footer from 'components/Footer';
import { useSession, signIn, signOut } from "next-auth/react"
import MainNavbar from 'components/MainNavbar';


const inter = Inter({ subsets: ['latin'] })

export default function Home({products}) {
  // console.log(products)
  
  return (
    <>
      <Head>
        <title>Gadgets Galore</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <nav>
        <MainNavbar/>
      </nav>
      <section>
        <ProductsCarousel/>
      </section>
      <section>
        <Banner props={products}/>
      </section>
      <section>
        <AboutUs/>
      </section>
      <section>
        <ContactUs/> 
      </section>
      <section>
        <Footer/>
      </section>
    </>
  )
}



export async function getServerSideProps(){
  const {API_URL} = process.env;

  const res = await axios.get(`${API_URL}/api/products`);

  const data = await res.data;
  
  return {
    props: {
      products: data.data
    },
  }
}


// export async function getServerSideProps(){
 
//   const {API_URL} = process.env;
 
//   const res = await axios.get(`${API_URL}/api/banner-images`);
 
//   const data = await res.data;

//   return {
//     props: {
//       bannerimages: data
//     },
//   }
// }
