import { defineField, defineType } from "sanity"

export const skillType = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Database", value: "database" },
          { title: "DevOps", value: "devops" },
          { title: "Mobile", value: "mobile" },
          { title: "Design", value: "design" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "proficiency",
      title: "Proficiency Level",
      type: "number",
      validation: (rule) => rule.required().min(1).max(5),
      description: "Rate from 1 (Beginner) to 5 (Expert)",
    }),
    defineField({
      name: "icon",
      title: "Skill Icon",
      type: "image",
      options: {
        hotspot: true,
      },
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
      title: "name",
      category: "category",
      proficiency: "proficiency",
      media: "icon",
    },
    prepare(selection) {
      const { title, category, proficiency, media } = selection
      return {
        title,
        subtitle: `${category} - Level ${proficiency}`,
        media,
      }
    },
  },
})
