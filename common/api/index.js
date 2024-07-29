import order from "./order.js";
import publics from "./public.js";
import gather from "./gather.js";
import society from "./society.js";
import list from './list.js'
uni.ajax = {
	...publics,
	...order,
	...gather,
	...society,
	...list

}