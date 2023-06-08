import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { YamlData } from '../../types/yaml';


type QuoteViewerProps = {
    yaml: YamlData;
    markdown: string;
}

export const Component: FC<QuoteViewerProps> = ({ yaml, markdown }) => {
    return (
      <>
        <div className="card">
          <div className="source-data">
            { yaml.author && <span className="author">{yaml.author}</span> }
            { yaml.description && <span className="">{yaml.description}</span> }
            { yaml.source && <span className="source">from <i>{yaml.source}</i></span> }
            { yaml.context && <span className="context">{yaml.context}</span> }
            { yaml.date && <span className="date">{yaml.date}</span> }
            { yaml.meta && <span className="meta">{yaml.meta}</span> }
          </div>
          <ReactMarkdown className="quotation">{markdown}</ReactMarkdown>
        </div>
      </>
    )
}
