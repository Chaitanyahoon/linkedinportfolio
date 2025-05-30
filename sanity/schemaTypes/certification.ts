import { defineField, defineType } from "sanity"

export const certificationType = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Certification Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issuing Organization",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "issueDate",
      title: "Issue Date",
      type: "date",
    }),
    defineField({
      name: "expiryDate",
      title: "Expiry Date",
      type: "date",
      description: "Leave empty if certification does not expire",
    }),
    defineField({
      name: "credentialId",
      title: "Credential ID",
      type: "string",
    }),
    defineField({
      name: "credentialUrl",
      title: "Credential URL",
      type: "url",
    }),
    defineField({
      name: "logo",
      title: "Issuer Logo",
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
      issuer: "issuer",
      media: "logo",
    },
    prepare(selection) {
      const { title, issuer, media } = selection
      return {
        title,
        subtitle: issuer,
        media,
      }
    },
  },
})
