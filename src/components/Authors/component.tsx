import './styles.css';
import { FC } from 'react'
import { Link } from 'react-router-dom';
import authors from '../../assets/authors.json';

const authorsKeys = Object.keys(authors);
const alphabetizedAuthorsKeys = authorsKeys.sort((a, b) => a.localeCompare(b));

const renderTagList = () => {
  return alphabetizedAuthorsKeys.map((author) => {
    const quotes = (authors as {[key: string]: {index: number, portion: string}[]})[author];
    const quoteLinks = quotes.map((quote, index) => {
      return (<li key={index}><Link to={`/quote/${quote.index}`}>{quote.portion}</Link></li>)
    })
    return (
      <li key={author}>
        <h2>{author}</h2>
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

