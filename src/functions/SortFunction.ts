import {SortOrder} from "@/Types";

export const comparator = <T>(objects:T[],order:SortOrder,orderBy: keyof T):T[] => {
  return objects.sort((a, b) => {
      if (order=="desc"){
          return a[orderBy] <b[orderBy] ? -1 : 1
      }
      else return a[orderBy] <b[orderBy] ? 1 : -1
  })
}

export const sortAndSlicePages = <T>(objects:T[],order:SortOrder, orderBy: keyof T, pageNum:number, rowsPerPage:number):T[] => {
  return comparator(objects,order,orderBy).slice(pageNum*rowsPerPage,pageNum*rowsPerPage+rowsPerPage)
}