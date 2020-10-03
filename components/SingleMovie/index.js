import { useRouter } from 'next/router'
import CommentAdd from '../CommentAdd';

export default function SingleMovie({ movie }) {
  return (
    <>
      <div>
        <h1>Film info</h1>
        <h2>Title: { movie.title }</h2>
        <div>
          <h4>genres</h4>
          <ul>
            {movie.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
          </ul>
        </div>
        <p>{ movie.overview }</p>
      </div>  
      <hr />

      <CommentAdd movieId={movie.id}/>
    </>
  )
}
