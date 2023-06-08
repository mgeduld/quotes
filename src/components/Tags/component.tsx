import './styles.css';
import { FC } from 'react'
import { Link } from 'react-router-dom';
import tags from '../../assets/tags.json';

const tagKeys = Object.keys(tags);
const alphabetizedTagKeys = tagKeys.sort((a, b) => a.localeCompare(b));

const renderTagList = () => {
  return alphabetizedTagKeys.map((tag) => {
    const quotes = (tags as {[key: string]: {index: number, author: string}[]})[tag];
    const quoteLinks = quotes.map((quote, index) => {
      return (<li key={index}><Link to={`/quote/${quote.index}`}>{quote.author}</Link></li>)
    })
    return (
      <li key={tag}>
        <h2>{tag}</h2>
        <ul>
          {quoteLinks}
        </ul>
      </li>
    )
  });
};

export const Component: FC = () => {
    return (
      <div className="index-list">
        <ul>{renderTagList()}</ul>
      </div>
    )
}
