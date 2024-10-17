import {EJokeCategory} from '@/enums/EJokeCategory';
import React from 'react';

export const useRenderJokeCategoryIcon = () => {
  const getIcon = (category: EJokeCategory) => {
    switch (category) {
      case EJokeCategory.CHRISTMAS:
        return 'fdf';
      default:
        return 'fd';
    }
  };
  return {};
};
