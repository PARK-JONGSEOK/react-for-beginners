import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      setMovie(json.data.movie);
      setLoading(false);
    };
    getDetail();
  }, [id]);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.large_cover_image} alt={movie.title} />
          <h1>Detail</h1>
          <h2>{movie.title}</h2>
          <h3>{movie.description_full}</h3>
        </div>
      )}
    </div>
  );
}

export default Detail;
