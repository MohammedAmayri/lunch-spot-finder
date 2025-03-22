import React, { useState, useEffect, useCallback } from "react";
import {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType
} from "embla-carousel";
import { useEmblaCarousel } from "embla-carousel-react";
import {
  ArrowLeft,
  ArrowRight,
  Dot,
  ImageIcon,
  Placeholder
} from "lucide-react";

interface Props {
  slides: {
    id: number;
    src: string;
    alt: string;
  }[];
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
}

const Carousel = ({ slides, options = {}, plugins = [] }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", handleSelect);
    emblaApi.on("init", handleSelect);
  }, [emblaApi, setScrollSnaps]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative min-w-full flex items-center justify-center h-64 md:h-96"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="absolute w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/20" />
              <h3 className="relative text-2xl md:text-4xl text-white font-bold z-10">
                {slide.alt}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-10">
        <button
          className="bg-white/80 text-gray-800 rounded-full p-2 hover:bg-white hover:scale-105 transition-transform duration-200 disabled:opacity-50"
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-10">
        <button
          className="bg-white/80 text-gray-800 rounded-full p-2 hover:bg-white hover:scale-105 transition-transform duration-200 disabled:opacity-50"
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
        >
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`rounded-full transition-colors duration-200 ${
              selectedIndex === index
                ? "bg-brand-500"
                : "bg-gray-300 hover:bg-gray-400"
            } w-3 h-3`}
            onClick={() => scrollTo(index)}
          >
            <Dot size={12} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
