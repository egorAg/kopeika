import { ModulesEnum } from '@shared/routes';

export const RouteBuilder = (module: ModulesEnum, route: string) => {
  return `/${module}/${route}`;
};
