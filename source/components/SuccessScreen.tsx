import React from 'react'
import { Box, Text } from 'ink'
import type { FormData, SelectItem } from '../types.js'

interface SuccessScreenProps {
  readonly formData: Readonly<FormData>
  readonly departments: readonly SelectItem[]
  readonly experienceLevels: readonly SelectItem[]
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  formData,
  departments,
  experienceLevels,
}) => {
  const departmentLabel =
    departments.find(d => d.value === formData.department)?.label || formData.department
  const experienceLabel =
    experienceLevels.find(e => e.value === formData.experience)?.label || formData.experience

  return (
    <Box flexDirection="column" padding={2}>
      <Box marginBottom={1}>
        <Text color="green">✅ 提交成功!</Text>
      </Box>

      <Box flexDirection="column" marginTop={1}>
        <Text bold>用户信息预览:</Text>
        <Box marginTop={1} flexDirection="column">
          <Text>姓名: {formData.name}</Text>
          <Text>邮箱: {formData.email}</Text>
          <Text>年龄: {formData.age}</Text>
          <Text>部门: {departmentLabel}</Text>
          <Text>经验级别: {experienceLabel}</Text>
        </Box>
      </Box>

      <Box marginTop={2}>
        <Text dimColor>感谢您提交信息，3秒后将返回主菜单...</Text>
      </Box>
    </Box>
  )
}

export default SuccessScreen
