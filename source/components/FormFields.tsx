import React from 'react';
import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';
import {FormData, FormErrors, SelectItem} from '../types.js';

interface FormFieldsProps {
	step: number;
	formData: FormData;
	errors: FormErrors;
	departments: SelectItem[];
	experienceLevels: SelectItem[];
	onInputChange: (field: string, value: string) => void;
	onSelect: (field: string, item: SelectItem) => void;
}

const FormFields: React.FC<FormFieldsProps> = ({
	step,
	formData,
	errors,
	departments,
	experienceLevels,
	onInputChange,
	onSelect
}) => {
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
			);
		
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
			);
		
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
			);
		
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
			);
		
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
			);
		
		default:
			return null;
	}
};

export default FormFields;