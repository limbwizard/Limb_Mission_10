import { useEffect, useState } from 'react';
import { Bowler } from '../types/Bowler';
import { Team } from '../types/Team';

function BowlerList() {
  const [bowlerData, setBowlerData] = useState<Bowler[]>([]);
  const [teamData, setTeamData] = useState<Team[]>([]);
  // Define the type for teamMap explicitly as an object with numeric keys and string values
  const [teamMap, setTeamMap] = useState<{ [key: number]: string }>({});

  // useEffect(() => {
  //   const fetchBowlerData = async () => {
  //     const rsp = await fetch('http://localhost:5152/Bowler');
  //     const b = await rsp.json();
  //     setBowlerData(b);
  //   };

  //   const fetchTeamData = async () => {
  //     const rsp = await fetch('http://localhost:5152/Team');
  //     const t = await rsp.json();
  //     setTeamData(t);
  //   };

  //   fetchBowlerData();
  //   fetchTeamData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bowlerResponse = await fetch('http://localhost:5152/Bowler');
        const bowlerData = await bowlerResponse.json();
        setBowlerData(bowlerData);

        const teamResponse = await fetch('http://localhost:5152/Team');
        const teamData = await teamResponse.json();
        setTeamData(teamData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Use reduce to transform teamData into a mapping of team IDs to team names
    const map: { [key: number]: string } = teamData.reduce<{
      [key: number]: string;
    }>(
      (acc, team) => {
        if (team.teamID && team.teamName) {
          // Ensure that teamID and teamName are not undefined
          acc[team.teamID] = team.teamName;
        }
        return acc;
      },
      {} as { [key: number]: string },
    ); // Explicitly type the initial value
    setTeamMap(map);
  }, [teamData]);

  return (
    <>
      <div className="row">
        <h4 className="text-center">This is list of bowlers</h4>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Bowler Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Phone Number</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {bowlerData.map((b) => (
            <tr key={b.bowlerID}>
              <td>
                {`${b.bowlerFirstName ?? ''} ${b.bowlerMiddleInit ?? ''} ${b.bowlerLastName ?? ''}`.trim()}
              </td>
              <td>{b.bowlerAddress ?? 'N/A'}</td>
              <td>{b.bowlerCity ?? 'N/A'}</td>
              <td>{b.bowlerState ?? 'N/A'}</td>
              <td>{b.bowlerZip ?? 'N/A'}</td>
              <td>{b.bowlerPhoneNumber ?? 'N/A'}</td>
              <td>{teamMap[b.teamID ?? 0] ?? 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default BowlerList;
