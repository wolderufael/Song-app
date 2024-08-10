import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About this web app</h1>
      <p>
        This is a song management web app developed by &nbsp;
        <b>wolderufael kassahun</b>. It is developed using MERN(MongoDb,
        Express, React and Node) Stack. a user can create,read,update and delete a song from it. <b style={{color: 'green'}}>Spotify API</b> is used to fetch top hits of every artist.
      </p>
    </div>
  );
};

export default About;
