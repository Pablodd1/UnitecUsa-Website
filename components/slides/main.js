'use client'
import React from 'react'
import { DotButton, useDotButton } from './dots'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './buttons'
import useEmblaCarousel from 'embla-carousel-react'
import './css/embla.css'
import ProductItem from 'My_UI/product/item'

const EmblaCarousel = (props) => {
    const { slides = [], options = {} } = props
    
    // Handle empty or invalid slides
    if (!slides || !Array.isArray(slides) || slides.length === 0) {
        return null
    }

    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <section className={`embla py-4`}>
            <div className={`px-4 md:px-10 embla__viewport`} ref={emblaRef}>
                <ul className="embla__container">
                    {slides.map((item, i) => (
                        <li key={item?.id || i} className="embla__slide pl-6">
                            <ProductItem isSlides item={item} index={i} />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="embla__controls px-4 md:px-10 mt-4">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

            </div>
        </section>
    )
}

export default EmblaCarousel
