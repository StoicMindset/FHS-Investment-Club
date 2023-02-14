import { useEffect, useState } from 'preact/hooks';

const Picks = () => {
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPicks();
  }, []);

  async function getPicks() {
    const response = await fetch('/api/picks');
    const data = await response.json();

    setPicks(data);
    setLoading(false);
  }

  return (
    <div>
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
        <div className="table-container">
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
            <tbody>{picks.map((member) => getMemberRow(member))}</tbody>
          </table>
        </div>
      )}
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

export default Picks;
