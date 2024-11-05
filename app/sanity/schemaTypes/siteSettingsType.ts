import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu để trang',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Mô tả trang',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contact',
      title: 'Thông tin liên hệ',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.required().email(),
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          validation: (Rule) =>
            Rule.required().custom((phone) => {
              if (!/^\d{10}$/.test(phone || '')) {
                return 'Sđt không hợp lệ';
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: 'map',
      title: 'Map',
      type: 'url',
      options: { hotspot: true },
    }),
  ],
});
