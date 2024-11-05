import { defineType, defineField, Rule } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Bài báo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Tác giả',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Ngày đăng',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Danh mục',
      type: 'reference',
      to: { type: 'category' },
    }),
    defineField({
      name: 'excerpt',
      title: 'Tóm tắt',
      type: 'text',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'body',
      title: 'Nội dung',
      type: 'blockContent',
    }),
    defineField({
      name: 'hashtags',
      title: 'Hashtags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'hashtag' }], // Reference to the hashtag schema
        },
      ],
    }),
    defineField({
      name: 'views',
      type: 'number',
      title: 'View Count',
      initialValue: 0, // Start at 0 views
      readOnly: true, // This field is read-only
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author.name',
      media: 'thumbnail',
    },
  },
});
