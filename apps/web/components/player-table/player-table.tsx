import { Dispatch, SetStateAction } from "react";
import { FullDropbackPlayer } from "../../types/athlete";
import styles from "./player-table.module.css";

interface PlayerTableProps {
  players: FullDropbackPlayer[];
  selectedPlayerIds: number[];
  setSelectedPlayerIds: Dispatch<SetStateAction<number[]>>;
}

export const PlayerTable = ({
  players,
  selectedPlayerIds,
  setSelectedPlayerIds,
}: PlayerTableProps) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    toggleSelection(checked, Number(value));
  };

  const toggleSelection = (select: boolean, toSelect: number) => {
    if (select) {
      setSelectedPlayerIds((previousIds: number[]) => [
        ...previousIds,
        toSelect,
      ]);
    } else {
      setSelectedPlayerIds((previousIds) =>
        previousIds.filter((id) => id !== toSelect)
      );
    }
  };

  return (
    <div className={styles.playerTable}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Team</th>
            <th>Jersey</th>
            <th>Position</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr
              key={player.id}
              onClick={() => {
                const selected = selectedPlayerIds.includes(player.id);
                toggleSelection(!selected, player.id);
              }}
            >
              <td className="checkboxCell">
                <input
                  value={player.id}
                  checked={selectedPlayerIds.includes(player.id)}
                  onChange={handleCheckboxChange}
                  type="checkbox"
                />
              </td>
              <td>{player.name}</td>
              <td className={styles.team}>
                <img src={player.team.image_url} />
                <span>{player.team.name}</span>
              </td>
              <td>#{player.jersey_number}</td>
              <td>{player.position}</td>
              <td>{player.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
