import type { Module } from 'firstly/api';

import { log } from '$lib/firstly';

import { Task } from './Task';
import { TaskController } from './TaskController';

export const tasks: (o: { specialInfo: string }) => Module = ({ specialInfo }) => {
	return {
		name: 'task',
		entities: [Task],
		controllers: [TaskController],
		initApi: async () => {
			log.success(`Task module is ready! 🚀 (specialInfo: ${specialInfo})`);
		}
	};
};
