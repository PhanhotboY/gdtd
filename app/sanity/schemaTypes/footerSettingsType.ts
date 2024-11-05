import { defineType, defineField } from 'sanity';

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Footer Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'title',
      title: 'Footer Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footer1',
      title: 'Footer 1',
      type: 'blockContent',
    }),
    defineField({
      name: 'footer2',
      title: 'Footer 2',
      type: 'blockContent',
    }),
  ],
});
