import { defineType, defineField } from 'sanity';

export const hashtag = defineType({
  name: 'hashtag',
  title: 'Hashtag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Hashtag',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Hiển thị trên URL (tạo tự động)',
      options: {
        source: 'title',
        maxLength: 200,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'none',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: `#${title}`,
      };
    },
  },
});
