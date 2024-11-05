import { defineType, defineField, Rule } from 'sanity';

export const ads = defineType({
  name: 'ads',
  title: 'Ads',
  type: 'document',
  fields: [
    defineField({
      name: 'banner1',
      title: 'Banner 1',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'link',
          title: 'Link',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'banner2',
      title: 'Banner 2',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'link',
          title: 'Link',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'banner3',
      title: 'Banner 3',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'link',
          title: 'Link',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'ads1',
      title: 'Ads 1',
      type: 'blockContent',
    }),
    defineField({
      name: 'ads2',
      title: 'Ads 2',
      type: 'blockContent',
    }),
  ],
});
