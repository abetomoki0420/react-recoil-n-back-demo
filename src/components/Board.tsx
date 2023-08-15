import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Text,
} from "@radix-ui/themes"
import { useNBack } from "../hooks/useNBack"

export const Board = () => {
  const { isPrePlaying, isPlaying, correctCount, start, reset, n, setN } =
    useNBack()

  return (
    <Container mx="9">
      <Heading size="8">N-back</Heading>
      {isPrePlaying && <Text>Memory...</Text>}
      {isPlaying && (
        <Flex gap="2">
          <Text>correct: {correctCount}</Text>
        </Flex>
      )}

      {(isPlaying || isPrePlaying) && (
        <Grid columns="3" rows="3" gap="3" width="auto">
          <Cell n={1} />
          <Cell n={2} />
          <Cell n={3} />
          <Cell n={4} />
          <Cell n={5} />
          <Cell n={6} />
          <Cell n={7} />
          <Cell n={8} />
          <Cell n={9} />
        </Grid>
      )}

      <Flex mt="4" gap="2">
        {isPlaying || isPrePlaying ? (
          <Button onClick={() => reset()}>Reset</Button>
        ) : (
          <Flex direction="column" gap="2">
            <Text>Click Start to Play</Text>
            <Flex gap="2" align="center">
              <Text size="2">Level</Text>
              <Select.Root
                value={n.toString()}
                onValueChange={(value) =>
                  setN(Number(value) as 1 | 2 | 3 | 4 | 5)
                }
              >
                <Select.Trigger placeholder="Select Level" />
                <Select.Content>
                  <Select.Item value="1">1</Select.Item>
                  <Select.Item value="2">2</Select.Item>
                  <Select.Item value="3">3</Select.Item>
                  <Select.Item value="4">4</Select.Item>
                  <Select.Item value="5">5</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Button onClick={() => start()}>Start</Button>
          </Flex>
        )}
      </Flex>
    </Container>
  )
}

const Cell = ({ n }: { n: number }) => {
  const { displayNumber, selectNumber } = useNBack()

  const symbol = displayNumber === n ? "☆" : ""

  return (
    <Button variant="outline" onClick={() => selectNumber(n)}>
      {symbol}
    </Button>
  )
}
