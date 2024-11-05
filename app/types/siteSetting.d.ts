import { PortableTextBlock } from '@portabletext/react';

export interface ISiteSetting {
  title: string;
  description: string;
  logoUrl: string;
  faviconUrl: string;
  contact: {
    email: string;
    phone: string;
  };
  footerSettings: {
    title: string;
    logoUrl: string;
    footer1: Array<PortableTextBlock>;
    footer2: Array<PortableTextBlock>;
  };
  hasMap: boolean;
  mapUrl: string;
}
