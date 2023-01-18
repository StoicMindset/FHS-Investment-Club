import React, { useEffect, useState } from 'react';

const Home = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMembers();
  }, []);

  async function getMembers() {
    const result = await fetch('api/members');
    const json = await result.json();

    setMembers(json);
    setLoading(false);
  }

  return (
    <div>
      <section className="hero is-dark-green is-medium is-bold">
        <div className="hero-head">
          <div
            className="navbar"
            id="navbar"
            hx-get="navbar.html"
            hx-trigger="load"
            hx-swap="outerHTML"
          ></div>
        </div>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">FHS Investment Club</h1>
            <p className="subtitle has-text-white">
              A Chapter of Young Investors' Society
            </p>
          </div>
        </div>
      </section>
      <div className="box">
        <div className="container has-text-centered">
          <span>Meetings every Monday from 3 - 4 PM in room 706.</span>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <div className="loading">
            <div className="has-text-centered">
              <div className="title">Loading member data...</div>
              <progress
                className="progress is-small"
                max="100"
                style={{ margin: 'auto', width: '50%' }}
              >
                50%
              </progress>
            </div>
          </div>
        ) : (
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Pick</th>
                <th>Current</th>
                <th>High</th>
                <th>Low</th>
                <th>Percentage Change</th>
              </tr>
            </thead>
            <tbody>{members.map((member) => getMemberRow(member))}</tbody>
          </table>
        )}
      </div>
    </div>
  );

  function getMemberRow(member) {
    if (member.pick) {
      return (
        <tr>
          <td>
            {member.firstName} {member.lastName}{' '}
            {member.title ? ` - ${member.title}` : ''}
          </td>
          <td>{member.pick}</td>
          <td>{member.quote.c.toFixed(2)}</td>
          <td>{member.quote.h.toFixed(2)}</td>
          <td>{member.quote.l.toFixed(2)}</td>
          {member.quote.dp > 0 ? (
            <td className="has-text-primary">
              <b>+{member.quote.dp.toFixed(2)}%</b>
            </td>
          ) : (
            <td className="has-text-danger">
              <b>{member.quote.dp.toFixed(2)}%</b>
            </td>
          )}
        </tr>
      );
    } else {
      return (
        <tr>
          <td>
            {member.firstName} {member.lastName}{' '}
            {member.title ? ` - ${member.title}` : ''}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
  }
};

export default Home;
