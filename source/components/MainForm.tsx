import React from 'react'
import { Box, Text } from 'ink'
import ProgressBar from './ProgressBar.js'
import FormFields from './FormFields.js'
import { FormData, FormErrors, SelectItem } from '../types.js'

interface MainFormProps {
  step: number
  formData: FormData
  errors: FormErrors
  departments: SelectItem[]
  experienceLevels: SelectItem[]
  onInputChange: (field: string, value: string) => void
  onSelect: (field: string, item: SelectItem) => void
}

const MainForm: React.FC<MainFormProps> = ({
  step,
  formData,
  errors,
  departments,
  experienceLevels,
  onInputChange,
  onSelect,
}) => {
  // Convert the strongly typed functions to loosely typed ones for compatibility
  const handleInputChange = (field: string, value: string) => {
    onInputChange(field as keyof FormData, value)
  }

  const handleSelect = (field: string, item: SelectItem) => {
    onSelect(field as keyof FormData, item)
  }

  return (
    <Box flexDirection="column" padding={2}>
      <Box>
        <Text bold color="cyan">
          用户信息表单
        </Text>
      </Box>
      <Text dimColor>请填写以下信息完成用户注册</Text>

      <Box marginTop={1} marginBottom={1}>
        <ProgressBar step={step} totalSteps={5} />
      </Box>

      <Box marginTop={1}>
        <FormFields
          step={step}
          formData={formData}
          errors={errors}
          departments={departments}
          experienceLevels={experienceLevels}
          onInputChange={handleInputChange}
          onSelect={handleSelect}
        />
      </Box>

      <Box marginTop={2} flexDirection="column">
        <Text dimColor>导航说明:</Text>
        <Text dimColor>• Enter: 确认并继续/提交表单</Text>
        <Text dimColor>• ←/Backspace: 返回上一步进行修改</Text>
        <Text dimColor>• Esc: 放弃当前操作并返回主菜单</Text>
      </Box>
    </Box>
  )
}

export default MainForm
