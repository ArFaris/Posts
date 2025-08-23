const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>;
};

export const getAllPostsRoute = () => '/';

export const viewPostRouteParams = getRouteParams({ postNick: true });
export type ViewPostRouteParams = typeof viewPostRouteParams;
export const getViewPostRoute = ({ postNick }: ViewPostRouteParams) => `/posts/${postNick}`;

export const editPostRouteParams = getRouteParams({ postNick: true });
export type EditPostRouteParams = typeof editPostRouteParams;
export const getEditPostRoute = ({ postNick }: EditPostRouteParams) => `/posts/${postNick}/edit`;

export const getNewPostRoute = () => '/posts/new';

export const getEditProfileRoute = () => '/edit-profile';

export const getSignUpRoute = () => '/sign-up';

export const getSignInRoute = () => '/sign-in';

export const getSignOutRoute = () => '/sign-out';
