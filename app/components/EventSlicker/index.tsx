import { type RefObject, useRef } from 'react';
import Slider from 'react-slick';
import { Link } from '@remix-run/react';

import './index.css';
import {
  RiArrowLeftSFill,
  RiArrowRightSFill,
  RiFlashlightFill,
} from '@remixicon/react';
import Hydrated from '../Hydrated';
// @ts-ignore
const SliderComponent = !!Slider.default ? Slider.default : Slider;

export default function EventSlicker({
  hashtags = [],
}: {
  hashtags: Array<{ slug: string; title: string }>;
}) {
  let sliderRef = useRef<Slider>(null);
  const next = () => {
    // @ts-ignore
    sliderRef.slickNext();
  };
  const previous = () => {
    // @ts-ignore
    sliderRef.slickPrev();
  };

  const settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    variableWidth: true,
    pauseOnHover: true,
  };

  return (
    <Hydrated>
      <div className='max-md:py-2 max-md:px-2 max-md:bg-[--main-color] flex items-center justify-between font-bold text-lg'>
        <div className='flex text-white md:text-[--main-color]'>
          <RiFlashlightFill size={24} />
          <Link to='/' className='hidden md:block'>
            Sự kiện
          </Link>
        </div>

        <div className='max-md:grow md:w-[85%] overflow-hidden'>
          <SliderComponent
            className={`slider`}
            ref={(slider: Slider) => {
              sliderRef = slider as any as RefObject<Slider>;
            }}
            {...settings}
          >
            {hashtags.map((hashtag, i) => (
              <div
                className='flex flex-col items-center justify-center'
                key={i}
              >
                <Link
                  className='px-2 text-xs font-normal text-white md:text-[--sub5-text-color] hover:text-[--sub6-text-color]'
                  to={`/chu-de/${hashtag.slug}`}
                  title={hashtag.title}
                  draggable={false}
                >
                  #{hashtag.title}
                </Link>
              </div>
            ))}
          </SliderComponent>
        </div>

        <div className='hidden md:flex text-center text-[--main-color] items-center justify-between'>
          <button className='button' onClick={previous} title='Trước'>
            <RiArrowLeftSFill />
          </button>
          <button className='button' onClick={next} title='Tiếp'>
            <RiArrowRightSFill />
          </button>
        </div>
      </div>
    </Hydrated>
  );
}
