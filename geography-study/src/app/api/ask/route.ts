import { NextResponse } from 'next/server';

const books=[
  {name:'Grade 10 Geography',pages:169},
  {name:'Grade 11 Geography',pages:168}
];

export async function POST(req:Request){
  const {query=''}=await req.json();
  const q=String(query).trim().toLowerCase();

  let answer='I can help you study this Geography topic. Connect the textbook indexes and an LLM/RAG provider to generate fully grounded answers with exact passages and page citations.';
  if(q.includes('population density')) answer='Population density is the number of people living in a unit area of land, commonly expressed as people per square kilometre.';
  if(q.includes('monsoon')) answer='Monsoon winds are seasonal winds whose direction changes between seasons and strongly influence rainfall patterns.';
  if(q.includes('agriculture')) answer='Agriculture can be studied through farming systems, crops, land use, inputs, purpose, scale and environmental conditions.';

  return NextResponse.json({
    answer,
    sources: [],
    sourceBooks: books.map(b=>({book:b.name,pages:b.pages}))
  });
}
