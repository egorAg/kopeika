import { GuildBalanceHistory } from '../entities/guild-balance-history.entity';

export interface IGuildBalanceHistoryRepository {
  addRecord(
    guildId: string,
    date: string,
    balance: number,
  ): Promise<GuildBalanceHistory>;
  getHistory(
    guildId: string,
    from?: string,
    to?: string,
  ): Promise<GuildBalanceHistory[]>;
  deleteHistoryForGuild(guildId: string): Promise<void>;
}

export const GUILD_BALANCE_HISTORY_REPOSITORY = Symbol(
  'GUILD_BALANCE_HISTORY_REPOSITORY',
);
