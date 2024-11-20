'use server'

import prisma from '@/db'

export async function updatePaymentStatus(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.service.update({
      where: { id },
      data:{
        paid:true
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Payment update failed:', error)
    return { success: false, error: 'Failed to update payment status' }
  }
}
