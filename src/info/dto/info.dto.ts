import { IsString } from "class-validator";

export class InfoDto {
	@IsString()
	question: string

	@IsString()
	answer: string;

  @IsString()
  category: string;
}