import React from 'react'

const Container = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='lg:px-24 md:px-12 px-6 py-5'>
      {children}
    </div>
  )
}

export default Container