import InfoCTA from '@/app/components/infocta'
import Mission from '@/app/components/mission'
import History from '@/app/components/story'
import CoreValues from '@/app/components/values'
import Vision from '@/app/components/vision'
import WhyChooseUs from '@/app/components/why2'
import React from 'react'

function page() {
  return (
     <div className='flex flex-col items-center max-w-6xl gap-8 mt-20  mx-auto'>
        <History/>
        <Mission/>
        <Vision/>
        <CoreValues/>
        <WhyChooseUs/>
        <InfoCTA/>
    </div>
  )
}

export default page