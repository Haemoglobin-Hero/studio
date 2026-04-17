'use server';
/**
 * @fileOverview A Genkit flow to generate comprehensive product descriptions and specifications based on basic product details.
 *
 * - generateProductDescription - A function that handles the product description generation process.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  category: z
    .string()
    .describe('The category of the product (e.g., Gadget, Lighting, Accessory).'),
  keyFeatures: z.array(z.string()).describe('A list of key features for the product.'),
});
export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A comprehensive, engaging, and SEO-optimized product description.'),
  specifications: z
    .string()
    .describe('Detailed product specifications, formatted clearly (e.g., bullet points or a table).'),
});
export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in creating compelling and SEO-optimized product descriptions and detailed specifications for electronics products. Your task is to generate both a comprehensive product description and a structured list of specifications for a product based on the provided name, category, and key features.

The description should be engaging, highlight benefits, and encourage purchase.
The specifications should be clear, concise, and easy to read.

Product Name: {{{productName}}}
Category: {{{category}}}
Key Features:
{{#each keyFeatures}}
- {{{this}}}
{{/each}}
`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
