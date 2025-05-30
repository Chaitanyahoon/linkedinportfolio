import imageUrlBuilder from "@sanity/image-url"
import type { Image } from "sanity"

import { dataset, projectId } from "../env"

const imageBuilder = imageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
})

export const urlForImage = (source: Image | undefined) => {
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto("format").fit("max")
}

export function resolveOpenGraphImage(image: Image | undefined, width = 1200, height = 627) {
  if (!image) return undefined
  const url = urlForImage(image)?.width(1200).height(627).fit("crop").url()
  if (!url) return undefined
  return { url, alt: image?.alt || "", width, height }
}
