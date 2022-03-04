import { IsNumberString } from 'class-validator';

export class AppEnv {
  @IsNumberString()
  PORT!: number;
}
