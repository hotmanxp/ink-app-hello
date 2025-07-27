import React from 'react'
import { Box, Text } from 'ink'

interface ProgressBarProps {
  step: number
  totalSteps: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  const progress = ((step + 1) / totalSteps) * 100
  const filledBlocks = Math.floor(progress / 2)
  const emptyBlocks = 50 - filledBlocks < 0 ? 0 : 50 - filledBlocks

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Text color="cyan">
        Progress: {step + 1}/{totalSteps}
      </Text>
      <Text>
        <Text color="green">{'█'.repeat(filledBlocks)}</Text>
        <Text color="gray">{'░'.repeat(emptyBlocks)}</Text>
      </Text>
    </Box>
  )
}

export default ProgressBar
