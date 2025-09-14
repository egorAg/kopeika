export const IsNumberGuard = (value: any, message?: string) => {
  if (typeof value !== 'number') {
    throw new Error(message ?? 'Параметр не число!');
  }
};
