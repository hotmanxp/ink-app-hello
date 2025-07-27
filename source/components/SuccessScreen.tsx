import React from 'react';
import {Box, Text} from 'ink';
import {FormData, SelectItem} from '../types.js';

interface SuccessScreenProps {
	formData: FormData;
	departments: SelectItem[];
	experienceLevels: SelectItem[];
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
	formData,
	departments,
	experienceLevels
}) => {
	return (
		<Box flexDirection="column" padding={2}>
			<Text color="green" bold>✅ Form Submitted Successfully!</Text>
			<Box marginTop={1} flexDirection="column">
				<Text>Name: {formData.name}</Text>
				<Text>Email: {formData.email}</Text>
				<Text>Age: {formData.age}</Text>
				<Text>Department: {departments.find(d => d.value === formData.department)?.label}</Text>
				<Text>Experience: {experienceLevels.find(e => e.value === formData.experience)?.label}</Text>
			</Box>
		</Box>
	);
};

export default SuccessScreen;