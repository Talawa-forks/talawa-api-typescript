import { Schema, model, Types, models } from "mongoose";

export interface Interface_Donation {
  userId: Types.ObjectId | string;
  orgId: Types.ObjectId | string;
  nameOfOrg: string;
  payPalId: string;
  nameOfUser: string;
  amount: number;
}
/**
 * @name donationSchema
 * @function
 * @description This is the Structure of the Donation
 * @param {Schema.Types.ObjectId} userId User-id
 * @param {Schema.Types.ObjectId} orgId Organization-id
 * @param {String} nameOfOrg Name of the organization
 * @param {String} payPalId PayPalId
 * @param {String} nameOfUser Name of the user
 * @param {Numbe} amount Amount of the donation
 */
const donationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  orgId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  nameOfOrg: {
    type: String,
    required: true,
  },
  payPalId: {
    type: String,
    required: true,
  },
  nameOfUser: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const DonationModel = () =>
  model<Interface_Donation>("Donation", donationSchema);

// This syntax is needed to prevent Mongoose OverwriteModelError while running tests.
export const Donation = (models.Donation || DonationModel()) as ReturnType<
  typeof DonationModel
>;
