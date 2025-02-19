import React, { useState } from "react";
import { Button, Container, Typography, Box, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import Alphabet from "./components/Alphabet";
import Word from "./components/Word";
import Status from "./components/Status";

const words = ["react", "typescript", "hangman", "github", "copilot"];
const maxAttempts = 6;

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const App: React.FC = () => {
  const [word, setWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guesses, setGuesses] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);

  const handleGuess = (letter: string) => {
    if (!guesses.includes(letter)) {
      setGuesses([...guesses, letter]);
      if (!word.includes(letter)) {
        setAttempts(attempts + 1);
      }
    }
  };

  const handleRestart = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuesses([]);
    setAttempts(0);
  };

  const isGameOver = attempts >= maxAttempts;
  const isGameWon = word.split("").every((letter) => guesses.includes(letter));

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Typography variant="h3" gutterBottom>
            Hangman Game
          </Typography>
          <Box className="word" mb={3}>
            <Word word={word} guesses={guesses} />
          </Box>
          <Grid container spacing={1} justifyContent="center">
            <Alphabet
              guesses={guesses}
              handleGuess={handleGuess}
              attempts={attempts}
              maxAttempts={maxAttempts}
            />
          </Grid>
          <Box className="status" mt={3}>
            <Status
              isGameOver={isGameOver}
              isGameWon={isGameWon}
              word={word}
              handleRestart={handleRestart}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
