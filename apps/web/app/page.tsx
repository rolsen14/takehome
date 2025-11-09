"use client";

import { Button } from "@takehome/ui/button";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PlayerCard } from "../components/comparison/player-card";
import Loading from "../components/loading/loading";
import { PlayerTable } from "../components/player-table/player-table";
import {
  FullDropbackPlayer,
  FullDropbackPlayerWithStats,
} from "../types/athlete";
import { PlayerStatForChart } from "../types/stat";
import { BLUE_SHADES, camelCaseToWords } from "../utils/display";
import { comparePlayers, getPlayers } from "./api/actions";
import styles from "./page.module.css";

export default function Home() {
  const [players, setPlayers] = useState<FullDropbackPlayer[]>();
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<number[]>([]);
  const [playerStats, setPlayerStats] =
    useState<FullDropbackPlayerWithStats[]>();
  const [playerStatsForChart, setPlayerStatsForChart] =
    useState<PlayerStatForChart[]>();
  const [statsToCompare, setStatsToCompare] = useState<Set<string>>();

  const handleClear = () => {
    setSelectedPlayerIds([]);
    setStatsToCompare(undefined);
    setPlayerStats(undefined);
  };

  const handleCompare = async () => {
    const playerStats = await comparePlayers(selectedPlayerIds);
    setPlayerStats(playerStats);

    // gather set of unique stats across all players
    const uniqueStats = new Set<string>();
    playerStats.forEach((player) => {
      for (const key of player.stats.keys()) {
        uniqueStats.add(key.toString());
      }
    });
    setStatsToCompare(uniqueStats);

    // build map for visualization
    const data: PlayerStatForChart[] = [];
    for (const uniqueStat of uniqueStats) {
      const dataPoint: PlayerStatForChart = {};
      dataPoint["name"] = camelCaseToWords(uniqueStat);

      playerStats.forEach((player) => {
        dataPoint[player.name] = player.stats.get(uniqueStat) || "0";
      });
      data.push(dataPoint);
    }
    setPlayerStatsForChart(data);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const players = await getPlayers();
        setPlayers(players);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    }
    loadData();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>2025 Player Comparison</h1>
        <p>Compare stats between your favorite college volleyball players</p>
      </header>

      <main className={styles.main}>
        <section>
          {!players ? (
            <Loading isLoading={true} />
          ) : (
            <PlayerTable
              players={players}
              selectedPlayerIds={selectedPlayerIds}
              setSelectedPlayerIds={setSelectedPlayerIds}
            />
          )}
          <div className={styles.compareButtonContainer}>
            <Button
              className={styles.clearButton}
              disabled={selectedPlayerIds.length === 0}
              onClick={handleClear}
            >
              Clear Selections
            </Button>
            <Button
              className={styles.compareButton}
              disabled={selectedPlayerIds.length < 2}
              onClick={handleCompare}
            >
              Compare Players
            </Button>
          </div>
        </section>

        {playerStats && statsToCompare && (
          <>
            <section className={styles.comparisonArea}>
              <h2>Player Statistics Comparison</h2>
              <div className={styles.playerCards}>
                {playerStats.map((playerStat) => (
                  <PlayerCard
                    key={playerStat.id}
                    statsToCompare={statsToCompare}
                    playerStat={playerStat}
                  />
                ))}
              </div>
            </section>

            <section className={styles.visualizationArea}>
              <h2>Visualization</h2>
              <div className={styles.visualization}>
                <BarChart
                  style={{
                    width: "100%",
                    maxWidth: "1000px",
                    maxHeight: "80vh",
                    aspectRatio: 1.618,
                  }}
                  responsive
                  data={playerStatsForChart}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis width="auto" />
                  <Tooltip />
                  <Legend />
                  {playerStats.map((player, i) => (
                    <Bar
                      key={player.id}
                      dataKey={player.name}
                      fill={BLUE_SHADES[i]}
                      isAnimationActive={true}
                    />
                  ))}
                </BarChart>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
