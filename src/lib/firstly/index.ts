import { firstly } from 'firstly/api';
import { auth } from 'firstly/auth';
// import { github } from 'firstly/auth/providers'
// import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private'
import { Log } from '@kitql/helpers';

import { tasks } from './modules/tasks';

// When you will want to use postgres, create a .env file with DATABASE_URL
// import { createPostgresConnection } from 'remult/postgres'
// import { DATABASE_URL } from '$env/static/private'

/** Define your roles here and use them in your app */
export const Role = {
	ADMIN: 'admin',
	SUPER_ADMIN: 'super_admin'
};

/** Define your log instance and user it accross your all app */
export const log = new Log('firstly-demo');

export const api = firstly({
	// dataProvider: await createPostgresConnection({
	//  connectionString: DATABASE_URL,
	// }),
	modules: [
		// core module: auth
		auth({
			providers: {
				demo: [
					{ name: 'Ermin' },
					{ name: 'JYC', roles: [Role.ADMIN] },
					{ name: 'Noam', roles: [Role.SUPER_ADMIN] }
				],

				// password: {},

				// otp: {},

				oAuths: [
					// To enable GitHub auth,
					// 1/ Add your GitHub credentials to .env file (example in .env.example)
					// 2/ uncomment imports & github() call below
					// 3/ under a button click call something like this:
					//      async function oauth() {
					//        window.location.href = await AuthController.signInOAuthGetUrl({ provider: 'github', redirect: window.location.pathname })
					//      }
					// github( { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } )
				]
			}
		}),

		// example of a userland module
		tasks({ specialInfo: 'hello from userland' }),

		// example of a userland inline module
		{
			name: 'app',
			entities: [],
			controllers: [],
			initApi: async () => {
				log.success('App is ready! 🚀');
			}
		}
	]
});
