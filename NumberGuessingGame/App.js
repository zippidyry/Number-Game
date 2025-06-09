import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, Button, FlatList } from 'react-native';

export default function App() {
  const [target, setTarget] = useState(generateRandom());
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [scoreHistory, setScoreHistory] = useState([]);

  function generateRandom() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    const numberGuess = parseInt(guess);
    if (isNaN(numberGuess)) {
      setFeedback('Please enter a valid number');
      return;
    }

    setGuessCount(prev => prev + 1);

    if (numberGuess === target) {
      setFeedback(`Correct! You guessed it in ${guessCount + 1} tries.`);
      setGameOver(true);
      setScoreHistory([...scoreHistory, guessCount + 1]);
    } else if (numberGuess < target) {
      setFeedback('Try higher');
    } else {
      setFeedback('Try lower');
    }

    setGuess('');
  };

  const restartGame = () => {
    setTarget(generateRandom());
    setGuess('');
    setFeedback('');
    setGuessCount(0);
    setGameOver(false);
  };

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Text>Guess the Number (1–100)</Text>

      {!gameOver && (
        <View>
          <TextInput
            value={guess}
            onChangeText={setGuess}
            keyboardType="numeric"
            placeholder="Enter your guess"
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              marginVertical: 10,
              padding: 5,
            }}
          />
          <Button title="Submit Guess" onPress={handleGuess} />
        </View>
      )}

      <Text style={{ marginVertical: 10 }}>{feedback}</Text>

      {gameOver && <Button title="Play Again" onPress={restartGame} />}

      {scoreHistory.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text>Previous Scores:</Text>
          <FlatList
            data={scoreHistory}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item, index }) => (
              <Text>Game {index + 1}: {item} guesses</Text>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
