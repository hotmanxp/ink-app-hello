export interface FormData {
  name: string
  email: string
  age: string
  department: string
  experience: string
}

export interface FormErrors {
  name?: string
  email?: string
  age?: string
  department?: string
  experience?: string
}

export interface SelectItem {
  label: string
  value: string
}

export default function MainForm({
  step,
  formData,
  errors,
  departments,
  experienceLevels,
  onInputChange,
  onSelect,
}: Props) {
  const renderProgressBar = () => {
    const totalSteps = 5
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

  const renderField = () => {
    switch (step) {
      case 0:
        return (
          <Box flexDirection="column">
            <Text color="yellow">Enter your name:</Text>
            <TextInput
              value={formData.name}
              onChange={(value: string) => onInputChange('name', value)}
              placeholder="John Doe"
            />
            {errors.name && <Text color="red">{errors.name}</Text>}
            <Text dimColor>Press Enter to continue</Text>
          </Box>
        )

      case 1:
        return (
          <Box flexDirection="column">
            <Text color="yellow">Enter your email:</Text>
            <TextInput
              value={formData.email}
              onChange={(value: string) => onInputChange('email', value)}
              placeholder="john@example.com"
            />
            {errors.email && <Text color="red">{errors.email}</Text>}
            <Text dimColor>Press Enter to continue</Text>
          </Box>
        )

      case 2:
        return (
          <Box flexDirection="column">
            <Text color="yellow">Enter your age:</Text>
            <TextInput
              value={formData.age}
              onChange={(value: string) => onInputChange('age', value)}
              placeholder="25"
            />
            {errors.age && <Text color="red">{errors.age}</Text>}
            <Text dimColor>Press Enter to continue</Text>
          </Box>
        )

      case 3:
        return (
          <Box flexDirection="column">
            <Text color="yellow">Select your department:</Text>
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
            <Text color="yellow">Select your experience level:</Text>
            <SelectInput
              items={experienceLevels}
              onSelect={(item: SelectItem) => onSelect('experience', item)}
            />
            {errors.experience && <Text color="red">{errors.experience}</Text>}
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <Box flexDirection="column" padding={2}>
      <Box>
        <Text bold color="cyan">
          User Registration Form
        </Text>
      </Box>
      <Text dimColor>Please fill out all fields to complete registration</Text>

      <Box marginTop={1} marginBottom={1}>
        {renderProgressBar()}
      </Box>

      <Box marginTop={1}>{renderField()}</Box>

      <Box marginTop={2} flexDirection="column">
        <Text dimColor>Controls:</Text>
        <Text dimColor>• Enter: Continue/Submit</Text>
        <Text dimColor>• ←/Backspace: Go back</Text>
        <Text dimColor>• Esc: Exit</Text>
      </Box>
    </Box>
  )
}
import React, { useState, useEffect } from 'react'
import { useInput, useApp } from 'ink'
import WelcomeScreen from './components/WelcomeScreen.js'
import MainForm from './components/MainForm.js'
import SuccessScreen from './components/SuccessScreen.js'
import { FormData, FormErrors, SelectItem } from './types.js'

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

export default function App() {
  const { exit } = useApp()
  const [showWelcome, setShowWelcome] = useState(true)
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    department: '',
    experience: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateField = (field: keyof FormData, value: string): string | undefined => {
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleSelect = (field: keyof FormData, item: SelectItem) => {
    setFormData(prev => ({ ...prev, [field]: item.value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
    setStep(prev => prev + 1)
  }

  const handleNext = () => {
    const currentField = getCurrentField()
    if (currentField) {
      const error = validateField(currentField, formData[currentField])
      if (error) {
        setErrors(prev => ({ ...prev, [currentField]: error }))
        return
      }
    }
    setStep(prev => prev + 1)
  }

  const handlePrevious = () => {
    setStep(prev => Math.max(0, prev - 1))
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  const getCurrentField = (): keyof FormData | null => {
    const fields: Array<keyof FormData> = ['name', 'email', 'age', 'department', 'experience']
    return fields[step] || null
  }

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showWelcome])

  useInput((_input, key) => {
    if (showWelcome) {
      if (key.return) {
        setShowWelcome(false)
      }
      return
    }

    if (key.return) {
      if (step < 4) {
        handleNext()
      } else if (step === 4) {
        handleSubmit()
      }
    } else if (key.leftArrow || key.backspace) {
      if (step > 0 && step < 4) {
        handlePrevious()
      }
    } else if (key.escape) {
      exit()
    }
  })

  if (showWelcome) {
    return <WelcomeScreen />
  }

  if (isSubmitted) {
    return (
      <SuccessScreen
        formData={formData}
        departments={departments}
        experienceLevels={experienceLevels}
      />
    )
  }

  return (
    <MainForm
      step={step}
      formData={formData}
      errors={errors}
      departments={departments}
      experienceLevels={experienceLevels}
      onInputChange={handleInputChange}
      onSelect={handleSelect}
    />
  )
}
