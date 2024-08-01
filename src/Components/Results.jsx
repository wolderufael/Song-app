import Song from "./Song";

const Results = ({ songs=[]}) => {
  return (
    <div className="search-to-be">
      <h1>List of All Songs</h1>
      {!songs.length ? (
        <h1>No Songs Found!</h1>
      ) : (
        songs.map((song) => {
          return (
            <Song
              title={song.title}
              artist={song.artist}
              album={song.album}
              genre={song.genre}
              id={song._id}
              key={song._id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
