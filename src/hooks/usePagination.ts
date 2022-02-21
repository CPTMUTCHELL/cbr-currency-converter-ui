import React from 'react';
import { useMemo } from 'react';

export const DOTS = '...';
export const usePagination = ({
                           totalCount,
                           pageSize,
                           siblingCount = 1,
                           currentPage=0
                       }:{totalCount:number,pageSize:number,siblingCount:number,currentPage:number}) => {
    const paginationRange = useMemo(() => {
        const totalPageNumbers = siblingCount + 5;
        if (totalPageNumbers >= totalCount) {
            return range(1, totalCount);
        }
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalCount
        );
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalCount;
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalCount];
        }
        if (shouldShowLeftDots && !shouldShowRightDots) {

            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalCount - rightItemCount + 1,
                totalCount
            );
            return [firstPageIndex, DOTS, ...rightRange];
        }
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }


    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};
const range = (start:number, end:number) => {
    let length = end - start + 1;
    /*
        Create an array of certain length and set the elements within it from
      start value to end value.
    */
    return Array.from({ length }, (_, idx) => idx + start);
};