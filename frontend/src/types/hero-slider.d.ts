declare module 'hero-slider' {
  import { ReactNode } from 'react';

  interface HeroSliderProps {
    height?: string;
    autoplay?: boolean;
    controller?: {
      initialSlide?: number;
      slidingDuration?: number;
      onSliding?: (nextSlide: number) => void;
      onBeforeSliding?: (previousSlide: number, nextSlide: number) => void;
      onAfterSliding?: (nextSlide: number) => void;
    };
    accessability?: {
      shouldDisplayButtons?: boolean;
    };
    children: ReactNode;
  }

  interface OverlayProps {
    children: ReactNode;
  }

  interface SlideProps {
    shouldRenderMask?: boolean;
    label?: string;
    background?: {
      backgroundImageSrc: string;
    };
  }

  export const HeroSlider: React.FC<HeroSliderProps>;
  export const Overlay: React.FC<OverlayProps>;
  export const Slide: React.FC<SlideProps>;
} 