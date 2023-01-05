import {ReactNode, useRef} from 'react';
import {Image, ImageProps} from '@mantine/core';
import {Carousel, CarouselProps} from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface ICarouselProps extends CarouselProps {
  contents?: {id: string; content: ReactNode}[];
  className?: string;
  images?: string[];
  imageProps?: ImageProps;
  autoPlay?: number;
}

/**
 * An customizable Carousel component.
 *___
 * @param images array of urls or imported asset images for a slide of images.
 * @param imageProps custom props for `images`. It will be useless when render customize content with `contents`.
 * @param contents allow to fully customizable the Carousel's contents, which is higher priority than `images`.
 * @param autoPlay miliseconds between each time the Carousel auto next slide. `0` or `undefined` means no autoplay.
 *
 * @param carouselConfig override default config of this Carousel component. ref: [docs](https://mantine.dev/others/carousel/).
 *
 * @default carouselConfig: {loop: true, withIndicators: true, slideSize: "50%", slideGap: "xl", align: "center"}
 */
const CarouselFull = ({
  contents,
  images,
  imageProps,
  autoPlay,
  ...carouselConfig
}: ICarouselProps) => {
  const {current: autoplayPlugin} = useRef(autoPlay ? Autoplay({delay: autoPlay}) : undefined);

  const renderImageSlides = images?.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} withPlaceholder {...imageProps} imageProps={{loading: 'lazy'}} />
    </Carousel.Slide>
  ));

  const renderCustomSlides = contents?.map(({id, content}) => (
    <Carousel.Slide key={id}>{content}</Carousel.Slide>
  ));

  return (
    <Carousel
      classNames={{
        root: 'group',
        indicator: 'h-2 w-2 transition-[width] data-[active]:w-5',
        controls: 'opacity-0 transition-opacity group-hover:opacity-100',
      }}
      withIndicators
      loop
      align="center"
      slideGap="sm"
      {...carouselConfig}
      {...(autoplayPlugin
        ? {
            plugins: [autoplayPlugin],
            onMouseEnter: autoplayPlugin.stop,
            onMouseLeave: autoplayPlugin.reset,
          }
        : {})}
    >
      {contents ? renderCustomSlides : renderImageSlides}
    </Carousel>
  );
};

export default CarouselFull;
