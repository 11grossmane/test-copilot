import React, { useState } from "react";
import { Button, Container, Typography, Box, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

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

  const renderWord = () => {
    return word.split("").map((letter, index) => (
      <span key={index} className="letter">
        {guesses.includes(letter) ? letter : "_"}
      </span>
    ));
  };

  const renderAlphabet = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    return alphabet.map((letter) => (
      <Button
        key={letter}
        onClick={() => handleGuess(letter)}
        disabled={guesses.includes(letter) || attempts >= maxAttempts}
        variant="contained"
        color="primary"
      >
        {letter}
      </Button>
    ));
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
            {renderWord()}
          </Box>
          <Grid container spacing={1} justifyContent="center">
            {renderAlphabet()}
          </Grid>
          <Box className="status" mt={3}>
            {isGameOver && (
              <Typography variant="h6" color="error">
                Game Over! The word was "{word}".
              </Typography>
            )}
            {isGameWon && (
              <Typography variant="h6" color="primary">
                Congratulations! You guessed the word "{word}".
              </Typography>
            )}
            {(isGameOver || isGameWon) && (
              <Button
                onClick={handleRestart}
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
              >
                Restart Game
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
