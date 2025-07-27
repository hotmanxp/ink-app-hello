import React from 'react'
import { Box, Text } from 'ink'

interface ProgressBarProps {
  readonly step: number
  readonly totalSteps: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  const progress = Math.min(step / totalSteps, 1)
  const progressBarWidth = 20
  const filledWidth = Math.round(progress * progressBarWidth)

  const filledBar = '█'.repeat(filledWidth)
  const emptyBar = '░'.repeat(progressBarWidth - filledWidth)

  return (
    <Box flexDirection="column">
      <Text>
        进度: {filledBar}
        <Text dimColor>{emptyBar}</Text> {Math.round(progress * 100)}%
      </Text>
    </Box>
  )
}

export default ProgressBar
