import { ThemeTypesEnum } from "./enum";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { ITaskProps } from "./interface";

export type TailwindThemeType = ThemeTypesEnum.DARK | ThemeTypesEnum.LIGHT;

export interface iErrorState {
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  isFetching?: boolean;
}

export type NewTaskType = Pick<
  ITaskProps,
  "deadline" | "description" | "label" | "status" | "title" | "userOwner"
>;

export type UpdateTaskType = Pick<
  ITaskProps,
  "deadline" | "description" | "label" | "status" | "title" | "id"
>;