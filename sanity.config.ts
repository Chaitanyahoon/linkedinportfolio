import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { colorInput } from "@sanity/color-input"
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array"

import { schema } from "./sanity/schemaTypes"

export default defineConfig({
  name: "default",
  title: "Chaitanya Portfolio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [structureTool(), visionTool(), colorInput(), imageHotspotArrayPlugin()],

  schema,
})
