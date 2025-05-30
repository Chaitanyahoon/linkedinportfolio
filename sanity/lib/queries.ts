import { groq } from "next-sanity"

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    "image": image.asset->url,
    category,
    technologies,
    projectUrl,
    githubUrl,
    featured,
    order
  }
`

export const experiencesQuery = groq`
  *[_type == "experience"] | order(order asc, startDate desc) {
    _id,
    title,
    company,
    startDate,
    endDate,
    current,
    description,
    skills,
    order
  }
`

export const certificationsQuery = groq`
  *[_type == "certification"] | order(order asc, issueDate desc) {
    _id,
    name,
    issuer,
    issueDate,
    expiryDate,
    credentialId,
    credentialUrl,
    "logo": logo.asset->url,
    order
  }
`

export const skillsQuery = groq`
  *[_type == "skill"] | order(category asc, order asc) {
    _id,
    name,
    category,
    proficiency,
    "icon": icon.asset->url,
    order
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    "image": image.asset->url,
    category,
    technologies,
    projectUrl,
    githubUrl,
    featured,
    order
  }
`
