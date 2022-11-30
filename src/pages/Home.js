import React, { useEffect, useState } from 'react';

const Home = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers();
  }, []);

  async function getMembers() {
    const result = await fetch('api/members');
    const json = await result.json();

    setMembers(json);
  }

  return (
    <div>
      <section class="hero is-dark-green is-medium is-bold">
        <div class="hero-head">
          <div
            class="navbar"
            id="navbar"
            hx-get="navbar.html"
            hx-trigger="load"
            hx-swap="outerHTML"
          ></div>
        </div>
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">FHS Investment Club</h1>
            <p class="subtitle has-text-white">
              The Franklin High School Investment Club
            </p>
          </div>
        </div>
      </section>
      <div class="box">
        <div class="container has-text-centered">
          <span>The club meets every Monday from 3 - 4 PM in room 706</span>
        </div>
      </div>
      <div className="container">
        <div className="columns is-multiline">
          {members.map((member) => (
            <div class="column is-4">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by-3">
                    <img src="" alt="" />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">
                        {member.firstName} {member.lastName}
                      </p>
                      <p class="subtitle is-5">{member.title}</p>
                    </div>
                  </div>
                  <div class="content">
                    {member.pick ? (
                      <div>
                        <p className="subtitle is-6">
                          {member.firstName}'s Pick: <b>{member.pick}</b>
                        </p>
                        <hr />
                        <p>
                          Previous Close: {parseFloat(member.previousClose)}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <i>No Pick</i>
                        <span> </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
