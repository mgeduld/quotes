import { useState, useEffect } from 'react'
import { YamlData } from '../types/yaml'
import metadataParser from 'markdown-yaml-metadata-parser';

const numQuotes = parseInt(import.meta.env.VITE_QUOTES);
const daysSinceEpoch = Math.floor((Date.now() / 86400000) + 1);

const getQuoteIndex = (pageIndex: number | undefined) => {
  if (pageIndex) {
    return pageIndex;
  }

  return daysSinceEpoch % numQuotes + 1;
}

const zeroPad = (num: number) => {
  return num.toString().padStart(4, '0');
}

export const useGetQuote = (pageIndex: number | undefined) => {
  const [yaml, setYaml] = useState<null | YamlData>(null)
  const [markdown, setMarkdown] = useState<null |  string>(null)
  const quoteIndex = getQuoteIndex(pageIndex);
  const zeroPaddedIndex = zeroPad(quoteIndex);

  useEffect(() => {
    
    (async () => {
      try {
        const fetchResult = await fetch(`/quotes/quotes/quote${zeroPaddedIndex}.md`)
        const quoteFileContents = await fetchResult.text()
        const fileParts = metadataParser(quoteFileContents)
        setYaml(fileParts.metadata);
        setMarkdown(fileParts.content);
      } catch (e) {
        console.error(e);
      }
    })()
  }, [zeroPaddedIndex])

  return { yaml, markdown, index: quoteIndex }
}