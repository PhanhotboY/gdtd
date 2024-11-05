import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { defineLocations, presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { colorInput } from '@sanity/color-input';

import { STUDIO_BASEPATH } from './constants';
import { projectDetails } from './projectDetails';
import schema from './schemaTypes';
import { defaultDocumentNode, structure } from './structure';

export default defineConfig({
  ...projectDetails(),
  name: 'gdtd',
  title: 'Giao duc & Thoi dai',
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/resource/preview',
        },
      },
      resolve: {
        locations: {
          record: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `/doc/${doc?.slug}`,
                },
                { title: 'Home', href: `/` },
              ],
            }),
          }),
        },
      },
    }),
    visionTool(),
    colorInput(),
  ],
  basePath: STUDIO_BASEPATH,
  schema: {
    types: schema,
  },
});
