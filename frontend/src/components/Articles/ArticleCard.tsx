import {ReactElement} from 'react'
import { Article } from '../../model/Article';

type Props = {
    article: Article;
}

export const ArticleCard = (props: Props): ReactElement => {
  return <div>{props.article.title}</div>;
};

