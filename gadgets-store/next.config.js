/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   loader:'cloudinary',
  //   domains: ['res.cloudinary.com'],
  //   // path: 'https://res.cloudinary.com/dgcrcj5sr/image/upload'
  // }

}


module.exports = {
  env:{
    API_URL: process.env.API_URL
  },

  nextConfig
} 
