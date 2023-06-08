import { FC } from 'react';
import { Link } from 'react-router-dom';

const numQuotes = parseInt(import.meta.env.VITE_QUOTES);

const getRandQuoteIndex = () => {
  return Math.floor(Math.random() * numQuotes) + 1
}

type NavProps = {
  index: number;
  className?: string;
}

export const Component: FC<NavProps> = ({index, className = ''}) => {

  const atStart = index === 1;
  const atEnd = index === numQuotes;

  return (
    <div className={`nav ${className}`}>
      <span className={atStart ? 'at-start' : 'not-at-start'}>
        {
          atStart 
          ? "PREV"
          : <Link to={`quote/${index - 1}`}>PREV</Link>
        }
      </span>

      <span><Link to="/tags">TAGS</Link></span>
      <span><Link to={`/quote/${index}`}>PERM</Link></span>
      <span><Link to={`/quote/${getRandQuoteIndex()}`}>RAND</Link></span>
      <span><Link to="authors">AUTHORS</Link></span>
      
      <span className={atEnd ? 'at-end' : 'not-at-end'}>
        {
          atEnd
            ? "NEXT"
            : <Link to={`/quote/${index + 1}`}>NEXT</Link> 
        }
      </span>
    </div>
  )
}
