import React from 'react'
import { Box, Text, useInput } from 'ink'
import SelectInput from 'ink-select-input'
import type { Route } from '../types.js'

interface MenuItem {
  label: string
  value: Route | 'exit'
}

interface HomeScreenProps {
  readonly onRouteChange: (route: Route) => void
}

const menuItems: MenuItem[] = [
  { label: '填写新用户信息', value: 'form' },
  { label: '查看和编辑用户信息', value: 'users' },
  { label: '退出程序', value: 'exit' },
]

const HomeScreen: React.FC<HomeScreenProps> = ({ onRouteChange }) => {
  const handleSelect = (item: MenuItem): void => {
    if (item.value === 'exit') {
      process.exit(0)
    } else {
      onRouteChange(item.value)
    }
  }

  // 添加ESC键监听功能
  useInput((_, key) => {
    if (key.escape) {
      process.exit(0)
    }
  })

  return (
    <Box flexDirection="column" padding={2} alignItems="center">
      <Box flexDirection="column" alignItems="center" marginBottom={2}>
        <Text color="cyan" bold>
          █ █ █ ╗   █ █ ╗   █ █ █ █ █ ╗   █ █ ╗   █ █ ╗   █ █ █ █ ╗{' '}
        </Text>
        <Text color="blue" bold>
          █ █ █ █ ╗  █ █ ║ █ █ ╔ ═ ═ ═ █ █ ╗ █ █ ║   █ █ ║ █ █ ╔ ═ ═ █ █ ╗
        </Text>
        <Text color="magenta" bold>
          █ █ ╔ █ █ ╗  █ █ ║ █ █ ║   █ █ ║ █ █ ║   █ █ ║ █ █ █ █ █ █ ║
        </Text>
        <Text color="green" bold>
          █ █ ║ ╚ █ █ ╗ █ █ ║ █ █ ║   █ █ ║ ╚ █ █ ╗  █ █ ╔ ╝ █ █ ╔ ═ ═ █ █ ║
        </Text>
        <Text color="yellow" bold>
          █ █ ║  ╚ █ █ █ ║ ╚ █ █ █ █ █ ╔ ╗   ╚ █ █ █ ╔ ╝  █ █ ║  █ █ ║
        </Text>
        <Text color="red" bold>
          ╚ ═ ╝   ╚ ═ ═ ═ ╝  ╚ ═ ═ ═ ═ ═ ╝    ╚ ═ ═ ╝   ╚ ═ ╝  ╚ ═ ╝
        </Text>
      </Box>

      <Text color="white" italic dimColor>
        Interactive User Management System
      </Text>

      <Box marginTop={3} marginBottom={2}>
        <Text bold color="cyan">
          用户管理系统
        </Text>
      </Box>

      <SelectInput items={menuItems} onSelect={handleSelect} />

      <Box marginTop={3} flexDirection="column">
        <Text dimColor>导航说明:</Text>
        <Text dimColor>• ↑/↓: 选择选项</Text>
        <Text dimColor>• Enter: 确认选择</Text>
        <Text dimColor>• Esc: 退出程序</Text>
        <Text dimColor>• Ctrl+C: 退出程序</Text>
      </Box>
    </Box>
  )
}

export default HomeScreen
