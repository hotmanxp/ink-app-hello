import React, { useState, useEffect } from 'react'
import { Box, Text, useInput } from 'ink'
import Spinner from 'ink-spinner'
import HomeScreen from './components/HomeScreen'
import MainForm from './components/MainForm'
import UserListScreen from './components/UserListScreen'
import UserEditScreen from './components/UserEditScreen'
import { FormData, FormErrors, SelectItem, Route } from './types'
import { saveUser } from './services/dataService'

/**
 * 主应用程序组件
 */
export default function App() {
  // 路由状态
  const [route, setRoute] = useState<Route>('home')
  const [routeData, setRouteData] = useState<any>(null)

  // 表单状态
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

  // 静态数据
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

  /**
   * 表单字段验证
   */
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

  /**
   * 处理路由变更
   */
  const handleRouteChange = (newRoute: Route, data?: any) => {
    // 重置表单状态
    if (newRoute === 'form') {
      setStep(0)
      setFormData({
        name: '',
        email: '',
        age: '',
        department: '',
        experience: '',
      })
      setErrors({})
      setIsSubmitted(false)
    }

    setRoute(newRoute)
    setRouteData(data)
  }

  /**
   * 输入处理函数
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  /**
   * 选择处理函数
   */
  const handleSelect = (field: string, item: SelectItem) => {
    setFormData(prev => ({ ...prev, [field]: item.value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
    setStep(prev => prev + 1)
  }

  /**
   * 下一步处理
   */
  const handleNext = () => {
    const fields: Array<keyof FormData> = ['name', 'email', 'age', 'department', 'experience']
    const currentField = fields[step]

    if (currentField) {
      const error = validateField(currentField, formData[currentField])
      if (error) {
        setErrors(prev => ({ ...prev, [currentField]: error }))
        return
      }
    }

    setStep(prev => prev + 1)
  }

  /**
   * 上一步处理
   */
  const handlePrevious = () => {
    setStep(prev => Math.max(0, prev - 1))
  }

  /**
   * 表单提交处理
   */
  const handleSubmit = async () => {
    setIsSubmitted(true)

    // 保存用户数据
    const result = await saveUser(formData)
    if (!result) {
      console.error('Failed to save user data')
    }

    // 2秒后自动返回主菜单
    setTimeout(() => {
      handleRouteChange('home')
    }, 2000)
  }

  // 首页自动跳转
  useEffect(() => {
    if (route === 'home') {
      // 移除自动跳转，因为首页现在包含菜单
      /*
			const timer = setTimeout(() => {
				setRoute('menu');
			}, 3000);
			return () => clearTimeout(timer);
			*/
    }
  }, [route])

	// 键盘输入处理
	useInput((_input: string, key: { return?: boolean; leftArrow?: boolean; backspace?: boolean; escape?: boolean }) => {
		// 首页任意键跳转
		if (route === 'home') {
			// 不再需要自动跳转，因为首页现在包含菜单
			return
		}

		// 表单导航
		if (route === 'form' && !isSubmitted) {
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
				handleRouteChange('home')
			}
		}
		// 仅当处于表单页面时处理键盘事件，其他页面(如edit-user)让子组件自行处理
		if (route !== 'form') {
			return
		}
	})

  // 渲染当前路由对应的组件
  switch (route) {
    case 'home':
      return <HomeScreen onRouteChange={handleRouteChange} />

    case 'form':
      if (isSubmitted) {
        return (
          <Box flexDirection="column" padding={2}>
            <Text color="green" bold>
              ✅ 用户信息提交成功!
            </Text>
            <Box marginTop={1} flexDirection="row" alignItems="center">
              <Text color="green">
                <Spinner type="dots" />
              </Text>
              <Text dimColor> 正在返回主菜单...</Text>
            </Box>
          </Box>
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

    case 'users':
      return <UserListScreen onRouteChange={handleRouteChange} />

    case 'edit-user':
      if (routeData && routeData.user) {
        return (
          <UserEditScreen
            user={routeData.user}
            onRouteChange={newRoute => handleRouteChange(newRoute as Route)}
          />
        )
      }
      // 如果没有用户数据，返回用户列表
      return <UserListScreen onRouteChange={handleRouteChange} />

    default:
      return <HomeScreen onRouteChange={handleRouteChange} />
  }
}
