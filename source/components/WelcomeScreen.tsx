import React from 'react'
import { Box, Text } from 'ink'

function WelcomeScreen(): JSX.Element {
  return (
    <Box flexDirection="column" padding={2} alignItems="center">
      <Box flexDirection="column" alignItems="center" marginBottom={2}>
        <Text color="cyan" bold>
          █ █ █ ╗  █ █ ╗  █ █ █ █ █ ╗  █ █ ╗  █ █ ╗  █ █ █ █ ╗{' '}
        </Text>
        <Text color="blue" bold>
          █ █ █ █ ╗  █ █ ║ █ █ ╔ ═ ═ ═ █ █ ╗ █ █ ║  █ █ ║ █ █ ╔ ═ ═ █ █ ╗
        </Text>
        <Text color="magenta" bold>
          █ █ ╔ █ █ ╗  █ █ ║ █ █ ║  █ █ ║ █ █ ║  █ █ ║ █ █ █ █ █ █ ║
        </Text>
        <Text color="green" bold>
          █ █ ║ ╚ █ █ ╗ █ █ ║ █ █ ║  █ █ ║ ╚ █ █ ╗  █ █ ╔ ╝ █ █ ╔ ═ ═ █ █ ║
        </Text>
        <Text color="yellow" bold>
          █ █ ║  ╚ █ █ █ ║ ╚ █ █ █ █ █ ╔ ╗  ╚ █ █ █ ╔ ╝  █ █ ║  █ █ ║
        </Text>
        <Text color="red" bold>
          ╚ ═ ╝   ╚ ═ ═ ═ ╝  ╚ █ █ █ █ █ ╝    ╚ ═ ═ ╝   ╚ ═ ╝  ╚ ═ ╝
        </Text>
      </Box>

      <Text color="white" italic dimColor>
        Interactive User Registration Form
      </Text>

      <Box marginTop={2}>
        <Text color="gray" dimColor>
          按任意键继续...
        </Text>
      </Box>
    </Box>
  )
}

export default WelcomeScreen
