const { z } = require( 'zod');

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

const createBookingSchema = z.object({
  roomId: objectId,
  startDate: z.string().datetime().or(z.string()), // accept plain date strings too
  endDate: z.string().datetime().or(z.string()),
});
const updateBookingStatusSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED', 'CANCELLED']),
});
module.exports = {
    createBookingSchema,
    updateBookingStatusSchema,
}