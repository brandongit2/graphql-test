import {cacheExchange, type CacheExchangeOpts} from "@urql/exchange-graphcache";
import {Client, fetchExchange} from "urql";

const cacheExchangeOpts: CacheExchangeOpts = {
	updates: {
		Mutation: {
			removeComponent: (result, args, cache) => {
				cache.invalidate({
					__typename: "Component",
					id: args.id as string,
				});
			},
		},
	},
};

export const urqlClient = new Client({
	url: "http://localhost:8000/graphql",
	exchanges: [cacheExchange(cacheExchangeOpts), fetchExchange],
});
