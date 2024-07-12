import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface CalculationModel extends Base {}

export class CalculationModel extends TimeStamps {
  type: string;
  width: number;
  height: number;
  place: string;
  budget: string;
  color: string;
  adds: string;
}