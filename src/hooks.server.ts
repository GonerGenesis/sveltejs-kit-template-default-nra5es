import { sequence } from '@sveltejs/kit/hooks';

import { firstly } from 'firstly/handle';

import { api } from '$lib/firstly';

export const handle = sequence(firstly(api));
