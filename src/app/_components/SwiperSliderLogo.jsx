"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//import modules
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';

const SwiperSliderLogo = function () {

    return (
        <Swiper
            // slidesPerView={6}
            spaceBetween={5}

            autoplay={{
                delay: 1500,
                disableOnInteraction: false,
                waitForTransition: false,
            }}
            grabCursor={true}
            loop={true}
            modules={[EffectFade, Autoplay, Pagination, Navigation]}
            className="mySwiper custom-swiper"
            breakpoints={{
                320: { slidesPerView: 3 }, // الهواتف الصغيرة
                480: { slidesPerView: 3 }, // الهواتف المتوسطة
                768: { slidesPerView: 5 }, // التابلت
                1024: { slidesPerView: 6 }, // اللابتوب والشاشات الكبيرة
            }}
        >
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/WSB Merito Universit.png"
                        width={350} height={200}
                        alt="WSB Merito Universit"
                        className="h-32 w-48"
                    // layout='responsive'
                    />
                </div>

            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/6th of October University.png"
                        width={350} height={200}
                        alt="6th of October University"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Academy of Silesia.png"
                        width={350} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>

            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Alexander College.png"
                        width={350} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>

            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/American University of Ras Al Khaimah.png"
                        width={350} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>


            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Budapest Metropolitan University.png"
                        width={350} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>

            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Cesar Ritz Colleges.png"
                        width={350} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>

            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Charles University.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>

            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Euro-Mediterranean University (EMUNI).png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos11.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos12.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos13.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos14.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos15.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos16.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos17.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos18.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos19.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos20.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            {/* <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos21.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide> */}
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos22.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos23.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos24.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            {/* <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos25.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide> */}
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos26.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos27.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos28.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos29.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos30.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos31.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos32.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos33.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos34.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos35.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos36.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos37.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos38.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos39.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos40.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos41.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos42.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos43.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos44.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos45.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos46.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos47.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos48.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos49.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos50.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos51.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos52.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos53.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos54.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos55.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos56.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos57.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos58.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos59.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos60.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos61.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos62.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos63.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos64.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos65.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos66.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos67.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos68.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos69.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' relative'>
                    <Image
                        src="/images/LOGO/Logos70.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='relative'>
                    <Image
                        src="/images/LOGO/Logos71.png"
                        width={250} height={200}
                        alt="partners"
                        className="h-32 w-48"
                    />
                </div>
            </SwiperSlide>
        </Swiper>
    )
}
export default SwiperSliderLogo;