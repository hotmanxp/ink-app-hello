import React, { useState } from 'react'
import { Box, Text, useInput } from 'ink'
import Spinner from 'ink-spinner'
import TextInput from 'ink-text-input'
import SelectInput from 'ink-select-input'
import { User, FormErrors, SelectItem } from '../types'
import { updateUser } from '../services/dataService'

interface UserEditScreenProps {
  user: User
  onRouteChange: (route: string) => void
}

const departments: SelectItem[] = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'HR', value: 'hr' },
]

const experienceLevels: SelectItem[] = [
  { label: 'Junior (0-2 years)', value: 'junior' },
  { label: 'Mid-level (3-5 years)', value: 'mid' },
  { label: 'Senior (6-10 years)', value: 'senior' },
  { label: 'Lead (10+ years)', value: 'lead' },
]

const UserEditScreen: React.FC<UserEditScreenProps> = ({ user, onRouteChange }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    age: user.age,
    department: user.department,
    experience: user.experience,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<
    'name' | 'email' | 'age' | 'department' | 'experience' | null
  >('name')

  const validateField = (field: keyof typeof formData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        return undefined

      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format'
        return undefined

      case 'age':
        if (!value.trim()) return 'Age is required'
        const age = parseInt(value, 10)
        if (isNaN(age)) return 'Age must be a number'
        if (age < 18 || age > 100) return 'Age must be between 18 and 100'
        return undefined

      case 'department':
        if (!value) return 'Department is required'
        return undefined

      case 'experience':
        if (!value) return 'Experience level is required'
        return undefined

      default:
        return undefined
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSelect = (field: keyof typeof formData, item: SelectItem | undefined) => {
    // Check if item is undefined to prevent errors
    if (!item) return

    setFormData(prev => ({ ...prev, [field]: item.value }))
    // Clear error for this field when user makes a selection
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
    // Move focus to next field
    moveToNextField(field)
  }

  const moveToNextField = (currentField: keyof typeof formData) => {
    const fields: Array<keyof typeof formData> = [
      'name',
      'email',
      'age',
      'department',
      'experience',
    ]
    const currentIndex = fields.indexOf(currentField)
    const nextIndex = (currentIndex + 1) % fields.length
    setFocusedField(fields[nextIndex] as any)
  }

  const moveToPrevField = (currentField: keyof typeof formData) => {
    const fields: Array<keyof typeof formData> = [
      'name',
      'email',
      'age',
      'department',
      'experience',
    ]
    const currentIndex = fields.indexOf(currentField)
    const prevIndex = (currentIndex - 1 + fields.length) % fields.length
    setFocusedField(fields[prevIndex] as any)
  }

  const handleSubmit = async () => {
    // 验证所有字段
    const newErrors: FormErrors = {}
    let isValid = true

    for (const key of Object.keys(formData) as Array<keyof typeof formData>) {
      const error = validateField(key, formData[key])
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    }

    setErrors(newErrors)

    if (!isValid) {
      return
    }

    // 提交数据
    setIsSubmitting(true)
    const result = await updateUser(user.id, formData)
    setIsSubmitting(false)

    if (result) {
      setIsSubmitted(true)
      // 2秒后自动返回用户列表
      setTimeout(() => {
        onRouteChange('users')
      }, 2000)
    } else {
      setErrors({ name: 'Failed to update user. Please try again.' })
    }
  }

  // Find the correct initial index for department
  const departmentInitialIndex = departments.findIndex(d => d.value === formData.department)
  const validDepartmentInitialIndex = departmentInitialIndex >= 0 ? departmentInitialIndex : 0

  // Find the correct initial index for experience level
  const experienceInitialIndex = experienceLevels.findIndex(e => e.value === formData.experience)
  const validExperienceInitialIndex = experienceInitialIndex >= 0 ? experienceInitialIndex : 0

  // Handle keyboard navigation
  useInput((_, key) => {
    // Handle Tab and Shift+Tab for field navigation
    if (key.tab) {
      if (key.shift) {
        // Move to previous field
        const fields: Array<keyof typeof formData> = [
          'name',
          'email',
          'age',
          'department',
          'experience',
        ]
        const currentIndex = fields.indexOf(focusedField || 'name')
        const prevIndex = (currentIndex - 1 + fields.length) % fields.length
        setFocusedField(fields[prevIndex] as any)
      } else {
        // Move to next field
        const fields: Array<keyof typeof formData> = [
          'name',
          'email',
          'age',
          'department',
          'experience',
        ]
        const currentIndex = fields.indexOf(focusedField || 'name')
        const nextIndex = (currentIndex + 1) % fields.length
        setFocusedField(fields[nextIndex] as any)
      }
      return
    }

    // Handle Enter for form submission
    if (key.return) {
      handleSubmit()
      return
    }

    // Handle Escape to go back
    if (key.escape) {
      onRouteChange('users')
      return
    }
  })

  // 添加键盘事件监听
  useInput((_: string, key: { escape?: boolean; return?: boolean; backspace?: boolean }) => {
    if (key.escape) {
      onRouteChange('users')
    }
    
    // 处理表单提交
    if (key.return && currentField) {
      const error = validateField(currentField, formData[currentField])
      if (!error) {
        handleNext()
      } else {
        setErrors(prev => ({ ...prev, [currentField]: error }))
      }
    }
    
    // 处理返回上一步
    if (key.backspace && currentField) {
      handlePrevious()
    }
  })

  if (isSubmitted) {
    return (
      <Box flexDirection="column" padding={2}>
        <Text color="green">✅ 用户信息更新成功!</Text>
        <Box marginTop={1} flexDirection="row" alignItems="center">
          <Text color="green">
            <Spinner type="dots" />
          </Text>
          <Text dimColor> 正在返回用户列表...</Text>
        </Box>
      </Box>
    )
  }

  return (
    <Box flexDirection="column" padding={2}>
      <Box marginBottom={1}>
        <Text bold color="cyan">
          编辑用户信息
        </Text>
      </Box>

      <Box flexDirection="column" marginTop={1}>
        <Text color="yellow">Name:</Text>
        <TextInput
          value={formData.name}
          onChange={(value: string) => handleInputChange('name', value)}
          placeholder="John Doe"
          focus={focusedField === 'name'}
        />
        {errors.name && <Text color="red">{errors.name}</Text>}
      </Box>

      <Box flexDirection="column" marginTop={1}>
        <Text color="yellow">Email:</Text>
        <TextInput
          value={formData.email}
          onChange={(value: string) => handleInputChange('email', value)}
          placeholder="john@example.com"
          focus={focusedField === 'email'}
        />
        {errors.email && <Text color="red">{errors.email}</Text>}
      </Box>

      <Box flexDirection="column" marginTop={1}>
        <Text color="yellow">Age:</Text>
        <TextInput
          value={formData.age}
          onChange={(value: string) => handleInputChange('age', value)}
          placeholder="25"
          focus={focusedField === 'age'}
        />
        {errors.age && <Text color="red">{errors.age}</Text>}
      </Box>

      <Box flexDirection="column" marginTop={1}>
        <Text color="yellow">Department:</Text>
        <SelectInput
          items={departments}
          onSelect={(item: SelectItem) => handleSelect('department', item)}
          initialIndex={validDepartmentInitialIndex}
          isFocused={focusedField === 'department'}
        />
        {errors.department && <Text color="red">{errors.department}</Text>}
      </Box>

      <Box flexDirection="column" marginTop={1}>
        <Text color="yellow">Experience Level:</Text>
        <SelectInput
          items={experienceLevels}
          onSelect={(item: SelectItem) => handleSelect('experience', item)}
          initialIndex={validExperienceInitialIndex}
          isFocused={focusedField === 'experience'}
        />
        {errors.experience && <Text color="red">{errors.experience}</Text>}
      </Box>

      <Box flexDirection="row" marginTop={2} columnGap={2}>
        <Box>
          <Text backgroundColor="green" color="white">
            {isSubmitting ? ' 保存中... ' : ' 保存更改 '}
          </Text>
        </Box>

        <Box>
          <Text backgroundColor="gray" color="white">
            返回列表
          </Text>
        </Box>
      </Box>

      <Box marginTop={2} flexDirection="column">
        <Text dimColor>操作说明:</Text>
        <Text dimColor>• Tab/Shift+Tab: 在字段间切换</Text>
        <Text dimColor>• Enter: 提交表单</Text>
        <Text dimColor>• Esc: 返回列表</Text>
      </Box>
    </Box>
  )
}

export default UserEditScreen
