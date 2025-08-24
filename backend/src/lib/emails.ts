import { promises as fs } from 'fs';
import path from 'path';
import { type Post, type User } from '@prisma/client';
import fg from 'fast-glob';
import _ from 'lodash';
import { env } from './env';

const getHtmlTemplates = _.memoize(async () => {
  const htmlPathsPattern = path.resolve(__dirname, '../emails/dist/**/*.html');
  const htmlPaths = fg.sync(htmlPathsPattern);
  const htmlTemplates: Record<string, string> = {};
  for (const htmlPath of htmlPaths) {
    const templateName = path.basename(htmlPath, '.html');
    htmlTemplates[templateName] = await fs.readFile(htmlPath, 'utf8');
  }
  return htmlTemplates;
});

const getHtmlTemplate = async (templateName: string) => {
  const htmlTemplates = await getHtmlTemplates();
  return htmlTemplates[templateName];
};

const sendEmail = async ({
  to,
  subject,
  templateName,
  templateVariables = {},
}: {
  to: string;
  subject: string;
  templateName: string;
  templateVariables?: Record<string, any>;
}) => {
  try {
    const htmlTemplate = await getHtmlTemplate(templateName);
    const fullTemplateVaraibles = {
      ...templateVariables,
      homeUrl: env.WEBAPP_URL,
    };
    console.info('sendEmail', {
      to,
      subject,
      templateName,
      fullTemplateVaraibles,
      htmlTemplate,
    });
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

export const sendWelcomeEmail = async ({ user }: { user: Pick<User, 'nick' | 'email'> }) => {
  return await sendEmail({
    to: user.email,
    subject: 'Thanks For Registration!',
    templateName: 'welcome',
    templateVariables: {
      userNick: user.nick,
      addPostUrl: `${env.WEBAPP_URL}/posts/new`,
    },
  });
};

export const sendPostBlockedEmail = async ({ user, post }: { user: Pick<User, 'email'>; post: Pick<Post, 'nick'> }) => {
  return await sendEmail({
    to: user.email,
    subject: 'Your Post Blocked!',
    templateName: 'postBlocked',
    templateVariables: {
      postNick: post.nick,
    },
  });
};
