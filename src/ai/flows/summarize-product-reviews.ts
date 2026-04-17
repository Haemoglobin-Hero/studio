'use server';
/**
 * @fileOverview A Genkit flow for summarizing product reviews.
 *
 * - summarizeProductReviews - A function that handles the summarization of product reviews.
 * - SummarizeProductReviewsInput - The input type for the summarizeProductReviews function.
 * - SummarizeProductReviewsOutput - The return type for the summarizeProductReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProductReviewsInputSchema = z.object({
  reviews: z
    .array(z.string())
    .describe('An array of product reviews to summarize.'),
});
export type SummarizeProductReviewsInput = z.infer<
  typeof SummarizeProductReviewsInputSchema
>;

const SummarizeProductReviewsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'An AI-generated summary of the product reviews, highlighting overall sentiment and key feedback points.'
    ),
});
export type SummarizeProductReviewsOutput = z.infer<
  typeof SummarizeProductReviewsOutputSchema
>;

export async function summarizeProductReviews(
  input: SummarizeProductReviewsInput
): Promise<SummarizeProductReviewsOutput> {
  return summarizeProductReviewsFlow(input);
}

const summarizeProductReviewsPrompt = ai.definePrompt({
  name: 'summarizeProductReviewsPrompt',
  input: {schema: SummarizeProductReviewsInputSchema},
  output: {schema: SummarizeProductReviewsOutputSchema},
  prompt: `You are an expert product review analyst. Your task is to read a collection of product reviews and provide a concise summary that captures the overall sentiment (positive, negative, neutral) and highlights the most important feedback points, both positive and negative. The summary should be easy to read and understand.

Here are the product reviews:

{{#each reviews}}
- {{{this}}}
{{/each}}

Please provide the summary in the following JSON format: {"summary": "Your summary here"}`,
});

const summarizeProductReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeProductReviewsFlow',
    inputSchema: SummarizeProductReviewsInputSchema,
    outputSchema: SummarizeProductReviewsOutputSchema,
  },
  async (input) => {
    const {output} = await summarizeProductReviewsPrompt(input);
    return output!;
  }
);
