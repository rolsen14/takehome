import { FullDropbackPlayerWithStats } from "../../types/athlete";
import { camelCaseToWords } from "../../utils/display";
import styles from "./player-card.module.css";

interface PlayerCardProps {
  playerStat: FullDropbackPlayerWithStats;
  statsToCompare: Set<string>;
}

export const PlayerCard = ({ playerStat, statsToCompare }: PlayerCardProps) => {
  return (
    <div className={styles.playerCard}>
      <div className={styles.playerCardHeader}>
        <div className={styles.team}>
          <img src={playerStat.team.image_url} />
          <span>{playerStat.team.name}</span>
        </div>
        <h3>{playerStat.name}</h3>
      </div>
      <dl className={styles.list}>
        {Array.from(statsToCompare).map((stat) => (
          <div key={stat} className={styles.row}>
            <dt>{playerStat.stats.get(stat)}</dt>
            <dd>{camelCaseToWords(stat)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
