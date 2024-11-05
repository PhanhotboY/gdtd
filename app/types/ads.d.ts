import { PortableTextBlock } from '@portabletext/react';

export interface IAds {
  banner1: Banner;
  banner2: Banner;
  banner3: Banner;
  ads1: Array<PortableTextBlock>;
  ads2: Array<PortableTextBlock>;
}

interface Banner {
  alt: string;
  link: string;
  src: string;
}
