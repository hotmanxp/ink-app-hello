import React from 'react'
import { Box, Text } from 'ink'
import ProgressBar from './ProgressBar.js'
import FormFields from './FormFields.js'
import type { FormData, FormErrors, SelectItem } from '../types.js'

interface MainFormProps {
  readonly step: number
  readonly formData: Readonly<FormData>
  readonly errors: Readonly<FormErrors>
  readonly departments: readonly SelectItem[]
  readonly experienceLevels: readonly SelectItem[]
  readonly onInputChange: (field: string, value: string) => void
  readonly onSelect: (field: string, item: SelectItem) => void
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
          onInputChange={onInputChange}
          onSelect={onSelect}
        />
      </Box>

      <Box marginTop={2} flexDirection="column">
        <Text dimColor>导航说明:</Text>
        <Text dimColor>• Enter: 继续/提交</Text>
        <Text dimColor>• ←/Backspace: 返回上一步</Text>
        <Text dimColor>• Esc: 返回主菜单</Text>
      </Box>
    </Box>
  )
}

export default MainForm
