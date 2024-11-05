import {
  Newspaper,
  Home,
  Tag,
  Tags,
  Users,
  PanelBottom,
  FileSpreadsheet,
} from 'lucide-react';
import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/structure';

// import OGPreview from '~/sanity/components/OGPreview';
// import { resolveOGUrl } from '~/sanity/structure/resolveOGUrl';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .id('content')
    .items([
      // Singleton document for Site Settings
      S.listItem()
        .title('Site Settings')
        .icon(Home) // You can change the icon as you wish
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.listItem()
        .title('Footer Settings')
        .icon(PanelBottom)
        .child(
          S.editor()
            .id('footerSettings')
            .schemaType('footerSettings')
            .documentId('footerSettings')
            .title('Footer Settings')
        ),

      // Divider
      S.divider(),

      // Ads section
      S.listItem()
        .title('Ads')
        .icon(Newspaper) // Using Lucide's Disc icon
        .schemaType('ads')
        .child(S.editor().schemaType('ads').documentId('ads').title('Ads')),

      // Articles section
      S.listItem()
        .title('Articles')
        .icon(FileSpreadsheet) // Using Lucide's Disc icon
        .schemaType('article')
        .child(S.documentTypeList('article').title('Articles')),

      // Authors section
      S.listItem()
        .title('Authors')
        .icon(Users) // Using Lucide's Users icon
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),

      // Categories section
      S.listItem()
        .title('Categories')
        .icon(Tag) // Using Lucide's Tags icon
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),

      S.listItem()
        .title('HashTags')
        .icon(Tags) // Using Lucide's Tags icon
        .schemaType('hashtag')
        .child(S.documentTypeList('hashtag').title('HashTags')),
    ]);

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, documentId }
) => {
  // const OGPreviewView = S.view
  //   .component(OGPreview)
  //   .options({
  //     url: resolveOGUrl(documentId),
  //   })
  //   .title('OG Preview');

  // switch (schemaType) {
  //   case `home`:
  //     return S.document().views([S.view.form()]);
  //   case `article`:
  //     return S.document().views([S.view.form(), OGPreviewView]);
  //   default:
  return S.document().views([S.view.form()]);
  // }
};
