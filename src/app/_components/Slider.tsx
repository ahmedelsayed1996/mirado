import Image from 'next/image'
import React from 'react'

function Slider() {
  return (
    <div className="flex gap-5 px-12 py-8 bg-[#002E65]  max-md:px-5 overflow-scroll cursor-pointer">
      {/* <Image
        src="/images/adobe.svg"
        width={250} height={250}
        alt="partners"
        className=" aspect-[2.7]"
      />  */}
      <Image
        src="/images/LOGO/Alexander College.png"
        width={250} height={250}
        alt="partners"
        className=" aspect-[2.7]"
      />
      <Image
        src="/images/LOGO/American University of Ras Al Khaimah.png"
        width={250} height={250}
        alt="partners"
        className=" aspect-[2.7]"
      />
      <Image
        src="/images/LOGO/Anglo-Continental School of English.png"
        width={250} height={250}
        alt="partners"
        className=" aspect-[2.7]"
      />
      <Image
        src="/images/LOGO/Apollo Language Centre.png"
        width={250} height={250}
        alt="partners"
        className=" aspect-[2.7]"
      />
      <Image
        src="/images/LOGO/Bayswater College.png"
        width={250} height={250}
        alt="partners"
        className=" aspect-[2.7]"
      />
      <Image
        src="/images/LOGO/Bell English London.png"
        width={250} height={250}
        alt="partners"
        className=" aspect-[2.7]"
      />
      <Image
        src="/images/LOGO/6th of October University.png"
        width={250} height={250}
        alt="partners"
        className=" aspect-[2.7]"
      />
    </div>
  )
}

export default Slider
