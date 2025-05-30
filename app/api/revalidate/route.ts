import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

export async function POST(request: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current?: string }
    }>(request, process.env.SANITY_REVALIDATE_SECRET)

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 })
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 })
    }

    // Revalidate based on the document type
    switch (body._type) {
      case "project":
        revalidateTag("projects")
        break
      case "experience":
        revalidateTag("experiences")
        break
      case "skill":
        revalidateTag("skills")
        break
      case "certification":
        revalidateTag("certifications")
        break
      default:
        // Revalidate all if we don't know the type
        revalidateTag("projects")
        revalidateTag("experiences")
        revalidateTag("skills")
        revalidateTag("certifications")
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    })
  } catch (error: any) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }
}
