import { prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class InfoModel extends TimeStamps {
	@prop()
	question: string

	@prop()
	answer: string;

  @prop({default: 'general'})
  category: string;
}