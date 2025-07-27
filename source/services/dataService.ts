import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from '../types.js';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 数据文件路径
const dataDir = path.join(__dirname, '..', '..', 'data');
const dataFile = path.join(dataDir, 'users.json');

/**
 * 确保数据目录存在
 */
const ensureDataDir = async (): Promise<void> => {
	await fs.ensureDir(dataDir);
};

/**
 * 读取所有用户数据
 */
export const readUsers = async (): Promise<User[]> => {
	try {
		await ensureDataDir();
		const exists = await fs.pathExists(dataFile);
		
		if (!exists) {
			await fs.writeJson(dataFile, []);
			return [];
		}
		
		const data = await fs.readJson(dataFile);
		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error('Error reading users:', error);
		return [];
	}
};

/**
 * 保存用户数据
 */
export const saveUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<User | null> => {
	try {
		await ensureDataDir();
		const users = await readUsers();
		
		const newUser: User = {
			...user,
			id: Date.now().toString(),
			createdAt: new Date().toISOString()
		};
		
		users.push(newUser);
		await fs.writeJson(dataFile, users, { spaces: 2 });
		return newUser;
	} catch (error) {
		console.error('Error saving user:', error);
		return null;
	}
};

/**
 * 更新用户数据
 */
export const updateUser = async (id: string, userData: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> => {
	try {
		await ensureDataDir();
		const users = await readUsers();
		const userIndex = users.findIndex(user => user.id === id);
		
		if (userIndex === -1) {
			return null;
		}
		
		// 确保不会丢失必需的字段
		const existingUser = users[userIndex];
		const updatedUser: User = {
			name: userData.name !== undefined ? userData.name : existingUser.name,
			email: userData.email !== undefined ? userData.email : existingUser.email,
			age: userData.age !== undefined ? userData.age : existingUser.age,
			department: userData.department !== undefined ? userData.department : existingUser.department,
			experience: userData.experience !== undefined ? userData.experience : existingUser.experience,
			id: existingUser.id,
			createdAt: existingUser.createdAt
		};
		
		users[userIndex] = updatedUser;
		await fs.writeJson(dataFile, users, { spaces: 2 });
		return updatedUser;
	} catch (error) {
		console.error('Error updating user:', error);
		return null;
	}
};

/**
 * 删除用户
 */
export const deleteUser = async (id: string): Promise<boolean> => {
	try {
		await ensureDataDir();
		const users = await readUsers();
		const filteredUsers = users.filter(user => user.id !== id);
		
		if (users.length === filteredUsers.length) {
			// 没有找到要删除的用户
			return false;
		}
		
		await fs.writeJson(dataFile, filteredUsers, { spaces: 2 });
		return true;
	} catch (error) {
		console.error('Error deleting user:', error);
		return false;
	}
};