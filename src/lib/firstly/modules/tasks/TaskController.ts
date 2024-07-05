import { BackendMethod } from 'remult';

import { log } from '$lib/firstly';

/**
 * await TaskController.sayHiFromTask("JYC")
 */
export class TaskController {
	@BackendMethod({ allowed: true })
	static async sayHiFromTask(name: string) {
		log.info(`hello ${name} 👋`);
	}
}
