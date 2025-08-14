const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>;
};

export const getAllPostsRoute = () => '/';

export const viewPostRouteParams = getRouteParams({ postNick: true });
export type ViewPostRouteParams = typeof viewPostRouteParams;
export const getViewPostRoute = ({ postNick }: ViewPostRouteParams) => `/posts/${postNick}`;

// export const viewPostRouteParams = { postNick: ':nick' }
// export type ViewPostRouteParams = { postNick: string }
// export const getViewPostRoute = ({ postNick }: { postNick: string }) => `/posts/${postNick}`
