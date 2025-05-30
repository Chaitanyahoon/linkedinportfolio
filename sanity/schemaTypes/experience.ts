import { defineField, defineType } from "sanity"

export const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Leave empty if currently working",
    }),
    defineField({
      name: "current",
      title: "Currently Working",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "skills",
      title: "Skills Used",
      type: "array",
      of: [{ type: "string" }],
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
      company: "company",
      startDate: "startDate",
    },
    prepare(selection) {
      const { title, company, startDate } = selection
      return {
        title,
        subtitle: `${company} - ${new Date(startDate).getFullYear()}`,
      }
    },
  },
})
