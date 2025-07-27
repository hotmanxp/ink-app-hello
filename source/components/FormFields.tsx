import React from 'react'
import { Box, Text } from 'ink'
import TextInput from 'ink-text-input'
import SelectInput from 'ink-select-input'
import type { FormData, FormErrors, SelectItem } from '../types.js'

interface FormFieldsProps {
  readonly step: number
  readonly formData: Readonly<FormData>
  readonly errors: Readonly<FormErrors>
  readonly departments: readonly SelectItem[]
  readonly experienceLevels: readonly SelectItem[]
  readonly onInputChange: (field: string, value: string) => void
  readonly onSelect: (field: string, item: SelectItem) => void
}

const FormFields: React.FC<FormFieldsProps> = ({
  step,
  formData,
  errors,
  departments,
  experienceLevels,
  onInputChange,
  onSelect,
}) => {
  switch (step) {
    case 0:
      return (
        <Box flexDirection="column">
          <Text color="yellow">请输入您的姓名:</Text>
          <TextInput
            value={formData.name}
            onChange={(value: string) => onInputChange('name', value)}
            placeholder="张三"
          />
          {errors.name && <Text color="red">{errors.name}</Text>}
        </Box>
      )

    case 1:
      return (
        <Box flexDirection="column">
          <Text color="yellow">请输入您的邮箱:</Text>
          <TextInput
            value={formData.email}
            onChange={(value: string) => onInputChange('email', value)}
            placeholder="zhangsan@example.com"
          />
          {errors.email && <Text color="red">{errors.email}</Text>}
        </Box>
      )

    case 2:
      return (
        <Box flexDirection="column">
          <Text color="yellow">请输入您的年龄:</Text>
          <TextInput
            value={formData.age}
            onChange={(value: string) => onInputChange('age', value)}
            placeholder="25"
          />
          {errors.age && <Text color="red">{errors.age}</Text>}
        </Box>
      )

    case 3:
      return (
        <Box flexDirection="column">
          <Text color="yellow">请选择您的部门:</Text>
          <SelectInput
            items={departments}
            onSelect={(item: SelectItem) => onSelect('department', item)}
          />
          {errors.department && <Text color="red">{errors.department}</Text>}
        </Box>
      )

    case 4:
      return (
        <Box flexDirection="column">
          <Text color="yellow">请选择您的经验级别:</Text>
          <SelectInput
            items={experienceLevels}
            onSelect={(item: SelectItem) => onSelect('experience', item)}
          />
          {errors.experience && <Text color="red">{errors.experience}</Text>}
        </Box>
      )

    default:
      return (
        <Box flexDirection="column">
          <Text color="yellow">请输入您的姓名:</Text>
          <TextInput
            value={formData.name}
            onChange={(value: string) => onInputChange('name', value)}
            placeholder="张三"
          />
          {errors.name && <Text color="red">{errors.name}</Text>}
        </Box>
      )
  }
}

export default FormFields
