import Together from "together-ai";
import { z } from "zod";

const together = new Together();

export async function POST(req: Request) {
  const json = await req.json();
  const result = z
    .object({
      imageUrl: z.string(),
      languages: z.array(z.string()),
      model: z.string(),
      length: z.string(),
    })
    .safeParse(json);

  if (result.error) {
    return new Response(result.error.message, { status: 422 });
  }

  const { languages, imageUrl, model, length } = result.data;

  const res = await together.chat.completions.create({
    model,
    temperature: 0.2,
    stream: false,
    messages: [
      {
        role: "user",
        // @ts-expect-error need to fix the TypeScript library type
        content: [
          {
            type: "text",
            text: `Given this product image, return a ${length} product description in each of these languages. ${languages
              .map((language) => `"${language}"`)
              .join(", ")}

            Return a JSON object in the following shape: [{language: string, description, string}...]

            It is very important for my career that you follow these instructions exactly. PLEASE ONLY RETURN JSON, NOTHING ELSE.`,
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
  });

  const descriptions = JSON.parse(res.choices[0].message?.content || "[]");
  console.log({ descriptions });

  // let textStream = res
  //   .toReadableStream()
  //   .pipeThrough(new TextDecoderStream())
  //   .pipeThrough(
  //     new TransformStream({
  //       transform(chunk, controller) {
  //         if (chunk) {
  //           try {
  //             let text = JSON.parse(chunk).choices[0].text;
  //             if (text) controller.enqueue(text);
  //           } catch (error) {
  //             console.error(error);
  //           }
  //         }
  //       },
  //     })
  //   )
  //   .pipeThrough(new TextEncoderStream());

  // return new Response(textStream, {
  //   headers: new Headers({
  //     "Cache-Control": "no-cache",
  //   }),
  // });

  return Response.json(descriptions);
}

export const runtime = "edge";
