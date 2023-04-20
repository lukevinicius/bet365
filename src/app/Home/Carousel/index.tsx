'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Scrollbar, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/a11y'

import { Image } from '@chakra-ui/react'

interface CarouselProps {
  banners: {
    image: string
    link: string
  }[]
}

export function Carousel({ banners }: CarouselProps) {
  return (
    <Swiper
      className="rounded-lg"
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Scrollbar, A11y]}
    >
      {banners.map((slider, index) => (
        <SwiperSlide key={index}>
          <Image
            className="w-full max-h-52 min-h-[170px]"
            src={slider.image}
            alt={slider.link}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
