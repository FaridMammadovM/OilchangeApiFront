import { IBranch } from "@/types/branch.type";
import request from "@/utils/axios";

export const getBranches = async () => {
  const res = await request.get('/branch/getBranch')
  return res.data.data as IBranch[]
}

export const getBranchById = async (branchId: string) => {
  const res = await request.get('/branch/getBranch', { params: { branchId } })
  return res.data as IBranch
}