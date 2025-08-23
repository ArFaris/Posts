import type { Post, User, UserPermission } from '@prisma/client';

type MaybeUser = Pick<User, 'permissions' | 'id'> | null;
export type MaybePost = Pick<Post, 'authorId'> | null;

const hasPermission = (user: MaybeUser, permission: UserPermission) => {
  return user?.permissions.includes(permission) || user?.permissions.includes('ALL') || false;
};

export const canBlockPosts = (user: MaybeUser) => {
  return hasPermission(user, 'BLOCK_IDEAS');
};

export const canEditPost = (user: MaybeUser, post: MaybePost) => {
  return !!user && !!post && user?.id === post?.authorId;
};
