import { useParams } from 'react-router-dom';
import type { ViewPostRouteParams } from '../../lib/routes';

export const ViewPostPage = () => {
  const { postNick } = useParams() as ViewPostRouteParams;
  return (
    <div>
      <h1>{postNick}</h1>
      <p>Description of post 1...</p>
      <div>
        <p>Text paragraf 1 of post 1...</p>
        <p>Text paragraf 2 of post 1...</p>
        <p>Text paragraf 3 of post 1...</p>
      </div>
    </div>
  );
};
