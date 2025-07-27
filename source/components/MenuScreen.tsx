import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { Route } from '../types.js';

interface MenuItem {
	label: string;
	value: Route | 'exit';
}

interface MenuScreenProps {
	onRouteChange: (route: Route) => void;
}

const menuItems: MenuItem[] = [
	{ label: '填写新用户信息', value: 'form' },
	{ label: '查看和编辑用户信息', value: 'users' },
	{ label: '退出程序', value: 'exit' }
];

const MenuScreen: React.FC<MenuScreenProps> = ({ onRouteChange }) => {
	const handleSelect = (item: MenuItem) => {
		if (item.value === 'exit') {
			process.exit(0);
		} else {
			onRouteChange(item.value);
		}
	};

	return (
		<Box flexDirection="column" padding={2}>
			<Box marginBottom={1}>
				<Text bold color="cyan">用户管理系统</Text>
			</Box>
			
			<Box marginBottom={2}>
				<Text dimColor>请选择操作:</Text>
			</Box>
			
			<SelectInput 
				items={menuItems}
				onSelect={handleSelect}
			/>
			
			<Box marginTop={2} flexDirection="column">
				<Text dimColor>导航说明:</Text>
				<Text dimColor>• ↑/↓: 选择选项</Text>
				<Text dimColor>• Enter: 确认选择</Text>
				<Text dimColor>• Ctrl+C: 退出程序</Text>
			</Box>
		</Box>
	);
};

export default MenuScreen;