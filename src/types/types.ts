import { ReactNode } from "react";
import { Identifier } from "dnd-core";

export type TModal = {
  onShowModal: (value: boolean) => void;
  modalHeaderText: string;
  children: ReactNode;
};

export type TRegisterUser = {
  email: string;
  name: string;
  password: string;
};

export type TUpdateUser = TRegisterUser;

export type TIngredient = {
  _id: string;
  uniqueId?: string | undefined;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
};

export type TSmallIngredient = {
  name: string;
  type: string;
  price: number;
  image: string;
  id: string;
  onFindCurrentIngredient: (id: string) => void;
};

export type TConstructorIngredient = {
  name: string;
  type: string;
  price: number;
  image: string;
  uniqueId: string | undefined;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  index: number;
};

export type TDragObj = {
  index: number;
  action?: string;
  type?: string;
  id?: string;
  setIngredientCounter: (prev: any) => number;
};

export type TDragObjWithoutCounter = Omit<TDragObj, 'setIngredientCounter'>;

export type TDragCollectedProps = {
  isDragging: boolean;
};

export type TIngredientsIdList = {
  ingredients: string[];
};

export type TDropCollectedProps = {
  handlerId: Identifier | null;
};

export type TLoginUser = Omit<TRegisterUser, "name">;
