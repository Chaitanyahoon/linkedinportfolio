import type { SchemaTypeDefinition } from "sanity"

import { projectType } from "./project"
import { experienceType } from "./experience"
import { certificationType } from "./certification"
import { skillType } from "./skill"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, experienceType, certificationType, skillType],
}
