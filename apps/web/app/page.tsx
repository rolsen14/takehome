"use client";

import styles from "./page.module.css";
import { Button } from "@takehome/ui/button";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Player Comparison</h1>
        <p>Compare stats between your favorite college athletes</p>
      </header>

      <main className={styles.main}>
        <section className={styles.selectionArea}>
          <h2>Select Players to Compare</h2>
          <div className={styles.playerSelectors}>
            {/* Player selection dropdowns or search will go here */}
            <div className={styles.playerSelector}>
              <label htmlFor="player1">Player 1</label>
              <select id="player1" className={styles.select}>
                <option value="">Select a player...</option>
                {/* Player options will be populated here */}
              </select>
            </div>

            <div className={styles.playerSelector}>
              <label htmlFor="player2">Player 2</label>
              <select id="player2" className={styles.select}>
                <option value="">Select a player...</option>
                {/* Player options will be populated here */}
              </select>
            </div>
          </div>
          <Button
            onClick={() => {
              /* TODO: Implement compare players */
            }}
            className={styles.compareButton}
          >
            Compare Players
          </Button>
        </section>

        <section className={styles.comparisonArea}>
          <h2>Player Statistics Comparison</h2>
          <div className={styles.comparisonTable}>
            <table>
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Player 1</th>
                  <th>Player 2</th>
                </tr>
              </thead>
              <tbody>
                {/* Stats will be populated here... Example: */}
                <tr>
                  <td>Points Per Game</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Rebounds Per Game</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Assists Per Game</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                {/* Add more stat rows as needed */}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.visualizationArea}>
          <h2>Visualizations</h2>
          <div className={styles.charts}>
            {/* Charts and visualizations will go here */}
            <div className={styles.chartPlaceholder}>
              <p>Player comparison chart will be displayed here</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
