import { defineField, defineType } from "sanity"

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Full Stack", value: "fullstack" },
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Mobile", value: "mobile" },
          { title: "WebAR", value: "webar" },
          { title: "SaaS", value: "saas" },
          { title: "FinTech", value: "fintech" },
          { title: "IoT", value: "iot" },
          { title: "E-commerce", value: "ecommerce" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "projectUrl",
      title: "Project URL",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      category: "category",
    },
    prepare(selection) {
      const { title, media, category } = selection
      return {
        title,
        subtitle: category,
        media,
      }
    },
  },
})
