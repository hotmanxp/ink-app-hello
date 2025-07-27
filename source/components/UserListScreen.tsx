import React, { useState, useEffect } from 'react'
import { Box, Text } from 'ink'
import SelectInput from 'ink-select-input'
import type { User, Route } from '../types.js'
import { readUsers, deleteUser } from '../services/dataService.js'

interface UserListScreenProps {
  readonly onRouteChange: (route: Route, data?: any) => void
}

interface UserMenuItem {
  label: string
  value: string
  disabled?: boolean
}

const UserListScreen: React.FC<UserListScreenProps> = ({ onRouteChange }) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [showUserActions, setShowUserActions] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState<{ success: boolean; message: string } | null>(
    null
  )

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await readUsers()
      setUsers(userData)
      setLoading(false)
    }

    void fetchUsers()
  }, [])

  const handleSelectUser = (item: UserMenuItem) => {
    // 处理删除确认
    if (deleteConfirmation && selectedUserId) {
      if (item.value === 'confirm-delete') {
        void handleDeleteUser(selectedUserId)
        return
      } else if (item.value === 'cancel-delete' || item.value === 'back-to-user-list') {
        setDeleteConfirmation(false)
        setSelectedUserId(null)
        return
      }
    }

    // 处理用户操作选择（编辑或删除）
    if (showUserActions && selectedUserId) {
      if (item.value === 'edit') {
        const selectedUser = users.find(user => user.id === selectedUserId)
        if (selectedUser) {
          onRouteChange('edit-user', { user: selectedUser })
        }
        return
      } else if (item.value === 'delete') {
        setDeleteConfirmation(true)
        return
      } else if (item.value === 'back-to-list') {
        setShowUserActions(false)
        setSelectedUserId(null)
        return
      }
    }

    // 选择一个用户显示操作选项
    if (item.value.startsWith('user-')) {
      const userId = item.value.replace('user-', '')
      setSelectedUserId(userId)
      setShowUserActions(true)
      return
    }

    // 返回主菜单
    if (item.value === 'back') {
      onRouteChange('home')
      return
    }
  }

  const handleDeleteUser = async (userId: string) => {
    setDeleteStatus({ success: false, message: '删除中...' })
    const result = await deleteUser(userId)

    if (result) {
      // 更新用户列表
      const updatedUsers = users.filter(user => user.id !== userId)
      setUsers(updatedUsers)
      setDeleteStatus({ success: true, message: '用户删除成功!' })
    } else {
      setDeleteStatus({ success: false, message: '删除失败，请重试' })
    }

    // 重置删除状态
    setDeleteConfirmation(false)
    setSelectedUserId(null)
    setShowUserActions(false)

    // 2秒后清除状态消息
    setTimeout(() => {
      setDeleteStatus(null)
    }, 2000)
  }

  const getUserMenuItems = (): UserMenuItem[] => {
    // 显示删除确认选项
    if (deleteConfirmation && selectedUserId) {
      const userToDelete = users.find(user => user.id === selectedUserId)
      if (userToDelete) {
        return [
          {
            label: `确认删除用户 ${userToDelete.name} (${userToDelete.email})?`,
            value: 'info',
            disabled: true,
          },
          { label: '✓ 确认删除', value: 'confirm-delete' },
          { label: '✗ 取消删除', value: 'cancel-delete' },
          { label: '« 返回用户列表', value: 'back-to-user-list' },
        ]
      }
    }

    // 显示用户操作选项
    if (showUserActions && selectedUserId) {
      const selectedUser = users.find(user => user.id === selectedUserId)
      if (selectedUser) {
        return [
          {
            label: `用户: ${selectedUser.name} (${selectedUser.email})`,
            value: 'info',
            disabled: true,
          },
          { label: '📝 编辑用户', value: 'edit' },
          { label: '🗑️  删除用户', value: 'delete' },
          { label: '« 返回用户列表', value: 'back-to-list' },
        ]
      }
    }

    // 显示用户列表
    if (users.length > 0) {
      const items: UserMenuItem[] = users.map(user => ({
        label: `${user.name} (${user.email})`,
        value: `user-${user.id}`,
      }))

      items.push({ label: '« 返回主菜单', value: 'back' })
      return items
    }

    // 没有用户时显示返回选项
    return [{ label: '« 返回主菜单', value: 'back' }]
  }

  const userMenuItems = getUserMenuItems()

  if (loading) {
    return (
      <Box padding={2}>
        <Text>Loading users...</Text>
      </Box>
    )
  }

  return (
    <Box flexDirection="column" padding={2}>
      <Box marginBottom={1}>
        <Text bold color="cyan">
          用户列表
        </Text>
      </Box>

      {deleteStatus && (
        <Box marginBottom={1}>
          <Text color={deleteStatus.success ? 'green' : 'red'}>{deleteStatus.message}</Text>
        </Box>
      )}

      {users.length === 0 ? (
        <Box flexDirection="column">
          <Text dimColor>暂无用户数据</Text>
          <Box marginTop={1}>
            <Text dimColor>按任意键返回主菜单...</Text>
          </Box>
        </Box>
      ) : (
        <Box flexDirection="column">
          <Box marginBottom={1}>
            {deleteConfirmation ? (
              <Text color="yellow">请确认是否删除用户:</Text>
            ) : showUserActions ? (
              <Text dimColor>选择要执行的操作:</Text>
            ) : (
              <Text dimColor>选择用户:</Text>
            )}
          </Box>

          <SelectInput
            items={userMenuItems.filter(item => !item.disabled)}
            onSelect={handleSelectUser}
          />
        </Box>
      )}

      <Box marginTop={2} flexDirection="column">
        <Text dimColor>导航说明:</Text>
        <Text dimColor>• ↑/↓: 选择选项</Text>
        <Text dimColor>• Enter: 确认选择</Text>
        <Text dimColor>• Ctrl+C: 退出程序</Text>
      </Box>
    </Box>
  )
}

export default UserListScreen
